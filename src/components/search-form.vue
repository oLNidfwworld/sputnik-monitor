<script setup lang="ts">
import { usePointStore } from '@/stores/point-store';
import { useDebounce } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';
import TextInput from './text-input.vue';


const pointStore = usePointStore();
const { setSearchQuery } = pointStore;

const searchQuery = ref<string>();
const debouncedSearchQuery = useDebounce(searchQuery, 1000);
watch(debouncedSearchQuery, (newValue) => setSearchQuery(newValue || '')); 

onMounted(function ( ) {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q'); 
  searchQuery.value = query ?? '';
})
</script>
<template> 
  <form @submit.prevent.stop class="flex gap-3">
    <TextInput v-model="searchQuery" type="search" name="q" />
    <button type="submit">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="24"
        height="24" x="0" y="0" viewBox="0 0 128 128" style="enable-background:new 0 0 512 512" xml:space="preserve"
        class="">
        <g>
          <path
            d="M122.829 117.172 89.291 83.635c7.155-8.438 11.484-19.343 11.484-31.246C100.774 25.707 79.068 4 52.387 4S4 25.707 4 52.389c0 26.681 21.706 48.387 48.387 48.387 11.904 0 22.81-4.329 31.247-11.484l33.538 33.537c.781.781 1.805 1.172 2.829 1.172s2.047-.391 2.829-1.172a4.001 4.001 0 0 0-.001-5.657zM12 52.389C12 30.118 30.117 12 52.387 12s40.388 18.118 40.388 40.389c0 22.27-18.118 40.387-40.388 40.387C30.117 92.775 12 74.658 12 52.389z"
            fill="#000000" opacity="1" data-original="#000000" class=""></path>
        </g>
      </svg>
    </button>
  </form>
</template>