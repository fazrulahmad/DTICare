<template>
  <div class="error-messages-container">
    <transition-group name="error-slide" tag="div" class="error-list">
      <div
        v-for="error in errorState.errors"
        :key="error.id"
        :class="['error-message', `error-${error.severity}`, `error-${error.type}`]"
        class="error-item"
      >
        <div class="error-header">
          <div class="error-icon">
            <span v-if="error.severity === 'error'">❌</span>
            <span v-else-if="error.severity === 'warning'">⚠️</span>
            <span v-else-if="error.severity === 'info'">ℹ️</span>
            <span v-else-if="error.type === 'success'">✅</span>
          </div>
          <div class="error-content">
            <h4 class="error-title">{{ error.title }}</h4>
            <p class="error-text">{{ error.message }}</p>
            <small v-if="showDetails && error.details" class="error-details">
              {{ error.details }}
            </small>
          </div>
          <button @click="removeError(error.id)" class="error-close">
            ✕
          </button>
        </div>
        <div v-if="error.details && !showDetails" class="error-toggle">
          <button @click="toggleDetails" class="btn-details">
            Lihat Detail
          </button>
        </div>
        <!-- Progress bar untuk countdown -->
        <div class="error-progress">
          <div 
            class="error-progress-bar" 
            :class="`progress-${error.severity || error.type}`"
          ></div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { errorState, errorHandler } from '@/utils/errorHandler';

export default {
  name: 'ErrorMessage',
  data() {
    return {
      showDetails: false,
      timers: new Map() // Menyimpan timer untuk setiap error
    };
  },
  computed: {
    errorState() {
      return errorState;
    }
  },
  watch: {
    // Watch perubahan pada error list
    'errorState.errors': {
      handler(newErrors, oldErrors) {
        // Set timer untuk error baru
        newErrors.forEach(error => {
          if (!this.timers.has(error.id)) {
            this.setAutoRemoveTimer(error.id);
          }
        });
        
        // Clear timer untuk error yang sudah dihapus
        if (oldErrors) {
          oldErrors.forEach(oldError => {
            if (!newErrors.find(e => e.id === oldError.id)) {
              this.clearTimer(oldError.id);
            }
          });
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    removeError(errorId) {
      this.clearTimer(errorId);
      errorHandler.removeError(errorId);
    },
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
    setAutoRemoveTimer(errorId) {
      const timer = setTimeout(() => {
        this.removeError(errorId);
      }, 10000); // 10 detik
      
      this.timers.set(errorId, timer);
    },
    clearTimer(errorId) {
      if (this.timers.has(errorId)) {
        clearTimeout(this.timers.get(errorId));
        this.timers.delete(errorId);
      }
    },
    // Pause timer saat hover
    pauseTimer(errorId) {
      this.clearTimer(errorId);
    },
    // Resume timer saat mouse leave
    resumeTimer(errorId) {
      if (this.errorState.errors.find(e => e.id === errorId)) {
        this.setAutoRemoveTimer(errorId);
      }
    }
  },
  beforeUnmount() {
    // Clear semua timer saat component di-unmount
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
  }
};
</script>

<style scoped>
.error-messages-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
}

.error-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.error-item {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: slideIn 0.3s ease-out;
  position: relative;
  cursor: pointer;
}

/* Pause auto-remove saat hover */
.error-item:hover .error-progress-bar {
  animation-play-state: paused;
}

.error-header {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  gap: 12px;
}

.error-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.error-content {
  flex: 1;
}

.error-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.error-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #4b5563;
}

.error-details {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  color: #6b7280;
  background: #f9fafb;
  padding: 8px;
  border-radius: 6px;
  font-family: monospace;
  word-break: break-all;
}

.error-close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #9ca3af;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
}

.error-close:hover {
  background: #f3f4f6;
  color: #374151;
}

.error-toggle {
  padding: 0 16px 16px;
}

.btn-details {
  background: #f3f4f6;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  color: #4b5563;
  transition: all 0.2s;
}

.btn-details:hover {
  background: #e5e7eb;
}

/* Progress bar untuk countdown */
.error-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(0, 0, 0, 0.1);
}

.error-progress-bar {
  height: 100%;
  width: 100%;
  transform-origin: left;
  animation: countdown 10s linear forwards;
}

.progress-error {
  background: #ef4444;
}

.progress-warning {
  background: #f59e0b;
}

.progress-info {
  background: #3b82f6;
}

.progress-success {
  background: #10b981;
}

@keyframes countdown {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

/* Error type styles */
.error-error {
  border-left: 4px solid #ef4444;
}

.error-warning {
  border-left: 4px solid #f59e0b;
}

.error-info {
  border-left: 4px solid #3b82f6;
}

.error-success {
  border-left: 4px solid #10b981;
}

/* Animations */
.error-slide-enter-active {
  transition: all 0.3s ease-out;
}

.error-slide-leave-active {
  transition: all 0.3s ease-in;
}

.error-slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.error-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .error-messages-container {
    left: 20px;
    right: 20px;
    max-width: none;
  }
}
</style>