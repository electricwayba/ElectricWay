const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const productsContext = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'products.js'), 'utf8'), productsContext);
const products = productsContext.window.ELECTRIC_WAY_PRODUCTS;
assert.equal(products.length, 4);
assert.deepEqual(Array.from(products, p => p.name), ['MZ', 'Harley X13', 'T1', 'E-bike']);
for (const p of products) {
  assert.ok(p.id && p.price > 0 && p.priceLabel && p.specs.length && p.colors.length);
  if (p.image) assert.ok(fs.existsSync(path.join(root, p.image)), `missing image for ${p.name}`);
}
class Element {
  constructor(dataset = {}) { this.dataset = dataset; this.listeners = {}; this.attrs = {}; this.value = ''; this.innerHTML = ''; this.hidden = false; this.open = false; this.classList = { add() {}, remove() {}, toggle() {} }; }
  addEventListener(name, fn) { this.listeners[name] = fn; }
  setAttribute(key, value) { this.attrs[key] = value; }
  getAttribute(key) { return this.attrs[key] ?? (key === 'aria-expanded' ? 'false' : null); }
  removeAttribute(key) { delete this.attrs[key]; }
  showModal() { this.open = true; }
  close() { this.open = false; }
  querySelectorAll() { return []; }
  fire(name, event = {}) { this.listeners[name]?.(event); }
}
const grid = new Element(), search = new Element(), sort = new Element(), noResults = new Element();
const dialog = new Element(), dialogContent = new Element(), dialogClose = new Element(), year = new Element(), menu = new Element(), nav = new Element();
const tabs = ['todos', 'scooter', 'bike'].map(value => new Element({ filter: value }));
const navLinks = [new Element(), new Element()]; nav.querySelectorAll = () => navLinks;
const byId = { 'product-grid': grid, 'search-model': search, 'sort-model': sort, 'no-results': noResults, 'product-dialog': dialog, 'dialog-content': dialogContent, 'dialog-close': dialogClose, 'current-year': year, 'main-nav': nav };
const document = { getElementById: id => byId[id] || null, querySelector: selector => selector === '.menu-toggle' ? menu : null, querySelectorAll: selector => selector === '.filter-tab' ? tabs : [], addEventListener() {} };
const window = { ELECTRIC_WAY_PRODUCTS: products, location: { hash: '' } };
vm.runInNewContext(fs.readFileSync(path.join(root, 'app.js'), 'utf8'), { window, document, console, Date, encodeURIComponent });
const countCards = () => (grid.innerHTML.match(/class="product-card"/g) || []).length;
assert.equal(countCards(), 4, 'catalog renders all four products');
search.value = 'T1'; search.fire('input'); assert.equal(countCards(), 1); assert.match(grid.innerHTML, /T1/); assert.match(grid.innerHTML, /produto.html\?id=t1/);
search.value = 'sem-correspondencia'; search.fire('input'); assert.equal(countCards(), 0); assert.equal(noResults.hidden, false);
search.value = ''; tabs[2].fire('click'); assert.equal(countCards(), 1); assert.match(grid.innerHTML, /E-bike/);
tabs[0].fire('click'); sort.value = 'price-desc'; sort.fire('change');
assert.ok(grid.innerHTML.indexOf('MZ') < grid.innerHTML.indexOf('E-bike'), 'descending price order puts MZ before E-bike');
grid.fire('click', { target: { closest: () => ({ dataset: { openProduct: 'e-bike' } }) } });
assert.equal(dialog.open, true); assert.match(dialogContent.innerHTML, /Ficha técnica/); assert.match(dialogContent.innerHTML, /60 km\/h/);
dialogClose.fire('click'); assert.equal(dialog.open, false);
menu.setAttribute('aria-expanded', 'false'); menu.fire('click'); assert.equal(menu.attrs['aria-expanded'], 'true');
console.log('OK — catálogo, pesquisa, filtro, ordenação, estado sem resultados, ficha técnica, abrir/fechar detalhes e menu mobile.');

// Smoke test for the individual product route.
const pageRoot = new Element(); const crumb = new Element();
const pageDocument = { title: '', getElementById: id => id === 'product-page-content' ? pageRoot : id === 'breadcrumb-model' ? crumb : null };
const pageWindow = { ELECTRIC_WAY_PRODUCTS: products, location: { search: '?id=t1' } };
vm.runInNewContext(fs.readFileSync(path.join(root, 'product-page.js'), 'utf8'), { window: pageWindow, document: pageDocument, URLSearchParams });
assert.match(pageDocument.title, /T1/); assert.match(pageRoot.innerHTML, /Ficha técnica/); assert.match(pageRoot.innerHTML, /64V 20Ah/); assert.equal(crumb.textContent, 'T1');
const missingRoot = new Element(); const missingDoc = { title: '', getElementById: id => id === 'product-page-content' ? missingRoot : null };
vm.runInNewContext(fs.readFileSync(path.join(root, 'product-page.js'), 'utf8'), { window: { ELECTRIC_WAY_PRODUCTS: products, location: { search: '?id=nao-existe' } }, document: missingDoc, URLSearchParams });
assert.match(missingRoot.innerHTML, /Modelo não encontrado/);
console.log('OK — páginas individuais, dados de ficha técnica e tratamento de modelo inexistente.');
