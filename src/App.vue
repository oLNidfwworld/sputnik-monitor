<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue';
import InputCheckbox from './components/input-checkbox.vue';
import PointList from './components/point-list.vue';
import { usePointStore } from './stores/point-store';
import { storeToRefs } from 'pinia';
import PointForm from './components/point-form.vue';

const pointStore = usePointStore();
const { points } = storeToRefs(pointStore);

const selectedPoints = shallowRef<number[]>([]);
const isSelectedAll = computed(() => points.value.length === selectedPoints.value.length);
function toggleSelect() {
  if (!isSelectedAll.value) {
    const selectedPointsNoRef: number[] = [];
    points.value.forEach(point => selectedPointsNoRef.push(point.id));
    selectedPoints.value = selectedPointsNoRef;
  } else {
    selectedPoints.value = [];
  }
}

</script>

<template>
  <div class="app-wrapper">
    <div class="grid grid-cols-[3fr_5fr] grid-rows-1 h-full gap-5">
      <div class="flex flex-col">
        <div class="mb-6">
          <h2 class="title-xl">Точки</h2>
        </div>
        <div class="mb-3">
          <InputCheckbox :model-value="isSelectedAll" @click.prevent="toggleSelect">
            <span class="text-[14px] text-accent font-semibold"> Выбрать все (10000)</span>
          </InputCheckbox>
        </div>
        <PointList v-model="selectedPoints" :points="points" />
      </div>
      <div>
        <div class="mb-6">
          <h2 class="title-xl">Редактирование точки</h2>
        </div>
        <PointForm />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
