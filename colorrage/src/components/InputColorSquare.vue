<template>
    <div class="flex flex-col justify-center w-40 relative">
        <ColorSquare class="cursor-pointer text-white" :color="displayColorA" :show-hex="!unlocked" >
        
            <div class="flex flex-row gap-2">
              <font-awesome-icon class="transition duration-150 ease-in-out text-5xl opacity-20 hover:opacity-30 hover:scale-[1.04]" :icon="unlocked ?  'fa-solid fa-check' : 'fa-solid fa-eye-dropper'"  @click="toggleColorPickerA()"/>
              <font-awesome-icon v-if="!unlocked" class="transition duration-150 ease-in-out text-5xl opacity-20 hover:opacity-30 hover:scale-[1.04]" icon="fa-regular fa-paste" @click="pasteColor"/>
            </div>
        </ColorSquare>
        <div v-if="unlocked" class="flex flex-row w-full truncate">
          <p class="bg-gray-800 select-none">#</p>
          <input v-model="inputColor" class="uppercase pr-1 bg-gray-800" :placeholder="color" @input="(value) => sanitizeColor(value)" @paste="pasteColor"/>
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


const unlocked = ref(false);
const displayColorA = computed(() => '#' + color.value)
const inputColor = ref();
const color = defineModel();


function toggleColorPickerA() {
  unlocked.value = !unlocked.value;

  //guarantees the inputColor variable doesnt store a bogus value after invalid input is rejected
  if(unlocked.value) {
    inputColor.value = color.value
  }
}
watch(inputColor, (newColor) => {

  const sanitizedColor = sanitizeColor(newColor);
  if(!isValidColor(sanitizedColor)) {
    return;
  }
  color.value = sanitizedColor
});

watch(color, (newColor) => {
  inputColor.value = newColor;
});

async function pasteColor() {
  const pastedData = (await navigator.clipboard.readText()).trim();
  const sanitizedColor = sanitizeColor(pastedData);
  if (isValidColor(sanitizedColor)) {
    inputColor.value = sanitizedColor;
    color.value= sanitizedColor
  } else {
    console.error('Invalid color format pasted:', pastedData);
  }
}

function isValidColor(input){
  const validColor = /^#?[0-9A-Fa-f]{6}$/i.test(input);

  return validColor;
}

function sanitizeColor(color) {
  const cleanedColor = String(color).replace(/[^a-zA-Z0-9]/g, ''); 
  return cleanedColor;
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
