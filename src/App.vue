<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue';
import InputCheckbox from './components/input-checkbox.vue';
import PointList from './components/point-list.vue';
import { usePointStore } from './stores/point-store';
import { storeToRefs } from 'pinia';
import PointForm from './components/point-form.vue';
import TextInput from './components/text-input.vue';
import { useDebounce } from '@vueuse/core';

const pointStore = usePointStore();
const { filteredPoints } = storeToRefs(pointStore);
const { setSearchQuery } = pointStore;

const selectedPoints = shallowRef<number[]>([]);
const isSelectedAll = computed(() => filteredPoints.value.length === selectedPoints.value.length);
function toggleSelect() {
  if (!isSelectedAll.value) {
    const selectedPointsNoRef: number[] = [];
    filteredPoints.value.forEach(point => selectedPointsNoRef.push(point.id));
    selectedPoints.value = selectedPointsNoRef;
  } else {
    selectedPoints.value = [];
  }
}

const searchIsVisible = ref(false);
const searchQuery = ref<string>();
const debouncedSearchQuery = useDebounce(searchQuery, 1000);
watch( debouncedSearchQuery, ( newValue ) => setSearchQuery(newValue ?? '') ); 
</script>

<template>
  <div class="app-wrapper">
    <div class="grid grid-cols-[3fr_5fr] grid-rows-1 h-full gap-5">
      <div class="flex flex-col">
        <div class="mb-6 flex justify-between items-center">
          <h2 class="title-xl">Точки</h2> 
          <button v-if="!searchIsVisible" @click="searchIsVisible = !searchIsVisible">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="24"
            height="24" x="0" y="0" viewBox="0 0 128 128" style="enable-background:new 0 0 512 512"
            xml:space="preserve" class="">
              <g>
                <path
                  d="M122.829 117.172 89.291 83.635c7.155-8.438 11.484-19.343 11.484-31.246C100.774 25.707 79.068 4 52.387 4S4 25.707 4 52.389c0 26.681 21.706 48.387 48.387 48.387 11.904 0 22.81-4.329 31.247-11.484l33.538 33.537c.781.781 1.805 1.172 2.829 1.172s2.047-.391 2.829-1.172a4.001 4.001 0 0 0-.001-5.657zM12 52.389C12 30.118 30.117 12 52.387 12s40.388 18.118 40.388 40.389c0 22.27-18.118 40.387-40.388 40.387C30.117 92.775 12 74.658 12 52.389z"
                  fill="#000000" opacity="1" data-original="#000000" class=""></path>
              </g>
            </svg>
          </button>
          <form v-else submit.prevent class="flex gap-3">  
            <TextInput v-model="searchQuery" type="search" name="q"/>
            <button type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="24"
              height="24" x="0" y="0" viewBox="0 0 128 128" style="enable-background:new 0 0 512 512"
              xml:space="preserve" class="">
                <g>
                  <path
                    d="M122.829 117.172 89.291 83.635c7.155-8.438 11.484-19.343 11.484-31.246C100.774 25.707 79.068 4 52.387 4S4 25.707 4 52.389c0 26.681 21.706 48.387 48.387 48.387 11.904 0 22.81-4.329 31.247-11.484l33.538 33.537c.781.781 1.805 1.172 2.829 1.172s2.047-.391 2.829-1.172a4.001 4.001 0 0 0-.001-5.657zM12 52.389C12 30.118 30.117 12 52.387 12s40.388 18.118 40.388 40.389c0 22.27-18.118 40.387-40.388 40.387C30.117 92.775 12 74.658 12 52.389z"
                    fill="#000000" opacity="1" data-original="#000000" class=""></path>
                </g>
              </svg>
            </button>
          </form>
        </div>
        <div class="mb-3">
          <InputCheckbox :model-value="isSelectedAll" @click.prevent="toggleSelect">
            <span class="text-[14px] text-accent font-semibold"> Выбрать все ({{ filteredPoints.length }})</span>
          </InputCheckbox>
        </div>
        <PointList v-model="selectedPoints" :points="filteredPoints" />
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
