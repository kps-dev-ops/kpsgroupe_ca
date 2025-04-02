
  <!-- <div :class="['vertical-menu', { 'open': isOpen }]">
    <button @click="toggleMenu" class="menu-toggle">☰</button>
    <div class="menu-content">
      <ul>
        <li>
          <router-link to="/">
            <i class="fas fa-home"></i> Home
          </router-link>
        </li>
        <li>
          <router-link to="/Custumers">
            <i class="fas fa-users"></i> Custumers
          </router-link>
        </li>
        <li>
          <router-link to="/Coaches">
            <i class="fas fa-user-tie"></i> Coaches
          </router-link>
        </li>
        <li>
          <router-link to="/statistics">
            <i class="fas fa-chart-bar"></i> Statistics
          </router-link>
        </li>
        <li>
          <router-link to="/tips">
            <i class="fas fa-lightbulb"></i> Tips
          </router-link>
        </li>
        <li>
          <router-link to="/events">
            <i class="fas fa-calendar-alt"></i> Events
          </router-link>
        </li>
        <li>
          <router-link to="/GardeRobe">
           <i class="fas fa-tshirt"></i> Garde Robe
          </router-link>
        </li>

        <li>
          <router-link to="/Compatibilite">
            <i class="fas fa-balance-scale"></i> Compatibilite
          </router-link>
        </li>

        <li>
          <router-link to="/Statistique">
            <i class="fas fa-chart-bar"></i> Statistique
          </router-link>
        </li>


      </ul>
    </div>
  </div> -->
  <template>
    <div>
      <div class="navbar">
        <div class="pos">
          <div class="logo">Soul Connection</div>
        </div>
  
        <div class="topnav">
          <router-link class="active" to="/">Home</router-link>
          <router-link to="/Custumers">Custumers</router-link>
          <router-link to="/Coaches">Coaches</router-link>
          <router-link to="/tips">Tips</router-link>
          <router-link to="/events">Events</router-link>
          <router-link to="/GardeRobe">GardeRobe</router-link>
          <router-link to="/Compatibilite">Compatibilite</router-link>
          <router-link to="/Statistique">Statistique</router-link>
        </div>
  
        <div class="icons">
          <i class="fas fa-bell notification-icon"></i>
        
          <div class="language-dropdown">
            <button class="flag-btn" @click="toggleDropdown">
              <!-- <img src="@/assets/france-flag.jfif" alt="Current language" class="flag" /> -->
            </button>
            <div v-if="dropdownOpen" class="dropdown-content">
              <!-- <img src="@/assets/france-flag.jfif" @click="changeLanguage('fr')" alt="French" class="dropdown-flag" />
              <img src="@/assets/spanish.jfif" @click="changeLanguage('es')" alt="Spanish" class="dropdown-flag" />
              <img src="@/assets/uk.jfif" @click="changeLanguage('en')" alt="English" class="dropdown-flag" />
              <img src="@/assets/turk.jfif" @click="changeLanguage('tr')" alt="Turkish" class="dropdown-flag" /> -->
            </div>
          </div>
  
        
  
    
          <i class="fas fa-user profile-icon"></i>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dropdownOpen: false,
        currentFlag: 'fr' 
      };
    },
    methods: {
      toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
      },
      changeLanguage(languageCode) {
     
        this.currentFlag = languageCode;
        console.log(`Language changed to: ${languageCode}`);
        this.dropdownOpen = false;
        
    
      }
    }
  }
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  .topnav {
    display: flex;
    justify-content: center;
    padding: 10px;
    background-color: #ffffff;
  }
  
  .topnav a {
    color: #161c31;
    font-weight: 600;
    padding: 10px 14px;
    text-decoration: none;
    font-size: 12px;
    transition: background-color 0.3s ease;
    
  }
  
  .topnav a:hover {
    background-color: #ddd;
    color: black;
  }
  
  .topnav a.active {
    background-color: #5670b2;
    color: white;
  }
  
  .pos {
    position: absolute;
    left: 0;
  }
  
  .icons {
    position: absolute;
    right: 0;
    display: flex;
    gap: 20px;
    align-items: center;
  }
  
  .flag-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  
  .flag {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .language-dropdown {
    position: relative;
  }
  
  .dropdown-content {
    position: absolute;
    top: 40px;
    right: 0;
    background-color: #ffffff;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    z-index: 10;
    display: flex;
    flex-direction: column;
  }
  
  .dropdown-flag {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    margin: 5px;
  }
  
  .notification-icon, .profile-icon {
    font-size: 20px;
    color: #5670b2;
    cursor: pointer;
  }
  
  .logo {
    font-size: 20px;
    font-weight: bold;
    color: #5670b2;
  }
  </style>
  