import { createRouter, createWebHistory } from 'vue-router'
import FormLayanan from '../views/FormLayanan.vue'
import HomePage from '../views/HomePage.vue'
import ErrorPageNotFound from '../components/Error404.vue' // UBAH NAMA IMPORT
import OurFacility from '../views/ourfacility.vue'

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
        path: '/OurFacility',
        name: 'ourfacility',
        component: OurFacility
    },
    
    // 404 Error Route - HARUS DI PALING BAWAH
    {
        path: '/:pathMatch(.*)*',
        name: 'ErrorPageNotFound', // UBAH NAMA ROUTE
        component: ErrorPageNotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router