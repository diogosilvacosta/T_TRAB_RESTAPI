// CRUD de Alunos (e Cursos) com Fetch API e async/await
// Funciona com a API simulada (JSON-server) e com a API real (Express + MongoDB).
// O endereço da API (API_BASE) é definido em config.js.

// ---------- Elementos do DOM ----------
const $ = (id) => document.getElementById(id);

const form = $('aluno-form');
const formTitle = $('form-title');
const inputId = $('aluno-id');
const inputNome = $('nome');
const inputApelido = $('apelido');
const selectCurso = $('idCurso');
const selectAno = $('anoCurricular');
const inputIdade = $('idade');
const btnSubmit = $('btn-submit');
const btnCancel = $('btn-cancel');
const tbodyAlunos = $('tbody-alunos');
const filtroCurso = $('filtro-curso');

const cursoForm = $('curso-form');
const inputCursoId = $('curso-id');
const inputNomeCurso = $('nomeDoCurso');
const btnCursoSubmit = $('btn-curso-submit');
const btnCursoCancel = $('btn-curso-cancel');
const tbodyCursos = $('tbody-cursos');

const mensagem = $('mensagem');

// ---------- Estado ----------
let cursos = [];
let alunos = [];

// ---------- Utilitários ----------

// Pedido à API: devolve o JSON ou lança erro com a mensagem do servidor
async function api(caminho, opcoes = {}) {
  const resp = await fetch(`${API_BASE}${caminho}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opcoes
  });
  let dados = null;
  try { dados = await resp.json(); } catch { /* resposta sem corpo */ }
  if (!resp.ok) {
    throw new Error((dados && dados.error) || `Erro ${resp.status}`);
  }
  return dados;
}

// Evita injeção de HTML ao mostrar dados na tabela
function escapar(texto) {
  return String(texto ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// No JSON-server os ids são números; no MongoDB são strings (ObjectId)
function converterId(valor) {
  return /^\d+$/.test(valor) ? Number(valor) : valor;
}

let temporizador;
function mostrarMensagem(texto, tipo = 'sucesso') {
  mensagem.textContent = texto;
  mensagem.className = `mensagem ${tipo}`;
  mensagem.hidden = false;
  clearTimeout(temporizador);
  temporizador = setTimeout(() => { mensagem.hidden = true; }, 4000);
}

function nomeDoCurso(idCurso) {
  const curso = cursos.find((c) => String(c.id) === String(idCurso));
  return curso ? curso.nomeDoCurso : 'Desconhecido';
}

// ---------- Cursos ----------

async function carregarCursos() {
  try {
    cursos = await api('/cursos');
  } catch (err) {
    cursos = [];
    mostrarMensagem(`Erro ao carregar cursos: ${err.message}`, 'erro');
  }
  preencherSelectsCursos();
  desenharCursos();
}

function preencherSelectsCursos() {
  const valorForm = selectCurso.value;
  const valorFiltro = filtroCurso.value;

  const opcoes = cursos
    .map((c) => `<option value="${escapar(c.id)}">${escapar(c.nomeDoCurso)}</option>`)
    .join('');

  selectCurso.innerHTML = `<option value="">Selecione um curso</option>${opcoes}`;
  filtroCurso.innerHTML = `<option value="">Todos os cursos</option>${opcoes}`;

  selectCurso.value = valorForm;
  filtroCurso.value = valorFiltro;
}

function desenharCursos() {
  if (cursos.length === 0) {
    tbodyCursos.innerHTML = '<tr><td colspan="3" class="loading">Nenhum curso registado.</td></tr>';
    return;
  }
  tbodyCursos.innerHTML = cursos
    .map((c) => {
      const total = alunos.filter((a) => String(a.idCurso) === String(c.id)).length;
      return `
        <tr>
          <td>${escapar(c.nomeDoCurso)}</td>
          <td>${total}</td>
          <td class="acoes">
            <button class="btn-edit" data-acao="editar-curso" data-id="${escapar(c.id)}">Editar</button>
            <button class="btn-delete" data-acao="apagar-curso" data-id="${escapar(c.id)}">Apagar</button>
          </td>
        </tr>`;
    })
    .join('');
}

function resetarCursoForm() {
  cursoForm.reset();
  inputCursoId.value = '';
  btnCursoSubmit.textContent = 'Adicionar curso';
  btnCursoCancel.hidden = true;
}

cursoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const dados = { nomeDoCurso: inputNomeCurso.value.trim() };
  if (!dados.nomeDoCurso) return;

  try {
    if (inputCursoId.value) {
      await api(`/cursos/${inputCursoId.value}`, { method: 'PUT', body: JSON.stringify(dados) });
      mostrarMensagem('Curso atualizado.');
    } else {
      await api('/cursos', { method: 'POST', body: JSON.stringify(dados) });
      mostrarMensagem('Curso adicionado.');
    }
    resetarCursoForm();
    await carregarCursos();
    desenharAlunos();
  } catch (err) {
    mostrarMensagem(`Erro ao guardar curso: ${err.message}`, 'erro');
  }
});

btnCursoCancel.addEventListener('click', resetarCursoForm);

tbodyCursos.addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-acao]');
  if (!btn) return;
  const id = btn.dataset.id;
  const curso = cursos.find((c) => String(c.id) === id);

  if (btn.dataset.acao === 'editar-curso' && curso) {
    inputCursoId.value = id;
    inputNomeCurso.value = curso.nomeDoCurso;
    btnCursoSubmit.textContent = 'Guardar curso';
    btnCursoCancel.hidden = false;
    inputNomeCurso.focus();
  }

  if (btn.dataset.acao === 'apagar-curso') {
    const inscritos = alunos.filter((a) => String(a.idCurso) === id).length;
    if (inscritos > 0) {
      mostrarMensagem(`Não é possível apagar: o curso tem ${inscritos} aluno(s).`, 'erro');
      return;
    }
    if (!confirm('Tem a certeza que deseja apagar este curso?')) return;
    try {
      await api(`/cursos/${id}`, { method: 'DELETE' });
      mostrarMensagem('Curso apagado.');
      await carregarCursos();
    } catch (err) {
      mostrarMensagem(`Erro ao apagar curso: ${err.message}`, 'erro');
    }
  }
});

// ---------- Alunos ----------

async function carregarAlunos() {
  tbodyAlunos.innerHTML = '<tr><td colspan="6" class="loading">A carregar alunos...</td></tr>';
  try {
    alunos = await api('/alunos');
  } catch (err) {
    alunos = [];
    tbodyAlunos.innerHTML = `<tr><td colspan="6" class="loading">Erro ao carregar alunos: ${escapar(err.message)}</td></tr>`;
    return;
  }
  desenharAlunos();
  desenharCursos(); // atualiza a contagem de alunos por curso
}

function desenharAlunos() {
  const filtro = filtroCurso.value;
  const lista = filtro ? alunos.filter((a) => String(a.idCurso) === filtro) : alunos;

  if (lista.length === 0) {
    tbodyAlunos.innerHTML = '<tr><td colspan="6" class="loading">Nenhum aluno registado.</td></tr>';
    return;
  }

  tbodyAlunos.innerHTML = lista
    .map((a) => `
      <tr>
        <td>${escapar(a.nome)}</td>
        <td>${escapar(a.apelido)}</td>
        <td>${escapar(nomeDoCurso(a.idCurso))}</td>
        <td>${escapar(a.anoCurricular)}º</td>
        <td>${a.idade != null ? escapar(a.idade) : '—'}</td>
        <td class="acoes">
          <button class="btn-edit" data-acao="editar" data-id="${escapar(a.id)}">Editar</button>
          <button class="btn-delete" data-acao="apagar" data-id="${escapar(a.id)}">Apagar</button>
        </td>
      </tr>`)
    .join('');
}

// Pré-carregar o formulário para edição
async function editarAluno(id) {
  try {
    const aluno = await api(`/alunos/${id}`);
    inputId.value = aluno.id;
    inputNome.value = aluno.nome;
    inputApelido.value = aluno.apelido;
    selectCurso.value = String(aluno.idCurso);
    selectAno.value = String(aluno.anoCurricular);
    inputIdade.value = aluno.idade ?? '';
    formTitle.textContent = 'Editar Aluno';
    btnSubmit.textContent = 'Guardar';
    btnCancel.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    inputNome.focus();
  } catch (err) {
    mostrarMensagem(`Erro ao carregar aluno: ${err.message}`, 'erro');
  }
}

async function apagarAluno(id) {
  if (!confirm('Tem a certeza que deseja apagar este aluno?')) return;
  try {
    await api(`/alunos/${id}`, { method: 'DELETE' });
    mostrarMensagem('Aluno apagado.');
    if (String(inputId.value) === String(id)) resetarForm();
    await carregarAlunos();
  } catch (err) {
    mostrarMensagem(`Erro ao apagar aluno: ${err.message}`, 'erro');
  }
}

function resetarForm() {
  form.reset();
  inputId.value = '';
  formTitle.textContent = 'Adicionar Aluno';
  btnSubmit.textContent = 'Adicionar';
  btnCancel.hidden = true;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const dados = {
    nome: inputNome.value.trim(),
    apelido: inputApelido.value.trim(),
    idCurso: converterId(selectCurso.value),
    anoCurricular: Number(selectAno.value)
  };
  if (inputIdade.value !== '') dados.idade = Number(inputIdade.value);

  btnSubmit.disabled = true;
  try {
    if (inputId.value) {
      await api(`/alunos/${inputId.value}`, { method: 'PUT', body: JSON.stringify(dados) });
      mostrarMensagem('Aluno atualizado.');
    } else {
      await api('/alunos', { method: 'POST', body: JSON.stringify(dados) });
      mostrarMensagem('Aluno adicionado.');
    }
    resetarForm();
    await carregarAlunos();
  } catch (err) {
    mostrarMensagem(`Erro ao guardar aluno: ${err.message}`, 'erro');
  } finally {
    btnSubmit.disabled = false;
  }
});

btnCancel.addEventListener('click', resetarForm);
filtroCurso.addEventListener('change', desenharAlunos);

// Delegação de eventos para os botões da tabela
tbodyAlunos.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-acao]');
  if (!btn) return;
  if (btn.dataset.acao === 'editar') editarAluno(btn.dataset.id);
  if (btn.dataset.acao === 'apagar') apagarAluno(btn.dataset.id);
});

// ---------- Inicialização ----------
(async function iniciar() {
  $('api-url').textContent = API_BASE || window.location.origin;
  await carregarCursos();
  await carregarAlunos();
})();
