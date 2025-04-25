<template>
  <div>
    <Bar :data="data" :options="options" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

// Enregistre les composants de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Props venant du composant parent
defineProps({
  data: Object,
  options: Object
})
</script>

<style scoped>
div {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
</style>
