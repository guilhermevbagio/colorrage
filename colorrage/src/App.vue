<template>
  <div class="flex flex-col justify-center w-screen min-h-screen gap-y-8">
    <UpBar />
    <!--HEADER COLOR MIXER-->
    <div class="flex justify-center self-center">
      <div class="w-full flex flex-col ">
        <h1 class="font-extrabold flex text-2xl tracking-tighter text-white justify-center">COLOR MIXER</h1>
        <div class="flex-row gap-x-2 flex items-center">
          <h1 class="font-semibold flex text-xl text-white justify-center">MODE:</h1>
          <Select v-model="algorithm" :options="algorithms" optionLabel="name" placeholder="RGB average" class="w-full md:w-56"></Select>
        </div>
      </div>
    </div>

    <!--COLOR SQUARES-->
    <div class="w-full flex flex-row gap-x-32 justify-center">
      <div class="flex flex-col justify-center relative">
        <ColorSquare class="cursor-pointer" :color="displayColorA" @click="toggleColorPickerA()" />
        <transition name="fade">
          <div v-if="colorPickerAEnabled" class="absolute top-full left-0 z-10 mt-2 p-2 rounded shadow-lg">
            <ColorPicker v-model="colorA" inline />
          </div>
        </transition>
      </div>
      
      <ColorSquare :color="resultingColor" />

      <div class="flex flex-col justify-center relative ">
        <ColorSquare class="cursor-pointer" :color="displayColorB" @click="toggleColorPickerB()" />
        <transition name="fade">
          <div v-if="colorPickerBEnabled" class="absolute top-full left-0 z-10 mt-2 p-2 rounded shadow-l">
            <ColorPicker v-model="colorB" inline />
          </div>
        </transition>
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

const colorPickerAEnabled = ref(false);
const colorPickerBEnabled = ref(false);

function toggleColorPickerA() {
  colorPickerAEnabled.value = !colorPickerAEnabled.value;
}
function toggleColorPickerB() {
  colorPickerBEnabled.value = !colorPickerBEnabled.value;
}

const algorithm = ref( { name: 'RGB average', code: '0' });
const algorithms = ref([
    { name: 'RGB average', code: '0' },
    { name: 'Paint mix', code: '1' },
    { name: 'Subtractive mix', code: '2' },
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

  const r = Math.round((rgb1[0] + rgb2[0]) / 2 * 0.8); // Reduced brightness
  const g = Math.round((rgb1[1] + rgb2[1]) / 2 * 0.8);
  const b = Math.round((rgb1[2] + rgb2[2]) / 2 * 0.8);

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

