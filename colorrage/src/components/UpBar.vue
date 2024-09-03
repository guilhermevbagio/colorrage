<template>
    <div class="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 z-50">
        <h1 class="text-3xl font-bold flex justify-start tracking-tighter">
            
            <span v-for="(char, index) in text" :key="index" class="wave-char wave-text">
                {{ char }}
            </span>

        </h1>
    </div>
</template>

<style scoped>
.wave-text {
  display: inline-flex;
  font-size: 2rem;
  font-weight: bolder;
}

.wave-char {
  display: inline-block;
  animation: wave-animation 2s ease-in-out infinite;
}

.wave-char:nth-child(1) { animation-delay: 0s; }
.wave-char:nth-child(2) { animation-delay: 0.1s; }
.wave-char:nth-child(3) { animation-delay: 0.2s; }
.wave-char:nth-child(4) { animation-delay: 0.3s; }
.wave-char:nth-child(5) { animation-delay: 0.4s; }
.wave-char:nth-child(6) { animation-delay: 0.5s; }
.wave-char:nth-child(7) { animation-delay: 0.6s; }
.wave-char:nth-child(8) { animation-delay: 0.7s; }
.wave-char:nth-child(9) { animation-delay: 0.8s; }
.wave-char:nth-child(10) { animation-delay: 0.9s; }

@keyframes wave-animation {
  0% { transform: translateY(0); }
  50% { transform: translateY(-.3rem); }
  100% { transform: translateY(0); }
}
</style>

<script setup>

const text = 'COLORRAGE.';

</script>