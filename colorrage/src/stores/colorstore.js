import { defineStore } from 'pinia';
import { hexToHsv, hsvToHex } from '../assets/utils/colorSpaceConverter';

export const useColorsStore = defineStore('colors', {
  state: () => ({
    text: '#FFFFFF',
    bg: '#000000', 
    mainColor: '#3498db',
  }),
  actions: {
    setMainColor(color) {
      this.mainColor = color;
      this.updateColors(color);
    },
    updateColors(color) {
      const hsv = hexToHsv(color);
      
      const textV = hsv.v/3;
      const textColor = hsvToHex(hsv.h, hsv.s, textV);
      
      const bgColor = hsvToHex(hsv.h, hsv.s, hsv.v);

      const contrast = (hsv.v - textV)
      this.text = contrast < 30 ? hsvToHex(hsv.h, hsv.s, 100 - contrast) : textColor;
      this.bg = bgColor;
    },
    resetColors() {
      this.text = '#FFFFFF';
      this.bg = '#000000'; 
      this.mainColor = '#3498db'; 
    },
    clamp(num, min, max) { Math.min(Math.max(num, min), max) }
  },
});