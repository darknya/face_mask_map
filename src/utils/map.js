import $L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const newMap = (domId, options) => {
  const map = $L.map(domId, options);
  $L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  return map;
};

function markerHere(position, map, popupString = '<h2>你在這附近</h2>') {
  return $L.marker(position).addTo(map).bindPopup(popupString).openPopup();
}

export default {
  newMap,
  markerHere,
};
