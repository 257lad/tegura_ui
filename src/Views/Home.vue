<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <HeaderComponent />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 sm:pb-6">
      <div class="mb-6">
        <SearchBar @search="getFiles" />
      </div>
      
      <div class="mb-6">
        <FilterTabs @select_cat="type = $event" @select_sub="section_type = $event"/>
      </div>
      
      <div class="mb-4">
        <p class="text-sm text-gray-600">
          {{ filteredExams.length }} {{ t('results') }}
        </p>
      </div>
      

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ExamCard 
          v-for="exam in filteredExams"
          :key="exam.id"
          :exam="exam"
        />
      </div>
      
      <div v-if="filteredExams.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">{{ t('noResults') }}</h3>
      </div>

      <div  
        ref="ctaCard"
        class="bg-white border-2 border-blue-600 rounded-xl p-5 flex items-center mt-6" @click="$router.push('/assistant')"
      >
        <div class="flex items-center flex-1">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <span class="text-2xl">🤖</span>
          </div>
          <div>
            <h3 class="text-base font-bold text-gray-900 mb-1">{{ t('aiAssistant')  }}</h3>
            <p class="text-sm text-gray-500">{{ t('ask') }}</p>
          </div>
        </div>
        <div>
          <span class="text-blue-600 font-bold text-xl">→</span>
        </div>
      </div>
    </main>
    
    <BottomNavigation />
    

    <div
      v-if="hideAssistantButton"
      @click="$router.push('/assistant')"
      :title="t('aiAssistant')"
      class="fixed bottom-[70px] right-3 w-14 h-14  bg-blue-200 rounded-full border-2 border-blue-600 flex items-center justify-center shadow-xl"
    >
      <span class="text-2xl">🤖</span>
    </div>
  </div>
</template>

<script>
// import FileCard from '../components/FileCard.vue'
// import FileCards from '../components/FileCards.vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import { t } from '../i18n/translations'

import HeaderComponent from '../components/HeaderComponent.vue'
import SearchBar from '../components/SearchBar.vue'
import FilterTabs from '../components/FilterTabs.vue'
import ExamCard from '../components/ExamCard.vue'
import BottomNavigation from '../components/BottomNavigation.vue'
import AIAssistant from '../components/AIAssistant.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    SearchBar,
    FilterTabs,
    ExamCard,
    BottomNavigation,
    AIAssistant,
    // FileCard,
    // FileCards
  },
  data() {
    return {
      hideAssistantButton: true,
      observer: null,

      files: [],
      type: '',
      section_type: '',
      matiere: '',
      filters: {
        type: '',
        section_type: '',
        matiere: ''
      }
    }
  },

  watch: {
    type(newVal) {
      if(newVal !== '') {
        if(newVal === 'all') {
          this.type = ''
        }
        this.getFiles()
      }
      
    },
    section_type(newVal) {
      if(newVal !== '') {
        if(newVal === 'all') {
          this.section_type = ''
        }
        this.getFiles()
      }
    },
    matiere() {
      this.getFiles()
    }
  },
  computed: {
    ...mapState(['currentLanguage']),
    ...mapGetters(['filteredExams'])
  },
  methods: {
    ...mapActions(['initializeLanguage']),
    
    t(key) {
      return t(key, this.currentLanguage)
    },
    getFiles(keyword = ''){
      let url = keyword ? `?search=${keyword}` : `?type=${this.type}&section_type=${this.section_type}`
      if(keyword){
        this.$store.state.searchQuery = ''
      }
      axios.get('files_courses/' + url)
      .then((response) => {
        // this.files = response.data
        this.$store.state.exams = response.data.results
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  created() {
    this.initializeLanguage()
  },
  mounted() {
    const target = this.$refs.ctaCard

    if (target) {
      this.observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          this.hideAssistantButton = !entry.isIntersecting
        },
        { root: null, threshold: 0.1 }
      )
      this.observer.observe(target)
    }

    this.getFiles()
  },
  beforeUnmount() {
    if (this.observer && this.$refs.ctaCard) {
      this.observer.unobserve(this.$refs.ctaCard)
    }
  }

}
</script>