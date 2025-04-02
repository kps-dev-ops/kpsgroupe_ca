<template>
    <slide />
    <div class="stath2">
        <h1>Statistics</h1>
    </div>
    <div class="cont-stat">
        <div v-if="data.employeeNames && data.percentages" class="container">
            <div class="card">
                <HorizontalBarChart :table="data.employeeNames" :table1="data.percentages" />
                <h6> Representation HorizontalBarChart</h6>
            </div>
            <div class="card">
                <Barchart :table="data.employeeNames" :table1="data.percentages" />
                <h6> Representation Barchart</h6>
            </div>
            <div class="card">
                <Linechart :table="data.employeeNames" :table1="data.percentages" />
                <h6> Representation Linechart</h6>
            </div>
            <div class="card">
                <DoughnutChart :table="data.employeeNames" :table1="data.percentages" />
                <h6> Representation DoughnutChart</h6>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import HorizontalBarChart from './HorizontalBarChart.vue';
import Linechart from './Linechart.vue';
import DoughnutChart from './DoughnutChart.vue';
import Barchart from './Barchart.vue';
import Slide from './Slide.vue';

export default {
    name: 'Statistique',
    components: {
        HorizontalBarChart,
        Linechart,
        DoughnutChart,
        Barchart,
        Slide
    },
    data() {
        return {
            data: []
        };
    },
    mounted() {
        this.statistiquefunction();
    },
    methods: {
        async statistiquefunction() {
            try {
                const response = await axios.get('http://localhost:3000/stats');
                this.data = response.data;
                this.error = null;
            } catch (error) {
                this.error = 'Impossible de récupérer les statistiques';
                console.error('Erreur lors de la récupération des statistiques:', this.error);
            }
        }
    }
};
</script>

<style scoped>
.cont-stat {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #ffffff;
}

.card {
    width: 100%;
    max-width: 650px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    padding: 20px;
}

.card:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.stath2 h1 {
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    color: #2c509f;
    margin: 20px 0;
}

.cont-stat h6 {
    margin-top: 15px;
    font-weight: bold;
    font-size: 1rem;
    font-family: 'Times New Roman', Times, serif;
    text-align: center;
}

@media (max-width: 1200px) {
    .card {
        max-width: 550px;
    }

    .stath2 h1 {
        font-size: 2rem;
    }
}

@media (max-width: 768px) {
    .card {
        max-width: 100%;
        padding: 15px;
    }

    .stath2 h1 {
        font-size: 1.75rem;
    }

    .cont-stat h6 {
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .card {
        max-width: 100%;
        padding: 10px;
    }

    .stath2 h1 {
        font-size: 1.5rem;
    }

    .cont-stat h6 {
        font-size: 0.8rem;
    }
}
</style>
