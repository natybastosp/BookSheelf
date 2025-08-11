// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./styles/global.css";

/**
 * Componente App - Ponto de entrada principal da aplicação
 *
 * Este componente funciona como o "diretor geral" da nossa aplicação.
 * Ele é responsável por:
 *
 * RESPONSABILIDADES FUNDAMENTAIS:
 * 1. ROTEAMENTO - Decidir qual componente mostrar baseado na URL
 * 2. CONFIGURAÇÃO GLOBAL - Definir contextos e providers que toda a app precisa
 * 3. LAYOUT BASE - Estabelecer a estrutura visual que persiste entre páginas
 * 4. GERENCIAMENTO DE ESTADO - Coordenar estados que são compartilhados
 *
 * CONCEITO DE SINGLE PAGE APPLICATION (SPA):
 * Diferente de sites tradicionais onde cada página é um arquivo HTML separado,
 * em React criamos uma única página que se "transforma" dinamicamente.
 * É como um teatro onde o palco permanece o mesmo, mas os cenários e atores
 * mudam conforme a peça avança.
 *
 * ARQUITETURA DE ROTEAMENTO:
 * Usamos React Router para simular múltiplas páginas dentro de nossa SPA.
 * Cada "rota" corresponde a um componente diferente que será renderizado
 * quando o usuário navegar para uma URL específica.
 */
function App() {
  return (
    <Router>
      <div
        className="
        min-h-screen 
        bg-gradient-to-br from-planner-bg to-planner-bg-light
        antialiased
        selection:bg-white/20
        selection:text-white
      "
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
