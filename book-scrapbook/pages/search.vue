<template>
  <div class="desk-background">
    <div class="notebook-container">
      <!-- Navegação - agora Search está ativo -->
      <nav class="bookmark-tabs">
        <NuxtLink to="/" class="tab">
          <Icon name="home" class="tab-icon" />
          HOME
        </NuxtLink>

        <NuxtLink to="/trending" class="tab">
          <Icon name="trending-up" class="tab-icon" />
          TRENDING
        </NuxtLink>

        <NuxtLink to="/genres" class="tab">
          <Icon name="book-open" class="tab-icon" />
          GENRES
        </NuxtLink>

        <!-- Esta é nossa aba ativa agora -->
        <NuxtLink to="/search" class="tab active">
          <Icon name="search" class="tab-icon" />
          SEARCH
        </NuxtLink>

        <NuxtLink to="/favorites" class="tab">
          <Icon name="heart" class="tab-icon" />
          FAVORITES
        </NuxtLink>
      </nav>

      <main class="notebook-spread">
        <!-- Página da esquerda - controles de busca e filtros -->
        <section class="page left-page">
          <header class="page-header">
            <h1 class="main-title">
              🔍 <span class="title-highlight">Search Books</span>
            </h1>
            <p class="subtitle">
              Find your perfect book with our advanced search tools
            </p>
          </header>

          <!-- Campo de busca principal -->
          <!-- 
            Aqui introduzimos o conceito de busca em tempo real
            O @input faz com que a busca aconteça enquanto o usuário digita
          -->
          <div class="search-main">
            <div class="search-box">
              <Icon name="search" class="search-icon" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by title, author, or keywords..."
                class="search-input"
                @input="performSearch"
              />
              <!-- Botão para limpar a busca -->
              <button v-if="searchQuery" @click="clearSearch" class="clear-btn">
                <Icon name="x" />
              </button>
            </div>
          </div>

          <!-- Filtros avançados -->
          <div class="advanced-filters">
            <h3 class="filter-title">Refine Your Search</h3>

            <!-- Filtro por categoria -->
            <div class="filter-group">
              <label class="filter-label">Category</label>
              <select v-model="selectedCategory" class="filter-select">
                <option value="">All Categories</option>
                <option
                  v-for="category in availableCategories"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
            </div>

            <!-- Filtro por avaliação mínima -->
            <div class="filter-group">
              <label class="filter-label">Minimum Rating</label>
              <div class="rating-filter">
                <!-- 
                  Criamos um seletor visual de rating usando estrelas
                  Isso ensina sobre interação visual avançada
                -->
                <button
                  v-for="star in 5"
                  :key="star"
                  @click="minRating = star"
                  :class="['star-btn', { active: star <= minRating }]"
                >
                  ⭐
                </button>
                <span class="rating-text">{{ minRating }}.0+ stars</span>
              </div>
            </div>

            <!-- Filtro por ano de publicação -->
            <div class="filter-group">
              <label class="filter-label">Publication Year</label>
              <div class="year-filter">
                <select v-model="yearFilter" class="filter-select">
                  <option value="">Any Year</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="older">Before 2020</option>
                </select>
              </div>
            </div>

            <!-- Ordenação dos resultados -->
            <div class="filter-group">
              <label class="filter-label">Sort Results By</label>
              <select v-model="sortBy" class="filter-select">
                <option value="relevance">Relevance</option>
                <option value="title">Title A-Z</option>
                <option value="author">Author A-Z</option>
                <option value="rating">Highest Rated</option>
                <option value="year">Newest First</option>
                <option value="popularity">Most Popular</option>
              </select>
            </div>

            <!-- Botão para resetar filtros -->
            <button @click="resetFilters" class="reset-filters-btn">
              <Icon name="refresh" /> Reset All Filters
            </button>
          </div>

          <!-- Estatísticas da busca -->
          <div class="search-stats">
            <div class="stats-content">
              <div class="stat-item">
                <span class="stat-number">{{ filteredResults.length }}</span>
                <span class="stat-label">Results Found</span>
              </div>
              <div class="stat-item" v-if="searchQuery">
                <span class="stat-number">{{ searchTime }}ms</span>
                <span class="stat-label">Search Time</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Página da direita - resultados da busca -->
        <section class="page right-page">
          <div class="visual-header">
            <!-- Estado condicional: mostra diferentes headers baseado no estado da busca -->
            <div
              v-if="!searchQuery && filteredResults.length === 0"
              class="search-prompt"
            >
              <div class="prompt-icon">🔍</div>
              <h2 class="prompt-title">Start Your Search</h2>
              <p class="prompt-text">
                Type in the search box to find books by title, author, or
                keywords
              </p>
            </div>

            <div
              v-else-if="searchQuery && filteredResults.length === 0"
              class="no-results"
            >
              <div class="no-results-icon">📚</div>
              <h2 class="no-results-title">No Books Found</h2>
              <p class="no-results-text">
                Try adjusting your search terms or filters
              </p>
            </div>

            <div v-else class="results-header">
              <div class="results-badge">
                📖 {{ filteredResults.length }} Results
              </div>
              <h2 class="results-title">
                Search Results
                <span v-if="searchQuery" class="query-highlight"
                  >"{{ searchQuery }}"</span
                >
              </h2>
            </div>
          </div>

          <!-- Lista de resultados -->
          <!-- 
            Esta seção demonstra renderização condicional complexa
            e como lidar com diferentes estados de uma aplicação
          -->
          <div v-if="filteredResults.length > 0" class="search-results">
            <div
              v-for="(book, index) in paginatedResults"
              :key="book.id"
              class="result-item"
              :class="{ 'featured-result': book.featured }"
            >
              <!-- Posição no ranking de resultados -->
              <div class="result-rank">
                {{ (currentPage - 1) * resultsPerPage + index + 1 }}
              </div>

              <!-- Capa do livro -->
              <div class="book-cover">
                <Icon name="book" class="cover-icon" />
                <div v-if="book.featured" class="featured-badge">⭐</div>
              </div>

              <!-- Informações detalhadas do livro -->
              <div class="book-info">
                <!-- Título com destaque dos termos de busca -->
                <h4 class="book-title">
                  <span v-html="highlightSearchTerms(book.title)"></span>
                </h4>

                <!-- Autor com destaque dos termos de busca -->
                <p class="book-author">
                  by <span v-html="highlightSearchTerms(book.author)"></span>
                </p>

                <!-- Metadados do livro -->
                <div class="book-metadata">
                  <span class="genre">{{ book.genre }}</span>
                  <span class="year">{{ book.year }}</span>
                  <span class="rating">⭐ {{ book.rating }}/5</span>
                </div>

                <!-- Snippet da descrição -->
                <p class="book-description">
                  <span v-html="highlightSearchTerms(book.description)"></span>
                </p>

                <!-- Indicadores de relevância -->
                <div class="relevance-indicators">
                  <span v-if="book.exactMatch" class="indicator exact-match">
                    Exact Match
                  </span>
                  <span v-if="book.trending" class="indicator trending">
                    Trending
                  </span>
                  <span v-if="book.newRelease" class="indicator new-release">
                    New Release
                  </span>
                </div>
              </div>

              <!-- Ações do resultado -->
              <div class="result-actions">
                <button class="action-btn view" @click="viewBook(book)">
                  View Details
                </button>
                <button
                  class="action-btn favorite"
                  @click="toggleFavorite(book)"
                  :class="{ active: book.isFavorite }"
                >
                  <Icon name="heart" />
                </button>
              </div>
            </div>
          </div>

          <!-- Paginação -->
          <div v-if="totalPages > 1" class="pagination">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="page-btn"
            >
              ← Previous
            </button>

            <span class="page-info">
              Page {{ currentPage }} of {{ totalPages }}
            </span>

            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="page-btn"
            >
              Next →
            </button>
          </div>

          <!-- Elementos decorativos -->
          <div class="decorative-elements">
            <div class="decoration magnify">🔍</div>
            <div class="decoration books">📚</div>
            <div class="decoration star">⭐</div>
            <div class="decoration bookmark">🔖</div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

