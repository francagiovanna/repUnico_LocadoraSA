export default function Sidebar({ page, setPage, user, onLogout }) {
  const items = [
    { id: "dashboard", icon: "◈", label: "Dashboard" },
    { id: "jogos", icon: "◉", label: "Jogos" },
    { id: "usuarios", icon: "◎", label: "Usuários" },
    { id: "alugueis", icon: "◷", label: "Aluguéis" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>LOCADORA</h1>
        <span>:: S/A ::</span>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${page === item.id ? "active" : ""}`}
            onClick={() => setPage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          Logado como
          <strong>{user.nome}</strong>
        </div>

        <button className="btn-logout" onClick={onLogout}>
          ⏻ Sair
        </button>
      </div>
    </aside>
  );
}