<script setup lang="ts">
import { ref, useAttrs } from 'vue';

const { title, ...attrs } = useAttrs() as Record<string, unknown> & { title?: string };

const inptElement = ref<HTMLInputElement>();
const model = defineModel<number | string>();
</script>
<template>
    <div @click="inptElement?.focus()" class="text-input">
        <span class="text-input__title" v-if="title"> {{ title }}</span>
        <input v-model="model" ref="inptElement" :title="title" v-bind="attrs">
    </div>
</template>
<style lang="scss" scoped>
@use '/src/assets/vars.scss';

.text-input {
    cursor: pointer;
    margin-top: 7px;
    border-radius: 8px;
    padding: 16px 16px;
    border: 1px solid transparentize(#2f3f2f, 0.7);
    font-size: 14px;
    font-weight: 500;
    position: relative;

    input {
        width: 100%;
    }

    &__title {
        background-color: vars.$background-color;
        padding: 0 4px;
        left: 20px;
        top: -7px;
        position: absolute;
        color: transparentize(#2f3f2f, 0.7);
    }
}
</style>