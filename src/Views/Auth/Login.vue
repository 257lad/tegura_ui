<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div class="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-blue-700">Login here</h1>
        <p class="text-gray-500">Welcome back, you've been missed!</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Email -->
        <div>
          <input
            type="text"
            v-model="loginForm.username"
            placeholder="Email"
            class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <!-- Password -->
        <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="loginForm.password"
            placeholder="Password"
            class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <button
            type="button"
            class="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            @click="togglePassword"
          >
            <Eye v-if="!showPassword" class="w-5 h-5" />
            <EyeOff v-else class="w-5 h-5" />
          </button>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"
        >
          Sign in
        </button>
      </form>

      <div class="text-center mt-6">
        <p class="text-gray-500">Don’t have an account?</p>
        <router-link to="/register" class="text-blue-500 hover:underline font-semibold">
          Register
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Eye, EyeOff } from "lucide-vue-next";

export default {
  name: "Login",
  components: { Eye, EyeOff },
  data() {
    return {
      showPassword: false,
      loginForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async handleLogin() {
      await this.login(this.loginForm).then((response) => {
        console.log('Resp', response);
        
        response && this.$router.go(-1)
      });
    }
  }
};
</script>
