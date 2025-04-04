<template>
    <div>
      <h2>ログイン</h2>
      <input v-model="email" placeholder="メールアドレス" />
      <input v-model="password" type="password" placeholder="パスワード" />
      <button @click="login">ログイン</button>
      <p>アカウントがない方は <router-link to="/register">新規登録</router-link></p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { signInWithEmailAndPassword } from 'firebase/auth'
  import { auth } from '../firebase'
  import { useRouter } from 'vue-router'
  
  const email = ref('')
  const password = ref('')
  const router = useRouter()
  
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value)
      router.push('/home') // 成功したらホームへ
    } catch (error) {
      alert('ログイン失敗: ' + error.message)
    }
  }
  </script>