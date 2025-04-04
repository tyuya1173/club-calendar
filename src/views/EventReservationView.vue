<template>
    <div>
      <h2>イベント予約</h2>
      <div>
        <label>予約人数</label>
        <input type="number" v-model.number="participantCount" min="1" max="5" />
      </div>
  
      <div v-for="(participant, index) in participants" :key="index">
        <h4>参加者 {{ index + 1 }}</h4>
        <input v-model="participant.name" placeholder="氏名" />
        <select v-model="participant.faculty">
            <option disabled value="">学部を選択</option>
            <option>システム工学部</option>
            <option>観光学部</option>
            <option>教育学部</option>
            <option>経済学部</option>
            <option>社会インフォマティクス学環</option>
        </select>
        <select v-model="participant.gender">
            <option disabled value="">性別を選択</option>
            <option>男性</option>
            <option>女性</option>
            <option>その他</option>
            <option>無回答</option>
        </select>
        </div>
  
      <button @click="submitReservation">予約する</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
  import { db } from '../firebase'
  
  const route = useRoute()
  const router = useRouter()
  const eventId = route.query.eventId
  
  const participantCount = ref(1)
  const participants = ref([])
  
  onMounted(() => {
    participants.value = Array.from({ length: participantCount.value }, () => ({
      name: '',
      faculty: '',
      gender: ''
    }))
  })
  
  watch(participantCount, (newVal) => {
    participants.value = Array.from({ length: newVal }, (_, i) => participants.value[i] || {
      name: '',
      faculty: '',
      gender: ''
    })
  })
  
  const submitReservation = async () => {
    if (!eventId) return alert('イベントIDが取得できません')
  
    const isValid = participants.value.every(p => p.name && p.faculty && p.gender)
    if (!isValid) return alert('全ての項目を入力してください')
  
    try {
      const eventRef = doc(db, 'events', eventId)
      await updateDoc(eventRef, {
        participants: arrayUnion(...participants.value)
      })
      alert('予約が完了しました！')
      router.push('/mypage')
    } catch (e) {
      console.error(e)
      alert('予約に失敗しました')
    }
  }
  </script>