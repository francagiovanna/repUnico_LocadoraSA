const API_URL = "http://localhost:3000";

async function request(path, options = {}) {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        data?.erro ||
        data?.message ||
        "Ocorreu um erro."
      );
    }

    return data;
  } catch (error) {
    if (
      error.message.includes("fetch") ||
      error.message.includes("Failed")
    ) {
      throw new Error(
        "Não foi possível conectar ao servidor."
      );
    }

    throw error;
  }
}

/* =====================================================
   JOGOS
===================================================== */

function jogoParaApi(jogo) {
  return {
    title: jogo.titulo,
    genre: jogo.genero,
    platform: jogo.plataforma,
    daily_price: Number(jogo.valorDiaria),
    stock: Number(jogo.estoque),
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

export async function getJogos() {
  const jogos = await request("/games");
  return jogos.map(jogoDaApi);
}

export async function criarJogo(jogo) {
  return request("/games", {
    method: "POST",
    body: JSON.stringify(jogoParaApi(jogo)),
  });
}

export async function atualizarJogo(id, jogo) {
  return request(`/games/${id}`, {
    method: "PUT",
    body: JSON.stringify(jogoParaApi(jogo)),
  });
}

export async function excluirJogo(id) {
  return request(`/games/${id}`, {
    method: "DELETE",
  });
}

/* =====================================================
   CLIENTES / USUÁRIOS
===================================================== */

function clienteDaApi(cliente) {
  return {
    id: cliente.id,
    nome: cliente.name,
    email: cliente.email,
    telefone: cliente.phone,
  };
}

export async function getClientes() {
  const clientes = await request("/customers");
  return clientes.map(clienteDaApi);
}

export async function getUsuarios() {
  const usuarios = await request("/customers");
  return usuarios.map(clienteDaApi);
}

export async function criarUsuario(usuario) {
  return request("/customers", {
    method: "POST",
    body: JSON.stringify({
      name: usuario.nome,
      email: usuario.email,
      phone: usuario.telefone,
    }),
  });
}

export async function atualizarUsuario(id, usuario) {
  return request(`/customers/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: usuario.nome,
      email: usuario.email,
      phone: usuario.telefone,
    }),
  });
}

export async function excluirUsuario(id) {
  return request(`/customers/${id}`, {
    method: "DELETE",
  });
}

/* =====================================================
   ALUGUÉIS
===================================================== */

function aluguelDaApi(aluguel) {
  return {
    id: aluguel.id,
    cliente: aluguel.customer?.name,
    jogo: aluguel.game?.title,
    plataforma: aluguel.game?.platform,
    dataRetirada: aluguel.rented_at,
    dataDevolucao: aluguel.due_date,
    dataFinalizacao: aluguel.returned_at,
    valorTotal: aluguel.total_price,
    status: aluguel.status,
  };
}

export async function getAlugueis() {
  const alugueis = await request("/rentals");
  return alugueis.map(aluguelDaApi);
}

export async function criarAluguel({
  game_id,
  customer_id,
  due_date,
}) {
  return request("/rentals", {
    method: "POST",
    body: JSON.stringify({
      game_id: Number(game_id),
      customer_id: Number(customer_id),
      due_date,
    }),
  });
}

export async function encerrarAluguel(id) {
  return request(`/rentals/${id}/return`, {
    method: "PATCH",
  });
}