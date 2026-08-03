// Shared gallery + lightbox logic — used by graphics.html, photos.html, videos.html and the index.html preview

const kindLabel = { graphic: "GRAPHIC", photo: "PHOTO", video: "VIDEO" };
const glowColor = { graphic: "var(--teal)", photo: "var(--violet)", video: "var(--amber)" };

function renderGallery(items, gridId) {
  const grid = document.getElementById(gridId || 'portfolioGrid');
  if (!grid) return;
  grid.innerHTML = "";

  if (items.length === 0) {
    grid.innerHTML = `<p style="color:var(--muted); grid-column:1/-1;">Nothing uploaded here yet — check back soon.</p>`;
    return;
  }

  items.forEach((item, i) => {
    const tile = document.createElement('div');
    tile.className = 'p-tile';
    tile.setAttribute('data-kind', kindLabel[item.type]);
    const mediaTag = item.type === 'video'
      ? `<video src="${item.src}" poster="${item.poster || ''}" muted playsinline></video>`
      : `<img src="${item.src}" alt="${item.title}" loading="lazy">`;
    tile.innerHTML = `
      <div class="media">${mediaTag}</div>
      <div class="scrim"></div>
      <div class="glow" style="background:${glowColor[item.type]}; top:${i % 2 === 0 ? '-40px' : 'auto'}; bottom:${i % 2 !== 0 ? '-40px' : 'auto'}; right:${i % 3 === 0 ? '-40px' : 'auto'}; left:${i % 3 === 1 ? '-40px' : 'auto'};"></div>
      <div class="platform">${item.type === 'video' ? '▶' : '📷'}</div>
      ${item.type === 'video' ? '<div class="play-icon">▶</div>' : ''}
      <h4>${item.title}</h4>
      <span>${item.desc}</span>
      ${item.stats ? `<div class="stats mono"><span>${item.stats}</span></div>` : ''}
    `;
    tile.addEventListener('click', () => openLightbox(item));
    grid.appendChild(tile);
  });
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxInner = document.getElementById('lightboxInner');
  if (!lightbox) return;

  window.openLightbox = function (item) {
    lightboxInner.innerHTML = item.type === 'video'
      ? `<video src="${item.src}" controls autoplay></video>`
      : `<img src="${item.src}" alt="${item.title}">`;
    lightbox.classList.add('open');
  };
  window.closeLightbox = function () {
    lightbox.classList.remove('open');
    lightboxInner.innerHTML = "";
  };
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
}
