import { defineStore } from 'pinia'

export const useClientsStore = defineStore('clients', {
  state: () => ({
    logos: [
      '/src/assets/img/clients/client-1.png',
      '/src/assets/img/clients/client-2.png',
      '/src/assets/img/clients/client-3.png',
      '/src/assets/img/clients/client-4.png',
      '/src/assets/img/clients/client-5.png',
      '/src/assets/img/clients/client-6.png',
      '/src/assets/img/clients/client-7.png',
      '/src/assets/img/clients/client-8.png'
      
    ]
  })
})
