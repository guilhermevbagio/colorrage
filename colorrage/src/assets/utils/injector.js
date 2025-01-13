import axios from 'axios';

const API_URL = 'https://www.thecolorapi.com/scheme';

export const getColorScheme = async (hex, format = '', mode = 'analogic', count = 6) => {
  try {
    const response = await axios.get(API_URL, {
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
