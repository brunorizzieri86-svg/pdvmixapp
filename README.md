# PDVMix — Vendas e Gestão

PWA (Progressive Web App) offline-first para gestão de pequenos negócios, com módulos
independentes dentro da mesma conta: **Açaí/Sorveteria**, **Marmitas congeladas**,
**Temporada** (locação por temporada — módulo "Apê Guarujá") **FreteMix** (cálculo de fretes) e **Investimentos**.

Tudo roda em um único arquivo `index.html` (HTML + CSS + JS inline), com persistência local
criptografada (localStorage + IndexedDB) e funcionamento offline via Service Worker (`sw.js`,
estratégia network-first). O FreteMix é a exceção de conectividade: precisa de internet para
consultar rotas.

## Módulo Investimentos

Quinto tipo de negócio, com cinco abas:

- **Início** — patrimônio da carteira, índices do dia (Selic, CDI, IPCA 12m, juro real), ranking
  "quanto rende R$ X em 12 meses" e leitura do mercado.
- **Simular** — valor inicial, aporte mensal, prazo e cenário de juros (atuais, queda de 2 p.p.,
  alta de 1 p.p. ou expectativa Focus). Compara Tesouro Selic, CDB, LCI/LCA, Tesouro IPCA+,
  Tesouro Prefixado, FIIs, ações e poupança, líquido de IR (tabela regressiva calculada aporte a
  aporte) e custódia B3; retorno em 1, 6 e 12 meses e no prazo, gráfico e "quanto aportar para
  chegar a R$ X".
- **Estratégia** — distribuição por perfil, objetivo, prazo e reserva de emergência, ajustada pela
  leitura do mercado (juro real, inflação vs. meta, Focus). Registra os aportes na carteira.
- **Carteira** — aportes e valor estimado hoje (líquido de IR).
- **Mercado** — índices, botão Atualizar, edição manual de índices e taxas dos produtos.

**Atualização:** Selic, CDI, IPCA e Focus vêm da API pública do Banco Central (SGS 432, 4389,
13522, 433 e Olinda), ao abrir o app (dados com mais de 6 h) e ao voltar ao primeiro plano.
Offline, usa os últimos valores salvos. As taxas dos produtos são referências **editáveis**.
Conteúdo educativo; não é recomendação de investimento. Dados em `DB.invest`.

## Módulo FreteMix (cálculo de fretes)

Criado como um novo tipo de negócio ("Escolha o modelo do negócio" ou *Adicionar negócio*),
com dados próprios em `DB.freight` (configuração, frota e histórico), criptografados junto
com o restante do banco.

**Telas:** Início (resumo e atalhos), Calcular, Histórico, Frota, Tarifas e Ajustes (engrenagem).

**Rota (Google Maps):** usa a *Routes API* do Google com chave própria do usuário (Ajustes →
Google Maps → "Como criar a chave"): distância, tempo e pedágios (`extraComputations: TOLLS`).
O pedágio devolvido é para carro de passeio e é multiplicado pela categoria do veículo.
A rota é reaproveitada enquanto origem/paradas/destino não mudam (economiza chamadas).
Sem chave, funciona em **modo gratuito** (Nominatim + OSRM, sem pedágio — estimado por R$/km).
Autocompletar de endereços (Places API New) é opcional; CEP é resolvido pelo ViaCEP.

**Lotação (veículo dedicado):** combustível (km/l × preço), pedágio, manutenção/pneus por km,
motorista e custos fixos por diária (prazo calculado pela jornada — Lei 13.103/2015: pausa de
30 min a cada 5h30 e descanso de 11 h), ajudantes, seguro e GRIS sobre a NF, retorno vazio
opcional, margem e impostos "por dentro" (valor ÷ (1 − %)). Compara com o **piso mínimo da
ANTT** (distância × CCD + CC) quando os coeficientes oficiais estão preenchidos em
Tarifas → Piso ANTT — os coeficientes **não vêm pré-preenchidos** porque mudam com o diesel;
preencha com a tabela vigente. Alerta de capacidade e sugestão de veículo.

**Fracionado (tabela de transportadora):** peso taxado (maior entre peso real e cubagem —
fator padrão 300 kg/m³), frete peso por faixa de distância × multiplicador por faixa de peso
(com mínimo), frete valor, GRIS, pedágio rateado por 100 kg, taxa administrativa, coleta e
entrega opcionais, desconto/acréscimo e impostos. Os valores iniciais são **ilustrativos**:
substitua pela tabela real da transportadora.

