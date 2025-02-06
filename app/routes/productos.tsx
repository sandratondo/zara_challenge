import React from 'react';
import { getProductById } from '../api';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useCarritoContext } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import Navegador from '../components/navegador';
import DragScroll from '../components/DragScroll';
import { FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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

  const [selecionadoColor, setSelecionadoColor] = useState(
    product.colorOptions[0]?.name || ''
  );
  const [selecAlmacenamiento, setSelecAlmacenamiento] = useState('');
  const [precioFinal, setPrecioFinal] = useState(product.basePrice);

  const uniqueSimilarProducts = Array.from(
    new Map(product.similarProducts.map((p: any) => [p.id, p])).values()
  );

  // Cuando cambia el producto se actualiza el estado
  useEffect(() => {
    setSelecionadoColor(product.colorOptions[0]?.name || '');
    setSelecAlmacenamiento('');
    setPrecioFinal(product.basePrice);
  }, [product]);

  // Manejar selección de almacenamiento y actualizar precio
  const cambiarAlmacenamiento = (capacity: string, price: number) => {
    setSelecAlmacenamiento(capacity);
    setPrecioFinal(price);
  };

  // Obtener la imagen correspondiente al color seleccionado
  const selectedImage =
    product.colorOptions.find((color: any) => color.name === selecionadoColor)
      ?.imageUrl || product.imageUrl;

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
        quantity: 1,
      });

      // Redirige a la página del carrito
      redirigir('/carrito');
    }
  };

  const redirigirPrincipal = () => {
    redirigir('/');
  };

  return (
    <div className="my-b">
      <Navegador />

      {/* Botón de volver */}
      <div className="volver-container">
        <button
          className="volver-btn"
          onClick={redirigirPrincipal}
          aria-label="Volver"
          role="button"
        >
          <FaChevronLeft size={10} className="icono" />
          VOLVER
        </button>
      </div>

      <div className="page-content">
        <div className="container max-w-tbl p-4">
          <div className="vh-fit">
            <div className="phone-container">
              {/* Img Teléfono*/}
              <div className="phone-image-container">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="phone-image"
                />
              </div>

              {/* Información teléfono*/}
              <div className="phone-info">
                <div className="phone-model">{product.name}</div>
                <div className="phone-price text-capital">
                  {selecAlmacenamiento
                    ? `${precioFinal} EUR`
                    : `Desde ${product.basePrice} EUR`}
                </div>

                {/*¿CUÁNTO ESPACIO NECESITAS? */}
                <div className="phone-row">
                  <label className="phone-storage-label">
                    STORAGE ¿CUÁNTO ESPACIO NECESITAS?
                  </label>
                </div>

                {/* Botones de almacenamiento*/}
                <div className="phone-storage-options">
                  {product.storageOptions.map((option: any) => (
                    <button
                      key={option.capacity}
                      className={`btn-white ${selecAlmacenamiento === option.capacity ? 'border-selected' : 'border-gray'}`}
                      onClick={() =>
                        cambiarAlmacenamiento(option.capacity, option.price)
                      }
                      aria-label={`Seleccionar almacenamiento ${option.capacity}`}
                    >
                      {option.capacity}
                    </button>
                  ))}
                </div>

                {/* Escoge tu color favorito */}
                <div className="phone-row">
                  <label className="phone-color-label">
                    ELIGE TU COLOR FAVORITO
                  </label>
                </div>

                {/* Escoge tu color favorito */}
                <div className="phone-color-options">
                  {product.colorOptions.map((color: any) => (
                    <div key={color.name}>
                      <button
                        className={`pick-box ${selecionadoColor === color.name ? 'border-selected' : 'border-gray-double'}`}
                        style={{ backgroundColor: color.hexCode }}
                        aria-label={`Color: ${color.name}`}
                        aria-selected={
                          selecionadoColor === color.name ? 'true' : 'false'
                        }
                        role="radio"
                        onClick={() => setSelecionadoColor(color.name)}
                      />
                    </div>
                  ))}
                </div>
                <p className="phone-selected-color">{selecionadoColor}</p>

                {/* Botón de añadir al carrito */}
                <button
                  onClick={addCarrito}
                  disabled={!selecionadoColor || !selecAlmacenamiento}
                  className={`mt-m ${selecionadoColor && selecAlmacenamiento ? 'btn-main-black' : 'btn-disabled'}`}
                >
                  AÑADIR
                </button>
              </div>
            </div>
          </div>

          {/* Especificaciones del teléfono */}
          <div className="mt-b">
            <p className="text-upper mb-8 color-dark">Especificaciones</p>
            <table className="w-full mt-2 font-size-s">
              <tbody>
                <tr className="specs-row">
                  <td className="specs-cell specs-label">Pantalla</td>
                  <td className="specs-cell specs-value">
                    {product.specs ? product.specs.screen : 'Not available'}
                  </td>
                </tr>
                <tr className="specs-row">
                  <td className="specs-cell specs-label">Resolución</td>
                  <td className="specs-cell specs-value">
                    {product.specs.resolution}
                  </td>
                </tr>
                <tr className="specs-row">
                  <td className="specs-cell specs-label">Procesador</td>
                  <td className="specs-cell specs-value">
                    {product.specs.processor}
                  </td>
                </tr>
                <tr className="specs-row">
                  <td className="specs-cell specs-label">Cámara Principal</td>
                  <td className="specs-cell specs-value">
                    {product.specs.mainCamera}
                  </td>
                </tr>
                <tr className="specs-row">
                  <td className="specs-cell specs-label">Cámara Selfie</td>
                  <td className="specs-cell specs-value">
                    {product.specs.selfieCamera}
                  </td>
                </tr>
                <tr className="specs-row">
                  <td className="specs-cell specs-label">Batería</td>
                  <td className="specs-cell specs-value">
                    {product.specs.battery}
                  </td>
                </tr>
                <tr className="specs-row">
                  <td className="specs-cell specs-label">Sistema Operativo</td>
                  <td className="specs-cell specs-value">{product.specs.os}</td>
                </tr>
                <tr className="specs-row">
                  <td className="specs-cell specs-label">Tasa de Refresco</td>
                  <td className="specs-cell specs-value">
                    {product.specs.screenRefreshRate}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Productos similares */}
          <div className="mt-b mb-8">
            <p className="text-upper mb-8 color-dark">Productos Similares</p>
            <DragScroll className="scroll-container">
              <div
                className="product-grid product-grid-scroll"
                onDragStart={(e) => e.preventDefault()}
              >
                {uniqueSimilarProducts.map((similar: any) => (
                  <Link to={`/productos/${similar.id}`} key={similar.id}>
                    <div
                      className="product-card product-card-scroll"
                      onDragStart={(e) => e.preventDefault()}
                    >
                      <img
                        src={similar.imageUrl}
                        alt={similar.name}
                        className="product-image product-image-scroll"
                        onDragStart={(e) => e.preventDefault()}
                      />
                      <div
                        className="product-info"
                        onDragStart={(e) => e.preventDefault()}
                      >
                        <p
                          className="product-brand"
                          onDragStart={(e) => e.preventDefault()}
                        >
                          {similar.brand}
                        </p>
                        <div
                          className="product-details"
                          onDragStart={(e) => e.preventDefault()}
                        >
                          <span
                            className="product-name"
                            onDragStart={(e) => e.preventDefault()}
                          >
                            {similar.name}
                          </span>
                          <span
                            className="product-price"
                            onDragStart={(e) => e.preventDefault()}
                          >
                            {similar.basePrice} EUR
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </DragScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
