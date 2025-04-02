<template>
    <div class="line-chart-container">
      <canvas ref="lineChart"></canvas>
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted, ref } from 'vue';
  import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
  
  ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);
  
  export default defineComponent({
    name: 'LineChart',
    props: {
      table: {
        type: Array,
        required: true
      },
      table1: {
        type: Array,
        required: true
      }
    },
    setup(props) {
      const lineChart = ref(null);
  
      const chartData = {
        labels:  props.table,
        datasets: [
          {
            label: 'Coach Effectiveness',
            data:  props.table1,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: true,
          }
        ]
      };
  
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Name of Coach'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Efficiency'
            }
          }
        }
      };
  
      onMounted(() => {
        if (lineChart.value) {
          new ChartJS(lineChart.value.getContext('2d'), {
            type: 'line', 
            data: chartData,
            options: chartOptions
          });
        }
      });
  
      return {
        lineChart
      };
    }
  });
  </script>
  
  <style scoped>
  .line-chart-container {
    position: relative;
    height: 350px;
    width: 100%;
    margin: 0 auto;
    padding: 10px; 
  }
  
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
  </style>
  