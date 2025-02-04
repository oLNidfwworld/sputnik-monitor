<script setup lang="ts">
interface IProps {
    theme?: 'colored' | 'transparent'
};

const props = withDefaults(defineProps<IProps>(), {
    theme: 'transparent'
});

</script>
<template>
    <button :class="props.theme" v-bind="$attrs">
        <slot />
    </button>
</template>
<style lang="scss" scoped>
@use '/src/assets/vars.scss';

button {
    font-size: 14px;
    border: 2px solid vars.$accent-color;
    border-radius: 8px;
    height: fit-content;
    padding: 14px 20px;
    font-weight: 700;
    cursor: pointer;

    &.transparent {
        color: vars.$accent-color;
    }

    &.colored {
        color: vars.$background-color;
        background-color: vars.$accent-color;
    }

}
</style>