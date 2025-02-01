import axios from "axios";

const API_URL = "https://prueba-tecnica-api-tienda-moviles.onrender.com";
const API_KEY = "87909682e6cd74208f41a6ef39fe4191";

// Configuración global de Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "x-api-key": API_KEY,
    "Content-Type": "application/json",
  },
});

// Obtener todos los productos (primeros 20)
export const fetchProductos = async () => {
  try {
    const response = await api.get("/products");
    return response.data.slice(0, 20); // Tomamos solo los primeros 20
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

// Obtener un producto por ID
export const fetchProductoPorId = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${id}:`, error);
    throw error;
  }
};
