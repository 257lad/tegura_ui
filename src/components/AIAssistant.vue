<template>
  <!-- Floating AI Button -->
  <!-- <button 
    v-if="!aiChatOpen"
    @click="toggleChat"
    class="floating-button"
    :title="t('aiAssistant')"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
    </svg>
  </button> -->
  <div 
    v-if="!aiChatOpen"
    @click="toggleChat"
    :title="t('aiAssistant')"
    class="fixed bottom-[70px] right-3 w-14 h-14  bg-blue-200 rounded-full border-2 border-blue-600 flex items-center justify-center shadow-xl"
  >
    <span class="text-2xl">🤖</span>
  </div>
  
  <!-- AI Chat Interface -->
  <div 
    v-if="aiChatOpen"
    class="fixed bottom-0 right-0 w-full sm:w-96 h-96 bg-white shadow-2xl rounded-t-2xl sm:rounded-2xl sm:bottom-6 sm:right-6 sm:h-[32rem] z-50 flex flex-col border border-gray-200"
  >
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-primary-500 text-white rounded-t-2xl sm:rounded-t-2xl">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 class="font-semibold">{{ t('aiAssistant') }}</h3>
      </div>
      <button @click="toggleChat" class="p-1 hover:bg-white/20 rounded-full transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    
    <!-- Messages -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <div v-if="aiMessages.length === 0" class="text-center text-gray-500 mt-8">
        <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
        </svg>
        <p class="text-sm">{{ t('aiAssistant') }} prêt à vous aider!</p>
      </div>
      
      <div 
        v-for="message in aiMessages" 
        :key="message.id"
        :class="[
          'max-w-[80%] p-3 rounded-2xl',
          message.sender === 'user' 
            ? 'bg-primary-500 text-white ml-auto' 
            : 'bg-gray-100 text-gray-900'
        ]"
      >
        {{ message.text }}
      </div>
    </div>
    
    <!-- Input -->
    <div class="border-t border-gray-200 p-4">
      <div class="flex space-x-2">
        <input
          v-model="newMessage"
          @keypress.enter="sendMessage"
          type="text"
          :placeholder="t('aiPlaceholder')"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        <button 
          @click="sendMessage"
          :disabled="!newMessage.trim()"
          class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
        </button>
      </div>
      
      <!-- WhatsApp Integration -->
      <button 
        @click="openWhatsApp"
        class="w-full mt-3 flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.207"/>
        </svg>
        <span>{{ t('aiWhatsapp') }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { t } from '../i18n/translations'

export default {
  name: 'AIAssistant',
  data() {
    return {
      newMessage: ''
    }
  },
  computed: {
    ...mapState(['aiChatOpen', 'aiMessages', 'currentLanguage'])
  },
  methods: {
    ...mapActions(['sendAiMessage']),
    
    t(key) {
      return t(key, this.currentLanguage)
    },
    
    toggleChat() {
      this.$store.commit('TOGGLE_AI_CHAT')
    },
    
    async sendMessage() {
      if (!this.newMessage.trim()) return
      
      const message = this.newMessage
      this.newMessage = ''
      await this.sendAiMessage(message)
    },
    
    openWhatsApp() {
      const phoneNumber = '250788123456' // Replace with actual WhatsApp Business number
      const message = `Bonjour! J'aimerais utiliser l'assistant AI pour les examens.`
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
    }
  }
}
</script>