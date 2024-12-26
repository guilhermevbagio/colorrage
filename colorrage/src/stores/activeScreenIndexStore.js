import { defineStore } from 'pinia';

export const useActiveIndexStore = defineStore('activeIndex', {
  state: () => ({
    activeIndex: 0,
  }),
  actions: {
    prev(screensLength) {
      this.activeIndex = (this.activeIndex - 1 + screensLength) % screensLength;
    },
    next(screensLength) {
      this.activeIndex = (this.activeIndex + 1) % screensLength;
    },
    set(value){
        this.activeIndex = value;
    }
  },
});
