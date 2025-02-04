import React, { createContext, useState, useEffect, useContext } from 'react';
import { CarritoItem } from '../../types'; // Importa la interfaz CarritoItem

interface CarritoContextType {
  carrito: CarritoItem[];
  agregarAlCarrito: (producto: CarritoItem) => void;
  eliminarDelCarrito: (id: string) => void;
  actualizarCantidad: (id: string, cantidad: number) => void;
}

const CarritoContext = createContext<CarritoContextType>({
  carrito: [],
  agregarAlCarrito: () => {},
  eliminarDelCarrito: () => {},
  actualizarCantidad: () => {},
});

export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);

  useEffect(() => {
    const storedCarrito = localStorage.getItem('carrito');
    if (storedCarrito) {
      // Verifica si hay un valor almacenado
      setCarrito(JSON.parse(storedCarrito));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto: CarritoItem) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarDelCarrito = (id: string) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const actualizarCantidad = (id: string, cantidad: number) => {
    setCarrito(
      carrito.map((item) => (item.id === id ? { ...item, cantidad } : item))
    );
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);
