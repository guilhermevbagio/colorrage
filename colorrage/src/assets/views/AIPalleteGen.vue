<template>
    <div class="flex-col flex gap-y-2">

        <h1 v-tooltip="'AI results powered by Huemint, availability might depend on API status'" class="text-2xl font-extrabold text-center cursor-default tracking-tighter text-white">AI COLOR PALLETE*</h1>
        <div class="flex flex-row gap-8 justify-center">
          <div class="flex flex-col gap-2">
            <h1 class="font-semibold self-center text-lg text-white">AMOUNT:</h1>
            <Select v-model="amount" :options="amountOptions"  placeholder="5" class="w-52 self-center" ></Select>
          </div>
          <div class="flex flex-col gap-2 w-56">
            <h1 class="font-semibold self-center text-lg text-white">TEMPERATURE:</h1>
            <VueSlider v-model="temperatureSlider" v-bind="{processStyle : { backgroundColor: store.bg }, railStyle : { backgroundColor: store.text }, dotStyle : {backgroundColor: store.bg}, dotSize : 20, tooltip: 'none', dotOptions: {tooltip: 'none'}}" />
          </div>
        </div>
        <div class="flex flex-row gap-2 w-full justify-center mt-6 items-center">
            <div class="flex flex-row gap-2 mb-auto">
              <OutputColorSquare v-for="index in amount - resultingColors.length" color="" :key="index"></OutputColorSquare>
            </div>
            <div class="flex flex-row gap-2 items-center">
                <OutputColorSquare v-for="color in resultingColors" :key="color" :color="color" />
            </div>
        </div>
        <div class="flex flex-row mt-6 gap-2 mx-auto items-center">
          <button class="flex justify-center cursor-pointer disabled:cursor-default items-center bg-white text-slate-800 p-2 rounded font-bold transition duration-150  disabled:opacity-50" :disabled="loading" @click="generatePallete()"> Generate </button>
          <LoadingIcon class="" v-if="loading" />
        </div>
    </div>
</template>

<script setup>

import VueSlider from "vue-3-slider-component";
import { ref, watch } from "vue";
import { useColorsStore } from '../../stores/colorstore';
import OutputColorSquare from '../../components/OutputColorSquare.vue';
import { getHuemintScheme } from "../utils/injector.js";
import Select from "primevue/select";
import LoadingIcon from "@/components/LoadingIcon.vue";

const store = useColorsStore();
const change = ref(true)
const amount = ref(4);
const amountOptions = ref([2, 3, 4, 5, 6, 7, 8]);
const resultingColors = ref([]);
const loading = ref(false);
const temperature = ref(1.2);
const temperatureSlider = ref(50);

watch(amount, () => {
  change.value = true;
})
watch(temperatureSlider, () => {
  temperature.value = 2.4/100 * temperatureSlider.value;
  change.value = true;
})



async function generatePallete(){
  loading.value = true;
  change.value = false;
  let palette = [];
  for(let i = 0; i < amount.value; i++) {
    palette.push('-');
  }
  let request = await getHuemintScheme(amount.value, temperature.value, 1, palette);
  let colors = request.results;
  let filteredColors = colors[0].palette;
  resultingColors.value = filteredColors;
  store.setMainColor(resultingColors.value[0]);
  loading.value = false;
}

</script>