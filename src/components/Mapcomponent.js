import React from 'react';
import { MapContainer, TileLayer, Circle, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ alerts }) => {
  const maxCount = Math.max(...alerts.map((alert) => alert.count));
  const baseRadius = 50000;
  const indiaCenter = [22.5937, 82.9629];
  const zoomLevel = 5;
  return (
    <MapContainer center={indiaCenter} zoom={zoomLevel} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {alerts.map((alert, index) => {
        const radius = (alert.count / maxCount) * baseRadius;

        return (
          <Circle
            key={index}
            center={[alert.latitude, alert.longitude]}
            radius={radius}
            fillColor="red"
            color="red">
            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
              {alert.count} alerts
            </Tooltip>
          </Circle>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
