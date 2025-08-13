<template>
  <div class="desk-background">
    <div class="notebook-container">
      <!-- Navegação - agora Genres está ativo -->
      <nav class="bookmark-tabs">
        <NuxtLink to="/" class="tab">
          <Icon name="home" class="tab-icon" />
          HOME
        </NuxtLink>

        <NuxtLink to="/trending" class="tab">
          <Icon name="trending-up" class="tab-icon" />
          TRENDING
        </NuxtLink>

        <!-- Esta é nossa aba ativa agora -->
        <NuxtLink to="/genres" class="tab active">
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

      <main class="notebook-spread">
        <!-- Página da esquerda - informações sobre gêneros e filtros -->
        <section class="page left-page">
          <header class="page-header">
            <h1 class="main-title">
              📚 <span class="title-highlight">Book Genres</span>
            </h1>
            <p class="subtitle">
              Explore literature by category and discover new reading adventures
            </p>
          </header>

          <!-- Informações sobre gêneros -->
          <div class="genre-intro">
            <h3 class="section-title">Find Your Perfect Genre</h3>
            <p class="intro-text">
              Every reader has their preferences. Whether you're in the mood for
              heart-pounding thrillers, thought-provoking non-fiction, or
              escapist fantasy, we've organized our collection to help you find
              exactly what you're looking for.
            </p>
          </div>

          <!-- Estatísticas por gênero -->
          <div class="genre-stats">
            <h3 class="stats-title">Collection Overview</h3>
            <div class="total-stats">
              <div class="stat-item">
                <span class="stat-number">{{ totalGenres }}</span>
                <span class="stat-label">Genres Available</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ totalBooks }}</span>
                <span class="stat-label">Total Books</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ averageBooksPerGenre }}</span>
                <span class="stat-label">Avg per Genre</span>
              </div>
            </div>
          </div>

          <!-- Filtros de visualização -->
          <div class="view-options">
            <h3 class="options-title">View Options</h3>
            <div class="option-buttons">
              <button
                @click="viewMode = 'grid'"
                :class="['option-btn', { active: viewMode === 'grid' }]"
              >
                <Icon name="grid" /> Grid View
              </button>
              <button
                @click="viewMode = 'list'"
                :class="['option-btn', { active: viewMode === 'list' }]"
              >
                <Icon name="list" /> List View
              </button>
            </div>

            <!-- Ordenação -->
            <div class="sort-options">
              <label class="sort-label">Sort by:</label>
              <select v-model="sortBy" class="sort-select">
                <option value="name">Genre Name</option>
                <option value="books">Number of Books</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>

          <!-- Gênero selecionado (quando aplicável) -->
          <div v-if="selectedGenre" class="selected-genre-info">
            <h3 class="selected-title">{{ selectedGenre.name }}</h3>
            <p class="selected-description">{{ selectedGenre.description }}</p>
            <div class="selected-stats">
              <span class="book-count"
                >{{ selectedGenre.bookCount }} books</span
              >
              <span class="popularity"
                >{{ selectedGenre.popularity }}% popular</span
              >
            </div>
          </div>
        </section>

        <!-- Página da direita - grid/lista de gêneros -->
        <section class="page right-page">
          <div class="visual-header">
            <div class="category-badge">
              📂 {{ sortedGenres.length }} Categories
            </div>
            <h2 class="visual-title">Browse by Interest</h2>
          </div>

          <!-- Container responsivo para grid ou lista -->
          <div :class="['genres-container', viewMode]">
            <!-- 
              Cada gênero é um card interativo que pode levar a uma página específica
              ou expandir para mostrar livros daquele gênero
            -->
            <div
              v-for="genre in sortedGenres"
              :key="genre.id"
              class="genre-card"
              @click="selectGenre(genre)"
              :class="{ selected: selectedGenre?.id === genre.id }"
            >
              <!-- Ícone do gênero -->
              <div class="genre-icon">
                {{ genre.icon }}
              </div>

              <!-- Informações do gênero -->
              <div class="genre-info">
                <h4 class="genre-name">{{ genre.name }}</h4>
                <p class="genre-description">{{ genre.shortDescription }}</p>

                <!-- Estatísticas do gênero -->
                <div class="genre-meta">
                  <span class="book-count">{{ genre.bookCount }} books</span>
                  <span class="popularity-indicator">
                    <Icon name="fire" v-if="genre.popularity > 80" />
                    <Icon
                      name="trending-up"
                      v-else-if="genre.popularity > 60"
                    />
                    <Icon name="book" v-else />
                  </span>
                </div>

                <!-- Barra de popularidade -->
                <div class="popularity-bar">
                  <div
                    class="popularity-fill"
                    :style="{ width: genre.popularity + '%' }"
                  ></div>
                </div>
              </div>

              <!-- Indicador de hover/seleção -->
              <div class="card-indicator">
                <Icon name="chevron-right" />
              </div>
            </div>
          </div>

          <!-- Botão para ver todos os livros do gênero selecionado -->
          <div v-if="selectedGenre" class="genre-actions">
            <button class="explore-btn" @click="exploreGenre(selectedGenre)">
              <Icon name="compass" />
              Explore {{ selectedGenre.name }} Books
            </button>
          </div>

          <!-- Elementos decorativos temáticos -->
          <div class="decorative-elements">
            <div class="decoration book-stack">📚</div>
            <div class="decoration bookmark">🔖</div>
            <div class="decoration library">🏛️</div>
            <div class="decoration reading">👓</div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Meta tags específicas para a página de gêneros
