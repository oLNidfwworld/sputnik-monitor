<script setup lang="ts">
import { toRefs } from 'vue';
import InputCheckbox from './input-checkbox.vue';
import { useVirtualList } from '@vueuse/core';
import { usePointStore } from '@/stores/point-store';
import { storeToRefs } from 'pinia';
import type { Point } from '@/types/point';

interface IProps {
    points: Point[]
}
const props = defineProps<IProps>();
const { points } = toRefs(props);

const pointStore = usePointStore();
const { setCurrentPointId } = usePointStore();
const { currentPointId } = storeToRefs(pointStore);

const { list, wrapperProps, containerProps } = useVirtualList(points, {
    'itemHeight': 90
});

const modelSelected = defineModel<number[]>({
    required: false,
    default: []
});

</script>
<template>
    <div v-bind="containerProps">
        <div v-bind="wrapperProps">
            <div class="card" @click="setCurrentPointId(item.data.id)"
                :class="{ 'current': currentPointId === item.data.id }" v-for="item in list" :key="item.index">
                <div class="card__wrapper">
                    <div class="flex">
                        <InputCheckbox v-model="modelSelected" :value="item.data.id">
                            <span class="font-bold">{{ item.data.main.name }}</span>
                            <span class="text-accent font-semibold text-[12px]">Код: {{ item.data.main.code }}</span>
                        </InputCheckbox>
                    </div>
                    <div>
                        <div class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14" x="0" y="0"
                                viewBox="0 0 64 64" style="enable-background:new 0 0 512 512" xml:space="preserve">
                                <g>
                                    <path
                                        d="M32 2c-11 0-20 9-20 20 0 9.1 13.5 31.9 18.3 39.1.8 1.2 2.5 1.2 3.3 0C38.5 53.9 52 31.1 52 22c0-11-9-20-20-20zm0 30c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z"
                                        fill="var(--color-accent)" opacity="1" data-original="#000000"></path>
                                </g>
                            </svg>
                            {{ item.data.address }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
@use '/src/assets/vars.scss';

.card {
    cursor: pointer;
    font-size: 14px;
    padding: 12px 12px;
    border-width: 1px;
    border-color: vars.$accent-color;
    border-style: solid;
    border-radius: 12px;
    height: 70px;
    transition: 0.1s ease-in-out border-width;

    &__wrapper {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
    }

    &.current {
        border-width: 3px;
    }

    +.card {
        margin-top: 20px;
    }
}
</style>