# Tutorial: de JavaScript para Svelte + Tailwind CSS

## 1. Objetivo e ponto de partida

A aplicação permite consultar, adicionar, editar e apagar alunos, e filtrar a lista por curso. O frontend anterior usava HTML, `getElementById`, eventos e alterações manuais a `innerHTML`. Nesta versão, essas tarefas passam para componentes Svelte.

O backend Express/Mongoose e os seus endpoints foram preservados. A API simulada continua disponível para desenvolvimento. A alteração principal está na forma de construir e atualizar a interface.

## 2. O papel de cada ferramenta

| Ferramenta | Papel neste projeto | Exemplo concreto |
| --- | --- | --- |
| Svelte 5 | Componentes, estado e interação | Atualizar a lista depois de guardar um aluno |
| Tailwind CSS 4 | Estilos através de classes utilitárias | `rounded-lg`, `bg-blue-700`, `sm:grid-cols-2` |
| Vite 8 | Servidor de desenvolvimento e compilação | `npm run dev` e `npm run build` |
| Fetch API | Pedidos HTTP ao servidor | `GET /alunos`, `POST /alunos` |
| JSON-server | API local para experimentar o CRUD | Dados de `mock-data/bd.json` |

Foi usado Svelte com Vite porque a aplicação tem uma página e já possui uma API Express. Não foi necessário introduzir outro servidor de aplicação para o frontend.

## 3. Instalar e experimentar

Na raiz do repositório:

```bash
npm ci
npm --prefix frontend ci
npm run mock-server
```

Abrir outro terminal na mesma pasta:

```bash
npm run dev
```

Abrir o endereço mostrado pelo Vite, normalmente `http://127.0.0.1:5173`. A API de teste corre na porta 3000. As alterações aos alunos nesta API são guardadas em `mock-data/bd.json`; usar dados de teste.

Para usar a API Express, criar `frontend/.env.local`:

```dotenv
VITE_API_URL=http://localhost:5000/api
```

É preciso iniciar também o backend e reiniciar o Vite após mudar esta configuração. O exemplo de configuração está em `frontend/.env.example`. Para usar o Render, definir o URL público da API em `VITE_API_URL`. Sem essa variável, o desenvolvimento usa a API local e o build de produção usa o Render.

## 4. Onde está o código

```text
frontend/
├── index.html                 # Documento inicial e ponto de montagem
├── vite.config.js             # Plugins Svelte e Tailwind
├── .env.example               # Exemplo do endereço da API
└── src/
    ├── main.js                # Monta App no elemento #app
    ├── app.css                # Importa Tailwind e define estilos de base
    ├── App.svelte             # Estado geral e operações sobre os alunos
    ├── components/
    │   ├── AlunoForm.svelte   # Campos, validação e submissão
    │   └── ListaAlunos.svelte # Tabela, cartões e botões de ações
    └── lib/
        ├── api.js            # Pedidos HTTP e tratamento de respostas
        └── api.test.js       # Testes do contrato do cliente HTTP
```

O componente do formulário recebe os cursos e o aluno selecionado. O componente da lista recebe os alunos a apresentar. O `App.svelte` decide quando contactar a API e mantém os dados partilhados.

## 5. Estado e atualizações da interface

No `App.svelte`, os dados são reativos:

```js
let alunos = $state([]);
let filtroCurso = $state('');
```

Quando chega um aluno novo da API, a lista é atualizada:

```js
alunos = [...alunos, criado];
```

O Svelte atualiza a interface que depende dessa variável. Não é preciso construir uma linha HTML com `innerHTML`.

O filtro é um valor calculado a partir do estado:

```js
const alunosFiltrados = $derived(
  filtroCurso === ''
    ? alunos
    : alunos.filter((aluno) => String(aluno.idCurso) === String(filtroCurso)),
);
```

O uso de `String` na comparação permite lidar com a diferença entre um ID numérico e um valor vindo de um campo de seleção.

## 6. Formulários e comunicação entre componentes

O `bind:value` liga um campo à variável correspondente:

```svelte
<input id="nome" bind:value={nome} required />
```

O `AlunoForm.svelte` recebe propriedades através de `$props()`:

```js
let { aluno = null, cursos = [], ocupado = false, aGuardar = false, onsave, oncancel } = $props();
```

`onsave` é uma função fornecida pelo componente pai. O formulário prepara os dados e chama essa função. Só limpa os campos quando o pai indica que a gravação teve sucesso; se o servidor falhar, os dados escritos mantêm-se.

O `$effect` existente no formulário acompanha o aluno selecionado e preenche os campos para edição. A validação e os pedidos de gravação são executados nas respetivas funções de evento.

## 7. Do clique até à API

Exemplo: adicionar um aluno.

1. O utilizador preenche os campos e submete o formulário.
2. `submeter` evita o recarregamento da página com `preventDefault()`.
3. Os nomes são limpos com `trim()` e os campos são validados.
4. `onsave(dados)` chama `guardarAluno` no `App.svelte`.
5. `api.adicionarAluno` faz um `POST /alunos` com JSON.
6. A API devolve o aluno criado, incluindo o seu identificador.
7. O estado `alunos` recebe esse registo e a lista atualiza.
8. O formulário é limpo e aparece a mensagem de sucesso.

