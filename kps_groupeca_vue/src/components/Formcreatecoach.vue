<template>
  <div>
    <slide />
    <div class="banne">
      <img class="imgfo" alt="Vue logo" src="@/assets/thuu.png" width="90" height="70" />
    </div>

    <div class="banne-image">
      <img class="banner-img" alt="Bannière" src="@/assets/baniere.png" />
      <div class="banner-text">
        <h1>Garde Robe</h1>
      </div>
    </div>

    <div class="client-section" v-if="!isBoutiqueVisible">
      <h1>Clients</h1>
      <div class="client-list">
        <button v-for="client in clients" :key="client.id" @click="selectClient(client)">
          {{ client.name }}
        </button>
      </div>
    </div>

    <div class="boutique-section" v-if="isBoutiqueVisible">
      <button @click="showClientList">Back to Clients</button>
      <div class="vetement">
        <h1>Vêtements</h1>
        <div class="clothing-list">
          <div v-for="clothes in filteredClothes" :key="clothes.id" class="clothing-item">
            <img :src="clothes.src" :alt="clothes.name" class="clothing-image" />
            <div class="clothing-info">
              <h2>{{clothes.name }}</h2>
              <p>{{clothes.price }}</p>
              <button @click="toggleSelection(clothes)">
                {{ selectedClothes.includes(clothes) ? 'Deselect' : 'Select' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="selected-clothes" v-if="selectedClothes.length > 0">
        <h2>Vêtements sélectionnés{{ selectedClient ? ' - ' + selectedClient.name : '' }}</h2>
        <ul>
          <li v-for="clothes in selectedClothes" :key="clothes.id">
            <img :src="`data:image/png;base64,${clothes.image}`" :alt="clothes.name" class="clothing-image" />
            <p>{{ clothes.name }} - {{ clothes.price }}</p>
          </li>
        </ul>
        <button @click="saveSelection">Enregistrer la sélection</button>
      </div>
    </div>
  </div>
</template>

<script>
import Slide from './Slide.vue';
import tshirtImg from '@/assets/nike.jfif';
import jea from '@/assets/jea.jfif';
import jean from '@/assets/jean.jfif';
import axios from 'axios';

export default {
  components: {
    Slide
  },
  data() {
    return {
      clients: [],
      clothes: [],
      selectedClient: null,
      selectedClothes: [],
      isBoutiqueVisible: false
    };
  },
  computed: {
    filteredClothes() {
      return this.clothes;
    }
  },
  mounted() {
    this.fetchClients();
    this.fetchClothes();
  },
  methods: {
    async fetchClients() {
      try {
        const response = await axios.get('http://localhost:3000/customers')
        // const response = {
        //   data: {
        //     clients: [
        //       { id: 1, name: 'jean' },
        //       { id: 2, name: 'daniel' },
        //       { id: 3, name: 'luc' }
        //     ]
        //   }
        // };
        this.clients = response.data;
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    },

    async fetchClothes() {
    try {
      if (!this.selectedClient) {
        console.error('Aucun client sélectionné');
        return;
      }
      const response = await axios.get(`http://localhost:3000/clothes/${this.selectedClient.id}`);
      this.clothes = response.data;
    } catch (error) {
      console.error('Error fetching clothes:', error);
    }
  },
 

  selectClient(client) {
  this.selectedClient = client;
  this.isBoutiqueVisible = true;
  this.fetchClothes();
},

    showClientList() {
      this.isBoutiqueVisible = false;
      this.selectedClient = null;
      this.selectedClothes = [];
    },

    toggleSelection(item) {
      const index = this.selectedClothes.indexOf(item);
      if (index === -1) {
        this.selectedClothes.push(item);
      } else {
        this.selectedClothes.splice(index, 1);
      }
    },

    async saveSelection() {
      if (!this.selectedClient || this.selectedClothes.length === 0) {
        alert('Please select a client and clothes.');
        return;
      }

      const data = {
        clientName: this.selectedClient.name,
        clothingIds: this.selectedClothes.map(item => item.id)
      };

      try {

        await axios.post('your-backend-api-url/save-selection', data);
        alert('Selection saved successfully!');
      } catch (error) {
        console.error('Error saving selection:', error);
        alert('An error occurred while saving.');
      }
    }
  }
};
</script>

<style scoped>


.imgf {
    position: relative;
    left: -340px;
    top: -10px;
  }

.banne {

  top: 0;
  z-index: 10;
  background-color: #f2f2f2;
  width: 100%;
  margin-top: -100;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.banne-image {
  /* position: relative; */
  
 
  z-index: 1;
  display: flex;
  justify-content: center;
  margin: 10px 0;
  margin-top:-100px;
 
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
 
  box-shadow: 0 2px 10px #ffffff;
}

.banner-img {
  
  max-width: 1200px;
  margin-top: 100px;
  height: auto;
  object-fit: cover;
  border-radius: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
}

.banner-text {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000000;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  text-align: center;
}

.banner-text:hover {
  color:#62b8f1;
}


.banner-text h1 {
  font-size: 3em;
  margin: 0;
}

.vetement {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  /* text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); */
}

.vetement h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;
}

.clothing-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.clothing-item {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.clothing-item:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.clothing-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.clothing-info {
  padding: 15px;
}

.clothing-info h2 {
  font-size: 1.4em;
  margin: 10px 0;
  color: #333;
}

.clothing-info p {
  font-size: 1.2em;
  color: #555;
}

.selected-clothes {
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
}

.selected-clothes h2 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;
}

.selected-clothes ul {
  list-style: none;
  padding: 0;
}

.selected-clothes li {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.selected-clothes img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 5px;
}

.selected-clothes p {
  font-size: 1.2em;
  color: #333;
}

.client-section {
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
}

.client-section h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;
}

.client-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.client-list button {
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color:#62b8f1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.client-list button:hover {
  background-color: #668da8;
}

.selected-clothes button {
  padding: 10px 20px;
  font-size: 1.2em;
  color: #fff;
  background-color: #62b8f1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.selected-clothes button:hover {
  background-color: #668da8;
}
.boutique-section button {
  padding: 10px 20px;
  font-size: 1.2em;
  color: #fff;
  background-color: #62b8f1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  margin-bottom: 20px;
}

.boutique-section button:hover {
  background-color: #668da8;
  transform:scale(1.05);
}


@media (max-width: 1200px) and (min-width: 601px) {
  .login-container {
    padding: 20px;
    width: 80%;
  }
  .connexion {
    font-size: 1.5em;
    margin-bottom: 20px;
  }

  
  .banner-text {
    position: absolute;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);
    color: black;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    text-align: center;
  }

  .banner-text h1 {
    font-size: 3em;
    margin: 0;
  }
}


@media (max-width: 600px){
  .login-container {
    padding: 20px;
    width: 80%;
  }
  .connexion {
    font-size: 1.5em;
    margin-bottom: 20px;
  }

  
  .banner-text {
    position: absolute;
    top: 35%;
    left: 60%;
    transform: translate(-50%, -50%);
    color: black;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    text-align: center;
  }

  .banner-text h1 {
    font-size: 1em;
    margin: 0;
  }
}



</style>


