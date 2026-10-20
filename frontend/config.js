// Configuração do endereço da API usado pelo frontend
//
//  - Servido pelo JSON-server (porta 3000)  -> API simulada na mesma origem (/alunos, /cursos)
//  - Servido pelo backend Express (porta 5000) -> API real na mesma origem (/api/alunos, ...)
//  - Qualquer outro sítio (Vercel/Render)    -> API real publicada no Render (API_PRODUCAO)
//  - Também se pode forçar com ?api=URL     -> ex.: index.html?api=http://localhost:5000/api
//
// Depois de fazer o deploy no Render, confirmar que o URL abaixo é o do vosso serviço.
const API_PRODUCAO = 'https://sir-restapi-at1.onrender.com/api';

const API_BASE = (() => {
  const forcado = new URLSearchParams(window.location.search).get('api');
  if (forcado) return forcado.replace(/\/$/, '');

  const { hostname, port, protocol } = window.location;
  const local = hostname === 'localhost' || hostname === '127.0.0.1';

  if (local && port === '3000') return '';      // JSON-server
  if (local && port === '5000') return '/api';  // Backend Express local
  if (protocol === 'file:') return 'http://localhost:3000';
  return API_PRODUCAO;
})();
