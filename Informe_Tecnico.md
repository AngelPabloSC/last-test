# Informe Técnico del Proyecto: Nova Solutions

## 1. Visión General
El sitio web de **Nova Solutions** es una Aplicación Web Moderna diseñada para alto rendimiento, optimización SEO y una experiencia de usuario fluida. Está construida utilizando la arquitectura **Jamstack**, lo que garantiza tiempos de carga rápidos y mayor seguridad al servir contenido pre-renderizado.

## 2. Stack Tecnológico

### Frontend (Interfaz de Usuario)
- **Framework Principal**: [Astro](https://astro.build/) (v5.5.6)
    - Astro es un framework "all-in-one" que renderiza HTML en el servidor (SSR/SSG), enviando el mínimo JavaScript posible al navegador para una velocidad óptima.
- **Estilos y Diseño**:
    - [Tailwind CSS](https://tailwindcss.com/) (v4): Framework de utilidades para diseño rápido y responsivo.
    - **Astro Icon** & **Iconify**: Gestión eficiente de íconos SVG.
    - **Animate.css**: Biblioteca para animaciones CSS fluidas.
- **Interactividad**:
    - **Swiper**: Biblioteca moderna para carruseles y sliders táctiles.
    - **Lucide Astro**: Conjunto de íconos ligeros y consistentes.

### Backend y Servicios
- **Autenticación (Si aplica)**: Integración con **Lucia Auth** (`@lucia-auth/astro`) para manejo de sesiones seguro.
- **Generación de Mapa del Sitio**: `@astrojs/sitemap` para mejorar la indexación en buscadores (SEO).

## 3. Infraestructura y Despliegue (CI/CD)

El proyecto utiliza un flujo de Integración y Despliegue Continuo (CI/CD) automatizado a través de **GitLab CI**.

### Flujo de Trabajo (Pipeline)
1.  **Build (Construcción)**:
    - Cada vez que se actualiza el código, GitLab ejecuta un "runner" que:
        - Limpia dependencias antiguas.
        - Instala las nuevas dependencias (`npm install`).
        - Compila el sitio (`npm run build`), generando una versión estática optimizada en la carpeta `dist/`.
        - Empaqueta el resultado en un archivo comprimido (`build.tar.gz`).

2.  **Deploy (Despliegue)**:
    - El archivo empaquetado se transfiere de forma segura (SCP) a su servidor en la nube (Azure/Cloud VPS).
    - Se conecta vía SSH para descomprimir y publicar la nueva versión en vivo.
    - Este proceso elimina la necesidad de subir archivos manualmente vía FTP, reduciendo errores humanos.

## 4. Estado Actual del Código
- **Repositorio**: GitLab (Control de versiones).
- **Limpieza Reciente**: Se ha eliminado la configuración obsoleta de Netlify para alinear el proyecto completamente con la nueva infraestructura de despliegue en servidor propio (Azure).

---
*Generado automáticamente por Asistente de Desarrollo - 10 de Febrero de 2026*
