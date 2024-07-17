import React, { useState, useEffect } from 'react';
import SpinnerComponent from './SpinnerComponent';
import MapComponent from './Mapcomponent';
import '../common.css';
import { useHeatmapData } from '../apis/hooks';

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

      <div className="table-component">
        <p
          onClick={() => {
            console.log('pk', data , AlertData);
          }}>
          hello
        </p>
      </div>
    </>
  );
};

export default WarehouseComponent;