| Ação | Método | Endpoint | Função do cliente |
| --- | --- | --- | --- |
| Carregar cursos | GET | `/cursos` | `listarCursos` |
| Carregar alunos | GET | `/alunos` | `listarAlunos` |
| Preparar edição | GET | `/alunos/:id` | `obterAluno` |
| Adicionar | POST | `/alunos` | `adicionarAluno` |
| Guardar edição | PUT | `/alunos/:id` | `atualizarAluno` |
| Apagar | DELETE | `/alunos/:id` | `apagarAluno` |

O helper `idDe` usa `_id` quando vem do MongoDB e `id` quando vem do JSON-server. A expressão `??` preserva um identificador numérico igual a zero.

## 8. Tailwind aplicado ao projeto

O `vite.config.js` carrega os plugins de Svelte e Tailwind. O `app.css` começa com `@import 'tailwindcss';`.

Exemplo simplificado de um botão:

```svelte
<button class="rounded-lg bg-blue-700 px-5 py-2.5 text-white hover:bg-blue-800">
  Adicionar aluno
</button>
```

| Classe | Efeito |
| --- | --- |
| `rounded-lg` | Cantos arredondados |
| `bg-blue-700` | Fundo azul |
| `px-5 py-2.5` | Espaçamento interior horizontal e vertical |
| `hover:bg-blue-800` | Alteração da cor ao passar o rato |
| `sm:grid-cols-2` | Duas colunas a partir do breakpoint `sm` |
| `hidden md:block` | Apresentação visível a partir de `md` |

Em ecrãs maiores, os alunos aparecem numa tabela. Em telemóvel, aparecem em cartões. As classes estão escritas por inteiro para que o Tailwind as detete durante a compilação.

## 9. Correções e melhorias concretas

### Verificar o estado HTTP

`fetch` pode resolver a promessa mesmo que o servidor responda com 400, 404 ou 500. O cliente em `api.js` verifica `resposta.ok`, interpreta a mensagem enviada pelo backend e apresenta uma alternativa compreensível quando não há ligação.

Também distingue respostas JSON válidas de páginas HTML e aceita um `DELETE` com estado 204 sem corpo. A listagem verifica se recebeu um array.

### Limpar uma idade já existente

Durante o teste no navegador, foi detetado que o campo numérico vazio podia ter valor `null`, além do `undefined` inicial. A validação foi corrigida para aceitar ambos os casos:

```js
if (idade != null && (!Number.isInteger(idade) || idade < 16 || idade > 99)) {
  erro = 'A idade deve ser um número inteiro entre 16 e 99.';
}
```

O payload usa `idade: idade ?? null`. Assim, uma idade anteriormente preenchida pode ser limpa com um `PUT`. Se a propriedade fosse omitida, o backend poderia manter o valor antigo.

### Apresentar dados e estados com clareza

- Nomes são apresentados por interpolação Svelte, sem inserir HTML fornecido pelo utilizador.
- Nomes compostos apenas por espaços são rejeitados.
- Durante um pedido, os controlos relevantes ficam desativados para reduzir envios repetidos.
- Uma falha inicial da API não é apresentada como uma lista carregada sem alunos.
- Apagar exige confirmação e identifica o aluno selecionado.
- A edição coloca o foco no campo do nome depois de os controlos voltarem a estar disponíveis.

A validação do frontend melhora a interação; os dados continuam a precisar de validação no backend. A autenticação e o controlo de acesso não fazem parte desta migração.

## 10. Apoio de IA no estudo e na revisão

O apoio pode ser organizado em introdução às ferramentas, explicação de pequenos excertos, procura de erros e comparação de soluções. Os pontos concretos a estudar nesta versão incluem a separação dos componentes, o estado reativo, os pedidos HTTP e o tratamento do campo opcional.

Exemplos de perguntas para aprofundar o trabalho — sugestões de estudo, não uma transcrição de perguntas executadas:

- «Explica o percurso dos dados desde o formulário até ao POST, usando os nomes das funções deste projeto.»
- «Qual é a diferença entre `$state` e `$derived` neste filtro de alunos?»
- «Por que motivo um `fetch` com HTTP 404 pode não entrar no `catch`?»
- «O que acontece se eu limpar a idade durante uma edição? Mostra como testar.»
- «Que partes de `AlunoForm.svelte` deveriam mudar para adicionar um campo obrigatório?»

Depois de uma sugestão, comparar com a documentação oficial, perceber a alteração, experimentar com dados de teste e verificar o resultado. O registo das verificações desta migração está no documento de evolução.

## 11. Exercícios e revisão para apresentação

1. Explicar a função de `main.js`, `App.svelte` e `api.js` sem executar a aplicação.
2. Adicionar um aluno de teste, mudar o curso e confirmar o resultado no filtro.
3. Limpar a idade de um aluno de teste e verificar que o valor deixa de aparecer.
4. Parar a API, recarregar a página, voltar a iniciar a API e usar «Voltar a carregar».
5. Mostrar a tabela no computador e os cartões no telemóvel.
6. Escolher um commit da migração e explicar o problema que resolveu.

## 12. Documentação oficial

- [Introdução e tutorial de Svelte](https://svelte.dev/tutorial/svelte/welcome-to-svelte)
- [Documentação de Svelte](https://svelte.dev/docs/svelte/overview)
- [Instalação de Tailwind CSS com Vite](https://tailwindcss.com/docs/installation/using-vite)
- [Guia de Vite](https://vite.dev/guide/)
- [Vite no Vercel](https://vercel.com/docs/frameworks/frontend/vite)
