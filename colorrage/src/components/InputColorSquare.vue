<template>
    <div class="flex flex-col justify-center relative">
        <ColorSquare class="cursor-pointer text-white" :color="displayColorA" @click="toggleColorPickerA()" >
        
            <font-awesome-icon class="transition duration-150 ease-in-out text-5xl opacity-10 hover:opacity-30 hover:scale-[1.04]" :icon="unlocked ? 'fa-solid fa-lock-open' : 'fa-solid fa-lock'" />

        </ColorSquare>
        <transition name="fade">
          <div v-if="unlocked" class="absolute top-full left-0 z-10 rounded shadow-lg">
            <ColorPicker v-model="color" inline />
          </div>
        </transition>
      </div>
</template>

<script setup>
import ColorSquare from './ColorSquare.vue'
import ColorPicker from 'primevue/colorpicker';
import { ref, computed } from "vue";

function toggleColorPickerA() {
  unlocked.value = !unlocked.value;
}

const unlocked = ref(false);
const displayColorA = computed(() => '#' + color.value)
const color = defineModel();


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
