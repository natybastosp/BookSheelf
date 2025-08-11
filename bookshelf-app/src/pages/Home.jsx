import React from "react";
import { motion } from "framer-motion";
import BookCard from "../components/features/BookCard";

const Home = () => {
  // Mock data - substituir pela API depois
  const featuredBook = {
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    category: "Romance",
    ranking: 1,
    weeks: 15,
    rating: 4.5,
    readers: "2.1M",
    price: 29.9,
  };

  const categories = [
    {
      id: "fiction",
      name: "Fiction",
      icon: "📚",
      count: 156,
      gradient: "from-fiction-primary to-fiction-secondary",
    },
    {
      id: "romance",
      name: "Romance",
      icon: "💕",
      count: 89,
      gradient: "from-romance-primary to-romance-secondary",
    },
    {
      id: "mystery",
      name: "Mystery",
      icon: "🔍",
      count: 124,
      gradient: "from-mystery-primary to-mystery-secondary",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* Hero Section - Featured Book */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <BookCard book={featuredBook} categoryColors="romance" />
      </motion.section>

      {/* Journal Page - Intro Text */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="journal-background rounded-3xl p-12 shadow-float relative overflow-hidden"
      >
        <FloatingShapes />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          {/* Left Page */}
          <div className="space-y-8">
            <div className="text-white/70 font-handwritten text-lg">
              Segunda-feira, 11 de Agosto
            </div>

            <h1 className="font-handwritten text-6xl font-bold gradient-text leading-tight">
              ✨ DESCOBRINDO NOVOS
              <br />
              📚 MUNDOS
            </h1>

            <p className="text-accent-yellow font-handwritten text-2xl transform -rotate-1">
              & BESTSELLERS
            </p>

            <div className="text-white/90 font-sans leading-relaxed space-y-4">
              <p>
                Como o ano começa, me encontro{" "}
                <span className="text-accent-green font-semibold">
                  inspirada pela leitura
                </span>{" "}
                e determinação. Cada livro traz novas oportunidades, e desta
                vez, quero mergulhar mais fundo.
              </p>

              <p>
                Um dos meus maiores sonhos é{" "}
                <span className="text-accent-yellow font-semibold underline decoration-accent-pink decoration-2">
                  explorar mais gêneros
                </span>
                , descobrir novos autores, experienciar diferentes culturas, e
                criar memórias duradouras.
              </p>
            </div>

            <div className="space-y-6">
              <GoalItem
                emoji="📖"
                text={
                  <>
                    Outro objetivo é obter minha{" "}
                    <span className="text-accent-yellow font-semibold">
                      certificação em crítica literária
                    </span>
                    . Sei que isso abrirá novas portas e me aproximará de
                    encontrar um trabalho que realmente gosto.
                  </>
                }
              />

              <GoalItem
                emoji="💚"
                text={
                  <>
                    <span className="text-accent-pink font-semibold">
                      Boa saúde
                    </span>{" "}
                    também é uma prioridade. Quero cuidar melhor do meu corpo e
                    mente —{" "}
                    <span className="text-accent-green font-semibold">
                      me manter ativa e equilibrada
                    </span>
                    .
                  </>
                }
              />
            </div>
          </div>

          {/* Right Page */}
          <div className="space-y-6">
            <div className="text-right text-white/70 font-handwritten text-lg">
              Reflexões & Metas
            </div>

            <div className="glassmorphism rounded-2xl p-8 space-y-6">
              <h3 className="font-handwritten text-2xl text-white transform -rotate-1">
                📚 Minha Lista de Leitura
              </h3>

              <div className="space-y-4">
                <ReadingItem
                  title="Começar 3 gêneros novos"
                  status="progress"
                />
                <ReadingItem title="Ler 24 livros este ano" status="planning" />
                <ReadingItem
                  title="Escrever resenhas críticas"
                  status="planning"
                />
              </div>

              <div className="bg-black/20 rounded-xl p-6 text-center">
                <div className="text-accent-yellow text-3xl font-bold mb-2">
                  12
                </div>
                <div className="text-white/70 text-sm uppercase tracking-wide">
                  livros lidos este ano
                </div>
              </div>

              <div className="text-white/90 font-sans text-sm leading-relaxed">
                Espero que este ano seja preenchido com{" "}
                <span className="text-accent-green font-semibold">
                  crescimento e novas experiências
                </span>
                . Com fé, trabalho árduo, e determinação! 🌟
              </div>
            </div>
          </div>
        </div>

        {/* Center divider */}
        <div className="absolute left-1/2 top-12 bottom-12 w-0.5 bg-white/10 transform -translate-x-1/2 hidden md:block" />
      </motion.section>

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="glassmorphism border border-white/10 rounded-3xl p-12"
      >
        <h2 className="font-handwritten text-5xl gradient-text text-center mb-12">
          📚 Explore por Categoria
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              delay={index * 0.1}
            />
          ))}
        </div>
      </motion.section>
    </div>
  );
};

// Goal Item Component
const GoalItem = ({ emoji, text }) => (
  <div className="flex items-start gap-4 text-white/85 font-sans leading-relaxed">
    <span className="text-2xl mt-1">{emoji}</span>
    <p>{text}</p>
  </div>
);

// Reading Item Component
const ReadingItem = ({ title, status }) => {
  const statusColors = {
    progress: "bg-accent-green",
    planning: "bg-accent-yellow",
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
      <span className="text-white/90 font-handwritten">{title}</span>
    </div>
  );
};

// Category Card Component
const CategoryCard = ({ category, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="glassmorphism border border-white/10 rounded-2xl p-8 text-center cursor-pointer group hover:border-white/20 transition-all duration-300 relative overflow-hidden"
    whileHover={{ y: -5 }}
  >
    {/* Hover Background */}
    <div
      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
    />

    <div className="relative z-10">
      <div className="text-6xl mb-6">{category.icon}</div>
      <h3 className="font-display text-2xl font-semibold text-white mb-3">
        {category.name}
      </h3>
      <p className="text-white/70 text-sm">
        {category.count} bestsellers ativos
      </p>
    </div>
  </motion.div>
);

// Floating Shapes Component
const FloatingShapes = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute ${getShapeClass(i)} ${getShapeColor(i)}`}
        style={{
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 90 + 5}%`,
        }}
        animate={{
          y: [-8, 8, -8],
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6 + Math.random() * 4,
          repeat: Infinity,
          delay: i * 0.3,
        }}
      />
    ))}
  </div>
);

const getShapeClass = (index) => {
  const shapes = [
    "w-4 h-4 rounded-full",
    "w-4 h-4 transform rotate-45",
    "w-0 h-0 border-l-2 border-r-2 border-l-transparent border-r-transparent border-b-4",
    "w-3 h-3 rounded-full",
    "w-5 h-5 transform rotate-45",
    "w-4 h-4 rounded-full",
    "w-3 h-3 transform rotate-45",
    "w-4 h-4 rounded-full",
  ];
  return shapes[index % shapes.length];
};

const getShapeColor = (index) => {
  const colors = [
    "bg-accent-pink",
    "bg-accent-green",
    "border-accent-yellow",
    "bg-accent-yellow",
    "bg-accent-coral",
    "bg-accent-cream",
    "bg-accent-pink",
    "bg-accent-green",
  ];
  return colors[index % colors.length];
};

export default Home;
