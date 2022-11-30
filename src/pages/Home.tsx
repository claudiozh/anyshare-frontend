import {
  Box,
  BoxProps,
  Button,
  Container,
  Grid,
  styled,
  TextField,
  Typography,
  Stack,
  experimental_sx as sx,
  ContainerProps,
} from '@mui/material';
import backgroundImage from '@src/assets/bg-home.svg';
import Header from '@src/components/Header';
import { useFormik } from 'formik';
import { Fade } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const validationSchema = yup.object({
  nome: yup.string().required('Campo obrigatório')
    .max(50, 'Campo deve ter no máximo $max caracteres'),
});

const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: '100vh',
  backgroundImage: `url('${backgroundImage}')`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center top',
  backgroundSize: '100% auto',
  backgroundColor: `${theme.palette.primary.main}`,
  display: 'flex',
  flexDirection: 'column',
}));

const StyledContainer = styled(Container)<ContainerProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledButton = styled(Button)(
  sx({
    mt: 2,
    px: 3,
    py: 1.2,
    borderRadius: 2,
    backgroundColor: 'secondary.main',
    '&:hover': {
      backgroundColor: 'secondary.main',
    },
  }),
);

export default function Content() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nome: '',
    },
    validationSchema,
    onSubmit: ({ nome }) => {
      navigate(nome);
    },
  });

  return (
    <StyledBox>
      <Header />

      <StyledContainer disableGutters sx={{ px: { xs: 2, sm: 12 }, py: 5, flex: 1 }}>
        <Fade delay={150}>
          <Grid container spacing={5} direction={{ xs: 'column', md: 'row' }} component="main">
            <Grid item xs={6}>
              <Typography
                variant="h4"
                fontWeight="bold"
                mb={3}
                color="text.secondary"
              >
                Compartilhe códigos, comandos ou qualquer tipo de texto em tempo real.
              </Typography>

              <Stack spacing={2}>
                <Typography variant="h5" color="text.primary">
                  Não faça login. Basta usar uma URL
                </Typography>

                <Typography variant="h5" color="text.primary">
                  Não salve, o texto é salvo automaticamente
                </Typography>

                <Typography variant="h5" color="text.primary">
                  Compartilhe e edite online com seus amigos
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={6} display="flex">
              <Box
                flex={1}
                bgcolor="primary.dark"
                boxShadow="0px 8px 24px 0px #00000026"
                borderRadius={2}
                p={3}
              >
                <Stack spacing={1}>
                  <Typography color="text.secondary" variant="h5">
                    Vamos lá
                  </Typography>
                  <Typography color="text.primary">Entre com um nome</Typography>
                </Stack>

                <Box mt={4} component="form" onSubmit={formik.handleSubmit}>
                  <Typography color="text.secondary">anycode.me/ </Typography>

                  <TextField
                    name="nome"
                    autoComplete="off"
                    placeholder={
                    formik.touched.nome && Boolean(formik.errors.nome)
                      ? formik.errors.nome
                      : 'Ex.: maria'
                  }
                    fullWidth
                    value={formik.values.nome}
                    onChange={formik.handleChange}
                    error={formik.touched.nome && Boolean(formik.errors.nome)}
                  />

                  <StyledButton variant="contained" type="submit">
                    Iniciar
                  </StyledButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Fade>
      </StyledContainer>
    </StyledBox>
  );
}
