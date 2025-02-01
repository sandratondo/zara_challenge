import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from "react";

interface ProductoCarrito {
  id: string;
  quantity: number;
}

interface CarritoContextType {
  carrito: ProductoCarrito[];
  setCarrito: React.Dispatch<React.SetStateAction<ProductoCarrito[]>>;
  agregarAlCarrito: (productoId: string) => void;
  eliminarDelCarrito: (productoId: string) => void;
  obtenerCantidadCarrito: () => number;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const useCarritoContext = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarritoContext must be used within a CarritoProvider');
  }
  return context;
};

export const CarritoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]); // Inicializa carrito sin localStorage

  useEffect(() => {
    if (typeof window !== 'undefined') { // Verifica si estamos en el navegador
      const storedCarrito = localStorage.getItem('carrito');
      setCarrito(storedCarrito ? JSON.parse(storedCarrito) : []); // Usa operador ternario
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') { // Verifica si estamos en el navegador
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  }, [carrito]);

  const agregarAlCarrito = (productoId: string) => {
    setCarrito((prev) => {
      const nuevoCarrito = [...prev];
      const index = nuevoCarrito.findIndex(item => item.id === productoId);
      if (index !== -1) {
        nuevoCarrito[index].quantity += 1;
      } else {
        nuevoCarrito.push({ id: productoId, quantity: 1 });
      }

      if (typeof window !== 'undefined') { // Verifica antes de usar localStorage
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
      }

      return nuevoCarrito;
    });
  };

  const eliminarDelCarrito = (productoId: string) => {
    const nuevoCarrito = carrito.filter(item => item.id !== productoId);

    if (typeof window !== 'undefined') { // Verifica antes de usar localStorage
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    }

    setCarrito(nuevoCarrito);
  };

  const obtenerCantidadCarrito = () => carrito.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CarritoContext.Provider value={{ carrito, setCarrito, agregarAlCarrito, eliminarDelCarrito, obtenerCantidadCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

