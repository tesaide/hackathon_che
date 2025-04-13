import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { places } from '../../locations/places';
import { MainLayout } from '../layout/MainLayout';

// Функция для определения цвета иконки по рейтингу доступности
const getMarkerIcon = (score) => {
  let color;

  if (score >= 85) color = 'green';
  else if (score >= 70) color = 'orange';
  else color = 'red';

  return L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

export default function Landing() {
  const center = [51.5031, 31.2901]; // Чернігів

  return (
    <MainLayout>
      <MapContainer center={center} zoom={14} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.coordinates.coordinates[1], place.coordinates.coordinates[0]]}
            icon={getMarkerIcon(place.overall_accessibility_score)}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={0.9} permanent={false}>
              {place.name}
            </Tooltip>
            <Popup>
              <strong>{place.name}</strong><br />
              {place.address}<br />
              {place.contacts.website && (
                <a href={place.contacts.website} target="_blank" rel="noopener noreferrer">
                  {place.contacts.website}
                </a>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </MainLayout>
  );
}
