// src/components/HomePage/ElasticBand.jsx
import React from "react";
import RibbonBow from "./RibbonBow";

const ElasticBand = () => {
  return (
    <>
      {/* 
        Container do Elástico Principal
        
        Análise Técnica das Classes Aplicadas:
        
        - absolute: Remove o elemento do fluxo normal do documento
        - right-8: Posiciona a 8 unidades (32px) da borda direita
        - top-8 bottom-8: Estende do topo até a base, com margem de 8 unidades
        - w-3: Largura de 3 unidades (12px) - proporção ideal para elegância
        - z-20: Camada alta para garantir que fique sobre outros elementos
        
        Por que estas medidas específicas?
        - 32px da borda: Cria espaço respiratório sem parecer deslocado
        - 12px de largura: Equilibrio entre presença visual e discrição
        - z-20: Alto o suficiente para não conflitar com outros elementos
      */}
      <div
        className="
        absolute 
        right-8 
        top-8 
        bottom-8 
        w-3 
        z-20
        rounded-md
        shadow-elastic
      "
        style={{
          // Gradiente personalizado que simula a curvatura de um elástico real
          // O gradiente horizontal cria a ilusão de uma superfície cilíndrica
          background:
            "linear-gradient(to right, #2c5282 0%, #3182ce 50%, #2c5282 100%)",
        }}
      >
        {/* 
          Highlight Central - Simulação de Reflexo de Luz
          
          Este elemento cria um "brilho" no centro do elástico,
          simulando como a luz incidiria em uma superfície cilíndrica.
          É um detalhe sutil que adiciona realismo significativo.
        */}
        <div
          className="
          absolute
          top-0
          bottom-0
          left-1/2
          w-px
          bg-white/20
          transform -translate-x-1/2
        "
        />

        {/* 
          Textura de Superficie
          
          Adicionamos uma sobreposição muito sutil que simula
          a textura mate típica de elásticos reais.
        */}
        <div
          className="
          absolute
          inset-0
          rounded-md
          bg-gradient-to-b from-white/5 via-transparent to-black/10
        "
        />
      </div>

      <div
        className="
        absolute 
        right-0 
        top-4
        z-30
        transform 
        translate-x-2
      "
      >
        <RibbonBow />
      </div>
    </>
  );
};

export default ElasticBand;
