<template>
    <div class="p-4 cursor-pointer font-bold flex flex-row gap-1" :style="{ background : isHovered ?  colors.bg : colors.text, color : isHovered ? colors.text : colors.bg}" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
        <p v-if="isHovered" class="font-black"> > </p>
        <slot>
            
        </slot>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useColorsStore } from '@/stores/colorstore';

const colors = useColorsStore();
const isHovered = ref();

</script>