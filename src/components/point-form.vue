<script setup lang="ts">
import { usePointStore } from '@/stores/point-store';
import { storeToRefs } from 'pinia';
import TextInput from './text-input.vue';
import CustomButton from './custom-button.vue';
import type { PointForm } from '@/types/point';
import { ref, shallowRef, watch } from 'vue';

const pointStore = usePointStore();
const { setCurrentPointData } = pointStore;
const { currentPointData } = storeToRefs(pointStore);

const savedData = shallowRef(JSON.parse(JSON.stringify(currentPointData.value)));
console.log(currentPointData.value)
const dataToEdit = ref(JSON.parse(JSON.stringify(currentPointData.value)))
watch(currentPointData, (newValue) => {
    dataToEdit.value = JSON.parse(JSON.stringify(newValue));
    savedData.value = JSON.parse(JSON.stringify(newValue))
}, {
    deep: true
})

function submit(event: Event) {
    if (event?.target) {
        const newData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries()) as unknown as PointForm
        setCurrentPointData(newData);
    }
}
function preventToSaved() {
    dataToEdit.value = JSON.parse(JSON.stringify(savedData.value))
}
</script>
<template>
    <form v-if="dataToEdit" @submit.prevent="submit">
        <div class="grid-cols-2 grid gap-4 mb-6">
            <div class="flex flex-col gap-3">
                <h3 class="title-l">Основное</h3>
                <TextInput v-model="dataToEdit.main.name" required title="Название" name="name" type="text" />
                <TextInput v-model="dataToEdit.main.code" required title="Код точки" name="code" type="number" />
                <TextInput step="0.01" v-model="dataToEdit.main.lon" required title="Долгота" name="lon"
                    type="number" />
                <TextInput step="0.01" v-model="dataToEdit.main.lat" required title="Ширина" name="lat" type="number" />
                <TextInput step="0.01" v-model="dataToEdit.main.rad" required title="Радиус" name="rad" type="number" />
            </div>
        </div>
        <div class="flex gap-3">

            <CustomButton theme="colored" type="submit">
                Сохранить
            </CustomButton>
            <CustomButton @click="preventToSaved" type="button">
                Отменить
            </CustomButton>
        </div>
        <!-- <div class="flex flex-col gap-3">
            <h3 class="title-l">Основное</h3>
            <TextInput title="Название" name="name" />
            <TextInput title="Код точки" name="code" />
            <TextInput title="Долгота" name="lon" />
            <TextInput title="Ширина" name="lat" />
            <TextInput title="Радиус" name="rad" />
        </div> -->
    </form>
</template>