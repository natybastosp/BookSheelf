<template>
  <div class="desk-background">
    <div class="notebook-container">
      <!-- Navegação - agora Favorites está ativo -->
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

        <NuxtLink to="/search" class="tab">
          <Icon name="search" class="tab-icon" />
          SEARCH
        </NuxtLink>

        <!-- Esta é nossa aba ativa agora -->
        <NuxtLink to="/favorites" class="tab active">
          <Icon name="heart" class="tab-icon" />
          FAVORITES
        </NuxtLink>
      </nav>

      <main class="notebook-spread">
        <!-- Página da esquerda - gestão e organização dos favoritos -->
        <section class="page left-page">
          <header class="page-header">
            <h1 class="main-title">
              ❤️ <span class="title-highlight">My Favorites</span>
            </h1>
            <p class="subtitle">Your personal collection of beloved books</p>
          </header>

          <!-- Estado vazio (quando não há favoritos) -->
          <div v-if="favoriteBooks.length === 0" class="empty-state">
            <div class="empty-icon">📚</div>
            <h3 class="empty-title">No Favorites Yet</h3>
            <p class="empty-text">
              Start building your personal library by adding books to your
              favorites. You can add books from any page by clicking the heart
              icon.
            </p>
            <div class="empty-actions">
              <NuxtLink to="/trending" class="action-link">
                Browse Trending Books
              </NuxtLink>
              <NuxtLink to="/search" class="action-link">
                Search for Books
              </NuxtLink>
            </div>
          </div>

          <!-- Controles quando há favoritos -->
          <div v-else class="favorites-controls">
            <!-- Estatísticas da coleção -->
            <div class="collection-stats">
              <h3 class="stats-title">Your Collection</h3>
              <div class="stats-grid">
                <div class="stat-card">
                  <span class="stat-number">{{ favoriteBooks.length }}</span>
                  <span class="stat-label">Favorite Books</span>
                </div>
                <div class="stat-card">
                  <span class="stat-number">{{ uniqueGenres.length }}</span>
                  <span class="stat-label">Different Genres</span>
                </div>
                <div class="stat-card">
                  <span class="stat-number">{{ averageRating }}</span>
                  <span class="stat-label">Average Rating</span>
                </div>
              </div>
            </div>

            <!-- Filtros e organização -->
            <div class="organization-tools">
              <h3 class="tools-title">Organize Your Collection</h3>

              <!-- Filtro por gênero -->
              <div class="filter-group">
                <label class="filter-label">Filter by Genre</label>
                <select v-model="selectedGenreFilter" class="filter-select">
                  <option value="">All Genres</option>
                  <option
                    v-for="genre in uniqueGenres"
                    :key="genre"
                    :value="genre"
                  >
                    {{ genre }} ({{ getGenreCount(genre) }})
                  </option>
                </select>
              </div>

              <!-- Ordenação -->
              <div class="filter-group">
                <label class="filter-label">Sort by</label>
                <select v-model="sortCriteria" class="filter-select">
                  <option value="dateAdded">Date Added</option>
                  <option value="title">Title A-Z</option>
                  <option value="author">Author A-Z</option>
                  <option value="rating">Highest Rated</option>
                  <option value="year">Publication Year</option>
                </select>
              </div>

              <!-- Modo de visualização -->
              <div class="view-mode-selector">
                <label class="filter-label">View Mode</label>
                <div class="view-buttons">
                  <button
                    @click="viewMode = 'grid'"
                    :class="['view-btn', { active: viewMode === 'grid' }]"
                  >
                    <Icon name="grid" /> Grid
                  </button>
                  <button
                    @click="viewMode = 'list'"
                    :class="['view-btn', { active: viewMode === 'list' }]"
                  >
                    <Icon name="list" /> List
                  </button>
                </div>
              </div>
            </div>

            <!-- Ações em lote -->
            <div class="bulk-actions">
              <h3 class="bulk-title">Collection Actions</h3>
              <div class="bulk-buttons">
                <button @click="exportFavorites" class="bulk-btn export">
                  <Icon name="download" /> Export List
                </button>
                <button @click="clearAllFavorites" class="bulk-btn clear">
                  <Icon name="trash" /> Clear All
                </button>
              </div>
            </div>

            <!-- Recomendações baseadas nos favoritos -->
            <div class="recommendations">
              <h3 class="rec-title">Recommended for You</h3>
              <p class="rec-text">
                Based on your favorites, you might enjoy books in
                <strong>{{ topGenre }}</strong> and authors similar to
                <strong>{{ favoriteAuthor }}</strong
                >.
              </p>
              <NuxtLink to="/search" class="rec-link">
                Discover Similar Books
              </NuxtLink>
            </div>
          </div>
        </section>

        <!-- Página da direita - grid/lista dos livros favoritos -->
        <section class="page right-page">
          <div class="visual-header">
            <div v-if="favoriteBooks.length > 0" class="collection-badge">
              📖 {{ filteredFavorites.length }}
              {{ filteredFavorites.length === 1 ? "Book" : "Books" }}
            </div>
            <h2 class="visual-title">
              {{
                favoriteBooks.length === 0
                  ? "Start Your Collection"
                  : "Your Library"
              }}
            </h2>
          </div>

          <!-- Grid/Lista de favoritos -->
          <div
            v-if="favoriteBooks.length > 0"
            :class="['favorites-container', viewMode]"
          >
            <!-- 
              Cada livro favorito é um card mais detalhado do que nas outras páginas
              porque aqui é a coleção pessoal do usuário
            -->
            <div
              v-for="book in filteredFavorites"
              :key="book.id"
              class="favorite-item"
              :class="{ 'recently-added': isRecentlyAdded(book) }"
            >
              <!-- Badge de novo favorito -->
              <div v-if="isRecentlyAdded(book)" class="new-badge">New!</div>

              <!-- Capa do livro com overlay de ações -->
              <div class="book-cover-wrapper">
                <div class="book-cover">
                  <Icon name="book" class="cover-icon" />
                </div>
                <div class="cover-overlay">
                  <button @click="viewBookDetails(book)" class="overlay-btn">
                    <Icon name="eye" />
                  </button>
                  <button
                    @click="removeFromFavorites(book)"
                    class="overlay-btn remove"
                  >
                    <Icon name="heart-filled" />
                  </button>
                </div>
              </div>

              <!-- Informações detalhadas do livro -->
              <div class="book-details">
                <h4 class="book-title">{{ book.title }}</h4>
                <p class="book-author">by {{ book.author }}</p>

                <!-- Metadados enriquecidos -->
                <div class="book-metadata">
                  <span class="genre-badge">{{ book.genre }}</span>
                  <span class="year-badge">{{ book.year }}</span>
                  <span class="rating-display"> ⭐ {{ book.rating }}/5 </span>
                </div>

                <!-- Data de adição aos favoritos -->
                <div class="favorite-info">
                  <span class="added-date">
                    Added {{ formatDate(book.dateAdded) }}
                  </span>
                </div>

                <!-- Progresso de leitura (simulado) -->
                <div class="reading-progress">
                  <div class="progress-label">
                    Reading Progress: {{ book.readingProgress || 0 }}%
                  </div>
                  <div class="progress-bar">
                    <div
                      class="progress-fill"
                      :style="{ width: (book.readingProgress || 0) + '%' }"
                    ></div>
                  </div>
                </div>

                <!-- Notas pessoais -->
                <div v-if="book.personalNote" class="personal-note">
                  <Icon name="note" />
                  <span class="note-text">{{ book.personalNote }}</span>
                </div>

                <!-- Tags personalizadas -->
                <div
                  v-if="book.personalTags && book.personalTags.length > 0"
                  class="personal-tags"
                >
                  <span
                    v-for="tag in book.personalTags"
                    :key="tag"
                    class="personal-tag"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <!-- Ações específicas do favorito -->
              <div class="favorite-actions">
                <button @click="editBookNotes(book)" class="action-btn edit">
                  <Icon name="edit" /> Notes
                </button>
                <button @click="shareBook(book)" class="action-btn share">
                  <Icon name="share" /> Share
                </button>
              </div>
            </div>
          </div>

          <!-- Elementos decorativos temáticos para favoritos -->
          <div class="decorative-elements">
            <div class="decoration heart-1">💖</div>
            <div class="decoration star-fav">⭐</div>
            <div class="decoration book-love">📚</div>
            <div class="decoration bookmark-fav">🔖</div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// Meta tags
