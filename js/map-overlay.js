const video = document.getElementById('cameraView');
const fallback = document.getElementById('fallbackBg');
const startCamera = document.getElementById('startCamera');
const arMap = document.getElementById('arMap');
const pointsPanel = document.getElementById('pointsPanel');
const pointsList = document.getElementById('pointsList');
const togglePoints = document.getElementById('togglePoints');
const zoomIn = document.getElementById('zoomIn');
const zoomOut = document.getElementById('zoomOut');
const resetMap = document.getElementById('resetMap');

let scale = 1;
let pos = { x: 0, y: 0 };
let dragging = false;
let start = { x: 0, y: 0 };

function updateMapTransform() {
  arMap.style.transform = `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) rotateX(13deg) scale(${scale})`;
}

async function enableCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } },
      audio: false
    });
    video.srcObject = stream;
    fallback.classList.add('hidden');
    startCamera.textContent = 'Cámara activa';
  } catch (error) {
    fallback.innerHTML = '<div><h1>No se pudo activar la cámara</h1><p>Verifica permisos del navegador. En iPhone/Android usa HTTPS y Safari/Chrome actualizado.</p></div>';
    console.error(error);
  }
}

async function loadPoints() {
  try {
    const response = await fetch('data/campus-locations.json');
    const places = await response.json();
    pointsList.innerHTML = places.map(place => `
      <div class="point">
        <strong>${place.nombre}</strong>
        <span>${place.categoria || 'Punto de interés'} · ${place.descripcion || ''}</span>
      </div>
    `).join('');
  } catch (error) {
    pointsList.textContent = 'No se pudieron cargar los puntos del mapa.';
  }
}

startCamera.addEventListener('click', enableCamera);
togglePoints.addEventListener('click', () => {
  pointsPanel.style.display = pointsPanel.style.display === 'block' ? 'none' : 'block';
});
zoomIn.addEventListener('click', () => { scale = Math.min(1.7, scale + 0.12); updateMapTransform(); });
zoomOut.addEventListener('click', () => { scale = Math.max(0.55, scale - 0.12); updateMapTransform(); });
resetMap.addEventListener('click', () => { scale = 1; pos = { x: 0, y: 0 }; updateMapTransform(); });

arMap.addEventListener('pointerdown', event => {
  dragging = true;
  arMap.setPointerCapture(event.pointerId);
  start = { x: event.clientX - pos.x, y: event.clientY - pos.y };
});
arMap.addEventListener('pointermove', event => {
  if (!dragging) return;
  pos = { x: event.clientX - start.x, y: event.clientY - start.y };
  updateMapTransform();
});
arMap.addEventListener('pointerup', () => { dragging = false; });
arMap.addEventListener('pointercancel', () => { dragging = false; });

loadPoints();
updateMapTransform();
