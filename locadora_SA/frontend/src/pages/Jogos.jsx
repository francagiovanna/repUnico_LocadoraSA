import { useState } from "react";
import Modal from "../components/Modal";

const GENEROS = [
  "Ação",
  "Aventura",
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
      <div className="page-header">
        <div>
          <div className="page-title">Jogos</div>
          <div className="page-subtitle">
            {jogos.length} títulos cadastrados
          </div>
        </div>

        <button className="btn btn-primary" onClick={abrirCriar}>
          + Novo jogo
        </button>
      </div>

      <div className="search-bar">
        <input
          className="search-input"
          placeholder="Buscar jogo..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Gênero</th>
              <th>Plataforma</th>
              <th>Qtd</th>
              <th>Disponível</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((jogo) => (
              <tr key={jogo.id}>
                <td>{jogo.id}</td>

                <td>
                  <strong>{jogo.titulo}</strong>
                </td>

                <td>{jogo.genero}</td>

                <td>
                  <span className="badge badge-yellow">
                    {jogo.plataforma}
                  </span>
                </td>

                <td>{jogo.quantidade}</td>

                <td>
                  <span
                    className={`badge ${
                      jogo.disponivel > 0
                        ? "badge-green"
                        : "badge-red"
                    }`}
                  >
                    {jogo.disponivel > 0
                      ? `${jogo.disponivel} disp.`
                      : "Indisponível"}
                  </span>
                </td>

                <td>
                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => abrirEditar(jogo)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
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
          <div className="form-group">
            <label className="form-label">Título</label>

            <input
              className="form-input"
              value={form.titulo}
              onChange={(e) =>
                setForm({
                  ...form,
                  titulo: e.target.value,
                })
              }
            />
          </div>

          <div className="modal-actions">
            <button
              className="btn btn-danger"
              onClick={() => setModal(false)}
            >
              Cancelar
            </button>

            <button className="btn btn-primary" onClick={salvar}>
              Salvar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}