import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Typography, Button, Box } from '@mui/material';
import LineGraph from '../components/LineGraph';
// import { useGetReadingByIdQuery } from '../services/service';
import SpinnerComponent from '../components/SpinnerComponent';
import { Modal } from 'react-bootstrap';
import InfoIcon from '@mui/icons-material/Info';
import Card from 'react-bootstrap/Card';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MapComponent from '../components/Mapcomponent';
import { useFetchReadingById } from '../apis/hooks';
import useFetchThresholdReading from '../apis/hooks';

const drawerWidth = 240;

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [thresholdData, setThresholdData] = useState({
    aqi: '',
    temperature: '',
    pressure: '',
    humidity: ''
  });

  // const { data, error, isLoading } = useGetReadingByIdQuery(id);
  const { data, error, isLoading } = useFetchReadingById(id);
  const {
    data: threshold,
    error: thresholderror,
    isLoading: thresholdLoading,
    fetchData
  } = useFetchThresholdReading(id);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (threshold) {
      setThresholdData({
        aqi: threshold.aqiThresholdValue,
        temperature: threshold.temperatureThresholdValue,
        pressure: threshold.pressureThresholdValue,
        humidity: threshold.humidityThresholdValue,
      });
    }
  }, [threshold]);

  const thresholdLineForPressure = {
    type: 'line',
    yMin: thresholdData?.pressure,
    yMax: thresholdData?.pressure,
    borderColor: 'red',
    borderWidth: 2,
    borderDash: [6, 6],
    label: {
      content: 'Threshold',
      enabled: true,
      position: 'center'
    }
  };

  const thresholdLineForAQI = {
    type: 'line',
    yMin: thresholdData?.aqi,
    yMax: thresholdData?.aqi,
    borderColor: 'red',
    borderWidth: 2,
    borderDash: [6, 6],
    label: {
      content: 'Threshold',
      enabled: true,
      position: 'center'
    }
  };

  const thresholdLineForTemperature = {
    type: 'line',
    yMin: thresholdData?.temperature,
    yMax: thresholdData?.temperature,
    borderColor: 'red',
    borderWidth: 2,
    borderDash: [6, 6],
    label: {
      content: 'Threshold',
      enabled: true,
      position: 'center'
    }
  };

  const thresholdLineForHumidity = {
    type: 'line',
    yMin: thresholdData?.humidity,
    yMax: thresholdData?.humidity,
    borderColor: 'red',
    borderWidth: 2,
    borderDash: [6, 6],
    label: {
      content: 'Threshold',
      enabled: true,
      position: 'center'
    }
  };

  useEffect(() => {
    if (error) {
      console.error('Error fetching reading:', error);
    }
    if (data) {
      console.log('Fetched reading:', data);
    }
  }, [data, error]);

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

  const handleGoBackClick = () => {
    navigate('/');
  };

  const formatGraphData = (graphData: any) => {
    return {
      labels: graphData.map((point: any) => new Date(point.date).toLocaleTimeString()),
      datasets: [
        {
          label: 'Value',
          data: graphData.map((point: any) => point.value),
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)'
        }
      ]
    };
  };

  const graphOptionsPressure = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Line Chart'
      },
      annotation: {
        annotations: {
          threshold: thresholdLineForPressure
        }
      }
    }
  };

  const graphOptionsTemperature = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Line Chart'
      },
      annotation: {
        annotations: {
          threshold: thresholdLineForTemperature
        }
      }
    }
  };

  const graphOptionsHumidity = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Line Chart'
      },
      annotation: {
        annotations: {
          threshold: thresholdLineForHumidity
        }
      }
    }
  };

  const graphOptionsAqi = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Line Chart'
      },
      annotation: {
        annotations: {
          threshold: thresholdLineForAQI
        }
      }
    }
  };

  const drawer = (
    <div style={{ backgroundColor: '#333', color: '#fff', height: '100%' }}>
      <Toolbar sx={{ backgroundColor: '#333' }}>
        <Typography variant="h6" noWrap component="div">
          DETAILS MENU
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton onClick={handleGoBackClick}>
            <ListItemText primary="Go Back" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      {/* {isLoading && <SpinnerComponent />} */}

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: '#4caf50'
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
              DEVICE DETAILS
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true
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
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h4" gutterBottom style={{ flexGrow: 1, textAlign: 'left' }}>
                Details of Device: {id}
              </Typography>
              <Button
                variant="contained"
                color="error"
                style={{ fontWeight: 'bold' }}
                onClick={handleShowModal}>
                Check Average Data
              </Button>
            </div>
            {/* {isLoading && <p>Loading...</p>}
              {error && <p>Error loading data</p>} */}
            {data && (
              <>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      flex: '1 1 45%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      margin: '10px'
                    }}>
                    <Typography variant="h6">AQI Graph</Typography>
                    <LineGraph data={formatGraphData(data.aqiGraph)} options={graphOptionsAqi} />
                  </div>
                  <div
                    style={{
                      flex: '1 1 45%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      margin: '10px'
                    }}>
                    <Typography variant="h6">Pressure Graph</Typography>
                    <LineGraph data={formatGraphData(data.pressureGraph)} options={graphOptionsPressure} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      flex: '1 1 45%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      margin: '10px'
                    }}>
                    <Typography variant="h6">Temperature Graph</Typography>
                    <LineGraph
                      data={formatGraphData(data.temperatureGraph)}
                      options={graphOptionsTemperature}
                    />
                  </div>
                  <div
                    style={{
                      flex: '1 1 45%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      margin: '10px'
                    }}>
                    <Typography variant="h6">Humidity Graph</Typography>
                    <LineGraph data={formatGraphData(data.humidityGraph)} options={graphOptionsHumidity} />
                  </div>
                </div>

                <div>{/* <MapComponent alerts={alertData} /> */}</div>
              </>
            )}
          </div>
        </Box>
      </Box>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header
          closeButton
          style={{ backgroundColor: '#333', color: '#fff', fontWeight: 'bold' }}>
          <InfoIcon style={{ marginRight: '10px' }} />
          <Modal.Title>Mean And Median Data Of Device : {id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box
              sx={{
                width: '45%',
                padding: '15px',
                border: '1px solid #ccc',
                backgroundColor: '#f0f0f0'
              }}>
              <Typography
                variant="h6"
                style={{ fontWeight: 'bold', marginBottom: '20px', color: '#3f51b5' }}>
                Average Data
              </Typography>
              <Typography style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                Avg Humidity: {data?.avgHumidity.toFixed(2)}
              </Typography>
              <Typography style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                Avg Temperature: {data?.avgTemperature.toFixed(2)}
              </Typography>
              <Typography style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                Avg Pressure: {data?.avgPressure.toFixed(2)}
              </Typography>
              <Typography style={{ fontWeight: 'bold' }}>
                Avg VOC: {data?.avgAqi.toFixed(2)}
              </Typography>
            </Box>

            {/* Box for Median Data */}
            <Box
              sx={{
                width: '45%',
                padding: '15px',
                border: '1px solid #ccc',
                backgroundColor: '#f0f0f0'
              }}>
              <Typography
                variant="h6"
                style={{ fontWeight: 'bold', marginBottom: '20px', color: '#3f51b5' }}>
                Median Data
              </Typography>
              <Typography style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                Median Humidity: {data?.medianHumidity?.toFixed(2)}
              </Typography>
              <Typography style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                Median Temperature: {data?.medianTemperature.toFixed(2)}
              </Typography>
              <Typography style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                Median Pressure: {data?.medianPressure.toFixed(2)}
              </Typography>
              <Typography style={{ fontWeight: 'bold' }}>
                Median VOC: {data?.medianAqi.toFixed(2)}
              </Typography>
            </Box>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outlined" onClick={handleCloseModal} style={{ fontWeight: 'bold' }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Details;
