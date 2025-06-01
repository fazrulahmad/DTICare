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
      showDetails: false
    };
  },
  computed: {
    errorState() {
      return errorState;
    }
  },
  methods: {
    removeError(errorId) {
      errorHandler.removeError(errorId);
    },
    toggleDetails() {
      this.showDetails = !this.showDetails;
    }
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