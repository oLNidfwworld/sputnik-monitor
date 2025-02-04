import { ref, computed, triggerRef, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import { round, getRandomArbitrary } from '@/utils/number-functions'
import type { Point, PointForm } from '@/types/point'

export const usePointStore = defineStore('point-store', () => {
  const points = shallowRef<Point[]>([])

  function generatePoints() {
    for (let i = 0; i < 10_000; i++) {
      points.value.push({
        id: i,
        address: 'Адрес',
        main: {
          code: i + 1,
          name: `Точка №${i + 1}`,
          rad: round(getRandomArbitrary(0, 361), 2),
          lat: round(getRandomArbitrary(-180, 181), 2),
          lon: round(getRandomArbitrary(-90, 91), 2),
        },
      })
    }
  }
  generatePoints() 
  
  function createNewPoint( ){
    const newId = Math.max(...points.value.map(item => item.id)) + 1;
    points.value.push({
      id : newId,
      address : 'Адрес',
      main: {
        code: 0,
        name:  `Точка №${newId + 1}`,
        rad: 0,
        lat: 0,
        lon: 0
      }
    });
    setCurrentPointId(newId);
    triggerRef(points);
  }

  const currentPointId = ref(points.value[0].id)
  function setCurrentPointId(id: number) {
    currentPointId.value = id
  }
  function setCurrentPointData(data: PointForm) {
    const elementToEdit = points.value.find((point) => point.id === currentPointId.value)
    if (elementToEdit) {
      elementToEdit.main = data
      triggerRef(points);
    }
  }
  const currentPointData = computed(() =>
    points.value.find((point) => point.id === currentPointId.value),
  );

  const searchQuery = ref<string>('');
  function setSearchQuery( newValue : string ) {
    searchQuery.value = newValue;
  }
  
  const filteredPoints = computed(( ) => points.value.filter( point => point.main.name.indexOf(searchQuery.value) !== -1))

  return {
    points,
    filteredPoints,

    searchQuery,
    setSearchQuery,

    currentPointId,
    setCurrentPointData,
    setCurrentPointId,
    currentPointData,

    createNewPoint
  }
})
