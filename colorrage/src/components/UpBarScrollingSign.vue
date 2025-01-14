<template>
    <div
        class="w-full h-14 fixed top-12 right-0 z-50 flex items-end p-2 overflow-hidden"
        :style="{ color: colors.bg, backgroundColor: colors.text }"
    >
    <div class="scrolling-text w-full">
      <span class="mr-20"> COLORRAGE. IS A FREE COLOR MANIPULATION TOOL
      </span> 
      <span class="font-bold mr-20">
        SUGGESTIONS AND FEEDBACK ARE WELCOME!
      </span>
      <a class="mr-20 underline cursor-pointer" target="_blank" href="https://github.com/guilhermevbagio/colorrage">
        CHECK OUR GITHUB PAGE.
      </a>
    </div>
  </div>
</template>


<script setup>

  import { useColorsStore } from '../stores/colorstore';

  const colors = useColorsStore();


</script>

<style scoped>

    .scrolling-text {
    display: inline-block;
    white-space: nowrap;
    animation: scroll-animation 40s linear infinite;
    }

    @keyframes scroll-animation {
    0% {
    transform: translateX(100%);
    }
    100% {
    transform: translateX(-100%);
    }
    }

</style>