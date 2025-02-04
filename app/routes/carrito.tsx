import React from 'react';
import { useCarritoContext } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import Navegador from '../components/navegador';

const Carrito: React.FC = () => {
  const { carrito, removeFromCarrito, totalPrecio } = useCarritoContext();
  const redirigir = useNavigate();

    // Contar los elementos en el carrito
    const totalItems = carrito.reduce((acc, item) => acc + item.quantity, 0);

    const redirigirPrincipal = () => {
      redirigir('/'); // Redirige página princiapal
    };

    return (
      <div className='h-all'>
        <Navegador />
        <div className="container p-4 carrito-container">
          <div className="text-gray-600 text-m">CARRITO ({totalItems})</div>
          {carrito.length === 0 ? (
            <p className="text-gray-600">Tu carrito está vacío.</p>
          ) : (
            <div>
            <div className='mt-m'>
              <div className='carrito-content'>
                {carrito.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.storage}`} className="carrito-item p-4">
                    <img src={item.imageUrl} alt={item.name} className="w-32 h-32 object-cover" />
                      <div className='grid-row'>
                        <div className="details flex-1">
                          <p className="text-sm">{item.name}</p>
                          <p className="text-sm"> {item.storage} | {item.color}</p>
                          <p className="text-sm margin-bottom margin-bottom">{item.price} EUR</p>
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={() => removeFromCarrito(item.id, item.color, item.storage)}
                            className="bg-none text-sm text-red"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                  </div>
                ))}
              </div>

            </div>

<div className="actions">
       
<button
  onClick={redirigirPrincipal}
  className="button-secondary no-border"
>
  CONTINUAR COMPRANDO
</button>

<div className="total">
<p><span className="total total-m mx">Total</span> {totalPrecio} EUR</p>
<button className="btn-main-black">PAGAR</button>
</div>

</div>

</div>


          )}
        </div>
      </div>
    );
};

export default Carrito;
