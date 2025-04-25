import { defineStore } from 'pinia'
import client1 from '@/assets/img/clients/client-1.png'
import client2 from '@/assets/img/clients/client-2.png'
import client3 from '@/assets/img/clients/client-3.png'
import client4 from '@/assets/img/clients/client-4.png'
import client5 from '@/assets/img/clients/client-5.png'
import client6 from '@/assets/img/clients/client-6.png'
import client7 from '@/assets/img/clients/client-7.png'
import client8 from '@/assets/img/clients/client-8.png'

export const useClientsStore = defineStore('clients', {
  state: () => ({
    logos: [
      client1,
      client2,
      client3,
      client4,
      client5,
      client6,
      client7,
      client8
      
    ]
  })
})