useHead({
  title: "My Favorites - Book Scrapbook",
  meta: [
    {
      name: "description",
      content:
        "Manage your personal collection of favorite books. Organize, track reading progress, and discover new recommendations.",
    },
  ],
});

//
// === ESTADO REATIVO ===
//

// Controles de visualização e filtros
const selectedGenreFilter = ref("");
const sortCriteria = ref("dateAdded");
const viewMode = ref("grid");

// Dados de livros favoritos (simulando dados persistentes)
// Em um projeto real, estes dados viriam de localStorage, API, ou banco de dados
const favoriteBooks = ref([
  {
    id: 1,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    genre: "Fiction",
    year: 2017,
    rating: 4.8,
    dateAdded: new Date("2024-01-15"),
    readingProgress: 75,
    personalNote:
      "Absolutely captivating storytelling. The plot twists kept me hooked!",
    personalTags: ["page-turner", "emotional", "hollywood"],
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    year: 2018,
    rating: 4.7,
    dateAdded: new Date("2024-01-20"),
    readingProgress: 100,
    personalNote:
      "Life-changing book about building good habits. Practical and actionable.",
    personalTags: ["productivity", "life-changing", "practical"],
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Science Fiction",
    year: 2021,
    rating: 4.9,
    dateAdded: new Date("2024-02-01"),
    readingProgress: 45,
    personalNote: "Amazing blend of science and humor. Andy Weir is brilliant!",
    personalTags: ["space", "humor", "science"],
  },
  {
    id: 4,
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction",
    year: 2020,
    rating: 4.5,
    dateAdded: new Date("2024-02-10"),
    readingProgress: 0,
    personalNote: "Heard great things about this one. Can't wait to start!",
    personalTags: ["philosophical", "to-read"],
  },
]);

