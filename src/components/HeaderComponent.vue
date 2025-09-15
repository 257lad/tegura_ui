<template>
    <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and title -->
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h1 class="text-xl font-bold text-gray-900">{{ t('appTitle') }}</h1>
        </div>
        
        <!-- Language switcher -->
        <div class="flex items-center space-x-4">
          <button
            @click="toggleLanguage"
            class="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <span class="text-sm font-medium">{{ currentLanguage.toUpperCase() }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { t } from '../i18n/translations'

export default {
  name: 'HeaderComponent',
  computed: {
    ...mapState(['currentLanguage'])
  },
  methods: {
    ...mapActions(['setLanguage']),
    
    t(key) {
      return t(key, this.currentLanguage)
    },
    
    toggleLanguage() {
      const newLanguage = this.currentLanguage === 'fr' ? 'ki' : 'fr'
      this.setLanguage(newLanguage)
    }
  }
}
</script>