// Meta tags para SEO
useHead({
  title: "Search Books - Book Scrapbook",
  meta: [
    {
      name: "description",
      content:
        "Search and discover books by title, author, genre, and more. Use our advanced filters to find your perfect next read.",
    },
  ],
});

//
// === ESTADO REATIVO PARA BUSCA ===
//

// Query principal de busca
const searchQuery = ref("");

// Filtros avançados
const selectedCategory = ref("");
const minRating = ref(0);
const yearFilter = ref("");
const sortBy = ref("relevance");

// Controles de paginação
const currentPage = ref(1);
const resultsPerPage = 10;

// Tempo de busca (para demonstração de performance)
const searchTime = ref(0);

//
// === DADOS MOCK DE LIVROS ===
// Em um projeto real, estes dados viriam de uma API de busca
//

const booksDatabase = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: 1925,
    rating: 4.2,
    description:
      "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
    featured: true,
    trending: false,
    newRelease: false,
    exactMatch: false,
    isFavorite: false,
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    year: 1960,
    rating: 4.3,
    description:
      "A gripping tale of racial injustice and childhood innocence in the American South.",
    featured: false,
    trending: true,
    newRelease: false,
    exactMatch: false,
    isFavorite: false,
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian Fiction",
    year: 1949,
    rating: 4.4,
    description:
      "A dystopian social science fiction novel about totalitarian control and surveillance.",
    featured: false,
    trending: false,
    newRelease: false,
    exactMatch: false,
    isFavorite: true,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    year: 1813,
    rating: 4.5,
    description:
      "A romantic novel that critiques the British landed gentry at the end of the 18th century.",
    featured: false,
    trending: false,
    newRelease: false,
    exactMatch: false,
    isFavorite: false,
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    year: 1951,
    rating: 3.8,
    description:
      "A controversial novel about teenage rebellion and alienation in modern society.",
    featured: false,
    trending: false,
    newRelease: false,
    exactMatch: false,
    isFavorite: false,
  },
  {
    id: 6,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    year: 1997,
    rating: 4.7,
    description:
      "The first book in the magical series about a young wizard discovering his destiny.",
    featured: true,
    trending: true,
    newRelease: false,
    exactMatch: false,
    isFavorite: true,
  },
  {
    id: 7,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    year: 1954,
    rating: 4.6,
    description:
      "Epic fantasy adventure following hobbits on a quest to destroy the One Ring.",
    featured: false,
    trending: false,
    newRelease: false,
    exactMatch: false,
    isFavorite: false,
  },
  {
    id: 8,
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    year: 1965,
    rating: 4.3,
    description:
      "A science fiction epic set on the desert planet Arrakis, exploring politics and ecology.",
    featured: false,
    trending: true,
    newRelease: false,
    exactMatch: false,
    isFavorite: false,
  },
];

