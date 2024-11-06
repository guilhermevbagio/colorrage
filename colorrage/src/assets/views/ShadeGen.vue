<template>
    <div class="w-full flex flex-col justify-center">
        <h1 class="font-extrabold flex text-2xl tracking-tighter text-white justify-center mb-10">COLOR SHADES</h1>

    
        <div class="flex flex-row gap-2 relative">
            <div v-for="(color, index) in shades.slice(0, 4)" :key="`left-${index}`">
                <OutputColorSquare :color="color" />
            </div>
            
            <InputColorSquare v-model="inputColor" class="self-center" />

            <div v-for="(color, index) in shades.slice(5)" :key="`right-${index}`">
                <OutputColorSquare :color="color" />
            </div>
        </div>
    </div>
</template>

<script setup>
import InputColorSquare from '../../components/InputColorSquare.vue';
import OutputColorSquare from '../../components/OutputColorSquare.vue';
import { ref, watch } from 'vue';
import { hexToRgb, rgbToHsv, hsvToRgb, rgbToHex } from './colorSpaceConverter';

const inputColor = ref("ff8733");

// Generate shades based on the input color in HSV space.
const shades = ref([]);

watch(inputColor, () => {
    const rgb = hexToRgb(inputColor.value);
    const hsv = rgbToHsv(rgb[0], rgb[1], rgb[2]);
    const generatedShades = Array.from({ length: 9 }, (_, i) => {
        const factor = 0.2 + i * 0.8;
        const shadeHsv = { h: Number(hsv[0]), s: Number(hsv[1]), v: Number(hsv[2]) * factor };
        const shadeRgb = hsvToRgb(shadeHsv.h, shadeHsv.s, shadeHsv.v);
        return rgbToHex(shadeRgb[0], shadeRgb[1], shadeRgb[2]);
    });

    shades.value = generatedShades;

});


</script>
