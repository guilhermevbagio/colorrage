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
                <h2 class="font-semibold self-center text-lg text-white">SLOPE</h2>
                <VueSlider v-model="slope" v-bind="{processStyle : { backgroundColor: '#FFFFFF' }, railStyle : { backgroundColor: 'black' }, dotStyle : {backgroundColor: '#FFFFFF'}, dotSize : 20, tooltip: 'none', dotOptions: {tooltip: 'none'}}" />
            </div>
            <div class="flex flex-col justify-center p-4 pt-0">
                <h2 class="font-semibold self-center text-lg text-white">WASH</h2>
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
import { ref, watch } from 'vue';
import { hexToHsv, hsvToHex } from '../utils/colorSpaceConverter';

const inputColor = ref("ff8733");
const shades = ref(['', '', '', '', '', '', '', '', '']);

const wash = ref(50);
const hueShift = ref(0);
const range = ref(100);
const slope = ref(50);

watch(wash, () => {
    calculateShades()
});

watch(inputColor, (newColor) => {
    if(!newColor) return;

    calculateShades();

});

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

function calculateShades(){
    const hsv = hexToHsv(inputColor.value);

    const generatedDarkShades = Array.from({ length: 4 }, (_, i) => {
        const factor =  i/4;  
        const shadeHsv = { h: hsv.h, s: hsv.s, v: clamp( hsv.v * factor, 5, 100) };

        return hsvToHex(shadeHsv.h, shadeHsv.s, shadeHsv.v);
    });

    const generatedBrightShades = [''].concat( Array.from({ length: 4 }, (_, i) => {
        const factor =  i/4;  
        const value = (100 - hsv.v) * factor + hsv.v;

        const shadeHsv = { h: hsv.h, s: hsv.s - hsv.s * factor * wash.value/100, v: value };

        return hsvToHex(shadeHsv.h, shadeHsv.s, shadeHsv.v);
    }));

    shades.value = (generatedDarkShades.concat(generatedBrightShades));
}

function mapRangeSymmetric(value, oldMin, oldMax, midpoint, compressionFactor) {
    let range = oldMax - oldMin;
    let compressedRange = range * compressionFactor;
    let newMin = midpoint - compressedRange / 2;
    let newMax = midpoint + compressedRange / 2;

    return ((value - oldMin) * (newMax - newMin)) / range + newMin;
}
</script>
