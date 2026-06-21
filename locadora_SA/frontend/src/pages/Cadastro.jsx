// src/pages/Cadastro.jsx

import { useState } from "react";
import { criarUsuario } from "../services/api";

export default function Cadastro({ onVoltar }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await criarUsuario(form);

      setSucesso("Usuário cadastrado com sucesso!");

      setForm({
        name: "",
        email: "",
        phone: "",
      });

      setErro("");
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-md bg-panel border border-border p-8">

        <h1 className="text-2xl text-neon mb-6">
          Cadastro
        </h1>

        {erro && (
          <div className="mb-4 text-danger">
            {erro}
          </div>
        )}

        {sucesso && (
          <div className="mb-4 text-success">
            {sucesso}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <input
            placeholder="Nome"
            value={form.name}
            onChange={(e)=>
              setForm({
                ...form,
                name:e.target.value
              })
            }
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e)=>
              setForm({
                ...form,
                email:e.target.value
              })
            }
          />

          <input
            placeholder="Telefone"
            value={form.phone}
            onChange={(e)=>
              setForm({
                ...form,
                phone:e.target.value
              })
            }
          />

          <button type="submit">
            Cadastrar
          </button>

        </form>

        <button onClick={onVoltar}>
          Voltar
        </button>

      </div>
    </div>
  );
}