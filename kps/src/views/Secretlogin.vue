<template>
    <div class="login-page">
      <transition name="fade-slide">
        <img :src="authStore.logoUrl" alt="Logo KPS" class="logo" />
      </transition>
      <transition name="fade-slide" appear>
        <div class="login-container">
          <h2>Connexion</h2>
          <form @submit.prevent="login">
            <div class="form-group">
              <input id="email" type="email" v-model="email" placeholder="Adresse email" required autocomplete="off" />
            </div>
            <div class="form-group">
              <input id="password" type="password" v-model="password" placeholder="Mot de passe" required autocomplete="new-password" />
            </div>
            <button type="submit">Se connecter</button>
            <p v-if="error" class="error">{{ error }}</p>
          </form>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { account } from '../lib/appwrite.js'
import { useBlogStore } from '../stores/blog'

  const email = ref('')
  const password = ref('')
  const error = ref('')
  const router = useRouter()
  const authStore = useAuthStore()
  const blog = useBlogStore()

  const login = async () => {
  try {
    await blog.login(email.value, password.value)
    router.push('/Blogs')
  } catch (err) {
    error.value = err.message
  }
}

onMounted(async () => {
  try {
    const user = await account.get()
    authStore.setToken(user.$id)
    router.push('/Blogs')
  } catch {
  }
})
  </script>
  
  <style scoped>
  .login-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f4fbfa, #e8f5f3);
    padding-top: 40px;
  }
  
  .logo {
    width: 150px;
    margin-bottom: 30px;
  }
  
  .login-container {
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    border-radius: 15px;
    background: #f9f9f9;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    font-family: 'Segoe UI', sans-serif;
  }
  
  h2 {
    text-align: center;
    color: #837121;
    margin-bottom: 1rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
  }
  
  input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    background-color: #ffffff;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  input::placeholder {
    color: #999;
    font-style: italic;
  }
  
  input:focus {
    border-color: #4CA18B;
    box-shadow: 0 0 0 2px rgba(76, 161, 139, 0.3);
  }
  
  input:-webkit-autofill {
    box-shadow: 0 0 0px 1000px #ffffff inset !important;
    -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
    -webkit-text-fill-color: #000 !important;
  }
  
  button {
    width: 100%;
    padding: 0.9rem;
    border: none;
    border-radius: 10px;
    background-color: #4CA18B;
    color: white;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #3d8571;
  }
  
  .error {
    color: red;
    text-align: center;
    margin-top: 1rem;
  }
  
  .fade-slide-enter-active {
    transition: all 0.6s ease;
  }
  .fade-slide-leave-active {
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(-20px);
  }
  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(40px);
  }
  .fade-slide-enter-to {
    opacity: 1;
    transform: translateY(0);
  }
  </style>
  