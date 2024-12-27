    
<template>
    <div>
        <MenuLine @click="setScreen(0)">color mixer</MenuLine>
        <MenuLine @click="setScreen(1)">color shades</MenuLine>
        <MenuLine @click="setScreen(2)">color naming</MenuLine>
        <MenuLine @click="setScreen(2)">palletes</MenuLine>

        <MenuLine @click="setScreen(2)">about</MenuLine>
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