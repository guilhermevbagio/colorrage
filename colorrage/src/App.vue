

<template>

    <div class="flex flex-col justify-center w-screen min-h-screen">
      <UpBar/>


      <div class="w-full flex flex-row gap-x-32 justify-center"> 

        <ColorSquare :color="colorA" />
        <ColorSquare :color="resultingColor"/>
        <ColorSquare :color="colorB"/>
      </div>
    </div>

</template>


<script setup>
import ColorSquare from "./components/ColorSquare.vue";
import UpBar from "./components/UpBar.vue";
import { ref } from "vue";

const colorA = ref("#ff5733");
const colorB = ref("#f22753");
const resultingColor = ref( combineColors(colorA, colorB));


function hexToRgb(hex) {
    // Remove the hash (#) if it's there
    hex = hex.substring(1, 6);

    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return [r, g, b];
}

function combineColors(hex1, hex2) {
    const rgb1 = hexToRgb(hex1.value);
    const rgb2 = hexToRgb(hex2.value);
    
    // Average the RGB values
    const r = Math.round((rgb1[0] + rgb2[0]) / 2);
    const g = Math.round((rgb1[1] + rgb2[1]) / 2);
    const b = Math.round((rgb1[2] + rgb2[2]) / 2);
    
    return rgbToHex(r, g, b);
}

function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
