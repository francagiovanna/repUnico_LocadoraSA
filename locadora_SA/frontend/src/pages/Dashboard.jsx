const stats = [
  { label: "Jogos cadastrados", value: 3, icon: "◉", accent: "#00ffe7" },
  { label: "Usuários ativos", value: 1, icon: "◎", accent: "#ff00aa" },
  { label: "Aluguéis hoje", value: 1, icon: "◷", accent: "#ffe600" },
  { label: "Devoluções pend.", value: 1, icon: "⚑", accent: "#ff3366" },
];

const activity = [
  {
    tipo: "aluguel",
    msg: "Mario Kart 64 alugado por João Silva",
    hora: "14:32",
    dot: "neon",
  },
  {
    tipo: "devolucao",
    msg: "Street Fighter II devolvido por Ana Lima",
    hora: "13:10",
    dot: "pink",
  },
  {
    tipo: "cadastro",
    msg: "Novo jogo cadastrado: Tekken 3",
    hora: "11:55",
    dot: "yellow",
  },
];

const dotColors = {
  neon: "bg-neon shadow-[0_0_6px_var(--color-neon)]",
  pink: "bg-neon-2 shadow-[0_0_6px_var(--color-neon-2)]",
  yellow: "bg-neon-3 shadow-[0_0_6px_var(--color-neon-3)]",
};

export default function Dashboard() {
  return (
    <div>
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-border">
        <div>
          <div className="font-display text-2xl font-bold text-neon tracking-[0.1em] [text-shadow:0_0_15px_var(--color-neon)]">
            Dashboard
          </div>
          <div className="text-xs text-dim mt-1 tracking-[0.05em]">
            Visão geral do sistema
          </div>
        </div>
      </div>

      <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        {stats.map((s) => (
          <div
            key={s.label}
            className="relative overflow-hidden bg-panel border border-border p-5 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5"
            style={{
              "--tw-before-bg": s.accent,
              boxShadow: "none",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: s.accent, boxShadow: `0 0 10px ${s.accent}` }}
            />
            <div className="text-[0.65rem] uppercase tracking-[0.15em] text-dim mb-2">
              {s.label}
            </div>
            <div
              className="font-retro text-4xl leading-none"
              style={{ color: s.accent, textShadow: `0 0 10px ${s.accent}` }}
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
        {activity.map((a, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-5 py-3.5 text-[0.78rem] border-b border-border last:border-b-0"
          >
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColors[a.dot]}`} />
            <span>{a.msg}</span>
            <span className="ml-auto text-dim text-xs">{a.hora}</span>
          </div>
        ))}
      </div>
    </div>
  );
}