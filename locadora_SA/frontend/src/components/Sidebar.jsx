export default function Sidebar({ page, setPage, user, onLogout }) {
  const items = [
    { id: "dashboard", icon: "◈", label: "Dashboard" },
    { id: "jogos", icon: "◉", label: "Jogos" },
    { id: "usuarios", icon: "◎", label: "Usuários" },
    { id: "alugueis", icon: "◷", label: "Aluguéis" },
  ];

  return (
    <aside className="relative z-10 w-55 flex flex-col py-6 bg-panel border-r border-border after:content-[''] after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-linear-to-b after:from-transparent after:via-neon after:to-transparent after:opacity-50">
      <div className="text-center px-4 pb-6 border-b border-border">
        <h1 className="font-display text-[0.85rem] font-black text-neon tracking-widest leading-snug [text-shadow:0_0_10px_var(--color-neon)]">
          LOCADORA
        </h1>
        <span className="font-retro text-base text-neon-2 [text-shadow:0_0_8px_var(--color-neon-2)]">
          :: S/A ::
        </span>
      </div>

      <nav className="flex-1 py-6 flex flex-col gap-1">
        {items.map((item) => {
          const active = page === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left text-[0.8rem] tracking-widest uppercase border-l-[3px] transition-all duration-150 font-mono bg-transparent ${
                active
                  ? "text-neon border-l-neon bg-neon/[0.07] [text-shadow:0_0_8px_var(--color-neon)]"
                  : "text-dim border-l-transparent hover:text-ink hover:bg-neon/4"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-border">
        <div className="text-[0.7rem] text-dim mb-2">
          Logado como
          <strong className="block text-neon-3 text-[0.8rem]">{user.nome}</strong>
        </div>

        <button
          onClick={onLogout}
          className="w-full py-2 bg-transparent border border-danger text-danger font-mono text-[0.7rem] tracking-widest uppercase cursor-pointer transition-all duration-150 hover:bg-danger hover:text-white hover:shadow-[0_0_12px_var(--color-danger)]"
        >
          ⏻ Sair
        </button>
      </div>
    </aside>
  );
}