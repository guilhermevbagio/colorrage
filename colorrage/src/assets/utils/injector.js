import axios from 'axios';

const COLORS_API_URL = 'https://www.thecolorapi.com/scheme';
const HUEMINT_API = 'https://api.huemint.com/color';

export const getColorScheme = async (hex, format = '', mode = 'analogic', count = 6) => {
  try {
    const response = await axios.get(COLORS_API_URL, {
      params: {
        hex,
        format,
        mode,
        count,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching color scheme:', error);
    throw error; 
  }
};


export const getHuemintScheme = async (numColors = 4, temperature = 1.2, numResults = 1, palette = ['-', '-', '-', '-']) => {
  let matrix = generateAdjacencyMatrix(numColors);
  const jsonData = {
    mode: 'diffusion', // Options: 'transformer', 'diffusion', or 'random'
    num_colors: numColors, // Max 12, Min 2
    temperature, // Max 2.4, Min 0
    num_results: numResults, // Max 50 for transformer, 5 for diffusion
    adjacency: matrix,
    palette, // Locked colors as hex codes or '-' for blanks
  };

  try {
    const response = await axios.post(HUEMINT_API, JSON.stringify(jsonData), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return the palette or results
  } catch (error) {
    console.error('Error fetching Huemint scheme:', error);
    throw error;
  }
};

function generateAdjacencyMatrix(size = 5) {
  const matrix = [];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (row === col) {
        matrix.push('0');
      } else {
        const value = Math.floor(Math.random() * 101); 
        matrix.push(value.toString());
      }
    }
  }

  return matrix;
}

