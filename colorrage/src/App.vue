<template>
  <div class="flex flex-row items-center justify-center w-screen min-h-screen gap-y-8">
      <UpBar />

      <ScreenCarousel :screens="screens" />
  </div>

</template>

<script setup>

import UpBar from './components/UpBar.vue';
import ColorMixer from './assets/views/ColorMixer.vue';
import ScreenCarousel from './components/ScreenCarousel.vue';
import ColorSquare from './components/ColorSquare.vue';

const screens=[ColorMixer, ColorSquare];

</script>