//
// === COMPUTED PROPERTIES ===
//

// Categorias disponíveis para filtro
const availableCategories = computed(() => {
  const categories = [...new Set(booksDatabase.map((book) => book.genre))];
  return categories.sort();
});

// Resultados filtrados baseados em todos os critérios
const filteredResults = computed(() => {
  let results = [...booksDatabase];

  // Aplicar busca por texto
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    results = results.filter((book) => {
      const searchableText =
        `${book.title} ${book.author} ${book.description}`.toLowerCase();
      const isMatch = searchableText.includes(query);

      // Marcar exact matches para relevância
      book.exactMatch =
        book.title.toLowerCase() === query ||
        book.author.toLowerCase() === query;

      return isMatch;
    });
  }

  // Aplicar filtro por categoria
  if (selectedCategory.value) {
    results = results.filter((book) => book.genre === selectedCategory.value);
  }

  // Aplicar filtro por rating
  if (minRating.value > 0) {
    results = results.filter((book) => book.rating >= minRating.value);
  }

  // Aplicar filtro por ano
  if (yearFilter.value) {
    if (yearFilter.value === "older") {
      results = results.filter((book) => book.year < 2020);
    } else {
      results = results.filter(
        (book) => book.year.toString() === yearFilter.value
      );
    }
  }

  // Aplicar ordenação
  results.sort((a, b) => {
    switch (sortBy.value) {
      case "title":
        return a.title.localeCompare(b.title);
      case "author":
        return a.author.localeCompare(b.author);
      case "rating":
        return b.rating - a.rating;
      case "year":
        return b.year - a.year;
      case "popularity":
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      case "relevance":
      default:
        // Ordenação por relevância: exact matches primeiro, depois featured, depois trending
        if (a.exactMatch !== b.exactMatch) return b.exactMatch - a.exactMatch;
        if (a.featured !== b.featured) return b.featured - a.featured;
        if (a.trending !== b.trending) return b.trending - a.trending;
        return b.rating - a.rating;
    }
  });

  return results;
});