//
// === COMPUTED PROPERTIES ===
//

// Gêneros únicos dos favoritos
const uniqueGenres = computed(() => {
  const genres = [...new Set(favoriteBooks.value.map((book) => book.genre))];
  return genres.sort();
});

// Favoritos filtrados
const filteredFavorites = computed(() => {
  let filtered = [...favoriteBooks.value];

  // Aplicar filtro por gênero
  if (selectedGenreFilter.value) {
    filtered = filtered.filter(
      (book) => book.genre === selectedGenreFilter.value
    );
  }

  // Aplicar ordenação
  filtered.sort((a, b) => {
    switch (sortCriteria.value) {
      case "title":
        return a.title.localeCompare(b.title);
      case "author":
        return a.author.localeCompare(b.author);
      case "rating":
        return b.rating - a.rating;
      case "year":
        return b.year - a.year;
      case "dateAdded":
      default:
        return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
  });

  return filtered;
});

// Rating médio da coleção
const averageRating = computed(() => {
  if (favoriteBooks.value.length === 0) return "0.0";
  const total = favoriteBooks.value.reduce((sum, book) => sum + book.rating, 0);
  return (total / favoriteBooks.value.length).toFixed(1);
});

// Gênero mais comum
const topGenre = computed(() => {
  if (favoriteBooks.value.length === 0) return "None";

  const genreCounts = favoriteBooks.value.reduce((counts, book) => {
    counts[book.genre] = (counts[book.genre] || 0) + 1;
    return counts;
  }, {});

  return Object.keys(genreCounts).reduce((a, b) =>
    genreCounts[a] > genreCounts[b] ? a : b
  );
});

// Autor favorito (que aparece mais vezes)
const favoriteAuthor = computed(() => {
  if (favoriteBooks.value.length === 0) return "None";

  const authorCounts = favoriteBooks.value.reduce((counts, book) => {
    counts[book.author] = (counts[book.author] || 0) + 1;
    return counts;
  }, {});

  const topAuthor = Object.keys(authorCounts).reduce((a, b) =>
    authorCounts[a] > authorCounts[b] ? a : b
  );

  return topAuthor;
});

//
// === MÉTODOS ===
//

// Contar livros por gênero
const getGenreCount = (genre) => {
  return favoriteBooks.value.filter((book) => book.genre === genre).length;
};

// Verificar se foi adicionado recentemente (últimos 7 dias)
const isRecentlyAdded = (book) => {
  const daysDifference =
    (new Date() - new Date(book.dateAdded)) / (1000 * 60 * 60 * 24);
  return daysDifference <= 7;
};

// Formatar data de adição
const formatDate = (date) => {
  const now = new Date();
  const addedDate = new Date(date);
  const daysDifference = Math.floor((now - addedDate) / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) return "today";
  if (daysDifference === 1) return "yesterday";
  if (daysDifference < 7) return `${daysDifference} days ago`;
  if (daysDifference < 30) return `${Math.floor(daysDifference / 7)} weeks ago`;

  return addedDate.toLocaleDateString();
};

// Remover dos favoritos
const removeFromFavorites = (book) => {
  const index = favoriteBooks.value.findIndex((fav) => fav.id === book.id);
  if (index > -1) {
    favoriteBooks.value.splice(index, 1);
  }
};

// Limpar todos os favoritos
const clearAllFavorites = () => {
  if (
    confirm("Are you sure you want to remove all books from your favorites?")
  ) {
    favoriteBooks.value = [];
  }
};

// Exportar lista de favoritos
const exportFavorites = () => {
  const exportData = favoriteBooks.value.map((book) => ({
    title: book.title,
    author: book.author,
    genre: book.genre,
    year: book.year,
    rating: book.rating,
    notes: book.personalNote,
  }));

  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(dataBlob);
  link.download = "my-favorite-books.json";
  link.click();
};

// Ações dos livros (placeholders para funcionalidade futura)
const viewBookDetails = (book) => {
  console.log("Viewing details for:", book.title);
  // Futura implementação: navigateTo(`/book/${book.id}`)
};

const editBookNotes = (book) => {
  // Placeholder para modal de edição de notas
  const newNote = prompt(
    "Edit your note for this book:",
    book.personalNote || ""
  );
  if (newNote !== null) {
    book.personalNote = newNote;
  }
};

const shareBook = (book) => {
  console.log("Sharing book:", book.title);
  // Futura implementação: integração com APIs de compartilhamento social
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
        heart: "🤍",
        "heart-filled": "❤️",
        grid: "▦",
        list: "☰",
        download: "⬇️",
        trash: "🗑️",
        eye: "👁️",
        edit: "✏️",
        share: "🔗",
        note: "📝",
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
      rgba(236, 72, 153, 0.05) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(239, 68, 68, 0.05) 0%,
      transparent 50%
    );
}

