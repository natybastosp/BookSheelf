<template>
  <div class="desk-background">
    <!-- 
      Reutilizamos a mesma estrutura base da página inicial
      Isso garante consistência visual e uma experiência coesa
    -->

    <div class="notebook-container">
      <!-- Navegação com marca páginas - mesma estrutura, mas agora Trending está ativo -->
      <nav class="bookmark-tabs">
        <NuxtLink to="/" class="tab">
          <Icon name="home" class="tab-icon" />
          HOME
        </NuxtLink>

        <!-- Esta aba agora tem a classe 'active' porque estamos na página trending -->
        <NuxtLink to="/trending" class="tab active">
          <Icon name="trending-up" class="tab-icon" />
          TRENDING
        </NuxtLink>

        <NuxtLink to="/genres" class="tab">
          <Icon name="book-open" class="tab-icon" />
          GENRES
        </NuxtLink>

        <NuxtLink to="/search" class="tab">
          <Icon name="search" class="tab-icon" />
          SEARCH
        </NuxtLink>

        <NuxtLink to="/favorites" class="tab">
          <Icon name="heart" class="tab-icon" />
          FAVORITES
        </NuxtLink>
      </nav>

      <!-- O caderno aberto - mantemos a estrutura de duas páginas -->
      <main class="notebook-spread">
        <!-- Página da esquerda - controles e filtros -->
        <section class="page left-page">
          <header class="page-header">
            <h1 class="main-title">
              📈 <span class="title-highlight">Trending Books</span>
            </h1>
            <p class="subtitle">Discover what the world is reading right now</p>
          </header>

          <!-- Filtros de período - elemento interativo importante -->
          <div class="period-filters">
            <h3 class="filter-title">Time Period</h3>
            <div class="filter-buttons">
              <!-- 
                Usamos v-for para criar botões dinamicamente
                Isso nos ensina sobre renderização de listas em Vue
              -->
              <button
                v-for="period in timePeriods"
                :key="period.value"
                @click="selectedPeriod = period.value"
                :class="[
                  'filter-btn',
                  { active: selectedPeriod === period.value },
                ]"
              >
                {{ period.label }}
              </button>
            </div>
          </div>

          <!-- Estatísticas do período selecionado -->
          <div class="trending-stats">
            <h3 class="stats-title">{{ currentPeriodLabel }} Stats</h3>
            <div class="stats-grid">
              <div class="stat-card">
                <span class="stat-number">{{ trendingStats.totalBooks }}</span>
                <span class="stat-label">Trending Books</span>
              </div>
              <div class="stat-card">
                <span class="stat-number">{{ trendingStats.newEntries }}</span>
                <span class="stat-label"
                  >New This {{ currentPeriodLabel }}</span
                >
              </div>
              <div class="stat-card">
                <span class="stat-number">{{ trendingStats.avgRating }}</span>
                <span class="stat-label">Average Rating</span>
              </div>
            </div>
          </div>

          <!-- Informações sobre os critérios de trending -->
          <div class="trending-info">
            <h3 class="info-title">How We Calculate Trending</h3>
            <div class="info-content">
              <p class="info-text">
                Our trending algorithm considers multiple factors: sales
                velocity, social media mentions, review frequency, and reading
                completion rates to give you the most accurate picture of what's
                truly popular.
              </p>
            </div>
          </div>
        </section>

        <!-- Página da direita - lista de livros trending -->
        <section class="page right-page">
          <div class="visual-header">
            <div class="ranking-badge">
              🏆 Top {{ filteredTrendingBooks.length }} Books
            </div>
            <h2 class="visual-title">{{ currentPeriodLabel }} Rankings</h2>
          </div>

          <!-- Lista de livros trending - o coração desta página -->
          <div class="trending-books-list">
            <!-- 
              Iteramos sobre os livros filtrados pelo período selecionado
              Cada livro é um card com informações essenciais
            -->
            <div
              v-for="(book, index) in filteredTrendingBooks"
              :key="book.id"
              class="trending-book-item"
              :class="{ 'top-book': index < 3 }"
            >
              <!-- Número do ranking -->
              <div class="rank-number">
                {{ index + 1 }}
              </div>

              <!-- Capa do livro (placeholder por enquanto) -->
              <div class="book-cover">
                <Icon name="book" class="cover-icon" />
              </div>

              <!-- Informações do livro -->
              <div class="book-details">
                <h4 class="book-title">{{ book.title }}</h4>
                <p class="book-author">by {{ book.author }}</p>
                <div class="book-meta">
                  <span class="genre-tag">{{ book.genre }}</span>
                  <span class="rating">⭐ {{ book.rating }}/5</span>
                </div>

                <!-- Indicador de tendência -->
                <div class="trend-indicator">
                  <Icon :name="book.trendDirection" class="trend-icon" />
                  <span class="trend-text">{{ book.trendText }}</span>
                </div>
              </div>

              <!-- Botão de ação -->
              <div class="book-actions">
                <button class="view-btn" @click="viewBookDetails(book)">
                  View Details
                </button>
              </div>
            </div>
          </div>

          <!-- Elementos decorativos específicos para trending -->
          <div class="decorative-elements">
            <div class="decoration fire-1">🔥</div>
            <div class="decoration fire-2">📈</div>
            <div class="decoration star-trend">⭐</div>
            <div class="decoration chart">📊</div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Meta tags para SEO - cada página deve ter suas próprias
