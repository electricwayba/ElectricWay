(() => {
  'use strict';
  const products = Array.isArray(window.ELECTRIC_WAY_PRODUCTS) ? window.ELECTRIC_WAY_PRODUCTS : [];
  const grid = document.getElementById('product-grid');
  const search = document.getElementById('search-model');
  const sort = document.getElementById('sort-model');
  const noResults = document.getElementById('no-results');
  const dialog = document.getElementById('product-dialog');
  const dialogContent = document.getElementById('dialog-content');
  const dialogClose = document.getElementById('dialog-close');
  let activeFilter = 'todos';

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const money = (value) => Number(value).toLocaleString('pt-BR', {style:'currency',currency:'BRL',maximumFractionDigits:0});
  const wa = 'https://wa.me/message/5ED45F2RN6EWA1';

  function card(product) {
    const visual = product.image
      ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.imageAlt)}" loading="lazy"><span class="image-caption">${escapeHtml(product.imageNote || '')}</span>`
      : `<div class="image-placeholder"><span class="placeholder-mark">EW</span><span>${escapeHtml(product.imageNote || 'Consulte fotos pelo WhatsApp')}</span></div>`;
    return `<article class="product-card" data-product="${escapeHtml(product.id)}">
      <button class="product-visual" type="button" data-open-product="${escapeHtml(product.id)}" aria-label="Ver detalhes do modelo ${escapeHtml(product.name)}">${visual}<span class="visual-arrow" aria-hidden="true">↗</span></button>
      <div class="product-info"><div class="product-title-row"><div><p class="product-brand">ELECTRIC-WAY</p><p class="product-category">${product.category === 'bike' ? 'BICICLETA ELÉTRICA' : 'SCOOTER ELÉTRICA'}</p><h3>${escapeHtml(product.name)}</h3></div><span class="product-price">${escapeHtml(product.priceLabel)}</span></div>
      <p class="product-short">${escapeHtml(product.short)}</p><div class="product-colors"><span>Cores</span>${product.colors.map(c=>`<i>${escapeHtml(c)}</i>`).join('')}</div>
      <div class="product-actions"><a class="details-button" href="produto.html?id=${encodeURIComponent(product.id)}">Ver detalhes <span>→</span></a><a class="buy-button" href="${wa}" target="_blank" rel="noopener" aria-label="Consultar ${escapeHtml(product.name)} pelo WhatsApp">Consultar <span>↗</span></a></div></div></article>`;
  }

  function visibleProducts() {
    const term = (search?.value || '').trim().toLocaleLowerCase('pt-BR');
    let list = products.filter(p => (activeFilter === 'todos' || p.category === activeFilter) && `${p.name} ${p.short} ${p.colors.join(' ')}`.toLocaleLowerCase('pt-BR').includes(term));
    const order = sort?.value;
    if (order === 'price-asc') list.sort((a,b)=>a.price-b.price);
    if (order === 'price-desc') list.sort((a,b)=>b.price-a.price);
    if (order === 'name') list.sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
    return list;
  }

  function render() {
    if (!grid) return;
    const list = visibleProducts();
    grid.innerHTML = list.map(card).join('');
    if (noResults) noResults.hidden = list.length !== 0;
  }

  function openProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product || !dialog || !dialogContent) return;
    document.getElementById('dialog-title')?.removeAttribute('id');
    const image = product.image
      ? `<div class="dialog-photo"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.imageAlt)}"></div>`
      : `<div class="dialog-photo dialog-photo-placeholder"><span>Electric-Way</span><small>${escapeHtml(product.imageNote || 'Consulte fotos pelo WhatsApp')}</small></div>`;
    dialogContent.innerHTML = `${image}<div class="dialog-body"><div class="dialog-product-heading"><div><p class="product-brand">ELECTRIC-WAY</p><p class="product-category">${product.category === 'bike' ? 'BICICLETA ELÉTRICA' : 'SCOOTER ELÉTRICA'}</p><h2 id="dialog-title">${escapeHtml(product.name)}</h2></div><strong>${escapeHtml(product.priceLabel)}</strong></div><p>${escapeHtml(product.short)}</p><div class="dialog-colors"><b>Cores disponíveis</b><span>${product.colors.map(escapeHtml).join(' · ')}</span></div><h3>Ficha técnica</h3><dl class="spec-list">${product.specs.map(([k,v])=>`<div><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`).join('')}</dl><p class="product-note">${escapeHtml(product.note)}</p><a class="button button-green dialog-cta" href="${wa}" target="_blank" rel="noopener">Consultar este modelo no WhatsApp <span>↗</span></a></div>`;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else window.location.hash = `produto-${encodeURIComponent(id)}`;
  }

  grid?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-open-product]');
    if (button) openProduct(button.dataset.openProduct);
  });
  search?.addEventListener('input', render);
  sort?.addEventListener('change', render);
  document.querySelectorAll('.filter-tab').forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'todos';
    document.querySelectorAll('.filter-tab').forEach(tab => {
      const selected = tab === button;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-pressed', String(selected));
    });
    render();
  }));
  dialogClose?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && dialog?.open) dialog.close(); });

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('is-open', open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open'); menuToggle?.setAttribute('aria-expanded','false');
  }));
  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();
  render();
})();
