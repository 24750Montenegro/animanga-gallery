export const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/items', label: 'Galeria' },
  { to: '/favorites', label: 'Favoritos' },
];

export const homeContent = {
  title: 'AniMangaGT',
  text: 'Explora anime y manga desde Jikan, filtra por categoria y calificacion, y guarda tus favoritos en una interfaz oscura y directa.',
  apiCredit: {
    eyebrow: 'Datos por Jikan API',
    title: 'Informacion actualizada desde MyAnimeList',
    text: 'La galeria consume Jikan API v4 para mostrar listados, generos, imagenes y detalles sin mantener datos hardcodeados dentro de los componentes.',
  },
  highlights: [
    {
      value: 'Anime y manga',
      label: 'Busqueda por tipo de contenido',
    },
    {
      value: 'Generos',
      label: 'Categorias reales desde Jikan',
    },
    {
      value: 'Favoritos',
      label: 'Guardados en el navegador',
    },
  ],
};
