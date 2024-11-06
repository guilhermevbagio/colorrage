export function hexToRgb(hex) {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

export function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
  
    const maxc = Math.max(r, g, b);
    const minc = Math.min(r, g, b);
    const v = maxc * 100;
  
    if (minc === maxc) {
      return [0, 0, v];
    }
  
    const s = ((maxc - minc) / maxc) * 100;
    const rc = (maxc - r) / (maxc - minc);
    const gc = (maxc - g) / (maxc - minc);
    const bc = (maxc - b) / (maxc - minc);
  
    let h;
    if (r === maxc) {
      h = bc - gc;
    } else if (g === maxc) {
      h = 2.0 + rc - bc;
    } else {
      h = 4.0 + gc - rc;
    }
  
    h = (h / 6.0) % 1.0;
    if (h < 0) h += 1; // Adjust for negative values due to modulo in JS
    h *= 360;
  
    return [h, s, v];
  }
  

export function hsvToRgb(h, s, v) {

    const c = v * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = v - c;

    let r, g, b;
    if (h < 60) {
        r = c; g = x; b = 0;
    } else if (h < 120) {
        r = x; g = c; b = 0;
    } else if (h < 180) {
        r = 0; g = c; b = x;
    } else if (h < 240) {
        r = 0; g = x; b = c;
    } else if (h < 300) {
        r = x; g = 0; b = c;
    } else {
        r = c; g = 0; b = x;
    }
    return [
        Math.floor((r + m) * 255),
        Math.floor((g + m) * 255),
        Math.floor((b + m) * 255)
    ];
}

export function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }
