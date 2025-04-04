<template>
  <div class="calendar-wrapper">
    <h1>イベントカレンダー</h1>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase' // ※相対パスに注意！
import { useRouter } from 'vue-router'

export default defineComponent({
  components: { FullCalendar },
  setup() {
    const events = ref([])
    const router = useRouter()

    const calendarOptions = ref({
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      locale: jaLocale,
      events: [], // 初期値は空配列
      height: 'auto',
      aspectRatio: 1.5,

      eventClick: ({ event }) => {
        const eventId = event.id
        router.push({ name: 'reserve', query: { eventId } })
      },

      eventContent: ({ event }) => ({
        html: `<span>${event.title}</span>`
      })
    })

    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'))
        const fetchedEvents = querySnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            title: data.title,
            start: new Date(data.date),
            description: data.description,
            location: data.location
          }
        })
        events.value = fetchedEvents
        calendarOptions.value.events = fetchedEvents
      } catch (error) {
        console.error('イベントの取得に失敗:', error)
      }
    }

    onMounted(fetchEvents)

    return {
      calendarOptions
    }
  }
})
</script>

<style scoped>
.calendar-wrapper {
  padding: 1rem;
}

@media (max-width: 600px) {
  .fc {
    font-size: 12px;
  }
}
</style>