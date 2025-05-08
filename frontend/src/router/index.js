import { createRouter, createWebHistory } from 'vue-router'
import FormLayanan from '../views/FormLayanan.vue'
import HomePage from '../views/HomePage.vue'


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

 
  // route lainnya...
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router
