# PDVMix — Vendas e Gestão

PWA (Progressive Web App) offline-first para gestão de pequenos negócios, com módulos
independentes dentro da mesma conta: **Açaí/Sorveteria**, **Marmitas congeladas** e
**Temporada** (locação por temporada — módulo "Apê Guarujá").

Tudo roda em um único arquivo `index.html` (HTML + CSS + JS inline, sem dependências
externas), com persistência local criptografada (localStorage + IndexedDB) e
funcionamento offline via Service Worker (`sw.js`, estratégia network-first).

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

### v1.22.1 — Correções no Programa de Fidelidade
- Corrigido: os carimbos das últimas colunas do Cartão Fidelidade (o "5"
  e o "10", por exemplo) apareciam cortados na lateral do card, e os
  círculos saíam ovalados em vez de redondos — a grade de carimbos agora
  sempre cabe na largura do cartão e fica perfeitamente circular,
  inclusive em cartões configurados com mais de 10 carimbos.
- Corrigido: em telas estreitas, ao focar um campo dentro de qualquer
  modal/formulário (como "Editar cliente") com o teclado aberto, a tela
  podia rolar sozinha para baixo e "travar" perto do rodapé, dificultando
  voltar para campos como WhatsApp/telefone. O ajuste automático de rolagem
  ao focar um campo agora é ignorado dentro de modais, que já têm seu
  próprio mecanismo de acompanhar o teclado.

### v1.22.0 — Programa de Fidelidade (Cantinho do Açaí)
- Botão "Adicionar cliente" na tela de Nova venda, com busca de clientes
  já cadastrados e cadastro rápido (nome + WhatsApp) sem sair do checkout.
- Carimbo automático a cada venda vinculada a um cliente, respeitando um
  valor mínimo de compra configurável (padrão: qualquer valor).
- Cartão de fidelidade por cliente (acessível pela lista de Clientes),
  com o nome do cliente impresso no próprio cartão ("uso pessoal e
  intransferível"), histórico de carimbos e prêmio configurado.
- Ao completar o cartão, a loja marca "prêmio entregue" e um novo cartão
  começa na hora; o cadastro guarda quantos cartões já foram completados
  e a data do último resgate.
- Aviso "quase lá" na lista de Clientes quando faltam poucos carimbos
  (limite configurável) — o envio pelo WhatsApp continua manual, com
  mensagem pronta e editável antes de confirmar.
- Configurações do programa (carimbos para completar, valor mínimo,
  prêmio, limite do aviso, modelo da mensagem) em Ajustes → Fidelidade.
- Recurso exclusivo do modo Açaí/Sorveteria — Marmitas e Temporada não
  são afetados.

### v1.21.0 — Feriados e datas especiais na Agenda
- Motor de feriados válido para qualquer ano: datas fixas + datas móveis
  calculadas a partir da Páscoa (algoritmo de Gauss/Meeus — Carnaval,
  Sexta-feira Santa, Corpus Christi).
- Cobre feriados nacionais, o feriado estadual de SP (9 de julho) e o
  aniversário de Guarujá (30 de junho), além de datas de alta relevância
  turística para o litoral (Carnaval, Corpus Christi, véspera de Ano-Novo).
- Dias de feriado ganham um indicador discreto no canto da célula da Agenda,
  sem conflitar com o bloco vermelho de dia ocupado.
- Ao selecionar um dia de feriado, um aviso mostra o nome e o tipo (feriado
  nacional / estadual / municipal / ponto facultativo).
- Legenda da Agenda ganhou o item "Feriado".
- Uso apenas informativo/visual — o PDVMix não altera preços automaticamente;
  a decisão de ajustar a diária em período de feriado continua com quem
  administra o imóvel.

### v1.20.0 — Agenda com dias ocupados em bloco + parcelamento semanal
- Dias com reserva confirmada na Agenda agora aparecem com o bloco inteiro em
  vermelho (antes era só um número em azul escuro), facilitando a
  visualização de quais dias já estão locados.
- Parcelamento no cartão de crédito ganhou periodicidade: mensal (a cada 30
  dias) ou semanal (a cada 7 dias), com as datas de cada parcela calculadas
  de trás para frente a partir do check-in — garantindo que tudo fique pago
  até a entrada do hóspede no imóvel.
- Aviso automático quando alguma parcela calculada já estiver no passado.

### v1.19.0 — Pendências clicáveis + parcelamento no cartão
- O card "Pendências" do painel Início virou um botão: ao tocar, leva direto
  para a aba Financeiro e rola até a lista de pagamentos pendentes.
- Forma de pagamento "Crédito" ganhou campo de quantidade de parcelas (1x a
  12x), com selo "Crédito Nx" visível no card da reserva.

### v1.18.0 — Upgrade visual do módulo de temporada
- Banner de destaque e atalhos rápidos no painel Início do módulo.
- Controle de despesas do imóvel (`DB.rentalExpenses`) com gráfico dos
  últimos 6 meses.
- Filtros por status na lista de reservas.
- Legenda de check-in/check-out na Agenda e card de capa do imóvel.
- Correções de layout (grid quebrando em telas estreitas) e de cor
  (contraste do selo de canal de reserva).

## Publicação (GitHub Pages)

1. Suba os arquivos deste pacote (`index.html`, `sw.js`, `manifest.json`,
   `README.md`, `.nojekyll`, a pasta `assets/` — que a partir da v1.22.0
   inclui também `acai-logo.png`, usado no cartão de fidelidade — e, se
   aplicável, `CNAME`) para a raiz do repositório/branch publicado pelo
   GitHub Pages. Os demais arquivos que já estavam na pasta `assets/` do
   site publicado (ícones, logo padrão do PDVMix) continuam no lugar;
   este pacote só acrescenta o novo arquivo do logo do açaí.
2. O `.nojekyll` evita que o GitHub Pages tente processar o site com Jekyll
   (necessário porque o projeto usa pastas começando com `_`/arquivos que o
   Jekyll ignoraria por padrão).
3. Se o site usa um domínio próprio, mantenha o arquivo `CNAME` (uma linha,
   só o domínio) na raiz — ele não faz parte deste pacote porque o domínio
   não estava disponível nesta recuperação; veja o aviso no final da entrega.
4. O Service Worker (`sw.js`) usa estratégia *network-first*: tenta sempre
   buscar a versão publicada e só usa o cache quando a rede falha. A versão
   do cache (`CACHE` no topo do arquivo) muda a cada release para evitar que
   usuários fiquem presos numa versão antiga offline.
