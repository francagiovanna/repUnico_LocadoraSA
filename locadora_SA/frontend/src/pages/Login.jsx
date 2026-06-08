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
      (u) =>
        u.email === email &&
        u.senha === senha
    );

    if (found) {
      onLogin(found);
    } else {
      setErro("Credenciais inválidas.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <h1>LOCADORA S/A</h1>
          <p>SISTEMA v2.0</p>
        </div>

        {erro && (
          <div className="login-error">
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">
              E-mail
            </label>

            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Senha
            </label>

            <input
              className="form-input"
              type="password"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
            />
          </div>

          <button className="btn-login" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}