useHead({
  title: "Book Genres - Book Scrapbook",
  meta: [
    {
      name: "description",
      content:
        "Browse books by genre and category. Find fiction, non-fiction, romance, mystery, sci-fi, and more in our organized collection.",
    },
  ],
});

//
// === ESTADO REATIVO ===
//

// Modo de visualização (grid ou lista)
const viewMode = ref("grid");

// Critério de ordenação
const sortBy = ref("name");

// Gênero atualmente selecionado
const selectedGenre = ref(null);

//
// === DADOS DOS GÊNEROS ===
// Em um projeto real, estes dados viriam de uma API ou CMS
//

const genresData = [
  {
    id: 1,
    name: "Fiction",
    icon: "📖",
    shortDescription: "Imaginative storytelling and literary works",
    description:
      "Fiction encompasses all imaginative literature including novels, short stories, and novellas that tell stories about characters and events that are not necessarily based on real facts.",
    bookCount: 1245,
    popularity: 92,
    color: "#4299e1",
  },
  {
    id: 2,
    name: "Mystery & Thriller",
    icon: "🔍",
    shortDescription: "Suspenseful plots and detective stories",
    description:
      "Mystery and thriller books keep readers on the edge of their seats with suspenseful plots, unexpected twists, and engaging detective work.",
    bookCount: 823,
    popularity: 87,
    color: "#805ad5",
  },
  {
    id: 3,
    name: "Romance",
    icon: "💕",
    shortDescription: "Love stories and romantic adventures",
    description:
      "Romance novels focus on love stories and romantic relationships, often featuring emotional journeys and happy endings.",
    bookCount: 956,
    popularity: 89,
    color: "#ed64a6",
  },
  {
    id: 4,
    name: "Science Fiction",
    icon: "🚀",
    shortDescription: "Futuristic technology and space adventures",
    description:
      "Science fiction explores futuristic concepts, advanced technology, space exploration, and the impact of science on society.",
    bookCount: 678,
    popularity: 78,
    color: "#38b2ac",
  },
  {
    id: 5,
    name: "Fantasy",
    icon: "⚔️",
    shortDescription: "Magic, mythical creatures, and epic quests",
    description:
      "Fantasy literature features magical elements, mythical creatures, and imaginary worlds where anything is possible.",
    bookCount: 734,
    popularity: 85,
    color: "#ed8936",
  },
  {
    id: 6,
    name: "Non-Fiction",
    icon: "📚",
    shortDescription: "Real facts, biographies, and educational content",
    description:
      "Non-fiction books present factual information, real-life stories, educational content, and expert insights on various topics.",
    bookCount: 1123,
    popularity: 76,
    color: "#48bb78",
  },
  {
    id: 7,
    name: "Biography",
    icon: "👤",
    shortDescription: "Life stories of remarkable people",
    description:
      "Biographical works tell the life stories of real people, from historical figures to contemporary celebrities and everyday heroes.",
    bookCount: 445,
    popularity: 72,
    color: "#a78bfa",
  },
  {
    id: 8,
    name: "Self-Help",
    icon: "🎯",
    shortDescription: "Personal development and life improvement",
    description:
      "Self-help books provide practical advice and strategies for personal improvement, productivity, and achieving life goals.",
    bookCount: 567,
    popularity: 81,
    color: "#f687b3",
  },
  {
    id: 9,
    name: "History",
    icon: "🏛️",
    shortDescription: "Historical events and cultural studies",
    description:
      "History books explore past events, civilizations, and cultural developments that have shaped our modern world.",
    bookCount: 389,
    popularity: 68,
    color: "#4fd1c7",
  },
  {
    id: 10,
    name: "Young Adult",
    icon: "🌟",
    shortDescription: "Stories for teenage and young adult readers",
    description:
      "Young Adult literature focuses on themes relevant to teenagers and young adults, often featuring coming-of-age stories.",
    bookCount: 812,
    popularity: 94,
    color: "#fbd38d",
  },
];

//
// === COMPUTED PROPERTIES ===
//

// Gêneros ordenados conforme critério selecionado
const sortedGenres = computed(() => {
  const genres = [...genresData];

  switch (sortBy.value) {
    case "name":
      return genres.sort((a, b) => a.name.localeCompare(b.name));
    case "books":
      return genres.sort((a, b) => b.bookCount - a.bookCount);
    case "popularity":
      return genres.sort((a, b) => b.popularity - a.popularity);
    default:
      return genres;
  }
});

// Estatísticas totais calculadas
const totalGenres = computed(() => genresData.length);

