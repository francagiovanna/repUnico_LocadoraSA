import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { getAlugueis, criarAluguel, encerrarAluguel, getJogos, getClientes } from "../services/api";

const emptyForm = {
  jogoId: "",
  clienteId: "",
  dataDevolucao: "",
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
        getClientes(),
      ]);
      setAlugueis(dadosAlugueis);
      setJogos(dadosJogos);
      setClientes(dadosClientes);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  function abrirNovo() {
    setForm(emptyForm);
    setErro("");
    setModal(true);
  }

  async function salvar() {
    if (!form.jogoId || !form.clienteId || !form.dataDevolucao) {
      setErro("Preencha cliente, jogo e data de devolução.");
      return;
    }
    try {
      await criarAluguel(form);
      setModal(false);
      carregar();
    } catch (err) {
      setErro(err.message);
    }
  }

  async function encerrar(id) {
    if (!confirm("Encerrar este aluguel?")) return;
    try {
      await encerrarAluguel(id);
      carregar();
    } catch (err) {
      alert(err.message);
    }
  }

  const ativos = alugueis.filter((a) => !a.dataFinalizacao);
  const finalizados = alugueis.filter((a) => a.dataFinalizacao);

  return (
    <div>
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-border">
        <div>
          <div className="font-display text-2xl font-bold text-neon tracking-widest [text-shadow:0_0_15px_var(--color-neon)]">
            Aluguéis
          </div>
          <div className="text-xs text-dim mt-1 tracking-wider">Controle de aluguéis</div>
        </div>

        <button
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs tracking-widest uppercase border border-neon text-neon bg-transparent cursor-pointer transition-all duration-150 hover:bg-neon hover:text-surface hover:shadow-[0_0_16px_var(--color-neon)]"
          onClick={abrirNovo}
        >
          + Novo aluguel
        </button>
      </div>

      <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        <div className="relative overflow-hidden bg-panel border border-border p-5">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-neon shadow-[0_0_10px_var(--color-neon)]" />
          <div className="text-[0.65rem] uppercase tracking-[0.15em] text-dim mb-2">Aluguéis ativos</div>
          <div className="font-retro text-4xl text-neon">{ativos.length}</div>
        </div>

        <div className="relative overflow-hidden bg-panel border border-border p-5">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-success shadow-[0_0_10px_var(--color-success)]" />
          <div className="text-[0.65rem] uppercase tracking-[0.15em] text-dim mb-2">Finalizados</div>
          <div className="font-retro text-4xl text-success">{finalizados.length}</div>
        </div>
      </div>

      {erro && !modal && (
        <div className="mb-4 border border-danger bg-danger/10 text-danger px-3 py-2 text-sm">{erro}</div>
      )}

      <div className="bg-panel border border-border overflow-auto">
        {carregando ? (
          <div className="py-10 text-center text-dim text-sm">Carregando...</div>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-surface-3 border-b border-border">
                <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Cliente</th>
                <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Jogo</th>
                <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Retirada</th>
                <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Devolução</th>
                <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Status</th>
                <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">Ações</th>
              </tr>
            </thead>

            <tbody>
              {alugueis.map((aluguel) => (
                <tr key={aluguel.id} className="border-b border-border last:border-b-0 hover:bg-neon/3 transition-colors">
                  <td className="px-4 py-3 text-ink">{aluguel.cliente}</td>
                  <td className="px-4 py-3 text-ink">{aluguel.jogo}</td>
                  <td className="px-4 py-3 text-ink">{aluguel.dataRetirada}</td>
                  <td className="px-4 py-3 text-ink">{aluguel.dataDevolucao}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 text-[0.6rem] tracking-widest uppercase border border-neon-3 text-neon-3">
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

        {!carregando && alugueis.length === 0 && (
          <div className="py-10 text-center text-dim text-sm">Nenhum aluguel encontrado</div>
        )}
      </div>

      {modal && (
        <Modal title="Novo aluguel" onClose={() => setModal(false)}>
          {erro && (
            <div className="mb-4 border border-danger bg-danger/10 text-danger px-3 py-2 text-sm">{erro}</div>
          )}

          <div className="mb-4">
            <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-1.5">Cliente</label>
            <select
              className="w-full bg-surface-3 border border-border text-ink px-3 py-2.5 outline-none focus:border-neon"
              value={form.clienteId}
              onChange={(e) => setForm({ ...form, clienteId: e.target.value })}
            >
              <option value="">Selecione</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-1.5">Jogo</label>
            <select
              className="w-full bg-surface-3 border border-border text-ink px-3 py-2.5 outline-none focus:border-neon"
              value={form.jogoId}
              onChange={(e) => setForm({ ...form, jogoId: e.target.value })}
            >
              <option value="">Selecione</option>
              {jogos.filter((j) => j.estoque > 0).map((j) => (
                <option key={j.id} value={j.id}>{j.titulo} ({j.estoque} disp.)</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-1.5">Data de devolução</label>
            <input
              type="date"
              className="w-full bg-surface-3 border border-border text-ink px-3 py-2.5 outline-none focus:border-neon"
              value={form.dataDevolucao}
              onChange={(e) => setForm({ ...form, dataDevolucao: e.target.value })}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-border">
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