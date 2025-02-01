import { useLoaderData } from 'react-router-dom';
import { getProductById } from '../api';

export async function loader({ params }: any) {
  const product = await getProductById(params.id);
  return product;
}

export default function Productos() {
  const product = useLoaderData();

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      {/* Muestra los detalles del producto */}
    </div>
  );
}