import { defineStore } from 'pinia';
import { hexToHsv, hsvToHex } from '../assets/utils/colorSpaceConverter';

export const useColorsStore = defineStore('colors', {
  state: () => ({
    text: '#FFFFFF', // default text color (white)
    bg: '#000000',   // default background color (black)
    mainColor: '#3498db', // default main color (blue)
  }),
  actions: {
    setMainColor(color) {
      this.mainColor = color;
      this.updateColors(color); // Automatically update text and bg colors
    },
    updateColors(color) {
      const hsv = hexToHsv(color);
      
      // Generate lighter color for text (increase V)
      const lighterTextColor = hsvToHex(hsv.h, hsv.s, Math.min(hsv.v + 0.3, 1));
      
      // Generate darker color for bg (decrease V)
      const darkerBgColor = hsvToHex(hsv.h, hsv.s, Math.max(hsv.v - 0.3, 0));

      this.text = lighterTextColor;
      this.bg = darkerBgColor;
    },
    resetColors() {
      this.text = '#FFFFFF'; // reset text color to white
      this.bg = '#000000';   // reset background color to black
      this.mainColor = '#3498db'; // reset to default blue
    },
  },
});