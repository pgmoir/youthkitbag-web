import React, { useEffect, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';

function YkbMap({ id, position }) {
  const [lat, lon] = position;
  const [latlon, setLatLon] = useState([51.508929, -0.115726]);

  useEffect(() => {
    if (!lat || !lon) return;
    setLatLon(() => [lat, lon]);
  }, [lat, lon, setLatLon]);

  return (
    <Map center={latlon} zoom={12}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker key={id} position={latlon} />
    </Map>
  );
}

export default YkbMap;
