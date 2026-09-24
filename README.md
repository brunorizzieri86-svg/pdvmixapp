# PDVMix PWA v1.7.0

## Compatibilidade responsiva
Esta versão foi adaptada para **Desktop/Notebook, Tablet, iPhone e Android**, mantendo o núcleo **PWA offline-first**.

- Desktop/notebook: navegação lateral, grade de produtos ampliada, carrinho fixo e modais centralizados.
- Tablet: grades e painel do PDV se reorganizam conforme portrait/landscape.
- iPhone/Android: barra inferior com rolagem segura em telas estreitas, suporte a safe-area/notch e campos com 16px para evitar zoom automático do Safari.
- Celulares compactos: cards e ações se reorganizam para preservar legibilidade e alvos de toque.
- Landscape em celular: cabeçalho e modais usam uma composição mais compacta.
- PWA: `manifest.json`, `service worker`, cache offline e instalação continuam preservados.

PDV offline-first para sorveterias, lojas de açaí e lanchonetes.

## Novidades da v1.3.0

- Todos os produtos da tela **Estoque** agora podem ser editados diretamente.
- Cada item do estoque ganhou ações rápidas: **Ajustar**, **Editar** e **Excluir**.
- Ao editar um produto é possível alterar nome, categoria, unidade, preço, custo, estoque, mínimo e imagem.
- Imagem do produto pode ser escolhida da galeria, capturada pela câmera ou removida.
- Exclusão preserva histórico financeiro quando o produto já teve vendas: o item é arquivado e deixa de aparecer no PDV, Estoque e Cardápio.
- Se um produto excluído fizer parte de combos, os combos dependentes são arquivados para impedir venda com composição inválida.
- Financeiro reorganizado para leitura mais rápida por cores:
  - **A RECEBER** em verde;
  - **A PAGAR** em vermelho;
  - compras em laranja;
  - despesas em vermelho;
  - caixa/fluxo em azul;
  - resultado positivo em verde e negativo em vermelho.
- Os **gráficos pizza** agora aparecem logo no início de **Financeiro > Visão geral**, abaixo dos quatro principais blocos financeiros.
- Mesmo sem vendas no período, o local do gráfico pizza permanece visível com um indicador de “Sem dados”.
- Gráficos pizza disponíveis para **formas de pagamento** e **vendas por categoria**.

## Recursos já existentes

- Pagamentos separados em Pix, crédito, débito, dinheiro e fiado.
- Dinheiro com valor recebido e cálculo automático de troco.
- Combos montados com produtos existentes, desconto em % ou R$, custo, lucro e margem.
- Compras, despesas, contas a receber, contas a pagar, caixa e relatórios por período.
- Dados locais com `localStorage` criptografado e imagens no IndexedDB.

## PWA / Offline

O aplicativo continua obrigatoriamente como PWA offline-first. `manifest.json` e `sw.js` fazem cache do núcleo do aplicativo. O PDV, estoque, cadastros e financeiro continuam disponíveis sem internet.

## Arquivos

- `index.html`
- `manifest.json`
- `sw.js`
- `assets/pdvmix-logo.png`
- `assets/icons/icon-192.png`
- `assets/icons/icon-512.png`

## Observação fiscal

O módulo Financeiro é gerencial. Emissão de NFC-e/NF-e, SAT/MFE, SPED, apuração tributária ou integração contábil oficial exigem módulo fiscal específico e integração conforme o estado/regime tributário.

## v1.4.0 — Caixa rápido e gestão completa de estoque
- Caixa agora possui botão próprio na barra fixa inferior.
- Atalho rápido de Caixa na tela inicial, com estado aberto/fechado.
- Estoque ganhou central de gerenciamento por item.
- Acesso explícito a editar cadastro, alterar imagem, movimentar estoque, histórico e excluir/arquivar.
- Cadastro de produto ampliado: SKU/código, código de barras, marca, fornecedor padrão, localização e descrição.
- Movimentação de estoque ampliada: entrada/compra, saída, perda, avaria, uso interno e correção de saldo.
- Entradas podem registrar fornecedor, custo unitário, documento, localização, data e atualizar o custo cadastrado.
- Filtros de estoque: todos, baixo, zerado e combos, com valor estimado do estoque.


## Tutorial guiado v1.7.0

- Tutorial completo embutido com progresso salvo no aparelho.
- Abertura automática uma única vez para novos/atuais usuários após a atualização.
- Índice por assunto para acesso direto a vendas, estoque, caixa, financeiro, cadastros, combos e backup.
- Passo específico de instalação PWA com botão **Instalar PDVMix agora** e instruções para Android, iPhone/iPad e Desktop.
- Central **Ajuda e aprendizado** em Ajustes para rever o tutorial, abrir o índice ou instalar o app.


## Publicação

Pacote preparado para GitHub Pages com domínio `pdvmixapp.com.br` (`CNAME` + `.nojekyll`).


## Novidades da versão 1.7.0 — Self-service por peso

- Venda por peso integrada ao mesmo pedido dos produtos normais.
- Múltiplas modalidades configuráveis (ex.: Açaí self-service e Sorvete self-service).
- Preço por kg, custo por kg e tara padrão independentes por modalidade.
- Cálculo: `(peso bruto - tara) / 1000 x preço por kg`, arredondado ao centavo.
- Atalho para usar tara 0 quando a balança já foi zerada com o recipiente.
- Várias pesagens no mesmo pedido; cada pesagem pode ser editada ou removida.
- Venda salva peso bruto, tara, peso líquido, preço/kg, custo/kg e valor calculado.
- Resumo das pesagens na conclusão da venda.
- Categoria Self-service nos gráficos financeiros.
- Indicadores de kg vendidos, faturamento self-service e margem quando o custo/kg estiver informado.
- Tutorial atualizado com a operação por peso.
