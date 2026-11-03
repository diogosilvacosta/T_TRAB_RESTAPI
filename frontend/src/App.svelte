<script>
  import { onMount, tick } from 'svelte';
  import AlunoForm from './components/AlunoForm.svelte';
  import ListaAlunos from './components/ListaAlunos.svelte';
  import { api, idDe } from './lib/api.js';

  let alunos = $state([]);
  let cursos = $state([]);
  let filtroCurso = $state('');
  let alunoEdicao = $state(null);
  let alunoApagar = $state(null);
  let carregando = $state(true);
  let carregado = $state(false);
  let operacao = $state('');
  let erro = $state('');
  let sucesso = $state('');
  let dialogo;

  const ocupado = $derived(carregando || operacao !== '');
  const alunosFiltrados = $derived(
    filtroCurso === '' ? alunos : alunos.filter((aluno) => String(aluno.idCurso) === String(filtroCurso)),
  );

  onMount(() => { void carregarDados(); });

  async function carregarDados() {
    carregando = true;
    erro = '';
    try {
      const [novosCursos, novosAlunos] = await Promise.all([api.listarCursos(), api.listarAlunos()]);
      cursos = novosCursos;
      alunos = novosAlunos;
      carregado = true;
    } catch (error) {
      erro = error.message;
    } finally {
      carregando = false;
    }
  }

  async function guardarAluno(dados) {
    if (ocupado) return false;
    operacao = 'guardar';
    erro = '';
    sucesso = '';
    const atual = alunoEdicao;
    try {
      if (atual) {
        const atualizado = await api.atualizarAluno(idDe(atual), dados);
        alunos = alunos.map((aluno) => String(idDe(aluno)) === String(idDe(atual)) ? atualizado : aluno);
      } else {
        const criado = await api.adicionarAluno(dados);
        alunos = [...alunos, criado];
      }
      alunoEdicao = null;
      sucesso = atual ? 'Alterações guardadas com sucesso.' : 'Aluno adicionado com sucesso.';
      return true;
    } catch (error) {
      erro = error.message;
      return false;
    } finally {
      operacao = '';
    }
  }

  async function editarAluno(aluno) {
    if (ocupado) return;
    operacao = 'editar';
    erro = '';
    sucesso = '';
    try {
      alunoEdicao = await api.obterAluno(idDe(aluno));
      operacao = '';
      await tick();
      document.getElementById('nome')?.focus();
    } catch (error) {
      erro = error.message;
    } finally {
      operacao = '';
    }
  }

  function pedirEliminacao(aluno) {
    if (ocupado) return;
    alunoApagar = aluno;
    dialogo.showModal();
  }

  async function confirmarEliminacao() {
    if (ocupado || !alunoApagar) return;
    const alvo = alunoApagar;
    operacao = 'apagar';
    erro = '';
    sucesso = '';
    try {
      await api.apagarAluno(idDe(alvo));
      alunos = alunos.filter((aluno) => String(idDe(aluno)) !== String(idDe(alvo)));
      if (alunoEdicao && String(idDe(alunoEdicao)) === String(idDe(alvo))) alunoEdicao = null;
      sucesso = 'Aluno apagado com sucesso.';
    } catch (error) {
      erro = error.message;
    } finally {
      operacao = '';
      dialogo.close();
    }
  }

  function cancelarEdicao() {
    alunoEdicao = null;
    erro = '';
    sucesso = '';
  }
</script>

<a href="#conteudo" class="sr-only rounded-md bg-white p-3 text-blue-800 focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50">Saltar para o conteúdo</a>

<header class="border-b-4 border-blue-600 bg-slate-900 text-white">
  <div class="mx-auto flex max-w-6xl items-center gap-4 px-5 py-6 sm:px-8">
    <span aria-hidden="true" class="rounded-md border border-slate-500 px-3 py-2 text-sm font-bold tracking-widest">SIR</span>
    <div>
      <h1 class="text-xl font-semibold tracking-tight sm:text-2xl">Gestão de Alunos</h1>
      <p class="mt-1 text-xs text-slate-400 sm:text-sm">IPVC · ESTG — Sistemas de Informação em Rede</p>
    </div>
  </div>
</header>

<main id="conteudo" class="mx-auto max-w-6xl space-y-6 px-4 py-7 sm:px-8 sm:py-9">
  <div aria-live="polite" aria-atomic="true">
    {#if sucesso}
      <p role="status" class="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{sucesso}</p>
    {/if}
  </div>
  {#if erro}
    <div role="alert" class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
      <p>{erro}</p>
      <button type="button" onclick={carregarDados} disabled={ocupado} class="rounded-md border border-red-300 px-3 py-1.5 font-medium hover:bg-red-100">Voltar a carregar</button>
    </div>
  {/if}

  <AlunoForm aluno={alunoEdicao} {cursos} {ocupado} aGuardar={operacao === 'guardar'} onsave={guardarAluno} oncancel={cancelarEdicao} />

  <section aria-labelledby="lista-title" aria-busy={carregando} class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
    <div class="mb-5 flex flex-wrap items-end justify-between gap-4 border-b border-slate-100 pb-5">
      <div>
        <h2 id="lista-title" class="text-lg font-semibold">Lista de alunos {#if carregado}<span class="ml-1 text-sm font-normal text-slate-400">({alunosFiltrados.length})</span>{/if}</h2>
        <p class="mt-1 text-sm text-slate-500">Consulta e atualiza os registos dos alunos.</p>
      </div>
      <div class="w-full sm:max-w-sm">
        <label for="filtro-curso" class="mb-1.5 block text-sm font-medium text-slate-700">Filtrar por curso</label>
        <select id="filtro-curso" bind:value={filtroCurso} disabled={ocupado || !carregado}
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm">
          <option value="">Todos os cursos</option>
          {#each cursos as curso (curso.id)}
            <option value={curso.id}>{curso.nomeDoCurso}</option>
          {/each}
        </select>
      </div>
    </div>

    {#if carregando}
      <p role="status" class="py-12 text-center text-sm text-slate-500">A carregar alunos e cursos…</p>
    {:else if !carregado}
      <p class="py-12 text-center text-sm text-slate-500">A lista será apresentada quando a ligação à API for restabelecida.</p>
    {:else}
      <ListaAlunos alunos={alunosFiltrados} {cursos} {ocupado} onedit={editarAluno} ondelete={pedirEliminacao} />
    {/if}
  </section>
  <footer class="pb-3 text-center text-xs text-slate-400">Sistemas de Informação em Rede · Gestão de alunos e cursos</footer>
</main>

<dialog bind:this={dialogo} aria-labelledby="apagar-title"
  onclose={() => { alunoApagar = null; }}
  oncancel={(event) => { if (operacao === 'apagar') event.preventDefault(); }}
  class="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md rounded-xl border-0 bg-white p-6 text-slate-900 shadow-xl backdrop:bg-slate-950/50">
  <h2 id="apagar-title" class="text-lg font-semibold">Apagar aluno?</h2>
  <p class="mt-3 text-sm leading-relaxed text-slate-600">Vais apagar o registo de <strong>{alunoApagar?.nome} {alunoApagar?.apelido}</strong>. Esta ação não pode ser anulada na aplicação.</p>
  <div class="mt-6 flex justify-end gap-3">
    <button type="button" onclick={() => dialogo.close()} disabled={ocupado} class="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium hover:bg-slate-50">Cancelar</button>
    <button type="button" onclick={confirmarEliminacao} disabled={ocupado} class="rounded-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-800">{operacao === 'apagar' ? 'A apagar…' : 'Confirmar eliminação'}</button>
  </div>
</dialog>
