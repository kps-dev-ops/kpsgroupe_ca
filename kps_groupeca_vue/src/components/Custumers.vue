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
    name: 'DoughnutChart',
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
            label: 'Coach Effectiveness',
            data:  props.table1,
            backgroundColor: ['#FF6384', '#36A2EB', '#0000FF', '#C0C0C0','#FDFD96', '#E67E22', '#FFCE56', '#4BC0C0','#8B4513', '#34495E', '#FF5733', '#ADFF2F','#FFA500', '#FFFF00', '#FFCE56', '#B39EB5',"#F1C40F",'#C0392B','#FF5733'],
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
  