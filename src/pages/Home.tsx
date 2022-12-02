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
  ContainerProps,
  Paper,
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

const StyledBox = styled(Box)<BoxProps>(() => ({
  minHeight: '100vh',
  backgroundImage: `url('${backgroundImage}')`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center top',
  backgroundSize: '100% auto',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledContainer = styled(Container)<ContainerProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

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
                color="text.secondary"
                mb={3}
              >
                Compartilhe códigos, comandos ou qualquer tipo de texto em tempo real.
              </Typography>

              <Stack spacing={2}>
                <Typography variant="h5">
                  Não faça login. Basta usar uma URL
                </Typography>

                <Typography variant="h5">
                  Não salve, o texto é salvo automaticamente
                </Typography>

                <Typography variant="h5">
                  Compartilhe e edite online com seus amigos
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={6} display="flex">
              <Paper sx={{ flex: 1, p: 3 }}>
                <Stack spacing={1}>
                  <Typography color="text.secondary" variant="h5">
                    Vamos lá
                  </Typography>
                  <Typography>Entre com um nome</Typography>
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

                  <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                    Iniciar
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Fade>
      </StyledContainer>
    </StyledBox>
  );
}
