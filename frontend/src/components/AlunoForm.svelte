<script>
  let { aluno = null, cursos = [], ocupado = false, aGuardar = false, onsave, oncancel } = $props();

  let nome = $state('');
  let apelido = $state('');
  let idCurso = $state('');
  let anoCurricular = $state(1);
  let idade = $state(undefined);
  let erro = $state('');

  // Quando muda o aluno selecionado, preparar os campos para edição.
  $effect(() => {
    nome = aluno?.nome ?? '';
    apelido = aluno?.apelido ?? '';
    idCurso = aluno?.idCurso ?? '';
    anoCurricular = aluno?.anoCurricular ?? 1;
    idade = aluno?.idade ?? undefined;
    erro = '';
  });

  function limpar() {
    nome = '';
    apelido = '';
    idCurso = '';
    anoCurricular = 1;
    idade = undefined;
    erro = '';
  }

  async function submeter(event) {
    event.preventDefault();
    if (ocupado) return;
    erro = '';

    if (!nome.trim() || !apelido.trim()) {
      erro = 'Preenche o nome e o apelido, sem usar apenas espaços.';
      return;
    }
    if (!cursos.some((curso) => Number(curso.id) === Number(idCurso))) {
      erro = 'Seleciona um curso válido.';
      return;
    }
    if (!Number.isInteger(Number(anoCurricular)) || anoCurricular < 1 || anoCurricular > 4) {
      erro = 'Seleciona um ano curricular entre 1 e 4.';
      return;
    }
    if (idade != null && (!Number.isInteger(idade) || idade < 16 || idade > 99)) {
      erro = 'A idade deve ser um número inteiro entre 16 e 99.';
      return;
    }

    const dados = {
      nome: nome.trim(),
      apelido: apelido.trim(),
      idCurso: Number(idCurso),
      anoCurricular: Number(anoCurricular),
      // null permite limpar uma idade que já existia, também na API MongoDB.
      idade: idade ?? null,
    };

    if (await onsave(dados)) limpar();
  }
</script>

<section aria-labelledby="form-title" class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
  <div class="mb-6 border-b border-slate-100 pb-5">
    <h2 id="form-title" class="text-lg font-semibold">{aluno ? 'Editar aluno' : 'Adicionar aluno'}</h2>
    <p class="mt-1 text-sm text-slate-500">Preenche os dados do aluno. A idade é opcional.</p>
  </div>

  <form onsubmit={submeter} aria-busy={aGuardar}>
    <fieldset disabled={ocupado} class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <label for="nome" class="mb-1.5 block text-sm font-medium text-slate-700">Nome</label>
        <input id="nome" bind:value={nome} required autocomplete="given-name" placeholder="Ex.: Joana"
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm" />
      </div>
      <div>
        <label for="apelido" class="mb-1.5 block text-sm font-medium text-slate-700">Apelido</label>
        <input id="apelido" bind:value={apelido} required autocomplete="family-name" placeholder="Ex.: Silva"
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm" />
      </div>
      <div>
        <label for="idCurso" class="mb-1.5 block text-sm font-medium text-slate-700">Curso</label>
        <select id="idCurso" bind:value={idCurso} required
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm">
          <option value="">Seleciona um curso</option>
          {#each cursos as curso (curso.id)}
            <option value={curso.id}>{curso.nomeDoCurso}</option>
          {/each}
        </select>
      </div>
      <div>
        <label for="anoCurricular" class="mb-1.5 block text-sm font-medium text-slate-700">Ano curricular</label>
        <select id="anoCurricular" bind:value={anoCurricular} required
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm">
          {#each [1, 2, 3, 4] as ano}
            <option value={ano}>{ano}º ano</option>
          {/each}
        </select>
      </div>
      <div>
        <label for="idade" class="mb-1.5 block text-sm font-medium text-slate-700">Idade <span class="font-normal text-slate-400">(opcional)</span></label>
        <input id="idade" type="number" bind:value={idade} min="16" max="99" step="1" placeholder="Ex.: 20"
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm" />
      </div>
    </fieldset>

    {#if erro}
      <p role="alert" class="mt-4 text-sm text-red-700">{erro}</p>
    {/if}

    <div class="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
      <button type="submit" disabled={ocupado || cursos.length === 0}
        class="flex-1 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 sm:flex-none">
        {aGuardar ? 'A guardar…' : aluno ? 'Guardar alterações' : 'Adicionar aluno'}
      </button>
      {#if aluno}
        <button type="button" onclick={oncancel} disabled={ocupado}
          class="flex-1 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:flex-none">
          Cancelar edição
        </button>
      {/if}
    </div>
  </form>
</section>
