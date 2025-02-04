import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface TarjetaProductoProps {
  producto: Product;
}

const TarjetaProducto: React.FC<TarjetaProductoProps> = ({ producto }) => {
  return (
    <Link to={`/productos/${producto.id}`} className="product-card">
      <img
        src={producto.imageUrl}
        alt={producto.name}
        className="product-image"
      />
      <div className="product-info">
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
