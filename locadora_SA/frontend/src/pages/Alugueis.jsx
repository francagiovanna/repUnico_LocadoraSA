import { useState } from "react";

export default function Alugueis() {
  const [alugueis] = useState([
    {
      id: 1,
      usuario: "João Silva",
      jogo: "Mario Kart 64",
      retirada: "11/05/2026",
      devolucao: "14/05/2026",
      status: "Em aberto",
    },
  ]);

  return (
    <div>
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-border">
        <div>
          <div className="font-display text-2xl font-bold text-neon tracking-widest [text-shadow:0_0_15px_var(--color-neon)]">
            Aluguéis
          </div>

          <div className="text-xs text-dim mt-1 tracking-wider">
            Controle de aluguéis
          </div>
        </div>

        <button className="inline-flex items-center gap-1.5 px-4 py-2 text-xs tracking-widest uppercase border border-neon text-neon bg-transparent cursor-pointer transition-all duration-150 hover:bg-neon hover:text-surface hover:shadow-[0_0_16px_var(--color-neon)]">
          + Novo aluguel
        </button>
      </div>

      <div
        className="grid gap-4 mb-8"
        style={{
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
        }}
      >
        <div className="relative overflow-hidden bg-panel border border-border p-5">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-neon shadow-[0_0_10px_var(--color-neon)]" />

          <div className="text-[0.65rem] uppercase tracking-[0.15em] text-dim mb-2">
            Aluguéis ativos
          </div>

          <div className="font-retro text-4xl text-neon">
            {alugueis.length}
          </div>
        </div>

        <div className="relative overflow-hidden bg-panel border border-border p-5">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-neon-3 shadow-[0_0_10px_var(--color-neon-3)]" />

          <div className="text-[0.65rem] uppercase tracking-[0.15em] text-dim mb-2">
            Pendentes
          </div>

          <div className="font-retro text-4xl text-neon-3">
            1
          </div>
        </div>

        <div className="relative overflow-hidden bg-panel border border-border p-5">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-success shadow-[0_0_10px_var(--color-success)]" />

          <div className="text-[0.65rem] uppercase tracking-[0.15em] text-dim mb-2">
            Finalizados
          </div>

          <div className="font-retro text-4xl text-success">
            0
          </div>
        </div>
      </div>

      <div className="bg-panel border border-border overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-surface-3 border-b border-border">
              <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">
                Usuário
              </th>

              <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">
                Jogo
              </th>

              <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">
                Retirada
              </th>

              <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">
                Devolução
              </th>

              <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">
                Status
              </th>

              <th className="px-4 py-3 text-left font-display text-[0.6rem] tracking-[0.15em] uppercase text-neon">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {alugueis.map((aluguel) => (
              <tr
                key={aluguel.id}
                className="border-b border-border last:border-b-0 hover:bg-neon/3 transition-colors"
              >
                <td className="px-4 py-3 text-ink">
                  {aluguel.usuario}
                </td>

                <td className="px-4 py-3 text-ink">
                  {aluguel.jogo}
                </td>

                <td className="px-4 py-3 text-ink">
                  {aluguel.retirada}
                </td>

                <td className="px-4 py-3 text-ink">
                  {aluguel.devolucao}
                </td>

                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-0.5 text-[0.6rem] tracking-widest uppercase border border-neon-3 text-neon-3">
                    {aluguel.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <button className="px-2.5 py-1.5 text-[0.65rem] tracking-widest uppercase border border-danger text-danger bg-transparent cursor-pointer transition-all duration-150 hover:bg-danger hover:text-white hover:shadow-[0_0_12px_var(--color-danger)]">
                    Encerrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {alugueis.length === 0 && (
          <div className="py-10 text-center text-dim text-sm">
            Nenhum aluguel encontrado
          </div>
        )}
      </div>
    </div>
  );
}