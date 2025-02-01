import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface TarjetaProductoProps {
  producto: Product;
}

const TarjetaProducto: React.FC<TarjetaProductoProps> = ({ producto }) => {
  return (
    <Link to={`/productos/${producto.id}`} className="border rounded p-4">
      <img src={producto.imageUrl} alt={producto.name} className="w-32 h-32 object-cover mb-2" />
      <h3 className="font-bold">{producto.name}</h3>
      <p>{producto.brand}</p>
      <p>Precio: {producto.basePrice}</p>
    </Link>
  );
};

export default TarjetaProducto;