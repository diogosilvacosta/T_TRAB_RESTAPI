# Evolução da migração para Svelte + Tailwind

## Organização das branches

A base da migração é o commit `88d63c9` da branch `main`. O resultado é reunido em `feature/svelte-tailwind`. Cada etapa foi criada numa branch própria e integrada com um merge que mantém essa etapa visível no histórico.

| Ordem | Branch | Conteúdo |
| --- | --- | --- |
| 1 | `feature/svelte-configuracao` | Dependências, Vite, Tailwind e montagem do primeiro componente |
| 2 | `feature/svelte-interface` | Formulário reativo e lista responsiva, em commits separados |
| 3 | `feature/svelte-api` | Cliente HTTP, integração do CRUD, correção da idade opcional e limpeza da interface antiga |
| 4 | `docs/tutorial-svelte-tailwind` | Execução local, tutorial e registo da evolução |
| Revisão | `docs/revisao-documentacao` | Índice, verificação de links e esclarecimento dos passos de execução |
| Integração | `feature/svelte-tailwind` | Resultado reunido das quatro etapas |

A branch `main` continua com a versão anterior até ser decidida a integração da migração.

## Commits de implementação

| Commit | Alteração | Motivo |
| --- | --- | --- |
| `08adc67` | Configurar Svelte, Tailwind e Vite | Criar uma base compilável e reprodutível com ficheiro de versões de dependências |
| `26328c1` | Criar `AlunoForm.svelte` | Separar campos, validação e submissão da restante página |
| `d1baf64` | Criar `ListaAlunos.svelte` | Ter tabela em computador e cartões em telemóvel |
| `e0ec888` | Adicionar cliente REST e testes | Centralizar URLs, métodos HTTP e tratamento de respostas |
| `863d7de` | Aceitar idade vazia durante a edição | Corrigir um problema observado no teste do formulário no navegador |
| `f23eb21` | Ligar componentes às operações de alunos | Implementar carregamento, criação, edição, filtro, eliminação e estados da página |
| `1d1d29f` | Separar o frontend da API simulada | O Vite serve a interface; o JSON-server disponibiliza os dados |
| `18273e5` | Remover o JavaScript e CSS antigos | Concluir a substituição da interface que manipulava diretamente o DOM |

Os commits de documentação seguintes descrevem a instalação, explicam o código e registam esta sequência. Para explorar a evolução:

```bash
git log --graph --oneline --decorate main..feature/svelte-tailwind
git show 863d7de
```

O primeiro comando mostra os commits e merges da migração. O segundo mostra a correção isolada do campo da idade.

## Verificações realizadas

### Verificações automáticas

- `npm run check`: zero erros e zero avisos do Svelte.
- `npm test`: sete testes do cliente HTTP aprovados.
- `npm run build`: compilação de produção concluída.

Os testes do cliente cobrem os identificadores `id` e `_id`, um ID numérico igual a zero, serialização de dados, idade limpa como `null`, codificação de IDs, resposta DELETE 204, erros HTTP, JSON inválido, formato de listagem e falha de ligação.

### Verificações no navegador

- Carregar os quatro alunos e os dois cursos de uma cópia dos dados de teste.
- Adicionar um aluno de teste e confirmar a atualização da lista.
- Obter esse aluno para edição, alterar o nome e limpar a idade.
- Filtrar por curso e repor a listagem completa.
- Confirmar e executar a eliminação apenas do registo criado para o teste.
- Verificar cartões em telemóvel e ausência de deslocação horizontal.
- Desligar a API de teste e verificar a mensagem de erro.
- Reiniciar a API e recuperar os dados através de «Voltar a carregar».

Os testes de escrita no navegador utilizaram uma cópia local da base de dados. Não foram feitos pedidos de escrita à API de produção. A compatibilidade de identificadores MongoDB foi verificada nos testes do cliente; não foi executado um teste de ponta a ponta contra uma base MongoDB nesta migração.

## O que foi preservado

- Código e rotas do backend Express/Mongoose.
- Estrutura dos dados de alunos e cursos.
- Coleção Postman e dados de exemplo do repositório.
- Operações de gestão de alunos e filtro por curso.

## Sugestões para uma etapa posterior

Caso sejam pedidas no enunciado, podem ser desenvolvidas em novas branches: pesquisa por nome, ordenação da lista e paginação. Autenticação e regras de acesso exigem também trabalho no backend. Cada funcionalidade deve ter um objetivo, validação e commits próprios.

Para estudar os conceitos usados nesta versão, consultar o [tutorial](TUTORIAL_SVELTE_TAILWIND.md).
