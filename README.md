# PDVMix PWA v1.20.0

> **Nota sobre este README:** o arquivo que o Claude recebeu deste repositório estava parado na v1.6.0. As versões 1.7.0 a 1.16.0 (modo self-service avançado com múltiplos perfis de peso, modo "Marmitas congeladas", sistema de múltiplos negócios/workspaces no mesmo login, busca de CEP, confirmação por WhatsApp, service worker Network-First) foram desenvolvidas em outras sessões e não estão documentadas abaixo. Se o seu repositório já tem um README mais completo cobrindo essas versões, substitua este arquivo pelo seu e cole apenas a seção da v1.17.0 ao final dele.


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


## Tutorial guiado v1.6.0

- Tutorial completo embutido com progresso salvo no aparelho.
- Abertura automática uma única vez para novos/atuais usuários após a atualização.
- Índice por assunto para acesso direto a vendas, estoque, caixa, financeiro, cadastros, combos e backup.
- Passo específico de instalação PWA com botão **Instalar PDVMix agora** e instruções para Android, iPhone/iPad e Desktop.
- Central **Ajuda e aprendizado** em Ajustes para rever o tutorial, abrir o índice ou instalar o app.



## v1.17.0 — Módulo "Temporada & Hospedagem" (locação por temporada)

Terceiro tipo de negócio do PDVMix, ao lado de "Açaíteria/Sorveteria" e "Marmitas congeladas". Reaproveita 100% do sistema de contas já existente: **mesmo login, mesma senha** — o tipo de negócio é escolhido no primeiro cadastro (ou ao adicionar um novo negócio em Ajustes → "Adicionar negócio"), sem exigir conta separada.

Feito para quem administra locação de apartamento, casa, chácara ou studio por temporada (uso real: apartamento de praia em Guarujá).

### O que o módulo cobre
- **Reservas**: hóspede responsável (reaproveita o cadastro de Clientes, renomeado para "Hóspedes" neste modo), lista de acompanhantes com nome e documento, check-in e check-out (as diárias são calculadas automaticamente a partir das duas datas, nunca digitadas à mão), valor da diária, taxa de limpeza, desconto, forma de pagamento, canal da reserva (direto, Airbnb, Booking.com, indicação, WhatsApp, Instagram) e status (pré-reserva, confirmada, cancelada — "em andamento" e "concluída" são calculados automaticamente pela data, não exigem ação manual).
- **Sinal, saldo e caução**: o sinal e o saldo são rastreados separadamente, cada um com seu próprio "Recebido". A caução/depósito reembolsável é só anotada — nunca entra no total da locação nem na receita.
- **Bloqueio de conflito de datas**: o aplicativo recusa salvar uma reserva cujas datas se sobrepõem a outra reserva não cancelada do mesmo imóvel. Um check-in no mesmo dia do check-out de outra reserva é permitido (troca de hóspede no mesmo dia).
- **Agenda**: calendário mensal mostrando quantas reservas tocam cada dia, com lista detalhada do dia selecionado, noites ocupadas e taxa de ocupação do mês.
- **Financeiro**: receita do mês (pelas reservas com check-in no mês corrente) e lista de pagamentos pendentes (sinal e/ou saldo), com botão para marcar cada um como recebido.
- **Meu imóvel** (em Ajustes): nome, tipo (apartamento/casa/chácara-sítio/studio/outro), endereço com busca automática por CEP, diária e taxa de limpeza padrão (usadas para pré-preencher cada nova reserva, mas editáveis por reserva para temporada alta), horário de check-in/check-out.
- **Confirmação por WhatsApp**: gera uma mensagem pronta com as datas, pessoas, valores e status de pagamento, usando o WhatsApp já cadastrado do hóspede.
- Tema visual próprio (tons de azul-petróleo/oceano) para diferenciar das telas de açaí (roxo) e marmitas (verde), seguindo o mesmo mecanismo de variáveis CSS por `body.rental-business` que o modo marmitas já usava.

