# Paquete WebAR para Vía Inter SG

Este paquete añade una experiencia de Realidad Aumentada basada en geolocalización para el mapa del Recinto de San Germán.

## Archivos principales

- `ar.html`: página principal de realidad aumentada.
- `css/ar-styles.css`: estilos visuales con colores institucionales.
- `js/ar-campus.js`: lógica para cargar puntos de interés, calcular distancias y crear etiquetas AR.
- `data/campus-locations.json`: puntos de interés editables.
- `snippets/insert-button-index.html`: botón para insertar en el mapa actual.
- `snippets/blackboard-instructions.html`: instrucciones listas para Blackboard Ultra.
- `qr/ar-map-qr.png`: código QR que apunta a `https://viaintersg.org/ar.html`.

## Requisitos

1. La página debe publicarse en HTTPS. GitHub Pages funciona.
2. El estudiante debe usar celular o tableta con cámara y permiso de ubicación.
3. La precisión del GPS puede variar, especialmente dentro de edificios.
4. Las coordenadas incluidas son demostrativas y deben validarse con las coordenadas reales de cada edificio.

## Instalación rápida

1. Copia `ar.html`, las carpetas `css`, `js`, `data`, `qr`, `assets` y `snippets` al mismo nivel donde está `index.html`.
2. Publica los archivos en el dominio actual.
3. Abre `https://viaintersg.org/ar.html` desde un celular.
4. Permite cámara y ubicación.
5. Ajusta `data/campus-locations.json` con las coordenadas exactas de cada edificio.

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

Copia el contenido de `snippets/blackboard-instructions.html` en un documento, anuncio, módulo o actividad de Blackboard Ultra. También puedes insertar el QR incluido en `qr/ar-map-qr.png`.

## Recomendación de prueba

Antes de publicarlo oficialmente, prueba la experiencia en exteriores, cerca del campus. Si el GPS marca una precisión mayor de 20 a 30 metros, ajusta la actividad para que el estudiante use la lista de puntos de interés como apoyo visual.
