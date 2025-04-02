<template>
    <Slide />

    <div class="coach">
        <h1>Coaches List</h1>

        <p>You have total {{ coachs.length }} coaches.</p>
        <!-- <hr /> -->
        <!-- <button class="" @click="getcoach">List coach</button> -->
        <!-- <div v-if="users.length != 0"> -->

        <table class="coachtable" v-if="showlistcoach">
            <thead>
                <tr class="headtablecoach">
                    <button @click="showformcreatecoach = !showformcreatecoach" class="buttoncreate">Create</button>
                    <button @click="exportCustomers" class="buttonexport">Export</button>
                    <input type="text" placeholder="Search" v-model="strsearch">
                </tr>
                <tr>
                    <!-- <th>#</th> -->
                    <th>id</th>
                    <th>Coach</th>
                    <th>Email</th>
                    <th>Birth Date</th>
                    <!-- <th>Phone</th> -->
                    <th>Number of customers</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tr v-for="coach in filteredCoachs" :key="coach.id">
                <td>
                    <div class="picture">{{ coach.name[0] + coach.name[1] }}</div>
                </td>
                <td v-text="coach.name"></td>
                <td v-text="coach.email"></td>
                <td v-text="coach.birth_date"></td>
                <td @click="listclientcoach(coach.id)" v-text="coach.numberOfClients"> </td>
                <!-- <td @click="toggleEditList">
                    <label>
                        <input type="radio" :value="coach.id" v-model="selectcoach" />edit-list
                    </label>
                </td> -->
                <td @click="selectaction(coach.id)" :key="coach.id">
                    ...
                    <!-- :value="user.id" v-model="tabCustomers" -->
                    <button v-if="showaction && selectedcoachId1 == coach.id" class="buttondelete"
                        @click="deletecoach(coach.id)">Delete</button>
                    <button v-if="showaction && selectedcoachId1 == coach.id" class="buttonupdate"
                        @click="update(coach)">Update</button>
                    <button v-if="showaction && selectedcoachId1 == coach.id" class="buttonassign"
                        @click="toggleEditList">assign</button>
                    <!-- <button  v-if="showaction" class="buttoncreate" @click="create()">Create</button> -->
                </td>
                <!-- <td>
                </td> -->
            </tr>
        </table>

        <Formcoach1 v-if="showformcreatecoach" />

        <div id="overflowlist" v-if="showeditlist">
            <div v-for="user in users" :key="user.id">
                <label>
                    <input type="checkbox" :value="user.id" v-model="tabCustomers" />
                    {{ user.name }}
                </label>
            </div>
            <button class="button-editlist" @click="sendaffect">Affect</button>
        </div>
        <!--  -->
        <div id="overflowlist" v-if="showclientcoach">
            <div v-for="clientcoach in clientcoachs" :key="clientcoachs.id">
                <p>{{ clientcoach.name + ' ' + clientcoach.surname }}</p>
                <!-- <label>
                    <input type="checkbox" :value="clientcoach.id" />
                    {{ user.name }}
                </label> -->
            </div>
            <!-- <button class="button-editlist" @click="sendaffect">Affect</button> -->
        </div>
        <p v-if="error" class="error">Erreur: {{ error }}</p>
    </div>



</template>


<script>
import axios from 'axios';
import Slide from './Slide.vue';
import Formcoach1 from './Formcoach1.vue';

