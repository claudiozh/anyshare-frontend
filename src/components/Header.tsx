import {
  AppBar, Box, Container, Toolbar,
} from '@mui/material';
import logoImage from '@src/assets/logo.svg';

export default function Header() {
  return (
    <Container disableGutters sx={{ px: { xs: 2, sm: 12 } }} component="header">
      <AppBar
        position="static"
        sx={{
          boxShadow: 'none',
          bgcolor: 'transparent',
        }}
      >
        <Toolbar disableGutters>
          <Box component="img" src={logoImage} />
        </Toolbar>
      </AppBar>
    </Container>
  );
}
