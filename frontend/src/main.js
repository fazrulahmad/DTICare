import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// PERBAIKAN: Gunakan nama file yang sesuai dengan case-sensitive
import { setupAxiosInterceptors, errorHandler, ERROR_TYPES, ERROR_SEVERITY } from '@/utils/errorHandler'

// Setup axios interceptors untuk menangani error API
setupAxiosInterceptors(axios)

// ===== SUPPRESS NATIVE BROWSER ERROR DIALOGS =====
// Note: errorHandler.js already handles these, we just need to prevent native dialogs

// Network errors already handled by errorHandler.js axios interceptors

// ===== VUE APP SETUP =====

// Create Vue app
const app = createApp(App)

// Make axios available globally
app.config.globalProperties.$http = axios

// Global error handler untuk menangani error Vue
app.config.errorHandler = (err, instance, info) => {
    console.error('Global Vue Error:', err, info)
    
    // Use errorHandler.handleError method instead of addError
    errorHandler.handleError(err, ERROR_TYPES.VUE, ERROR_SEVERITY.HIGH, `Vue Error in ${instance?.$options.name || 'Unknown Component'}`)
}

// Global warning handler (optional)
app.config.warnHandler = (msg, instance, trace) => {
    console.warn('Vue Warning:', msg, trace)
    
    // Handle Vue warnings with lower severity
    errorHandler.handleError(new Error(msg), ERROR_TYPES.VUE, ERROR_SEVERITY.LOW, 'Vue Warning')
}

app.use(router).mount('#app')