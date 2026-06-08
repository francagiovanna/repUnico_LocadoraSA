import { useState } from "react";
import Modal from "../components/Modal";

const initialUsuarios = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com",
    tipo: "cliente",
    ativo: true,
  },
];

const emptyForm = {
  nome: "",
  email: "",
  tipo: "cliente",
};

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState(initialUsuarios);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptyForm);

  function salvar() {
    setUsuarios((u) => [
      ...u,
      {
        id: Date.now(),
        ...form,
        ativo: true,
      },
    ]);

    setModal(false);
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Usuários</div>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setModal(true)}
        >
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
            </tr>
          </thead>

          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.nome}</td>
                <td>{u.email}</td>

                <td>
                  <span
                    className={`badge ${
                      u.ativo
                        ? "badge-green"
                        : "badge-red"
                    }`}
                  >
                    {u.ativo ? "Ativo" : "Inativo"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal
          title="Novo usuário"
          onClose={() => setModal(false)}
        >
          <div className="form-group">
            <label className="form-label">Nome</label>

            <input
              className="form-input"
              value={form.nome}
              onChange={(e) =>
                setForm({
                  ...form,
                  nome: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">E-mail</label>

            <input
              className="form-input"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="modal-actions">
            <button
              className="btn btn-primary"
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