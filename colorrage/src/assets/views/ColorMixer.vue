<template>
    <div class="flex justify-center self-center">
        <div class="w-full flex flex-col ">

            <h1 class="font-extrabold flex text-2xl tracking-tighter text-white justify-center">COLOR MIXER</h1>
            <div class="flex-row gap-x-4 mt-2 flex items-center">

            <h1 class="font-semibold flex text-xl text-white  justify-center">MODE:</h1>
            <Select v-model="algorithm" :options="algorithms" optionLabel="name" placeholder="RGB average" class="w-full" ></Select>
            <div v-if="hasParameter"  class="w-64">

                <VueSlider v-model="parameter" v-bind="{processStyle : { backgroundColor: resultingColor }, railStyle : { backgroundColor: 'black' }, dotStyle : {backgroundColor: resultingColor}, dotSize : 20, tooltip: 'none', dotOptions: {tooltip: 'none'}}" />
            </div>
            </div>
        </div>
    </div>
    <!--COLOR SQUARES-->
    <div class="w-full flex flex-row gap-x-32 justify-center">

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

function hexToRgb(hex) {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

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

function rgbToHsv(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const h = max === min ? 0 :
              max === r ? (60 * ((g - b) / (max - min)) + 360) % 360 :
              max === g ? (60 * ((b - r) / (max - min)) + 120) :
                          (60 * ((r - g) / (max - min)) + 240);
    const s = max === 0 ? 0 : (max - min) / max;
    const v = max;
    return [h, s, v];
}

function hsvToRgb(h, s, v) {
    const c = v * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = v - c;

    let r, g, b;
    if (h < 60) {
        r = c; g = x; b = 0;
    } else if (h < 120) {
        r = x; g = c; b = 0;
    } else if (h < 180) {
        r = 0; g = c; b = x;
    } else if (h < 240) {
        r = 0; g = x; b = c;
    } else if (h < 300) {
        r = x; g = 0; b = c;
    } else {
        r = c; g = 0; b = x;
    }
    return [
        Math.floor((r + m) * 255),
        Math.floor((g + m) * 255),
        Math.floor((b + m) * 255)
    ];
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



function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
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