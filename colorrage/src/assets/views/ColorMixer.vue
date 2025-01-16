<template>
  <div class="flex flex-col">
    <div class="flex justify-center">
      <div class="w-full mt-10 md:mt-0 h-full flex flex-col justify-center gap-y-2">
        
        <h1 class="font-extrabold flex text-2xl tracking-tighter text-white justify-center">COLOR MIXER</h1>
        <h1 class="font-semibold self-center text-lg text-white">MODE:</h1>
        <Select v-model="algorithm" :options="algorithms" optionLabel="name" placeholder="RGB average" class="w-52 self-center" ></Select>
        <div v-if="hasParameter"  class="w-32 md:w-64 self-center">
          <VueSlider v-model="parameter" v-bind="{processStyle : { backgroundColor: resultingColor }, railStyle : { backgroundColor: store.text }, dotStyle : {backgroundColor: resultingColor}, dotSize : 20, tooltip: 'none', dotOptions: {tooltip: 'none'}}" />
        </div>
      </div>
    </div>
    <!--COLOR SQUARES-->
    <div class="w-full flex flex-col gap-y-4 md:gap-y-0 md:flex-row gap-x-8 mt-6 justify-center items-center">
      <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full">
        <InputColorSquare v-model="colorA"/>
        <font-awesome-icon icon="fa-solid fa-arrow-right" size="2xl" class="rotate-90 md:rotate-0"/>
      </div>
      
      <OutputColorSquare :color="resultingColor" />
      
      <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full">
        <font-awesome-icon icon="fa-solid fa-arrow-left" size="2xl"  class="rotate-90 md:rotate-0"/>
        <InputColorSquare v-model="colorB"/>
      </div>
    </div>
  </div>
</template>

<script setup>

import VueSlider from "vue-3-slider-component";

import Select from 'primevue/select';
import { ref, computed, watch, onMounted } from "vue";
import { useColorsStore } from '../../stores/colorstore';
import OutputColorSquare from '../../components/OutputColorSquare.vue';
import InputColorSquare from '../../components/InputColorSquare.vue';
import { hexToRgb, rgbToHsv, hsvToRgb, rgbToHex, randomColor } from '../utils/colorSpaceConverter.js';

const colorA = ref("ff8733");
const colorB = ref("f22753");
const parameter = ref(Number(0));

const hasParameter = computed(() => (algorithm.value.code == 3))
const store = useColorsStore();

const algorithm = ref( { name: 'RGB average', code: '0' });
const algorithms = ref([
    { name: 'RGB average', code: '0' },
    { name: 'Paint mix', code: '1' },
    { name: 'Subtractive mix', code: '2' },
    { name: 'Linear Interpolation', code: '3'},
    { name: 'HSV Average', code: '4'}
]);
const resultingColor = computed(() => combineColors(colorA.value, colorB.value));

onMounted(() => {
  colorA.value = randomColor();
  colorB.value = randomColor();
  store.setMainColor(resultingColor.value)
})

watch(resultingColor, () => {
  store.setMainColor(resultingColor.value)
})


function combineColors(hex1, hex2) {
  if (!hex1 || !hex2) return null;

  switch(Number(algorithm.value.code)) {
    case 0:
      return RGBaverage(hex1, hex2);
    case 1:
      return PaintMix(hex1, hex2);
    case 2:
      return SubtractiveMix(hex1, hex2);
    case 3:
      return LinearInterpolation(hex1, hex2, Number(parameter.value) / 100);
    case 4:
      return HsvAverage(hex1, hex2);
    default: 
      return RGBaverage(hex1, hex2);
  }
}

function RGBaverage(hex1, hex2) {
  if (!hex1 || !hex2) return null;
  
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) return null;

  const r = Math.round((rgb1.r + rgb2.r) / 2);
  const g = Math.round((rgb1.g + rgb2.g) / 2);
  const b = Math.round((rgb1.b + rgb2.b) / 2);

  return rgbToHex(r, g, b);
}

function PaintMix(hex1, hex2) {
  if (!hex1 || !hex2) return null;
  
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) return null;

  const r = Math.round(Math.sqrt(rgb1.r * rgb2.r));
  const g = Math.round(Math.sqrt(rgb1.g * rgb2.g));
  const b = Math.round(Math.sqrt(rgb1.b * rgb2.b));

  return rgbToHex(r, g, b);
}

function LinearInterpolation(hex1, hex2, t) {
  if (!hex1 || !hex2 || t == null) return null;
  
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) return null;

  const r = Math.floor(rgb1.r * (1 - t) + rgb2.r * t);
  const g = Math.floor(rgb1.g * (1 - t) + rgb2.g * t);
  const b = Math.floor(rgb1.b * (1 - t) + rgb2.b * t);

  return rgbToHex(r, g, b);
}

function SubtractiveMix(hex1, hex2) {
  if (!hex1 || !hex2) return null;
  
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) return null;

  const r = Math.round((rgb1.r * rgb2.r) / 255);
  const g = Math.round((rgb1.g * rgb2.g) / 255);
  const b = Math.round((rgb1.b * rgb2.b) / 255);

  return rgbToHex(r, g, b);
}

function HsvAverage(hex1, hex2) {
  if (!hex1 || !hex2) return null;
  
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) return null;
  
  const hsv1 = rgbToHsv(rgb1);
  const hsv2 = rgbToHsv(rgb2);

  if (!hsv1 || !hsv2) return null;

  const avgHue = (hsv1.h + hsv2.h) / 2;
  const avgSaturation = (hsv1.s + hsv2.s) / 2;
  const avgValue = (hsv1.v + hsv2.v) / 2;

  const avgHsv = { h: avgHue, s: avgSaturation, v: avgValue };
  const rgb = hsvToRgb(avgHsv);

  return rgbToHex(rgb.r, rgb.g, rgb.b);
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