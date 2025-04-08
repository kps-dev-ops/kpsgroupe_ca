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
    LinearScale,
  } from 'chart.js'
  import { Bar } from 'vue-chartjs'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  // Props du composant parent
  defineProps({
    data: Object,
    options: Object
  })
  </script>
  
  <style scoped>
  div {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>
  