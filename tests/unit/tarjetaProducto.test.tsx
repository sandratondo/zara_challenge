import React from 'react';
import { render, screen } from '@testing-library/react'; 
import { MemoryRouter } from 'react-router-dom';
import TarjetaProducto from '../../app/components/tarjetaProducto'; 
import { Product } from '../../types'; 

describe('Componente TarjetaProducto ', () => {
  const productoEjemplo: Product = {
    id: '123',
    name: 'Iphone de Prueba',
    brand: 'Marca de Prueba',
    basePrice: 1129.99,
    imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.png', 
  };

  test('Debería mostrar los datos del producto correctamente', () => {
    render(
      <MemoryRouter>
        <TarjetaProducto producto={productoEjemplo} />
      </MemoryRouter>
    );

    // Verifica que el nombre del producto aparece
    expect(screen.getByText(productoEjemplo.name)).toBeInTheDocument();

    // Verifica que la marca del producto aparece
    expect(screen.getByText(productoEjemplo.brand)).toBeInTheDocument();

    // Verifica que el precio del producto aparece
    expect(screen.getByText(`${productoEjemplo.basePrice} EUR`)).toBeInTheDocument();

    // Verifica que la imagen se muestra correctamente
    const imagen = screen.getByRole('img', { name: productoEjemplo.name }); 
    expect(imagen).toHaveAttribute('src', productoEjemplo.imageUrl);
    expect(imagen).toHaveAttribute('alt', productoEjemplo.name);

    // Verifica que el enlace apunta a la URL correcta
    const enlace = screen.getByRole('link', { name: `Ver detalles de ${productoEjemplo.name}` });
    expect(enlace).toHaveAttribute('href', `/productos/${productoEjemplo.id}`);
  });

  test('No debe renderizar el producto cuando no tiene datos', () => {
    const productoVacio: Product = {
      id: '',
      name: '',
      brand: '',
      basePrice: 0,
      imageUrl: '',
    };

    render(
      <MemoryRouter>
        <TarjetaProducto producto={productoVacio} />
      </MemoryRouter>
    );

    // Verifica que no se renderiza la imagen
    const imagen = screen.queryByRole('img');
    expect(imagen).not.toBeInTheDocument();

    // Verifica que el precio no aparece
    const precio = screen.queryByText('EUR');
    expect(precio).not.toBeInTheDocument();
  });
});