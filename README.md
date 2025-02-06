# Zara Challenge - React Application

Este proyecto es una aplicación web creada como parte de la prueba técnica **Zara Challenge**. Su objetivo es permitir a los usuarios visualizar, buscar y gestionar un catálogo de teléfonos móviles, así como realizar compras a través de un carrito de compras.

La aplicación está construida con **React** (TypeScript), utiliza **Vite** como bundler, **React Router** para la gestión de rutas, y **Context API** para el manejo del estado global.

## Funcionalidades

La aplicación incluye tres vistas principales:

1. **Vista Listado de Teléfonos**:
   - Cuadrícula de tarjetas con los primeros 20 teléfonos provenientes de la API.
   - Cada tarjeta incluye imagen, nombre, marca y precio base.
   - Buscador en tiempo real que filtra los teléfonos por nombre o marca.
   - Barra de navegación con enlaces a la vista principal y el carrito de compras.
   - Carrito persistente usando localStorage.

2. **Vista Detalle de Teléfono**:
   - Muestra detalles del teléfono seleccionado: nombre, marca, imagen, especificaciones técnicas.
   - Permite seleccionar el color y almacenamiento del teléfono, con actualización en tiempo real del precio.
   - Botón "Añadir al carrito", que se activa solo cuando se selecciona color y almacenamiento.

3. **Vista de Carrito**:
   - Muestra los productos añadidos al carrito con detalles como imagen, nombre, especificaciones seleccionadas y precio individual.
   - Botón para eliminar productos del carrito.
   - Precio total de la compra y botón para "Continuar comprando".

## Tecnologías y Herramientas

- **Frontend**: React >= 17, TypeScript, CSS(nativo)
- **Backend**: Node.js >= 18 (simulado con API REST externa)
- **Gestión de Estado**: React Context API
- **Autenticación**: API Key (x-api-key)
- **Testing**: Jest, React Testing Library para pruebas unitarias e integración
- **Bundler**: Vite

## Requisitos

- **Implementación de pruebas**: Se han implementado pruebas unitarias e integraciones.
- **Responsividad**: La aplicación es responsive y ajustada a los diseños de Figma.
- **Accesibilidad**: Se han seguido buenas prácticas para asegurar accesibilidad.
- **Linters y Formatters**: Se utiliza ESLint y Prettier para mantener el código limpio y consistente.
- **Modo de desarrollo y producción**:
  - En **desarrollo** los assets no están minimizados.
  - En **producción** los assets están optimizados y minimizados.

### Installation

Instalar dependencias:

```bash
npm install
```

### Modo Desarrollo

Inicie el servidor de desarrollo con HMR:

```bash
npm run dev
```

Su solicitud estará disponible en `http://localhost:5173`.

## Modo Producción

Crear una compilación de producción:

```bash
npm run build
```

## Modo Testing

Crear una compilación de test:

```bash
npm test
```

## Explicación del desarrollo Zara challange

### ¿Por qué el uso de TypeScript?
La aplicación está desarrollada con TypeScript para aprovechar su tipado estático, lo cual mejora la experiencia de desarrollo, previene errores comunes y facilita la escalabilidad del código.

### ¿Por qué el uso de Vite?
He elegido Vite como bundler porque es rápido, eficiente y tiene soporte nativo para la mayoría de las tecnologías modernas como React, TypeScript.

### ¿Por qué React Router?
Se ha utilizado React Router para gestionar las rutas de la aplicación, lo que permite la navegación entre las vistas de forma sencilla y eficiente.

### Uso de Context API
La aplicación utiliza React Context API para manejar el estado global de los productos y el carrito de compras. Esto permite compartir datos entre diferentes componentes sin necesidad de pasar las props manualmente a través de cada nivel de la jerarquía de componentes, lo que facilita el manejo del estado global y mejora la escalabilidad de la aplicación.

### Uso de props en Componentes
Props se utilizan para pasar datos de un componente a otro. En este proyecto, los componentes como tarjetaProducto.tsx, listaProductos.tsx, DragScroll.tsx reciben información de productos como **props** para hacerlos más reutilizables y modulares. Esto permite mantener el código limpio y eficiente, sin necesidad de compartir estado global entre estos componentes.

### Uso de hooks
React Hooks como useState, useEffect, y useContext se utilizan para manejar el estado local y global, efectos secundarios y acceso a los contextos de los productos y el carrito.

### Estilos
Se ha utilizado CSS nativo para los estilos, siguiendo los diseños responsivos definidos en Figma. Esta elección simplifica el desarrollo y asegura una integración directa con los prototipos visuales sin agregar complejidad innecesaria.

### Testing
Las pruebas unitarias e integradas están implementadas para asegurar que la aplicación funcione correctamente y de acuerdo con los requisitos.

### API REST
La aplicación consume datos de una API REST utilizando Axios para realizar las solicitudes. Axios facilita la gestión de solicitudes HTTP, ya que maneja automáticamente las promesas y puede configurar fácilmente los encabezados de autenticación en este caso, la API requiere un x-api-key.

## Implementación 

### Docker se instaló por defecto
Docker ya estaba configurado automáticamente cuando lo instale la apliación, no lo he configuarado. Debería funcionar correctamente. Si encuentras algún problema, podrías verificar que el archivo `Dockerfile` esté correctamente configurado, pero en general, debería funcionar sin necesidad de más configuraciones.

Este proyecto incluye tres Dockerfiles optimizados para diferentes gestores de paquetes:

- `Dockerfile` - for npm
- `Dockerfile.pnpm` - for pnpm
- `Dockerfile.bun` - for bun

Para compilar y ejecutar usando Docker:

```bash
# Para npm
docker build -t my-app .

# Para pnpm
docker build -f Dockerfile.pnpm -t my-app .

# Para bun
docker build -f Dockerfile.bun -t my-app .

# Para container
docker run -p 3000:3000 my-app

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](./LICENSE) para más detalles.


---

Gracias por revisar este proyecto. Si tienes preguntas, ¡no dudes en abrir un issue o enviar un pull request!

