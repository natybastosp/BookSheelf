// src/components/HomePage/TitleSection.jsx
import React from "react";

/**
 * Componente TitleSection - Seção principal de texto e conteúdo
 *
 * Este componente é responsável por toda a hierarquia textual do design.
 * Pensamos nele como um maestro dirigindo uma sinfonia, onde cada elemento
 * textual tem seu tempo, tom e intensidade específicos.
 *
 * Hierarquia Visual Estabelecida:
 * 1. Título principal ("digital") - Maior impacto visual
 * 2. Subtítulo ("bookshelf") - Complementa o título
 * 3. Ano (2025) - Elemento de destaque temporal
 * 4. Tagline - Contextualização elegante
 * 5. Descrição - Informação detalhada
 *
 * Conceito de Opacidade: Usamos diferentes níveis de transparência para criar
 * profundidade visual, simulando como elementos mais distantes aparecem mais desbotados.
 */
const TitleSection = () => {
  return (
    <div className="space-y-6">
      {/* 
        Título Principal - "digital"
        
        Decisões de Design Explicadas:
        - font-elegant: Playfair Display para elegância clássica
        - text-6xl/text-7xl: Tamanho grande que cria presença dominante
        - font-light: Peso tipográfico leve que transmite sofisticação
        - text-white/30: Transparência que integra com o fundo
        - leading-none: Espaçamento de linha compacto para impacto
        - tracking-tight: Kerning apertado para sensação moderna
        
        Por que esta abordagem? Títulos grandes com baixa opacidade criam
        um efeito "watermark" elegante, onde o texto se torna parte da textura visual.
      */}
      <h1
        className="
        font-elegant 
        text-6xl md:text-7xl lg:text-8xl
        font-light
        text-white/30
        leading-none
        tracking-tight
        select-none
      "
      >
        digital
      </h1>

      <h2
        className="
        font-elegant 
        text-5xl md:text-6xl lg:text-7xl
        font-light
        text-white/25
        leading-none
        tracking-tight
        -mt-4
        select-none
      "
      >
        bookshelf
      </h2>

      <div className="py-4">
        {/* 
          Badge do Ano - 2025
          
          Mudança estratégica de tipografia: Usamos Inter (sans-serif) aqui
          para criar contraste com as serifas do título. Isso faz o ano
          "saltar" visualmente e marca a contemporaneidade do projeto.
        */}
        <div
          className="
          font-body 
          text-3xl md:text-4xl
          font-bold
          text-white/20
          tracking-wider
          mb-4
          select-none
        "
        >
          2025
        </div>

        <p
          className="
          font-body
          text-xs
          text-white/40
          uppercase
          tracking-widest
          font-medium
          mb-4
        "
        >
          — the bestseller collection —
        </p>
      </div>

      <p
        className="
        font-body
        text-sm
        leading-relaxed
        text-white/35
        max-w-md
        font-light
      "
      >
        Descobrir livros incríveis não só pode ajudar você a se tornar mais
        culto e organizado, mas também pode inspirar e tornar seus sonhos
        realidade.
      </p>

      {/* 
        Elemento de Espaçamento Final
        Garantimos que há espaço suficiente antes de qualquer elemento subsequente
      */}
      <div className="pt-4" />
    </div>
  );
};

export default TitleSection;
