import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TarjetaProducto from '../../app/components/tarjetaProducto';
import { Product } from '../../types';

describe('TarjetaProducto Component', () => {
  const mockProduct: Product = {
    id: '123',
    name: 'Camiseta',
    brand: 'Nike',
    basePrice: 29.99,
    imageUrl: 'https://example.com/camiseta.jpg',
  };

  test('debe renderizar correctamente con los datos del producto', () => {
    render(
      <MemoryRouter>
        <TarjetaProducto producto={mockProduct} />
      </MemoryRouter>
    );

    // Verificar que el nombre del producto está presente
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();

    // Verificar que la marca del producto está presente
    expect(screen.getByText(mockProduct.brand)).toBeInTheDocument();

    // Verificar que el precio del producto está presente
    expect(screen.getByText(`${mockProduct.basePrice} EUR`)).toBeInTheDocument();

    // Verificar que la imagen se muestra con el src y alt correctos
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', mockProduct.imageUrl);
    expect(imgElement).toHaveAttribute('alt', mockProduct.name);

    // Verificar que el enlace apunta a la URL correcta
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/productos/${mockProduct.id}`);
  });
});
