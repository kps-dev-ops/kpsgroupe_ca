<template>
    <div id="map"></div> <!-- Le div contenant la carte -->
  </template>
  
  <script>
  import L from 'leaflet';
  
  export default {
    name: "Map",
    props: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      },
      placeName: {
        type: String,
        required: true
      }
    },
    mounted() {
    // Initialiser la carte
    const map = L.map('map').setView([this.latitude, this.longitude], 13);

    // Charger les tuiles de la carte depuis OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Ajouter un marqueur à la position définie
    const marker = L.marker([this.latitude, this.longitude]).addTo(map);
    marker.bindPopup(`<b>${this.placeName}</b>`).openPopup();

    // Redimensionner la carte pour s'assurer qu'elle est correctement affichée
    setTimeout(() => {
        map.invalidateSize();
    }, 0);
}

  };
  </script>
  
  
  