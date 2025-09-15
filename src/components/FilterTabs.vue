<template>
  <div class="space-y-4">
    <!-- Categories -->
    <div>
      <h3 class="text-sm font-medium text-gray-700 mb-3">{{ t('categories') }}</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectCategory(category.id)"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            selectedCategory === category.id
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          <!-- {{ currentLanguage === 'fr' ? category.name : category.nameKi }} -->
          {{ category.name }}
        </button>
      </div>
    </div>
    
    <!-- Subjects -->
    <div>
      <h3 class="text-sm font-medium text-gray-700 mb-3">{{ t('subjects') }}</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="subject in subjects"
          :key="subject.id"
          @click="selectSubject(subject.id)"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            selectedSubject === subject.id
              ? 'bg-accent-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ currentLanguage === 'fr' ? subject.name : subject.nameKi }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { t } from '../i18n/translations'

export default {
  name: 'FilterTabs',
  computed: {
    ...mapState(['selectedCategory', 'selectedSubject', 'currentLanguage']),
    ...mapGetters(['categories', 'subjects'])
  },
  data(){
    return {
      filters: {
        categories: [],
        subjects: []
      }
    }
  },
  methods: {
    selectCategory(categoryId) {
      this.$emit('select_cat', categoryId)
      this.$store.commit('SET_SELECTED_CATEGORY', categoryId)
    },
    
    selectSubject(subjectId) {
      this.$emit('select_sub', subjectId)
      this.$store.commit('SET_SELECTED_SUBJECT', subjectId)
    },
    
    t(key) {
      return t(key, this.currentLanguage)
    }
  }
}
</script>