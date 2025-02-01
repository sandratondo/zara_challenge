import { useProductos } from '../context/ProductoContext';
import TarjetaProducto from '../components/tarjetaProducto';
import Navegador from '../components/navegador'; // Importa el navegador

export default function Home() {
  const { productos, loading, error, searchTerm, setSearchTerm } = useProductos();

  return (
    <div>
      <Navegador /> {/* Incluye el navegador en la página */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p>Resultados: {productos.length}</p> {/* Muestra el número de resultados */}
      {loading && <p>Cargando productos...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productos.slice(0, 20).map((producto) => ( // Muestra solo los primeros 20
            <TarjetaProducto key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
}