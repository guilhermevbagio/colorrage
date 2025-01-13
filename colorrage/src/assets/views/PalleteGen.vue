<template>
    <div class="flex-col flex">

        <h1 class="text-2xl font-extrabold text-center tracking-tighter text-white">ALGORITHMIC COLOR PALLETE</h1>
        <div class="flex flex-col gap-2 w-full justify-center mt-6 items-center">
            <Select v-model="algorithm" :options="algorithms" optionLabel="name" placeholder="Monochrome" class="w-52 self-center" ></Select>
            <InputColorSquare v-model="colorA"/>
            <div class="flex flex-row gap-2 items-center">
                <OutputColorSquare v-for="color in resultingColors" :key="color" :color="color" />
            </div>
        </div>
        <button class="flex justify-center mx-auto  items-center mt-6 bg-white text-slate-800 p-2 rounded font-bold transition duration-150 hover:-translate-y-1 hover:text-gray-500 disabled:opacity-50" :disabled="!change" @click="generatePallete()"> Generate </button>
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

const colorA = ref("ff8733");
const store = useColorsStore();
const change = ref(true)
const algorithms = ref( [{ name: 'Monochrome', value: 'monochrome' },  { name: 'Analogous', value: 'analogic' }, { name: 'Complementary', value: 'complement' }, { name: 'Analogic Complementary', value: 'analogic-complement' }, { name: 'Triadic', value: 'triad' }, { name: 'Tetradic', value: 'quad' }]);
const algorithm = ref({name: '', value: ''});
const resultingColors = ref([]);

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


async function generatePallete(){
  change.value = false;
  let request = await getColorScheme(colorA.value, '', algorithm.value.value, 5);
  let colors = request.colors;
  let filteredColors = colors.map(color => color.hex.value);
  resultingColors.value = filteredColors;
  console.log(resultingColors.value)
}

</script>