useHead({
  title: "Trending Books - Book Scrapbook",
  meta: [
    {
      name: "description",
      content:
        "Discover the most popular and trending books across different time periods. Find your next great read from what everyone is talking about.",
    },
  ],
});

//
// === DADOS REATIVOS ===
// Aqui definimos os dados que mudam conforme a interação do usuário
//

// Estado reativo para o período selecionado
const selectedPeriod = ref("week");

// Definição dos períodos disponíveis
// Usar um array de objetos facilita a manutenção e expansão futura
const timePeriods = [
  { value: "day", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
];

// Dados mock de livros trending
// Em um projeto real, estes dados viriam de uma API
const trendingBooksData = {
  day: [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      genre: "Fiction",
      rating: 4.8,
      trendDirection: "trending-up",
      trendText: "+127% today",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-Help",
      rating: 4.7,
      trendDirection: "trending-up",
      trendText: "+89% today",
    },
    {
      id: 3,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      genre: "Thriller",
      rating: 4.6,
      trendDirection: "trending-up",
      trendText: "+65% today",
    },
  ],
  week: [
    {
      id: 4,
      title: "Project Hail Mary",
      author: "Andy Weir",
      genre: "Sci-Fi",
      rating: 4.9,
      trendDirection: "trending-up",
      trendText: "+245% this week",
    },
    {
      id: 5,
      title: "The Midnight Library",
      author: "Matt Haig",
      genre: "Fiction",
      rating: 4.5,
      trendDirection: "trending-up",
      trendText: "+198% this week",
    },
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      genre: "Fiction",
      rating: 4.8,
      trendDirection: "trending-up",
      trendText: "+156% this week",
    },
  ],
  month: [
    {
      id: 6,
      title: "Educated",
      author: "Tara Westover",
      genre: "Memoir",
      rating: 4.7,
      trendDirection: "trending-up",
      trendText: "+567% this month",
    },
    {
      id: 4,
      title: "Project Hail Mary",
      author: "Andy Weir",
      genre: "Sci-Fi",
      rating: 4.9,
      trendDirection: "trending-up",
      trendText: "+445% this month",
    },
    {
      id: 7,
      title: "Dune",
      author: "Frank Herbert",
      genre: "Sci-Fi",
      rating: 4.6,
      trendDirection: "trending-up",
      trendText: "+334% this month",
    },
  ],
  year: [
    {
      id: 8,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      genre: "Non-Fiction",
      rating: 4.8,
      trendDirection: "trending-up",
      trendText: "+1,234% this year",
    },
    {
      id: 6,
      title: "Educated",
      author: "Tara Westover",
      genre: "Memoir",
      rating: 4.7,
      trendDirection: "trending-up",
      trendText: "+987% this year",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-Help",
      rating: 4.7,
      trendDirection: "trending-up",
      trendText: "+876% this year",
    },
  ],
};

//
// === COMPUTED PROPERTIES ===
// Propriedades que são recalculadas automaticamente quando os dados mudam
//

// Livros filtrados pelo período selecionado
const filteredTrendingBooks = computed(() => {
  return trendingBooksData[selectedPeriod.value] || [];
});

// Label do período atual para exibição
const currentPeriodLabel = computed(() => {
  const period = timePeriods.find((p) => p.value === selectedPeriod.value);
  return period ? period.label : "Week";
});

// Estatísticas dinâmicas baseadas no período selecionado
const trendingStats = computed(() => {
  const books = filteredTrendingBooks.value;
  return {
    totalBooks: books.length,
    newEntries: Math.floor(books.length * 0.3), // 30% são novos
    avgRating:
      books.length > 0
        ? (
            books.reduce((sum, book) => sum + book.rating, 0) / books.length
          ).toFixed(1)
        : "0.0",
  };
});

//
// === MÉTODOS ===
// Funções que lidam com interações do usuário
//

// Função para ver detalhes do livro
// Por enquanto apenas um placeholder, mas estrutura para funcionalidade futura
const viewBookDetails = (book) => {
  // Em um projeto real, isso navegaria para a página de detalhes do livro
  // ou abriria um modal com mais informações
  console.log("Viewing details for:", book.title);
  // Futura implementação: navigateTo(`/book/${book.id}`)
};

// Componente Icon reutilizado (mesmo da página inicial)
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
        book: "📚",
        fire: "🔥",
      };
      return icons[name] || "📄";
    };

    return { getIconSymbol };
  },
});
</script>

<style scoped>
/* 
  === ESTILOS BASE ===
  Reutilizamos os estilos fundamentais da página inicial
  Isso garante consistência visual em todo o site
*/

