import type { Message } from '@/types/chat'
import { currentUser } from './users'

const ME = currentUser.id

export const mockMessages: Record<string, Message[]> = {
  // Carlos Mendes — unreadCount: 7
  '10a1b2c3-0001-4000-8000-100000000001': [
    { id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', conversationId: '10a1b2c3-0001-4000-8000-100000000001', senderId: ME, content: 'Oi Carlos, tudo bem? Conseguiu revisar o documento?', timestamp: '2026-04-23T10:00:00Z', isOutgoing: true },
    { id: '6ba7b810-9dad-41d1-80b4-00c04fd430c8', conversationId: '10a1b2c3-0001-4000-8000-100000000001', senderId: 'b2c3d4e5-1111-4000-8000-000000000001', content: 'Fala! Tudo certo sim, vou abrir aqui agora', timestamp: '2026-04-23T10:05:00Z', isOutgoing: false },
    { id: '7c9e6679-7425-40de-944b-e07fc1f90ae7', conversationId: '10a1b2c3-0001-4000-8000-100000000001', senderId: ME, content: 'Perfeito, sem pressa', timestamp: '2026-04-23T10:10:00Z', isOutgoing: true },
    { id: '550e8400-e29b-41d4-a716-446655440001', conversationId: '10a1b2c3-0001-4000-8000-100000000001', senderId: 'b2c3d4e5-1111-4000-8000-000000000001', content: 'Dei uma olhada no documento, ficou muito bom.\nSó precisa de uns ajustes pontuais na introdução.\nNo geral está bem estruturado!', timestamp: '2026-04-23T14:00:00Z', isOutgoing: false },
    { id: '550e8400-e29b-41d4-a716-446655440002', conversationId: '10a1b2c3-0001-4000-8000-100000000001', senderId: 'b2c3d4e5-1111-4000-8000-000000000001', content: 'Só fiz uns ajustes na seção de metodologia', timestamp: '2026-04-23T14:05:00Z', isOutgoing: false },
    { id: '550e8400-e29b-41d4-a716-446655440003', conversationId: '10a1b2c3-0001-4000-8000-100000000001', senderId: 'b2c3d4e5-1111-4000-8000-000000000001', content: 'Troquei alguns termos que estavam confusos', timestamp: '2026-04-23T14:10:00Z', isOutgoing: false },
    { id: '550e8400-e29b-41d4-a716-446655440004', conversationId: '10a1b2c3-0001-4000-8000-100000000001', senderId: 'b2c3d4e5-1111-4000-8000-000000000001', content: 'Adicionei os gráficos que faltavam também', timestamp: '2026-04-23T14:15:00Z', isOutgoing: false },
    { id: '550e8400-e29b-41d4-a716-446655440005', conversationId: '10a1b2c3-0001-4000-8000-100000000001', senderId: 'b2c3d4e5-1111-4000-8000-000000000001', content: 'A parte de conclusão precisa de uma revisão final', timestamp: '2026-04-23T14:20:00Z', isOutgoing: false },
    { id: '550e8400-e29b-41d4-a716-446655440006', conversationId: '10a1b2c3-0001-4000-8000-100000000001', senderId: 'b2c3d4e5-1111-4000-8000-000000000001', content: 'Você consegue revisar até amanhã de manhã?', timestamp: '2026-04-23T14:30:00Z', isOutgoing: false },
    { id: '550e8400-e29b-41d4-a716-446655440007', conversationId: '10a1b2c3-0001-4000-8000-100000000001', senderId: 'b2c3d4e5-1111-4000-8000-000000000001', content: 'Estou revisando agora, te mando em breve', timestamp: '2026-04-23T14:50:00Z', isOutgoing: false },
  ],

  // Luiz Ferreira — unreadCount: 7
  '20b2c3d4-0002-4000-8000-200000000002': [
    { id: '660e8400-e29b-41d4-a716-446655440010', conversationId: '20b2c3d4-0002-4000-8000-200000000002', senderId: ME, content: 'Luiz, viu a proposta que enviei ontem?', timestamp: '2026-04-23T09:00:00Z', isOutgoing: true },
    { id: '660e8400-e29b-41d4-a716-446655440011', conversationId: '20b2c3d4-0002-4000-8000-200000000002', senderId: 'c3d4e5f6-2222-4000-8000-000000000002', content: 'Vi sim, achei muito boa!', timestamp: '2026-04-23T13:30:00Z', isOutgoing: false },
    { id: '660e8400-e29b-41d4-a716-446655440012', conversationId: '20b2c3d4-0002-4000-8000-200000000002', senderId: 'c3d4e5f6-2222-4000-8000-000000000002', content: 'A abordagem do escopo ficou bem clara', timestamp: '2026-04-23T13:32:00Z', isOutgoing: false },
    { id: '660e8400-e29b-41d4-a716-446655440013', conversationId: '20b2c3d4-0002-4000-8000-200000000002', senderId: 'c3d4e5f6-2222-4000-8000-000000000002', content: 'Só tenho uma dúvida sobre o prazo de entrega', timestamp: '2026-04-23T13:35:00Z', isOutgoing: false },
    { id: '660e8400-e29b-41d4-a716-446655440014', conversationId: '20b2c3d4-0002-4000-8000-200000000002', senderId: 'c3d4e5f6-2222-4000-8000-000000000002', content: 'Será que conseguimos entregar até dia 15?', timestamp: '2026-04-23T13:38:00Z', isOutgoing: false },
    { id: '660e8400-e29b-41d4-a716-446655440015', conversationId: '20b2c3d4-0002-4000-8000-200000000002', senderId: 'c3d4e5f6-2222-4000-8000-000000000002', content: 'Também queria incluir o módulo de relatórios.\nAcho que faz sentido ter:\n- Dashboard de métricas\n- Exportação em PDF\n- Filtros por período', timestamp: '2026-04-23T14:00:00Z', isOutgoing: false },
    { id: '660e8400-e29b-41d4-a716-446655440016', conversationId: '20b2c3d4-0002-4000-8000-200000000002', senderId: 'c3d4e5f6-2222-4000-8000-000000000002', content: 'Acho que agrega bastante valor para o cliente', timestamp: '2026-04-23T14:20:00Z', isOutgoing: false },
    { id: '660e8400-e29b-41d4-a716-446655440017', conversationId: '20b2c3d4-0002-4000-8000-200000000002', senderId: 'c3d4e5f6-2222-4000-8000-000000000002', content: 'Concordo com a proposta, vamos agendar uma reunião', timestamp: '2026-04-23T14:50:00Z', isOutgoing: false },
  ],

  // Maria Silva — unreadCount: 5
  '30c3d4e5-0003-4000-8000-300000000003': [
    { id: '770e8400-e29b-41d4-a716-446655440020', conversationId: '30c3d4e5-0003-4000-8000-300000000003', senderId: ME, content: 'Maria, consegue participar da call amanhã?', timestamp: '2026-04-23T10:00:00Z', isOutgoing: true },
    { id: '770e8400-e29b-41d4-a716-446655440021', conversationId: '30c3d4e5-0003-4000-8000-300000000003', senderId: 'd4e5f6a7-3333-4000-8000-000000000003', content: 'Oi! Qual horário seria?', timestamp: '2026-04-23T12:00:00Z', isOutgoing: false },
    { id: '770e8400-e29b-41d4-a716-446655440022', conversationId: '30c3d4e5-0003-4000-8000-300000000003', senderId: 'd4e5f6a7-3333-4000-8000-000000000003', content: 'De manhã tenho outra reunião', timestamp: '2026-04-23T12:05:00Z', isOutgoing: false },
    { id: '770e8400-e29b-41d4-a716-446655440023', conversationId: '30c3d4e5-0003-4000-8000-300000000003', senderId: 'd4e5f6a7-3333-4000-8000-000000000003', content: 'Mas à tarde estou livre', timestamp: '2026-04-23T12:10:00Z', isOutgoing: false },
    { id: '770e8400-e29b-41d4-a716-446655440024', conversationId: '30c3d4e5-0003-4000-8000-300000000003', senderId: 'd4e5f6a7-3333-4000-8000-000000000003', content: 'Pode ser às 14h?', timestamp: '2026-04-23T12:15:00Z', isOutgoing: false },
    { id: '770e8400-e29b-41d4-a716-446655440025', conversationId: '30c3d4e5-0003-4000-8000-300000000003', senderId: 'd4e5f6a7-3333-4000-8000-000000000003', content: 'Claro! Estou disponível amanhã à tarde', timestamp: '2026-04-23T13:10:00Z', isOutgoing: false },
  ],

  // Ana Costa — unreadCount: 9
  '40d4e5f6-0004-4000-8000-400000000004': [
    { id: '880e8400-e29b-41d4-a716-446655440030', conversationId: '40d4e5f6-0004-4000-8000-400000000004', senderId: ME, content: 'Ana, como foi a reunião com o cliente?', timestamp: '2026-04-23T11:00:00Z', isOutgoing: true },
    { id: '880e8400-e29b-41d4-a716-446655440031', conversationId: '40d4e5f6-0004-4000-8000-400000000004', senderId: 'e5f6a7b8-4444-4000-8000-000000000004', content: 'Foi ótima! O cliente adorou a apresentação', timestamp: '2026-04-23T14:00:00Z', isOutgoing: false },
    { id: '880e8400-e29b-41d4-a716-446655440032', conversationId: '40d4e5f6-0004-4000-8000-400000000004', senderId: 'e5f6a7b8-4444-4000-8000-000000000004', content: 'Ele pediu algumas alterações pontuais', timestamp: '2026-04-23T14:05:00Z', isOutgoing: false },
    { id: '880e8400-e29b-41d4-a716-446655440033', conversationId: '40d4e5f6-0004-4000-8000-400000000004', senderId: 'e5f6a7b8-4444-4000-8000-000000000004', content: 'Principalmente na parte visual do dashboard', timestamp: '2026-04-23T14:10:00Z', isOutgoing: false },
    { id: '880e8400-e29b-41d4-a716-446655440034', conversationId: '40d4e5f6-0004-4000-8000-400000000004', senderId: 'e5f6a7b8-4444-4000-8000-000000000004', content: 'Quer que as cores sigam a identidade visual deles', timestamp: '2026-04-23T14:15:00Z', isOutgoing: false },
    { id: '880e8400-e29b-41d4-a716-446655440035', conversationId: '40d4e5f6-0004-4000-8000-400000000004', senderId: 'e5f6a7b8-4444-4000-8000-000000000004', content: 'Vou te enviar o brandbook deles', timestamp: '2026-04-23T14:20:00Z', isOutgoing: false },
    { id: '880e8400-e29b-41d4-a716-446655440036', conversationId: '40d4e5f6-0004-4000-8000-400000000004', senderId: 'e5f6a7b8-4444-4000-8000-000000000004', content: 'Também confirmaram o prazo para o mês que vem', timestamp: '2026-04-23T14:30:00Z', isOutgoing: false },
    { id: '880e8400-e29b-41d4-a716-446655440037', conversationId: '40d4e5f6-0004-4000-8000-400000000004', senderId: 'e5f6a7b8-4444-4000-8000-000000000004', content: 'Acho que conseguimos entregar tranquilamente', timestamp: '2026-04-23T14:45:00Z', isOutgoing: false },
    { id: '880e8400-e29b-41d4-a716-446655440038', conversationId: '40d4e5f6-0004-4000-8000-400000000004', senderId: 'e5f6a7b8-4444-4000-8000-000000000004', content: 'No geral, saímos muito alinhados da reunião', timestamp: '2026-04-23T15:00:00Z', isOutgoing: false },
    { id: '880e8400-e29b-41d4-a716-446655440039', conversationId: '40d4e5f6-0004-4000-8000-400000000004', senderId: 'e5f6a7b8-4444-4000-8000-000000000004', content: 'A reunião foi muito produtiva, obrigada!', timestamp: '2026-04-23T15:20:00Z', isOutgoing: false },
  ],

  // João Pereira — unreadCount: 0
  '50e5f6a7-0005-4000-8000-500000000005': [
    { id: '990e8400-e29b-41d4-a716-446655440040', conversationId: '50e5f6a7-0005-4000-8000-500000000005', senderId: 'f6a7b8c9-5555-4000-8000-000000000005', content: 'Estou com dúvidas sobre o prazo do entregável', timestamp: '2026-04-23T15:50:00Z', isOutgoing: false },
    { id: '990e8400-e29b-41d4-a716-446655440041', conversationId: '50e5f6a7-0005-4000-8000-500000000005', senderId: ME, content: 'Vamos verificar juntos, posso te ajudar', timestamp: '2026-04-23T16:00:00Z', isOutgoing: true },
    { id: '990e8400-e29b-41d4-a716-446655440042', conversationId: '50e5f6a7-0005-4000-8000-500000000005', senderId: 'f6a7b8c9-5555-4000-8000-000000000005', content: 'Podemos rever o cronograma na próxima semana?', timestamp: '2026-04-23T16:05:00Z', isOutgoing: false },
  ],

  // Fernanda Alves — unreadCount: 0
  '60f6a7b8-0006-4000-8000-600000000006': [
    { id: 'aa0e8400-e29b-41d4-a716-446655440050', conversationId: '60f6a7b8-0006-4000-8000-600000000006', senderId: 'a7b8c9d0-6666-4000-8000-000000000006', content: 'Como estão os resultados do último sprint?', timestamp: '2026-04-23T16:30:00Z', isOutgoing: false },
    { id: 'aa0e8400-e29b-41d4-a716-446655440051', conversationId: '60f6a7b8-0006-4000-8000-600000000006', senderId: ME, content: 'Bem positivos! Entregamos 90% do planejado', timestamp: '2026-04-23T16:40:00Z', isOutgoing: true },
    { id: 'aa0e8400-e29b-41d4-a716-446655440052', conversationId: '60f6a7b8-0006-4000-8000-600000000006', senderId: 'a7b8c9d0-6666-4000-8000-000000000006', content: 'Estou ansiosa para os resultados do projeto', timestamp: '2026-04-23T16:45:00Z', isOutgoing: false },
  ],

  // Pedro Oliveira — unreadCount: 3, long history for scroll
  '70a7b8c9-0007-4000-8000-700000000007': [
    { id: 'bb0e8400-e29b-41d4-a716-446655440060', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: ME, content: 'Pedro, bom dia! Queria falar sobre o projeto novo', timestamp: '2026-04-10T09:00:00Z', isOutgoing: true },
    { id: 'bb0e8400-e29b-41d4-a716-446655440061', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: 'd0e1f2a3-9999-4000-8000-000000000009', content: 'Bom dia! Claro, pode falar', timestamp: '2026-04-10T09:10:00Z', isOutgoing: false },
    { id: 'bb0e8400-e29b-41d4-a716-446655440062', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: ME, content: 'Estamos pensando em usar Vue 3 com TypeScript', timestamp: '2026-04-10T09:15:00Z', isOutgoing: true },
    { id: 'bb0e8400-e29b-41d4-a716-446655440063', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: 'd0e1f2a3-9999-4000-8000-000000000009', content: 'Boa escolha! Tenho experiência com isso', timestamp: '2026-04-10T09:20:00Z', isOutgoing: false },
    { id: 'bb0e8400-e29b-41d4-a716-446655440064', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: ME, content: 'Ótimo! Vou montar o kick-off para semana que vem', timestamp: '2026-04-10T09:30:00Z', isOutgoing: true },
    { id: 'bb0e8400-e29b-41d4-a716-446655440065', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: 'd0e1f2a3-9999-4000-8000-000000000009', content: 'Perfeito, me avisa o horário', timestamp: '2026-04-10T09:35:00Z', isOutgoing: false },
    { id: 'bb0e8400-e29b-41d4-a716-446655440066', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: ME, content: 'Pedro, o kick-off vai ser quarta às 10h', timestamp: '2026-04-14T08:00:00Z', isOutgoing: true },
    { id: 'bb0e8400-e29b-41d4-a716-446655440067', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: 'd0e1f2a3-9999-4000-8000-000000000009', content: 'Anotado! Vou preparar uns slides sobre a arquitetura', timestamp: '2026-04-14T08:15:00Z', isOutgoing: false },
    { id: 'bb0e8400-e29b-41d4-a716-446655440068', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: ME, content: 'Seria ótimo, obrigado!', timestamp: '2026-04-14T08:20:00Z', isOutgoing: true },
    { id: 'bb0e8400-e29b-41d4-a716-446655440069', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: 'd0e1f2a3-9999-4000-8000-000000000009', content: 'O kick-off foi muito bom, ficou tudo alinhado', timestamp: '2026-04-16T11:00:00Z', isOutgoing: false },
    { id: 'bb0e8400-e29b-41d4-a716-446655440070', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: ME, content: 'Concordo! Agora é botar a mão na massa', timestamp: '2026-04-16T11:10:00Z', isOutgoing: true },
    { id: 'bb0e8400-e29b-41d4-a716-446655440071', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: 'd0e1f2a3-9999-4000-8000-000000000009', content: 'Já comecei a montar o boilerplate do projeto', timestamp: '2026-04-17T09:00:00Z', isOutgoing: false },
    { id: 'bb0e8400-e29b-41d4-a716-446655440072', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: ME, content: 'Show! Me manda o link do repo quando estiver pronto', timestamp: '2026-04-17T09:15:00Z', isOutgoing: true },
    { id: 'bb0e8400-e29b-41d4-a716-446655440073', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: 'd0e1f2a3-9999-4000-8000-000000000009', content: 'Mandei! Dá uma olhada quando puder', timestamp: '2026-04-18T10:00:00Z', isOutgoing: false },
    { id: 'bb0e8400-e29b-41d4-a716-446655440074', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: ME, content: 'Vi, ficou muito bem organizado', timestamp: '2026-04-18T14:00:00Z', isOutgoing: true },
    { id: 'bb0e8400-e29b-41d4-a716-446655440075', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: 'd0e1f2a3-9999-4000-8000-000000000009', content: 'Obrigado! Fiz uns ajustes na estrutura de pastas', timestamp: '2026-04-19T09:00:00Z', isOutgoing: false },
    { id: 'bb0e8400-e29b-41d4-a716-446655440076', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: ME, content: 'Como está o progresso do primeiro sprint?', timestamp: '2026-04-21T10:00:00Z', isOutgoing: true },
    // 3 unread
    { id: 'bb0e8400-e29b-41d4-a716-446655440077', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: 'd0e1f2a3-9999-4000-8000-000000000009', content: 'Estamos com 60% das tarefas concluídas', timestamp: '2026-04-22T09:00:00Z', isOutgoing: false },
    { id: 'bb0e8400-e29b-41d4-a716-446655440078', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: 'd0e1f2a3-9999-4000-8000-000000000009', content: 'Tivemos um bloqueio com a API mas já resolvemos', timestamp: '2026-04-22T10:00:00Z', isOutgoing: false },
    { id: 'bb0e8400-e29b-41d4-a716-446655440079', conversationId: '70a7b8c9-0007-4000-8000-700000000007', senderId: 'd0e1f2a3-9999-4000-8000-000000000009', content: 'Vou preparar a apresentação para sexta', timestamp: '2026-04-22T11:30:00Z', isOutgoing: false },
  ],

  // Camila Rodrigues — unreadCount: 0
  '80b8c9d0-0008-4000-8000-800000000008': [
    { id: 'cc0e8400-e29b-41d4-a716-446655440080', conversationId: '80b8c9d0-0008-4000-8000-800000000008', senderId: 'e1f2a3b4-aaaa-4000-8000-00000000000a', content: 'Oi! Você viu o relatório que enviei?', timestamp: '2026-04-20T09:00:00Z', isOutgoing: false },
    { id: 'cc0e8400-e29b-41d4-a716-446655440081', conversationId: '80b8c9d0-0008-4000-8000-800000000008', senderId: ME, content: 'Vi sim! Ficou muito completo, parabéns', timestamp: '2026-04-20T10:00:00Z', isOutgoing: true },
    { id: 'cc0e8400-e29b-41d4-a716-446655440082', conversationId: '80b8c9d0-0008-4000-8000-800000000008', senderId: 'e1f2a3b4-aaaa-4000-8000-00000000000a', content: 'Obrigada! Precisei refazer a parte de análise', timestamp: '2026-04-20T10:15:00Z', isOutgoing: false },
    { id: 'cc0e8400-e29b-41d4-a716-446655440083', conversationId: '80b8c9d0-0008-4000-8000-800000000008', senderId: ME, content: 'Deu pra perceber o cuidado, mandou bem', timestamp: '2026-04-20T10:30:00Z', isOutgoing: true },
    { id: 'cc0e8400-e29b-41d4-a716-446655440084', conversationId: '80b8c9d0-0008-4000-8000-800000000008', senderId: 'e1f2a3b4-aaaa-4000-8000-00000000000a', content: 'Vou apresentar pro time amanhã', timestamp: '2026-04-21T08:00:00Z', isOutgoing: false },
    { id: 'cc0e8400-e29b-41d4-a716-446655440085', conversationId: '80b8c9d0-0008-4000-8000-800000000008', senderId: ME, content: 'Boa sorte! Tenho certeza que vai arrasar', timestamp: '2026-04-21T08:30:00Z', isOutgoing: true },
    { id: 'cc0e8400-e29b-41d4-a716-446655440086', conversationId: '80b8c9d0-0008-4000-8000-800000000008', senderId: 'e1f2a3b4-aaaa-4000-8000-00000000000a', content: 'O relatório ficou excelente, parabéns!', timestamp: '2026-04-21T17:00:00Z', isOutgoing: false },
  ],

  // Rafael Santos — unreadCount: 2, long history
  '90c9d0e1-0009-4000-8000-900000000009': [
    { id: 'dd0e8400-e29b-41d4-a716-446655440090', conversationId: '90c9d0e1-0009-4000-8000-900000000009', senderId: 'f2a3b4c5-bbbb-4000-8000-00000000000b', content: 'Fala! Tudo bem? Queria discutir o escopo do módulo novo', timestamp: '2026-04-05T09:00:00Z', isOutgoing: false },
    { id: 'dd0e8400-e29b-41d4-a716-446655440091', conversationId: '90c9d0e1-0009-4000-8000-900000000009', senderId: ME, content: 'Opa, tudo certo! Qual módulo?', timestamp: '2026-04-05T09:10:00Z', isOutgoing: true },
    { id: 'dd0e8400-e29b-41d4-a716-446655440092', conversationId: '90c9d0e1-0009-4000-8000-900000000009', senderId: 'f2a3b4c5-bbbb-4000-8000-00000000000b', content: 'O de notificações push, achei o escopo muito amplo', timestamp: '2026-04-05T09:20:00Z', isOutgoing: false },
    { id: 'dd0e8400-e29b-41d4-a716-446655440093', conversationId: '90c9d0e1-0009-4000-8000-900000000009', senderId: ME, content: 'Entendi, podemos reduzir para o essencial no MVP', timestamp: '2026-04-05T09:30:00Z', isOutgoing: true },
    { id: 'dd0e8400-e29b-41d4-a716-446655440094', conversationId: '90c9d0e1-0009-4000-8000-900000000009', senderId: 'f2a3b4c5-bbbb-4000-8000-00000000000b', content: 'Exato, faz mais sentido priorizar', timestamp: '2026-04-05T09:40:00Z', isOutgoing: false },
    { id: 'dd0e8400-e29b-41d4-a716-446655440095', conversationId: '90c9d0e1-0009-4000-8000-900000000009', senderId: ME, content: 'Vou reescrever o documento de escopo', timestamp: '2026-04-07T10:00:00Z', isOutgoing: true },
    { id: 'dd0e8400-e29b-41d4-a716-446655440096', conversationId: '90c9d0e1-0009-4000-8000-900000000009', senderId: 'f2a3b4c5-bbbb-4000-8000-00000000000b', content: 'Beleza, me avisa quando terminar', timestamp: '2026-04-07T10:15:00Z', isOutgoing: false },
    { id: 'dd0e8400-e29b-41d4-a716-446655440097', conversationId: '90c9d0e1-0009-4000-8000-900000000009', senderId: ME, content: 'Pronto! Enviei o doc revisado no Slack', timestamp: '2026-04-12T14:00:00Z', isOutgoing: true },
    { id: 'dd0e8400-e29b-41d4-a716-446655440098', conversationId: '90c9d0e1-0009-4000-8000-900000000009', senderId: 'f2a3b4c5-bbbb-4000-8000-00000000000b', content: 'Recebi! Vou ler com calma', timestamp: '2026-04-12T15:00:00Z', isOutgoing: false },
    { id: 'dd0e8400-e29b-41d4-a716-446655440099', conversationId: '90c9d0e1-0009-4000-8000-900000000009', senderId: ME, content: 'E aí, o que achou do escopo revisado?', timestamp: '2026-04-18T09:00:00Z', isOutgoing: true },
    // 2 unread
    { id: 'dd0e8400-e29b-41d4-a716-44665544009a', conversationId: '90c9d0e1-0009-4000-8000-900000000009', senderId: 'f2a3b4c5-bbbb-4000-8000-00000000000b', content: 'Ficou bem melhor, mas ainda tenho umas sugestões', timestamp: '2026-04-20T08:30:00Z', isOutgoing: false },
    { id: 'dd0e8400-e29b-41d4-a716-44665544009b', conversationId: '90c9d0e1-0009-4000-8000-900000000009', senderId: 'f2a3b4c5-bbbb-4000-8000-00000000000b', content: 'Precisamos alinhar o escopo antes de começar', timestamp: '2026-04-20T09:15:00Z', isOutgoing: false },
  ],

  // Juliana Martins — unreadCount: 0
  'a0d0e1f2-000a-4000-8000-a0000000000a': [
    { id: 'ee0e8400-e29b-41d4-a716-4466554400a0', conversationId: 'a0d0e1f2-000a-4000-8000-a0000000000a', senderId: ME, content: 'Juliana, preciso que revise o contrato do fornecedor', timestamp: '2026-04-15T09:00:00Z', isOutgoing: true },
    { id: 'ee0e8400-e29b-41d4-a716-4466554400a1', conversationId: 'a0d0e1f2-000a-4000-8000-a0000000000a', senderId: 'a3b4c5d6-cccc-4000-8000-00000000000c', content: 'Pode mandar! Vou olhar hoje à tarde', timestamp: '2026-04-15T09:30:00Z', isOutgoing: false },
    { id: 'ee0e8400-e29b-41d4-a716-4466554400a2', conversationId: 'a0d0e1f2-000a-4000-8000-a0000000000a', senderId: ME, content: 'Enviei pelo e-mail corporativo', timestamp: '2026-04-15T10:00:00Z', isOutgoing: true },
    { id: 'ee0e8400-e29b-41d4-a716-4466554400a3', conversationId: 'a0d0e1f2-000a-4000-8000-a0000000000a', senderId: 'a3b4c5d6-cccc-4000-8000-00000000000c', content: 'Recebi! Revisei e fiz as alterações necessárias', timestamp: '2026-04-17T14:00:00Z', isOutgoing: false },
    { id: 'ee0e8400-e29b-41d4-a716-4466554400a4', conversationId: 'a0d0e1f2-000a-4000-8000-a0000000000a', senderId: ME, content: 'Perfeito, obrigado pela agilidade!', timestamp: '2026-04-17T15:00:00Z', isOutgoing: true },
    { id: 'ee0e8400-e29b-41d4-a716-4466554400a5', conversationId: 'a0d0e1f2-000a-4000-8000-a0000000000a', senderId: 'a3b4c5d6-cccc-4000-8000-00000000000c', content: 'Enviei o contrato atualizado por e-mail', timestamp: '2026-04-18T14:20:00Z', isOutgoing: false },
  ],

  // Marcos Barbosa — unreadCount: 1
  'b0e1f2a3-000b-4000-8000-b0000000000b': [
    { id: 'ff0e8400-e29b-41d4-a716-4466554400b0', conversationId: 'b0e1f2a3-000b-4000-8000-b0000000000b', senderId: 'b4c5d6e7-dddd-4000-8000-00000000000d', content: 'Oi, estou precisando de acesso ao repo do projeto X', timestamp: '2026-04-12T09:00:00Z', isOutgoing: false },
    { id: 'ff0e8400-e29b-41d4-a716-4466554400b1', conversationId: 'b0e1f2a3-000b-4000-8000-b0000000000b', senderId: ME, content: 'Vou te adicionar agora!', timestamp: '2026-04-12T09:30:00Z', isOutgoing: true },
    { id: 'ff0e8400-e29b-41d4-a716-4466554400b2', conversationId: 'b0e1f2a3-000b-4000-8000-b0000000000b', senderId: 'b4c5d6e7-dddd-4000-8000-00000000000d', content: 'Valeu! Recebi o convite', timestamp: '2026-04-12T10:00:00Z', isOutgoing: false },
    { id: 'ff0e8400-e29b-41d4-a716-4466554400b3', conversationId: 'b0e1f2a3-000b-4000-8000-b0000000000b', senderId: ME, content: 'Qualquer dúvida sobre o projeto, pode perguntar', timestamp: '2026-04-12T10:15:00Z', isOutgoing: true },
    // 1 unread
    { id: 'ff0e8400-e29b-41d4-a716-4466554400b4', conversationId: 'b0e1f2a3-000b-4000-8000-b0000000000b', senderId: 'b4c5d6e7-dddd-4000-8000-00000000000d', content: 'Pode me passar o acesso ao repositório?', timestamp: '2026-04-15T10:45:00Z', isOutgoing: false },
  ],

  // Tatiana Araújo — unreadCount: 0
  'c0f2a3b4-000c-4000-8000-c0000000000c': [
    { id: 'aa1e8400-e29b-41d4-a716-4466554400c0', conversationId: 'c0f2a3b4-000c-4000-8000-c0000000000c', senderId: ME, content: 'Tatiana, conhece algum curso bom de UX?', timestamp: '2026-04-08T10:00:00Z', isOutgoing: true },
    { id: 'aa1e8400-e29b-41d4-a716-4466554400c1', conversationId: 'c0f2a3b4-000c-4000-8000-c0000000000c', senderId: 'c5d6e7f8-eeee-4000-8000-00000000000e', content: 'Conheço sim! Tem um da Interaction Design Foundation que é muito bom', timestamp: '2026-04-08T10:30:00Z', isOutgoing: false },
    { id: 'aa1e8400-e29b-41d4-a716-4466554400c2', conversationId: 'c0f2a3b4-000c-4000-8000-c0000000000c', senderId: ME, content: 'Vou dar uma olhada, obrigado pela indicação!', timestamp: '2026-04-08T11:00:00Z', isOutgoing: true },
    { id: 'aa1e8400-e29b-41d4-a716-4466554400c3', conversationId: 'c0f2a3b4-000c-4000-8000-c0000000000c', senderId: 'c5d6e7f8-eeee-4000-8000-00000000000e', content: 'Obrigada pela indicação do curso!', timestamp: '2026-04-10T16:30:00Z', isOutgoing: false },
  ],

  // Lucas Nascimento — unreadCount: 0
  'd0a3b4c5-000d-4000-8000-d0000000000d': [
    { id: 'bb1e8400-e29b-41d4-a716-4466554400d0', conversationId: 'd0a3b4c5-000d-4000-8000-d0000000000d', senderId: 'd6e7f8a9-ffff-4000-8000-00000000000f', content: 'E aí, como estão as coisas por aí?', timestamp: '2026-04-03T12:00:00Z', isOutgoing: false },
    { id: 'bb1e8400-e29b-41d4-a716-4466554400d1', conversationId: 'd0a3b4c5-000d-4000-8000-d0000000000d', senderId: ME, content: 'Tudo tranquilo! E aí, como foi a mudança de equipe?', timestamp: '2026-04-03T12:30:00Z', isOutgoing: true },
    { id: 'bb1e8400-e29b-41d4-a716-4466554400d2', conversationId: 'd0a3b4c5-000d-4000-8000-d0000000000d', senderId: 'd6e7f8a9-ffff-4000-8000-00000000000f', content: 'Foi boa! Estou gostando do time novo', timestamp: '2026-04-03T13:00:00Z', isOutgoing: false },
    { id: 'bb1e8400-e29b-41d4-a716-4466554400d3', conversationId: 'd0a3b4c5-000d-4000-8000-d0000000000d', senderId: ME, content: 'Que bom! A gente devia marcar um café', timestamp: '2026-04-04T09:00:00Z', isOutgoing: true },
    { id: 'bb1e8400-e29b-41d4-a716-4466554400d4', conversationId: 'd0a3b4c5-000d-4000-8000-d0000000000d', senderId: 'd6e7f8a9-ffff-4000-8000-00000000000f', content: 'Vamos marcar um café na próxima semana?', timestamp: '2026-04-05T12:00:00Z', isOutgoing: false },
  ],

  // Ricardo Lima — archived
  'e0b4c5d6-000e-4000-8000-e0000000000e': [
    { id: 'cc1e8400-e29b-41d4-a716-4466554400e0', conversationId: 'e0b4c5d6-000e-4000-8000-e0000000000e', senderId: ME, content: 'Ricardo, preciso da sua análise sobre os dados de mercado', timestamp: '2026-03-15T09:30:00Z', isOutgoing: true },
    { id: 'cc1e8400-e29b-41d4-a716-4466554400e1', conversationId: 'e0b4c5d6-000e-4000-8000-e0000000000e', senderId: 'b8c9d0e1-7777-4000-8000-000000000007', content: 'Precisamos de mais dados antes de decidir', timestamp: '2026-03-15T10:00:00Z', isOutgoing: false },
  ],

  // Beatriz Souza — archived
  'f0c5d6e7-000f-4000-8000-f0000000000f': [
    { id: 'dd1e8400-e29b-41d4-a716-4466554400f0', conversationId: 'f0c5d6e7-000f-4000-8000-f0000000000f', senderId: 'c9d0e1f2-8888-4000-8000-000000000008', content: 'Você tem o e-mail do departamento jurídico?', timestamp: '2026-03-10T08:45:00Z', isOutgoing: false },
    { id: 'dd1e8400-e29b-41d4-a716-4466554400f1', conversationId: 'f0c5d6e7-000f-4000-8000-f0000000000f', senderId: ME, content: 'Claro! É o juridico@empresa.com.br', timestamp: '2026-03-10T09:00:00Z', isOutgoing: true },
  ],
}
