import React from 'react';
import { useCarritoContext } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import Navegador from '../components/navegador';
import { FaChevronLeft } from 'react-icons/fa';

const Carrito: React.FC = () => {
  const { carrito, removeFromCarrito, totalPrecio } = useCarritoContext();
  const redirigir = useNavigate();

  // Contar los elementos en el carrito
  const totalItems = carrito.reduce((acc, item) => acc + item.quantity, 0);

  const redirigirPrincipal = () => {
    redirigir('/'); // Redirige página princiapal
  };

  return (
    <div className="h-all">
      <Navegador />
      <div className="container container-plus text-align-s">
        <div className="text-m ">CARRITO ({totalItems})</div>

        {/* Si el carrito está vacío*/}
        {carrito.length === 0 ? (
          <div className="displ-line">
            <button
              className="volver-btn"
              onClick={redirigirPrincipal}
              aria-label="Volver"
              role="button"
            >
              <FaChevronLeft size={10} className="icono" />
              VOLVER
            </button>
            <p className="text-gray-600" aria-live="polite">
              Tu carrito está vacío
            </p>
          </div>
        ) : (
          /* Si hay productos en el carrito los muestra */
          <div className="flexi">
            <div className="container p-4 carrito-container">
              <div className="mt-m">
                <div className="carrito-content">
                  {carrito.map((item) => (
                    <div
                      key={`${item.id}-${item.color}-${item.storage}`}
                      className="carrito-item p-4"
                    >
                      {/* Imagen del producto */}
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-32 h-32 object-cover"
                      />
                      <div className="grid-row">
                        {/* Detalles del producto */}
                        <div className="details flex-1">
                          <p className="text-sm">{item.name}</p>
                          <p className="text-sm">
                            {' '}
                            {item.storage} | {item.color}
                          </p>
                          <p className="text-sm margin-bottom margin-bottom">
                            {item.price} EUR
                          </p>
                        </div>

                        {/* Botón para eliminar el producto del carrito */}
                        <div className="mt-4">
                          <button
                            onClick={() =>
                              removeFromCarrito(
                                item.id,
                                item.color,
                                item.storage
                              )
                            }
                            className="bg-none text-sm text-red"
                            aria-label={`Eliminar ${item.name} de color ${item.color} y almacenamiento ${item.storage} del carrito`}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="actions">
              <div className="actions-buttons">
                <button
                  onClick={redirigirPrincipal}
                  className="button-secondary no-border"
                >
                  CONTINUAR COMPRANDO
                </button>
              </div>
              {/* Muestra precio total del carrito */}
              <div className="total">
                <p role="status">
                  <span className="total mx">Total</span> {totalPrecio} EUR
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
