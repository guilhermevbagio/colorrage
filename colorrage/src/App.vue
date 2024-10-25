<template>
  <div class="flex flex-col justify-center w-screen min-h-screen gap-y-8">
      <UpBar />
      <div class="flex justify-center self-center">
        <div class="w-full flex flex-col ">

          <h1 class="font-extrabold flex text-2xl tracking-tighter text-white justify-center">COLOR MIXER</h1>
          <div class="flex-row gap-x-2 flex items-center">

            <h1 class=" font-semibold flex text-xl text-white justify-center">MODE:</h1>
            <Select v-model="algorithm" :options="algorithms" optionLabel="name" placeholder="RGB average" class="w-full md:w-56" ></Select>

          </div>
        </div>
      </div>
        <div class="w-full flex flex-row gap-x-32 justify-center"> 
          <div class="flex flex-col justify-center">
            <ColorSquare :color="displayColorA" />
            <ColorPicker v-model="colorA" inline />
          </div>
          <ColorSquare :color="resultingColor" />
          <div>
            <ColorSquare :color="displayColorB" />
            <ColorPicker v-model="colorB" inline />
          </div>
        </div>

  </div>
</template>

<script setup>
import ColorPicker from 'primevue/colorpicker';

import Select from 'primevue/select';

import ColorSquare from "./components/ColorSquare.vue";
import UpBar from "./components/UpBar.vue";
import { ref, computed } from "vue";

const colorA = ref("ff8733");
const colorB = ref("f22753");

const displayColorA = computed(() => '#' + colorA.value)
const displayColorB = computed(() => '#' + colorB.value)

const algorithm = ref( { name: 'RGB average', code: '0' });
const algorithms = ref([
    { name: 'RGB average', code: '0' },
    { name: 'Paint mix', code: '1' },
    { name: 'Subtractive mix', code: '2' },
]);
// Computed property to reactively combine colors
const resultingColor = computed(() => combineColors(colorA.value, colorB.value));

function hexToRgb(hex) {
  hex = hex.substring(1); // Remove the hash (#)
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
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

function PaintMix(hex1, hex2){
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const r =  Math.round((255 - Math.sqrt(255 - rgb1[0]) + Math.sqrt(255 - rgb2[0])));
  const g =  Math.round( (255 - Math.sqrt(255 - rgb1[1]) + Math.sqrt(255 - rgb2[1])));
  const b =  Math.round( (255 - Math.sqrt(255 - rgb1[2]) + Math.sqrt(255 - rgb2[2]) ));
  return rgbToHex(r, g, b);
}

function SubtractiveMix(hex1, hex2){
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const r =  Math.round((rgb1[0] * rgb2[0])/255);
  const g =  Math.round((rgb1[1] * rgb2[1])/255);
  const b =  Math.round((rgb1[2] * rgb2[2])/255);
  return rgbToHex(r, g, b);
}

function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}
</script>

