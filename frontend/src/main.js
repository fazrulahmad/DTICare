import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// PERBAIKAN: Gunakan nama file yang sesuai dengan case-sensitive
import { setupAxiosInterceptors } from '@/utils/errorHandler'
// Setup axios interceptors untuk menangani error API
setupAxiosInterceptors(axios)

// Create Vue app
const app = createApp(App)

// Make axios available globally
app.config.globalProperties.$http = axios

// Global error handler untuk menangani error Vue
app.config.errorHandler = (err, instance, info) => {
    console.error('Global Vue Error:', err, info)
    // PERBAIKAN: Gunakan nama file yang konsisten (errorHandler, bukan ErrorHandler)
    import('@/utils/errorHandler').then(({ errorHandler, ERROR_TYPES, ERROR_SEVERITY }) => {
        errorHandler.handleError(err, ERROR_TYPES.UNKNOWN, ERROR_SEVERITY.HIGH)
    })
}

app.use(router).mount('#app')