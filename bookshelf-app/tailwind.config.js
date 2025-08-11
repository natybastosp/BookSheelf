/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Cores específicas do nosso design planner
      colors: {
        // Paleta principal baseada na referência
        planner: {
          bg: "#8ba8c7", // Cor de fundo principal
          "bg-light": "#a8c0d4", // Variação mais clara
          cover: "#7a95b0", // Cor da capa
          "cover-light": "#95adc4", // Variação da capa
          elastic: "#2c5282", // Cor do elástico
          "elastic-light": "#3182ce", // Highlight do elástico
        },

        // Cores para elementos decorativos
        bow: {
          primary: "#f6e05e", // Amarelo do laço
          secondary: "#ecc94b", // Amarelo mais escuro
          center: "#d69e2e", // Centro do laço
        },

        // Cores das estrelas decorativas
        star: {
          green: "#68d391",
          blue: "#63b3ed",
          pink: "#f687b3",
        },

        // Cores dos botões circulares
        button: {
          "pink-light": "#f687b3",
          "pink-dark": "#ed64a6",
          "coral-light": "#fed7d7",
          "coral-dark": "#fc8181",
        },
      },

      // Fontes que usaremos
      fontFamily: {
        elegant: ["Playfair Display", "serif"], // Para títulos elegantes
        body: ["Inter", "sans-serif"], // Para texto corpo
      },

      // Animações personalizadas
      keyframes: {
        // Animação de piscar das estrelas
        twinkle: {
          "0%, 100%": {
            opacity: "0.3",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(1.1)",
          },
        },

        // Animação de entrada suave
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },

      animation: {
        twinkle: "twinkle 3s ease-in-out infinite",
        "fade-up": "fade-up 0.8s ease-out",
      },

      // Sombras personalizadas para efeitos 3D
      boxShadow: {
        planner:
          "0 25px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
        elastic: "inset 0 0 4px rgba(0,0,0,0.3), 2px 0 8px rgba(0,0,0,0.15)",
        frame: "0 8px 25px rgba(0,0,0,0.25)",
      },

      // Padrões de fundo para textura
      backgroundImage: {
        "fabric-texture": `
          repeating-linear-gradient(45deg, 
            transparent, transparent 1px, 
            rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px),
          repeating-linear-gradient(-45deg, 
            transparent, transparent 1px, 
            rgba(0,0,0,0.01) 1px, rgba(0,0,0,0.01) 2px)
        `,

        "planner-gradient": "linear-gradient(135deg, #7a95b0 0%, #95adc4 100%)",
        "elastic-gradient":
          "linear-gradient(to right, #2c5282 0%, #3182ce 50%, #2c5282 100%)",
      },
    },
  },
  plugins: [],
};
