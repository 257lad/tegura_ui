<template>
  <div class="relative">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    </div>
    <input
      type="text"
      :value="searchQuery"
      @input="updateSearch"
      class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
      :placeholder="t('searchPlaceholder')"
    />
    <button 
      class="absolute top-[1px] right-0 p-3 text-white bg-blue-500 rounded-r-md"
      @click="$emit('search', $store.state.searchQuery)"
    >
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { t } from '../i18n/translations'

export default {
  name: 'SearchBar',
  computed: {
    ...mapState(['searchQuery', 'currentLanguage'])
  },
  methods: {
    updateSearch(event) {
      this.$store.commit('SET_SEARCH_QUERY', event.target.value)
    },
    
    t(key) {
      return t(key, this.currentLanguage)
    }
  }
}
</script>