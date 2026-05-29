# Vía Inter SG · Mapa con Realidad Aumentada

Este paquete convierte el mapa de Vía Inter SG en una experiencia WebAR. Incluye tres formas de uso:

1. **`map-ar.html`** — mapa completo sobre la cámara del celular. Esta es la opción principal para educación en línea y Blackboard Ultra.
2. **`marker-ar.html`** — mapa como panel 3D usando un marcador HIRO.
3. **`ar.html`** — puntos de interés por GPS para orientación en exteriores.

## Enlaces principales

- Página inicial: `https://eagarcia77.github.io/viainter-ar/`
- Mapa AR con cámara: `https://eagarcia77.github.io/viainter-ar/map-ar.html`
- Mapa AR con marcador: `https://eagarcia77.github.io/viainter-ar/marker-ar.html`
- Marcador imprimible: `https://eagarcia77.github.io/viainter-ar/marker-hiro.html`
- GPS AR: `https://eagarcia77.github.io/viainter-ar/ar.html`

## Archivos añadidos

- `map-ar.html`: muestra el mapa completo como capa aumentada sobre la cámara.
- `marker-ar.html`: muestra el mapa como objeto 3D usando AR.js y marcador HIRO.
- `marker-hiro.html`: marcador imprimible para activar el modo 3D.
- `assets/campus-map.svg`: mapa conceptual editable del campus.
- `js/map-overlay.js`: activa la cámara, permite mover/agrandar el mapa y carga puntos de interés.
- `qr/ar-map-live-qr.svg` y `qr/ar-map-live-qr.png`: QR actualizado hacia `map-ar.html`.

## Cómo sustituir el mapa conceptual por el mapa oficial

1. Exporta el mapa oficial como imagen `.svg`, `.png` o `.jpg`.
2. Sustituye el archivo `assets/campus-map.svg` por el mapa oficial.
3. Conserva el mismo nombre de archivo para no modificar el código.
4. Prueba `map-ar.html` desde un celular.

## Uso recomendado en Blackboard Ultra

Copia el enlace `https://eagarcia77.github.io/viainter-ar/map-ar.html` en un módulo de orientación, actividad o anuncio. También puedes insertar el QR actualizado para que el estudiante lo escanee desde su celular.

## Requisitos técnicos

- Publicar en HTTPS. GitHub Pages funciona.
- Usar celular o tableta con cámara.
- Permitir permisos de cámara en el navegador.
- Para GPS AR, permitir ubicación y validar coordenadas reales en `data/campus-locations.json`.

## Nota

El archivo `assets/campus-map.svg` incluido es conceptual y editable. Debe sustituirse por el plano oficial del recinto si se desea una representación exacta del campus.