// Resultados paginados
const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * resultsPerPage;
  const end = start + resultsPerPage;
  return filteredResults.value.slice(start, end);
});

// Total de páginas
const totalPages = computed(() => {
  return Math.ceil(filteredResults.value.length / resultsPerPage);
});

//
// === WATCHERS ===
// Observadores que reagem a mudanças nos dados
//

// Reset página quando filtros mudam
watch([searchQuery, selectedCategory, minRating, yearFilter], () => {
  currentPage.value = 1;
});

//
// === MÉTODOS ===
//

// Função de busca (simula tempo de processamento)
const performSearch = () => {
  const startTime = performance.now();

  // Simular tempo de processamento
  setTimeout(() => {
    const endTime = performance.now();
    searchTime.value = Math.round(endTime - startTime);
  }, 50);
};

// Limpar busca
const clearSearch = () => {
  searchQuery.value = "";
  currentPage.value = 1;
};

// Resetar todos os filtros
const resetFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  minRating.value = 0;
  yearFilter.value = "";
  sortBy.value = "relevance";
  currentPage.value = 1;
};

// Destacar termos de busca no texto
const highlightSearchTerms = (text) => {
  if (!searchQuery.value) return text;

  const query = searchQuery.value.toLowerCase();
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, '<mark class="highlight">$1</mark>');
};

// Navegação de páginas
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Ações dos livros
const viewBook = (book) => {
  console.log("Viewing book:", book.title);
  // Futura implementação: navigateTo(`/book/${book.id}`)
};

const toggleFavorite = (book) => {
  book.isFavorite = !book.isFavorite;
  console.log(
    `${book.title} ${book.isFavorite ? "added to" : "removed from"} favorites`
  );
};

// Componente Icon
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
        x: "✕",
        refresh: "🔄",
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
  === ESTILOS BASE REUTILIZADOS ===
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
      rgba(102, 126, 234, 0.05) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(236, 72, 153, 0.05) 0%,
      transparent 50%
    );
}

.right-page {
  background: radial-gradient(
      circle at 20% 20%,
      rgba(52, 211, 153, 0.05) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(251, 191, 36, 0.05) 0%,
      transparent 50%
    );
}

/*
  === ESTILOS ESPECÍFICOS DA PÁGINA DE BUSCA ===
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
  background: linear-gradient(45deg, #667eea, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.25rem;
  color: #718096;
  font-weight: 400;
}

/* Campo de busca principal */
.search-main {
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  z-index: 2;
  color: #a0aec0;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 2.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.clear-btn {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: #f7fafc;
  color: #4a5568;
}

/* Filtros avançados */
.advanced-filters {
  margin-bottom: 2rem;
}

.filter-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
}

.filter-group {
  margin-bottom: 1rem;
}

.filter-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.filter-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  background: white;
}

/* Filtro de rating com estrelas */
.rating-filter {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.star-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
  opacity: 0.3;
}

.star-btn.active {
  opacity: 1;
}

.star-btn:hover {
  transform: scale(1.1);
}

.rating-text {
  font-size: 0.75rem;
  color: #718096;
  margin-left: 0.5rem;
}