export default {
    name: 'Formcreatecoach',
    components: {
        Slide,
        Formcoach1
    },
    mounted() {
        this.getcoach();
    },
    computed: {
        filteredCoachs() {
            const string = this.strsearch.toLowerCase();
            return this.coachs.filter(coach => {
                return (coach.name.toLowerCase().includes(string));
            });
        }
    },
    data() {
        return {
            showForm: false,
            showaction: false,
            showformcreatecoach: false,
            strsearch: '',
            coachs: [],
            clientcoachs: [],
            // clientcoach:[],
            showclientcoach: false,
            showlistcoach: false,
            showeditlist: false,
            selectedcoachId1: 0,
            tabCustomers: [],
            users: [],
            // selectdeletecoach:[],
            // selectcoach:null,
            coachData: {
                coachname: '',
                coachsurname: '',
                coachemail: '',
                coachender: '',
                coachwork: ''
            }
        };
    },
    methods: {
        async getcoach() {
            try {
                const response = await axios.get('http://localhost:3000/getCoachsWithClients');
                this.coachs = response.data;
                this.showlistcoach = !this.showlistcoach;
                this.showeditlist = false;
                this.error = null;
            } catch (error) {
                this.error = 'Impossible de récupérer les utilisateurs';
                console.error('Erreur lors de la récupération des utilisateurs:', error);
            }
        },
        async deletecoach(Coachid) {
            try {
                const response = await axios.delete(`http://localhost:3000/employees/${Coachid}`);
                this.coachs = this.coachs.filter(coach => coach.id !== Coachid);
                this.error = null;
            } catch (error) {
                this.error = 'Impossible de récupérer les utilisateurs';
                console.error('Erreur lors de la récupération des utilisateurs:', error);
            }
        },
        async toggleEditList() {
            this.showeditlist = !this.showeditlist;
            try {
                // console.log("papa");
                const response = await axios.get('http://localhost:3000/customers');
                this.users = response.data;
                console.log(this.selectcoach);
                this.error = null;
            } catch (error) {
                this.error = 'Impossible de récupérer les utilisateurs';
                console.error('Erreur lors de la récupération des utilisateurs:', this.error);
            }
        },
        async sendaffect() {
            console.log(this.selectedcoachId1);
            console.log(this.tabCustomers);
            this.showeditlist = false;
            try {
                const response = await axios.post(`http://localhost:3000/coachCustomers/${this.selectedcoachId1}`, {
                    tabCustomers: this.tabCustomers
                });
                this.success = 'Liste envoyé avec succès!';
                this.error = null;
                console.log('Réponse de l\'API:', response.data);
                this.$router.push('/redirection');
            } catch (err) {
                this.error = 'Erreur lors de l\'envoi de la liste.';
                this.success = null;
                console.error('Erreur lors de l\'envoi de la liste:', err);
            }
        },

        async listclientcoach(coachid) {
            try {
                console.log(coachid);
                const response = await axios.get(`http://localhost:3000/getEmployeesByCoach/${coachid}`);
                this.clientcoachs = response.data;
                this.showclientcoach = !this.showclientcoach;
                console.log(this.clientcoachs);
                // this.error = null;
            } catch (error) {
                this.error = 'Impossible de récupérer les utilisateurs';
                console.error('Erreur lors de la récupération des utilisateurs:', this.error);
            }
        },
        async update(coach) {
            const coachinfo = JSON.stringify(coach);
            this.$router.push({
                name: 'Formcoach',
                params: { coachinfo }
            });
        },
        selectaction(coachid) {
            this.showaction = !this.showaction;
            this.selectedcoachId1 = coachid;
            console.log(this.selectedcoachId1);
        },
        exportCustomers() {
            const csvContent = [
                ['Name', 'Email', 'birth_date', 'numberOfClients'],
                ...this.coachs.map((coach) => [
                    coach.name,
                    coach.email,
                    coach.birth_date,
                    coach.numberOfClients,
                ]),
            ]
                .map((e) => e.join(','))
                .join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', 'coach.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
    }
};
</script>



<style>
.coach h1 {
    /* text-align: center; */
    font-size: 1.5rem;
    font-weight: bold;
    color: #000000;
    margin-top: 3%;
    margin-bottom: 20px;
}

.coachtable {
    width: 100%;
    margin: 20px auto;
    /* border-collapse: None; */
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.coachtable th,
.coachtable td {
    padding: 15px;
    text-align: left;
    /* border: 1px solid #ddd; */
    font-size: 1rem;
}

.coachtable tr {

    border: 1px solid #ddd;
}

.coachtable th {
    background-color: #ffffff;
    color: rgb(0, 0, 0);
    /* font-size: 1.2rem; */
    /* text-transform: uppercase; */
}

.coachtable tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
}

.coachtable td {
    font-size: 1rem;
}

.buttondelete {
    background-color: #e74c3c;
    color: white;
    border: none;
    /* padding: 8px 12px; */
    font-size: 0.9rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    margin-right: 1%;
}

.buttondelete:hover {
    background-color: #c0392b;
}

.buttonupdate {
    background-color: #73e047;
    color: white;
    border: none;
    /* padding: 8px 12px; */
    font-size: 0.9rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    margin-right: 1%;
}

.buttonupdate:hover {
    background-color: #2b6519;
}

.buttonassign {
    background-color: #ed8403;
    color: white;
    border: none;
    /* padding: 8px 12px; */
    font-size: 0.9rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    margin-right: 1%;
}

.buttonassign:hover {
    background-color: rgb(170, 82, 10);
}

.buttonexport{
    background-color: #204be7;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.buttonexport:hover {
    background-color: #150e7b;
}

/* .buttoncreate {
    background-color: #4e82ea;
    color: white;
    border: none; */
/* padding: 8px 50px; */
/* padding-right: 10%;
    font-size: 0.9rem;
    border-radius: 4px;
    transition: background-color 0.3s ease; */
/* margin-right: 2%; */
/* } */

/* .buttoncreate:hover {
    background-color: #0c164a;
} */

.picture {
    width: 30px;
    height: 30px;
    background-color: #4a518c;
    color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    font-weight: bold;
    text-transform: uppercase;

}

/* .picture p{
} */

#overflowlist {
    background-color: #f9f9f9;
    margin: 20px auto;
    padding: 10px;
    width: 60%;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#overflowlist label {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

#overflowlist input[type="checkbox"] {
    margin-right: 10px;
}

.button-editlist {
    display: block;
    margin: 20px auto;
    padding: 12px 24px;
    background-color: #2c509f;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.button-editlist:hover {
    background-color: #1b3a6f;
}

hr {
    width: 80%;
    margin: 20px auto;
    border: none;
    height: 2px;
    background-color: #ddd;
}

.error {
    color: red;
    font-weight: bold;
    text-align: center;
}

.headtablecoach {
    display: flex;
    justify-content: space-between;
    /* width: 100%; */
    align-items: center;
    padding: 10px;
    background-color: #f5f5f5;
    border-bottom: 2px solid #ddd;
}

.buttoncreate {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.buttoncreate:hover {
    background-color: #45a049;
}

input[type="text"] {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    width: 200px;
    transition: box-shadow 0.3s ease;
}

input[type="text"]:focus {
    outline: none;
    box-shadow: 0px 0px 5px rgba(0, 150, 255, 0.5);
}


/* .headtablecoach
{
    padding: 60%;
    border: none;
    display: flex;
} */

/* .coachtable input[type="text"] {
    margin-left: 80%;
    border: none;
    width: 100%;
    padding-right: 200%;
} */
</style>
