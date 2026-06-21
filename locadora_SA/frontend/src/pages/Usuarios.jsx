import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import {
  getUsuarios,
  criarUsuario,
  atualizarUsuario,
  excluirUsuario,
} from "../services/api";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
};

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [modal, setModal] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [erro, setErro] = useState("");

  async function carregar() {
    try {
      const dados = await getUsuarios();
      setUsuarios(dados);
    } catch (err) {
      setErro("Não foi possível carregar os usuários.");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  function abrirNovo() {
    setEditandoId(null);
    setForm(emptyForm);
    setErro("");
    setModal(true);
  }

  function abrirEdicao(usuario) {
    setEditandoId(usuario.id);
    setForm({
      nome: usuario.nome ?? usuario.name ?? "",
      email: usuario.email,
      phone: usuario.phone ?? "",
    });
    setErro("");
    setModal(true);
  }

  async function salvar() {
    if (!form.name || !form.email) {
      setErro("Nome e e-mail são obrigatórios.");
      return;
    }

    try {
      if (editandoId) {
        await atualizarUsuario(editandoId, form);
      } else {
        await criarUsuario(form);
      }
      setModal(false);
      carregar();
    } catch (err) {
      setErro(err.message || "Erro ao salvar usuário.");
    }
  }

  async function excluir(id) {
    if (!confirm("Excluir este usuário?")) return;
    try {
      await excluirUsuario(id);
      carregar();
    } catch (err) {
      setErro("Erro ao excluir usuário.");
    }
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-border">
        <div>
          <div className="font-display text-2xl font-bold text-neon tracking-widest [text-shadow:0_0_15px_var(--color-neon)]">
            Usuários
          </div>
        </div>

        <button
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs tracking-widest uppercase border border-neon text-neon bg-transparent cursor-pointer transition-all duration-150 hover:bg-neon hover:text-surface hover:shadow-[0_0_16px_var(--color-neon)]"
          onClick={abrirNovo}
        >
          + Novo usuário
        </button>
      </div>

      {erro && !modal && (
        <div className="bg-danger/10 border border-danger text-danger text-xs px-3 py-2 mb-4">
          {erro}
        </div>
      )}

      <div className="bg-panel border border-border overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-surface-3 border-b border-border">
              <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Nome</th>
              <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">E-mail</th>
              <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Ações</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="border-b border-border last:border-b-0 hover:bg-neon/3 transition-colors">
                <td className="px-4 py-3 text-ink">{u.nome ?? u.name}</td>
                <td className="px-4 py-3 text-ink">{u.email}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      className="px-2.5 py-1.5 text-[0.65rem] tracking-widest uppercase border border-neon text-neon bg-transparent cursor-pointer transition-all duration-150 hover:bg-neon hover:text-surface hover:shadow-[0_0_16px_var(--color-neon)]"
                      onClick={() => abrirEdicao(u)}
                    >
                      Editar
                    </button>

                    <button
                      className="px-2.5 py-1.5 text-[0.65rem] tracking-widest uppercase border border-danger text-danger bg-transparent cursor-pointer transition-all duration-150 hover:bg-danger hover:text-white hover:shadow-[0_0_12px_var(--color-danger)]"
                      onClick={() => excluir(u.id)}
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
          title={editandoId ? "Editar usuário" : "Novo usuário"}
          onClose={() => setModal(false)}
        >
          {erro && (
            <div className="bg-danger/10 border border-danger text-danger text-xs px-3 py-2 mb-4">
              {erro}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-1.5">
              Nome
            </label>
            <input
              className="w-full bg-surface-3 border border-border text-ink font-mono text-sm px-3 py-2.5 outline-none focus:border-neon focus:shadow-[0_0_8px_rgba(0,255,231,0.2)]"
              value={form.name}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-1.5">
              E-mail
            </label>
            <input
              className="w-full bg-surface-3 border border-border text-ink font-mono text-sm px-3 py-2.5 outline-none focus:border-neon focus:shadow-[0_0_8px_rgba(0,255,231,0.2)]"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-1.5">
              Telefone
            </label>
            <input
              className="w-full bg-surface-3 border border-border text-ink font-mono text-sm px-3 py-2.5 outline-none focus:border-neon focus:shadow-[0_0_8px_rgba(0,255,231,0.2)]"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
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