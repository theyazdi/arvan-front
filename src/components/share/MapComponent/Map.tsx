"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

interface MapProps {
  latitude: number;
  longitude: number;
}

function MapCenter({ latitude, longitude }: { latitude: number; longitude: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView([latitude, longitude], 15);
    map.scrollWheelZoom.disable();
  }, [latitude, longitude, map]);
  
  return null;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  useEffect(() => {
  }, [latitude, longitude]);

  return (
    <MapContainer 
      style={{ width: '100%', height: '100%', zIndex: 0 }} 
    >
      <MapCenter latitude={latitude} longitude={longitude} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          <div className="text-center">
            <strong>موقعیت هتل</strong>
            <br />
            {latitude.toFixed(6)}, {longitude.toFixed(6)}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map; 