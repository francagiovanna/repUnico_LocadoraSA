import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import {
  getUsuarios,
  criarUsuario,
  atualizarUsuario,
  excluirUsuario,
} from "../services/api";

const emptyForm = {
  nome: "",
  email: "",
  tipo: "cliente",
};

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [modal, setModal] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  async function carregar() {
    const dados = await getUsuarios();
    setUsuarios(dados);
  }

  useEffect(() => {
    carregar();
  }, []);

  function abrirNovo() {
    setEditandoId(null);
    setForm(emptyForm);
    setModal(true);
  }

  function abrirEdicao(usuario) {
    setEditandoId(usuario.id);
    setForm({ nome: usuario.nome, email: usuario.email, tipo: usuario.tipo });
    setModal(true);
  }

  async function salvar() {
    if (editandoId) {
      await atualizarUsuario(editandoId, form);
    } else {
      await criarUsuario(form);
    }
    setModal(false);
    carregar();
  }

  async function excluir(id) {
    if (!confirm("Excluir este usuário?")) return;
    await excluirUsuario(id);
    carregar();
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Usuários</div>
        </div>

        <button className="btn btn-primary" onClick={abrirNovo}>
          + Novo usuário
        </button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.nome}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`badge ${u.ativo ? "badge-green" : "badge-red"}`}>
                    {u.ativo ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td>
                  <button className="btn btn-link" onClick={() => abrirEdicao(u)}>
                    Editar
                  </button>
                  <button className="btn btn-link btn-danger" onClick={() => excluir(u.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal
          title={editandoId ? "Editar usuário" : "Novo usuário"}
          onClose={() => setModal(false)}
        >
          <div className="form-group">
            <label className="form-label">Nome</label>
            <input
              className="form-input"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">E-mail</label>
            <input
              className="form-input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="modal-actions">
            <button className="btn btn-primary" onClick={salvar}>
              Salvar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}