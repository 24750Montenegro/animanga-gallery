export const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/items', label: 'Galeria' },
  { to: '/favorites', label: 'Favoritos' },
];

export const homeContent = {
  title: 'Galeria azul para explorar anime y manga',
  text: 'Busca titulos desde Jikan, filtra por categoria y calificacion, y guarda tus favoritos en modo oscuro.',
  features: [
    {
      title: 'API real',
      text: 'Los listados y detalles vienen de Jikan API v4, sin datos de muestra dentro de los componentes.',
    },
    {
      title: 'Filtros utiles',
      text: 'Combina busqueda, tipo de contenido, categoria y calificacion minima desde la galeria.',
    },
    {
      title: 'Favoritos locales',
      text: 'Marca anime o manga y conserva la lista en el navegador con Context API.',
    },
  ],
};
