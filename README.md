# PDVMix PWA v1.15.0 — Proteção de Dados

## Nova Central de Proteção (Açaí + Marmitas)

- Cópia interna automática em IndexedDB, separada do armazenamento principal.
- Verificação de integridade dos registros na abertura.
- Pontos de restauração automáticos: **7 diários + 4 semanais + 6 mensais**.
- Pontos manuais e ponto de segurança antes de restaurar/importar.
- Recuperação a partir da cópia interna.
- Solicitação de armazenamento persistente ao navegador quando suportado.
- Indicador de risco pelo tempo e quantidade de alterações desde o último backup externo.
- Lembrete automático quando o backup externo fica antigo.
- Backup completo externo continua incluindo **todos os negócios, dados, logos e fotos**.
- Recuperação preliminar: se localStorage sumir e a cópia interna continuar disponível, o PDVMix restaura o acesso local antes de mostrar a tela de login.

### Importante sobre automação
Os pontos diário/semanal/mensal são criados automaticamente na primeira abertura/alteração daquele período. Navegadores não garantem execução de um PWA completamente fechado em segundo plano. Da mesma forma, salvar silenciosamente arquivos no Google Drive/Downloads sem interação do usuário não é permitido de forma confiável em Android, iPhone e desktop; por isso o backup externo permanece um toque, com lembretes.

Cache do PWA: `pdvmix-v1.15.0`.
- No celular, o backup completo oferece compartilhamento pelo menu nativo (Arquivos/Drive/WhatsApp quando suportado).
- Lembrete por risco e lembrete semanal discreto na segunda-feira quando houver alterações sem backup recente.
