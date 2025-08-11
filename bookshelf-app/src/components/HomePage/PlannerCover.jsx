// src/components/HomePage/PlannerCover.jsx
import React from "react";
import TitleSection from "./TitleSection";
import DecorativeElements from "./DecorativeElements";
import ElasticBand from "./ElasticBand";

/**
 * Componente PlannerCover - Representa a capa completa do planner digital
 *
 * Este componente é como o canvas principal de uma pintura. Ele define:
 * - As dimensões e proporções gerais
 * - O fundo com textura de tecido
 * - O posicionamento relativo de todos os elementos filhos
 *
 * Conceito de Design: Criamos um efeito de profundidade através de múltiplas camadas:
 * 1. Fundo com gradiente e textura
 * 2. Sombras que simulam elevação física
 * 3. Elementos posicionados em diferentes "alturas" visuais
 */
const PlannerCover = () => {
  return (
    <div
      className="
      relative
      bg-gradient-to-br from-planner-cover to-planner-cover-light
      rounded-3xl
      p-12 md:p-16
      min-h-[600px] md:min-h-[700px]
      shadow-planner
      border-2 border-white/10
      overflow-hidden
    "
      style={{
        // Aqui aplicamos a textura de tecido que não podemos criar apenas com Tailwind
        // Esta técnica combina gradientes repetidos para simular a trama de um tecido
        backgroundImage: `
        repeating-linear-gradient(45deg, 
          transparent, transparent 1px, 
          rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px),
        repeating-linear-gradient(-45deg, 
          transparent, transparent 1px, 
          rgba(0,0,0,0.01) 1px, rgba(0,0,0,0.01) 2px),
        linear-gradient(135deg, #7a95b0 0%, #95adc4 100%)
      `,
      }}
    >
      {/* 
        Elástico vertical - Elemento distintivo do design
        Posicionado de forma absoluta para ficar sobre todos os outros elementos
      */}
      <ElasticBand />

      {/* 
        Grid Layout Principal
        Usamos CSS Grid para criar duas áreas distintas:
        - Área esquerda: Conteúdo textual (título, descrição)
        - Área direita: Elementos decorativos (fotos, estrelas, botões)
        
        A responsividade transforma o grid de 2 colunas em 1 coluna em telas menores
      */}
      <div
        className="
        relative z-10
        grid grid-cols-1 lg:grid-cols-2
        gap-8 lg:gap-12
        h-full
      "
      >
        {/* Seção do Título - Lado Esquerdo */}
        <div className="flex flex-col justify-center">
          <TitleSection />
        </div>

        {/* Seção Decorativa - Lado Direito */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <DecorativeElements />
        </div>
      </div>

      {/* 
        Call to Action - Posicionado na parte inferior
        Usamos absolute positioning para garantir que fique sempre no bottom
      */}
      <div className="absolute bottom-8 left-8 right-8 lg:left-16 lg:right-16">
        <CallToAction />
      </div>
    </div>
  );
};

/**
 * Componente CallToAction - Botão de ação principal
 *
 * Separamos este componente para manter a responsabilidade única.
 * Ele pode ser facilmente modificado ou reutilizado em outras partes da aplicação.
 */
const CallToAction = () => {
  return (
    <button
      className="
      group
      bg-white/10 
      backdrop-blur-sm
      border border-white/20
      rounded-full
      px-6 py-3
      text-white/80
      font-body font-medium
      text-sm
      transition-all duration-300
      hover:bg-white/15
      hover:transform hover:-translate-y-1
      hover:shadow-lg
      active:transform active:translate-y-0
    "
    >
      <span className="flex items-center gap-2">
        <span className="text-lg">📚</span>
        <span>Explore os Bestsellers</span>
        <span
          className="
          transform transition-transform duration-300
          group-hover:translate-x-1
        "
        >
          →
        </span>
      </span>
    </button>
  );
};

export default PlannerCover;
