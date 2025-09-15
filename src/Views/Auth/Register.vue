<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div class="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-blue-700">Create Account</h1>
        <p class="text-gray-500">Join us and explore opportunities!</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <!-- First Name -->
        <input
          type="text"
          v-model="registerForm.first_name"
          placeholder="First Name"
          class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <!-- Last Name -->
        <input
          type="text"
          v-model="registerForm.last_name"
          placeholder="Last Name"
          class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <!-- Username -->
        <input
          type="text"
          v-model="registerForm.username"
          placeholder="Username"
          class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <!-- Email -->
        <input
          type="email"
          v-model="registerForm.email"
          placeholder="Email"
          class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <!-- Password -->
        <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="registerForm.password"
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

        <!-- Confirm Password -->
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="registerForm.confirm_password"
          placeholder="Confirm Password"
          class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"
        >
          Sign up
        </button>
      </form>

      <div class="text-center mt-6">
        <p class="text-gray-500">Already have an account?</p>
        <router-link to="/login" class="text-blue-500 hover:underline font-semibold">
          Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Eye, EyeOff } from "lucide-vue-next";

export default {
  name: "Register",
  components: { Eye, EyeOff },
  data() {
    return {
      showPassword: false,
      registerForm: {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: ""
      }
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async handleRegister() {
      if (this.registerForm.password !== this.registerForm.confirm_password) {
        alert("Passwords do not match.");
        return;
      }
      await axios.post('users/', this.registerForm)
        .then(() => {
        this.login(this.registerForm).then((response)=>{
            if(response) {
              this.$router.go(-1)
            } else {
              this.$router.push('/login')
            }
          })
        })
        .catch(error => {
          console.error(error);
        })
    },
    
  }
};
</script>
