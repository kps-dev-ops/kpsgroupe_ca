<template>
    <slide />
    <!-- <h4>Tips des coachs</h4> -->
    <div class="Tips">
    <h1>Tips for Coaches</h1>
    <hr />

    <div class="container-tips">

        <div class="card-tips" v-for="tip in Tips" :key="tip.id">
            <h6 @click="showtipfunction(tip.id)" >{{tip.title}}</h6>
            <p v-if="showtip && tipid == tip.id ">{{tip.tip}}</p>
        </div>
    </div>
</div>
</template>


<script>
import axios from 'axios';

import Slide from './Slide.vue';

export default {
    name: 'Tips',
    components: {
        Slide
    },
    data() {
        return {
            Tips: [],
            showtip: '',
            tipid:''
        }
    },
    mounted() {
        this.gettips();
    },
    methods: {
        async gettips() {
            try {
                const response = await axios.get('http://localhost:3000/tips');
                console.log(response.data);
                this.Tips = response.data;
                // console.log(this.data.employeeNames);
                // console.log(this.data.percentages);
                this.error = null;
            } catch (error) {
                this.error = 'Impossible de récupérer les utilisateurs';
                console.error('Erreur lors de la récupération des utilisateurs:', this.error);
            }
        },
        showtipfunction(tipid)
        {
            this.showtip = !this.showtip;
            this.tipid = tipid;
        }
    }
};

</script>

<style>
/* template {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f0f0f0;
    min-height: 100vh;
} */

.container-tips {
    /* display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    padding: 20px;
    width: 2000px; 
    margin: 50px auto; */
}

.card-tips {
    flex: 1 1 300px;
    max-width: 70%;
    background: #ffffff;
    border-radius: 10px;
    border-style: solid;
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); */
    /* overflow: hidden; */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    margin: 20px ;
    padding: 20px;
}

.card-tips:hover {
    /* transform: scale(1.1); */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    background-color: #96a2cb;
}


.Tips h1 {
  /* text-align: center; */
  font-size: 1.5rem;
  /* font-weight: bold; */
  color: #000000;
  margin-top: 5%;
  margin-bottom: 20px;
  /* margin-left: 50%; */
}
/* .container-tips h4 { */
    /* margin-top: 70px;
    margin-left: 350px;
    margin-bottom: 30px; */
/* } */
</style>