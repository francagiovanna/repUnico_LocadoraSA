import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Jogos from "./pages/Jogos";
import Usuarios from "./pages/Usuarios";
import Alugueis from "./pages/Alugueis";
import Sidebar from "./components/Sidebar";
import "./index.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");

  if (!user) return <Login onLogin={setUser} />;

  const pages = {
    dashboard: <Dashboard />,
    jogos: <Jogos />,
    usuarios: <Usuarios />,
    alugueis: <Alugueis />,
  };

  return (
    <div className="app-layout">
      <Sidebar page={page} setPage={setPage} user={user} onLogout={() => setUser(null)} />
      <main className="app-main">{pages[page]}</main>
    </div>
  );
}