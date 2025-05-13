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
import { Link } from "react-router-dom";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
            ROOTS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
                <Link style={{ textDecoration: 'none',color:'rgba(0,0,0,.87)',marginTop:'3px',display:'block'}} to="/">
                <MenuItem onClick={handleCloseNavMenu} sx={{justifyContent: 'center'}}>
                  <Typography sx={{ textAlign: 'center' }}>Demo App</Typography>
                </MenuItem>
                  </Link>
                <Link style={{ textDecoration: 'none',color:'rgba(0,0,0,.87)',marginTop:'3px',display:'block'}} to="fullApp">
                <MenuItem onClick={handleCloseNavMenu} sx={{justifyContent: 'center'}}>
                  <Typography sx={{ textAlign: 'center' }}>FULL App</Typography>
                </MenuItem>
                  </Link>
                <Link style={{ textDecoration: 'none',color:'rgba(0,0,0,.87)',marginTop:'3px',display:'block'}} to="demoAppLocalization">
                <MenuItem onClick={handleCloseNavMenu} sx={{justifyContent: 'center'}}>
                  <Typography sx={{ textAlign: 'center' }}>Localization</Typography>
                </MenuItem>
                  </Link>
                <Link style={{ textDecoration: 'none',color:'rgba(0,0,0,.87)',marginTop:'3px',display:'block'}} to="demoAppUnits">
                <MenuItem onClick={handleCloseNavMenu} sx={{justifyContent: 'center'}}>
                  <Typography sx={{ textAlign: 'center' }}>Units</Typography>
                </MenuItem>
                  </Link>
                <Link style={{ textDecoration: 'none',color:'rgba(0,0,0,.87)',marginTop:'3px',display:'block'}} to="demoAppTrRole">
                <MenuItem onClick={handleCloseNavMenu} sx={{justifyContent: 'center'}}>
                  <Typography sx={{ textAlign: 'center' }}>Translation Role</Typography>
                </MenuItem>
                  </Link>
                
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="Link"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ROOTS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link style={{ textDecoration: 'none',marginLeft:'12px'}} to="/">
          <Button
                  variant="contained"
                sx={{ my: 2, color: 'white',background:'#008CBA', display: 'block' }}
              >
                Demo App
              </Button>
              </Link>
              <Link style={{ textDecoration: 'none',marginLeft:'12px'}} to="fullApp">
              <Button
                  variant="contained"
                sx={{ my: 2, color: 'white',background:'#008CBA', display: 'block' }}
              >
                Full App
              </Button>
              </Link>
              <Link style={{ textDecoration: 'none',marginLeft:'12px'}} to="demoAppLocalization">
              <Button
                  variant="contained"
                sx={{ my: 2, color: 'white',background:'#008CBA', display: 'block' }}
              >
                Localization
              </Button>
              </Link>
              <Link style={{ textDecoration: 'none',marginLeft:'12px'}} to="demoAppUnits">
              <Button
                  variant="contained"
                sx={{ my: 2, color: 'white',background:'#008CBA', display: 'block' }}
              >
                Units
              </Button>
              </Link>
              <Link style={{ textDecoration: 'none',marginLeft:'12px'}} to="demoAppTrRole">
              <Button
                  variant="contained"
                sx={{ my: 2, color: 'white',background:'#008CBA', display: 'block' }}
              >
                Translation Role
              </Button>
              </Link>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
