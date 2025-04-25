import { defineStore } from 'pinia'

export const useDocStore = defineStore('docStore', {
  state: () => ({
    steps: {
      login: new URL('../assets/img/login-url.png', import.meta.url).href,
      loginForm: new URL('../assets/img/login-form.png', import.meta.url).href,
      dashboard: new URL('../assets/img/dashboard.png', import.meta.url).href,
      newPostButton: new URL('../assets/img/new-post.png', import.meta.url).href,
      form1: new URL('../assets/img/form-step1.png', import.meta.url).href,
      form2: new URL('../assets/img/form-step2.png', import.meta.url).href,
      form3: new URL('../assets/img/form-step3.png', import.meta.url).href,
      head: new URL('../assets/img/logo2.png', import.meta.url).href
    }
  })
})
