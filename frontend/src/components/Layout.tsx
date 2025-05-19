import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  DirectionsCar as CarIcon,
  Assignment as AssignmentIcon,
  Close as CloseIcon,
  LocalOffer as LocalOfferIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Clientes', icon: <PeopleIcon />, path: '/clientes' },
    { text: 'Veículos', icon: <CarIcon />, path: '/veiculos' },
    { text: 'Locação', icon: <AssignmentIcon />, path: '/locacao' },
  ];

  const mobileMenuItems = [
    ...menuItems,
    { text: 'Alugar', icon: <LocalOfferIcon />, path: '/alugar' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: '100%', bgcolor: 'black', color: 'white' }}>
      <Toolbar sx={{ bgcolor: 'black', color: 'white', minHeight: 64 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo.svg"
            alt="EliteWheelz"
            style={{ height: 32, marginRight: 8 }}
          />
          <Typography variant="h6" noWrap component="div">
            <span style={{ color: 'white', fontWeight: 700 }}>Elite</span>
            <span style={{ color: '#FF6C00', fontWeight: 700 }}>Wheelz</span>
          </Typography>
        </Box>
      </Toolbar>
      <Divider sx={{ bgcolor: '#222' }} />
      <List sx={{ bgcolor: 'black', height: '100%' }}>
        {(isMobile ? mobileMenuItems : menuItems).map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) setMobileOpen(false);
            }}
            sx={{
              bgcolor: location.pathname === item.path ? '#9C27B0' : 'black',
              color: 'white',
              '&:hover': {
                bgcolor: location.pathname === item.path ? '#7B1FA2' : '#222',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f6f7fb' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { sm: 'none' },
          bgcolor: 'black',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/logo.svg"
              alt="EliteWheelz"
              style={{ height: 32, marginRight: 8 }}
            />
            <Typography variant="h6" noWrap component="div">
              <span style={{ color: 'white', fontWeight: 700 }}>Elite</span>
              <span style={{ color: '#FF6C00', fontWeight: 700 }}>Wheelz</span>
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: 'black',
              color: 'white',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: '64px', sm: 0 },
          bgcolor: '#f6f7fb',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 