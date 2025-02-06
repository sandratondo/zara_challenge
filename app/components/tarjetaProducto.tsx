import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface TarjetaProductoProps {
  producto: Product;
}

const TarjetaProducto: React.FC<TarjetaProductoProps> = ({ producto }) => {
  return (
    // Vista tarjeta productos
    <Link to={`/productos/${producto.id}`} className="product-card" aria-label={`Ver detalles de ${producto.name}`}>
      {producto.imageUrl ? (
      <img
        src={producto.imageUrl}
        alt={producto.name}
        className="product-image"
      />
      ) : null}
      <div  role="article" className="product-info">
        <p className="product-brand">{producto.brand}</p>
        <div className="product-details">
          <span className="product-name">{producto.name}</span>
          <span className="product-price">{producto.basePrice} EUR</span>
        </div>
      </div>
    </Link>
  );
};

export default TarjetaProducto;