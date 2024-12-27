<template>
    <div class="p-4 cursor-pointer font-bold align-middle flex items-center flex-row gap-2" :style="{ background : isHovered ?  colors.bg : colors.text, color : isHovered ? colors.text : colors.bg}" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
        <font-awesome-icon v-if="isHovered" icon="fa-solid fa-play" size="2xs"> > </font-awesome-icon>
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