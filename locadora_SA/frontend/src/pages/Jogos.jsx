import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { getJogos, criarJogo, atualizarJogo, excluirJogo } from "../services/api";

const GENEROS = ["Ação", "Aventura", "Corrida", "Esporte", "Luta", "Plataforma", "RPG"];
const PLATAFORMAS = ["NES", "SNES", "Mega Drive", "PS1", "N64", "PS5", "Switch"];

const emptyForm = {
  titulo: "",
  genero: "",
  plataforma: "",
  valorDiaria: "",
  estoque: 1,
};

export default function Jogos() {
  const [jogos, setJogos] = useState([]);
  const [busca, setBusca] = useState("");
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregar() {
    setCarregando(true);
    setErro("");
    try {
      const dados = await getJogos();
      setJogos(dados);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  const filtered = jogos.filter((j) =>
    j.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  function abrirCriar() {
    setEditando(null);
    setForm(emptyForm);
    setErro("");
    setModal(true);
  }

  function abrirEditar(jogo) {
    setEditando(jogo.id);
    setForm({
      titulo: jogo.titulo,
      genero: jogo.genero,
      plataforma: jogo.plataforma,
      valorDiaria: jogo.valorDiaria,
      estoque: jogo.estoque,
    });
    setErro("");
    setModal(true);
  }

async function salvar() {
  if (!form.titulo || !form.genero || !form.plataforma || !form.valorDiaria) {
    setErro("Preencha título, gênero, plataforma e valor da diária.");
    return;
  }

  try {
    const payload = {
      ...form,
      valorDiaria: Number(form.valorDiaria),
      estoque: Number(form.estoque),
    };

    if (editando) {
      await atualizarJogo(editando, payload);
    } else {
      await criarJogo(payload);
    }

    setModal(false);
    carregar();
  } catch (err) {
    setErro(err.message);
  }
}

  async function excluir(id) {
    if (!confirm("Excluir este jogo?")) return;
    try {
      await excluirJogo(id);
      carregar();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-border">
        <div>
          <div className="font-display text-2xl font-bold text-neon tracking-widest [text-shadow:0_0_15px_var(--color-neon)]">
            Jogos
          </div>
          <div className="text-xs text-dim mt-1 tracking-wider">
            {jogos.length} títulos cadastrados
          </div>
        </div>

        <button
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs tracking-widest uppercase border border-neon text-neon bg-transparent cursor-pointer transition-all duration-150 hover:bg-neon hover:text-surface hover:shadow-[0_0_16px_var(--color-neon)]"
          onClick={abrirCriar}
        >
          + Novo jogo
        </button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <input
          className="flex-1 bg-panel border border-border text-ink font-mono text-sm px-3 py-2 outline-none focus:border-neon placeholder:text-dim"
          placeholder="Buscar jogo..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {erro && !modal && (
        <div className="mb-4 border border-danger bg-danger/10 text-danger px-3 py-2 text-sm">
          {erro}
        </div>
      )}

      <div className="bg-panel border border-border overflow-auto">
        {carregando ? (
          <div className="py-10 text-center text-dim text-sm">Carregando...</div>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-surface-3 border-b border-border">
                <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">#</th>
                <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Título</th>
                <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Gênero</th>
                <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Plataforma</th>
                <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Diária</th>
                <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Estoque</th>
                <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Ações</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((jogo) => (
                <tr key={jogo.id} className="border-b border-border last:border-b-0 hover:bg-neon/3 transition-colors">
                  <td className="px-4 py-3 text-ink">{jogo.id}</td>
                  <td className="px-4 py-3 text-ink"><strong>{jogo.titulo}</strong></td>
                  <td className="px-4 py-3 text-ink">{jogo.genero}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 text-[0.6rem] tracking-widest uppercase border border-neon-3 text-neon-3">
                      {jogo.plataforma}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink">R$ {Number(jogo.valorDiaria).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 text-[0.6rem] tracking-widest uppercase border ${
                        jogo.estoque > 0 ? "border-success text-success" : "border-danger text-danger"
                      }`}
                    >
                      {jogo.estoque > 0 ? `${jogo.estoque} disp.` : "Indisponível"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        className="px-2.5 py-1.5 text-[0.65rem] tracking-widest uppercase border border-neon text-neon bg-transparent cursor-pointer transition-all duration-150 hover:bg-neon hover:text-surface hover:shadow-[0_0_16px_var(--color-neon)]"
                        onClick={() => abrirEditar(jogo)}
                      >
                        Editar
                      </button>
                      <button
                        className="px-2.5 py-1.5 text-[0.65rem] tracking-widest uppercase border border-danger text-danger bg-transparent cursor-pointer transition-all duration-150 hover:bg-danger hover:text-white hover:shadow-[0_0_12px_var(--color-danger)]"
                        onClick={() => excluir(jogo.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <Modal title={editando ? "Editar jogo" : "Novo jogo"} onClose={() => setModal(false)}>
          {erro && (
            <div className="mb-4 border border-danger bg-danger/10 text-danger px-3 py-2 text-sm">
              {erro}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-1.5">Título</label>
            <input
              className="w-full bg-surface-3 border border-border text-ink font-mono text-sm px-3 py-2.5 outline-none focus:border-neon focus:shadow-[0_0_8px_rgba(0,255,231,0.2)]"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-1.5">Gênero</label>
              <select
                className="w-full bg-surface-3 border border-border text-ink font-mono text-sm px-3 py-2.5 outline-none appearance-none focus:border-neon focus:shadow-[0_0_8px_rgba(0,255,231,0.2)]"
                value={form.genero}
                onChange={(e) => setForm({ ...form, genero: e.target.value })}
              >
                <option value="">Selecione</option>
                {GENEROS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-1.5">Plataforma</label>
              <select
                className="w-full bg-surface-3 border border-border text-ink font-mono text-sm px-3 py-2.5 outline-none appearance-none focus:border-neon focus:shadow-[0_0_8px_rgba(0,255,231,0.2)]"
                value={form.plataforma}
                onChange={(e) => setForm({ ...form, plataforma: e.target.value })}
              >
                <option value="">Selecione</option>
                {PLATAFORMAS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-1.5">Valor da diária (R$)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="w-full bg-surface-3 border border-border text-ink font-mono text-sm px-3 py-2.5 outline-none focus:border-neon focus:shadow-[0_0_8px_rgba(0,255,231,0.2)]"
                value={form.valorDiaria}
                onChange={(e) => setForm({ ...form, valorDiaria: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-1.5">Estoque</label>
              <input
                type="number"
                min="0"
                className="w-full bg-surface-3 border border-border text-ink font-mono text-sm px-3 py-2.5 outline-none focus:border-neon focus:shadow-[0_0_8px_rgba(0,255,231,0.2)]"
                value={form.estoque}
                onChange={(e) => setForm({ ...form, estoque: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-border">
            <button
              className="px-4 py-2 text-xs tracking-widest uppercase border border-danger text-danger bg-transparent cursor-pointer transition-all duration-150 hover:bg-danger hover:text-white hover:shadow-[0_0_12px_var(--color-danger)]"
              onClick={() => setModal(false)}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 text-xs tracking-widest uppercase border border-neon text-neon bg-transparent cursor-pointer transition-all duration-150 hover:bg-neon hover:text-surface hover:shadow-[0_0_16px_var(--color-neon)]"
              onClick={salvar}
            >
              Salvar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}