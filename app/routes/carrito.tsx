import React from 'react';
import { useCarritoContext } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom';

const Carrito: React.FC = () => {
  const { carrito, removeFromCarrito, totalPrecio } = useCarritoContext();
  const redirigir = useNavigate();

    // Contar los elementos en el carrito
    const totalItems = carrito.reduce((acc, item) => acc + item.quantity, 0);

    const redirigirPrincipal = () => {
      redirigir('/'); // Redirige página princiapal
    };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Carrito ({totalItems})</h2>
      {carrito.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <div>
          {carrito.map((item) => (
            <div key={`${item.id}-${item.color}-${item.storage}`} className="border p-4 flex gap-4 items-center">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">{item.brand}</p>
                <p className="text-sm">Color: {item.color} | Almacenamiento: {item.storage}</p>
                <p className="text-sm font-bold">Precio: ${item.price} x {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCarrito(item.id, item.color, item.storage)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          ))}
          <div className="mt-4 text-right">
            <p className="text-xl font-bold">Total: ${totalPrecio}</p>
            <button onClick={redirigirPrincipal} className="bg-gray-600 text-white px-4 py-2 rounded mr-2">
              Continuar Comprando
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
