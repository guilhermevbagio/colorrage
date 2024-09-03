<template>

    <span :class="props.color" class="w-40 h-40 rounded shadow-sm m-0 p-0">
    </span>

</template>

<script setup>

    const props = defineProps({
        color: {
            type: String,
            default: 'bg-red-500'
        }
    });
</script>