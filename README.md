# YUNK VINO — THE VISUAL ARCHIVE

Site conceitual **não oficial** para portfólio da Space Underground. Direção de arte: Cinematic Hybrid (Dark Editorial × Luxury Streetwear × Experimental Brutalism).

## Rodar localmente

Requisitos: Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

Abra o link local indicado pelo Vite (normalmente http://localhost:5173).

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Publicação

- **Netlify:** build command `npm run build`; publish directory `dist`.
- **GitHub:** crie um repositório novo e envie os arquivos do projeto (não inclua `node_modules` ou `dist`).
- **Responsividade:** layouts ajustados para desktop, tablet e mobile. Animações GSAP ScrollTrigger são desativadas se `prefers-reduced-motion: reduce` estiver ativo.

## Direção visual

- `src/styles.css`: tokens, tipografia, breakpoints e layouts.
- `src/main.js`: menu acessível, indicador de rolagem e animações GSAP.
- `index.html`: estrutura semântica das seções e conteúdo.
- `public/assets/`: fotos enviadas como referências do conceito, convertidas para WebP para o protótipo.

## Créditos e direitos

Este é um projeto independente e **não representa um website oficial** nem possui vínculo com o artista, equipe ou gravadoras. As fotos fornecidas foram incluídas apenas para criação e visualização do protótipo. **Antes de publicar nas redes, Behance, portfólio comercial ou hospedar publicamente**, confirme direitos de reprodução e atribuição com os titulares das imagens e demais obras. A publicação de imagens de terceiros exige autorização/licença adequada; a inclusão de créditos sozinha não constitui permissão.

Links de lançamentos levam ao Spotify oficial. Imagens mostradas em seus cartões são interpretações de layout do protótipo, não as capas oficiais dos discos. Não há streaming automático de músicas ou mídia de terceiros.

## Prévia imediata (sem npm)

Abra **`preview.html`** diretamente no navegador após extrair o ZIP. Ela usa as mesmas seções, fotos e CSS da aplicação e inclui uma versão simplificada das interações em JavaScript nativo; não precisa de servidor ou instalação. **Para usar as animações GSAP completas, execute o projeto Vite** com `npm install` e `npm run dev`.
