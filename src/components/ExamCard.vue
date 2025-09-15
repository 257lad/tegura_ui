<template>
  <div class="card hover:shadow-md transition-shadow duration-200">
    <div class="flex justify-between items-start mb-3">
      <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">
        <!-- {{ currentLanguage === 'fr' ? exam.title : exam.titleKi }} -->
        <!-- {{ exam.title }} -->
        {{ exam.matiere  }}-{{ exam.year }}({{ exam.type }})
      </h3>
      <!-- <span :class="[
        'px-2 py-1 rounded-full text-xs font-medium',
        getDifficultyClass(exam.difficulty)
      ]">
        {{ t(exam.difficulty) }}
      </span> -->
    </div>
    
    <div class="flex justify-between items-center space-x-4 text-sm text-gray-600">
      <div class="flex items-center space-x-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
        </svg>
        <span class="capitalize">{{ exam.section_type }}</span>
      </div>
      <router-link
        class="btn-secondary text-sm py-2 px-4"
        :to="{ name: 'ViewPdf', query: { 
          test: exam.questions_file, 
          answer: exam.answers_file , 
          nom: `${exam.matiere}-${exam.year}(${exam.type})` 
        }}"
      >
        <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
        {{ t('preview') }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { t } from '../i18n/translations'

export default {
  name: 'ExamCard',
  props: {
    exam: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['currentLanguage'])
  },
  methods: {
    t(key) {
      return t(key, this.currentLanguage)
    },
    
    getDifficultyClass(difficulty) {
      const classes = {
        facile: 'bg-green-100 text-green-800',
        moyen: 'bg-yellow-100 text-yellow-800',
        difficile: 'bg-red-100 text-red-800'
      }
      return classes[difficulty] || 'bg-gray-100 text-gray-800'
    }
  }
}
</script>