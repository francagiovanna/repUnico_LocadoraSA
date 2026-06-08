import { useState } from "react";

export default function Alugueis() {
  const [alugueis, setAlugueis] = useState([
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
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Aluguéis</h1>

          <p className="page-subtitle">
            Controle de aluguéis
          </p>
        </div>

        <button className="btn btn-primary">
          + Novo aluguel
        </button>
      </div>

      <div className="cards-grid">
        <div
          className="stat-card"
          style={{ "--accent": "var(--neon)" }}
        >
          <div className="label">Aluguéis ativos</div>

          <div className="value">
            {alugueis.length}
          </div>

        </div>

        <div
          className="stat-card"
          style={{ "--accent": "var(--neon3)" }}
        >
          <div className="label">Pendentes</div>

          <div className="value">1</div>

        </div>

        <div
          className="stat-card"
          style={{ "--accent": "var(--success)" }}
        >
          <div className="label">Finalizados</div>

          <div className="value">0</div>

        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Jogo</th>
              <th>Retirada</th>
              <th>Devolução</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {alugueis.map((aluguel) => (
              <tr key={aluguel.id}>
                <td>{aluguel.usuario}</td>

                <td>{aluguel.jogo}</td>

                <td>{aluguel.retirada}</td>

                <td>{aluguel.devolucao}</td>

                <td>
                  <span className="badge badge-yellow">
                    {aluguel.status}
                  </span>
                </td>

                <td>
                  <button className="btn btn-sm btn-danger">
                    Encerrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {alugueis.length === 0 && (
          <div className="empty-state">
            Nenhum aluguel encontrado
          </div>
        )}
      </div>
    </>
  );
}