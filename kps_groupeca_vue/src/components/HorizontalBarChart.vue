<template>
    <div class="bar-chart-container">
      <canvas ref="barChart"></canvas>
    </div>
</template>
  
  <script>
  import { defineComponent, onMounted, ref } from 'vue';
  import { Chart as ChartJS, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
  
  ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  
  export default defineComponent({
    name: 'HorizontalbarDash',
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
      const barChart = ref(null);
  
      const chartData = {
        labels: props.table,
        datasets: [
          {
            label: 'Coach Effectiveness',
            data: props.table1,
            backgroundColor:       'rgba(100, 149, 237, 0.4)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };
  
      const chartOptions = {
        indexAxis: 'x',
        scales: {
          x: {
            beginAtZero: true
          }
        },
        responsive: true,
        maintainAspectRatio: false
      };
  
      onMounted(() => {
        if (barChart.value) {
          new ChartJS(barChart.value.getContext('2d'), {
            type: 'bar',
            data: chartData,
            options: chartOptions
          });
        }
      });
  
      return {
        barChart
      };
    }
  });
  </script>
  
  <style>
  .bar-chart-container {
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
  