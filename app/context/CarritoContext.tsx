import React, { createContext, useState, useEffect } from 'react';

interface CarritoItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  color: string;
  storage: string;
  imageUrl: string;
  quantity: number;
}

//definir conexto carrito
interface CarritoContextType {
  carrito: CarritoItem[];
  addToCarrito: (item: CarritoItem) => void;
  removeFromCarrito: (id: string, color: string, storage: string) => void;
  totalPrecio: number;
}

//crear contexto
const CarritoContext = createContext<CarritoContextType>({
  carrito: [],
  addToCarrito: () => {},
  removeFromCarrito: () => {},
  totalPrecio: 0,
});

//componente carrito provider
export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);

  //Cargar carrito desde localstorage
  useEffect(() => {
    const storedCarrito = localStorage.getItem('carrito');
    if (storedCarrito) {
      setCarrito(JSON.parse(storedCarrito));
    }
  }, []);

  //Guardar el carrito en localStorage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  //añadir al carrito según condiciones
  const addToCarrito = (item: CarritoItem) => {
    setCarrito((prev) => {
      const existingItem = prev.find(
        (p) =>
          p.id === item.id &&
          p.color === item.color &&
          p.storage === item.storage
      );
      if (existingItem) {
        return prev.map((p) =>
          p.id === item.id &&
          p.color === item.color &&
          p.storage === item.storage
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  //elimia producto  si coincide con los valores
  const removeFromCarrito = (id: string, color: string, storage: string) => {
    setCarrito((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.color === color && item.storage === storage)
      )
    );
  };

  //calcular precio total
  const totalPrecio = carrito.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CarritoContext.Provider
      value={{ carrito, addToCarrito, removeFromCarrito, totalPrecio }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarritoContext = () => React.useContext(CarritoContext);
