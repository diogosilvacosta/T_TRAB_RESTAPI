// JS para operações CRUD com Fetch API

// Em localhost usa o JSON-server; online usa a API real no Render
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://sir-restapi-at1.onrender.com/api';

// Elementos do DOM
const form = document.getElementById('aluno-form');
const formTitle = document.getElementById('form-title');
const inputId = document.getElementById('aluno-id');
const inputNome = document.getElementById('nome');
const inputApelido = document.getElementById('apelido');
const selectCurso = document.getElementById('idCurso');
const selectAno = document.getElementById('anoCurricular');
const inputIdade = document.getElementById('idade');
const btnSubmit = document.getElementById('btn-submit');
const btnCancel = document.getElementById('btn-cancel');
const tbody = document.getElementById('tbody-alunos');
const filtroCurso = document.getElementById('filtro-curso');
const contador = document.getElementById('contador');

let cursos = [];
let alunos = [];

// O JSON-server usa "id" e o MongoDB usa "_id"
function idDe(aluno) {
  return aluno._id || aluno.id;
}

// Carregar cursos no select do formulário e no filtro
async function carregarCursos() {
  try {
    const resp = await fetch(`${API_BASE}/cursos`);
    cursos = await resp.json();
    cursos.forEach(curso => {
      selectCurso.appendChild(new Option(curso.nomeDoCurso, curso.id));
      filtroCurso.appendChild(new Option(curso.nomeDoCurso, curso.id));
    });
  } catch (err) {
    console.error('Erro ao carregar cursos:', err);
  }
}

// Nome do curso a partir do id
function nomeCurso(idCurso) {
  const curso = cursos.find(c => c.id == idCurso);
  return curso ? curso.nomeDoCurso : 'Desconhecido';
}

// Buscar os alunos à API (GET)
async function carregarAlunos() {
  tbody.innerHTML = '<tr><td colspan="6" class="loading">A carregar alunos...</td></tr>';
  try {
    const resp = await fetch(`${API_BASE}/alunos`);
    alunos = await resp.json();
    mostrarAlunos();
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="6" class="loading">Erro ao carregar alunos.</td></tr>';
    console.error(err);
  }
}

// Mostrar os alunos na tabela (só os do curso escolhido no filtro)
function mostrarAlunos() {
  const curso = filtroCurso.value;
  const lista = curso ? alunos.filter(a => a.idCurso == curso) : alunos;

  contador.textContent = `(${lista.length})`;

  if (lista.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="loading">Nenhum aluno neste curso.</td></tr>';
    return;
  }

  tbody.innerHTML = '';
  lista.forEach(aluno => {
    const tr = document.createElement('tr');
    // data-label é usado no telemóvel para mostrar o nome de cada campo
    tr.innerHTML = `
      <td data-label="Nome">${aluno.nome}</td>
      <td data-label="Apelido">${aluno.apelido}</td>
      <td data-label="Curso">${nomeCurso(aluno.idCurso)}</td>
      <td data-label="Ano">${aluno.anoCurricular}º</td>
      <td data-label="Idade">${aluno.idade ?? '-'}</td>
      <td class="acoes">
        <button class="btn-edit" onclick="editarAluno('${idDe(aluno)}')">Editar</button>
        <button class="btn-delete" onclick="apagarAluno('${idDe(aluno)}')">Apagar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Adicionar aluno (POST)
async function adicionarAluno(dados) {
  const resp = await fetch(`${API_BASE}/alunos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  if (!resp.ok) throw new Error('Erro ao adicionar aluno');
}

// Atualizar aluno (PUT)
async function atualizarAluno(id, dados) {
  const resp = await fetch(`${API_BASE}/alunos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  if (!resp.ok) throw new Error('Erro ao atualizar aluno');
}

// Apagar aluno (DELETE)
async function apagarAluno(id) {
  if (!confirm('Tem a certeza que deseja apagar este aluno?')) return;
  try {
    const resp = await fetch(`${API_BASE}/alunos/${id}`, { method: 'DELETE' });
    if (!resp.ok) throw new Error('Erro ao apagar');
    carregarAlunos();
  } catch (err) {
    alert('Erro ao apagar aluno.');
    console.error(err);
  }
}

// Preencher o formulário para editar (GET por id)
async function editarAluno(id) {
  try {
    const resp = await fetch(`${API_BASE}/alunos/${id}`);
    const aluno = await resp.json();
    inputId.value = idDe(aluno);
    inputNome.value = aluno.nome;
    inputApelido.value = aluno.apelido;
    selectCurso.value = aluno.idCurso;
    selectAno.value = aluno.anoCurricular;
    inputIdade.value = aluno.idade ?? '';
    formTitle.textContent = 'Editar Aluno';
    btnSubmit.textContent = 'Guardar';
    btnCancel.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    alert('Erro ao carregar dados do aluno.');
    console.error(err);
  }
}

// Limpar o formulário
function resetarForm() {
  form.reset();
  inputId.value = '';
  formTitle.textContent = 'Adicionar Aluno';
  btnSubmit.textContent = 'Adicionar';
  btnCancel.hidden = true;
}

// Submeter o formulário (adicionar ou editar)
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const dados = {
    nome: inputNome.value.trim(),
    apelido: inputApelido.value.trim(),
    idCurso: Number(selectCurso.value),
    anoCurricular: Number(selectAno.value),
    idade: Number(inputIdade.value) || undefined
  };

  try {
    if (inputId.value) {
      await atualizarAluno(inputId.value, dados);
    } else {
      await adicionarAluno(dados);
    }
    resetarForm();
    carregarAlunos();
  } catch (err) {
    alert('Erro ao guardar aluno.');
    console.error(err);
  }
});

btnCancel.addEventListener('click', resetarForm);

// Quando se muda o curso no filtro, volta a mostrar a lista
filtroCurso.addEventListener('change', mostrarAlunos);

// Iniciar
carregarCursos().then(carregarAlunos);
