<script setup>
import ColorSquare from "./components/ColorSquare.vue";
import UpBar from "./components/UpBar.vue";
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
      <UpBar/>

      <div class="flex flex-row items-center justify-center gap-x-32">
        <ColorSquare/>
        <ColorSquare/>
        <ColorSquare/>
      </div>
      
    </div>

</template>

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
