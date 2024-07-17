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
import { Menu, Close } from '@mui/icons-material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddchartIcon from '@mui/icons-material/Addchart';
import TableChartIcon from '@mui/icons-material/TableChart';
import InfoIcon from '@mui/icons-material/Info';
import FactoryIcon from '@mui/icons-material/Factory';
import { Image } from 'react-bootstrap';

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

  const drawer = React.useMemo(
    () => (
      <div style={{}}>
        {/* <Toolbar sx={{ backgroundColor: '#333' }}>
          <Typography variant="h6" noWrap component="div">
            MENU
          </Typography>
        </Toolbar>
        <Divider /> */}
        <List>
          <>
            <ListItem disablePadding onClick={() => handleItemClick(0)}>
              <ListItemButton>
                <ListItemIcon sx={{ color: '#000' }}>
                  <AddchartIcon />
                </ListItemIcon>
                {mobileOpen && <ListItemText primary="Graph Section" />}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => handleItemClick(1)}>
              <ListItemButton>
                <ListItemIcon sx={{ color: '#000' }}>
                  <TableChartIcon />
                </ListItemIcon>
                {mobileOpen && <ListItemText primary="Tabular Section" />}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => handleItemClick(2)}>
              <ListItemButton>
                <ListItemIcon sx={{ color: '#000' }}>
                  <FactoryIcon />
                </ListItemIcon>
                {mobileOpen && <ListItemText primary="All Warehouse Details" />}
              </ListItemButton>
            </ListItem>
          </>
        </List>
      </div>
    ),
    [mobileOpen]
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  console.log('mobileOpen : ', mobileOpen);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          // ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#1E1450' // Green color for app bar
        }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ width: 50 }}>
            {mobileOpen ? <Close /> : <Menu />}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ marginLeft: '10px' }}
            style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu">
              <Image src={'/image.png'} alt={''} width={48} height={32} />
            </IconButton>
            <div style={{ borderRight: '1px solid gray', height: '40px' }} />
            <div style={{ fontWeight: 600, marginLeft: '8px', lineHeight: '20px' }}>
              <div style={{ fontSize: '20px' }}>RAKSHAK</div>
              <div style={{ fontSize: '10px' }}>By DPWORLD</div>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        // sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="permanent"
          open={mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
            BackdropProps: {
              invisible: true
            }
          }}
          sx={{
            width: mobileOpen ? 240 : 72,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              top: '64px',
              boxSizing: 'border-box',
              backgroundColor: '#f7f7f7',
              color: '#000',
              width: mobileOpen ? 240 : 72,
              transition: 'width 0.3s',
              overflowX: 'hidden'
            }
          }}>
          {drawer}
        </Drawer>
        {/* <Drawer
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
        </Drawer> */}
      </Box>
      <Box component="main" sx={{ flexGrow: 1, padding: '30px', mt: '64px' }}>
        <Box>{children ?? null}</Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
