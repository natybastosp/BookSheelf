<template>
  <div class="desk-background">
    <!-- 
      A "mesa" - fundo completo da tela onde o caderno fica apoiado
      Usamos min-h-screen para ocupar toda a altura da tela
    -->

    <div class="notebook-container">
      <!-- 
        Container principal do caderno - define o tamanho máximo
        e centraliza o caderno na tela, como se estivesse sobre a mesa
      -->

      <!-- Marca páginas/Abas de navegação -->
      <nav class="bookmark-tabs">
        <!-- 
          As abas ficam na parte superior, como marca páginas reais
          Cada aba representa uma seção diferente do site
        -->
        <NuxtLink to="/" class="tab active" aria-label="Home page">
          <Icon name="home" class="tab-icon" />
          HOME
        </NuxtLink>

        <NuxtLink to="/trending" class="tab" aria-label="Trending books">
          <Icon name="trending-up" class="tab-icon" />
          TRENDING
        </NuxtLink>

        <NuxtLink to="/genres" class="tab" aria-label="Book genres">
          <Icon name="book-open" class="tab-icon" />
          GENRES
        </NuxtLink>

        <NuxtLink to="/search" class="tab" aria-label="Search books">
          <Icon name="search" class="tab-icon" />
          SEARCH
        </NuxtLink>

        <NuxtLink to="/favorites" class="tab" aria-label="Favorite books">
          <Icon name="heart" class="tab-icon" />
          FAVORITES
        </NuxtLink>
      </nav>

      <!-- O caderno aberto - duas páginas lado a lado -->
      <main class="notebook-spread">
        <!-- 
          O spread é como chamamos as duas páginas abertas de um caderno
          Usamos CSS Grid para criar duas colunas iguais
        -->

        <!-- Página da esquerda -->
        <section class="page left-page">
          <!-- 
            A página da esquerda geralmente contém texto principal,
            listas, ou informações organizadas
          -->

          <!-- Header da página esquerda -->
          <header class="page-header">
            <h1 class="main-title">
              Welcome to Your
              <span class="title-highlight">Book Scrapbook</span>
            </h1>
            <p class="subtitle">
              Discover, collect, and remember your literary journey
            </p>
          </header>

          <!-- Conteúdo principal da página esquerda -->
          <div class="page-content">
            <!-- Seção de introdução -->
            <div class="intro-section">
              <h2 class="section-title">Your Reading Adventure Starts Here</h2>
              <p class="intro-text">
                Just like a physical scrapbook holds memories, this digital
                space will help you discover new books, track trending titles,
                explore different genres, and build your personal reading
                collection.
              </p>
            </div>

            <!-- Quick actions -->
            <div class="quick-actions">
              <h3 class="actions-title">Quick Start</h3>
              <div class="action-buttons">
                <NuxtLink to="/trending" class="action-btn primary">
                  <Icon name="fire" />
                  See What's Hot
                </NuxtLink>
                <NuxtLink to="/genres" class="action-btn secondary">
                  <Icon name="compass" />
                  Explore Genres
                </NuxtLink>
              </div>
            </div>

            <!-- Stats ou informações adicionais -->
            <div class="stats-section">
              <div class="stat-item">
                <span class="stat-number">10K+</span>
                <span class="stat-label">Books Available</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">50+</span>
                <span class="stat-label">Genres</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">Daily</span>
                <span class="stat-label">New Updates</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Página da direita -->
        <section class="page right-page">
          <!-- 
            A página da direita é mais visual - imagens, decorações,
            elementos que tornam o scrapbook mais atrativo
          -->

          <!-- Header visual da página direita -->
          <div class="visual-header">
            <div class="date-badge">
              {{ currentDate }}
            </div>
            <h2 class="visual-title">Today's Book Discovery</h2>
          </div>

          <!-- Featured book ou conteúdo visual principal -->
          <div class="featured-content">
            <!-- Placeholder para featured book -->
            <div class="featured-book-card">
              <div class="book-cover-placeholder">
                <Icon name="book" class="book-icon" />
              </div>
              <div class="book-info">
                <h3 class="book-title">Featured Book</h3>
                <p class="book-author">Coming Soon...</p>
                <p class="book-description">
                  Your personalized book recommendations will appear here
                </p>
              </div>
            </div>
          </div>

          <!-- Decorative elements - como adesivos em um scrapbook real -->
          <div class="decorative-elements">
            <!-- Stars decoration -->
            <div class="decoration star-1">⭐</div>
            <div class="decoration star-2">✨</div>
            <div class="decoration star-3">🌟</div>

            <!-- Book-related decorations -->
            <div class="decoration book-emoji-1">📚</div>
            <div class="decoration book-emoji-2">📖</div>

            <!-- Corner decoration -->
            <div class="corner-decoration">
              <div class="corner-fold"></div>
            </div>
          </div>

          <!-- Reading progress ou outros elementos visuais -->
          <div class="visual-stats">
            <div class="progress-circle">
              <div class="circle-content">
                <span class="progress-number">0</span>
                <span class="progress-label">Books Read</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
