(function () {
  const DATA_URL = 'data/campus-locations.json';
  const scene = document.querySelector('#arScene');
  const statusEl = document.querySelector('#status');
  const btnLocate = document.querySelector('#btnLocate');
  const togglePlaces = document.querySelector('#togglePlaces');
  const placesList = document.querySelector('#placesList');

  let places = [];
  let userPosition = null;

  function setStatus(message) {
    statusEl.textContent = message;
  }

  function isSecureContextReady() {
    return window.isSecureContext || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  }

  function metersBetween(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const toRad = value => value * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function createTextPanel(place) {
    const entity = document.createElement('a-entity');
    entity.setAttribute('gps-new-entity-place', `latitude: ${place.lat}; longitude: ${place.lng}`);
    entity.setAttribute('look-at', '[gps-new-camera]');
    entity.setAttribute('scale', '16 16 16');
    entity.classList.add('clickable');
    entity.setAttribute('data-place-id', place.id);

    const panel = document.createElement('a-plane');
    panel.setAttribute('width', '4.6');
    panel.setAttribute('height', '1.45');
    panel.setAttribute('position', '0 2.2 0');
    panel.setAttribute('material', 'color: #007B5F; opacity: 0.92; side: double');

    const title = document.createElement('a-text');
    title.setAttribute('value', place.nombre);
    title.setAttribute('align', 'center');
    title.setAttribute('color', '#FFFFFF');
    title.setAttribute('width', '4.1');
    title.setAttribute('position', '0 2.45 0.02');
    title.setAttribute('font', 'mozillavr');

    const subtitle = document.createElement('a-text');
    subtitle.setAttribute('value', place.categoria || 'Punto de interés');
    subtitle.setAttribute('align', 'center');
    subtitle.setAttribute('color', '#FED141');
    subtitle.setAttribute('width', '3.6');
    subtitle.setAttribute('position', '0 2.08 0.02');
    subtitle.setAttribute('font', 'mozillavr');

    const marker = document.createElement('a-sphere');
    marker.setAttribute('radius', '0.25');
    marker.setAttribute('position', '0 1.2 0');
    marker.setAttribute('material', 'color: #FED141; emissive: #FED141; emissiveIntensity: 0.45');

    entity.appendChild(panel);
    entity.appendChild(title);
    entity.appendChild(subtitle);
    entity.appendChild(marker);

    entity.addEventListener('click', () => {
      const item = document.querySelector(`[data-card-id="${place.id}"]`);
      if (item) {
        placesList.hidden = false;
        togglePlaces.setAttribute('aria-expanded', 'true');
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    return entity;
  }

  function renderPlacesInAR() {
    places.forEach(place => {
      if (typeof place.lat !== 'number' || typeof place.lng !== 'number') return;
      scene.appendChild(createTextPanel(place));
    });
  }

  function renderPlacesList() {
    placesList.innerHTML = '';

    const orderedPlaces = [...places].sort((a, b) => {
      if (!userPosition) return a.nombre.localeCompare(b.nombre, 'es');
      const da = metersBetween(userPosition.lat, userPosition.lng, a.lat, a.lng);
      const db = metersBetween(userPosition.lat, userPosition.lng, b.lat, b.lng);
      return da - db;
    });

    orderedPlaces.forEach(place => {
      const card = document.createElement('article');
      card.className = 'place-card';
      card.setAttribute('data-card-id', place.id);

      const distance = userPosition
        ? `${Math.round(metersBetween(userPosition.lat, userPosition.lng, place.lat, place.lng))} m aprox.`
        : 'Distancia pendiente';

      const link = place.url
        ? `<a href="${place.url}" target="_blank" rel="noopener">Abrir</a>`
        : '';

      card.innerHTML = `
        <div>
          <h2>${place.nombre}</h2>
          <p>${place.descripcion || 'Punto de interés del recinto.'}</p>
          <span class="badge">${place.categoria || 'Campus'} · ${distance}</span>
        </div>
        <div>${link}</div>
      `;
      placesList.appendChild(card);
    });
  }

  function requestLocation() {
    if (!('geolocation' in navigator)) {
      setStatus('Este dispositivo o navegador no tiene geolocalización disponible.');
      return;
    }

    setStatus('Solicitando permiso de ubicación...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        renderPlacesList();
        setStatus(`Ubicación activa. Precisión aproximada: ${Math.round(position.coords.accuracy)} m. Si estás en interiores, acércate a un área abierta.`);
      },
      (error) => {
        const messages = {
          1: 'Permiso de ubicación denegado. Actívalo en el navegador para ver puntos AR por GPS.',
          2: 'No se pudo determinar la ubicación. Intenta desde un área abierta.',
          3: 'La ubicación tardó demasiado. Intenta nuevamente.'
        };
        setStatus(messages[error.code] || 'No se pudo obtener la ubicación.');
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0
      }
    );
  }

  async function loadPlaces() {
    if (!isSecureContextReady()) {
      setStatus('Esta experiencia requiere HTTPS. Sube el paquete a GitHub Pages o a un servidor seguro.');
      return;
    }

    try {
      const response = await fetch(DATA_URL, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      places = await response.json();
      renderPlacesInAR();
      renderPlacesList();
      setStatus('Experiencia cargada. Acepta permisos de cámara y ubicación para comenzar.');
      requestLocation();
    } catch (error) {
      console.error(error);
      setStatus('No se pudo cargar data/campus-locations.json. Verifica que el archivo exista y que el JSON esté correcto.');
    }
  }

  btnLocate.addEventListener('click', requestLocation);

  togglePlaces.addEventListener('click', () => {
    const expanded = togglePlaces.getAttribute('aria-expanded') === 'true';
    togglePlaces.setAttribute('aria-expanded', String(!expanded));
    placesList.hidden = expanded;
  });

  window.addEventListener('load', loadPlaces);
})();
