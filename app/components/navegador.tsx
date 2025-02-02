import React from 'react';
import { Link } from 'react-router-dom';
import {  useCarritoContext } from '../context/CarritoContext'; // Importa el contexto del carrito
import { FaShoppingCart } from 'react-icons/fa';

const Navegador: React.FC = () => {
  const { carrito } = useCarritoContext(); 

    // Calcular la cantidad total de productos en el carrito
    const cantidadTotal = carrito.reduce((total, producto) => total + producto.quantity, 0);

  return (
    <nav className="bg-gray-200 p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">Logo</Link> 
      <div>
        <Link to="/carrito" className="relative">
          <FaShoppingCart size={24} />
          {cantidadTotal > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">
              {cantidadTotal}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navegador;