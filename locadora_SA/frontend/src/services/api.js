const API_URL = "http://localhost:3000";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    const erro = await response.json().catch(() => ({}));
    throw new Error(erro.message || `Erro na requisição: ${response.status}`);
  }
  if (response.status === 204) return null;
  return response.json();
}

// =====================================================================
// JOGOS — back fala "games" (title, genre, platform, daily_price, stock)
// front fala "jogos" (titulo, genero, plataforma, valorDiaria, estoque)
// =====================================================================
function jogoParaApi(jogo) {
  return {
    title: jogo.titulo,
    genre: jogo.genero,
    platform: jogo.plataforma,
    daily_price: jogo.valorDiaria,
    stock: jogo.estoque,
  };
}

function jogoDaApi(jogo) {
  return {
    id: jogo.id,
    titulo: jogo.title,
    genero: jogo.genre,
    plataforma: jogo.platform,
    valorDiaria: jogo.daily_price,
    estoque: jogo.stock,
  };
}

export const getJogos = async () => {
  const jogos = await request("/games");
  return jogos.map(jogoDaApi);
};
export const criarJogo = (jogo) =>
  request("/games", { method: "POST", body: JSON.stringify(jogoParaApi(jogo)) });
export const atualizarJogo = (id, jogo) =>
  request(`/games/${id}`, { method: "PUT", body: JSON.stringify(jogoParaApi(jogo)) });
export const excluirJogo = (id) => request(`/games/${id}`, { method: "DELETE" });

// =====================================================================
// ALUGUÉIS — back fala "rentals" (game_id, customer_id, due_date, ...)
// front fala "alugueis" (jogoId, clienteId, dataDevolucao, ...)
// =====================================================================
function aluguelDaApi(a) {
  return {
    id: a.id,
    cliente: a.customer,
    jogo: a.game,
    plataforma: a.platform,
    dataRetirada: a.rented_at,
    dataDevolucao: a.due_date,
    dataFinalizacao: a.returned_at,
    valorTotal: a.total_price,
  };
}

export const getAlugueis = async () => {
  const alugueis = await request("/rentals");
  return alugueis.map(aluguelDaApi);
};
export const criarAluguel = ({ jogoId, clienteId, dataDevolucao }) =>
  request("/rentals", {
    method: "POST",
    body: JSON.stringify({
      game_id: jogoId,
      customer_id: clienteId,
      due_date: dataDevolucao,
    }),
  });
export const encerrarAluguel = (id) =>
  request(`/rentals/${id}/return`, { method: "PATCH" });

// =====================================================================
// CLIENTES — back fala "customers" (name, email, phone)
// usado no select de "novo aluguel" por enquanto
// =====================================================================
function clienteDaApi(c) {
  return { id: c.id, nome: c.name, email: c.email, telefone: c.phone };
}

export const getClientes = async () => {
  const clientes = await request("/customers");
  return clientes.map(clienteDaApi);
};

// =====================================================================
// USUÁRIOS (RF07/08/11/12) — PENDENTE de decisão de arquitetura
// (usuários do sistema vs. clientes que alugam jogos).
// Por enquanto aponta pra /customers, mesma tradução de Clientes acima.
// Revisar quando definirmos login/cadastro real.
// =====================================================================
export const getUsuarios = async () => {
  const usuarios = await request("/customers");
  return usuarios.map(clienteDaApi);
};
export const criarUsuario = (usuario) =>
  request("/customers", {
    method: "POST",
    body: JSON.stringify({ name: usuario.nome, email: usuario.email, phone: usuario.telefone }),
  });
export const atualizarUsuario = (id, usuario) =>
  request(`/customers/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name: usuario.nome, email: usuario.email, phone: usuario.telefone }),
  });
export const excluirUsuario = (id) =>
  request(`/customers/${id}`, { method: "DELETE" });