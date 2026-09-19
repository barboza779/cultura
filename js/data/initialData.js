/**
 * PERIÓDICO CULTURA - DATOS INICIALES Y ESTRUCTURA DE CONTENIDO
 * "DECANO DE LA PRENSA CORRENTINA" - Curuzú Cuatiá, Corrientes
 */

export const INITIAL_NEWS = [
  {
    id: "news-priar-001",
    title: "HISTÓRICO: EL PRIAR DE NUESTRA CIUDAD TIENE UNA NUEVA JEFA, NIEVES TERESA CANTEROS",
    slug: "historico-priar-curuzu-cuatia-nueva-jefa-nieves-teresa-canteros",
    category: "PRIAR",
    date: "Jue. 10 de Septiembre",
    time: "10:45 hs",
    author: "Redacción Periódico Cultura",
    mainImage: "assets/images/noticia-priar.jpg",
    additionalImages: [],
    summary: "En una jornada de enorme trascendencia institucional y comunitaria para Curuzú Cuatiá, la Comisario Inspector Nieves Teresa Canteros asumió formalmente la jefatura de la Policía Rural y de Islas y Ambiental Rural (PRIAR) de nuestra ciudad, marcando un hito sin precedentes en la fuerza.",
    fullContent: `
<p>En una jornada que quedará grabada en las páginas institucionales de nuestra comunidad y de las fuerzas de seguridad de la provincia de Corrientes, la <strong>Comisario Inspector Nieves Teresa Canteros</strong> fue puesta en funciones formalmente como nueva Jefa de la División Policía Rural y de Islas y Ambiental Rural (PRIAR) de Curuzú Cuatiá.</p>

<p>La designación representa un acontecimiento histórico tanto para la fuerza policial como para la ciudad, siendo la primera mujer en asumir el mando operativo de esta estratégica dependencia rural, encargada de la custodia de los extensos departamentos ganaderos del sur correntino y la lucha contra el delito rural y el abigeato.</p>

<p>La ceremonia contó con la presencia de autoridades de la Unidad Regional III, representantes de la Sociedad Rural de Curuzú Cuatiá, jefes de distintas dependencias de seguridad y familiares de la flamante jefa, quien cuenta con una foja de servicio intachable y una vasta trayectoria en el ámbito operativo e investigativo.</p>

<p>En sus primeras palabras tras asumir la conducción, Canteros remarcó: <em>“Asumo este enorme desafío con el compromiso inquebrantable de trabajar codo a codo con los productores, las familias rurales y cada habitante de nuestra jurisdicción. La prevención, la cercanía con el vecino de campo y la respuesta inmediata serán los pilares de nuestra labor diaria”</em>.</p>

<p>Desde <strong>Periódico Cultura</strong> celebramos este trascendental paso que conjuga profesionalismo, vocación de servicio e igualdad de oportunidades en las instituciones de nuestra querida Curuzú Cuatiá.</p>
    `,
    tags: ["PRIAR", "Curuzú Cuatiá", "Seguridad", "Corrientes", "Institucionales"],
    isFeatured: true,
    isActive: true,
    views: 1420
  },
  {
    id: "news-curuzu-002",
    title: "Curuzú Cuatiá fortalece su infraestructura hídrica y de desagües pluviales en barrios periféricos",
    slug: "curuzu-cuatia-fortalece-infraestructura-hidrica-barrios",
    category: "Curuzú Cuatiá",
    date: "Mié. 9 de Septiembre",
    time: "15:20 hs",
    author: "Área de Infraestructura",
    mainImage: "https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1200&q=80",
    additionalImages: [],
    summary: "Se intensifican los trabajos de entubamiento y limpieza de canales principales para garantizar el normal escurrimiento de las aguas de lluvia antes del período primaveral.",
    fullContent: `
<p>Con cuadrillas municipales y maquinaria pesada, el municipio de Curuzú Cuatiá continúa desarrollando el plan integral de mejoramiento hídrico en diversos puntos neurálgicos de la planta urbana.</p>
<p>Las tareas comprenden la profundización de zanjones colectores y el recambio de alcantarillas en los accesos vecinales, beneficiando a cientos de familias y facilitando la transitabilidad.</p>
    `,
    tags: ["Obras", "Curuzú Cuatiá", "Servicios", "Sociedad"],
    isFeatured: false,
    isActive: true,
    views: 680
  },
  {
    id: "news-cultura-003",
    title: "Cultura y Tradición: Anuncian una nueva edición del Encuentro de Música y Poesía Correntina",
    slug: "cultura-tradicion-anuncian-nueva-edicion-encuentro-musica",
    category: "Cultura",
    date: "Mar. 8 de Septiembre",
    time: "19:00 hs",
    author: "Sección Espectáculos",
    mainImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    additionalImages: [],
    summary: "Artistas de toda la región se darán cita en la emblemática Casa del Bicentenario para celebrar nuestras raíces chamameceras y el acervo lírico provincial.",
    fullContent: `
<p>Curuzú Cuatiá volverá a vibrar al compás del fuelle y la guitarra en un evento que congregará a destacados exponentes del cancionero popular correntino y nuevas generaciones de músicos locales.</p>
<p>La entrada será libre y gratuita, con servicio de cantina tradicional a beneficio de instituciones comunitarias.</p>
    `,
    tags: ["Chamamé", "Cultura", "Música", "Curuzú Cuatiá"],
    isFeatured: false,
    isActive: true,
    views: 940
  },
  {
    id: "news-deportes-004",
    title: "Gran triunfo de los equipos locales en la apertura del Torneo Interprovincial de Básquet",
    slug: "gran-triunfo-equipos-locales-torneo-interprovincial-basquet",
    category: "Deportes",
    date: "Lun. 7 de Septiembre",
    time: "22:15 hs",
    author: "Corresponsalía Deportiva",
    mainImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    additionalImages: [],
    summary: "Con un marco imponente de público y clima de fiesta deportiva, los representantes curuzucuateños consiguieron valiosas victorias en el arranque de la competencia regional.",
    fullContent: `
<p>En una noche vibrante y ante tribunas colmadas, el conjunto de Curuzú Cuatiá demostró temple y juego colectivo para imponerse ante su par regional por un ajustado 78-74.</p>
<p>El próximo fin de semana se disputará la segunda fecha en condición de visitante.</p>
    `,
    tags: ["Deportes", "Básquet", "Torneo", "Curuzú Cuatiá"],
    isFeatured: false,
    isActive: true,
    views: 820
  }
];

