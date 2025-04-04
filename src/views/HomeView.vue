<script setup>
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = async () => {
  await signOut(auth)
  router.push('/')
}
</script>

<template>
  <div>
    <h1>ホーム画面</h1>
    <button @click="logout">ログアウト</button>
  </div>
</template>