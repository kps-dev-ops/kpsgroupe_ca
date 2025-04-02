<template>
    <div class="gauge-chart-container">
      <canvas ref="gaugeChart"></canvas>
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted, ref } from 'vue';
  import { Chart as ChartJS, Tooltip, Legend, DoughnutController, ArcElement } from 'chart.js';
  
  ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend);
  
  export default defineComponent({
    name: 'GaugeChart',
    props: {
      table: {
        type: Array,
        required: true
      }
    },
    setup(props) {
      const gaugeChart = ref(null);
  
      const chartData = {
        labels: ['Filled', 'Remaining','Remaining'],
        datasets: [
          {
            data: [60, 40,20],
            backgroundColor: ['#FF6384', '#E0E0E0','#U7E0E6'],
            borderWidth: 0
          }
        ]
      };
  
      const chartOptions = {
        rotation: -0.5 * Math.PI,
        circumference: 1.0 * Math.PI,
        cutout: '90%',
        // plugins: {
        //   tooltip: {
        //     enabled: false
        //   },
        //   legend: {
        //     display: false
        //   }
        // },
        responsive: true,
        maintainAspectRatio: false
      };
  
      onMounted(() => {
        if (gaugeChart.value) {
          new ChartJS(gaugeChart.value.getContext('2d'), {
            type: 'doughnut',
            data: chartData,
            options: chartOptions
          });
        }
      });
  
      return {
        gaugeChart
      };
    }
  });
  </script>
  
  <style>
  .gauge-chart-container {
    position: relative;
    height: 400px;
    width: 100%;
    margin: 0 auto;
  }
  
  canvas {
    width: 100% !important; 
    height: auto !important; 
  }
  </style>
  