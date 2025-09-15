<template>
  <div class="min-h-screen bg-gray-100 p-4 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">{{ $route.query.nom }}</h1>
      <div class="flex gap-2">
        <!-- Toggle buttons -->
        <button
          @click="current = 'questionnaire'"
          :class="buttonClass(current === 'questionnaire')"
        >
          Questionnaire
        </button>
        <button
          @click="current = 'correction'"
          :class="buttonClass(current === 'correction')"
        >
          Correction
        </button>

        <!-- Download button -->
        <button
          @click="downloadPdf"
          :class="downloadClass"
        >
          <ArrowDown class="h-5 w-5"/>
        </button>
      </div>
    </div>

    <!-- PDF Viewer -->
    <div class="bg-white rounded-xl shadow p-4 space-y-2">
      <VuePdf
        :src="currentPdf"
        class="w-full h-[75vh] overflow-scroll rounded-lg border"
      />
    </div>
  </div>
</template>

<script>
import { ArrowDown } from "lucide-vue-next";

export default {
  name: "QuestionnairePage",
  components: { ArrowDown },
  data() {
    return {
      current: "questionnaire", // default view
    };
  },
  computed: {
    currentPdf() {
      return this.current === "questionnaire"
        ? this.$route.query.test
        : this.$route.query.answer;
    },
    downloadClass() {
      return this.current === "questionnaire"
        ? "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center"
        : "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center";
    },
  },
  methods: {
    buttonClass(isActive) {
      return [
        "px-4 py-2 rounded-lg font-medium transition",
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
