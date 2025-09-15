import { createStore } from 'vuex'

const store = createStore({
  state: {
    currentLanguage: 'fr',
    exams: [
      {
        id: 1,
        title: 'Mathématiques - Exetat 2023',
        titleKi: 'Imibare - Exetat 2023',
        category: 'exetat',
        subject: 'mathematiques',
        year: 2023,
        difficulty: 'moyen',
        downloadUrl: '#',
        previewUrl: '#'
      },
      {
        id: 2,
        title: 'Français - EPREUVE_TYPE Université 2023',
        titleKi: 'Igifaransa - Concours Université 2023',
        category: 'concours',
        subject: 'francais',
        year: 2023,
        difficulty: 'difficile',
        downloadUrl: '#',
        previewUrl: '#'
      },
      {
        id: 3,
        title: 'Physique - TP Laboratoire',
        titleKi: 'Fisiki - TP Laboratoire',
        category: 'tp',
        subject: 'physique',
        year: 2023,
        difficulty: 'facile',
        downloadUrl: '#',
        previewUrl: '#'
      },
      {
        id: 4,
        title: 'Histoire - Examen Faculté',
        titleKi: 'Amateka - Examen Faculté',
        category: 'examen',
        subject: 'histoire',
        year: 2023,
        difficulty: 'moyen',
        downloadUrl: '#',
        previewUrl: '#'
      }
    ],
    searchQuery: '',
    selectedCategory: 'all',
    selectedSubject: 'all',
    aiChatOpen: false,
    aiMessages: [],
    
  },


  getters: {
    access: (state) => state.access,
    refresh: (state) => state.refresh,
    isAuthenticated: (state) => !!state.access
  },


  mutations: {
    SET_LANGUAGE(state, language) {
      state.currentLanguage = language
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query
    },
    SET_SELECTED_CATEGORY(state, category) {
      state.selectedCategory = category
    },
    SET_SELECTED_SUBJECT(state, subject) {
      state.selectedSubject = subject
    },
    TOGGLE_AI_CHAT(state) {
      state.aiChatOpen = !state.aiChatOpen
    },
    ADD_AI_MESSAGE(state, message) {
      state.aiMessages.push(message)
    },
    CLEAR_AI_MESSAGES(state) {
      state.aiMessages = []
    }
  },
  
  actions: {
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
      localStorage.setItem('preferredLanguage', language)
    },
    
    initializeLanguage({ commit }) {
      const savedLanguage = localStorage.getItem('preferredLanguage')
      if (savedLanguage) {
        commit('SET_LANGUAGE', savedLanguage)
      }
    },
    
    async sendAiMessage({ commit }, message) {
      commit('ADD_AI_MESSAGE', {
        id: Date.now(),
        text: message,
        sender: 'user',
        timestamp: new Date()
      })
      
      // Simulate AI response
      setTimeout(() => {
        commit('ADD_AI_MESSAGE', {
          id: Date.now() + 1,
          text: "Je suis votre assistant AI pour les examens. Comment puis-je vous aider aujourd'hui?",
          sender: 'ai',
          timestamp: new Date()
        })
      }, 1000)
    }
  },
  
  getters: {
    filteredExams: (state) => {
      let filtered = state.exams
      
      // if (state.searchQuery) {
      //   const query = state.searchQuery.toLowerCase()
      //   filtered = filtered.filter(exam => 
      //     exam.title.toLowerCase().includes(query) ||
      //     exam.titleKi.toLowerCase().includes(query) ||
      //     exam.subject.toLowerCase().includes(query)
      //   )
      // }
      
      // if (state.selectedCategory !== 'all') {
      //   filtered = filtered.filter(exam => exam.category === state.selectedCategory)
      // }
      
      // if (state.selectedSubject !== 'all') {
      //   filtered = filtered.filter(exam => exam.subject === state.selectedSubject)
      // }
      
      return filtered
    },
    
    categories: () => [
      { id: 'all', name: 'Tout', nameKi: 'Vyose' },
      { id: 'COURS', name: 'Cours', nameKi: 'Cours' },
      { id: 'EPREUVE_TYPE', name: 'Epreuve', nameKi: 'Epreuve' },
      // { id: 'examen', name: 'Examens', nameKi: 'Ibizamini' },
      { id: 'EX_ETAT', name: 'Exetat', nameKi: 'Exetat' },
    ],
    
    subjects: () => [
      { id: 'all', name: 'Tous les sections', nameKi: 'Section zose' },
      { id: 'SCIENCE_B', name: 'SCIENCE-B', nameKi: 'SCIENCE-B' },
      { id: 'SCIENCE_A', name: 'SCIENCE-A', nameKi: 'SCIENCE-A' },
      { id: 'LANGUE', name: 'LANGUE', nameKi: 'LANGUE' },
      { id: 'ECONOMIQUE', name: 'ECONOMIQUE', nameKi: 'ECONOMIQUE' },
      // { id: 'histoire', name: 'Histoire', nameKi: 'Amateka' },
      // { id: 'geographie', name: 'Géographie', nameKi: 'Isi n\'amahanga' }
    ]
  }
})

export default store