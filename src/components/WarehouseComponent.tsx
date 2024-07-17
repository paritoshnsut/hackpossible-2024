import React, { useState, useEffect } from 'react';
import SpinnerComponent from './SpinnerComponent';
import MapComponent from './Mapcomponent';
import '../common.css';
import { useHeatmapData } from '../apis/hooks';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const WarehouseComponent = () => {
  const { data, loading, error, loadHeatmapData } = useHeatmapData();
  useEffect(() => {
    loadHeatmapData();
  }, []);

  const [AlertData, setAlertData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setAlertData(data?.heatMapPointList);
    }
  }, [data]);

  const alertData = [
    { city: 'Delhi', latitude: 28.6139, longitude: 77.209, count: 50 },
    { city: 'Mumbai', latitude: 19.076, longitude: 72.8777, count: 30 },
    { city: 'Bangalore', latitude: 12.9716, longitude: 77.5946, count: 40 },
    { city: 'Kolkata', latitude: 22.5726, longitude: 88.3639, count: 25 },
    { city: 'Chennai', latitude: 13.0827, longitude: 80.2707, count: 35 }
  ];

  return (
    <>
      {loading && <SpinnerComponent />}

      <div className="custom-margin-border">
        <MapComponent alerts={AlertData} />
      </div>

      <div className="table-component" style={{margin : '20px'}}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
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
                  Alert Count
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.heatMapPointList &&
                data?.heatMapPointList?.map((row: any, index: any) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      backgroundColor: row.sosAlert //&&index == 0
                        ? '#ffcccc'
                        : index % 2 === 0
                        ? '#f5f5f5'
                        : 'inherit', // Red background for SOS alert on first row
                      '&:hover': {
                        backgroundColor: row.sosAlert ? '#ff9999' : '#e0e0e0' // Darker red on hover if SOS alert
                      }
                    }}>
                    <TableCell align='left'>
                      {row?.latitude}
                    </TableCell>
                    <TableCell align="right">{row?.longitude}</TableCell>
                    <TableCell align="right">{'No'}</TableCell>
                    <TableCell align="right">{row?.count}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default WarehouseComponent;
