import { useProductos } from '../context/ProductoContext';
import TarjetaProducto from '../components/tarjetaProducto';
import Navegador from '../components/navegador';
import { FaSpinner } from 'react-icons/fa';

export default function Home() {
  const { productos, loading, error, searchTerm, setSearchTerm } =
    useProductos();

  return (
    <div className="my-b">
      <Navegador />
      {/* buscador */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar productos"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {/* Muestra el número de resultados buscador */}
        <p className="result-text">{productos.length} RESULTADOS</p>{' '}
      </div>
      <div className="page-content">
        <div className="container">
          {loading && (
            <div className="center-xy">
              <FaSpinner className="spinner-icon " size={35} />
            </div>
          )}
          {error && <p className="error-message">{error}</p>}

          {/* Muestra productos si no hay errores */}
          {!loading && !error && (
            <div className="product-grid  my-b"> 
              {productos.map((producto, index) => (
                <TarjetaProducto key={index} producto={producto} /> 
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
