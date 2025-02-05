import React, { createContext, useState, useEffect } from 'react';
import { getProducts } from '../api';

interface Product {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

// Definición del contexto
interface ProductoContextType {
  productos: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

//crear contexto
const ProductoContext = createContext<ProductoContextType>({
  productos: [],
  loading: false,
  error: null,
  searchTerm: '',
  setSearchTerm: () => {},
});

export const ProductoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Estado para los productos, cargando, errores y buscar
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  //cargar productos
  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const data = await getProducts(searchTerm);
        setProductos(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [searchTerm]);

  return (
    <ProductoContext.Provider
      value={{ productos, loading, error, searchTerm, setSearchTerm }}
    >
      {children}
    </ProductoContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de los productos
export const useProductos = () => React.useContext(ProductoContext);
