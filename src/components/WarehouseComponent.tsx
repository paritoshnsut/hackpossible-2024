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

  return (
    <>
      {loading && <SpinnerComponent />}

      <div style={{marginTop : '20px', marginLeft : '20px'}}>
        <h5 className='heading'>All Warehouse Details</h5>

      </div>

      <div className="custom-margin-border">
        <MapComponent alerts={AlertData} />
      </div>

      <div className="table-component" style={{ margin: '20px' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{
                    backgroundColor: '#333',
                    color: '#fff',
                    fontWeight: 'bold',
                    width: '20%',
                    borderRight: '1px solid #ccc'
                  }}>
                  Serial Number
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    backgroundColor: '#333',
                    color: '#fff',
                    fontWeight: 'bold',
                    width: '20%',
                    borderRight: '1px solid #ccc'
                  }}>
                  Latitude
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    backgroundColor: '#333',
                    color: '#fff',
                    fontWeight: 'bold',
                    width: '20%',
                    borderRight: '1px solid #ccc'
                  }}>
                  Longitude
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    backgroundColor: '#333',
                    color: '#fff',
                    fontWeight: 'bold',
                    width: '20%',
                    borderRight: '1px solid #ccc'
                  }}>
                  SOS Alert
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    backgroundColor: '#333',
                    color: '#fff',
                    fontWeight: 'bold',
                    width: '20%',
                    borderRight: '1px solid #ccc'
                  }}>
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
                      backgroundColor: row.sosAlert
                        ? '#ffcccc'
                        : index % 2 === 0
                        ? '#f5f5f5'
                        : 'inherit', // Red background for SOS alert
                      '&:hover': {
                        backgroundColor: row.sosAlert ? '#ff9999' : '#e0e0e0' // Darker red on hover if SOS alert
                      }
                    }}>
                    <TableCell align="left" sx={{ width: '20%', borderRight: '1px solid #ccc' }}>
                      {index + 1}
                    </TableCell>
                    <TableCell align="left" sx={{ width: '20%', borderRight: '1px solid #ccc' }}>
                      {row?.latitude}
                    </TableCell>
                    <TableCell align="left" sx={{ width: '20%', borderRight: '1px solid #ccc' }}>
                      {row?.longitude}
                    </TableCell>
                    <TableCell align="left" sx={{ width: '20%', borderRight: '1px solid #ccc' }}>
                      {'No'}
                    </TableCell>
                    <TableCell align="left" sx={{ width: '20%', borderRight: '1px solid #ccc' }}>
                      {row?.count}
                    </TableCell>
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
