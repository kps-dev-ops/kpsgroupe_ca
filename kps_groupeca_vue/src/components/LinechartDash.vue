<template>
  <Logo />
  <div class="login-page">
    <div class="login-container">
      <form @submit.prevent="login">
        <div class="form-group">
          <input type="email" id="email" v-model="email" placeholder="Nom d'utilisateur" />
          
          <span v-if="emailError" class="error-message">
            <span class="error-icon">✖️</span> {{ emailError }}
          </span>
          
          <input type="password" id="password" v-model="password" placeholder="Mot de passe" />
         
          <span v-if="passwordError" class="error-message">
            <span class="error-icon">✖️</span> {{ passwordError }}
          </span>
        </div>
        <button type="submit" class="bouil">Se connecter</button>
        <button @click.prevent="forgotPassword" class="btn-forgot-password">Mot de passe oublié ?</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Logo from '../Logo.vue';

export default {
  components: {
    Logo
  },
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      emailError: '', 
      passwordError: ''
    };
  },
  methods: {
    async login() {
      this.clearErrors();
      if (!this.email || !this.isValidEmail(this.email)) {
        this.emailError = 'Please enter a valid email or phone number.';
      }
      if (!this.password || this.password.length < 4 || this.password.length > 60) {
        this.passwordError = 'Your password must contain between 4 and 60 characters.';
      }

      if (!this.emailError && !this.passwordError) {
        try {
          const response = await axios.post('http://localhost:3000/employees/login/', {
            email: this.email,
            password: this.password
          });

          if (response.data.success) {
            localStorage.setItem('authToken', response.data.token);
            this.$router.push('/home');
          } else {
            alert('Identifiants de connexion incorrects');
          }
        } catch (error) {
          console.error('Erreur lors de la connexion:', error);
          alert('Une erreur est survenue lors de la connexion');
        }
      }
    },
    isValidEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
    clearErrors() {
      this.emailError = '';
      this.passwordError = '';
    },
    forgotPassword() {
      this.$router.push('/forgot-password');
    }
  }
};
</script>

<style scoped>
.login-page {
  display: grid;
  place-items: center;
  height: 100vh;
  background: url('@/assets/desine.jpg') no-repeat center center;
  background-size: cover;
  background-color: rgb(197, 200, 202);
  background-blend-mode: multiply;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.login-container {
  max-width: 400px;
  padding: 20px;
  border: 1px solid #090909;
  border-radius: 8px;
  box-shadow: 0 2px 10px #000000;
}

.form-group {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #000000;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #000000;
  outline: none;
}

input::placeholder {
  color: #cccccc;
}

.bouil {
  width: 100%;
  padding: 10px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
}

.bouil:hover {
  background-color: #000000;
}

.btn-forgot-password {
  background: none;
  color: #000000;
  border: none;
  cursor: pointer;
  justify-content: center;
  margin-left: 100px;
 
}

.btn-forgot-password:hover {
  
  text-decoration: underline;
}

.error-message {
  color: #07070790;
  font-size: 0.9em;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}


.error-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
  font-size: 12px;
}

</style>