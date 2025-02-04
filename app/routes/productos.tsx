import { getProductById } from '../api';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useCarritoContext } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import Navegador from '../components/navegador';
import DragScroll from '../components/DragScroll';
import { FaChevronLeft } from 'react-icons/fa';

export async function loader({ params }: any) {
  try {
    return await getProductById(params.id);
  } catch (error) {
    throw new Response('Producto no encontrado', { status: 404 });
  }
}

export default function ProductoDetalle() {
  const product = useLoaderData();
  const { addToCarrito } = useCarritoContext();
  const redirigir = useNavigate();

  const [selecionadoColor, setSelecionadoColor] = useState(product.colorOptions[0]?.name || '');
  const [selecAlmacenamiento, setSelecAlmacenamiento] = useState('');
  const [precioFinal, setPrecioFinal] = useState(product.basePrice);

  // Manejar selección de almacenamiento y actualizar precio
  const cambiarAlmacenamiento = (capacity: string, price: number) => {
    setSelecAlmacenamiento(capacity);
    setPrecioFinal(price);
  };

  // Obtener la imagen correspondiente al color seleccionado
  const selectedImage = product.colorOptions.find((color: any) => color.name === selecionadoColor)?.imageUrl || product.imageUrl;

  // Agregar al carrito
  const addCarrito = () => {
    if (selecionadoColor && selecAlmacenamiento) {
      addToCarrito({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: precioFinal,
        color: selecionadoColor,
        storage: selecAlmacenamiento,
        imageUrl: selectedImage,
        quantity: 1
      });

      // Redirige a la página del carrito
      redirigir('/carrito');
    }
  };

  const redirigirPrincipal = () => {
    redirigir('/'); 
  };

  return (
    <div className='my-b'>
      <Navegador />

      <div className="volver-container">
        <button className="volver-btn" onClick={redirigirPrincipal}>
          <FaChevronLeft  size={10} className="icono" />
            VOLVER
        </button>
      </div>

      <div className="page-content">
        <div className="container max-w-tbl p-4">
          
        <div className='vh-fit'>
          <div className='phone-container'>
            {/* div izquierda */}
            <div className='phone-image-container'>
              <img src={selectedImage} alt={product.name} className="phone-image" />
            </div>

            {/* div derecha*/}
            <div className='phone-info'>
              <div className="phone-model">{product.name}</div>
              <div className="phone-price text-capital">
                {selecAlmacenamiento ? `${precioFinal} EUR` : `Desde ${product.basePrice} EUR`}
              </div> 

              {/* Fila 3: ¿CUÁNTO ESPACIO NECESITAS? */}
              <div className="phone-row">
                <label className="phone-storage-label">STORAGE ¿CUÁNTO ESPACIO NECESITAS?</label>
              </div>

              {/* Fila 4: Botones de almacenamiento*/}
              <div className="phone-storage-options">
                {product.storageOptions.map((option: any) => (
                  <button
                    key={option.capacity}
                    className={`btn-white ${selecAlmacenamiento === option.capacity ? 'border-selected' : 'border-gray'}`}
                    onClick={() => cambiarAlmacenamiento(option.capacity, option.price)}
                  >
                    {option.capacity}
                  </button>
                ))}
              </div>
              
              {/* Fila 5: Escoge tu color favorito */}
              <div className="phone-row">
                <label className="phone-color-label">ELIGE TU COLOR FAVORITO</label>
              </div>

              {/* Fila 6: Escoge tu color favorito */}
              <div className="phone-color-options">
                {product.colorOptions.map((color: any) => (
                  <div>
                    <button
                      key={color.name}
                      className={`pick-box ${selecionadoColor === color.name ? 'border-selected' : 'border-gray-double'}`}
                      style={{ backgroundColor: color.hexCode }}
                      onClick={() => setSelecionadoColor(color.name)}
                    />
                  </div>
                ))}
              </div>

              <p className="phone-selected-color">{selecionadoColor}</p>
              

              {/* Fila 8: Botón de añadir al carrito */}
              <button
                onClick={addCarrito}
                disabled={!selecionadoColor || !selecAlmacenamiento}
                className={`mt-m ${selecionadoColor && selecAlmacenamiento ? 'btn-main-black' : 'btn-disabled'}`}
              >
                AÑADIR
              </button>

    

            </div>
            {/* div fin */}
          </div>
          </div>

          {/* Especificaciones del teléfono */}
          <div className="mt-b">
            <p className="text-upper mb-8 ">Especificaciones</p>
            <table className="w-full mt-2 font-size-s">
              <tbody>
                <tr className="specs-row"><td className="specs-cell specs-label">Pantalla</td><td className="specs-cell specs-value">{product.specs.screen}</td></tr>
                <tr className="specs-row"><td className="specs-cell specs-label">Resolución</td><td className="specs-cell specs-value">{product.specs.resolution}</td></tr>
                <tr className="specs-row"><td className="specs-cell specs-label">Procesador</td><td className="specs-cell specs-value">{product.specs.processor}</td></tr>
                <tr className="specs-row"><td className="specs-cell specs-label">Cámara Principal</td><td className="specs-cell specs-value">{product.specs.mainCamera}</td></tr>
                <tr className="specs-row"><td className="specs-cell specs-label">Cámara Selfie</td><td className="specs-cell specs-value">{product.specs.selfieCamera}</td></tr>
                <tr className="specs-row"><td className="specs-cell specs-label">Batería</td><td className="specs-cell specs-value">{product.specs.battery}</td></tr>
                <tr className="specs-row"><td className="specs-cell specs-label">Sistema Operativo</td><td className="specs-cell specs-value">{product.specs.os}</td></tr>
                <tr className="specs-row"><td className="specs-cell specs-label">Tasa de Refresco</td><td className="specs-cell specs-value">{product.specs.screenRefreshRate}</td></tr>
              </tbody>
            </table>
          </div>

          {/* Productos similares */}
          <DragScroll className="mt-b scroll-container">
            <p className="text-upper mb-8">Productos Similares</p>
            <div className="product-grid product-grid-scroll">
              {product.similarProducts.map((similar: any) => (
                <div key={similar.id} className="product-card product-card-scroll">
                  <img src={similar.imageUrl} alt={similar.name} className="product-image product-image-scroll" />
                  <div className="product-info">
                    <p className="product-brand">{similar.brand}</p>
                    <div className="product-details">
                      <span className="product-name">{similar.name}</span>
                      <span className="product-price">{similar.basePrice} EUR</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DragScroll>
        </div>
      </div>
    </div>
  );
}