### O que foi propositalmente deixado fora da v1.17.0 (resolvido ou ainda pendente, ver v1.18.0 abaixo)
- Múltiplos imóveis por negócio (continua de fora — crie um negócio por imóvel em "Adicionar negócio" para administrar vários).
- Geração de contrato/recibo em PDF (ainda fora).
- Passo dedicado no tutorial guiado (ainda fora).

### Compatibilidade
Sem migração: bancos e backups das versões anteriores (açaí e marmitas) abrem normalmente. Nenhum dado de outros negócios é alterado ao criar um negócio de locação.


## v1.18.0 — Mega upgrade visual do módulo "Temporada & Hospedagem"

Reformulação visual e funcional de todas as telas do módulo de locação, com fotos reais, gráficos financeiros e um controle de despesas que não existia antes.

### Início (painel)
- Banner de capa com foto do imóvel, nome e tipo sobrepostos.
- 4 botões de ação rápida: Nova reserva, Novo hóspede, Agenda, Nova despesa.
- Gráfico de receita × despesa dos últimos 6 meses (os mesmos dados do Financeiro, em miniatura).

### Financeiro — despesas e lucro (novidade real, não só visual)
- **Nova funcionalidade: controle de despesas da locação** (`DB.rentalExpenses`), com data, categoria (limpeza, manutenção, condomínio, IPTU/impostos, internet/TV, outros), descrição e valor. Criar, editar e excluir, igual às reservas.
- Três indicadores no topo: **Receita do mês**, **Despesas do mês** e **Lucro do mês** (receita − despesas, em verde ou vermelho conforme o sinal).
- Gráfico de barras (receita em azul-petróleo, despesa em vermelho) dos últimos 6 meses, desenhado em SVG puro — sem bibliotecas externas, consistente com o resto do app sendo 100% offline.
- A seção de pagamentos pendentes (sinal/saldo) continua exatamente como na v1.17.0.

### Reservas
- Filtros por chip: Todas / Confirmadas / Pendentes / Canceladas.
- Cards com avatar colorido (iniciais do hóspede) e canal da reserva em destaque.

### Agenda
- Legenda visual: dia de **check-in** (barra verde), dia de **check-out** (barra laranja), dia **ocupado** no meio da estadia (número em roxo).

### Hóspedes
- Avatares com iniciais coloridas no lugar do ícone genérico (cor sempre igual para o mesmo nome).

### Ajustes
- Card de capa do imóvel com foto, nome, tipo e diária, no topo da seção "Meu imóvel". Atualiza sozinho ao salvar.

### Fotos incluídas
Duas fotos de praia fornecidas pelo usuário foram comprimidas (JPEG, qualidade 72, redimensionadas) e embutidas em base64 — sem link externo, sem dependência de internet:
- Capa do painel inicial: foto de coqueiros e mar turquesa.
- Capa do imóvel em Ajustes: foto de guarda-sol e cadeiras de praia.

### Correção encontrada durante o desenvolvimento
Nomes de hóspede longos (ex.: "Fernanda Rocha de Souza Lima") faziam o card da reserva estourar a largura da tela em celulares pequenos (320–360 px) — um "grid blowout" clássico de CSS, não relacionado ao texto em si. Corrigido com truncamento (reticências) no nome e `min-width:0` no card.

### O que continua fora desta versão
- Múltiplos imóveis por negócio.
- Geração de contrato/recibo em PDF.
- Passo dedicado no tutorial guiado para o módulo de locação.

### Compatibilidade
Sem migração: dados de reservas, hóspedes e do imóvel das versões anteriores abrem normalmente. `DB.rentalExpenses` começa vazio para quem já tinha o módulo.


## v1.19.0 — Pendências ativas e parcelamento no cartão

Dois ajustes pedidos depois de usar o app no dia a dia.

