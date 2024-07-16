import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddchartIcon from '@mui/icons-material/Addchart';
import TableChartIcon from '@mui/icons-material/TableChart';
import InfoIcon from '@mui/icons-material/Info';

const drawerWidth = 240;

interface Props {
  handleItemClick: (index: number) => void;
  window?: () => Window;
  children: any;
}

const Sidebar = ({ handleItemClick, window, children }: Props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div style={{ backgroundColor: '#333', color: '#fff', height: '100%' }}>
      <Toolbar sx={{ backgroundColor: '#333' }}>
        <Typography variant="h6" noWrap component="div">
          MENU
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <>
          <ListItem disablePadding onClick={() => handleItemClick(0)}>
            <ListItemButton>
              <ListItemIcon sx={{ color: '#fff' }}>
                <AddchartIcon />
              </ListItemIcon>
              <ListItemText primary="Graph Section" />
            </ListItemButton>
          </ListItem>
       
          <ListItem disablePadding onClick={() => handleItemClick(1)}>
            <ListItemButton>
              <ListItemIcon sx={{ color: '#fff' }}>
                <TableChartIcon />
              </ListItemIcon>
              <ListItemText primary="Tabular Section" />
            </ListItemButton>
          </ListItem>
        </>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#4caf50' // Green color for app bar
        }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            RAKSHAK DASHBOARD
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#333',
              color: '#fff'
            }
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#333',
              color: '#fff'
            }
          }}
          open>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` }, marginBottom: '20px' }}>
        <Box>{children ?? null}</Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
