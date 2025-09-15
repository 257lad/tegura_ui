<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <div class="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <!-- Avatar -->
        <div class="relative">
          <img
            class="w-28 h-28 rounded-full border-4 border-blue-500 object-cover"
            :src="user.avatar"
            alt="User Avatar"
          />
          <button
            class="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600"
          >
            <Camera class="w-4 h-4" />
          </button>
        </div>

        <!-- Info -->
        <div class="flex-1">
          <h2 class="text-2xl font-bold text-gray-800">{{ user.name }}</h2>
          <p class="text-gray-500">{{ user.email }}</p>
          <p class="mt-2 text-sm text-gray-600">{{ user.bio }}</p>
        </div>

        <!-- Settings Button -->
        <button
          class="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <Settings class="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-4 text-center my-8">
        <div class="bg-gray-100 rounded-xl p-4">
          <p class="text-xl font-bold text-gray-800">{{ user.stats.posts }}</p>
          <p class="text-sm text-gray-500">Posts</p>
        </div>
        <div class="bg-gray-100 rounded-xl p-4">
          <p class="text-xl font-bold text-gray-800">{{ user.stats.followers }}</p>
          <p class="text-sm text-gray-500">Followers</p>
        </div>
        <div class="bg-gray-100 rounded-xl p-4">
          <p class="text-xl font-bold text-gray-800">{{ user.stats.following }}</p>
          <p class="text-sm text-gray-500">Following</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-center gap-4">
        <button
          class="px-6 py-2 rounded-xl bg-blue-500 text-white font-semibold shadow hover:bg-blue-600"
        >
          Edit Profile
        </button>
        <button
          class="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Camera, Settings } from "lucide-vue-next";

export default {
  name: "Profile",
  components: { Camera, Settings },
  data() {
    return {
      user: {
        name: "Isaac Ndayizeye",
        email: "isaac@example.com",
        avatar:
          "https://ui-avatars.com/api/?name=Isaac+Ndayizeye&background=0D8ABC&color=fff&size=128",
        bio: "Frontend Developer at HOGI • Passionate about Vue, Tailwind & Embedded Systems",
        stats: {
          posts: 24,
          followers: 1200,
          following: 530,
        },
      },
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("teg_User_");
      this.$router.push({ name: "login" });
    },
  },
};
</script>
