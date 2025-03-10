import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpForm'; 
import { useNavigate } from 'react-router-dom';

const pages = ['Your Favorites'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem('authToken'));
  const [isSignInModalOpen, setIsSignInModalOpen] = React.useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleFavoritesClick = () => {
    navigate('/yourfavorite');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BookShop
          </Typography>

          {/* Mobile Menu (left-aligned) */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {isLoggedIn && pages.map((page) => (
                <MenuItem 
                  key={page} 
                  onClick={() => {
                    handleCloseNavMenu();
                    handleFavoritesClick();
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Menu (right-aligned) */}
          <Box sx={{ 
            flexGrow: 1, 
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'flex-end',
            gap: '20px'
          }}>
            {isLoggedIn && (
              <Button
                onClick={handleFavoritesClick}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' }
                }}
              >
                Your Favorites
              </Button>
            )}
            {!isLoggedIn && (
              <>
                <Button
                  onClick={() => setIsSignInModalOpen(true)}
                  sx={{ 
                    my: 2, 
                    color: 'white', 
                    display: 'block',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' }
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => setIsSignUpModalOpen(true)}
                  sx={{ 
                    my: 2, 
                    color: 'white', 
                    display: 'block',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' }
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
            {isLoggedIn && (
              <Button
                onClick={handleLogout}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' }
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>

      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)}
      />
      
      <SignUpModal 
        isOpen={isSignUpModalOpen} 
        onClose={() => setIsSignUpModalOpen(false)}
      />
    </AppBar>
  );
}

export default ResponsiveAppBar;