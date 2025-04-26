import { createRouter, createWebHistory } from 'vue-router'
import FormLayanan from '../views/FormLayanan.vue'
import HomePage from '../views/HomePage.vue'
import StatusSurat from '@/views/StatusSurat.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    
    {
        path: '/form-layanan',
        name: 'FormLayanan',
        component: FormLayanan
    },

    {
        path: '/status-surat',
        name: 'StatusSurat',
        component: StatusSurat
    }

 
  // route lainnya...
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router
