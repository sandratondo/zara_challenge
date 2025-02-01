// components/listaProductos.tsx

import React from "react";
import TarjetaProducto from "./tarjetaProducto"; // Asegúrate de que este componente esté correctamente definido

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
  return (
    <div className="grid grid-cols-4 gap-4">
      {productos.map((producto) => (
        <TarjetaProducto key={producto.id} producto={producto} />
      ))}
    </div>
  );
};

export default ListaProductos;