const totalBooks = computed(() => {
  return genresData.reduce((sum, genre) => sum + genre.bookCount, 0);
});

const averageBooksPerGenre = computed(() => {
  return Math.round(totalBooks.value / totalGenres.value);
});

//
// === MÉTODOS ===
//

// Selecionar um gênero específico
const selectGenre = (genre) => {
  selectedGenre.value = selectedGenre.value?.id === genre.id ? null : genre;
};

// Explorar livros de um gênero (futura implementação)
const exploreGenre = (genre) => {
  console.log("Exploring genre:", genre.name);
  // Futura implementação: navigateTo(`/genres/${genre.name.toLowerCase()}`)
};

// Componente Icon reutilizado
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
        grid: "▦",
        list: "☰",
        fire: "🔥",
        book: "📚",
        "chevron-right": "›",
        compass: "🧭",
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
      rgba(66, 153, 225, 0.05) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(128, 90, 213, 0.05) 0%,
      transparent 50%
    );
}

.right-page {
  background: radial-gradient(
      circle at 20% 20%,
      rgba(237, 137, 54, 0.05) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(72, 187, 120, 0.05) 0%,
      transparent 50%
    );
}

/*
  === ESTILOS ESPECÍFICOS DA PÁGINA GENRES ===
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
  background: linear-gradient(45deg, #4299e1, #805ad5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.25rem;
  color: #718096;
  font-weight: 400;
}

/* Introdução aos gêneros */
.genre-intro {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
}

.intro-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #718096;
}

/* Estatísticas gerais */
.genre-stats {
  margin-bottom: 2rem;
}

.stats-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
}

.total-stats {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.stat-item {
  text-align: center;
  background: #f7fafc;
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid #4299e1;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #4299e1;
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  color: #718096;
}

/* Opções de visualização */
.view-options {
  margin-bottom: 2rem;
}

.options-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
}

.option-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.option-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e2e8f0;
  background: #f7fafc;
  border-radius: 0.5rem;
  font-weight: 500;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.option-btn:hover {
  border-color: #cbd5e0;
  background: #edf2f7;
}

.option-btn.active {
  background: linear-gradient(45deg, #4299e1, #805ad5);
  color: white;
  border-color: transparent;
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-label {
  font-size: 0.875rem;
  color: #4a5568;
  font-weight: 500;
}

.sort-select {
  padding: 0.25rem 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  background: white;
}

/* Informações do gênero selecionado */
.selected-genre-info {
  background: #ebf8ff;
  border: 2px solid #bee3f8;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.selected-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2b6cb0;
  margin-bottom: 0.5rem;
}

.selected-description {
  font-size: 0.875rem;
  color: #2c5282;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.selected-stats {
  display: flex;
  gap: 1rem;
}

.book-count,
.popularity {
  font-size: 0.75rem;
  font-weight: 500;
  color: #2b6cb0;
}

/*
  === PÁGINA DIREITA - GRID DE GÊNEROS ===
*/

.visual-header {
  margin-bottom: 2rem;
  text-align: center;
}

.category-badge {
  background: #4299e1;
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

/* Container dos gêneros */
.genres-container {
  max-height: 450px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.genres-container.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.genres-container.list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Cards de gênero */
.genre-card {
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: center;
}

.genre-card:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.genre-card.selected {
  border-color: #4299e1;
  background: #ebf8ff;
}

.genre-icon {
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e2e8f0;
  border-radius: 0.5rem;
}

.genre-info {
  min-width: 0;
}

.genre-name {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

.genre-description {
  font-size: 0.75rem;
  color: #718096;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.genre-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.book-count {
  font-size: 0.75rem;
  color: #4a5568;
  font-weight: 500;
}

.popularity-indicator {
  font-size: 1rem;
}

.popularity-bar {
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}

.popularity-fill {
  height: 100%;
  background: linear-gradient(45deg, #4299e1, #805ad5);
  transition: width 0.3s ease;
}

.card-indicator {
  color: #a0aec0;
  font-size: 1.25rem;
}

/* Ações do gênero */
.genre-actions {
  margin-top: 1.5rem;
  text-align: center;
}

.explore-btn {
  background: linear-gradient(45deg, #4299e1, #805ad5);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.explore-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(66, 153, 225, 0.3);
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
  opacity: 0.3;
  animation: float 10s ease-in-out infinite;
}

.book-stack {
  top: 15%;
  right: 10%;
  animation-delay: 0s;
}
.bookmark {
  top: 40%;
  left: 90%;
  animation-delay: 2.5s;
}
.library {
  bottom: 35%;
  right: 15%;
  animation-delay: 5s;
}
.reading {
  bottom: 15%;
  left: 85%;
  animation-delay: 7.5s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-12px) rotate(3deg);
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

  .genre-card {
    grid-template-columns: auto 1fr;
    gap: 0.75rem;
  }

  .card-indicator {
    display: none;
  }

  .option-buttons {
    justify-content: center;
  }

  .total-stats {
    grid-template-columns: repeat(3, 1fr);
  }
}

.icon {
  display: inline-block;
  font-style: normal;
}
</style>
