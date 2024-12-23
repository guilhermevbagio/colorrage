<template>
    <div class="flex flex-col justify-center w-40 relative">
        <ColorSquare class="cursor-pointer text-white" :color="displayColorA" :show-hex="!unlocked" >
        
            <div class="flex flex-row gap-2">

              <font-awesome-icon class="transition duration-150 ease-in-out text-5xl opacity-10 hover:opacity-30 hover:scale-[1.04]" :icon="unlocked ?  'fa-solid fa-check' : 'fa-solid fa-eye-dropper'"  @click="toggleColorPickerA()"/>
              <font-awesome-icon v-if="!unlocked" class="transition duration-150 ease-in-out text-5xl opacity-10 hover:opacity-30 hover:scale-[1.04]" icon="fa-regular fa-paste" @click="pasteColor()"/>
            </div>
        </ColorSquare>
        <div v-if="unlocked">
          <input v-model="color" class="uppercase w-40 px-1" @input="sanitizeColor" @paste="pasteColor"/>
        </div>
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
import { ref, computed, watch } from "vue";

function toggleColorPickerA() {
  unlocked.value = !unlocked.value;
}

const unlocked = ref(false);
const displayColorA = computed(() => '#' + color.value)
const color = defineModel();


watch(color, (newColor) => {

  const sanitizedColor = sanitizeColor(newColor);

  if(!isValidColor(sanitizedColor)) { 
    return;
  }
  color.value = sanitizedColor
});

async function pasteColor(event) {

}

function isValidColor(input){
  const validColor = /^#[0-9A-Fa-f]{6}$/i.test(input);

  return validColor;
}

function sanitizeColor(color) {
  const cleanedColor = color.replace(/[^a-zA-Z0-9#]/g, ''); 
  return cleanedColor()
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
