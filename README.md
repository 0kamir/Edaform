# Edaform — Calicatas WebGIS (USDA)

> **Sistema Web Edafológico Multiplataforma para Descripción de Calicatas y Perfiles de Suelo según Estándares USDA Soil Survey / Soil Taxonomy.**

---

## 📋 Descripción General

**Edaform** es una aplicación web y **PWA (Progressive Web App)** diseñada para edafólogos, agrónomos, ingenieros agrícolas, consultores ambientales y científicos del suelo. Permite digitalizar y sistematizar la toma de datos morfológicos y taxonómicos en terreno y gabinete de manera rápida, moderna y sin necesidad de conexión a internet.

Reemplaza libretas de campo tradicionales y flujos complejos de GIS mediante una interfaz optimizada para dispositivos móviles y escritorio, integrando mapas espaciales, reglas graduadas proporcionales, paletas digitales Munsell, árboles de decisión textural y exportación directa a formatos GIS y hojas de cálculo.

---

## ✨ Características Principales

### 📁 1. Gestión Multi-Proyecto Edafológico (Global)
* **Definición Previa de Proyecto:** Antes de registrar calicatas, el sistema organiza los levantamientos bajo un **Proyecto Edafológico** específico (*ID, Nombre del Estudio, Cliente/Mandante, Ubicación/Comuna, Fecha, Responsable y Descripción*).
* **Selector Rápido & Modal de Administración:** Cambio instantáneo de proyecto activo desde la cabecera, con filtrado automático de calicatas en el mapa y en la lista.
* **Aislamiento y Numeración Inteligente:** Las calicatas y horizontes quedan vinculados a su proyecto correspondiente (`CAL-01`, `CAL-02` por proyecto), facilitando múltiples estudios simultáneos sin mezcla de datos.

### 🗺️ 2. Mapa Interactivo y SIG en Tiempo Real (100% Código Abierto)
* **Librería Leaflet & Capas Estándar:** Mapa interactivo ultraligero con selector de capas base:
  * **Satelital HD (*ESRI World Imagery* - Predeterminada):** Cobertura orbital de muy alta resolución (Maxar/WorldView) con radiometría natural para análisis de suelos.
  * **Topográfico / Relieve (*OpenTopoMap*):** Curvas de nivel, sombreado de relieve y pendientes (esencial para geomorfología de suelos).
  * **Callejero Libre (*OpenStreetMap*):** Red vial, hidrografía y referencias cartográficas abiertas.
* **Geolocalización GPS:** Captura automática de coordenadas (Latitud/Longitud y Altitud) con precisión de terreno.
* **Marcación Interactiva:** Ubicación de puntos de muestreo y calicatas sobre el mapa Leaflet con visualización de popups informativos.
* **Búsqueda y Filtrado:** Localización rápida de calicatas registradas.

### 🪨 3. Gestión Integral de Calicatas (Sitio)
* **Parámetros de Terreno:** ID, Fecha, Examinador, Material Parental, Forma de Relieve, Pendiente (%), Pedregosidad Superficial, Clase de Drenaje, Condición Climática y Fotografía General del Sitio.
* **Auto-Cálculo Taxonómico USDA:** Asistente inteligente que sugiere y clasifica automáticamente el subgrupo taxonómico (*ej. Typic Haploxeroll*) según la morfología del sitio y la secuencia de horizontes.

### 📐 4. Descripción Morfológica de Horizontes (Relación 1:N)
* **Nomenclatura USDA:** Designación maestra y sufijos subordinados (*Ap, A, Bt, Bw, C, Cr, R, etc.*).
* **Profundidades y Límites:** Profundidad superior e inferior (cm), nitidez y topografía del límite.
* **Propiedades Físicas:** Textura de campo, tipo, grado y tamaño de estructura, consistencia en húmedo y efervescencia al HCl.
* **Biológicas y Poros:** Cantidad y tamaño de raíces, porosidad.
* **Pedregosidad Interna:** Estimación de % en volumen, tipo de fragmento y clase.
* **Fotografía de Detalle:** Registro fotográfico por horizonte individual.

### 🎨 5. Herramientas Especializadas de Campo Integradas
* **Selector Digital de Cartas de Color Munsell:**
  * Selector visual para estados **Seco** y **Húmedo**.
  * Navegación por matrices *Hue* (*10YR, 7.5YR, 2.5Y, 5YR, GLEY, etc.*), *Value* (Claridad) y *Chroma* (Pureza).
  * Buscador rápido por notación alfanumérica.
* **Calculadora de Triángulo Textural USDA (% Arena, Limo, Arcilla):**
  * Gráfico ternario vectorial interactivo (SVG) para determinar la clase textural a partir de análisis granulométrico de laboratorio.
* **Guía Interactiva "Experimento del Lulito":**
  * Árbol de decisión paso a paso basado en la prueba de cordoncillo al tacto húmedo (formación de bola, rulo/cinta, longitud y sensación al tacto) para determinar la clase textural con precisión.
