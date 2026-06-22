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

  useEffect(() => {
    carregar();
  }, []);

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
      carregar();
    } catch (err) {
      setErro(err.message || "Erro ao criar aluguel");
    }
  }

  async function encerrar(id) {
    if (!window.confirm("Encerrar este aluguel?")) return;

    try {
      await encerrarAluguel(id);
      carregar();
    } catch (err) {
      alert(err.message || "Erro ao encerrar aluguel");
    }
  }

  const ativos = alugueis.filter(
    (a) => !a.dataFinalizacao
  );

  const finalizados = alugueis.filter(
    (a) => a.dataFinalizacao
  );

  console.log("ALUGUEL 1:", alugueis[0]);

  console.log("CLIENTES:", clientes);
  console.log("CLIENTE 1:", clientes[0]);

  console.log("JOGOS:", jogos);
  console.log("JOGO 1:", jogos[0]);

  return (
    <div>
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-border">
        <div>
          <div className="font-display text-2xl font-bold text-neon tracking-widest">
            Aluguéis
          </div>
          <div className="text-xs text-dim mt-1 tracking-wider">
            Controle de aluguéis
          </div>
        </div>

        <button
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs tracking-widest uppercase border border-neon text-neon"
          onClick={abrirNovo}
        >
          + Novo aluguel
        </button>
      </div>

      <div
        className="grid gap-4 mb-8"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
      >
        <div className="bg-panel border border-border p-5">
          <div className="text-[0.65rem] uppercase tracking-[0.15em] text-dim mb-2">
            Aluguéis ativos
          </div>
          <div className="font-retro text-4xl text-neon">
            {ativos.length}
          </div>
        </div>

        <div className="bg-panel border border-border p-5">
          <div className="text-[0.65rem] uppercase tracking-[0.15em] text-dim mb-2">
            Finalizados
          </div>
          <div className="font-retro text-4xl text-success">
            {finalizados.length}
          </div>
        </div>
      </div>

      {erro && !modal && (
        <div className="mb-4 border border-danger bg-danger/10 text-danger px-3 py-2 text-sm">
          {erro}
        </div>
      )}

      <div className="bg-panel border border-border overflow-auto">
        {carregando ? (
          <div className="py-10 text-center text-dim text-sm">
            Carregando...
          </div>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-surface-3 border-b border-border">
                <th className="px-4 py-3 text-left">Cliente</th>
                <th className="px-4 py-3 text-left">Jogo</th>
                <th className="px-4 py-3 text-left">Retirada</th>
                <th className="px-4 py-3 text-left">Devolução</th>
                <th className="px-4 py-3 text-left">Valor</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Ações</th>
              </tr>
            </thead>

            <tbody>
              {alugueis.map((aluguel) => (
                <tr key={aluguel.id}>
                  <td className="px-4 py-3">
                    {aluguel.cliente}
                  </td>

                  <td className="px-4 py-3">
                    {aluguel.jogo}
                  </td>

                  <td className="px-4 py-3">
                    {aluguel.dataRetirada?.split("T")[0]}
                  </td>

                  <td className="px-4 py-3">
                    {aluguel.dataDevolucao?.split("T")[0]}
                  </td>

                  <td className="px-4 py-3">
                    R$ {Number(aluguel.valorTotal).toFixed(2)}
                  </td>

                  <td className="px-4 py-3">
                    {aluguel.dataFinalizacao
                      ? "Finalizado"
                      : "Em aberto"}
                  </td>

                  <td className="px-4 py-3">
                    {!aluguel.dataFinalizacao && (
                      <button
                        className="px-2 py-1 border border-danger text-danger"
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
          <div className="py-10 text-center text-dim text-sm">
            Nenhum aluguel encontrado
          </div>
        )}
      </div>

      {modal && (
        <Modal
          title="Novo aluguel"
          onClose={() => setModal(false)}
        >
          {erro && (
            <div className="mb-4 border border-danger bg-danger/10 text-danger px-3 py-2 text-sm rounded">
              {erro}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm text-dim mb-2">
              Cliente
            </label>

            <select
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                border: "1px solid #444",
              }}
              className="w-full rounded px-3 py-2"
              value={form.customer_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  customer_id: e.target.value,
                })
              }
            >
              <option value="">Selecione um cliente</option>

              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-sm text-dim mb-2">
              Jogo
            </label>

            <select
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                border: "1px solid #444",
              }}
              className="w-full rounded px-3 py-2"
              value={form.game_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  game_id: e.target.value,
                })
              }
            >
              <option value="">Selecione um jogo</option>

              {jogos
                .filter((j) => Number(j.estoque) > 0)
                .map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.titulo} ({j.estoque} disponíveis)
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-dim mb-2">
              Data de devolução
            </label>

            <input
              type="date"
              className="w-full bg-surface-3 border border-border rounded px-3 py-2 text-white outline-none focus:border-neon"
              value={form.due_date}
              onChange={(e) =>
                setForm({
                  ...form,
                  due_date: e.target.value,
                })
              }
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 border border-border rounded hover:border-neon"
              onClick={() => setModal(false)}
            >
              Cancelar
            </button>

            <button
              className="px-4 py-2 bg-neon text-black rounded font-semibold"
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