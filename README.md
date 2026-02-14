# Nova Solutions

**Nova Solutions** es un sitio web moderno y de alto rendimiento especializado en servicios de techado (Roofing, Siding, Gutters). Este proyecto está construido utilizando **Astro**, lo que garantiza una velocidad de carga excepcional y una excelente optimización para motores de búsqueda (SEO).

## 🚀 Stack Tecnológico

El proyecto utiliza las siguientes tecnologías y librerías clave:

-   **Core**: [Astro v5](https://astro.build/) - Framework web para sitios orientados a contenido.
-   **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) - Framework de utilidades CSS (integrado vía Vite).
-   **Interactividad**:
    -   **React**: Para componentes interactivos complejos (si aplica).
    -   **Swiper**: Para carruseles y galerías de imágenes táctiles.
    -   **Animate.css**: Para animaciones de entrada y efectos visuales.
-   **Iconos**:
    -   `astro-icon` & `@iconify-json/mdi`: Gestión eficiente de iconos SVG.
    -   `lucide-astro`: Set de iconos limpios y modernos.
-   **SEO**: `@astrojs/sitemap` para generación automática del mapa del sitio.

## 📂 Estructura del Proyecto

La estructura de directorios sigue las convenciones de Astro, con un enfoque en la separación de datos y presentación:

```text
/
├── public/             # Archivos estáticos (imágenes, fuentes, favicon)
├── src/
│   ├── assets/         # Recursos procesados por Astro/Vite
│   ├── components/     # Componentes UI reutilizables (.astro, .jsx)
│   ├── data/           # ⚠️ Fuente de verdad del contenido
│   │   ├── content/    # Textos y descripciones generales
│   │   ├── gallery/    # Datos de imágenes para galerías
│   │   ├── navigation/ # Configuración de menús
│   │   └── services/   # Información detallada de servicios
│   ├── layouts/        # Plantillas base (Header, Footer, Meta tags)
│   ├── pages/          # Rutas del sitio (generación basada en archivos)
│   └── styles/         # Estilos globales y configuraciones de Tailwind
└── astro.config.mjs    # Configuración de Astro
```

> **Nota para Editores**: Si necesitas cambiar textos, agregar servicios o modificar la navegación, revisa primero la carpeta `src/data`. El sitio está diseñado para consumir estos archivos de datos dinámicamente.

## 🛠️ Instalación y Desarrollo

Para ejecutar este proyecto localmente, necesitas tener instalado **Node.js** (versión 18 o superior).

1.  **Clonar el repositorio**:
    ```bash
    git clone <url-del-repositorio>
    cd novasolutions
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Iniciar servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    El sitio estará disponible en `http://localhost:4321`.

## 📦 Construcción y Despliegue

Este proyecto está configurado para un despliegue estático.

### Generar Build de Producción
Para generar los archivos estáticos listos para producción:

```bash
npm run build
```
Esto creará una carpeta `dist/` con todo el sitio compilado.

### Flujo CI/CD (GitLab -> Azure)
El despliegue está automatizado mediante **GitLab CI/CD**:

1.  Al hacer push a la rama `main`, se activa el pipeline.
2.  **Build Stage**: Se instalan dependencias y se ejecuta `npm run build`.
3.  **Deploy Stage**:
    -   El artefacto generado se transfiere al servidor de producción en **Azure**.
    -   Se descomprime y sirve estáticamente.
    -   *Nota*: La configuración de Netlify ha sido eliminada en favor de esta infraestructura propia.

## 📝 Comandos Útiles

| Comando | Acción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local. |
| `npm run build` | Compila el sitio para producción en `./dist/`. |
| `npm run preview` | Previsualiza localmente la versión compilada (`dist`). |
| `astro check` | Verifica tipos y problemas en archivos `.astro`. |

---
© 2026 Nova Solutions. Todos los derechos reservados.
