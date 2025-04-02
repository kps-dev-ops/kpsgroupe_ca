<template>
    <Slide />
    <div v-if="showForm" class="overlay"></div>

    <div class="coachform1">
        <h1 id="coachh1">Create Coach Form</h1>
        <form @submit.prevent="sendForm">
            <div class="row">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" v-model="formData.name" />
                </div>
                <div>
                    <label for="surname">Surname:</label>
                    <input type="text" id="surname" v-model="formData.surname" />
                </div>
            </div>
            <div class="row">
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="formData.email" />
                </div>
                <div>
                    <label for="date">Birth Date:</label>
                    <input type="date" id="date" v-model="formData.birth_date" />
                </div>
            </div>
            <div class="row">
                <div>
                    <label for="gender">Gender:</label>
                    <input type="text" placeholder="F or M" id="gender" v-model="formData.gender" />
                </div>
                <div>
                    <label for="work">Work:</label>
                    <input type="text" id="work" v-model="formData.work" />
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="formData.password" />
                </div>
            </div>
            <button type="submit">Envoyer</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import Slide from './Slide.vue';

export default {
    name: 'Formcoach1',
    components: {
        Slide
    },
    data() {
        return {
            formData: {
                email: '',
                name: '',
                surname: '',
                birth_date: '',
                gender: '',
                work: '',
                password:''
            }
        };
    },
    methods: {
        async sendForm() {
            try {
                if(this.formData.gender === "Male" && this.formData.work === "coach" || this.formData.gender === "Female" && this.formData.work === "coach" ){

                console.log("Form content is: ", this.formData);
                const response = await axios.post('http://localhost:3000/employees', this.formData);
                console.log('Form successfully submitted:', response.data);

                this.$router.push('/redirection');
                }
            } catch (error) {
                console.error('Error while submitting the form:', error);
            }
        }
    }
};
</script>

<style scoped>


#coachh1 {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: #2c509f;
    margin-top: 20px;
    margin-bottom: 20px;
}

.coachform1 {
    width: 400px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
}

.row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.row > div {
    width: 48%;
}

.coachform1 label {
    font-size: 1rem;
    font-weight: 600;
    color: #000;
    margin-bottom: 5px;
    display: block;
}

.coachform1 input[type="email"],
.coachform1 input[type="text"],
.coachform1 input[type="date"] {
    width: 100%;
    padding: 8px;
    font-size: 0.9rem;
    border: 1px solid #ced4da;
    border-radius: 5px;
    box-sizing: border-box;
}

.coachform1 input:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.coachform1 button {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.coachform1 button:hover {
    background-color: #218838;
}

.coachform1 button:active {
    background-color: #1e7e34;
}
</style>
