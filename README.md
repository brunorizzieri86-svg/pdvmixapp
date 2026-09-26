# PDVMix PWA v1.16.0

## Self-service simplificado

O fluxo padrão foi alterado para acompanhar lojas que já usam balança configurada com preço/kg.

### Novo fluxo
1. Cadastre apenas o nome da modalidade:
   - Açaí self-service
   - Sorvete self-service
   - Buffet / outros
2. Na tela Vender, toque em **Self-service / Balança**.
3. Digite somente o **valor final mostrado na balança**.
4. Toque em **Adicionar ao pedido**.
5. O self-service pode ser misturado com qualquer outro produto e usa os mesmos pagamentos, caixa e financeiro.

### Exemplo
Balança mostra **R$ 18,70** → PDVMix recebe **R$ 18,70**.

### Modo avançado
O cálculo antigo por peso não foi apagado. Ele ficou opcional em:
**Ajustes → Self-service / Balança → Modo avançado por peso**.

Esse modo serve para estabelecimentos cuja balança mostra somente gramas e precisam que o PDVMix calcule:
peso líquido × preço/kg, incluindo tara e custo/kg.

### Compatibilidade
- Vendas antigas por peso continuam preservadas.
- Relatórios reconhecem tanto vendas antigas por peso quanto o novo modo por valor.
- CSV financeiro identifica “valor da balança”.
- PWA offline-first mantido.
- Atualização automática pelo Service Worker mantida.

Cache: `pdvmix-v1.16.0`
