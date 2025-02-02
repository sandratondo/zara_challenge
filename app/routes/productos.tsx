import { getProductById } from '../api';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useCarritoContext } from '../context/CarritoContext';

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

  const [selectedColor, setSelectedColor] = useState(product.colorOptions[0]?.name || '');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [finalPrice, setFinalPrice] = useState(product.basePrice);

  // Manejar selección de almacenamiento y actualizar precio
  const handleStorageChange = (capacity: string, price: number) => {
    setSelectedStorage(capacity);
    setFinalPrice(price);
  };

  // Obtener la imagen correspondiente al color seleccionado
  const selectedImage = product.colorOptions.find((color: any) => color.name === selectedColor)?.imageUrl || product.imageUrl;

  // Agregar al carrito
  const handleAddToCart = () => {
    if (selectedColor && selectedStorage) {
      addToCarrito({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: finalPrice,
        color: selectedColor,
        storage: selectedStorage,
        imageUrl: selectedImage,
        quantity: 1
      });
    }
  };

  return (
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
                className={`w-8 h-8 rounded-full border-2 ${selectedColor === color.name ? 'border-black' : 'border-gray-300'}`}
                style={{ backgroundColor: color.hexCode }}
                onClick={() => setSelectedColor(color.name)}
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
                className={`border-2 p-2 ${selectedStorage === option.capacity ? 'border-black' : 'border-gray-300'}`}
                onClick={() => handleStorageChange(option.capacity, option.price)}
              >
                {option.capacity} - ${option.price}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Precio final */}
      <p className="text-xl font-bold my-4">Precio: ${finalPrice}</p>

      {/* Botón de añadir al carrito */}
      <button
        onClick={handleAddToCart}
        disabled={!selectedColor || !selectedStorage}
        className={`px-4 py-2 text-white rounded ${selectedColor && selectedStorage ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        Añadir al carrito
      </button>

      {/* Especificaciones del teléfono */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Especificaciones</h2>
        <table className="w-full border mt-2">
          <tbody>
            <tr><td className="border p-2">Pantalla:</td><td className="border p-2">{product.specs.screen}</td></tr>
            <tr><td className="border p-2">Resolución:</td><td className="border p-2">{product.specs.resolution}</td></tr>
            <tr><td className="border p-2">Procesador:</td><td className="border p-2">{product.specs.processor}</td></tr>
            <tr><td className="border p-2">Cámara Principal:</td><td className="border p-2">{product.specs.mainCamera}</td></tr>
            <tr><td className="border p-2">Cámara Selfie:</td><td className="border p-2">{product.specs.selfieCamera}</td></tr>
            <tr><td className="border p-2">Batería:</td><td className="border p-2">{product.specs.battery}</td></tr>
            <tr><td className="border p-2">Sistema Operativo:</td><td className="border p-2">{product.specs.os}</td></tr>
            <tr><td className="border p-2">Tasa de Refresco:</td><td className="border p-2">{product.specs.screenRefreshRate}</td></tr>
          </tbody>
        </table>
      </div>

      {/* Productos similares */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Productos Similares</h2>
        <div className="flex overflow-x-auto gap-4 p-2">
          {product.similarProducts.map((similar: any) => (
            <div key={similar.id} className="border p-2 max-w-[150px]">
              <img src={similar.imageUrl} alt={similar.name} className="w-24 h-24 object-cover mx-auto" />
              <p className="text-sm text-center">{similar.brand} {similar.name}</p>
              <p className="text-center font-bold">${similar.basePrice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
