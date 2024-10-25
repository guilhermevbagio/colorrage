<template>
    <div>
        <div :style="colorClass" class="w-40 h-40 rounded shadow-sm m-0 p-0">
        </div>
        <p>{{ props.color }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    color: {
        type: String,
        default: '#06b6d4'
    }
});

const colorClass = computed(() => {
    return {
        backgroundColor: props.color
    };
});
</script>