.desk-background {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.notebook-container {
  max-width: 1200px;
  width: 100%;
  position: relative;
}

/* Reutilização dos estilos de navegação */
.bookmark-tabs {
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-bottom: -1px;
  z-index: 10;
}

.tab {
  background: #f8f9fa;
  border: 2px solid #dee2e6;
  border-bottom: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem 0.5rem 0 0;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  color: #6c757d;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
}

.tab:hover {
  background: #e9ecef;
  color: #495057;
  transform: translateY(-2px);
}

.tab.active {
  background: white;
  color: #495057;
  border-color: #adb5bd;
}

/* Layout do caderno */
.notebook-spread {
  background: white;
  border: 2px solid #adb5bd;
  border-radius: 0 1rem 1rem 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 700px;
  position: relative;
}

.notebook-spread::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e9ecef;
  transform: translateX(-50%);
}

.page {
  padding: 3rem 2.5rem;
  position: relative;
  overflow: hidden;
}

.left-page {
  background: radial-gradient(
      circle at 20% 80%,
      rgba(255, 99, 71, 0.05) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 165, 0, 0.05) 0%,
      transparent 50%
    );
}

.right-page {
  background: radial-gradient(
      circle at 20% 20%,
      rgba(255, 206, 84, 0.05) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(255, 99, 71, 0.05) 0%,
      transparent 50%
    );
}

/* 
  === ESTILOS ESPECÍFICOS DA PÁGINA TRENDING ===
  Agora definimos estilos únicos para esta página
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
  background: linear-gradient(45deg, #ff6347, #ffa500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.25rem;
  color: #718096;
  font-weight: 400;
}

/* Filtros de período */
.period-filters {
  margin-bottom: 2rem;
}

.filter-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e2e8f0;
  background: #f7fafc;
  border-radius: 0.5rem;
  font-weight: 500;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: #cbd5e0;
  background: #edf2f7;
}

.filter-btn.active {
  background: linear-gradient(45deg, #ff6347, #ffa500);
  color: white;
  border-color: transparent;
}

/* Estatísticas */
.trending-stats {
  margin-bottom: 2rem;
}

.stats-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.stat-card {
  background: #f7fafc;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  border-left: 4px solid #ff6347;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff6347;
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  color: #718096;
}

/* Informações sobre trending */
.trending-info {
  background: #fff5f5;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #fed7d7;
}

.info-title {
  font-size: 1rem;
  font-weight: 600;
  color: #c53030;
  margin-bottom: 0.5rem;
}

.info-text {
  font-size: 0.875rem;
  color: #744210;
  line-height: 1.5;
}

/* 
  === PÁGINA DIREITA - LISTA DE LIVROS ===
  Estilos para a exibição dos livros trending
*/

.visual-header {
  margin-bottom: 2rem;
  text-align: center;
}

.ranking-badge {
  background: #ff6347;
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

/* Lista de livros trending */
.trending-books-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.trending-book-item {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  gap: 1rem;
  padding: 1rem;
  background: #f7fafc;
  border-radius: 0.5rem;
  align-items: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.trending-book-item:hover {
  background: #edf2f7;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.trending-book-item.top-book {
  border-color: #ffd700;
  background: linear-gradient(135deg, #fff9e6 0%, #f7fafc 100%);
}

.rank-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff6347;
  width: 2rem;
  text-align: center;
}

.book-cover {
  width: 40px;
  height: 60px;
  background: #e2e8f0;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-icon {
  font-size: 1.25rem;
  color: #a0aec0;
}

.book-details {
  min-width: 0;
}

.book-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-author {
  font-size: 0.75rem;
  color: #718096;
  margin-bottom: 0.25rem;
}

.book-meta {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.25rem;
}

.genre-tag {
  background: #e2e8f0;
  color: #4a5568;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.625rem;
  font-weight: 500;
}

.rating {
  font-size: 0.625rem;
  color: #d69e2e;
}

.trend-indicator {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.trend-icon {
  font-size: 0.75rem;
  color: #38a169;
}

.trend-text {
  font-size: 0.625rem;
  color: #38a169;
  font-weight: 500;
}

.book-actions {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.view-btn {
  padding: 0.25rem 0.75rem;
  background: linear-gradient(45deg, #ff6347, #ffa500);
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(255, 99, 71, 0.3);
}

/* Elementos decorativos específicos */
.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.decoration {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.4;
  animation: float 8s ease-in-out infinite;
}

.fire-1 {
  top: 10%;
  right: 15%;
  animation-delay: 0s;
}
.fire-2 {
  top: 25%;
  right: 5%;
  animation-delay: 2s;
}
.star-trend {
  bottom: 30%;
  right: 20%;
  animation-delay: 4s;
}
.chart {
  bottom: 15%;
  left: 85%;
  animation-delay: 6s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .notebook-spread {
    grid-template-columns: 1fr;
  }

  .notebook-spread::before {
    display: none;
  }

  .page {
    padding: 2rem 1.5rem;
  }

  .trending-book-item {
    grid-template-columns: auto 1fr auto;
    gap: 0.75rem;
  }

  .book-cover {
    width: 30px;
    height: 45px;
  }

  .filter-buttons {
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.icon {
  display: inline-block;
  font-style: normal;
}
</style>
