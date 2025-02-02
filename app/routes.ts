import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),  // Página de inicio
    route('productos/:id', 'routes/productos.tsx'),  // Detalles del producto
    route('carrito', 'routes/carrito.tsx'),  // Página del carrito
] satisfies RouteConfig;
