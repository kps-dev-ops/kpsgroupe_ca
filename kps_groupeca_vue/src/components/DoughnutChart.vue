<template>
    <div class="doughnut-chart-container">
      <canvas ref="doughnutChart"></canvas>
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted, ref } from 'vue';
  import { Chart as ChartJS, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
  
  ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend);
  
  export default defineComponent({
    name: 'DoughnutChartDash',
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
      const doughnutChart = ref(null);
  
      const chartData = {
        labels: props.table,
        datasets: [
          {
            label: 'Number per location',
            data:  props.table1,
            backgroundColor: ['rgba(255, 255, 102, 0.4)', 'rgba(100, 149, 237, 0.4)',"rgba(144, 238, 144, 0.4)",'rgba(255, 99, 71, 0.4)'],
            // hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
          }
        ]
      };
  
      const chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            enabled: true
          }
        },
        cutout: '50%',
        maintainAspectRatio: false
      };
  
      onMounted(() => {
        if (doughnutChart.value) {
          new ChartJS(doughnutChart.value.getContext('2d'), {
            type: 'doughnut',
            data: chartData,
            options: chartOptions
          });
        }
      });
  
      return {
        doughnutChart
      };
    }
  });
  </script>
  
  <style scoped>
  .doughnut-chart-container {
    position: relative;
    height: 350px;
    width: 60%;
    margin: 0 auto;
    padding: 10px; 
  }
  
  canvas {
    width: 100% !important; 
    height: auto !important;
  }
  </style>
  