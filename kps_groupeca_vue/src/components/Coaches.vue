<template>
    <div class="container-compatihilite">
        <!-- compatibilet -->
        <Slide />
        <h1>Compatibility Test</h1>
        <hr />
        <div>
            <!-- <button v-if="!showlist" class="show-button" @click="getUsers">Liste des Utilisateurs</button> -->
        </div>
        <div v-if="showlist && !showresult" class="title-list">
                <h5>Client A</h5>
                <h5>Client B</h5>
        </div>
        <div class="list-client-compatibilite">
            <div id="overflowTest" v-if="showlist && !showresult">
                <div v-for="user in users" :key="user.id">
                    <label>
                        <input :disabled="getlength >= 1 && !selectedUserIds.includes(user.id)" type="checkbox"
                            :value="user.id" v-model="selectedUserIds" />
                        {{ user.surname + " " + user.name }} ({{ user.astrological_sign }})
                    </label>
                </div>
            </div>
            <div id="overflowTest" v-if="showlist && !showresult">
                <div v-for="user in users" :key="user.id">
                    <label>
                        <input :disabled="getlength1 >= 1 && !selectedUserIds1.includes(user.id)" type="checkbox"
                            :value="user.id" v-model="selectedUserIds1" />
                        {{ user.surname + " " + user.name }} ({{ user.astrological_sign }})
                    </label>
                </div>
            </div>
        </div>

        <div v-if="showlist && !restart">
            <!-- <p>toto</p> -->
            <button class="send-button" @click="sendSelectedUserIds">Compare</button>

        </div>
        <p v-if="error" class="error">Erreur: {{ error }}</p>
    </div>

    <!-- boule de compatibilite -->

    <div v-if="showresult">
        <Percentagecircle :percentage="resultcompatibilit.compatibility_percentage"/>
        <h3>Test de compatibilite entre {{ resultcompatibilit.details.customer1.name }} ({{resultcompatibilit.details.customer1.sign}}) et
            {{ resultcompatibilit.details.customer2.name }} ({{resultcompatibilit.details.customer2.sign}}) est de <strong>{{
                resultcompatibilit.compatibility_percentage
                + "% ." }} </strong></h3>

    </div>
    <div>
        <button v-if="restart" class="show-button" @click="restartfunction">Restart</button>
    </div>
</template>

<script>
import axios from 'axios';
import Slide from './Slide.vue';
import Percentagecircle from './Percentagecircle.vue';

export default {
    name: 'Compatibilite',
    components: {
        Slide,
        Percentagecircle
    },
    data() {
        return {
            // tableinfo:[100-this,'100%'],
            users: [],
            error: null,
            selectedUserIds: [],
            selectedUserIds1:[],
            resultcompatibilit: [],
            showlist: false,
            showresult: false,
            restart: false,
            // selectedUserNames: [],
            // percentage: 45
        };
    },
    mounted() {
        this.getUsers()
    },
    computed: {
        getlength() {
            console.log(this.selectedUserIds.length);
            return this.selectedUserIds.length;
        },
        getlength1() {
            console.log(this.selectedUserIds1.length);
            return this.selectedUserIds1.length;
        }
    },
    methods: {
        async getUsers() {
            try {
                console.log("papa");
                const response = await axios.get('http://localhost:3000/customers');
                this.users = response.data;
                this.showlist = !this.showlist;
                console.log(this.users);
                this.error = null;
            } catch (error) {
                this.error = 'Impossible de récupérer les utilisateurs';
                console.error('Erreur lors de la récupération des utilisateurs:', this.error);
            }
        },
        async sendSelectedUserIds() {
            if (this.selectedUserIds.length === 0) {
                this.error = 'Aucun utilisateur sélectionné';
                return;
            }
            try {
                const urltofetch = "http://localhost:3000/customer/astro_compatibility/" + this.selectedUserIds[0] + "/" + this.selectedUserIds1[0];
                // console.log("Url is: " + urltofetch);
                const response = await axios.get(urltofetch);
                this.resultcompatibilit = response.data;
                console.log('Réponse de l\'API:', response.data);
                this.showresult = !this.showresult;
                this.restart = !this.restart;
                // console.log()
                this.error = null;
            } catch (error) {
                this.error = 'Impossible d\'envoyer les IDs';
                console.error('Erreur lors de l\'envoi des IDs :', error);
            }
        },
        restartfunction() {
            this.restart = false;
            this.showlist = false;
            this.showresult = false;
            this.getUsers();
            this.selectedUserIds = [];
            this.selectedUserIds1 = [];

        }
    }
}
</script>
<style scoped>
.error {
    color: red;
}

.container-compatihilite h1 {
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    color: #2c509f;
    margin-top: 3%;
    margin-bottom: 20px;
}

.title-list {
    display: flex;
    justify-content: space-around;
}

h3 {
    color: #000000;
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    text-align: center;
    margin-top: 50px;
}

hr {
    width: 60%;
    height: 2px;
    background-color: #ddd;
    border: none;
    margin: 0 auto 20px auto;
}

.show-button,
.send-button {
    display: block;
    width: fit-content;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    padding: 12px 25px;
    font-size: 18px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 10px auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.show-button:hover,
.send-button:hover {
    background-color: #0056b3;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
    font-size: 1.2rem;
    color: #333;
    padding: 10px 0;
}

.list-client-compatibilite {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

#overflowTest {
    background: #f9f9f9;
    padding: 20px;
    width: 35%;
    height: 200px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin: 20px;
}

@media (max-width: 768px) {
    .container-compatihilite h1 {
        font-size: 2rem;
        margin-top: 5%;
    }

    h3 {
        font-size: 1.1rem;
    }

    #overflowTest {
        width: 80%;
        height: 150px;
        margin: 10px auto;
    }

    .list-client-compatibilite {
        flex-direction: column;
    }

    .title-list {
        flex-direction: column;
        align-items: center;
    }

    .show-button,
    .send-button {
        font-size: 16px;
        padding: 10px 20px;
    }
}

@media (max-width: 480px) {
    .container-compatihilite h1 {
        font-size: 1.75rem;
    }

    h3 {
        font-size: 1rem;
    }

    #overflowTest {
        width: 90%;
        height: 120px;
    }

    label {
        font-size: 1rem;
    }

    .show-button,
    .send-button {
        font-size: 14px;
        padding: 8px 15px;
    }
}
</style>
