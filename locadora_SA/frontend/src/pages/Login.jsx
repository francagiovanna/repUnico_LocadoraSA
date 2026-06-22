import { useState } from "react";

const MOCK_USERS = [
  {
    id: 1,
    nome: "Admin",
    email: "admin@locadora.sa",
    senha: "12345",
  },
];

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const found = MOCK_USERS.find(
      (u) => u.email === email && u.senha === senha
    );

    if (found) {
      onLogin(found);
    } else {
      setErro("Credenciais inválidas.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md bg-panel border border-border p-8">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-neon tracking-widest [text-shadow:0_0_15px_var(--color-neon)]">
            LOCADORA S/A
          </h1>

          <p className="font-retro text-neon-2 mt-2 text-lg">
            SISTEMA v2.0
          </p>
        </div>

        {erro && (
          <div className="mb-4 border border-danger bg-danger/10 text-danger px-3 py-2 text-sm">
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-2">
              E-mail
            </label>

           <input
  type="email"
  placeholder="Email"
  className="w-full bg-surface-3 border border-border text-ink px-3 py-2.5 outline-none focus:border-neon"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
          </div>

          <div className="mb-6">
            <label className="block text-[0.65rem] uppercase tracking-widest text-dim mb-2">
              Senha
            </label>

            <input
  type="password"
  placeholder="Senha"
  className="w-full bg-surface-3 border border-border text-ink px-3 py-2.5 outline-none focus:border-neon"
  value={senha}
  onChange={(e) => setSenha(e.target.value)}
/>
          </div>

          <button
            type="submit"
            className="w-full py-3 border border-neon text-neon uppercase tracking-widest transition-all hover:bg-neon hover:text-surface hover:shadow-[0_0_16px_var(--color-neon)]"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}