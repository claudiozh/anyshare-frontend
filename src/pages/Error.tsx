import {
  Box,
  BoxProps,
  Button,
  Container,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import backgroundImage from '@src/assets/bg-error.svg';
import { Fade } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';

const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100vw',
  backgroundImage: `url('${backgroundImage}')`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center top',
  backgroundSize: '100% auto',
  display: 'flex',
  flexDirection: 'column',
}));

export default function Error() {
  const navigate = useNavigate();

  const handleReloadPage = () => {
    window.location.reload();
  };

  const handleBackHomePage = () => {
    navigate('/');
  };

  return (
    <StyledBox
      flex={1}
      bgcolor="background.default"
      position="fixed"
      height="100%"
      display="flex"
    >
      <Fade>
        <Container sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
        >
          <Stack spacing={3} justifyContent="center" alignItems="center" maxWidth={650}>
            <Typography variant="h4" textAlign="center" color="text.secondary">
              Desculpe, algo inesperado aconteceu...
            </Typography>

            <Typography textAlign="center">
              Estamos trabalhando para corrigir o problema. Nossa equipe se preocupa em manter sua experiência cada vez melhor.
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                onClick={handleBackHomePage}
                variant="outlined"
              >
                Voltar
              </Button>

              <Button
                onClick={handleReloadPage}
                variant="contained"
              >
                Tentar novamente
              </Button>

            </Stack>
          </Stack>
        </Container>
      </Fade>
    </StyledBox>
  );
}