**Histórico:** salvar cotações, repetir, excluir, enviar resumo por WhatsApp (sem custos
internos), copiar e exportar CSV.

**Valores iniciais de referência (todos editáveis):** diesel S10 R$ 7,35/L e gasolina
R$ 6,55/L (média nacional ANP, semana de 27/09 a 03/10/2026), frota de 10 veículos (moto a
bitrem), margem 20% e impostos 12%.

## Módulo Temporada (Apê Guarujá)

Administra a locação por temporada de um imóvel: cadastro do imóvel, ficha de
reserva (hóspede, check-in/check-out, diária, taxa de limpeza, desconto, total
calculado ao vivo, caução, forma de pagamento, status), checagem de conflito de
datas, Agenda com calendário de ocupação, Financeiro (receita, despesas do
imóvel, a receber/a pagar) e cadastro de Hóspedes (reaproveita a ficha de
clientes do PDVMix).

## Módulo Cantinho do Açaí — Programa de Fidelidade

Cartão de carimbos por cliente: ao vincular uma venda a um cliente
cadastrado (botão "Adicionar cliente" na tela de Nova venda, com cadastro
rápido embutido), o PDVMix soma um carimbo automaticamente — respeitando
um valor mínimo de compra configurável. O cartão, com o nome do cliente
impresso (uso pessoal e intransferível), o histórico de carimbos e o
prêmio configurado, fica disponível a partir da lista de Clientes. Ao
completar o cartão, a loja marca o prêmio como entregue e um novo cartão
começa na hora — o cadastro guarda quantos cartões o cliente já completou.
Clientes perto de completar (conforme o limite configurado) ganham um
aviso "quase lá" na lista; o lembrete é sempre enviado manualmente pelo
WhatsApp, com a mensagem pronta mas totalmente editável antes do envio.
Configurações (carimbos para completar, valor mínimo, prêmio, limite do
aviso e modelo da mensagem) ficam em Ajustes → Fidelidade. Recurso
exclusivo do modo Açaí/Sorveteria — não afeta Marmitas nem Temporada.

## Histórico de versões

### v1.24.0 — Novo módulo Investimentos
- Simulador, estratégia de carteira, carteira e mercado, com taxas atualizadas pelo Banco Central.
- Não altera Açaí, Marmitas, Temporada nem FreteMix.

### v1.23.4 — Diagnóstico do aparelho + iPhone sem desfoque
- Novo **Diagnóstico do aparelho** (Ajustes e também na tela de login, sem precisar entrar): mostra aparelho e navegador, se está no app instalado ou numa aba, tamanho do banco e onde está gravado, espaço disponível, armazenamento persistente, última gravação, pontos de segurança e último backup. Botão **Testar** (grava e lê no IndexedDB, no localStorage e testa a criptografia) e botões **Copiar** e **WhatsApp** para enviar o relatório.
- No iPhone/iPad, a barra de cima e o menu de baixo deixam de usar `backdrop-filter` (desfoque), que pode piscar ao rolar. O visual não muda, pois o fundo já era quase opaco.

### v1.23.3 — Acesso: ver senha, erros claros e trazer backup na tela inicial
- Botão de **olho** (mostrar/ocultar senha) no login e na criação do acesso. Os campos de e-mail e senha não capitalizam nem autocorrigem no iPhone.
- Mensagens de erro específicas: "Senha incorreta" ou "Este e-mail não é o cadastrado aqui (ju***@…)". Na 2ª falha seguida abre a ajuda "Não consegue entrar?".
- Tela inicial (sem acesso criado) ganhou **"Já uso o PDVMix — trazer meus dados de um backup"**: carrega o arquivo de backup, cria o novo e-mail e senha e restaura tudo de uma vez. Útil porque o app instalado na tela inicial do iPhone guarda dados separados do Safari e nasce vazio.

### v1.23.2 — Lançar vendas de dias anteriores
- Nova opção em **Ajustes › Lançar dias anteriores** (desligada por padrão). Ligada, a **Nova venda** ganha o campo **Data da venda** (Hoje / Ontem / 2 dias atrás / calendário).
- A venda grava a data escolhida, baixa o estoque, soma carimbo de fidelidade e aparece nos relatórios do dia escolhido. **Não** entra no caixa aberto hoje. Data futura não é aceita. Um aviso amarelo mostra que a venda é de outro dia.

