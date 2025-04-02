<template>
    <div class="container">
      <p class="message">
        Successful Operation
    </p>
      <button class="redirect-button" @click="this.$router.push('/Coaches')">
        Come back
      </button>
    </div>
  </template>
  
  <script>
  import Logo from '../Logo.vue';
  
  export default {
    components: {
      Logo
    },
    name: 'Redirection',
    data() {
      return {};
    },
    methods: {}
  };
  </script>
  
  <style scoped>

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f4f8; 
  }
  
  .message {
    font-size: 2rem;
    font-weight: bold;
    color: #2c3e50; 
    margin-bottom: 20px;
  }
  
  .redirect-button {
    padding: 12px 24px;
    font-size: 1.2rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .redirect-button:hover {
    background-color: #2980b9;
  }
  
  .redirect-button:active {
    background-color: #1c5981; 
  }
  
  @media (max-width: 600px) {
    .message {
      font-size: 1.5rem;
    }
    
    .redirect-button {
      font-size: 1rem;
      padding: 10px 20px;
    }
  }
  </style>
  