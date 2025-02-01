import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

interface ProductoContextType {
  productos: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const ProductoContext = createContext<ProductoContextType>({
  productos: [],
  loading: false,
  error: null,
  searchTerm: '',
  setSearchTerm: () => {},
});

export const ProductoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://prueba-tecnica-api-tienda-moviles.onrender.com/products', {
          headers: {
            'x-api-key': '87909682e6cd74208f41a6ef39fe4191',
          },
        });
        setProductos(response.data);
      } catch (error: any) {
        setError(error.message);
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const filteredProducts = productos.filter((product) => {
      const search = searchTerm.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(search);
      const brandMatch = product.brand.toLowerCase().includes(search);
      return nameMatch || brandMatch;
  });

  return (
    <ProductoContext.Provider value={{ productos: filteredProducts, loading, error, searchTerm, setSearchTerm }}>
      {children}
    </ProductoContext.Provider>
  );
};

export const useProductos = () => React.useContext(ProductoContext);