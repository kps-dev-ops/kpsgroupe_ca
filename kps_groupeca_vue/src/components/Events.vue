<template>
    <Slide />
    
    <div class="coachform">
        <h1>Coach Form</h1>
        <!-- <button @click="showForm = !showForm"> Create Coach</button> -->
        <form  @submit.prevent="sendForm">
            <!-- <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="coachData.email" />
            </div> -->
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="coachData.name" />
            </div>
            <div>
                <label for="name">Surname:</label>
                <input type="text" id="surname" v-model="coachData.surname" />
            </div>
            <div>
                <label for="date">Birth Date:</label>
                <input type="date" id="date" v-model="coachData.birth_date" />
            </div>
            <div>
                <label for="gender">gender:</label>
                <input type="text" placeholder="Female or Male" id="gender" v-model="coachData.gender" />
            </div>
            <div>
                <label for="work">Work:</label>
                <input type="text" id="work" v-model="coachData.work" />
            </div>
            <!-- <div>
                <label for="work">Photo:</label>
                <input type="text" id="photo" v-model="coachData.photo" />
            </div> -->
            <button type="submit" @click="showForm = !showForm">Envoyer</button>
        </form>
    </div> 
</template>


<script>
import axios from 'axios';
import Slide from './Slide.vue';

export default {
    name: 'Formcoach',
    components: {
        Slide
    },
    data() {
        return {
            showForm: false,
            coachs: [],
            coachinfo: {},
            showlistcoach: false,
            showeditlist: false,
            selectedUserIds: [],
            selectdeletecoach:[],
            selectcoach:null,
            coachData: {
                id:'',
                name: '',
                surname: '',
                email: '',
                gender: '',
                work: '',
                birth_date:'',
                photo:''
            }
        };
    },
    mounted(){
        // const coachInfoString = ;

        this.coachinfo = JSON.parse(this.$route.params.coachinfo);
        console.log('coachInfoString:', this.coachinfo);
        this.coachData.name = this.coachinfo.name;
        this.coachData.id = this.coachinfo.id;
        this.coachData.email = this.coachinfo.email;
        this.coachData.surname = this.coachinfo.surname;
        this.coachData.gender = this.coachinfo.gender;
        this.coachData.work = this.coachinfo.work;
        this.coachData.birth_date = this.coachinfo.birth_date;
    },
    methods: {
        async sendForm() {
            console.log(this.coachData.gender);
            try {
                if(this.coachData.gender === "Male" || this.coachData.gender === "Female"){

                const response = await axios.put(`http://localhost:3000/employees/${this.coachData.id}`, this.coachData);
                this.success = 'Formulaire envoyé avec succès!';
                this.error = null;
                console.log('Réponse de l\'API:', response.data);
                this.$router.push('/Coaches');
                this.showForm = false;
                }
            } catch (err) {
                this.error = 'Erreur lors de l\'envoi du formulaire.';
                this.success = null;
                console.error('Erreur lors de l\'envoi du formulaire:', err);
            }
        }
    }
};
 </script>



<style>

.coachform h1 {
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    color: #2c509f;
    margin-top: 3%;
    margin-bottom: 20px;
}

.coachform {
    max-width: 600px;
    margin: 50px auto;
    padding: 30px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.coachform form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

.coachform label {
    font-size: 1.1rem;
    font-weight: 600;
    color: #000000;
    margin-bottom: 4px;
    display: block;
} 

.coachform input[type="email"],
.coachform input[type="text"],
.coachform input[type="date"] {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    border: 1px solid #ced4da;
    border-radius: 5px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.coachform input[type="email"]:focus,
.coachform input[type="text"]:focus,
.coachform input[type="date"]:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
} 

.coachform button {
    background-color: #28a745;
    color: white;
    padding: 12px 20px;
    font-size: 1.1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.coachform button:hover {
    background-color: #218838;
    transform: scale(1.02);
}

.coachform button:active {
    background-color: #1e7e34;
}

</style> 
