    
<template>
    <div class="z-50">
        <MenuLine @click="setScreen(0)">color mixer</MenuLine>
        <MenuLine @click="setScreen(1)">color shades</MenuLine>
        <MenuLine @click="setScreen(2)">palletes</MenuLine>
        <MenuLine @click="setScreen(3)">AI palletes</MenuLine>

    </div>
</template>


<script setup>
    import MenuLine from './MenuLine.vue';
    import { useActiveIndexStore } from '@/stores/activeScreenIndexStore';

    const store = useActiveIndexStore();

    function setScreen(value){
        store.set(value);
    }
</script>