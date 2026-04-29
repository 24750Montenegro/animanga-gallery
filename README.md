# Animanga Gallery

Web en React para explorar anime y manga usando la API publica de Jikan v4. Incluye galeria con filtros por categoria y calificacion, detalle por ID y favoritos locales con modo oscuro.

## Nivel objetivo

### Senior

## Tecnologias

- Vite + React
- react-router-dom v6
- Context API
- CSS modular por archivo
- Jikan API v4: https://docs.api.jikan.moe/

## Rutas

- `/`: inicio con destacados desde Jikan.
- `/items`: galeria con filtros de anime y manga.
- `/items/:id`: detalle usando `useParams`; el tipo viaja en `?type=anime` o `?type=manga`.
- `/favorites`: favoritos guardados en el navegador.
- `*`: pagina 404.

## Instalacion

```bash
npm install
npm run dev
```

El servidor de desarrollo se abre normalmente en `http://localhost:5173`.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Uso de Jikan

Jikan limita el uso publico a 3 solicitudes por segundo y 60 por minuto. El cliente en `src/api/jikan.js` usa una cola corta, cache en memoria y reintentos para reducir errores `429 Too Many Requests` durante la navegacion y en modo desarrollo.

## Estructura

- `src/api`: servicios de Jikan para anime, manga y generos.
- `src/data`: textos, opciones de filtros y normalizadores.
- `src/components`: componentes reutilizables.
- `src/pages`: paginas conectadas a React Router.
- `src/styles`: estilos CSS sin Tailwind ni Bootstrap.

## Componentes reutilizables

`Card`

- `id`: ID de MyAnimeList/Jikan.
- `type`: `anime` o `manga`.
- `title`: titulo visible.
- `image`: portada.
- `score`: calificacion.
- `year`: anio de salida.
- `showType`: muestra el distintivo del tipo.

`Gallery`

- `items`: lista normalizada de tarjetas.
- `showType`: activa el distintivo por tipo.
- `emptyText`: mensaje cuando no hay resultados.

`Filters`

- `values`: estado actual de filtros.
- `genres`: categorias recibidas desde Jikan.
- `onChange`: actualiza un campo.
- `onSubmit`: aplica los filtros.
- `onReset`: limpia los filtros.
