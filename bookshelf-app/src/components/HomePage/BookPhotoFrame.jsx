// src/components/HomePage/BookPhotoFrame.jsx
import React, { useState } from "react";

/**
 * Componente BookPhotoFrame - Moldura interativa para capa de livro
 *
 * Este componente demonstra conceitos avançados de design de interface:
 *
 * CONCEITOS DE SKEUOMORFISMO DIGITAL:
 * Skeuomorfismo é o design que imita objetos físicos reais. Aqui criamos
 * uma moldura digital que se comporta como uma moldura física de foto:
 * - Profundidade através de sombras em camadas
 * - Textura através de gradientes e bordas
 * - Interatividade que simula manuseio físico
 *
 * HIERARQUIA DE PROFUNDIDADE:
 * 1. Sombra projetada (mais distante da superfície)
 * 2. Moldura externa (estrutura principal)
 * 3. Borda interna decorativa (detalhamento)
 * 4. Conteúdo (capa do livro)
 * 5. Overlay de interação (mais próximo do usuário)
 *
 * CONCEITO DE AFFORDANCE:
 * Affordance é a qualidade de um objeto que sugere como ele deve ser usado.
 * Esta moldura sugere que pode ser tocada, movida, ou clicada através de
 * pistas visuais sutis como sombras, hover effects, e proporções familiares.
 */
