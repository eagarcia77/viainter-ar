# Paquete WebAR para Vía Inter SG

Este paquete añade una experiencia de Realidad Aumentada basada en geolocalización para el mapa del Recinto de San Germán.

## Enlace publicado

- Página de inicio del paquete: `https://eagarcia77.github.io/viainter-ar/`
- Experiencia AR directa: `https://eagarcia77.github.io/viainter-ar/ar.html`
- Mapa principal de Vía Inter SG: `https://viaintersg.org/index.html`

## Archivos principales

- `index.html`: página de inicio del paquete con acceso directo a la experiencia AR.
- `ar.html`: página principal de realidad aumentada.
- `css/ar-styles.css`: estilos visuales con colores institucionales.
- `js/ar-campus.js`: lógica para cargar puntos de interés, calcular distancias y crear etiquetas AR.
- `data/campus-locations.json`: puntos de interés editables.
- `snippets/insert-button-index.html`: botón para insertar en el mapa actual.
- `snippets/blackboard-instructions.html`: instrucciones listas para Blackboard Ultra.
- `qr/ar-map-qr.png`: código QR actualizado en formato PNG.
- `qr/ar-map-qr.svg`: código QR actualizado en formato SVG.
- `PATCH_NOTES.md`: resumen de los cambios realizados.

## Requisitos

1. La página debe publicarse en HTTPS. GitHub Pages funciona.
2. El estudiante debe usar celular o tableta con cámara y permiso de ubicación.
3. La precisión del GPS puede variar, especialmente dentro de edificios.
4. Las coordenadas incluidas son demostrativas y deben validarse con las coordenadas reales de cada edificio.

## Instalación rápida

1. Publica los archivos en GitHub Pages o en el dominio institucional.
2. Abre `https://eagarcia77.github.io/viainter-ar/ar.html` desde un celular.
3. Permite cámara y ubicación.
4. Ajusta `data/campus-locations.json` con las coordenadas exactas de cada edificio.
5. Inserta el botón de `snippets/insert-button-index.html` en el mapa principal o en Blackboard Ultra.

## Cómo editar los puntos de interés

Abre `data/campus-locations.json` y modifica estos campos:

```json
{
  "id": "biblioteca",
  "nombre": "Biblioteca",
  "categoria": "Servicios Académicos",
  "lat": 18.08415,
  "lng": -67.04875,
  "descripcion": "Descripción breve del edificio.",
  "url": "https://viaintersg.org/index.html"
}
```

Cada punto necesita `lat` y `lng` en formato decimal.

## Integración con el mapa actual

Copia el código de `snippets/insert-button-index.html` y pégalo en la zona donde quieras mostrar el botón “Ver Mapa en Realidad Aumentada”.

## Uso en Blackboard Ultra

Copia el contenido de `snippets/blackboard-instructions.html` en un documento, anuncio, módulo o actividad de Blackboard Ultra. También puedes insertar el QR incluido en `qr/ar-map-qr.png` o `qr/ar-map-qr.svg`.

## Recomendación de prueba

Antes de publicarlo oficialmente, prueba la experiencia en exteriores, cerca del campus. Si el GPS marca una precisión mayor de 20 a 30 metros, ajusta la actividad para que el estudiante use la lista de puntos de interés como apoyo visual.
