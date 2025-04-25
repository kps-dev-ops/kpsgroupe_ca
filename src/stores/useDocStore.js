import { defineStore } from 'pinia'
import loginUrl from '@/assets/img/login-url.png'
import loginForm from '@/assets/img/login-form.png'
import dashboard from '@/assets/img/dashboard.png'
import newPostButton from '@/assets/img/new-post.png'
import form1 from '@/assets/img/form-step1.png'
import form2 from '@/assets/img/form-step2.png'
import form3 from '@/assets/img/form-step3.png'
import head from '@/assets/img/logo2.png'

export const useDocStore = defineStore('docStore', {
  state: () => ({
    steps: {
      login: loginUrl,
      loginForm: loginForm,
      dashboard: dashboard,
      newPostButton: newPostButton,
      form1: form1,
      form2: form2,
      form3: form3,
      head: head
    }
  })
})
