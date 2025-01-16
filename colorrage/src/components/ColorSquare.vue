<template>
    <div>
        <div :style="colorStyle" class="w-24 h-24 md:w-32 md:h-32 2xl:w-40 2xl:h-40 rounded shadow-md flex items-center justify-center">
            <slot>

            </slot>
        </div>
        <p v-if="showHex" class="uppercase truncate" @click="emits('clickOnHex')">{{ color }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { hexToHsv } from '../assets/utils/colorSpaceConverter';


const props = defineProps({
    color: {
        type: String,
        default: '#06b6d4'
    },
    showHex: {
        type: Boolean,
        default: true
    }
});

const emits = defineEmits(['clickOnHex']);


const colorStyle = computed(() => ({
    backgroundColor: props.color,
    color: textColorContrastAdjustment()
}));

function textColorContrastAdjustment(){
    if (!props.color || !isValidColor(props.color)) return '#000000';
    return hexToHsv(props.color).v < 80 ? '#ffffff' : '#000000'
}

function isValidColor(input){
  const validColor = /^#?[0-9A-Fa-f]{6}$/i.test(input);

  return validColor;
}

</script>

