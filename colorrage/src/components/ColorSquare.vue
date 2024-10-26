<template>
    <div>
        <div :style="colorStyle" class="w-40 h-40 rounded shadow-md m-0 p-0"></div>
        <p>{{ color }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';

// Define props
const props = defineProps({
    color: {
        type: String,
        default: '#06b6d4'
    }
});

// Create a computed property for the style
const colorStyle = computed(() => ({
    backgroundColor: props.color
}));
</script>

<style scoped>
/* Add any necessary styles here */
</style>
