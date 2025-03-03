import React from 'react';
import TarjetaProducto from './tarjetaProducto';

interface Producto {
  id: string;
  name: string;
  brand: string;
  basePrice: number;
  imageUrl: string;
}

interface ListaProductosProps {
  productos: Producto[];
}

const ListaProductos: React.FC<ListaProductosProps> = ({ productos }) => {
  // Lista de productos
  return (
    <div
      className="grid grid-cols-4 gap-4"
      role="list"
      aria-label="Lista de productos"
    >
      {productos.map((producto) => (
        <TarjetaProducto key={producto.id} producto={producto} />
      ))}
    </div>
  );
};

export default ListaProductos;
