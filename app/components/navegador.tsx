import React from 'react';
import { Link } from 'react-router-dom';
import {  useCarritoContext } from '../context/CarritoContext'; // Importa el contexto del carrito

const Navegador: React.FC = () => {
  const { carrito } = useCarritoContext(); // Cambia aquí

  return (
    <nav className="bg-gray-200 p-4 flex justify-between items-center">
      <Link to="/home" className="font-bold text-xl">Logo</Link> {/* Reemplaza "Logo" con tu logo */}
      <div>
        <Link to="/carrito" className="relative">
          <span className="material-symbols-outlined">shopping_cart</span> {/* Icono de carrito */}
          {carrito.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">
              {carrito.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navegador;