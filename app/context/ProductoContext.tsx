import React, { createContext, useState, useEffect } from 'react';
import { getProducts } from '../api';

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

export const ProductoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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

export const useProductos = () => React.useContext(ProductoContext);
