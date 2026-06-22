import { useEffect, useState } from "react";
import {
  getJogos,
  getUsuarios,
  getAlugueis,
} from "../services/api";

const dotColors = {
  neon: "bg-neon shadow-[0_0_6px_var(--color-neon)]",
  pink: "bg-neon-2 shadow-[0_0_6px_var(--color-neon-2)]",
  yellow: "bg-neon-3 shadow-[0_0_6px_var(--color-neon-3)]",
};

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregarDados() {
    try {
      const [jogos, usuarios, alugueis] = await Promise.all([
        getJogos(),
        getUsuarios(),
        getAlugueis(),
      ]);

      const alugueisAtivos = alugueis.filter(
        (a) => !a.dataFinalizacao
      );

      const devolucoesPendentes = alugueis.filter(
        (a) =>
          !a.dataFinalizacao &&
          new Date(a.dataDevolucao) < new Date()
      );

      setStats([
        {
          label: "Jogos cadastrados",
          value: jogos.length,
          icon: "◉",
          accent: "#00ffe7",
        },
        {
          label: "Usuários ativos",
          value: usuarios.length,
          icon: "◎",
          accent: "#ff00aa",
        },
        {
          label: "Aluguéis ativos",
          value: alugueisAtivos.length,
          icon: "◷",
          accent: "#ffe600",
        },
        {
          label: "Devoluções pend.",
          value: devolucoesPendentes.length,
          icon: "⚑",
          accent: "#ff3366",
        },
      ]);

      const atividades = [];

      jogos.slice(-3).reverse().forEach((jogo) => {
        atividades.push({
          msg: `Novo jogo cadastrado: ${jogo.titulo}`,
          hora: "",
          dot: "yellow",
        });
      });

      alugueis.slice(-3).reverse().forEach((aluguel) => {
        atividades.push({
          msg: `${aluguel.jogo} alugado por ${aluguel.cliente}`,
          hora: "",
          dot: "neon",
        });
      });

      setActivity(atividades.slice(0, 6));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-dim">
        Carregando...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-border">
        <div>
          <div className="font-display text-2xl font-bold text-neon tracking-widest [text-shadow:0_0_15px_var(--color-neon)]">
            Dashboard
          </div>

          <div className="text-xs text-dim mt-1 tracking-wider">
            Visão geral do sistema
          </div>
        </div>
      </div>

      <div
        className="grid gap-4 mb-8"
        style={{
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="relative overflow-hidden bg-panel border border-border p-5"
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{
                background: s.accent,
                boxShadow: `0 0 10px ${s.accent}`,
              }}
            />

            <div className="text-[0.65rem] uppercase tracking-[0.15em] text-dim mb-2">
              {s.label}
            </div>

            <div
              className="font-retro text-4xl leading-none"
              style={{
                color: s.accent,
                textShadow: `0 0 10px ${s.accent}`,
              }}
            >
              {s.value}
            </div>

            <div className="absolute right-4 bottom-3 text-3xl opacity-10">
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="font-display text-[0.65rem] tracking-[0.2em] uppercase text-dim mb-3">
        Atividade recente
      </div>

      <div className="bg-panel border border-border">
        {activity.length === 0 ? (
          <div className="p-5 text-dim text-sm">
            Nenhuma atividade encontrada
          </div>
        ) : (
          activity.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-5 py-3.5 text-[0.78rem] border-b border-border last:border-b-0"
            >
              <div
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[a.dot]}`}
              />

              <span>{a.msg}</span>

              <span className="ml-auto text-dim text-xs">
                {a.hora}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}