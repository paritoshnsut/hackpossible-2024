import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Button, Box } from '@mui/material';
import { useGetReadingsQuery } from '../services/service';
import { useEffect } from 'react';
import SpinnerComponent from './SpinnerComponent';

const Component3 = ({ handleRowClick }: any) => {
  const { data: rd, isLoading, isError, isSuccess } = useGetReadingsQuery({});

  useEffect(() => {
    if (isSuccess) {
      console.log('Readings Data:', rd);
    } else if (isError) {
      console.error('Error fetching readings data');
    }
  }, [rd, isSuccess, isError]);

  return (
    <>
      {isLoading && <SpinnerComponent />}

      <Box sx={{ border: '1px solid #ccc', margin: 8, padding: 2 }}>
        <div className="wrapper-table">
          <div className="centered">
            <h5 className="heading ml-3"> Current Reading </h5>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: '#333', color: '#fff', fontWeight: 'bold' }}>
                    Device ID
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ backgroundColor: '#333', color: '#fff', fontWeight: 'bold' }}>
                    Timestamp
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ backgroundColor: '#333', color: '#fff', fontWeight: 'bold' }}>
                    VOC
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ backgroundColor: '#333', color: '#fff', fontWeight: 'bold' }}>
                    Temperature (F)
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ backgroundColor: '#333', color: '#fff', fontWeight: 'bold' }}>
                    Pressure
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ backgroundColor: '#333', color: '#fff', fontWeight: 'bold' }}>
                    Humidity
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ backgroundColor: '#333', color: '#fff', fontWeight: 'bold' }}>
                    Latitude
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ backgroundColor: '#333', color: '#fff', fontWeight: 'bold' }}>
                    Longitude
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ backgroundColor: '#333', color: '#fff', fontWeight: 'bold' }}>
                    SOS Alert
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ backgroundColor: '#333', color: '#fff', fontWeight: 'bold' }}>
                    Altitude
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rd &&
                  rd.map((row: any, index: any) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        backgroundColor:
                          row.sosAlert && index === 0
                            ? '#ffcccc'
                            : index % 2 === 0
                            ? '#f5f5f5'
                            : 'inherit', // Red background for SOS alert on first row
                        '&:hover': {
                          backgroundColor: row.sosAlert && index === 0 ? '#ff9999' : '#e0e0e0' // Darker red on hover if SOS alert
                        }
                      }}
                      onClick={() => handleRowClick(row?.id)}>
                      <TableCell component="th" scope="row">
                        {row.deviceId}
                      </TableCell>
                      <TableCell align="right">
                        {new Date(row.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell align="right">{row.aqi}</TableCell>
                      <TableCell align="right">{row.temperature}</TableCell>
                      <TableCell align="right">{row.pressure}</TableCell>
                      <TableCell align="right">{row.humidity}</TableCell>
                      <TableCell align="right">{row.latitude}</TableCell>
                      <TableCell align="right">{row.longitude}</TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontWeight: row.sosAlert && index === 0 ? 'bold' : 'normal',
                          color: row.sosAlert && index === 0 ? '#b30000' : 'inherit' // Dark red color for SOS alert text
                        }}>
                        {row.sosAlert ? 'Yes' : 'No'}
                      </TableCell>
                      <TableCell align="right">{row.altitude}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>
    </>
  );
};

export default Component3;
