# Como atualizar o catálogo Electric-Way sem pagar

O site usa hospedagem estática gratuita. Para evitar cartão, mensalidade e serviços extras, os dados dos modelos ficam no arquivo `products.js`.

## Pelo celular ou computador
1. Entre no repositório `electric-way-site` no GitHub.
2. Abra o arquivo `products.js`.
3. Toque no lápis (**Edit this file**).
4. Altere somente os dados do produto desejado, mantendo a estrutura e as vírgulas.
5. No fim da página, toque em **Commit changes**.
6. O GitHub Actions publica a atualização automaticamente após concluir a execução.

## O que pode ser atualizado
- Nome exibido, preço e cores.
- Texto curto e ficha técnica.
- Observações e imagem do produto.

## Como trocar uma foto
1. Abra a pasta `assets` no repositório e envie a foto nova.
2. Copie o nome exato do arquivo.
3. Em `products.js`, altere o campo `image` para `assets/nome-do-arquivo.jpg`.
4. Salve com **Commit changes**.

## Importante
- Não coloque dados pessoais de clientes, senhas ou informações privadas no repositório.
- Não altere os campos `id` sem necessidade, pois eles fazem parte dos endereços das páginas dos produtos.
- Este método é gratuito, mas **não é um painel administrativo visual**. É a forma simples de atualizar o catálogo pelo próprio GitHub sem contratar um CMS ou backend.
- Antes de publicar novas especificações, confirme os dados da versão exata do veículo. Em especial, valide a classificação e a documentação aplicável à E-bike antes de divulgar velocidade máxima.
