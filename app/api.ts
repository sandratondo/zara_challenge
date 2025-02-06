import axios from 'axios';

const API_KEY = '87909682e6cd74208f41a6ef39fe4191';

const api = axios.create({
  baseURL: 'https://prueba-tecnica-api-tienda-moviles.onrender.com',
  headers: {
    'x-api-key': API_KEY,
  },
});

//productos buscar y límite desde la api
export const getProducts = async (searchTerm: string = '') => {
  try {
    const response = await api.get('/products', {
      params: { search: searchTerm, limit: 20 }, //limite productos api
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//productos por id y detalles
export const getProductById = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
