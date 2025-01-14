<template>
    <div class="flex-col flex gap-y-2">

        <h1 class="text-2xl font-extrabold text-center tracking-tighter text-white">ALGORITHMIC COLOR PALLETE</h1>
        <h1 class="font-semibold self-center text-lg text-white">MODE:</h1>
        <div class="flex flex-row gap-2 justify-center">

          <Select v-model="algorithm" :options="algorithms" optionLabel="name" placeholder="Monochrome" class="w-52 self-center" ></Select>
          <Select v-model="amount" :options="amountOptions"  placeholder="5" class="w-52 self-center" ></Select>
        </div>

        <div class="flex flex-row gap-2 w-full justify-center mt-6 items-center">
          <div class="flex flex-row items-center gap-4" :class="!change ? 'pr-2' : ''">
            <InputColorSquare v-model="colorA"/>
            <font-awesome-icon v-if="!change && !loading" icon="fa-solid fa-arrow-right" size="2xl"  />
          </div>  

            <div v-if="!change" class="flex flex-row gap-2 items-center">
                <OutputColorSquare v-for="color in resultingColors" :key="color" :color="color" />
            </div>
        </div>
        <LoadingIcon class="mx-auto" v-if="loading" />
        <button class="flex justify-center mx-auto cursor-pointer disabled:cursor-default items-center mt-6 bg-white text-slate-800 p-2 rounded font-bold transition duration-150  disabled:opacity-50" :class="change ? 'hover:-translate-y-1 hover:text-gray-500' : ''" :disabled="!change" @click="generatePallete()"> Generate </button>
    </div>
</template>

<script setup>

import { ref, watch, onMounted } from "vue";
import { useColorsStore } from '../../stores/colorstore';
import OutputColorSquare from '../../components/OutputColorSquare.vue';
import InputColorSquare from '../../components/InputColorSquare.vue';
import { getColorScheme } from "../utils/injector.js";
import { randomColor } from '../utils/colorSpaceConverter.js';
import Select from "primevue/select";
import LoadingIcon from "@/components/LoadingIcon.vue";

const colorA = ref("ff8733");
const store = useColorsStore();
const change = ref(true)
const algorithms = ref( [{ name: 'Monochrome', value: 'monochrome' },  { name: 'Analogous', value: 'analogic' }, { name: 'Complementary', value: 'complement' }, { name: 'Analogic Complementary', value: 'analogic-complement' }, { name: 'Triadic', value: 'triad' }, { name: 'Tetradic', value: 'quad' }]);
const algorithm = ref({name: '', value: ''});
const amount = ref(5);
const amountOptions = ref([3, 4, 5, 6, 7, 8]);
const resultingColors = ref([]);
const loading = ref(false);

onMounted(() => {
  colorA.value = randomColor();
  store.setMainColor(colorA.value)

})

watch(colorA, () => {
  store.setMainColor(colorA.value)
  change.value = true;
})
watch(algorithm, () => {
  change.value = true;
})
watch(amount, () => {
  change.value = true;
})


async function generatePallete(){
  loading.value = true;
  change.value = false;
  let request = await getColorScheme(colorA.value, '', algorithm.value.value, amount.value);
  let colors = request.colors;
  let filteredColors = colors.map(color => color.hex.value);
  resultingColors.value = filteredColors;
  loading.value = false;
}

</script>