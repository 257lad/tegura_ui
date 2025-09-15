export const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    search: 'Recherche',
    favorites: 'Favoris',
    profile: 'Profil',
    
    // Main content
    appTitle: 'Archive Examens',
    searchPlaceholder: 'Rechercher ici...',
    categories: 'Types',
    subjects: 'Section',
    filters: 'Filtres',
    results: 'résultats trouvés',
    noResults: 'Aucun examen trouvé',
    
    // Exam details
    year: 'Année',
    difficulty: 'Difficulté',
    download: 'Télécharger',
    preview: 'Voir',
    
    // Difficulty levels
    facile: 'Facile',
    moyen: 'Moyen',
    difficile: 'Difficile',
    
    // AI Assistant
    aiAssistant: 'Assistant AI',
    aiPlaceholder: 'Posez votre question...',
    aiSend: 'Envoyer',
    aiWhatsapp: 'Utiliser sur WhatsApp',
    aiClose: 'Fermer',
    
    // Settings
    language: 'Langue',
    changeLanguage: 'Changer de langue',
    
    // Common
    loading: 'Chargement...',
    error: 'Erreur',
    retry: 'Réessayer',
    cancel: 'Annuler',
    confirm: 'Confirmer',

    ask: 'Posez vos questions et obtenez de l\'aide instantanée',
  },
  
  ki: {
    // Navigation
    home: 'Intango',
    search: 'Kurondera',
    favorites: 'Ivyo nkunda',
    profile: 'Jewe',
    
    // Main content
    appTitle: 'Ububiko bw\'ibibazo',
    searchPlaceholder: 'Rondera ngaha...',
    categories: 'Ubwoko',
    subjects: 'Section',
    filters: 'Kurobanura',
    results: 'inyishu',
    noResults: 'Nta kibazo cabonetse',
    
    // Exam details
    year: 'Umwaka',
    difficulty: 'Urugezo',
    download: 'Yivome',
    preview: 'Kuyiraba',

    
    // Difficulty levels
    facile: 'Vyoroshe',
    moyen: 'Hagati',
    difficile: 'Bigoye',
    
    // AI Assistant
    aiAssistant: 'Ubufasha bwa AI',
    aiPlaceholder: 'Baza ikibazo cyawe...',
    aiSend: 'Kurungika',
    aiWhatsapp: 'Gukoresha kuri WhatsApp',
    aiClose: 'Ugara',
    
    // Settings
    language: 'Ururimi',
    changeLanguage: 'Guhindura ururimi',
    
    // Common
    loading: 'Tenyenya...',
    error: 'Ikosa',
    retry: 'Ongera ugerageze',
    cancel: 'Guhagarika',
    confirm: 'Kwemeza',
    ask: 'Baza ikibazo cawe, uronkereho inyishu'
  }
}

export function t(key, lang = 'fr') {
  return translations[lang]?.[key] || key
}