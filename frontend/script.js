// JS para operações CRUD com Fetch API

// Configuração da API - mude conforme o ambiente
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://sir-restapi-at1.onrender.com';

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

// Carregar cursos no select
async function carregarCursos() {
  try {
    const resp = await fetch(`${API_BASE}/cursos`);
    const cursos = await resp.json();
    cursos.forEach(curso => {
      const opt = document.createElement('option');
      opt.value = curso.id;
      opt.textContent = curso.nomeDoCurso;
      selectCurso.appendChild(opt);
    });
  } catch (err) {
    console.error('Erro ao carregar cursos:', err);
  }
}

// Carregar e listar alunos
async function carregarAlunos() {
  tbody.innerHTML = '<tr><td colspan="7" class="loading">A carregar alunos...</td></tr>';
  try {
    const resp = await fetch(`${API_BASE}/alunos`);
    const alunos = await resp.json();

    if (alunos.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="loading">Nenhum aluno registado.</td></tr>';
      return;
    }

    tbody.innerHTML = '';
    for (const aluno of alunos) {
      const nomeCurso = await obterNomeCurso(aluno.idCurso);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${aluno.id}</td>
        <td>${aluno.nome}</td>
        <td>${aluno.apelido}</td>
        <td>${nomeCurso}</td>
        <td>${aluno.anoCurricular}º</td>
        <td>${aluno.idade}</td>
        <td>
          <button class="btn-edit" data-id="${aluno.id}">Editar</button>
          <button class="btn-delete" data-id="${aluno.id}">Apagar</button>
        </td>
      `;
      tbody.appendChild(tr);
    }

    // Eventos dos botões
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', () => editarAluno(btn.dataset.id));
    });
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => apagarAluno(btn.dataset.id));
    });

  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="7" class="loading">Erro ao carregar alunos.</td></tr>';
    console.error(err);
  }
}

// Obter nome do curso pelo id
async function obterNomeCurso(idCurso) {
  try {
    const resp = await fetch(`${API_BASE}/cursos/${idCurso}`);
    if (resp.ok) {
      const curso = await resp.json();
      return curso.nomeDoCurso;
    }
  } catch {}
  return 'Desconhecido';
}

// Adicionar aluno
async function adicionarAluno(dados) {
  const resp = await fetch(`${API_BASE}/alunos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  if (!resp.ok) throw new Error('Erro ao adicionar aluno');
  return resp.json();
}

// Atualizar aluno
async function atualizarAluno(id, dados) {
  const resp = await fetch(`${API_BASE}/alunos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  if (!resp.ok) throw new Error('Erro ao atualizar aluno');
  return resp.json();
}

// Apagar aluno
async function apagarAluno(id) {
  if (!confirm('Tem certeza que deseja apagar este aluno?')) return;
  try {
    const resp = await fetch(`${API_BASE}/alunos/${id}`, { method: 'DELETE' });
    if (!resp.ok) throw new Error('Erro ao apagar');
    carregarAlunos();
  } catch (err) {
    alert('Erro ao apagar aluno.');
    console.error(err);
  }
}

// Pré-carregar dados para edição
async function editarAluno(id) {
  try {
    const resp = await fetch(`${API_BASE}/alunos/${id}`);
    const aluno = await resp.json();
    inputId.value = aluno.id;
    inputNome.value = aluno.nome;
    inputApelido.value = aluno.apelido;
    selectCurso.value = aluno.idCurso;
    selectAno.value = aluno.anoCurricular;
    inputIdade.value = aluno.idade;
    formTitle.textContent = 'Editar Aluno';
    btnSubmit.textContent = 'Guardar';
    btnCancel.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    alert('Erro ao carregar dados do aluno.');
    console.error(err);
  }
}

// Resetar formulário
function resetarForm() {
  form.reset();
  inputId.value = '';
  formTitle.textContent = 'Adicionar Aluno';
  btnSubmit.textContent = 'Adicionar';
  btnCancel.hidden = true;
}

// Submit do formulário
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const dados = {
    nome: inputNome.value.trim(),
    apelido: inputApelido.value.trim(),
    idCurso: Number(selectCurso.value),
    anoCurricular: Number(selectAno.value),
    idade: Number(inputIdade.value)
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

// Cancelar edição
btnCancel.addEventListener('click', resetarForm);

// Inicialização
carregarCursos();
carregarAlunos();