### v1.23.1 — Correção: "armazenamento cheio" ao salvar (iPhone)
- O banco principal passou do `localStorage` (limite de ~5 MB no Safari/iOS, independente do espaço livre do aparelho) para o **IndexedDB**, que usa o espaço livre real.
- Migração automática na primeira abertura: copia o banco, confere a leitura, cria um ponto de segurança "antes da migração" e só então remove a cópia antiga. Se o IndexedDB falhar, o app volta a gravar no localStorage (contingência).
- Corrigido erro de codificação (`RangeError`) ao gravar bancos maiores: a conversão para base64 passou a ser feita em blocos. Era o que fazia o salvamento falhar com a mensagem de armazenamento cheio.
- "Apagar tudo" também limpa o banco no IndexedDB.

### v1.23.0 — Módulo FreteMix
- Novo tipo de negócio "FreteMix — Cálculo de fretes" (tema azul/laranja), disponível no
  cadastro inicial, em *Adicionar negócio* e na galeria de módulos.
- Cotação de lotação e fracionado com rota, pedágio e tempo pelo Google Routes API
  (chave do usuário) ou modo gratuito; peso, cubagem, combustível, impostos, piso ANTT,
  histórico, WhatsApp e CSV.
- Frota editável, tarifas editáveis (geral, lotação, fracionado, ANTT) e guia de criação da
  chave do Google dentro do app.
- Os demais módulos não foram alterados.

### v1.22.3 — Confiabilidade ao finalizar venda e fechar caixa
- Salvamento local que falha (ex.: armazenamento do aparelho cheio, comum no Safari/iOS) agora
  avisa claramente e desfaz a alteração em memória em: finalizar venda, abrir/fechar caixa e
  entrada/saída de caixa. Rede de segurança geral para qualquer salvamento sem aviso próprio.
- Botão "Nova venda" do aviso de venda concluída passou a se chamar "Fechar pedido".

### v1.22.2 — Correção definitiva do travamento de tela com teclado
- O cartão/formulário (painel que desliza de baixo) agora também respeita o espaço acima do
  teclado, como o fundo do modal já fazia. Vale para todos os formulários do app.

### v1.22.1 — Correções no Programa de Fidelidade
- Carimbos do Cartão Fidelidade não são mais cortados nem ovalados; grade sempre cabe no cartão.
- Ao focar um campo dentro de modal com o teclado aberto, a rolagem automática é ignorada.

### v1.22.0 — Programa de Fidelidade (Cantinho do Açaí)
- Botão "Adicionar cliente" na Nova venda, carimbo automático, cartão por cliente, prêmio,
  aviso "quase lá" e configurações em Ajustes → Fidelidade. Exclusivo do modo Açaí/Sorveteria.

### v1.21.0 — Feriados e datas especiais na Agenda
- Motor de feriados para qualquer ano (fixos + móveis pela Páscoa), nacionais, estadual de SP,
  aniversário de Guarujá e datas turísticas. Indicador discreto na Agenda; uso informativo.

### v1.20.0 — Agenda com dias ocupados em bloco + parcelamento semanal
- Dias com reserva confirmada em bloco vermelho; parcelamento no crédito mensal ou semanal,
  calculado de trás para frente a partir do check-in.

### v1.19.0 — Pendências clicáveis + parcelamento no cartão
- Card "Pendências" leva ao Financeiro; crédito com 1x a 12x e selo "Crédito Nx".

### v1.18.0 — Upgrade visual do módulo de temporada
- Banner e atalhos, despesas do imóvel com gráfico de 6 meses, filtros de reservas,
  legenda da Agenda e correções de layout/contraste.

## Publicação (GitHub Pages)

1. Suba os arquivos deste pacote (`index.html`, `sw.js`, `manifest.json`, `README.md`,
   `.nojekyll`, `CNAME`) para a raiz do repositório publicado. A pasta `assets/` (ícones e
   logos) continua a que já está no site.
2. O `.nojekyll` evita que o GitHub Pages processe o site com Jekyll.
3. Mantenha o `CNAME` (domínio próprio `pdvmixapp.com.br`) na raiz.
4. O Service Worker usa *network-first*; a versão do cache (`CACHE` em `sw.js`) muda a cada
   release para ninguém ficar preso numa versão antiga.
5. **FreteMix:** na Google Cloud, restrinja a chave de API ao site `https://pdvmixapp.com.br/*`
   e à Routes API (e Places API New, se usar o autocompletar).
