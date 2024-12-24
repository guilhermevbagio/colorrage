<template>
    <div>
        <div :style="colorStyle" class="w-40 h-40 rounded shadow-md m-0 p-0 flex items-center  justify-center">
            <slot>

            </slot>
        </div>
        <p v-if="showHex" class="uppercase truncate">{{ color }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { hexToHsv } from '../assets/utils/colorSpaceConverter';


// Define props
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

