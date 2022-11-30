import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LinkIcon from '@mui/icons-material/Link';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {
  Alert,
  Box,
  experimental_sx as sx,
  Snackbar,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  styled,
} from '@mui/material';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router-dom';

const StyledSpeedDialAction = styled(SpeedDialAction)(
  sx({
    bgcolor: 'secondary.main',
    ':hover': { bgcolor: 'secondary.main' },
  }),
);

type Props = {
    contentCopy: string;
    handleClear: () => void;
};

export default function FabButton({ contentCopy, handleClear }: Props) {
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const handleNavigateHome = () => navigate('/');

  const handleCopyToClipboard = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleShareWhatsapp = () => {
    const url = encodeURI(`${import.meta.env.VITE_WHATSAPP_URL_API}/?text=${contentCopy}`);
    window.open(url, '_blank');
  };

  return (
    <Box>
      <SpeedDial
        ariaLabel="options"
        sx={{ position: 'absolute', bottom: 20, right: 20 }}
        FabProps={{
          sx: {
            bgcolor: 'secondary.main',
            ':hover': { bgcolor: 'secondary.main' },
          },
        }}
        icon={<SpeedDialIcon />}
      >
        <CopyToClipboard text={contentCopy}>
          <StyledSpeedDialAction
            icon={<ContentCopyIcon />}
            onClick={handleCopyToClipboard}
            tooltipTitle="Copiar conteudo"
          />
        </CopyToClipboard>

        <CopyToClipboard text={window.location.href}>
          <StyledSpeedDialAction
            icon={<LinkIcon />}
            onClick={handleCopyToClipboard}
            tooltipTitle="Copiar url"
          />
        </CopyToClipboard>

        <CopyToClipboard text={contentCopy}>
          <StyledSpeedDialAction
            icon={<WhatsAppIcon />}
            onClick={handleShareWhatsapp}
            tooltipTitle="Compartilhar"
          />
        </CopyToClipboard>

        <StyledSpeedDialAction
          icon={<CleaningServicesIcon />}
          tooltipTitle="Limpar"
          onClick={handleClear}
        />

        <StyledSpeedDialAction
          icon={<ArrowBackIcon />}
          tooltipTitle="Voltar"
          onClick={handleNavigateHome}
        />
      </SpeedDial>

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Copiado para área de transferência
        </Alert>
      </Snackbar>
    </Box>
  );
}
