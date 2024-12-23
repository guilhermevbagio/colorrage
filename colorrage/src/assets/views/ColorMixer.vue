<template>

    <div class="flex justify-center">
        <div class="w-full h-full flex flex-col justify-center gap-y-2">

            <h1 class="font-extrabold flex text-2xl tracking-tighter text-white justify-center">COLOR MIXER</h1>
            <h1 class="font-semibold self-center text-lg text-white">MODE:</h1>
            <Select v-model="algorithm" :options="algorithms" optionLabel="name" placeholder="RGB average" class="w-52 self-center" ></Select>
            <div v-if="hasParameter"  class="w-64 self-center">
              <VueSlider v-model="parameter" v-bind="{processStyle : { backgroundColor: resultingColor }, railStyle : { backgroundColor: 'black' }, dotStyle : {backgroundColor: resultingColor}, dotSize : 20, tooltip: 'none', dotOptions: {tooltip: 'none'}}" />
            </div>
        </div>
    </div>
    <!--COLOR SQUARES-->
    <div class="w-full flex flex-row gap-x-32 mt-6 justify-center">

      <InputColorSquare v-model="colorA"/>
      
      <OutputColorSquare :color="resultingColor" />

      <InputColorSquare v-model="colorB"/>
    </div>
</template>

<script setup>

import VueSlider from "vue-3-slider-component";

import Select from 'primevue/select';
import { ref, computed } from "vue";
import OutputColorSquare from '../../components/OutputColorSquare.vue';
import InputColorSquare from '../../components/InputColorSquare.vue';
import { hexToRgb, rgbToHsv, hsvToRgb, rgbToHex } from './colorSpaceConverter.js';

const colorA = ref("ff8733");
const colorB = ref("f22753");
const parameter = ref(Number(0));

const hasParameter = computed(() => (algorithm.value.code == 3))


const algorithm = ref( { name: 'RGB average', code: '0' });
const algorithms = ref([
    { name: 'RGB average', code: '0' },
    { name: 'Paint mix', code: '1' },
    { name: 'Subtractive mix', code: '2' },
    { name: 'Linear Interpolation', code: '3'},
    { name: 'HSV Average', code: '4'}
]);
const resultingColor = computed(() => combineColors(colorA.value, colorB.value));



function combineColors(hex1, hex2) {
  switch(Number(algorithm.value.code))
  {
    case 0:
    return RGBaverage(hex1, hex2);
    case 1:
    return PaintMix(hex1, hex2);
    case 2:
      return SubtractiveMix(hex1, hex2);
    case 3:
      return LinearInterpolation(hex1, hex2, Number(parameter.value)/100);
    case 4:
      return HsvAverage(hex1, hex2)

    default: 
    return RGBaverage(hex1, hex2);
  }
}


function RGBaverage(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  
  const r = Math.round((rgb1[0] + rgb2[0]) / 2);
  const g = Math.round((rgb1[1] + rgb2[1]) / 2);
  const b = Math.round((rgb1[2] + rgb2[2]) / 2);
  
  return rgbToHex(r, g, b);
}

function PaintMix(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const r = Math.round(Math.sqrt(rgb1[0] * rgb2[0]));
  const g = Math.round(Math.sqrt(rgb1[1] * rgb2[1]));
  const b = Math.round(Math.sqrt(rgb1[2] * rgb2[2]));
  

  return rgbToHex(r, g, b);
}

function LinearInterpolation(hex1, hex2, t) {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    
    const r = Math.floor(rgb1[0] * (1 - t) + rgb2[0] * t);
    const g = Math.floor(rgb1[1] * (1 - t) + rgb2[1] * t);
    const b = Math.floor(rgb1[2] * (1 - t) + rgb2[2] * t);

    
    return rgbToHex(r, g, b);
}


function SubtractiveMix(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  const r = Math.round((rgb1[0] * rgb2[0]) / 255); // Reduced intensity simulating absorption
  const g = Math.round((rgb1[1] * rgb2[1]) / 255);
  const b = Math.round((rgb1[2] * rgb2[2]) / 255);

  return rgbToHex(r, g, b);
}



function HsvAverage(hex1, hex2) {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    
    const hsv1 = rgbToHsv(rgb1[0], rgb1[1], rgb1[2]);
    const hsv2 = rgbToHsv(rgb2[0], rgb2[1], rgb2[2]);
    
    const avgHue = (hsv1[0] + hsv2[0]) / 2;
    const avgSaturation = (hsv1[1] + hsv2[1]) / 2;
    const avgValue = (hsv1[2] + hsv2[2]) / 2;

    return rgbToHex(...hsvToRgb(avgHue, avgSaturation, avgValue));
}




</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.fade-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}
.fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

</style>