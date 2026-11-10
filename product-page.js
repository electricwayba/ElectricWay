(() => {
  'use strict';
  const products = Array.isArray(window.ELECTRIC_WAY_PRODUCTS) ? window.ELECTRIC_WAY_PRODUCTS : [];
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = products.find(item => item.id === id);
  const root = document.getElementById('product-page-content');
  const breadcrumb = document.getElementById('breadcrumb-model');
  const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const wa = 'https://wa.me/message/5ED45F2RN6EWA1';
  if (!root) return;
  if (!product) {
    document.title = 'Modelo não encontrado | Electric-Way';
    root.innerHTML = '<section class="product-not-found"><p class="eyebrow eyebrow-dark">CATÁLOGO ELECTRIC-WAY</p><h1>Modelo não encontrado.</h1><p>O endereço pode estar incorreto ou o modelo não está disponível no catálogo.</p><a class="button button-green" href="index.html#catalogo">Voltar aos modelos <span>→</span></a></section>';
    if (breadcrumb) breadcrumb.textContent = 'Não encontrado';
    return;
  }
  document.title = `${product.name} | Electric-Way`;
  if (breadcrumb) breadcrumb.textContent = product.name;
  const visual = product.image
    ? `<img class="detail-main-image" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.imageAlt)}">`
    : `<div class="detail-image-placeholder"><span>Electric-Way</span><small>${escapeHtml(product.imageNote || 'Fotos em atualização')}</small></div>`;
  root.innerHTML = `<section class="product-detail-grid"><div class="product-detail-visual">${visual}<p class="detail-image-caption">${escapeHtml(product.imageNote || '')}</p></div><div class="product-detail-copy"><p class="product-brand">ELECTRIC-WAY</p><p class="product-category">${product.category === 'bike' ? 'BICICLETA ELÉTRICA' : 'SCOOTER ELÉTRICA'}</p><h1>${escapeHtml(product.name)}</h1><p class="detail-price">${escapeHtml(product.priceLabel)}</p><p class="detail-short">${escapeHtml(product.short)}</p><div class="detail-colors"><span>CORES DISPONÍVEIS</span><p>${product.colors.map(escapeHtml).join(' · ')}</p></div><a class="button button-green detail-contact" href="${wa}" target="_blank" rel="noopener">Consultar este modelo <span>↗</span></a><p class="detail-contact-note">Fale diretamente com a equipe para confirmar estoque e condições.</p></div></section><section class="product-spec-section"><div class="spec-section-heading"><p class="eyebrow eyebrow-dark">INFORMAÇÕES DO MODELO</p><h2>Ficha técnica</h2></div><dl class="spec-list spec-list-page">${product.specs.map(([key,value])=>`<div><dt>${escapeHtml(key)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}</dl><p class="product-note">${escapeHtml(product.note)}</p><a class="text-link detail-back-link" href="index.html#catalogo">← Voltar ao catálogo</a></section>`;
})();
