// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 各画面（View）のインポート
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import MyPageView from '../views/MyPageView.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPageView
  },
  {
    path: '/reserve',
    name: 'reserve',
    component: () => import('../views/EventReservationView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router