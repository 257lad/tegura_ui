// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import Home from './Views/Home.vue'

import Assistant from './Views/Assistant.vue'
import Login from './Views/Auth/Login.vue'
import Register from './Views/Auth/Register.vue'
import Profil from './Views/Profil.vue'
import ViewPdf from './Views/ViewPdf.vue'

const routes = [
  {
    path: '/',  
    name: 'Home',
    component: Home,
  },
  {
    path: '/assistant',
    name: 'Assistant',
    component: Assistant,
  },
  {
    path: '/view',
    name: 'ViewPdf',
    component: ViewPdf,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/profile',
    name: 'Profil',
    component: Profil,
  },
//   {
//     path: '/:pathMatch(.*)*',
//     name: 'NotFound',
//     component: NotFoundView,
//   },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//     const isAuthenticated = false 
//     if (!isAuthenticated) {
//       return next({ name: 'Home' })
//     }
//   }
//   next()
// })

export default router
