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
    dot: "",
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

export default function Dashboard() {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Dashboard</div>
          <div className="page-subtitle">
            Visão geral do sistema
          </div>
        </div>
      </div>

      <div className="cards-grid">
        {stats.map((s) => (
          <div
            key={s.label}
            className="stat-card"
            style={{ "--accent": s.accent }}
          >
            <div className="label">{s.label}</div>
            <div className="value">{s.value}</div>
            <div className="icon">{s.icon}</div>
          </div>
        ))}
      </div>

      <div className="section-label">Atividade recente</div>

      <div className="activity-list">
        {activity.map((a, i) => (
          <div key={i} className="activity-item">
            <div className={`activity-dot ${a.dot}`} />
            <span>{a.msg}</span>
            <span className="activity-time">{a.hora}</span>
          </div>
        ))}
      </div>
    </div>
  );
}