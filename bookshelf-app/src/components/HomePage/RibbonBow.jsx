// src/components/HomePage/RibbonBow.jsx
import React from "react";

/**
 * Componente RibbonBow - Laço decorativo realista
 *
 * Este componente é um exercício fascinante de geometria aplicada e ilusão visual.
 * Vamos decompor um laço real em suas partes fundamentais:
 *
 * ANATOMIA DE UM LAÇO:
 * 1. Asa esquerda (loop left)
 * 2. Asa direita (loop right)
 * 3. Nó central (center knot)
 * 4. Fitas pendentes (optional tails)
 *
 * ESTRATÉGIA TÉCNICA:
 * Usaremos pseudo-elementos (::before e ::after) para criar as asas,
 * e um elemento real para o centro. Cada parte terá:
 * - Forma base criada com border-radius
 * - Rotação para posicionamento natural
 * - Gradientes para simular volume
 * - Sombras para profundidade
 *
 * Conceito Fundamental: Um laço 3D é fundamentalmente uma ilusão óptica.
 * Nosso cérebro interpreta pistas visuais específicas (sombreamento, perspectiva,
 * sobreposição) para construir a percepção de tridimensionalidade.
 */
const RibbonBow = () => {
  return (
    <div className="relative w-12 h-8">
      {/* 
        Container Principal do Laço
        
        Este div serve como ponto de ancoragem para todos os elementos do laço.
        Posicionamento relativo permite que os elementos filhos se posicionem
        de forma absoluta em relação a este container.
        
        Dimensões escolhidas (w-12 h-8 = 48x32px):
        - Proporção 3:2 é visualmente agradável e natural para laços
        - Tamanho suficiente para detalhes sem dominar o design
      */}
      <div
        className="
        relative 
        w-full 
        h-full
        transform 
        rotate-12
        drop-shadow-lg
      "
      >
        {/* 
          Asa Esquerda do Laço
          
          Técnica Avançada: Usamos border-radius assimétrico para criar
          uma forma orgânica que simula tecido dobrado.
          
          Análise das Transformações:
          - rotate-12: Inclinação que sugere movimento natural
          - skew-y-3: Distorção sutil que adiciona dinamismo
          - origin-bottom-right: Ponto de rotação que cria curvatura natural
          
          Por que estas transformações específicas?
          Laços reais nunca são perfeitamente simétricos. A natureza
          do tecido e da gravidade cria variações sutis que nosso
          olho espera ver.
        */}
        <div
          className="
            absolute
            top-0
            left-0
            w-5
            h-6
            bg-gradient-to-br from-bow-primary via-bow-secondary to-bow-center
            rounded-tl-2xl rounded-br-xl rounded-tr-lg rounded-bl-sm
            transform 
            rotate-12 
            skew-y-3
            origin-bottom-right
            shadow-md
          "
          style={{
            // Gradiente personalizado que simula iluminação realista
            background: `
              linear-gradient(135deg, 
                #f6e05e 0%,     /* Highlight no topo */
                #ecc94b 30%,    /* Tom médio */
                #d69e2e 70%,    /* Sombra */
                #b7791f 100%    /* Sombra profunda */
              )
            `,
          }}
        >
          {/* 
            Highlight Interno - Simulação de Reflexo
            
            Este elemento cria um brilho interno que simula como
            a luz incidiria em tecido cetim ou seda.
          */}
          <div
            className="
            absolute
            top-1
            left-1
            w-2
            h-2
            bg-white/30
            rounded-full
            blur-sm
          "
          />
        </div>

        {/* 
          Asa Direita do Laço
          
          Espelhamos a asa esquerda, mas com rotações opostas
          para criar assimetria natural. A asa direita é ligeiramente
          diferente para simular como tecido real se comportaria.
        */}
        <div
          className="
            absolute
            top-0
            right-0
            w-5
            h-6
            bg-gradient-to-bl from-bow-primary via-bow-secondary to-bow-center
            rounded-tr-2xl rounded-bl-xl rounded-tl-lg rounded-br-sm
            transform 
            -rotate-12 
            -skew-y-3
            origin-bottom-left
            shadow-md
          "
          style={{
            // Gradiente espelhado com ênfase ligeiramente diferente
            background: `
              linear-gradient(-135deg, 
                #f6e05e 0%,
                #ecc94b 25%,
                #d69e2e 65%,
                #b7791f 100%
              )
            `,
          }}
        >
          {/* Highlight na asa direita */}
          <div
            className="
            absolute
            top-1
            right-1
            w-2
            h-2
            bg-white/30
            rounded-full
            blur-sm
          "
          />
        </div>

        {/* 
          Nó Central do Laço
          
          O elemento mais importante visualmente. Este é o ponto focal
          que "amarra" toda a composição. Usamos uma forma mais escura
          e detalhes de textura para criar a ilusão de que as asas
          estão sendo comprimidas aqui.
          
          Conceito de Design: O centro sempre deve ser o elemento
          mais "pesado" visualmente, ancorando toda a composição.
        */}
        <div
          className="
          absolute
          top-1/2
          left-1/2
          w-2
          h-4
          bg-bow-center
          rounded-sm
          transform
          -translate-x-1/2
          -translate-y-1/2
          z-10
          shadow-inner
        "
          style={{
            background: `
            linear-gradient(to bottom,
              #b7791f 0%,
              #d69e2e 20%,
              #b7791f 50%,
              #975a16 100%
            )
          `,
          }}
        >
          {/* 
            Textura do Nó
            
            Adicionamos linhas horizontais sutis que simulam
            a compressão do tecido no ponto de amarração.
          */}
          <div
            className="
            absolute
            inset-x-0
            top-1
            h-px
            bg-black/20
          "
          />
          <div
            className="
            absolute
            inset-x-0
            bottom-1
            h-px
            bg-white/20
          "
          />

          {/* 
            Highlight Central
            
            Um pequeno reflexo que sugere a curvatura da superfície
            do nó central.
          */}
          <div
            className="
            absolute
            top-1
            left-1/2
            w-px
            h-2
            bg-white/30
            transform
            -translate-x-1/2
          "
          />
        </div>

        {/* 
          Sombra Projetada
          
          Uma sombra separada que simula como o laço projeta
          sombra sobre a superfície da capa. Isso é crucial
          para "colar" o elemento ao design principal.
        */}
        <div
          className="
          absolute
          top-6
          left-1/2
          w-8
          h-2
          bg-black/10
          rounded-full
          blur-sm
          transform
          -translate-x-1/2
        "
        />
      </div>
    </div>
  );
};

export default RibbonBow;
