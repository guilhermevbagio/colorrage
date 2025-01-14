<template>
    <div class="spinner-container">
      <font-awesome-icon icon="fa-solid fa-spinner" size="2xl" class="spinner" />
    </div>
  </template>
  
  <style scoped>
  .spinner {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>