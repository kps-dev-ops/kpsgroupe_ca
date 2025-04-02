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
    name: 'LineChartDash',
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
            labels: props.table,
            datasets: [
                {
                    label: 'Customer per month',
                    data: props.table1,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor:          'rgba(100, 149, 237, 0.4)',
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointBorderColor:      'rgba(100, 149, 237, 0.4)',
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
                        text: 'Month'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Customer'
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