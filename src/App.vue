<script setup lang="ts">
import InputCheckbox from './components/input-checkbox.vue';
import PointList from './components/point-list.vue';

</script>

<template>
  <div class="app-wrapper">
    <div>
      <div class="mb-6">
        <h2 class="title-xl">Точки</h2>
      </div>
      <InputCheckbox class="mb-3">
        <span class="text-[14px] text-accent font-semibold"> Выбрать все (10000)</span>
      </InputCheckbox>
      <PointList />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
