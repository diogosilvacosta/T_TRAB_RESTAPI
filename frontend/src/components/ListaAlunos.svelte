<script>
  let { alunos = [], cursos = [], ocupado = false, onedit, ondelete } = $props();

  function identificador(aluno) {
    return aluno._id ?? aluno.id;
  }

  function nomeCurso(id) {
    return cursos.find((curso) => String(curso.id) === String(id))?.nomeDoCurso ?? 'Curso indisponível';
  }

  function iniciais(aluno) {
    return ((aluno.nome?.[0] ?? '') + (aluno.apelido?.[0] ?? '')).toUpperCase();
  }
</script>

{#snippet acoes(aluno)}
  <button type="button" onclick={() => onedit(aluno)} disabled={ocupado}
    aria-label={`Editar ${aluno.nome} ${aluno.apelido}`}
    class="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:border-blue-500 hover:text-blue-700">
    Editar
  </button>
  <button type="button" onclick={() => ondelete(aluno)} disabled={ocupado}
    aria-label={`Apagar ${aluno.nome} ${aluno.apelido}`}
    class="rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50">
    Apagar
  </button>
{/snippet}

{#if alunos.length === 0}
  <p class="rounded-lg border border-dashed border-slate-200 px-4 py-12 text-center text-sm text-slate-500">
    Nenhum aluno encontrado. Adiciona um aluno ou escolhe outro curso.
  </p>
{:else}
  <div class="hidden md:block">
    <table class="w-full border-collapse text-left text-sm">
      <caption class="sr-only">Alunos e respetivos cursos, anos curriculares e idades</caption>
      <thead class="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
        <tr>
          <th scope="col" class="px-3 py-3 font-medium">Aluno</th>
          <th scope="col" class="px-3 py-3 font-medium">Curso</th>
          <th scope="col" class="px-3 py-3 font-medium">Ano</th>
          <th scope="col" class="px-3 py-3 font-medium">Idade</th>
          <th scope="col" class="px-3 py-3 text-right font-medium">Ações</th>
        </tr>
      </thead>
      <tbody>
        {#each alunos as aluno (identificador(aluno))}
          <tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50/70">
            <td class="px-3 py-4">
              <div class="flex items-center gap-3">
                <span aria-hidden="true" class="grid size-9 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">{iniciais(aluno)}</span>
                <span class="font-medium">{aluno.nome} {aluno.apelido}</span>
              </div>
            </td>
            <td class="max-w-72 px-3 py-4 leading-relaxed"><span class="rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-800">{nomeCurso(aluno.idCurso)}</span></td>
            <td class="whitespace-nowrap px-3 py-4 text-slate-600">{aluno.anoCurricular}º ano</td>
            <td class="whitespace-nowrap px-3 py-4 text-slate-600">{aluno.idade == null ? '—' : `${aluno.idade} anos`}</td>
            <td class="px-3 py-4"><div class="flex justify-end gap-2">{@render acoes(aluno)}</div></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <ul class="space-y-3 md:hidden" aria-label="Alunos">
    {#each alunos as aluno (identificador(aluno))}
      <li class="rounded-lg border border-slate-200 p-4">
        <p class="font-semibold">{aluno.nome} {aluno.apelido}</p>
        <dl class="mt-3 space-y-2 text-sm">
          <div><dt class="text-xs text-slate-500">Curso</dt><dd class="mt-1 leading-relaxed text-slate-700">{nomeCurso(aluno.idCurso)}</dd></div>
          <div class="flex justify-between"><dt class="text-slate-500">Ano curricular</dt><dd>{aluno.anoCurricular}º ano</dd></div>
          <div class="flex justify-between"><dt class="text-slate-500">Idade</dt><dd>{aluno.idade == null ? '—' : `${aluno.idade} anos`}</dd></div>
        </dl>
        <div class="mt-4 flex gap-2 border-t border-slate-100 pt-3">{@render acoes(aluno)}</div>
      </li>
    {/each}
  </ul>
{/if}
