# PERIÓDICO CULTURA
### *"DECANO DE LA PRENSA CORRENTINA"* — Curuzú Cuatiá, Corrientes, Argentina

Sitio web oficial, moderno, profesional y responsive para el periódico digital **"CULTURA"** de Curuzú Cuatiá, con portal público en una sola página (*Single-Page*) y panel independiente de **Autogestión** editorial.

---

## 📸 Identidad Visual y Activos Oficiales
- **Logotipo Oficial**: Ubicado en `assets/images/logo-cultura.png`, respetando fielmente su diseño, tipografía y composición original.
- **Noticia de Portada**: Incorpora la fotografía oficial de la **Comisario Inspector Nieves Teresa Canteros** (`assets/images/noticia-priar.jpg`) en su histórica designación al frente del PRIAR Curuzú Cuatiá.
- **Paleta Cromática**:
  - **Rojo Protagonista**: `#D71920`
  - **Negro Editorial**: `#111111`
  - **Blanco**: `#FFFFFF`
  - **Acentos y Fondos**: `#F8F9FA` / `#1F2328`

---

## 🌐 Estructura de la Web Pública (`index.html`)

La web pública se despliega en una sola página continua mediante bloques modulares:
1. **Header Editorial**:
   - Barra superior con fecha y hora actual en tiempo real de Curuzú Cuatiá.
   - Redes sociales oficiales:
     - Instagram: **@PERIODICO_CULTURA**
     - Facebook: **@PERIODICO_CULTURA**
     - Acceso directo a la sala de redacción (**Autogestión**).
   - Logotipo oficial de gran formato con el lema *"DECANO DE LA PRENSA CORRENTINA"*.
   - Barra de navegación rápida y cinta animada de *Último Momento*.
2. **Noticia Principal Destacada (Hero)**:
   - Titular: *“HISTÓRICO: EL PRIAR DE NUESTRA CIUDAD TIENE UNA NUEVA JEFA, NIEVES TERESA CANTEROS”*.
   - Categoría: **PRIAR**.
   - Fecha: *Jue. 10 de Septiembre*.
   - Resumen editorial y botón *"Leer noticia completa"*, que despliega un lector modal accesible (`<dialog>`) con contenido completo, etiquetas y botones para compartir en **WhatsApp**, **Facebook**, **X (Twitter)** y **copiar enlace**.
3. **Grilla de Noticias y Filtro Dinámico**:
   - Filtrado instantáneo por categorías (*Todas, PRIAR, Curuzú Cuatiá, Cultura, Deportes*) sin recargar la página.
   - Formato modular listo para incorporar cientos de noticias.
4. **Espacios Publicitarios Modulares**:
   - `banner-top`: Encabezado superior.
   - `sidebar-ad`: Columna lateral en computadoras.
   - `in-feed-ad`: Entre bloques de noticias.
   - `carousel-ad`: Zócalo del carrusel.
   - `banner-bottom`: Franja previa al footer.
   - Cada espacio muestra anuncios reales o un placeholder elegante para captación de pauta comercial.
5. **Carrusel Interactivo de Noticias**:
   - Compatible con mouse, flechas, indicadores y **gestos táctiles (swipe en celulares)**.
   - Rotación automática pausible al interactuar.
6. **Ubicación Geográfica**:
   - *“CURUZÚ CUATIÁ, CORRIENTES”* con coordenadas, datos de fundación e integración de mapa interactivo.
7. **Servicio Meteorológico (Clima)**:
   - Temperatura actual, condición, sensación térmica, máxima, mínima, humedad y viento.
   - Integrado con conector en vivo a la API gratuita de **Open-Meteo** para Curuzú Cuatiá y datos de demostración si no hay conexión.
8. **Footer Institucional**:
   - Identidad corporativa, canales de contacto (Email, Teléfono, Dirección) y enlaces institucionales.

---

## 🛠️ Panel de Autogestión (`admin.html`)

El panel de redacción permite administrar todo el periódico sin conocimientos técnicos:
- **Dashboard**: Estadísticas en tiempo real de noticias, noticia principal activa, anuncios y publicaciones de carrusel.
- **Noticias**:
  - Crear nuevas noticias con fotos subidas directamente desde la computadora (convertidas automáticamente) o URLs.
  - Editar textos, resúmenes, autores, fechas y etiquetas.
  - Asignar con un solo clic qué noticia es la **Principal de Portada**.
  - Ocultar o activar noticias.
- **Publicidad**:
  - Dar de alta anuncios, asignar en qué posición/slot aparecen, subir creatividades, configurar enlaces externos y fechas de vigencia.
- **Carrusel**:
  - Agregar diapositivas, reordenarlas (subir/bajar orden) y vincularlas a noticias.
- **Vista Previa**:
  - Ver la página web completa dentro del panel antes de publicarla a los lectores.
- **Configuración**:
  - Actualizar teléfonos, emails, redes y opción de restablecer datos a los originales de fábrica.

---

## 🚀 Cómo Ejecutar el Proyecto en su Computadora

1. **Abrir directamente**:
   - Haga doble clic sobre `index.html` para abrir el periódico.
   - Haga doble clic sobre `admin.html` para ingresar a la autogestión.
2. **Acceso de un clic**:
   - Ejecute el archivo `iniciar-servidor.bat`.