// Imports necessários para funcionalidade
import { computed } from "vue";

// Meta tags para SEO e informações da página
useHead({
  title: "Book Scrapbook - Your Digital Reading Journal",
  meta: [
    {
      name: "description",
      content:
        "Discover trending books, explore genres, and build your personal reading collection in this beautiful digital scrapbook.",
    },
  ],
});

// Computed property para mostrar a data atual
// Isso atualiza automaticamente quando a data muda
const currentDate = computed(() => {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return now.toLocaleDateString("en-US", options);
});

// Componente Icon simplificado para não depender de biblioteca externa ainda
// Depois podemos trocar por Lucide ou outra biblioteca
const Icon = defineComponent({
  props: ["name"],
  template: `
    <span class="icon" :data-icon="name">
      {{ getIconSymbol(name) }}
    </span>
  `,
  setup(props) {
    const getIconSymbol = (name) => {
      const icons = {
        home: "🏠",
        "trending-up": "📈",
        "book-open": "📖",
        search: "🔍",
        heart: "❤️",
        fire: "🔥",
        compass: "🧭",
        book: "📚",
      };
      return icons[name] || "📄";
    };

    return { getIconSymbol };
  },
});
</script>

<style scoped>
/* 
  === ESTRUTURA BASE ===
  Começamos definindo os elementos mais externos e trabalhamos para dentro
*/

.desk-background {
  /* A "mesa" - fundo completo onde o caderno fica apoiado */
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Gradiente suave que simula uma superfície onde o caderno está apoiado */

  padding: 2rem 1rem;
  /* Espaçamento ao redor para que o caderno não cole nas bordas da tela */

  display: flex;
  justify-content: center;
  align-items: flex-start;
  /* Centraliza o caderno horizontalmente e alinha no topo */
}

.notebook-container {
  /* Container principal do caderno - define tamanho máximo */
  max-width: 1200px;
  width: 100%;
  position: relative;
  /* Relative para que os elementos filhos possam usar position absolute */
}

/* 
  === MARCA PÁGINAS/ABAS DE NAVEGAÇÃO ===
  As abas ficam na parte superior, como marca páginas reais
*/

.bookmark-tabs {
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-bottom: -1px;
  /* Margem negativa para que as abas se conectem com o caderno */
  z-index: 10;
  /* Z-index alto para ficar sobre outros elementos */
}

.tab {
  /* Estilo de cada aba individual */
  background: #f8f9fa;
  border: 2px solid #dee2e6;
  border-bottom: none;
  /* Sem borda inferior para conectar com o caderno */

  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem 0.5rem 0 0;
  /* Bordas arredondadas só em cima, como abas reais */

  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  color: #6c757d;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  transition: all 0.3s ease;
  /* Transição suave para efeitos hover */

  position: relative;
}

.tab:hover {
  background: #e9ecef;
  color: #495057;
  transform: translateY(-2px);
  /* Pequeno movimento para cima no hover */
}

.tab.active {
  /* Aba ativa (página atual) */
  background: white;
  color: #495057;
  border-color: #adb5bd;
  /* Destaque visual para mostrar qual página está ativa */
}

.tab-icon {
  font-size: 1rem;
}

/* 
  === CADERNO ABERTO (SPREAD) ===
  O spread são as duas páginas lado a lado
*/

.notebook-spread {
  background: white;
  border: 2px solid #adb5bd;
  border-radius: 0 1rem 1rem 1rem;
  /* Bordas arredondadas, exceto canto superior esquerdo */

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.1);
  /* Sombra realista para dar profundidade */

  display: grid;
  grid-template-columns: 1fr 1fr;
  /* Duas colunas iguais para as duas páginas */

  min-height: 600px;
  /* Altura mínima para o caderno */

  position: relative;
}

