import { useLoaderData } from 'react-router-dom';
import { getProductById } from '../api';

export async function loader({ params }: any) {
  try {
    return await getProductById(params.id);
  } catch (error) {
    throw new Response('Producto no encontrado', { status: 404 });
  }
}

export default function Productos() {
  const product = useLoaderData();

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>Marca: {product.brand}</p>
      <p>Precio: {product.basePrice}</p>
      {/* Muestra los detalles del producto */}
    </div>
  );
}