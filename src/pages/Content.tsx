import {
  Box,
  TextareaAutosize,
} from '@mui/material';
import FabButton from '@src/components/FabButton';
import { events } from '@src/constants/events';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const TIME_IN_SECONDS = 1_000;

const socket = io(import.meta.env.VITE_BASE_URL_API, {
  autoConnect: false,
});

export default function Content() {
  const { path } = useParams();
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
    });

    socket.on('content', (data: { content: string }) => {
      setContent(data?.content);
    });
  };

  const handleConnect = () => {
    socket.connect();
  };

  const handleDisconnect = () => {
    socket.disconnect();
  };

  useEffect(() => {
    console.log('API: ', import.meta.env.VITE_BASE_URL_API);
    handleOnEvents();
    handleConnect();

    return () => {
      handleOffEvents();

      if (socket.connected) {
        handleDisconnect();
      }
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'primary.main',
        display: 'flex',
      }}
    >
      <TextareaAutosize
        autoCapitalize="off"
        autoComplete="off"
        value={content}
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
          fontWeight: 'bold',
          overflow: 'auto',
          resize: 'none',
        }}
      />

      <FabButton contentCopy={content} handleClear={handleClearContent} />
    </Box>
  );
}
