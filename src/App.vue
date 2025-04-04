<script setup>
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { useRouter } from 'vue-router'

const router = useRouter()
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('ログイン中:', user.email)
    if (router.currentRoute.value.path === '/') {
      router.push('/home')
    }
  } else {
    console.log('未ログイン')
    if (router.currentRoute.value.path !== '/' && router.currentRoute.value.path !== '/register') {
      router.push('/')
    }
  }
})
</script>

<template>
  <router-view />
</template>