/* Botão de reset */
.reset-filters-btn {
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  color: #4a5568;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.reset-filters-btn:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
}

/* Estatísticas da busca */
.search-stats {
  background: #f7fafc;
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid #667eea;
}

.stats-content {
  display: flex;
  gap: 1rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  color: #667eea;
}

.stat-label {
  display: block;
  font-size: 0.75rem;
  color: #718096;
}

/*
  === PÁGINA DIREITA - RESULTADOS ===
*/

.visual-header {
  margin-bottom: 2rem;
  text-align: center;
}

/* Estados diferentes do header */
.search-prompt {
  padding: 2rem 1rem;
}

.prompt-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.prompt-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.prompt-text {
  color: #718096;
  line-height: 1.5;
}

.no-results {
  padding: 2rem 1rem;
}

.no-results-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.no-results-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #e53e3e;
  margin-bottom: 0.5rem;
}

.no-results-text {
  color: #718096;
  line-height: 1.5;
}

.results-header {
  text-align: center;
}

.results-badge {
  background: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 1rem;
}

.results-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #4a5568;
}

.query-highlight {
  color: #667eea;
}

/* Lista de resultados */
.search-results {
  max-height: 450px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.result-item {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  gap: 1rem;
  padding: 1rem;
  background: #f7fafc;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.result-item:hover {
  background: #edf2f7;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.result-item.featured-result {
  border-color: #ffd700;
  background: linear-gradient(135deg, #fff9e6 0%, #f7fafc 100%);
}

.result-rank {
  font-size: 1rem;
  font-weight: 700;
  color: #667eea;
  width: 1.5rem;
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
  position: relative;
}

.cover-icon {
  font-size: 1.25rem;
  color: #a0aec0;
}

.featured-badge {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  font-size: 0.75rem;
}

.book-info {
  min-width: 0;
}

.book-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.book-author {
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 0.5rem;
}

.book-metadata {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.genre,
.year {
  background: #e2e8f0;
  color: #4a5568;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.625rem;
  font-weight: 500;
}

.rating {
  font-size: 0.75rem;
  color: #d69e2e;
}

.book-description {
  font-size: 0.75rem;
  color: #718096;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.relevance-indicators {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.indicator {
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.625rem;
  font-weight: 500;
}

.exact-match {
  background: #c6f6d5;
  color: #22543d;
}

.trending {
  background: #fed7d7;
  color: #742a2a;
}

.new-release {
  background: #bee3f8;
  color: #2c5282;
}

.result-actions {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.action-btn {
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.view {
  background: linear-gradient(45deg, #667eea, #ec4899);
  color: white;
}

.action-btn.view:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.action-btn.favorite {
  background: #f7fafc;
  color: #a0aec0;
  border: 1px solid #e2e8f0;
}

.action-btn.favorite.active {
  background: #fed7d7;
  color: #e53e3e;
  border-color: #feb2b2;
}

/* Destaque de termos de busca */
:deep(.highlight) {
  background: #fef5e7;
  color: #744210;
  padding: 0.125rem 0.25rem;
  border-radius: 0.125rem;
  font-weight: 600;
}

/* Paginação */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
}

.page-btn {
  padding: 0.5rem 1rem;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background: #edf2f7;
  border-color: #cbd5e0;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.875rem;
  color: #718096;
}

/* Elementos decorativos */
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
  opacity: 0.2;
  animation: float 12s ease-in-out infinite;
}

.magnify {
  top: 10%;
  right: 15%;
  animation-delay: 0s;
}
.books {
  top: 30%;
  left: 85%;
  animation-delay: 3s;
}
.star {
  bottom: 40%;
  right: 10%;
  animation-delay: 6s;
}
.bookmark {
  bottom: 20%;
  left: 90%;
  animation-delay: 9s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
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

  .result-item {
    grid-template-columns: auto 1fr auto;
    gap: 0.75rem;
  }

  .result-rank {
    display: none;
  }

  .book-metadata {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .stats-content {
    justify-content: center;
  }
}

.icon {
  display: inline-block;
  font-style: normal;
}
</style>