export const INITIAL_ADS = [
  {
    id: "ad-top-01",
    slot: "banner-top",
    title: "Comercio & Empresa de Curuzú Cuatiá",
    description: "Espacio publicitario disponible en Periódico Cultura. Su marca ante miles de lectores en Curuzú Cuatiá y la provincia.",
    imageUrl: "", // Si está vacío o nulo muestra placeholder editorial elegante
    linkUrl: "https://instagram.com/periodico_cultura",
    startDate: "2026-09-01",
    endDate: "2026-12-31",
    isActive: true
  },
  {
    id: "ad-sidebar-01",
    slot: "sidebar-ad",
    title: "Sector Agropecuario & Comercial",
    description: "Impulse su negocio con anuncios en la web del Decano de la Prensa Correntina.",
    imageUrl: "",
    linkUrl: "mailto:redaccion@periodicocultura.com.ar",
    startDate: "2026-09-01",
    endDate: "2026-12-31",
    isActive: true
  },
  {
    id: "ad-feed-01",
    slot: "in-feed-ad",
    title: "Publicidad Destacada en Noticias",
    description: "Llegue de manera directa a los vecinos de la región.",
    imageUrl: "",
    linkUrl: "https://facebook.com/periodico_cultura",
    startDate: "2026-09-01",
    endDate: "2026-12-31",
    isActive: true
  },
  {
    id: "ad-bottom-01",
    slot: "banner-bottom",
    title: "Espacio Institucional",
    description: "Apoye el periodismo independiente de Curuzú Cuatiá.",
    imageUrl: "",
    linkUrl: "mailto:redaccion@periodicocultura.com.ar",
    startDate: "2026-09-01",
    endDate: "2026-12-31",
    isActive: true
  }
];

export const INITIAL_CAROUSEL = [
  {
    id: "slide-01",
    title: "Histórica asunción en el PRIAR: Nieves Teresa Canteros al frente de la fuerza",
    category: "PRIAR",
    date: "10 de Septiembre",
    imageUrl: "assets/images/noticia-priar.jpg",
    newsId: "news-priar-001",
    isActive: true,
    order: 1
  },
  {
    id: "slide-02",
    title: "Obras estratégicas de desagües pluviales en diferentes barrios de la ciudad",
    category: "Curuzú Cuatiá",
    date: "9 de Septiembre",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=800&q=80",
    newsId: "news-curuzu-002",
    isActive: true,
    order: 2
  },
  {
    id: "slide-03",
    title: "Preparan el gran Encuentro de Música y Poesía de nuestras raíces chamameceras",
    category: "Cultura",
    date: "8 de Septiembre",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    newsId: "news-cultura-003",
    isActive: true,
    order: 3
  },
  {
    id: "slide-04",
    title: "Apasionante inicio de la temporada de básquet con victorias locales",
    category: "Deportes",
    date: "7 de Septiembre",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
    newsId: "news-deportes-004",
    isActive: true,
    order: 4
  }
];

export const INITIAL_SETTINGS = {
  newspaperName: "PERIÓDICO CULTURA",
  slogan: "DECANO DE LA PRENSA CORRENTINA",
  city: "Curuzú Cuatiá",
  province: "Corrientes",
  country: "Argentina",
  instagramHandle: "@PERIODICO_CULTURA",
  instagramUrl: "https://instagram.com/periodico_cultura",
  facebookHandle: "@PERIODICO_CULTURA",
  facebookUrl: "https://facebook.com/periodico_cultura",
  email: "redaccion@periodicocultura.com.ar",
  phone: "+54 3774 42-XXXX",
  address: "Curuzú Cuatiá, Corrientes, Argentina",
  coordinates: {
    lat: -29.7917,
    lng: -58.0547
  }
};
