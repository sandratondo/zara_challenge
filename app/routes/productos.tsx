import { getProductById } from '../api';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useCarritoContext } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import Navegador from '../components/navegador';
import DragScroll from '../components/DragScroll';

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

  return (
    <div className='my-b'>
      <Navegador />
      <div className="p-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-600">{product.brand}</p>

        {/* Imagen dinámica */}
        <img src={selectedImage} alt={product.name} className="w-96 mx-auto my-4" />

        {/* Selectores de color y almacenamiento */}
        <div className="flex gap-4">
          {/* Selección de color */}
          <div>
            <label className="block font-semibold">Color:</label>
            <div className="flex gap-2">
              {product.colorOptions.map((color: any) => (
                <button
                  key={color.name}
                  className={`w-8 h-8 rounded-full border-2 ${selecionadoColor === color.name ? 'border-black' : 'border-gray-300'}`}
                  style={{ backgroundColor: color.hexCode }}
                  onClick={() => setSelecionadoColor(color.name)}
                />
              ))}
            </div>
          </div>

          {/* Selección de almacenamiento */}
          <div>
            <label className="block font-semibold">Almacenamiento:</label>
            <div className="flex gap-2">
              {product.storageOptions.map((option: any) => (
                <button
                  key={option.capacity}
                  className={`border-2 p-2 ${selecAlmacenamiento === option.capacity ? 'border-black' : 'border-gray-300'}`}
                  onClick={() => cambiarAlmacenamiento(option.capacity, option.price)}
                >
                  {option.capacity} - ${option.price}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Precio final */}
        <p className="text-xl font-bold my-4">Precio: ${precioFinal}</p>

        {/* Botón de añadir al carrito */}
        <button
          onClick={addCarrito}
          disabled={!selecionadoColor || !selecAlmacenamiento}
          className={`px-4 py-2 text-white rounded ${selecionadoColor && selecAlmacenamiento ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Añadir al carrito
        </button>

        {/* Especificaciones del teléfono */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Especificaciones</h2>
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
        <DragScroll className="mt-6 scroll-container">
          <h2 className="text-xl font-semibold">Productos Similares</h2>
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
  );
}


