<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 sm:hidden">
    <div class="grid grid-cols-4 h-16">
      <button
        v-for="item in navItems"
        :key="item.id"
        @click="item.action"
        :class="[
          'flex flex-col items-center justify-center space-y-1 transition-colors',
          item.active ? 'text-primary-500' : 'text-gray-400 hover:text-gray-600'
        ]"
      >
        <svg class="w-5 h-5" :fill="item.active ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.iconPath"/>
        </svg>
        <span class="text-xs font-medium">{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import { t } from '../i18n/translations'

export default {
  name: 'BottomNavigation',
  data() {
    return {
      activeTab: 'home'
    }
  },
  computed: {
    ...mapState(['currentLanguage']),
    
    navItems() {
      return [
        {
          id: 'home',
          label: this.t('home'),
          active: this.activeTab === 'home',
          iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
          action: () => this.setActiveTab('home')
        },
        {
          id: 'search',
          label: this.t('search'),
          active: this.activeTab === 'search',
          iconPath: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
          action: () => this.setActiveTab('search')
        },
        {
          id: 'favorites',
          label: this.t('favorites'),
          active: this.activeTab === 'favorites',
          iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
          action: () => this.setActiveTab('favorites')
        },
        {
          id: 'profile',
          label: this.t('profile'),
          active: this.activeTab === 'profile',
          iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
          action: () => this.setActiveTab('profile')
        }
      ]
    }
  },
  methods: {
    t(key) {
      return t(key, this.currentLanguage)
    },
    
    setActiveTab(tab) {
      this.activeTab = tab
      this.$emit('tab-changed', tab)
    }
  }
}
</script>