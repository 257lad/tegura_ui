import { createStore } from 'vuex'

const store = createStore({
  state: {
    currentLanguage: 'fr',
    exams: [
      {
        "id": 1,
        "matiere": "Math",
        "section_type": "SCIENCE_B",
        "questions_file": "http://127.0.0.1:8000/media/file/aaaaaaaa.pdf",
        "answers_file": "http://127.0.0.1:8000/media/file/aaaaaaaa_s9wRtml.pdf",
        "type": "COURS",
        "year": "2020",
        "details": "Et harum laudantium",
        "created_at": "2025-09-14T18:34:58.606926Z",
        "is_processed": false,
        "created_by": "faqyc"
      },
      {
          "id": 2,
        "matiere": "Math",
        "section_type": "SCIENCE_B",
        "questions_file": "http://127.0.0.1:8000/media/file/cheques.pdf",
        "answers_file": "http://127.0.0.1:8000/media/file/cheques_0BldGIr.pdf",
        "type": "COURS",
        "year": "2020",
        "details": "Et harum laudantium",
        "created_at": "2025-09-14T18:35:15.815540Z",
        "is_processed": false,
        "created_by": "faqyc"
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