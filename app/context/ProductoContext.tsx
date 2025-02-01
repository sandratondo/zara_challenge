import { createContext, useState, useEffect, useContext} from "react";
import type { ReactNode } from "react";
import { fetchProductos } from "../api";

// Definimos el contexto con un valor inicial
const ProductoContext = createContext({
  productos: [],
  loading: true,
});

interface ProductoProviderProps {
  children: ReactNode;
}

export function ProductoProvider({ children }: ProductoProviderProps) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <ProductoContext.Provider value={{ productos, loading }}>
      {children}
    </ProductoContext.Provider>
  );
}

export function useProductos() {
  return useContext(ProductoContext);
}
