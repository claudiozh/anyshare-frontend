import {
  Box,
  LinearProgress,
  Paper,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import FabButton from '@src/components/FabButton';
import { events } from '@src/constants/events';
import Error from '@src/pages/Error';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const TIME_IN_SECONDS = 1_000;

const socket = io(import.meta.env.VITE_BASE_URL_API, {
  autoConnect: false,
});

export default function Content() {
  const [isLoading, setIsLoading] = useState(true);
  const [disconnected, setDisconnected] = useState(false);
  const params = useParams();
  const path = params['*'];
  const [content, setContent] = useState('');

  const debouncedSave = useCallback(
    debounce((nextContent) => {
      socket.emit('save-content', {
        room: path,
        content: nextContent,
      });
    }, TIME_IN_SECONDS),
    [],
  );

  const handleChangeContent = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value: nextContent } = evt.target;

    setContent(nextContent);
    debouncedSave(nextContent);
  };

  const handleClearContent = () => {
    setContent('');
  };

  const handleOffEvents = () => {
    Object.entries(events).forEach(([, value]) => socket.off(value));
  };

  const handleOnEvents = () => {
    socket.on('connect', () => {
      socket.emit('create-room', { room: path });
      setDisconnected(false);
    });

    socket.on('content', (data: { content: string }) => {
      setContent(data?.content);
    });

    socket.on('disconnect', () => {
      setDisconnected(true);
    });

    socket.on('connect_error', (error) => {
      setTimeout(() => {
        setDisconnected(true);
      }, 1_000);
    });
  };

  const handleConnect = () => {
    socket.connect();
  };

  const handleDisconnect = () => {
    socket.disconnect();
  };

  const findContent = () => {
    socket.emit('find-content', { room: path }, (response: { content: string }) => {
      setContent(response?.content);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    handleOnEvents();
    handleConnect();
    findContent();

    return () => {
      handleOffEvents();

      if (socket.connected) {
        handleDisconnect();
      }
    };
  }, []);

  return (
    <Box component="main">
      {isLoading
        ? <LinearProgress />
        : (
          <span>
            {disconnected ? (
              <Error />
            ) : (
              <Box
                sx={{
                  position: 'fixed',
                  height: '100%',
                  display: 'flex',
                }}
              >
                <TextareaAutosize
                  autoCapitalize="off"
                  autoComplete="off"
                  value={content || ''}
                  onChange={handleChangeContent}
                  placeholder="Digite aqui..."
                  spellCheck={false}
                  autoFocus
                  style={{
                    fontSize: '16px',
                    height: '100vh',
                    width: '100vw',
                    overflowY: 'auto',
                    background: '#1E2835',
                    color: '#828FA1',
                    outline: 'none',
                    border: 'none',
                    padding: '15px',
                    paddingBottom: '80px',
                    fontWeight: 'bold',
                    overflow: 'auto',
                    resize: 'none',
                  }}
                />

                <Paper sx={{
                  position: 'absolute',
                  bottom: 28,
                  right: 100,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: {
                    xs: 250,
                    sm: 400,
                  },
                }}
                >
                  <Typography noWrap>
                    {path}
                  </Typography>
                </Paper>
                <FabButton contentCopy={content} handleClear={handleClearContent} />
              </Box>
            )}
          </span>
        )}
    </Box>
  );
}