* **Cartas Visuales de Estimación Porcentual (FAO / USDA):**
  * Diagramas de densidad y comparación visual de abundancia (1% a 50%) para estimar moteados y fragmentos gruesos.
* **Gestor de Rasgos Redoximórficos (RMF 1:N):**
  * Registro detallado de concentraciones, agotamientos, contrastes, tamaños, abundancia, localización y color Munsell asociado.

### 📊 6. Ficha Técnica y Visualizador Gráfico de Perfil
* **Regla Graduada Proporcional:** Gráfico a escala del perfil edafológico con los colores Munsell reales y espesores de cada horizonte.
* **Modo Impresión / Exportación PDF:** Generación instantánea de ficha técnica imprimible con resumen del sitio y descripción completa de horizontes.

### 💾 7. Exportación, Importación y Modo Offline (PWA)
* **📦 OGC GeoPackage (`.gpkg`):** Exportación de base de datos SQLite estándar para **QGIS** que contiene la capa espacial `calicatas` y la tabla relacional 1:N `horizontes`.
* **📍 Importación de Muestreo Planificado GPX (`.gpx`):** Carga directa de waypoints y coordenadas planificadas en gabinete (QGIS, Garmin BaseCamp, Google Earth) para crearlas automáticamente como calicatas en el proyecto activo y visualizarlas en el mapa de terreno.
* **GeoJSON / JSON:** Exportación e intercambio con geometrías espaciales compatibles con QGIS, ArcGIS y Python (`geopandas`).
* **PWA & Offline:** Almacenamiento local automático en navegador (*LocalStorage*) y *Service Worker* con estrategia *Network-First* para funcionamiento 100% offline en terreno.

---

## 📁 Estructura del Proyecto

```text
/home/reinaldocoes/Edaform/
├── README.md                 # Documentación técnica del proyecto
├── iniciar_web_app.sh        # Lanzador para Linux y macOS
├── iniciar_web_app.bat       # Lanzador para Windows
├── start_web_app.py          # Servidor HTTP local con apertura automática en navegador
└── web_app/                  # Código fuente de la Web App (Estático / PWA)
    ├── index.html            # Estructura de la aplicación, formularios y modales
    ├── app.js                # Lógica principal, estado, Leaflet GIS, exportaciones
    ├── schema.js             # Esquema de datos USDA, listas desplegables y Munsell
    ├── styles.css            # Estilos personalizados y visualizadores
    ├── manifest.json         # Manifiesto PWA para instalación móvil/escritorio
    └── sw.js                 # Service Worker para caché offline
```

---

## 🚀 Guía de Inicio y Ejecución

### Opción 1: Ejecución Local Rápida (Recomendada)

#### En Linux / macOS:
```bash
cd /home/reinaldocoes/Edaform
chmod +x iniciar_web_app.sh
./iniciar_web_app.sh
```

#### En Windows:
Haga doble clic sobre el archivo **`iniciar_web_app.bat`** o ejecútelo desde la terminal:
```cmd
iniciar_web_app.bat
```

#### Mediante Python directo:
```bash
python3 start_web_app.py
```
> La aplicación se iniciará en `http://localhost:8000` y abrirá automáticamente su navegador predeterminado.

---

### Opción 2: Despliegue en Servidor Web o Nube

Al ser una aplicación web estática (HTML5, Vanilla JS, CSS3), se puede desplegar directamente sin requerir bases de datos en servidor:

* **GitHub Pages:** Subir el contenido de `web_app/` al repositorio y activar Pages.
* **Vercel / Netlify / Cloudflare Pages:** Apuntar la raíz de publicación a la carpeta `web_app/`.
* **Nginx / Apache / Caddy:** Copiar los archivos de `web_app/` al directorio web (`/var/www/html`).

---

## 📱 Instalación como App Móvil (PWA)

1. Abra la aplicación desde el navegador de su teléfono (Google Chrome en Android, Safari en iOS).
2. Seleccione el menú de opciones del navegador (los tres puntos o el botón de compartir).
3. Seleccione **"Instalar aplicación"** o **"Agregar a la pantalla de inicio"**.
4. Ahora podrá utilizar la aplicación en terreno como una app nativa, con soporte GPS y almacenamiento sin internet.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** HTML5 semántico, JavaScript ES6+ (Vanilla, sin dependencias pesadas).
* **Diseño y Estilos:** Tailwind CSS CDN, FontAwesome 6, CSS Grid & Flexbox.
* **Mapas & SIG:** Leaflet.js 1.9.4 & OpenStreetMap.
* **Offline & Almacenamiento:** Service Worker API, Cache Storage, Web Storage API (LocalStorage).
* **Backend de servicio local:** Python 3 (`http.server`, `socketserver`, `webbrowser`).

---

## 📜 Licencia y Créditos

Desarrollado para la sistematización y estudio de perfiles de suelo y proyectos edafológicos bajo estándares internacionales **USDA-NRCS (Soil Survey Division Staff)** y **FAO**.
