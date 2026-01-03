<template>
  <div class="flex bg-white p-4">
    <ArrowLeft
      @click="$router.go(-1)"
      class="w-8 h-8 text-white cursor-pointer self-center mr-4 bg-blue-500 p-2 rounded-full"
    />
    <h1 class="text-xl font-bold">{{ $route.query.nom }}</h1>
  </div>
  <div class="min-h-screen bg-gray-100 p-4 space-y-6">
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <button
          @click="current = 'questionnaire'"
          :class="buttonClass(current === 'questionnaire')"
        >
          <!-- Questionnaire -->
          {{ t('question') }}
        </button>
        <button
          @click="current = 'correction'"
          :class="buttonClass(current === 'correction')"
        >
          <!-- Correction -->
            {{ t('answer') }}
        </button>

        <button
          @click="downloadPdf"
          :class="downloadClass"
        >
          <ArrowDown class="h-5 w-5"/>
        </button>
      </div>
    </div>

    <div class="bg-white">
      <VuePdf
        :src="currentPdf"
        class="w-full h-[75vh] overflow-scroll rounded-lg border"
      />
    </div>
  </div>
</template>

<script>
import { ArrowDown, ArrowLeft } from "lucide-vue-next";
import { t } from "../i18n/translations";
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: "QuestionnairePage",
  components: { ArrowDown, ArrowLeft },
  data() {
    return {
      current: "questionnaire", // default view
    };
  },
  computed: {
    ...mapState(['currentLanguage']),
    ...mapGetters(['filteredExams']),
    currentPdf() {
      return this.current === "questionnaire"
        ? this.$route.query.test
        : this.$route.query.answer;
    },
    downloadClass() {
      return this.current === "questionnaire"
        ? "px-2 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center"
        : "px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center";
    },
  },
  methods: {
    ...mapActions(['initializeLanguage']),
    t(key) {
      return t(key, this.currentLanguage)
    },
    buttonClass(isActive) {
      return [
        "px-2.5 py-1.5 rounded-lg transition text-sm",
        isActive
          ? "bg-blue-600 text-white"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300",
      ];
    },
    async downloadPdf() {
      try {
        const response = await fetch(this.currentPdf);
        if (!response.ok) throw new Error("Failed to fetch PDF");

        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download =
          this.current === "questionnaire"
            ? `${this.$route.query.nom}-questionnaire.pdf`
            : `${this.$route.query.nom}-correction.pdf`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Cleanup
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error("Download failed:", error);
        alert("Impossible de télécharger le fichier.");
      }
    },
  },
};
</script>
