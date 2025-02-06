import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from '../../app/routes/home';
import { ProductoProvider } from '../../app/context/ProductoContext';
import { CarritoProvider } from '../../app/context/CarritoContext';
import { BrowserRouter } from 'react-router-dom';

// Simula las respuestas de la API
jest.mock('../../app/api', () => ({
  getProducts: jest.fn(),
}));

const { getProducts } = require('../../app/api');

// Función para envolver el componente
const renderConContexto = (componente: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <ProductoProvider>
        <CarritoProvider>{componente}</CarritoProvider>
      </ProductoProvider>
    </BrowserRouter>
  );
};

describe('Componente Home', () => {
  it('debe renderizar una lista de productos si es correcto', async () => {
    getProducts.mockResolvedValue([
      {
        id: '1',
        brand: 'Apple',
        name: 'iPhone 12',
        basePrice: 909,
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.png',
      },
    ]);

    renderConContexto(<Home />);

    // Espera a que se actualice el contador de resultados
    await waitFor(() => screen.getByText(/RESULTADOS/));

    // Verifica que el nombre del primer producto se muestre
    expect(screen.getByText('iPhone 12')).toBeInTheDocument();

    // Verifica que el precio base del producto se muestre
    expect(screen.getByText(/909/)).toBeInTheDocument();
  });

  it('mensaje de error cuando la API falla', async () => {
    // Simula un error de API
    getProducts.mockRejectedValue(new Error('Error en el servidor'));

    renderConContexto(<Home />);

    // Espera a que se muestre el mensaje de error
    await waitFor(() => screen.getByText('Error en el servidor'));

    // Verifica que el mensaje de error sea visible
    expect(screen.getByText('Error en el servidor')).toBeInTheDocument();
  });

  it('actualizar el término de búsqueda y mostrar los resultados', async () => {
    getProducts.mockResolvedValue([
      {
        id: '1',
        brand: 'Apple',
        name: 'iPhone 12',
        basePrice: 909,
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.png',
      },
    ]);

    renderConContexto(<Home />);

    // Simula un cambio en el campo de búsqueda
    const campoDeBusqueda = screen.getByPlaceholderText('Buscar productos');
    fireEvent.change(campoDeBusqueda, { target: { value: 'iPhone' } });

    // Espera a que se actualice el contador de resultados
    await waitFor(() => screen.getByText(/RESULTADOS/));

    // Verifica que el resultado filtrado se muestre
    expect(screen.getByText('iPhone 12')).toBeInTheDocument();
  });

  it('debe mostrar el estado de carga mientras se obtienen los productos', async () => {
    // Simula una respuesta de API con retraso
    getProducts.mockReturnValue(
      new Promise((resolve) => setTimeout(() => resolve([]), 1000))
    );

    renderConContexto(<Home />);

    // Verifica icono cargando se muestre
    expect(screen.getByRole('status')).toBeInTheDocument();

    // Espera a que se carguen los productos y verifica
    await waitFor(() => screen.getByText(/RESULTADOS/));
  });
});