### Card "Pendências" agora é clicável
No painel inicial, o card **Pendências** (que mostra quantas reservas têm saldo em aberto) deixou de ser só um número — agora é um botão. Tocar nele leva direto para **Financeiro** já rolado até a seção "Pagamentos pendentes", mostrando exatamente quais reservas estão com saldo ou sinal em aberto, prontas para marcar como recebidas. Com 0 pendências, o botão continua funcionando normalmente e mostra "Tudo em dia".

### Parcelamento no cartão de crédito
Ao escolher **Crédito** como forma de pagamento de uma reserva, aparece um campo novo — **Parcelas no cartão** — com opções de 1x (à vista) até 12x. Esse número fica salvo na reserva e aparece como um selinho no card da lista (ex.: "Crédito 3x"), para lembrar depois como aquele pagamento foi combinado.

Importante: o PDVMix **apenas registra** a informação de parcelamento — ele não calcula juros da operadora nem altera o valor total da reserva. O parcelamento é feito na maquininha/conta do hóspede; aqui fica só a anotação de quantas vezes ficou combinado.

Débito, Pix, transferência e dinheiro continuam sem esse campo (são sempre à vista). Se você trocar a forma de pagamento de Crédito para outra depois de já ter escolhido parcelas, o número de parcelas volta para 1 automaticamente ao salvar.

### Compatibilidade
Sem migração: reservas já existentes continuam funcionando normalmente, com parcelamento assumido como 1x (à vista) por padrão.


## v1.20.0 — Agenda mais visual e parcelamento programado

### Dias locados em vermelho na Agenda
Antes, um dia com reserva só mostrava um numerozinho pequeno no canto — fácil de passar batido numa olhada rápida. Agora, **todo dia dentro do período de uma reserva ativa fica com o bloco inteiro vermelho**, do check-in até a véspera do check-out. O dia de check-in mantém a barra verde na lateral e o de check-out a barra laranja — por cima do vermelho quando for o caso — então dá pra saber de relance não só "está ocupado" como também "hoje é dia de entrada" ou "hoje é dia de saída". O dia de check-out em si fica neutro (sem vermelho): como o hóspede já libera o imóvel de manhã, aquela noite não está mais ocupada — útil para já visualizar que dá para encaixar uma nova entrada no mesmo dia.

### Cronograma de parcelas com datas e periodicidade
O parcelamento no cartão (adicionado na v1.19.0) ganhou uma camada: quando a reserva tem **mais de 1 parcela**, aparece um seletor de **Periodicidade** — Mensal (a cada 30 dias) ou Semanal (a cada 7 dias) — e logo abaixo, as **datas de cada parcela já calculadas**, sempre terminando exatamente no dia do check-in. Isso resolve o caso de reservas feitas com antecedência: em vez de depender só do parcelamento padrão do cartão (mês a mês), dá para combinar com o hóspede um plano de pagamentos semanais que termina quando ele entra no imóvel — por exemplo, uma reserva fechada hoje para daqui a um mês pode ser paga em parcelas semanais até a data de entrada, em vez de uma parcela mensal só.

Pontos importantes:
- As datas são só uma referência de planejamento — o PDVMix não envia cobranças nem lembretes automáticos nessas datas, e não calcula juros.
- Mudar o check-in da reserva recalcula as datas das parcelas automaticamente.
- Se o check-in estiver muito próximo para caber todas as parcelas com a periodicidade escolhida, aparece um aviso informando que alguma data calculada já passou, para o anfitrião ajustar o número de parcelas ou trocar a periodicidade.

### Compatibilidade
Sem migração: reservas existentes continuam normalmente, com periodicidade assumida como mensal por padrão (sem efeito prático em reservas com 1 parcela ou que não usam crédito).

## Publicação

Pacote preparado para GitHub Pages com domínio `pdvmixapp.com.br` (`CNAME` + `.nojekyll`).
