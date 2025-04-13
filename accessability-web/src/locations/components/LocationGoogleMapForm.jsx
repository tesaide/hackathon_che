import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '800px',
};

const LocationGoogleMapForm = ({ lat, lon, onClick }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  if (loadError) {
    return <div>Помилка завантаження Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Завантаження карти...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={{ lat, lng: lon }}
      zoom={14}
      onClick={onClick}
    >
      <Marker position={{ lat, lng: lon }} />
    </GoogleMap>
  );
};

export default LocationGoogleMapForm;
