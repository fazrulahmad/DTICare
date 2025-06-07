<template>
  <div id="app">
    <Navbar />
    
    <!-- Music Control Button -->
    <div class="music-control" @click="toggleMusic">
      <div class="music-btn" :class="{ 'playing': isPlaying, 'paused': !isPlaying }">
        <span class="music-icon">{{ isPlaying ? '🔊' : '🔇' }}</span>
        <div class="sound-waves" v-if="isPlaying">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
      </div>
      <span class="music-tooltip">{{ isPlaying ? 'Pause Music' : 'Play Music' }}</span>
    </div>

    <!-- Audio Element -->
    <audio 
      ref="backgroundMusic" 
      loop 
      preload="auto"
      @loadeddata="onMusicLoaded"
      @error="onMusicError"
    >
      <source src="@/assets/bg-music.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>

    <router-view />
    <!-- Tambahkan komponen ErrorMessage untuk menampilkan notifikasi error -->
    <ErrorMessage />
  </div>
</template>

<script>
import Navbar from './components/BaseNavbar.vue'
import ErrorMessage from './components/ErrorMessage.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    ErrorMessage
  },
  data() {
    return {
      isPlaying: false,
      musicLoaded: false,
      volume: 0.3 // Volume default (30%)
    }
  },
  methods: {
    toggleMusic() {
      if (!this.musicLoaded) {
        console.warn('Music not loaded yet');
        return;
      }

      const audio = this.$refs.backgroundMusic;
      
      if (this.isPlaying) {
        audio.pause();
        this.isPlaying = false;
      } else {
        // Gunakan promise untuk handle autoplay restrictions
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.isPlaying = true;
            })
            .catch(error => {
              console.log('Autoplay prevented:', error);
              // Bisa tambahkan notifikasi ke user
              this.showAutoplayWarning();
            });
        }
      }
    },

    initializeMusic() {
      const audio = this.$refs.backgroundMusic;
      if (audio && this.musicLoaded) {
        audio.volume = this.volume;
        
        // Event listeners
        audio.addEventListener('ended', () => {
          this.isPlaying = false;
        });
        
        audio.addEventListener('pause', () => {
          this.isPlaying = false;
        });
        
        audio.addEventListener('play', () => {
          this.isPlaying = true;
        });
      }
    },

    onMusicLoaded() {
      this.musicLoaded = true;
      this.initializeMusic();
      console.log('Background music loaded successfully');
    },

    onMusicError(event) {
      console.error('Error loading background music:', event);
      this.musicLoaded = false;
    },

    showAutoplayWarning() {
      // Optional: tampilkan pesan ke user bahwa mereka perlu klik untuk memutar musik
      // Anda bisa implement toast notification atau alert di sini
      console.log('Please click the music button to play background music');
    },

    // Method untuk control volume (optional)
    setVolume(volume) {
      this.volume = Math.max(0, Math.min(1, volume));
      if (this.$refs.backgroundMusic) {
        this.$refs.backgroundMusic.volume = this.volume;
      }
    },

    // Method untuk fade in/out (optional)
    fadeIn(duration = 1000) {
      const audio = this.$refs.backgroundMusic;
      if (!audio) return;
      
      audio.volume = 0;
      const step = this.volume / (duration / 50);
      
      const fadeInterval = setInterval(() => {
        if (audio.volume < this.volume) {
          audio.volume = Math.min(audio.volume + step, this.volume);
        } else {
          clearInterval(fadeInterval);
        }
      }, 50);
    },

    fadeOut(duration = 1000) {
      const audio = this.$refs.backgroundMusic;
      if (!audio) return;
      
      const step = audio.volume / (duration / 50);
      
      const fadeInterval = setInterval(() => {
        if (audio.volume > 0) {
          audio.volume = Math.max(audio.volume - step, 0);
        } else {
          audio.pause();
          clearInterval(fadeInterval);
          this.isPlaying = false;
        }
      }, 50);
    }
  },

  mounted() {
    // Initialize music when component is mounted
    this.$nextTick(() => {
      if (this.$refs.backgroundMusic) {
        this.$refs.backgroundMusic.load();
      }
    });

    // Handle page visibility change (pause when tab is not active)
    document.addEventListener('visibilitychange', () => {
      const audio = this.$refs.backgroundMusic;
      if (!audio) return;

      if (document.hidden) {
        if (this.isPlaying) {
          audio.pause();
        }
      } else {
        if (this.isPlaying && audio.paused) {
          audio.play().catch(console.error);
        }
      }
    });
  },

  beforeUnmount() {
    // Cleanup
    const audio = this.$refs.backgroundMusic;
    if (audio) {
      audio.pause();
      audio.removeEventListener('ended', () => {});
      audio.removeEventListener('pause', () => {});
      audio.removeEventListener('play', () => {});
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
}

/* Tambahan style untuk error handling */
#app {
  position: relative;
  min-height: 100vh;
}

/* Music Control Styles */
.music-control {
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 9999;
  cursor: pointer;
  user-select: none;
}

.music-btn {
  position: relative;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.music-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

.music-btn.playing {
  background: linear-gradient(135deg, #43e97b, #38f9d7);
  animation: pulse 2s infinite;
}

.music-btn.paused {
  background: linear-gradient(135deg, #ff6b6b, #feca57);
}

.music-icon {
  font-size: 24px;
  z-index: 2;
  position: relative;
}

/* Sound Waves Animation */
.sound-waves {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: wave 1.5s infinite;
}

.wave:nth-child(2) {
  animation-delay: 0.5s;
}

.wave:nth-child(3) {
  animation-delay: 1s;
}

/* Tooltip */
.music-tooltip {
  position: absolute;
  top: 50%;
  right: 75px;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.music-control:hover .music-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateY(-50%) translateX(-5px);
}

.music-tooltip::after {
  content: '';
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border: 6px solid transparent;
  border-left-color: rgba(0, 0, 0, 0.8);
}

/* Animations */
@keyframes pulse {
  0% {
    box-shadow: 0 8px 25px rgba(67, 233, 123, 0.3);
  }
  50% {
    box-shadow: 0 8px 25px rgba(67, 233, 123, 0.6);
  }
  100% {
    box-shadow: 0 8px 25px rgba(67, 233, 123, 0.3);
  }
}

@keyframes wave {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .music-control {
    top: 80px;
    right: 15px;
  }
  
  .music-btn {
    width: 50px;
    height: 50px;
  }
  
  .music-icon {
    font-size: 20px;
  }
  
  .music-tooltip {
    display: none; /* Hide tooltip on mobile */
  }
}

/* Hide music control when printing */
@media print {
  .music-control {
    display: none !important;
  }
}

/* Global body styles */
body {
  margin: 0;
  padding: 0;
  background: #f8fafc;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
}
</style>