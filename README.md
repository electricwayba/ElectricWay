# Electric-Way — site e catálogo

Site responsivo em HTML, CSS e JavaScript puro, preparado para publicação gratuita no **GitHub Pages**, sem cartão de crédito, domínio pago, mensalidade, comissão ou checkout.

## Publicação gratuita

1. Crie ou entre em uma conta gratuita em https://github.com/ — não informe cartão.
2. Crie um repositório **público** chamado `electric-way-site`.
3. Envie para a raiz do repositório todo o conteúdo desta pasta (incluindo `.github`, `.nojekyll`, `assets`, HTML, CSS e JS). Não envie a pasta externa que contém o projeto; envie os arquivos que estão dentro dela.
4. Confirme que a branch principal se chama `main`.
5. Abra a aba **Actions** e aguarde o fluxo **Publicar site Electric-Way no GitHub Pages** terminar com sucesso.
6. Em **Settings → Pages**, confira a publicação pelo GitHub Actions. O endereço será `https://SEU-USUARIO.github.io/electric-way-site/`.

O workflow `.github/workflows/pages.yml` já está incluído e faz a publicação automaticamente a cada atualização na branch `main`. A primeira publicação pode levar alguns minutos.

## Arquivos
- `index.html` — página inicial e catálogo.
- `produto.html` — página individual de cada modelo.
- `products.js` — dados, preços, cores e fichas técnicas.
- `app.js` e `product-page.js` — comportamento do catálogo e páginas individuais.
- `styles.css` — identidade visual e layout responsivo.
- `assets/` — imagens disponíveis da loja.
- `ATUALIZAR-CATALOGO.md` — instruções para atualizar produtos pelo GitHub no celular ou computador.

## Cadastro e atualização de produtos

Para manter a operação totalmente gratuita e sem serviços adicionais, o catálogo é atualizado editando `products.js` no próprio GitHub. Isso não é um painel administrativo visual; um painel real com login e edição por formulário exigiria um serviço adicional de CMS/backend, que não foi incluído nem contratado.

## O que está incluído
- Catálogo com 4 modelos, pesquisa, filtros e ordenação.
- Páginas individuais com preços, cores, ficha técnica e contato pelo WhatsApp.
- Seções de acessórios, garantia, manutenção, peças, localização e horário.
- Layout responsivo.
- Publicação automatizada no GitHub Pages.

## Pendências antes de divulgar
- Confirmar a primeira publicação e testar o endereço público em celular e computador.
- Adicionar fotos próprias da Harley X13, T1 e E-bike quando estiverem disponíveis. O site usa espaços reservados em vez de fotos genéricas incorretas.
- Confirmar fichas técnicas das versões exatas. Em especial, verificar classificação/documentação da E-bike antes de anunciar velocidade máxima.
- Testar manualmente WhatsApp, Instagram e Google Maps no site publicado.

## Precisão e atendimento
- Preços exibidos conforme informados pela loja.
- Garantia descrita somente como 1 ano para bateria e parte elétrica, contado da data da compra.
- Não há checkout, financiamento, boleto ou pagamento online; vendas são tratadas diretamente com a Electric-Way pelo WhatsApp.
- Nenhuma foto genérica foi apresentada como foto real de veículo.
