# PDVMix PWA v1.14.0

## Atualização automática corrigida

Esta versão NÃO usa página manual `atualizar.html`.

O mecanismo foi alterado para o mesmo princípio usado nos outros PWAs estáveis:

- Service Worker em estratégia **Network-First**.
- Ao existir internet, `index.html`, manifesto e arquivos do app são buscados na rede antes do cache.
- O cache é usado apenas como fallback offline.
- `skipWaiting()` ativa a versão nova imediatamente.
- `clients.claim()` faz o novo Service Worker assumir as abas abertas.
- O `index.html` chama `registration.update()` ao abrir o app.
- Nova verificação acontece quando a internet volta e quando o app retorna do segundo plano.
- Quando um Service Worker novo assume o controle, o PDVMix recarrega uma única vez automaticamente.
- Caches antigos são removidos somente se começarem por `pdvmix-`.

## Módulos confirmados

Na primeira configuração devem aparecer:

1. 🍧 **Açaíteria / Sorveteria / Lanchonete**
2. 🍱 **Marmitas congeladas**

A mesma conta também suporta múltiplos negócios/workspaces.

## GitHub Pages

Suba os arquivos DESCOMPACTADOS diretamente na raiz do repositório:

- `index.html`
- `sw.js`
- `manifest.json`
- `CNAME`
- `.nojekyll`
- pasta `assets/`

Não é necessário limpar cache manualmente nem abrir URL especial de atualização.

Domínio configurado: `pdvmixapp.com.br`

## Melhorias móveis reaproveitadas do app de referência

- VisualViewport usado apenas em autenticação e modais.
- Campos continuam acessíveis quando o teclado Android/iPhone abre.
- O listener não fica recalculando as telas principais durante a rolagem, evitando jank.


## v1.14.0

- Tutorial interativo nos dois módulos: abre a tela/cadastro real para aprender fazendo.
- Preview do logo corrigido e aplicado imediatamente.
- Fotos de produto sem corte (`object-fit: contain`) e padronização local automática com enquadramento, tentativa de remoção do fundo simples e fundo neutro.
- Ajustes reorganizados; “Meus negócios e módulos” foi movido para o final e os botões foram alinhados.
- Botões primários de Marmitas com contraste corrigido.
- Barra inferior de Marmitas e Açaí revisada para telas estreitas, sem corte dos itens.
- Mantido PWA offline-first com atualização Network-First.
