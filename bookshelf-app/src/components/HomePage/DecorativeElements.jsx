// src/components/HomePage/DecorativeElements.jsx
import React from "react";
import BookPhotoFrame from "./BookPhotoFrame";

const DecorativeElements = () => {
  return (
    <div
      className="
      relative 
      w-full 
      h-80 
      md:h-96
      max-w-sm
      mx-auto
    "
    >
      {/* 
        Moldura do Livro - Elemento Principal
        
        Este é o "herói" visual da nossa composição. Posicionamos
        no centro-direita para criar uma âncora visual forte.
        
        Conceito de Design: O elemento principal deve ocupar
        aproximadamente 1/3 do espaço disponível e ser posicionado
        ligeiramente fora do centro para criar tensão visual interessante.
      */}
      <div
        className="
        absolute
        top-12
        right-4
        z-10
      "
      >
        <BookPhotoFrame />
      </div>

      {/* 
        Constelação de Estrelas Decorativas
        
        As estrelas funcionam como "pontos de interesse secundários"
        que criam movimento visual e preenchem o espaço negativo
        sem competir com o elemento principal.
        
        Princípio de Design: Elementos pequenos e repetidos criam
        ritmo visual e podem guiar o olho através da composição.
      */}

      {/* Estrela Verde - Posição Superior Esquerda */}
      <div
        className="
        absolute
        top-8
        left-12
        text-star-green
        text-lg
        animate-twinkle
        z-5
      "
      >
        <StarIcon delay="0s" />
      </div>

      {/* Estrela Azul - Posição Inferior Esquerda */}
      <div
        className="
        absolute
        bottom-16
        left-16
        text-star-blue
        text-base
        animate-twinkle
        z-5
      "
        style={{ animationDelay: "1s" }}
      >
        <StarIcon delay="1s" />
      </div>

      {/* Estrela Rosa - Posição Média Direita */}
      <div
        className="
        absolute
        top-20
        right-16
        text-star-pink
        text-lg
        animate-twinkle
        z-5
      "
        style={{ animationDelay: "2s" }}
      >
        <StarIcon delay="2s" />
      </div>

      {/* 
        Botões Circulares - Elementos de Apoio
        
        Estes pequenos círculos coloridos adicionam pontos de cor
        que complementam a paleta principal. Funcionam como "notas
        musicais" visuais - pequenos acentos que enriquecem a composição.
        
        Conceito: Elementos pequenos e coloridos podem adicionar
        vida e personalidade sem sobrecarregar o design.
      */}

      {/* Botão Rosa - Lado direito médio */}
      <div
        className="
        absolute
        top-32
        right-12
        w-5
        h-5
        rounded-full
        bg-gradient-to-br from-button-pink-light to-button-pink-dark
        shadow-md
        z-5
        animate-pulse
      "
        style={{
          animationDuration: "3s",
          animationDelay: "0.5s",
        }}
      />

      {/* Botão Coral - Posição inferior direita */}
      <div
        className="
        absolute
        bottom-8
        right-8
        w-4
        h-4
        rounded-full
        bg-gradient-to-br from-button-coral-light to-button-coral-dark
        shadow-md
        z-5
        animate-pulse
      "
        style={{
          animationDuration: "4s",
          animationDelay: "1.5s",
        }}
      />

      {/* 
        Elementos de Fundo - Criação de Profundidade
        
        Estes elementos ficam atrás de tudo e criam um contexto
        visual sutil. São como a "trilha sonora visual" - percebidos
        subconscientemente mas importantes para a atmosfera geral.
      */}

      {/* Círculo de fundo - Cria profundidade */}
      <div
        className="
        absolute
        top-16
        left-8
        w-24
        h-24
        rounded-full
        bg-white/5
        blur-sm
        z-0
      "
      />

      {/* Formas geométricas sutis para textura */}
      <div
        className="
        absolute
        bottom-12
        left-4
        w-16
        h-16
        bg-gradient-to-br from-white/3 to-transparent
        rounded-lg
        transform rotate-12
        z-0
      "
      />

      {/* 
        Partículas Flutuantes - Movimento Sutil
        
        Pequenos elementos que criam a sensação de movimento
        e vida na composição. Como poeira dançando na luz.
      */}
      <FloatingParticles />
    </div>
  );
};

/**
 * Componente StarIcon - Ícone de estrela reutilizável
 *
 * Separamos a estrela em seu próprio componente para demonstrar
 * como criar elementos reutilizáveis que podem ter comportamentos
 * diferentes baseados em props.
 */
const StarIcon = ({ delay = "0s" }) => {
  return (
    <div
      className="
        transform
        transition-transform
        duration-300
        hover:scale-110
        cursor-pointer
      "
      style={{ animationDelay: delay }}
    >
      ✦
    </div>
  );
};

/**
 * Componente FloatingParticles - Sistema de partículas CSS
 *
 * Este componente cria múltiplas partículas pequenas que flutuam
 * suavemente, adicionando vida e movimento à composição.
 *
 * Conceito Avançado: Sistemas de partículas podem ser criados
 * puramente com CSS, oferecendo movimento orgânico sem JavaScript.
 */
const FloatingParticles = () => {
  // Array de partículas com posições e características aleatórias
  const particles = [
    { size: "w-1 h-1", position: "top-4 left-20", delay: "0s", duration: "6s" },
    {
      size: "w-0.5 h-0.5",
      position: "top-24 left-8",
      delay: "2s",
      duration: "8s",
    },
    {
      size: "w-1 h-1",
      position: "bottom-20 right-20",
      delay: "4s",
      duration: "7s",
    },
    {
      size: "w-0.5 h-0.5",
      position: "bottom-32 left-12",
      delay: "1s",
      duration: "9s",
    },
  ];

  return (
    <>
      {particles.map((particle, index) => (
        <div
          key={index}
          className={`
            absolute
            ${particle.position}
            ${particle.size}
            bg-white/20
            rounded-full
            animate-pulse
            z-1
          `}
          style={{
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </>
  );
};

export default DecorativeElements;
