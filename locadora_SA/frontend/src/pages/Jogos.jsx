import { useState } from "react";
import Modal from "../components/Modal";

const GENEROS = [
  "Ação",
  "Aventura",
  "Corrida",
  "Esporte",
  "Luta",
  "Plataforma",
  "RPG",
];

const PLATAFORMAS = [
  "NES",
  "SNES",
  "Mega Drive",
  "PS1",
  "N64",
];

const initialJogos = [
  {
    id: 1,
    titulo: "Street Fighter II",
    genero: "Luta",
    plataforma: "SNES",
    quantidade: 3,
    disponivel: 2,
  },
  {
    id: 2,
    titulo: "Mario Kart 64",
    genero: "Corrida",
    plataforma: "N64",
    quantidade: 2,
    disponivel: 1,
  },
  {
    id: 3,
    titulo: "Tekken 3",
    genero: "Luta",
    plataforma: "PS1",
    quantidade: 4,
    disponivel: 4,
  },
];

const emptyForm = {
  titulo: "",
  genero: "",
  plataforma: "",
  quantidade: 1,
};

export default function Jogos() {
  const [jogos, setJogos] = useState(initialJogos);
  const [busca, setBusca] = useState("");
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = jogos.filter((j) =>
    j.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  function abrirCriar() {
    setEditando(null);
    setForm(emptyForm);
    setModal(true);
  }

  function abrirEditar(jogo) {
    setEditando(jogo.id);

    setForm({
      titulo: jogo.titulo,
      genero: jogo.genero,
      plataforma: jogo.plataforma,
      quantidade: jogo.quantidade,
    });

    setModal(true);
  }

  function salvar() {
    if (!form.titulo || !form.genero || !form.plataforma) return;

    if (editando) {
      setJogos((j) =>
        j.map((jg) =>
          jg.id === editando
            ? {
                ...jg,
                ...form,
                disponivel: form.quantidade,
              }
            : jg
        )
      );
    } else {
      setJogos((j) => [
        ...j,
        {
          id: Date.now(),
          ...form,
          disponivel: Number(form.quantidade),
        },
      ]);
    }

    setModal(false);
  }

  function excluir(id) {
    if (confirm("Excluir este jogo?")) {
      setJogos((j) => j.filter((jg) => jg.id !== id));
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

      <div className="bg-panel border border-border overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-surface-3 border-b border-border">
              <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">#</th>
              <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Título</th>
              <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Gênero</th>
              <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Plataforma</th>
              <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Qtd</th>
              <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Disponível</th>
              <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Ações</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((jogo) => (
              <tr key={jogo.id} className="border-b border-border last:border-b-0 hover:bg-neon/3 transition-colors">
                <td className="px-4 py-3 text-ink">{jogo.id}</td>

                <td className="px-4 py-3 text-ink">
                  <strong>{jogo.titulo}</strong>
                </td>

                <td className="px-4 py-3 text-ink">{jogo.genero}</td>

                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-0.5 text-[0.6rem] tracking-widest uppercase border border-neon-3 text-neon-3">
                    {jogo.plataforma}
                  </span>
                </td>

                <td className="px-4 py-3 text-ink">{jogo.quantidade}</td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 text-[0.6rem] tracking-widest uppercase border ${
                      jogo.disponivel > 0
                        ? "border-success text-success"
                        : "border-danger text-danger"
                    }`}
                  >
                    {jogo.disponivel > 0
                      ? `${jogo.disponivel} disp.`
                      : "Indisponível"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      className="px-2.5 py-1.5 text-[0.65rem]tracking-widest uppercase border border-neon text-neon bg-transparent cursor-pointer transition-all duration-150 hover:bg-neon hover:text-surface hover:shadow-[0_0_16px_var(--color-neon)]"
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
      </div>

      {modal && (
        <Modal
          title={editando ? "Editar jogo" : "Novo jogo"}
          onClose={() => setModal(false)}
        >
          <div className="mb-4">
            <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-1.5">
              Título
            </label>

            <input
              className="w-full bg-surface-3 border border-border text-ink font-mono text-sm px-3 py-2.5 outline-none focus:border-neon focus:shadow-[0_0_8px_rgba(0,255,231,0.2)]"
              value={form.titulo}
              onChange={(e) =>
                setForm({
                  ...form,
                  titulo: e.target.value,
                })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-1.5">
                Gênero
              </label>

              <select
                className="w-full bg-surface-3 border border-border text-ink font-mono text-sm px-3 py-2.5 outline-none appearance-none focus:border-neon focus:shadow-[0_0_8px_rgba(0,255,231,0.2)]"
                value={form.genero}
                onChange={(e) =>
                  setForm({ ...form, genero: e.target.value })
                }
              >
                <option value="">Selecione</option>
                {GENEROS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-1.5">
                Plataforma
              </label>

              <select
                className="w-full bg-surface-3 border border-border text-ink font-mono text-sm px-3 py-2.5 outline-none appearance-none focus:border-neon focus:shadow-[0_0_8px_rgba(0,255,231,0.2)]"
                value={form.plataforma}
                onChange={(e) =>
                  setForm({ ...form, plataforma: e.target.value })
                }
              >
                <option value="">Selecione</option>
                {PLATAFORMAS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-1.5">
              Quantidade
            </label>

            <input
              type="number"
              min="1"
              className="w-full bg-surface-3 border border-border text-ink font-mono text-sm px-3 py-2.5 outline-none focus:border-neon focus:shadow-[0_0_8px_rgba(0,255,231,0.2)]"
              value={form.quantidade}
              onChange={(e) =>
                setForm({ ...form, quantidade: e.target.value })
              }
            />
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