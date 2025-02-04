<script setup lang="ts">
import { useAttrs, useId } from 'vue';

const id = useId();
defineOptions({
    inheritAttrs: false
});
const model = defineModel<boolean | Array<string | number>>({
    required: false
});
const { onClick, ...attrs } = useAttrs() as Record<string | number, unknown> & { onClick?: (event?: Event) => unknown }; 
</script>
<template>
    <div @click="onClick" class="input-checkbox">
        <div class="input-checkbox__wrapper">
            <input v-model="model" :id="id" v-bind="attrs" type="checkbox">
            <label :for="id">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L7 13.586 4.707 11.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l9-9a1 1 0 000-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </label>
            <slot />
        </div>
    </div>
</template>
<style lang="scss">
@use '../assets/vars.scss';

.input-checkbox {
    user-select: none;

    &__wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    input {
        position: absolute;
        z-index: -99999;
        left: -100%;
        top: -100%;
    }

    input[type="checkbox"] {
        &+label {
            position: relative;
            display: block;
            width: 18px;
            height: 18px;
            border-radius: 4px;
            background-color: vars.$accent-color;

            svg {
                display: none;
            }
        }

        &:checked+label {
            svg {
                display: block;
            }
        }
    }

    label {
        cursor: pointer;
    }

    svg {
        fill: vars.$background-color;
    }
}
</style>