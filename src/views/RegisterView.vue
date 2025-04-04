<template>
    <div>
      <h2>新規登録</h2>
      <input v-model="email" placeholder="メールアドレス" />
      <input v-model="password" type="password" placeholder="パスワード" />
      <button @click="register">登録</button>
      <p>既にアカウントをお持ちの方は <router-link to="/">ログイン</router-link></p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { createUserWithEmailAndPassword } from 'firebase/auth'
  import { auth } from '../firebase'
  import { useRouter } from 'vue-router'
  
  const email = ref('')
  const password = ref('')
  const router = useRouter()
  
  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value)
      router.push('/home') // 成功したらホームへ
    } catch (error) {
      alert('登録失敗: ' + error.message)
    }
  }
  </script>