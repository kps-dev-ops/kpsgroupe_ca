<template>
    <div class="doughnut-chart-container">
      <canvas ref="doughnutChart"></canvas>
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted, ref } from 'vue';
  import { Chart as ChartJS, DoughnutController } from 'chart.js';
  
  ChartJS.register(DoughnutController);
  
  export default defineComponent({
    name: 'Percentagecircle',
    props: {
      percentage: {
        type: Number,
        required: true
      },
      info: {
        type: Array,
        required: true
      },
      title: {
        type: String,
        required: true
      },
    },
    setup(props) {
      const doughnutChart = ref(null);
  
      const chartData = {
        labels: props.info ,
        datasets: [
          {
            label: props.title,
            data: [props.percentage,100 - props.percentage],
            backgroundColor: ['green', 'gray'],
            hoverBackgroundColor: ['#4c9900', '#606060']
          }
        ]
      };
  
      const chartOptions = {
        responsive: true,
        cutout: '50%',
        maintainAspectRatio: false,
        animation: { 
        animateScale: true
      }
      };
      
      onMounted(() => {
          new ChartJS(doughnutChart.value.getContext('2d'), {
            type: 'doughnut',
            data: chartData,
            options: chartOptions
          });
        }
    );
      return {
        doughnutChart
      };
    }
  });
  </script>
  
  <style scoped>
  .doughnut-chart-container {
    position: relative;
    height: 200px;
    width: 40%; 
    margin: 0 auto; 
  }
  
  canvas {
    width: 100% !important;
    height: auto !important; 
  }
  </style>
  