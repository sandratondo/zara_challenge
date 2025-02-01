import axios from 'axios';

const API_KEY = '87909682e6cd74208f41a6ef39fe4191';

const api = axios.create({
  baseURL: 'https://prueba-tecnica-api-tienda-moviles.onrender.com',
  headers: {
    'x-api-key': API_KEY,
  },
});

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};