// src/pages/Home.jsx
import React from "react";
import PlannerCover from "../components/HomePage/PlannerCover";

const Home = () => {
  return (
    <div
      className="
      min-h-screen 
      bg-gradient-to-br from-planner-bg to-planner-bg-light
      flex items-center justify-center
      px-4 py-8
    "
    >
      {/* 
        Container principal que centraliza o conteúdo
        max-w-4xl: limita a largura máxima para melhor legibilidade
        w-full: garante que ocupe toda a largura disponível em telas menores
        animate-fade-up: adiciona uma entrada suave quando a página carrega
      */}
      <div className="max-w-4xl w-full animate-fade-up">
        <PlannerCover />
      </div>
    </div>
  );
};

export default Home;
