// src/utils/errorHandler.js
import { reactive } from 'vue';

// Global error state
export const errorState = reactive({
  errors: []
});

// Error types
export const ERROR_TYPES = {
  NETWORK: 'network',
  VALIDATION: 'validation',
  AUTHENTICATION: 'authentication',
  AUTHORIZATION: 'authorization',
  NOT_FOUND: 'not_found',
  SERVER: 'server',
  UNKNOWN: 'unknown',
  RUNTIME: 'runtime',
  PROMISE: 'promise',
  CONSOLE: 'console'
};

// Error severity levels
export const ERROR_SEVERITY = {
  LOW: 'info',
  MEDIUM: 'warning',
  HIGH: 'error',
  CRITICAL: 'error'
};


class ErrorHandler {
  constructor() {
    this.setupGlobalErrorHandlers();
  }

  // Setup global error handlers
  setupGlobalErrorHandlers() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.handleError(event.reason, ERROR_TYPES.PROMISE, ERROR_SEVERITY.HIGH);
      event.preventDefault(); // Prevent native browser dialog
    });

    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      console.error('JavaScript error:', event.error);
      this.handleError(event.error, ERROR_TYPES.RUNTIME, ERROR_SEVERITY.HIGH);
      event.preventDefault(); // Prevent native browser dialog
    });
  }

  // Main error handling method
  handleError(error, type = ERROR_TYPES.UNKNOWN, severity = ERROR_SEVERITY.MEDIUM, customMessage = '') {
    const errorInfo = this.parseError(error, type, severity, customMessage);
    
    // Add to global error state
    errorState.errors.push({
      id: Date.now() + Math.random(),
      ...errorInfo,
      timestamp: new Date().toISOString()
    });

    // Log error for debugging
    console.error('Error handled:', errorInfo);

    // DISABLED: Auto-remove is now handled by ErrorMessage component (10 seconds)
    // Auto-remove error after certain time for non-critical errors
    // if (severity !== ERROR_SEVERITY.CRITICAL) {
    //   setTimeout(() => {
    //     this.removeError(errorState.errors[errorState.errors.length - 1]?.id);
    //   }, severity === ERROR_SEVERITY.LOW ? 3000 : 5000);
    // }

    return errorInfo;
  }

  // Parse different types of errors
  parseError(error, type, severity, customMessage) {
    let message = customMessage;
    let details = '';
    let title = '';

    if (error?.response) {
      // Axios error with response
      const status = error.response.status;
      const data = error.response.data;

      title = this.getErrorTitle(status, type);
      message = message || data?.message || this.getDefaultMessage(status, type);
      details = JSON.stringify(data, null, 2);

      // Determine type based on status code
      if (status === 404) type = ERROR_TYPES.NOT_FOUND;
      else if (status === 401) type = ERROR_TYPES.AUTHENTICATION;
      else if (status === 403) type = ERROR_TYPES.AUTHORIZATION;
      else if (status >= 500) type = ERROR_TYPES.SERVER;
      else if (status >= 400) type = ERROR_TYPES.VALIDATION;

    } else if (error?.request) {
      // Network error
      type = ERROR_TYPES.NETWORK;
      title = 'Kesalahan Jaringan';
      message = message || 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
      details = 'Request failed: ' + error.message;

    } else if (error?.message) {
      // JavaScript error
      message = message || error.message;
      details = error.stack || error.toString();
      title = this.getErrorTitle(null, type);

    } else {
      // Unknown error
      message = message || 'Terjadi kesalahan yang tidak diketahui';
      details = error ? error.toString() : 'No error details available';
      title = 'Kesalahan Tidak Diketahui';
    }

    return {
      type,
      severity,
      title,
      message,
      details,
      originalError: error
    };
  }

  // Get error title based on status and type
  getErrorTitle(status, type) {
    if (status) {
      switch (status) {
        case 400: return 'Permintaan Tidak Valid';
        case 401: return 'Akses Ditolak';
        case 403: return 'Tidak Memiliki Izin';
        case 404: return 'Halaman Tidak Ditemukan';
        case 422: return 'Data Tidak Valid';
        case 429: return 'Terlalu Banyak Permintaan';
        case 500: return 'Kesalahan Server';
        case 502: return 'Server Tidak Merespons';
        case 503: return 'Layanan Tidak Tersedia';
        default: return 'Kesalahan';
      }
    }

    switch (type) {
      case ERROR_TYPES.NETWORK: return 'Kesalahan Jaringan';
      case ERROR_TYPES.VALIDATION: return 'Data Tidak Valid';
      case ERROR_TYPES.AUTHENTICATION: return 'Autentikasi Gagal';
      case ERROR_TYPES.AUTHORIZATION: return 'Akses Ditolak';
      case ERROR_TYPES.NOT_FOUND: return 'Tidak Ditemukan';
      case ERROR_TYPES.SERVER: return 'Kesalahan Server';
      case ERROR_TYPES.RUNTIME: return 'Kesalahan JavaScript';
      case ERROR_TYPES.PROMISE: return 'Promise Rejection';
      case ERROR_TYPES.VUE: return 'Kesalahan Vue';
      default: return 'Kesalahan';
    }
  }

  // Get default message based on status and type
  getDefaultMessage(status, type) {
    if (status) {
      switch (status) {
        case 400: return 'Permintaan yang dikirim tidak valid.';
        case 401: return 'Anda perlu login untuk mengakses halaman ini.';
        case 403: return 'Anda tidak memiliki izin untuk mengakses resource ini.';
        case 404: return 'Halaman atau resource yang dicari tidak ditemukan.';
        case 422: return 'Data yang dikirim tidak valid atau tidak lengkap.';
        case 429: return 'Terlalu banyak permintaan. Silakan coba lagi nanti.';
        case 500: return 'Terjadi kesalahan pada server. Silakan coba lagi nanti.';
        case 502: return 'Server tidak dapat diakses. Silakan coba lagi nanti.';
        case 503: return 'Layanan sedang tidak tersedia. Silakan coba lagi nanti.';
        default: return 'Terjadi kesalahan. Silakan coba lagi.';
      }
    }

    switch (type) {
      case ERROR_TYPES.NETWORK: return 'Tidak dapat terhubung ke server.';
      case ERROR_TYPES.VALIDATION: return 'Data yang dimasukkan tidak valid.';
      case ERROR_TYPES.AUTHENTICATION: return 'Gagal melakukan autentikasi.';
      case ERROR_TYPES.AUTHORIZATION: return 'Anda tidak memiliki izin.';
      case ERROR_TYPES.NOT_FOUND: return 'Resource tidak ditemukan.';
      case ERROR_TYPES.SERVER: return 'Terjadi kesalahan pada server.';
      case ERROR_TYPES.RUNTIME: return 'Terjadi kesalahan JavaScript.';
      case ERROR_TYPES.PROMISE: return 'Terjadi kesalahan promise.';
      case ERROR_TYPES.VUE: return 'Terjadi kesalahan pada komponen Vue.';
      default: return 'Terjadi kesalahan yang tidak diketahui.';
    }
  }

  // Remove specific error
  removeError(errorId) {
    const index = errorState.errors.findIndex(error => error.id === errorId);
    if (index > -1) {
      errorState.errors.splice(index, 1);
    }
  }

  // Clear all errors
  clearAllErrors() {
    errorState.errors.splice(0);
  }

  // Get errors by type
  getErrorsByType(type) {
    return errorState.errors.filter(error => error.type === type);
  }

  // Check if there are critical errors
  hasCriticalErrors() {
    return errorState.errors.some(error => error.severity === ERROR_SEVERITY.CRITICAL);
  }
}

// Create global instance
export const errorHandler = new ErrorHandler();

// Axios interceptor setup
export const setupAxiosInterceptors = (axios) => {
  // Request interceptor
  axios.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      errorHandler.handleError(error, ERROR_TYPES.NETWORK, ERROR_SEVERITY.HIGH);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const severity = error.response?.status >= 500 ? ERROR_SEVERITY.CRITICAL : ERROR_SEVERITY.HIGH;
      errorHandler.handleError(error, ERROR_TYPES.NETWORK, severity);
      return Promise.reject(error);
    }
  );
};

// Utility functions
export const showError = (message, type = ERROR_TYPES.UNKNOWN, severity = ERROR_SEVERITY.MEDIUM) => {
  return errorHandler.handleError(new Error(message), type, severity);
};

export const showSuccess = (message) => {
  return errorHandler.handleError(new Error(message), 'success', 'success');
};

export default errorHandler;