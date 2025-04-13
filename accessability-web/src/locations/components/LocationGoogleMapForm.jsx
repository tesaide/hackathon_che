import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '800px',
};

const LocationGoogleMapForm = ({ lat, lon, onClick }) => {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat, lng: lon }}
        zoom={14}
        onClick={onClick}
      >
        <Marker position={{ lat, lng: lon }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LocationGoogleMapForm;
