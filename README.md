# PrintLab 3D — loja de impressão 3D

Projeto base completo em HTML + CSS + JavaScript puro, com uma API Node/Express opcional para evolução para produção.

## O que já funciona no navegador
- Catálogo de produtos com busca, filtros e ordenação.
- Favoritos persistidos no `localStorage`.
- Carrinho persistido no `localStorage`.
- Alteração de quantidade, remoção e mini-fluxo de compra.
- Cupons de demonstração: `PRIMEIRA10`, `PRINT15` e `FRETE0`.
- Cálculo de frete demonstrativo por CEP.
- Configurador de produto personalizado.
- Upload de STL, OBJ e 3MF no simulador.
- Estimativa automática de peso, tempo e preço.
- Checkout demonstrativo.
- Histórico local de pedidos e pontos.
- Modal de detalhes dos produtos.
- Design responsivo para celular/desktop.
- Microanimações, profundidade, sombras, gradientes e componentes com aparência 3D.

## Como abrir
A versão mais simples não precisa de servidor: abra `index.html` em um navegador moderno.

Para usar a API:

```bash
cd server
npm install
npm start
```

Depois acesse `http://localhost:3000`.

## O que precisa ser trocado antes de colocar em produção
O projeto intencionalmente usa valores demonstrativos para pagamento, frete, autenticação e banco de dados. Antes de vender de verdade, integre:

1. Banco de dados PostgreSQL.
2. Autenticação segura com sessões/JWT/OAuth.
3. Gateway de pagamento (Mercado Pago, Pagar.me, Stripe, Asaas etc.).
4. Frete real (Melhor Envio/Frenet/Correios/transportadora).
5. Armazenamento de arquivos (S3/R2/Supabase Storage).
6. Análise geométrica/preview real de STL/OBJ/3MF no backend.
7. Painel administrativo com RBAC.
8. Emissão fiscal conforme a operação da empresa.
9. E-mail transacional e WhatsApp.
10. Webhooks para confirmação de pagamentos e atualizações de pedido.
11. LGPD, consentimento de cookies e políticas jurídicas reais.
12. Segurança, backups, logs, rate limiting e monitoramento.

## Estrutura
- `index.html` — estrutura da loja.
- `css/styles.css` — identidade visual e responsividade.
- `js/products.js` — catálogo demo.
- `js/app.js` — lógica da loja.
- `server/server.js` — API Node/Express inicial.
- `server/.env.example` — variáveis que serão necessárias para integrações reais.

## Próxima arquitetura recomendada
Para crescer além desta base, migrar o front para Next.js/React + TypeScript e separar domínio de catálogo, checkout, produção, clientes, arquivos 3D e administração. O JavaScript atual serve como protótipo funcional e referência de interface/fluxo.
