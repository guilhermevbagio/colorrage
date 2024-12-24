import * as colorsys from 'colorsys';

export function hexToRgb(hex) {
    const rgb = colorsys.hex_to_rgb(hex);
    return rgb;
}

export function rgbToHsv(r, g, b) {
    const hsv = colorsys.rgb_to_hsv(r, g, b);
    return hsv;
}

export function hsvToRgb(h, s, v) {
    const rgb = colorsys.hsv_to_rgb(h, s, v);
    return rgb;
}

export function rgbToHex(r, g, b) {
  const hex = colorsys.rgb_to_hex(
    {r, g, b});
  return hex;
}

export function hexToHsv(hex){
  return colorsys.hexToHsv(hex)
}
export function hsvToHex(h, s, v){
  return colorsys.hsvToHex(h, s, v)
}

export function randomColor(){
  return colorsys.random();
}