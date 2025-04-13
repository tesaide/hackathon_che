import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 50.4501,
  lng: 30.5234,
};

export default function Landing() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
