import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Point from '@/types/point'

export const usePointStore = defineStore('point-store', () => {
  const points = ref<Point[]>([])

  function generatePoints() {
    for (let i = 0; i++; i <= 10_000) {
      points.value.push(new Point({}))
    }
  }

  return {}
})
