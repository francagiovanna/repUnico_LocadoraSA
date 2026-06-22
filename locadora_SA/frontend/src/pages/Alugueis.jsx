import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import {
  getAlugueis,
  criarAluguel,
  encerrarAluguel,
  getJogos,
  getUsuarios,
} from "../services/api";

const emptyForm = {
  game_id: "",
  customer_id: "",
  due_date: "",
};

export default function Alugueis() {
  const [alugueis, setAlugueis] = useState([]);
  const [jogos, setJogos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregar() {
    setCarregando(true);
    setErro("");
    try {
      const [dadosAlugueis, dadosJogos, dadosClientes] = await Promise.all([
        getAlugueis(),
        getJogos(),
        getUsuarios(),
      ]);
      setAlugueis(dadosAlugueis);
      setJogos(dadosJogos);
      setClientes(dadosClientes);
    } catch (err) {
      setErro(err.message || "Erro ao carregar dados");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => { carregar(); }, []);

  function abrirNovo() {
    setForm(emptyForm);
    setErro("");
    setModal(true);
  }

  async function salvar() {
    if (!form.game_id || !form.customer_id || !form.due_date) {
      setErro("Preencha cliente, jogo e data de devolução.");
      return;
    }
    try {
      await criarAluguel(form);
      setModal(false);
      await carregar();
    } catch (err) {
      setErro(err.message || "Erro ao criar aluguel");
    }
  }

  async function encerrar(id) {
    if (!window.confirm("Encerrar este aluguel?")) return;
    try {
      await encerrarAluguel(id);
      await carregar();
    } catch (err) {
      alert(err.message || "Erro ao encerrar aluguel");
    }
  }

  // separados e disponíveis para uso nos testes e na UI
  const ativos = alugueis.filter((a) => !a.dataFinalizacao);
  const finalizados = alugueis.filter((a) => a.dataFinalizacao);

  return (
    <div>
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-border">
        <div>
          <div className="font-display text-2xl font-bold text-neon tracking-widest [text-shadow:0_0_15px_var(--color-neon)]">
            Aluguéis
          </div>
          <div className="text-xs text-dim mt-1 tracking-wider">
            {ativos.length} ativos · {finalizados.length} finalizados
          </div>
        </div>
        <button
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs tracking-widest uppercase border border-neon text-neon bg-transparent cursor-pointer transition-all duration-150 hover:bg-neon hover:text-surface hover:shadow-[0_0_16px_var(--color-neon)]"
          onClick={abrirNovo}
        >
          + Novo aluguel
        </button>
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
                {["Cliente","Jogo","Retirada","Devolução","Valor","Status","Ações"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alugueis.map((aluguel) => (
                <tr
                  key={aluguel.id}
                  data-testid="aluguel-row"
                  className="border-b border-border last:border-b-0 hover:bg-neon/3 transition-colors"
                >
                  <td className="px-4 py-3 text-ink">{aluguel.cliente}</td>
                  <td className="px-4 py-3 text-ink">{aluguel.jogo}</td>
                  <td className="px-4 py-3 text-ink">{aluguel.dataRetirada?.split("T")[0]}</td>
                  <td className="px-4 py-3 text-ink">{aluguel.dataDevolucao?.split("T")[0]}</td>
                  <td className="px-4 py-3 text-ink">R$ {Number(aluguel.valorTotal).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 text-[0.6rem] tracking-widest uppercase border ${
                      aluguel.dataFinalizacao
                        ? "border-success text-success"
                        : "border-neon-3 text-neon-3"
                    }`}>
                      {aluguel.dataFinalizacao ? "Finalizado" : "Em aberto"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {!aluguel.dataFinalizacao && (
                      <button
                        className="px-2.5 py-1.5 text-[0.65rem] tracking-widest uppercase border border-danger text-danger bg-transparent cursor-pointer transition-all duration-150 hover:bg-danger hover:text-white hover:shadow-[0_0_12px_var(--color-danger)]"
                        onClick={() => encerrar(aluguel.id)}
                      >
                        Encerrar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <Modal title="Novo aluguel" onClose={() => setModal(false)}>
          {erro && (
            <div className="mb-4 border border-danger bg-danger/10 text-danger px-3 py-2 text-sm">
              {erro}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-1.5">Cliente</label>
            <select
              className="w-full bg-surface-3 border border-border text-ink font-mono text-sm px-3 py-2.5 outline-none appearance-none focus:border-neon"
              value={form.customer_id}
              onChange={(e) => setForm({ ...form, customer_id: e.target.value })}
            >
              <option value="">Selecione um cliente</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-1.5">Jogo</label>
            <select
              className="w-full bg-surface-3 border border-border text-ink font-mono text-sm px-3 py-2.5 outline-none appearance-none focus:border-neon"
              value={form.game_id}
              onChange={(e) => setForm({ ...form, game_id: e.target.value })}
            >
              <option value="">Selecione um jogo</option>
              {jogos.filter((j) => Number(j.estoque) > 0).map((j) => (
                <option key={j.id} value={j.id}>
                  {j.titulo} ({j.estoque} disponíveis)
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-1.5">Data de devolução</label>
            <input
              type="date"
              className="w-full bg-surface-3 border border-border text-ink font-mono text-sm px-3 py-2.5 outline-none focus:border-neon"
              value={form.due_date}
              onChange={(e) => setForm({ ...form, due_date: e.target.value })}
            />
          </div>

          <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-border">
            <button
              className="px-4 py-2 text-xs tracking-widest uppercase border border-danger text-danger bg-transparent cursor-pointer transition-all duration-150 hover:bg-danger hover:text-white"
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