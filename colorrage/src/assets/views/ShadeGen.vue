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
import { hexToHsv, hsvToHex } from '../utils/colorSpaceConverter';

const inputColor = ref("ff8733");

const shades = ref(['', '', '', '', '', '', '', '', '']);

watch(inputColor, (newColor) => {
    if(!newColor) return;
    const hsv = hexToHsv(inputColor.value);

    const generatedDarkShades = Array.from({ length: 4 }, (_, i) => {
        const factor =  i/4;  
        const shadeHsv = { h: hsv.h, s: hsv.s, v: clamp( hsv.v * factor, 10, 100) };

        return hsvToHex(shadeHsv.h, shadeHsv.s, shadeHsv.v);
    });

    const generatedBrightShades = [''].concat( Array.from({ length: 4 }, (_, i) => {
        const factor =  i/4;  
        const value = (100 - hsv.v) * factor + hsv.v;

        const shadeHsv = { h: hsv.h, s: hsv.s - hsv.s * factor, v: value };

        return hsvToHex(shadeHsv.h, shadeHsv.s, shadeHsv.v);
    }));

    shades.value = (generatedDarkShades.concat(generatedBrightShades));


});

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
</script>
