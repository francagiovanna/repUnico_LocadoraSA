const API_URL = "http://localhost:3000";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  if (response.status === 204) return null;
  return response.json();
}

// Usuários (RF07, RF08, RF11, RF12)
export const getUsuarios = () => request("/usuarios");
export const criarUsuario = (usuario) =>
  request("/usuarios", { method: "POST", body: JSON.stringify(usuario) });
export const atualizarUsuario = (id, usuario) =>
  request(`/usuarios/${id}`, { method: "PUT", body: JSON.stringify(usuario) });
export const excluirUsuario = (id) =>
  request(`/usuarios/${id}`, { method: "DELETE" });

// Jogos (RF03-RF06, RF13)
export const getJogos = (busca = "") =>
  request(`/jogos${busca ? `?busca=${encodeURIComponent(busca)}` : ""}`);
export const criarJogo = (jogo) =>
  request("/jogos", { method: "POST", body: JSON.stringify(jogo) });
export const atualizarJogo = (id, jogo) =>
  request(`/jogos/${id}`, { method: "PUT", body: JSON.stringify(jogo) });
export const excluirJogo = (id) =>
  request(`/jogos/${id}`, { method: "DELETE" });

// Aluguéis (RF09, RF10, RF14)
export const getAlugueis = (usuarioId) =>
  request(usuarioId ? `/alugueis?usuarioId=${usuarioId}` : "/alugueis");
export const criarAluguel = (aluguel) =>
  request("/alugueis", { method: "POST", body: JSON.stringify(aluguel) });
export const encerrarAluguel = (id) =>
  request(`/alugueis/${id}/encerrar`, { method: "PATCH" });