const BookPhotoFrame = () => {
  // Estado para controlar interações visuais
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  /**
   * Função para gerar a capa do livro como SVG
   *
   * Por que SVG? SVGs são vetoriais, então escalem perfeitamente
   * em qualquer resolução. Também permitem controle total sobre
   * cores, gradientes e texto, garantindo consistência visual.
   *
   * Conceito de Design Modular: Esta função pode ser facilmente
   * modificada para aceitar props (título, autor, cores) tornando
   * o componente reutilizável para diferentes livros.
   */
  const generateBookCoverSVG = () => {
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 180">
        <defs>
          <!-- Gradiente principal da capa -->
          <linearGradient id="coverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#764ba2;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#5a4fcf;stop-opacity:1" />
          </linearGradient>
          
          <!-- Gradiente para o badge -->
          <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.95" />
            <stop offset="100%" style="stop-color:#f7fafc;stop-opacity:0.9" />
          </linearGradient>
          
          <!-- Sombra interna para profundidade -->
          <filter id="innerShadow">
            <feOffset dx="0" dy="2"/>
            <feGaussianBlur stdDeviation="2" result="offset-blur"/>
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
            <feFlood flood-color="black" flood-opacity="0.1"/>
            <feComposite operator="in" in2="inverse"/>
            <feComposite operator="over" in2="SourceGraphic"/>
          </filter>
        </defs>
        
        <!-- Fundo principal da capa -->
        <rect width="140" height="180" fill="url(#coverGradient)" rx="8" filter="url(#innerShadow)"/>
        
        <!-- Badge "BESTSELLER" -->
        <rect x="15" y="15" width="110" height="20" fill="url(#badgeGradient)" rx="3"/>
        <text x="70" y="28" text-anchor="middle" fill="#667eea" font-size="9" font-weight="bold" font-family="Inter, sans-serif">BESTSELLER</text>
        
        <!-- Linhas decorativas coloridas -->
        <rect x="20" y="45" width="100" height="2" fill="#ff9a9e" opacity="0.8"/>
        <rect x="25" y="52" width="90" height="2" fill="#ffeaa7" opacity="0.8"/>
        <rect x="30" y="59" width="80" height="2" fill="#fecfef" opacity="0.8"/>
        
        <!-- Título do livro -->
        <text x="70" y="85" text-anchor="middle" fill="white" font-size="10" font-family="Georgia, serif" font-weight="bold">The Seven</text>
        <text x="70" y="100" text-anchor="middle" fill="white" font-size="10" font-family="Georgia, serif" font-weight="bold">Husbands of</text>
        <text x="70" y="115" text-anchor="middle" fill="white" font-size="10" font-family="Georgia, serif" font-weight="bold">Evelyn Hugo</text>
        
        <!-- Linha separadora -->
        <rect x="35" y="130" width="70" height="1" fill="white" opacity="0.5"/>
        
        <!-- Autor -->
        <text x="70" y="150" text-anchor="middle" fill="white" font-size="7" font-family="Georgia, serif" opacity="0.9">Taylor Jenkins Reid</text>
        
        <!-- Selo de qualidade -->
        <circle cx="120" cy="160" r="8" fill="white" opacity="0.2"/>
        <text x="120" y="163" text-anchor="middle" fill="white" font-size="6" font-family="serif">★</text>
      </svg>
    `)}`;
  };

  return (
    <div
      className="
      relative
      transform
      transition-all
      duration-300
      ease-out
    "
      style={{
        // Transformações dinâmicas baseadas no estado de interação
        transform: `
        rotate(-5deg) 
        ${isHovered ? "scale(1.05) rotate(-3deg)" : "scale(1)"} 
        ${isPressed ? "scale(0.98) rotate(-7deg)" : ""}
      `,
      }}
    >
      {/* 
        Sombra Projetada - Primeira Camada de Profundidade
        
        A sombra é o primeiro elemento que nosso cérebro processa
        para determinar a elevação de um objeto. Uma sombra bem
        posicionada é crucial para criar credibilidade visual.
        
        Conceito: Sombras não são apenas efeitos decorativos - elas
        comunicam informação espacial fundamental sobre relações
        entre objetos e superfícies.
      */}
      <div
        className="
        absolute
        top-2
        left-2
        w-36
        h-36
        bg-black/20
        rounded-lg
        blur-md
        z-0
        transition-all
        duration-300
      "
        style={{
          // Sombra dinâmica que responde ao hover
          transform: isHovered ? "scale(1.1) translate(2px, 2px)" : "scale(1)",
          opacity: isHovered ? 0.3 : 0.2,
        }}
      />

      {/* 
        Moldura Principal - Container Estrutural
        
        Esta é a "estrutura óssea" da nossa moldura. Definimos aqui
        todas as características físicas básicas: tamanho, cor,
        material aparente, e comportamento interativo.
        
        Design Decision: Azul escuro (#1a365d) foi escolhido para
        criar contraste suficiente com o conteúdo interno sem
        competir visualmente com a capa do livro.
      */}
      <div
        className="
          relative
          w-36
          h-36
          bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900
          rounded-xl
          p-3
          shadow-frame
          border border-white/10
          cursor-pointer
          z-10
          overflow-hidden
        "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        style={{
          // Efeito de profundidade baseado na interação
          boxShadow: `
            ${isPressed ? "0 4px 15px" : "0 8px 25px"} rgba(0,0,0,0.25),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.2)
          `,
        }}
      >
        {/* 
          Borda Decorativa Interna - Detalhamento Artesanal
          
          Esta borda cria o efeito "scalloped" (ondulado) que vemos
          em molduras vintage reais. É um detalhe sutil mas importante
          que adiciona caráter e autenticidade ao design.
          
          Técnica: Usamos múltiplos border-radius e pseudo-elementos
          para simular recortes decorativos.
        */}
        <div
          className="
          absolute
          inset-2
          border-2
          border-white/20
          rounded-lg
          pointer-events-none
        "
          style={{
            // Padrão decorativo nas bordas usando CSS
            background: `
            radial-gradient(circle at 0% 0%, transparent 6px, rgba(255,255,255,0.05) 6px),
            radial-gradient(circle at 100% 0%, transparent 6px, rgba(255,255,255,0.05) 6px),
            radial-gradient(circle at 0% 100%, transparent 6px, rgba(255,255,255,0.05) 6px),
            radial-gradient(circle at 100% 100%, transparent 6px, rgba(255,255,255,0.05) 6px)
          `,
          }}
        />

        {/* 
          Capa do Livro - Conteúdo Principal
          
          Aqui colocamos a imagem da capa do livro. O tratamento visual
          (border-radius, sombras) faz com que pareça uma foto real
          colocada dentro de uma moldura física.
          
          Conceito de Contenção: O conteúdo deve sempre respeitar
          os limites da moldura, criando uma hierarquia clara entre
          container e conteúdo.
        */}
        <div
          className="
          relative
          w-full
          h-full
          bg-gray-100
          rounded-lg
          overflow-hidden
          border border-white/10
          z-20
        "
        >
          <img
            src={generateBookCoverSVG()}
            alt="Capa do livro The Seven Husbands of Evelyn Hugo"
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-300
            "
            style={{
              transform: isHovered ? "scale(1.02)" : "scale(1)",
            }}
          />

          {/* 
            Overlay de Interação - Feedback Visual
            
            Este overlay aparece no hover para comunicar que o elemento
            é interativo. É uma pista visual sutil mas importante para
            UX moderna.
            
            Conceito de Feedback: Toda interação deve ter uma resposta
            visual imediata para confirmar que o sistema registrou
            a ação do usuário.
          */}
          {isHovered && (
            <div
              className="
              absolute
              inset-0
              bg-white/10
              backdrop-blur-sm
              rounded-lg
              border border-white/20
              flex
              items-center
              justify-center
              transition-all
              duration-200
            "
            >
              <div
                className="
                bg-white/20
                backdrop-blur-sm
                rounded-full
                p-2
                border border-white/30
              "
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* 
          Reflexos de Luz - Detalhes de Realismo
          
          Pequenos reflexos que simulam como a luz incidiria
          em uma moldura física real. Detalhes como estes são
          subconscientemente percebidos e adicionam credibilidade.
        */}
        <div
          className="
          absolute
          top-2
          left-2
          w-8
          h-8
          bg-white/10
          rounded-full
          blur-sm
          pointer-events-none
        "
        />

        <div
          className="
          absolute
          bottom-2
          right-2
          w-4
          h-4
          bg-white/5
          rounded-full
          blur-sm
          pointer-events-none
        "
        />
      </div>
    </div>
  );
};

export default BookPhotoFrame;
