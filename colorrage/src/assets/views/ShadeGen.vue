<template>
    <div class="w-full flex flex-col justify-center">
        <h1 class="font-extrabold flex text-2xl tracking-tighter text-white justify-center mb-10">COLOR SHADES</h1>
        <div class="grid grid-rows-0 grid-cols-4 justify-between gap-4 w-full">
            <div class="flex flex-col justify-center p-4 pt-0">
                <h2 class="font-semibold self-center text-lg text-white">HUE SHIFT</h2>
                <VueSlider v-model="hueShift" v-bind="{processStyle : { backgroundColor: '#FFFFFF' }, railStyle : { backgroundColor: '#000000' }, dotStyle : {backgroundColor: '#FFFFFF'}, dotSize : 20, tooltip: 'none', dotOptions: {tooltip: 'none'}}" />
            </div>
            <div class="flex flex-col justify-center p-4 pt-0">
                <h2 class="font-semibold self-center text-lg text-white">RANGE</h2>
                <VueSlider v-model="range" v-bind="{processStyle : { backgroundColor: '#FFFFFF' }, railStyle : { backgroundColor: 'black' }, dotStyle : {backgroundColor: '#FFFFFF'}, dotSize : 20, tooltip: 'none', dotOptions: {tooltip: 'none'}}" />
            </div>
            <div class="flex flex-col justify-center p-4 pt-0">
                <h2 class="font-semibold self-center text-lg text-white">WASH-LO</h2>
                <VueSlider v-model="washLow" v-bind="{processStyle : { backgroundColor: '#FFFFFF' }, railStyle : { backgroundColor: 'black' }, dotStyle : {backgroundColor: '#FFFFFF'}, dotSize : 20, tooltip: 'none', dotOptions: {tooltip: 'none'}}" />
            </div>
            <div class="flex flex-col justify-center p-4 pt-0">
                <h2 class="font-semibold self-center text-lg text-white">WASH-HI</h2>
                <VueSlider v-model="wash" v-bind="{processStyle : { backgroundColor: '#FFFFFF' }, railStyle : { backgroundColor: 'black' }, dotStyle : {backgroundColor: '#FFFFFF'}, dotSize : 20, tooltip: 'none', dotOptions: {tooltip: 'none'}}" />
            </div>
        </div>
    
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
import VueSlider from "vue-3-slider-component";
import { ref, watch, onMounted } from 'vue';
import { hexToHsv, hsvToHex, randomColor } from '../utils/colorSpaceConverter';

const inputColor = ref("ff8733");
const shades = ref(['', '', '', '', '', '', '', '', '']);

const wash = ref(50);
const hueShift = ref(20);
const range = ref(80);
const washLow = ref(10);

watch(wash, () => {
    calculateShades()
});
watch(range, () => {
    calculateShades()
});
watch(washLow, () => {
    calculateShades()
});
watch(hueShift, () => {
    calculateShades()
})

watch(inputColor, (newColor) => {
    if(!newColor) return;

    calculateShades();

});

onMounted(() => {
    inputColor.value = randomColor();
    calculateShades();
})

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

function calculateShades(){
    const hsv = hexToHsv(inputColor.value);

    const generatedDarkShades = Array.from({ length: 4 }, (_, i) => {
        const factor =  i/4;  
        const value = hsv.v * factor;
        const compressedValue = compressLow(value, 5, clamp(hsv.v, 6, 100), clamp(range.value, 30, 100)/100);
        const saturation = hsv.s - (hsv.s * 1/(factor + 1) * washLow.value/200);
        const hue = (hsv.h + hueShift.value/5 * 1/(factor + 1)) % 360;
        const shadeHsv = { h: hue, s: saturation, v:  clamp(compressedValue, 10, 100) };

        return hsvToHex(shadeHsv.h, shadeHsv.s, shadeHsv.v);
    });

    const generatedBrightShades = [''].concat( Array.from({ length: 4 }, (_, i) => {
        const factor =  (i + 1)/4;  
        const value = ((100 - hsv.v) * factor) + hsv.v;
        const compressedValue = compressHigh(value, clamp(hsv.v, 0, 99), 100, range.value/100);
        const hue = (hsv.h - hueShift.value/5 * factor) % 360;
        const shadeHsv = { h: hue, s: hsv.s - hsv.s * factor * wash.value/100, v: clamp(compressedValue, 0, 100) };

        return hsvToHex(shadeHsv.h, shadeHsv.s, shadeHsv.v);
    }));

    shades.value = (generatedDarkShades.concat(generatedBrightShades));
}

function compressLow(value, oldMin, oldMax, lowCompressionFactor) {
    if (lowCompressionFactor < 0 || lowCompressionFactor > 1) {
        throw new Error("Compression factor must be between 0 and 1.");
    }
    if (oldMin >= oldMax) {
        throw new Error("Invalid range: oldMin must be less than oldMax.");
    }

    const newMin = oldMax - (oldMax - oldMin) * lowCompressionFactor;

    return ((value - oldMax) * (newMin - oldMax)) / (oldMin - oldMax) + oldMax;
}

function compressHigh(value, oldMin, oldMax, highCompressionFactor) {
    if (highCompressionFactor < 0 || highCompressionFactor > 1) {
        throw new Error("Compression factor must be between 0 and 1.");
    }
    if (oldMin >= oldMax) {
        throw new Error("Invalid range: oldMin must be less than oldMax.");
    }

    const newMax = oldMin + (oldMax - oldMin) * highCompressionFactor;

    return ((value - oldMin) * (newMax - oldMin)) / (oldMax - oldMin) + oldMin;
}

</script>