.right-page {
  background: radial-gradient(
      circle at 20% 20%,
      rgba(251, 113, 133, 0.05) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(244, 114, 182, 0.05) 0%,
      transparent 50%
    );
}

/*
  === ESTILOS ESPECÍFICOS DA PÁGINA FAVORITES ===
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
  background: linear-gradient(45deg, #ec4899, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.25rem;
  color: #718096;
  font-weight: 400;
}

/* Estado vazio */
.empty-state {
  text-align: center;
  padding: 2rem 1rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.7;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
}

.empty-text {
  color: #718096;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.empty-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-link {
  background: linear-gradient(45deg, #ec4899, #ef4444);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.action-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(236, 72, 153, 0.3);
}

/* Controles dos favoritos */
.favorites-controls {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Estatísticas da coleção */
.collection-stats {
  background: #fff5f5;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 2px solid #fed7d7;
}

.stats-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #c53030;
  margin-bottom: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.stat-card {
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  border-left: 4px solid #ec4899;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ec4899;
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  color: #718096;
}

/* Ferramentas de organização */
.organization-tools {
  background: #f7fafc;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
}

.tools-title {
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

.view-mode-selector {
  margin-bottom: 1rem;
}

.view-buttons {
  display: flex;
  gap: 0.5rem;
}

.view-btn {
  padding: 0.5rem 1rem;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.view-btn:hover {
  background: #edf2f7;
}

.view-btn.active {
  background: linear-gradient(45deg, #ec4899, #ef4444);
  color: white;
  border-color: transparent;
}

/* Ações em lote */
.bulk-actions {
  background: #fffbeb;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #fed7aa;
}

.bulk-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #92400e;
  margin-bottom: 1rem;
}

.bulk-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.bulk-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.bulk-btn.export {
  background: #ddd6fe;
  color: #5b21b6;
}

.bulk-btn.export:hover {
  background: #c4b5fd;
}

.bulk-btn.clear {
  background: #fecaca;
  color: #dc2626;
}

.bulk-btn.clear:hover {
  background: #fca5a5;
}

/* Recomendações */
.recommendations {
  background: #ecfdf5;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #bbf7d0;
}

.rec-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #065f46;
  margin-bottom: 1rem;
}

.rec-text {
  color: #047857;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.rec-link {
  color: #059669;
  text-decoration: underline;
  font-weight: 500;
}

.rec-link:hover {
  color: #047857;
}

/*
  === PÁGINA DIREITA - COLEÇÃO DE FAVORITOS ===
*/

.visual-header {
  margin-bottom: 2rem;
  text-align: center;
}

.collection-badge {
  background: #ec4899;
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

/* Container dos favoritos */
.favorites-container {
  max-height: 450px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.favorites-container.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.favorites-container.list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Items de favoritos */
.favorite-item {
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  position: relative;
  transition: all 0.3s ease;
}

.favorite-item:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.favorite-item.recently-added {
  border-color: #fbbf24;
  background: linear-gradient(135deg, #fffbeb 0%, #f7fafc 100%);
}

.new-badge {
  position: absolute;
  top: -0.5rem;
  right: 1rem;
  background: #fbbf24;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Capa do livro com overlay */
.book-cover-wrapper {
  position: relative;
  width: 60px;
  height: 90px;
  margin: 0 auto 1rem;
}

.book-cover {
  width: 100%;
  height: 100%;
  background: #e2e8f0;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-icon {
  font-size: 1.5rem;
  color: #a0aec0;
}

.cover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.book-cover-wrapper:hover .cover-overlay {
  opacity: 1;
}

.overlay-btn {
  background: white;
  border: none;
  color: #4a5568;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.overlay-btn.remove {
  background: #fed7d7;
  color: #e53e3e;
}

.overlay-btn:hover {
  transform: scale(1.1);
}

/* Detalhes do livro */
.book-details {
  text-align: center;
}

.book-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.book-author {
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 0.75rem;
}

.book-metadata {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.genre-badge,
.year-badge {
  background: #e2e8f0;
  color: #4a5568;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.625rem;
  font-weight: 500;
}

.rating-display {
  font-size: 0.75rem;
  color: #d69e2e;
}

.favorite-info {
  margin-bottom: 0.75rem;
}

.added-date {
  font-size: 0.75rem;
  color: #a0aec0;
  font-style: italic;
}

/* Progresso de leitura */
.reading-progress {
  margin-bottom: 0.75rem;
}

.progress-label {
  font-size: 0.75rem;
  color: #4a5568;
  margin-bottom: 0.25rem;
}

.progress-bar {
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(45deg, #ec4899, #ef4444);
  transition: width 0.3s ease;
}

/* Notas pessoais */
.personal-note {
  background: #fff5f5;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
  color: #744210;
  line-height: 1.4;
  border-left: 3px solid #ec4899;
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

.note-text {
  flex: 1;
  font-style: italic;
}

/* Tags personalizadas */
.personal-tags {
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.personal-tag {
  background: #ddd6fe;
  color: #5b21b6;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.625rem;
  font-weight: 500;
}

/* Ações dos favoritos */
.favorite-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.action-btn {
  padding: 0.375rem 0.75rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.action-btn.edit {
  background: #ddd6fe;
  color: #5b21b6;
}

.action-btn.edit:hover {
  background: #c4b5fd;
}

.action-btn.share {
  background: #bfdbfe;
  color: #1e40af;
}

.action-btn.share:hover {
  background: #93c5fd;
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
  animation: float 14s ease-in-out infinite;
}

.heart-1 {
  top: 10%;
  right: 10%;
  animation-delay: 0s;
}
.star-fav {
  top: 35%;
  left: 85%;
  animation-delay: 3.5s;
}
.book-love {
  bottom: 40%;
  right: 15%;
  animation-delay: 7s;
}
.bookmark-fav {
  bottom: 15%;
  left: 90%;
  animation-delay: 10.5s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-8px) rotate(2deg) scale(1.05);
  }
  50% {
    transform: translateY(-15px) rotate(-2deg) scale(1);
  }
  75% {
    transform: translateY(-8px) rotate(1deg) scale(0.95);
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

  .favorites-controls {
    gap: 1rem;
  }

  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .bulk-buttons {
    justify-content: center;
  }

  .view-buttons {
    justify-content: center;
  }

  .book-metadata {
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }
}

.icon {
  display: inline-block;
  font-style: normal;
}
</style>
