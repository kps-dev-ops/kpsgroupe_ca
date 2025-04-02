<template>
  <Slide />
  <div class="main">
    <h1>Dashboard</h1>
    <p>Welcome!</p>

    <div class="stat-main">
      <div v-if="value.customerCount" class="main-card">
        <p> <b> Customer overview</b> <br/>When Customer have joined in the time</p>
        <div class="card-text">
          <p>Customer <br/> <b>{{value.customerCount}}</b></p>
          <p>Customer by Coach <br/> <b>84</b></p>
        </div>
        <LinechartDash v-if="valuelinear" :table="valuelinear.months" :table1="valuelinear.customerCounts" />
        <!-- <p>Client Statistics</p> -->
      </div>
      <div v-if="value.customerCount" class="main-card">
        <p> <b> Event</b> <br/>Number of Events</p>
        <div class="card-text">
          <!-- <p>Monthly <br/> <b>894</b></p>
          <p>Weekly <br/> <b>84</b></p>
          <p>Daily(arg)<br/> <b>84</b></p> -->
        </div>
        <h2> <b>{{ valuevent.total_events }}</b></h2>
        <!-- <HorizontalbarDash :table="employeeNames" :table1="percentages" /> -->
        <!-- <p>Number of Events</p> -->
      </div>
      <div v-if="value.customerCount" class="main-card">
        <div class="card-text">
          <p><b>Meeting top source</b></p>
        </div>
        <DoughnutChartDash v-if="valuedoughnut" :table="valuedoughnut.sources" :table1="valuedoughnut.counts" />
        <!-- <p>Number of clients</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import Slide from './Slide.vue';
import axios from 'axios';
import HorizontalBarChart from './HorizontalBarChart.vue';
import DoughnutChart from './DoughnutChart.vue';
import LinechartDash from './LinechartDash.vue';
import HorizontalbarDash from './HorizontalbarDash.vue';
import DoughnutChartDash from './DoughnutChartDash.vue';

export default {
  components: {
    Slide,
    HorizontalBarChart,
    DoughnutChart,
    LinechartDash,
    HorizontalbarDash,
    DoughnutChartDash
    // World
  },
  data() {
    return {
      value: [],
      valuedoughnut:[],
      valuevent:[],
      valuelinear:[],
      // if(valuelinear){
      // employeeNames: this.valuelinear.months,
      // percentages: this.valuelinear.customerCount,
      // }
    };
  },
  mounted() {
    this.getvalue();
    this.getvaluedouhnut();
    this.getvaluevent();
    this.getvaluelineart();
  },
  methods: {
    async getvalue() {
      try {
        const response = await axios.get('http://localhost:3000/dashboard');
        this.value = response.data;
        // console.log(this.value.customerCount);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    },
    async getvaluedouhnut() {
      try {
        const response = await axios.get('http://localhost:3000/sourcesCount');
        this.valuedoughnut = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    },
    async getvaluelineart() {
      try {
        const response = await axios.get('http://localhost:3000/statsGraph');
        this.valuelinear = response.data;
        // console.log(this.valuelinear.months);
        // console.log(this.valuelinear.customerCounts);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    },
    async getvaluevent() {
      try {
        const response = await axios.get('http://localhost:3000/eventsCount');
        this.valuevent = response.data;
        // console.log( this.valuevent.total_events);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    }
  }
};
</script>
<style scoped>
.main {
  padding: 0% 1%; 
  background-color: rgb(255, 255, 255);
}

.main-card h2{
  font-size: 7.5rem;
  font-weight: bold;
  color: #3390ca;
  margin-top: 30%;
  /* margin-bottom: 4px; */
  text-align: center;
  justify-content: center;
  animation: fadeInUp 2s ease-in-out forwards;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}


.main h1 {
  font-size: 1.0rem;
  font-weight: bold;
  color: #000000;
  margin-top: 3%;
  margin-bottom: 4px;
}

.stat-main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px; 
}

.main-card {
  background: #fff;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px; 
  box-sizing: border-box;
}

.main-card:nth-child(2n-1) {
  flex: 0 0 60%;
}

.main-card:nth-child(2n) {
  flex: 0 0 35%;
}

.main-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.card-text {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px; 
}

@media (max-width: 768px) {
  .main-card:nth-child(2n-1),
  .main-card:nth-child(2n) {
    flex: 0 0 100%;
  }
}
</style>
