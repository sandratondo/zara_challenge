import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('productos/:id', 'routes/productos.tsx'),

] satisfies RouteConfig;