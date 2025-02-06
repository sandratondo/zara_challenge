import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListaProductos from '../../app/components/listaProductos';
import { Product } from '../../types';

describe('ListaProductos', () => {
  const productosEjemplo: Product[] = [
    {
      id: '1',
      name: 'iPhone 13',
      brand: 'Apple',
      basePrice: 999.99,
      imageUrl: 'https://ejemplo.com/iphone13.jpg',
    },
    {
      id: '2',
      name: 'Samsung Galaxy S21',
      brand: 'Samsung',
      basePrice: 799.99,
      imageUrl: 'https://ejemplo.com/galaxys21.jpg',
    },
  ];

  test('Mostar la lista de productos correctamente', () => {
    render(
      <MemoryRouter>
        <ListaProductos productos={productosEjemplo} />
      </MemoryRouter>
    );

    // Verifica que la lista está presente
    const lista = screen.getByRole('list', { name: 'Lista de productos' });
    expect(lista).toBeInTheDocument();

    // Verifica que los productos aparecen en la lista
    productosEjemplo.forEach((producto) => {
      expect(screen.getByText(producto.name)).toBeInTheDocument();
      expect(screen.getByText(producto.brand)).toBeInTheDocument();
      expect(screen.getByText(`${producto.basePrice} EUR`)).toBeInTheDocument();
    });

    // Verifica que la cantidad de productos es correcta
    const tarjetas = screen.getAllByRole('article'); 
    expect(tarjetas).toHaveLength(productosEjemplo.length);
  });

  test('Debe renderizar sin productos y no mostrar tarjetas', () => {
    render(
      <MemoryRouter>
        <ListaProductos productos={[]} />
      </MemoryRouter>
    );

    // Verifica que la lista está presente
    const lista = screen.getByRole('list', { name: 'Lista de productos' });
    expect(lista).toBeInTheDocument();

    // Verifica que no hay tarjetas de producto
    const tarjetas = screen.queryAllByRole('article');
    expect(tarjetas).toHaveLength(0);
  });
});