/* Linha central que divide as páginas */
.notebook-spread::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e9ecef;
  transform: translateX(-50%);
  /* Linha sutil no meio para simular a divisão das páginas */
}

/* 
  === PÁGINAS INDIVIDUAIS ===
  Estilo para cada página do caderno
*/

.page {
  padding: 3rem 2.5rem;
  position: relative;
  overflow: hidden;
  /* Esconde elementos que saem da área da página */
}

.left-page {
  /* Página da esquerda - foco em texto e informações */
  background: radial-gradient(
      circle at 20% 80%,
      rgba(120, 119, 198, 0.03) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 119, 198, 0.03) 0%,
      transparent 50%
    );
  /* Gradientes sutis para dar textura de papel */
}

.right-page {
  /* Página da direita - mais visual e decorativa */
  background: radial-gradient(
      circle at 20% 20%,
      rgba(255, 206, 84, 0.05) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(120, 119, 198, 0.05) 0%,
      transparent 50%
    );
}

/* 
  === CONTEÚDO DAS PÁGINAS ===
  Estilos para o conteúdo dentro de cada página
*/

.page-header {
  margin-bottom: 2rem;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.title-highlight {
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  /* Texto com gradiente para destaque */
}

.subtitle {
  font-size: 1.25rem;
  color: #718096;
  font-weight: 400;
}

/* Seções de conteúdo */
.intro-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
}

.intro-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #718096;
}

/* Botões de ação rápida */
.quick-actions {
  margin-bottom: 2rem;
}

.actions-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.action-btn.secondary {
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  color: #4a5568;
}

.action-btn.secondary:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
}

/* Estatísticas */
.stats-section {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  color: #718096;
}

/* 
  === PÁGINA DIREITA - ELEMENTOS VISUAIS ===
*/

.visual-header {
  margin-bottom: 2rem;
  text-align: center;
}

.date-badge {
  background: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 1rem;
}

.visual-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #4a5568;
}

.featured-content {
  margin-bottom: 2rem;
}

.featured-book-card {
  background: #f7fafc;
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  border: 2px dashed #e2e8f0;
}

.book-cover-placeholder {
  width: 80px;
  height: 120px;
  background: #e2e8f0;
  border-radius: 0.5rem;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-icon {
  font-size: 2rem;
  color: #a0aec0;
}

.book-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.book-author {
  color: #718096;
  margin-bottom: 1rem;
}

.book-description {
  font-size: 0.875rem;
  color: #a0aec0;
  line-height: 1.5;
}

/* Elementos decorativos */
.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  /* Elementos puramente decorativos, não interferem com cliques */
}

.decoration {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.6;
  animation: float 6s ease-in-out infinite;
  /* Animação suave de flutuação */
}

.star-1 {
  top: 15%;
  right: 20%;
  animation-delay: 0s;
}
.star-2 {
  top: 30%;
  right: 10%;
  animation-delay: 2s;
}
.star-3 {
  bottom: 40%;
  right: 15%;
  animation-delay: 4s;
}
.book-emoji-1 {
  top: 60%;
  left: 85%;
  animation-delay: 1s;
}
.book-emoji-2 {
  bottom: 20%;
  left: 80%;
  animation-delay: 3s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Progresso visual */
.visual-stats {
  text-align: center;
  margin-top: 2rem;
}

.progress-circle {
  width: 100px;
  height: 100px;
  border: 4px solid #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  position: relative;
}

.circle-content {
  text-align: center;
}

.progress-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
}

.progress-label {
  display: block;
  font-size: 0.75rem;
  color: #718096;
}

/* 
  === RESPONSIVIDADE ===
  Adaptações para diferentes tamanhos de tela
*/

@media (max-width: 768px) {
  .notebook-spread {
    grid-template-columns: 1fr;
    /* Uma coluna só no mobile */
  }

  .notebook-spread::before {
    display: none;
    /* Remove a linha divisória no mobile */
  }

  .page {
    padding: 2rem 1.5rem;
  }

  .main-title {
    font-size: 2rem;
  }

  .bookmark-tabs {
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .tab {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }

  .stats-section {
    justify-content: center;
  }
}

/* Ícones simples enquanto não temos biblioteca */
.icon {
  display: inline-block;
  font-style: normal;
}
</style>
