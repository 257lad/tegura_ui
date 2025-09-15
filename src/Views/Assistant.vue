<script>
import axios from "axios";
import {
  Bot,
  User,
  Sparkles,
  BookOpen,
  MessageSquare,
  Send,
  ArrowLeft,
} from "lucide-vue-next";

export default {
  name: "AssistantScreen",

  components: {
    Bot,
    User,
    Sparkles,
    BookOpen,
    MessageSquare,
    Send,
    ArrowLeft,
  },

  data() {
    return {
      messages: [
        {
          id: "1",
          text: "Bonjour ! Je suis votre assistant IA TEGURA. Je peux vous aider avec vos études, expliquer des concepts, résoudre des problèmes et bien plus encore. Comment puis-je vous aider aujourd'hui ?",
          sender: "ai",
          timestamp: new Date(),
        },
      ],
      inputText: "",
      isTyping: false,
      typingDots: "",
      quickSuggestions: [
        "Expliquer les équations du second degré",
        "Aide pour la dissertation de français",
        "Réviser la chimie organique",
        "Conseils pour les examens",
        "Exercices de physique",
        "Grammaire anglaise",
      ],
    };
  },

  created() {
    // Animate dots "..."
    setInterval(() => {
      if (this.isTyping) {
        this.typingDots =
          this.typingDots.length < 3 ? this.typingDots + "." : "";
      } else {
        this.typingDots = "";
      }
    }, 500);
  },

  methods: {
    async sendMessage(text) {
      if (!text.trim()) return;

      const userMessage = {
        id: Date.now().toString(),
        text,
        sender: "user",
        timestamp: new Date(),
      };

      this.messages.push(userMessage);
      this.inputText = "";
      this.isTyping = true;

      this.$nextTick(this.scrollToBottom);

      try {
        const response = await axios.post("chat-pdf/", { question: text });
        const fullText = response.data.answer;

        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: fullText,
          sender: "ai",
          timestamp: new Date(),
        };

        this.messages.push(aiMessage);
        this.isTyping = false;

        this.$nextTick(this.scrollToBottom);

        let index = 0;
        const typingInterval = setInterval(() => {
          if (index < fullText.length) {
            aiMessage.text += fullText.charAt(index);
            // ✅ Replace in messages array so Vue re-renders
            const msgIndex = this.messages.findIndex(m => m.id === aiMessage.id);
            if (msgIndex !== -1) {
              this.messages.splice(msgIndex, 1, { ...aiMessage });
            }
            index++;
            this.$nextTick(this.scrollToBottom);
          } else {
            clearInterval(typingInterval);
          }
        }, 5);

      } catch (error) {
        console.error(error);
        this.isTyping = false;
      }
    },

    scrollToBottom() {
      const el = this.$refs.chatScroll;
      if (el) el.scrollTop = el.scrollHeight;
    },

    formatTime(date) {
      return new Intl.DateTimeFormat("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    },
  },
};
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <!-- Header -->
    <header class="flex p-4 bg-white border-b border-gray-200">
      <ArrowLeft
        @click="$router.go(-1)"
        class="w-6 h-6 text-gray-500 cursor-pointer self-center mr-4"
      />
      <div class="flex-1 flex justify-between items-center space-x-3">
        <div>
          <h1 class="text-lg font-bold text-gray-900">Assistant IA</h1>
          <p class="text-sm text-gray-500">Votre compagnon d'apprentissage</p>
        </div>
        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <Sparkles size="24" class="text-blue-600" />
        </div>
      </div>
    </header>

    <!-- Chat -->
    <main ref="chatScroll" class="flex-1 overflow-y-auto p-4 space-y-4">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="space-y-2"
        :class="msg.sender === 'user' ? 'text-right' : 'text-left'"
      >
        <!-- Header -->
        <div
          class="flex items-center space-x-2"
          :class="msg.sender === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center"
            :class="msg.sender === 'user' ? 'bg-blue-600' : 'bg-green-600'"
          >
            <component :is="msg.sender === 'user' ? 'User' : 'Bot'" size="14" class="text-white" />
          </div>
          <span class="text-xs text-gray-500">
            {{ msg.sender === "user" ? "Vous" : "Assistant IA" }} •
            {{ formatTime(msg.timestamp) }}
          </span>
        </div>

        <!-- Bubble -->
        <div
          class="inline-block px-4 py-2 rounded-lg max-w-[75%] text-sm whitespace-pre-line"
          :class="msg.sender === 'user'
            ? 'bg-blue-600 text-white ml-auto'
            : 'bg-white border border-gray-200 text-gray-800 mr-auto'"
        >
          {{ msg.text }}
        </div>
      </div>

      <!-- Typing indicator -->
      <div v-if="isTyping" class="flex items-center space-x-2">
        <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
          <Bot size="14" class="text-white" />
        </div>
        <div class="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500">
          Assistant IA réfléchit
          <!-- <span class="inline-block min-w-3">{{ typingDots }}</span> -->
          <span class="inline-block min-w-3">
            <div class="flex space-x-1">
              <div class="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
              <div class="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
              <div class="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
            </div>
          </span>
          
        </div>
      </div>
    </main>

    <!-- Suggestions -->
    <div v-if="messages.length === 1" class="bg-white border-t border-gray-200 p-4">
      <p class="text-sm font-medium text-gray-700 mb-2">Suggestions rapides :</p>
      <div class="flex space-x-2 overflow-x-auto">
        <button
          v-for="(s, i) in quickSuggestions"
          :key="i"
          class="min-w-fit flex items-center bg-blue-50 border border-blue-500 text-blue-600 px-3 py-1 rounded-full text-xs"
          @click="sendMessage(s)"
        >
          <BookOpen size="14" class="mr-1" /> {{ s }}
        </button>
      </div>
    </div>

    <!-- Input -->
    <footer class="bg-white border-t border-gray-200 p-4">
      <div class="flex items-center bg-gray-100 rounded-full px-3 py-2">
        <textarea
          v-model="inputText"
          placeholder="Posez votre question..."
          rows="1"
          class="flex-1 resize-none bg-transparent text-sm p-2 outline-none"
          @keyup.enter="sendMessage(inputText)"
        />
        <button
          class="ml-2 w-10 h-10 flex items-center justify-center rounded-full"
          :class="inputText.trim() || !isTyping ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-400'"
          :disabled="!inputText.trim() || isTyping"
          @click="sendMessage(inputText)"
        >
          <Send size="18" />
        </button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

/* Custom bounce animation for dots */
@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.animate-bounce {
  animation: bounce 1.4s infinite ease-in-out both;
}
</style>