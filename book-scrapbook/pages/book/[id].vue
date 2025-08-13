<template>
  <!-- 
    📖 PÁGINA DE DETALHES DO LIVRO
    Esta é nossa primeira rota dinâmica - [id].vue
    
    Conceitos avançados implementados:
    - Rotas dinâmicas com useRoute()
    - Estados de loading e erro
    - Componentes com tabs
    - Interações complexas
    - Integração com todas as outras páginas
  -->

  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
  >
    <!-- 
      LOADING STATE - Agora usa o estado global do composable
      Muito mais consistente em toda a aplicação
    -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div
          class="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
        ></div>
        <p class="text-lg text-gray-600">Loading book details...</p>
      </div>
    </div>

    <!-- 
      ERROR STATE - Melhorado com mais informações
    -->
    <div
      v-else-if="error || !book"
      class="flex items-center justify-center min-h-screen"
    >
      <div class="text-center max-w-md mx-auto p-8">
        <div class="text-6xl mb-4">📚</div>
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Book Not Found</h1>
        <p class="text-gray-600 mb-6">
          The book with ID "{{ bookId }}" doesn't exist in our database.
        </p>
        <div class="flex gap-4 justify-center">
          <NuxtLink
            to="/"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <Icon name="home" />
            Back to Home
          </NuxtLink>
          <NuxtLink
            to="/search"
            class="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors inline-flex items-center gap-2"
          >
            <Icon name="search" />
            Search Books
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 
      MAIN CONTENT - A página propriamente dita
      Layout moderno e responsivo com Tailwind
    -->
    <div v-else class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- 
        BREADCRUMB NAVIGATION
        Ajuda o usuário entender onde está na navegação
      -->
      <nav class="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <NuxtLink to="/" class="hover:text-blue-600 transition-colors"
          >Home</NuxtLink
        >
        <Icon name="chevron-right" class="text-gray-400" />
        <NuxtLink to="/search" class="hover:text-blue-600 transition-colors"
          >Books</NuxtLink
        >
        <Icon name="chevron-right" class="text-gray-400" />
        <span class="text-gray-800 font-medium">{{ book.title }}</span>
      </nav>

      <!-- 
        HERO SECTION - Informações principais do livro
        Layout responsivo: mobile = coluna, desktop = lado a lado
      -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <!-- CAPA DO LIVRO E AÇÕES RÁPIDAS -->
        <div class="lg:col-span-1">
          <!-- Capa do livro com efeitos visuais -->
          <div class="sticky top-8">
            <div class="bg-white rounded-2xl shadow-xl p-6 text-center">
              <!-- Capa principal -->
              <div class="w-48 h-72 mx-auto mb-6 relative group">
                <div
                  class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shadow-lg flex items-center justify-center group-hover:shadow-2xl transition-all duration-300"
                >
                  <Icon name="book" class="text-4xl text-gray-500" />
                </div>
                <!-- Badge de gênero -->
                <div
                  class="absolute -top-2 -right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium"
                >
                  {{ book.genre }}
                </div>
              </div>

              <!-- Ações principais -->
              <div class="space-y-3">
                <!-- Botão principal - Adicionar aos Favoritos -->
                <button
                  @click="toggleFavorite"
                  :class="[
                    'w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300',
                    book.isFavorite
                      ? 'bg-red-100 text-red-700 border-2 border-red-300 hover:bg-red-200'
                      : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg',
                  ]"
                >
                  <Icon
                    :name="book.isFavorite ? 'heart-filled' : 'heart'"
                    class="mr-2"
                  />
                  {{
                    book.isFavorite
                      ? "Remove from Favorites"
                      : "Add to Favorites"
                  }}
                </button>

                <!-- Lista de leitura -->
                <button
                  @click="toggleReadingList"
                  :class="[
                    'w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300',
                    book.inReadingList
                      ? 'bg-green-100 text-green-700 border-2 border-green-300 hover:bg-green-200'
                      : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg',
                  ]"
                >
                  <Icon
                    :name="book.inReadingList ? 'check' : 'plus'"
                    class="mr-2"
                  />
                  {{
                    book.inReadingList
                      ? "In Reading List"
                      : "Add to Reading List"
                  }}
                </button>

                <!-- Ações secundárias -->
                <div class="flex gap-2">
                  <button
                    @click="shareBook"
                    class="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    <Icon name="share" class="mr-1" />
                    Share
                  </button>
                  <button
                    @click="openNotes"
                    class="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    <Icon name="note" class="mr-1" />
                    Notes
                  </button>
                </div>
              </div>

              <!-- Progresso de leitura -->
              <div class="mt-6 pt-6 border-t border-gray-200">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-gray-700"
                    >Reading Progress</span
                  >
                  <span class="text-sm text-gray-600"
                    >{{ book.readingProgress || 0 }}%</span
                  >
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    :style="{ width: (book.readingProgress || 0) + '%' }"
                  ></div>
                </div>
                <button
                  @click="updateProgress"
                  class="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Update Progress
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- INFORMAÇÕES DETALHADAS DO LIVRO -->
        <div class="lg:col-span-2">
          <!-- Título e informações básicas -->
          <div class="mb-8">
            <h1
              class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight"
            >
              {{ book.title }}
            </h1>
            <p class="text-xl text-gray-600 mb-4">
              by
              <span class="font-semibold text-gray-800">{{ book.author }}</span>
            </p>

            <!-- Rating e metadados -->
            <div class="flex flex-wrap items-center gap-4 mb-6">
              <!-- Rating com estrelas -->
              <div class="flex items-center gap-2">
                <div class="flex">
                  <span
                    v-for="star in 5"
                    :key="star"
                    :class="[
                      'text-lg',
                      star <= Math.floor(book.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300',
                    ]"
                  >
                    ⭐
                  </span>
                </div>
                <span class="font-semibold text-gray-800"
                  >{{ book.rating }}/5</span
                >
                <span class="text-sm text-gray-600"
                  >({{ book.reviewCount || 0 }} reviews)</span
                >
              </div>

              <!-- Outras informações -->
              <span
                class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {{ book.year }}
              </span>
              <span
                class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
              >
                {{ book.pages || "Unknown" }} pages
              </span>
              <span
                class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
              >
                {{ book.language || "English" }}
              </span>
            </div>

            <!-- Status indicators -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-if="book.trending"
                class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
              >
                🔥 Trending
              </span>
              <span
                v-if="book.newRelease"
                class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
              >
                ✨ New Release
              </span>
              <span
                v-if="book.awardWinner"
                class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
              >
                🏆 Award Winner
              </span>
            </div>
          </div>

          <!-- 
            SISTEMA DE TABS
            Organiza o conteúdo em seções navegáveis
          -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <!-- Tab Headers -->
            <div class="flex border-b border-gray-200 bg-gray-50">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'flex-1 px-6 py-4 font-semibold transition-all duration-200',
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100',
                ]"
              >
                <Icon :name="tab.icon" class="mr-2" />
                {{ tab.label }}
              </button>
            </div>

            <!-- Tab Content -->
            <div class="p-6 lg:p-8">
              <!-- TAB: OVERVIEW -->
              <div v-if="activeTab === 'overview'">
                <!-- Sinopse -->
                <div class="mb-8">
                  <h3 class="text-2xl font-bold text-gray-900 mb-4">
                    Synopsis
                  </h3>
                  <div
                    class="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  >
                    <p>{{ book.description }}</p>

                    <!-- Tags/Keywords -->
                    <div class="mt-6">
                      <h4 class="text-lg font-semibold text-gray-900 mb-3">
                        Keywords
                      </h4>
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="tag in book.tags"
                          :key="tag"
                          class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {{ tag }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Informações do autor -->
                <div class="border-t border-gray-200 pt-8">
                  <h3 class="text-2xl font-bold text-gray-900 mb-4">
                    About the Author
                  </h3>
                  <div class="flex gap-4">
                    <div
                      class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <Icon name="user" class="text-2xl text-gray-500" />
                    </div>
                    <div>
                      <h4 class="text-lg font-semibold text-gray-900">
                        {{ book.author }}
                      </h4>
                      <p class="text-gray-600 mt-2">
                        {{ book.authorBio || "No biography available." }}
                      </p>
                      <button
                        class="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View more books by this author →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- TAB: REVIEWS -->
              <div v-if="activeTab === 'reviews'">
                <div class="flex justify-between items-center mb-6">
                  <h3 class="text-2xl font-bold text-gray-900">
                    Reader Reviews
                  </h3>
                  <button
                    @click="openReviewModal"
                    class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Write a Review
                  </button>
                </div>

                <!-- Review Statistics -->
                <div class="bg-gray-50 rounded-lg p-6 mb-6">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="text-center">
                      <div class="text-3xl font-bold text-gray-900">
                        {{ book.rating }}
                      </div>
                      <div class="text-sm text-gray-600">Average Rating</div>
                    </div>
                    <div class="text-center">
                      <div class="text-3xl font-bold text-gray-900">
                        {{ book.reviewCount || 0 }}
                      </div>
                      <div class="text-sm text-gray-600">Total Reviews</div>
                    </div>
                    <div class="text-center">
                      <div class="text-3xl font-bold text-gray-900">95%</div>
                      <div class="text-sm text-gray-600">Recommend</div>
                    </div>
                  </div>
                </div>

                <!-- Sample Reviews -->
                <div class="space-y-6">
                  <div
                    v-for="review in sampleReviews"
                    :key="review.id"
                    class="border border-gray-200 rounded-lg p-6"
                  >
                    <div class="flex justify-between items-start mb-3">
                      <div>
                        <h4 class="font-semibold text-gray-900">
                          {{ review.author }}
                        </h4>
                        <div class="flex items-center gap-2 mt-1">
                          <div class="flex">
                            <span
                              v-for="star in 5"
                              :key="star"
                              :class="[
                                'text-sm',
                                star <= review.rating
                                  ? 'text-yellow-400'
                                  : 'text-gray-300',
                              ]"
                            >
                              ⭐
                            </span>
                          </div>
                          <span class="text-sm text-gray-600">{{
                            review.date
                          }}</span>
                        </div>
                      </div>
                      <button class="text-gray-400 hover:text-gray-600">
                        <Icon name="more" />
                      </button>
                    </div>
                    <p class="text-gray-700 leading-relaxed">
                      {{ review.content }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- TAB: SIMILAR BOOKS -->
              <div v-if="activeTab === 'similar'">
                <h3 class="text-2xl font-bold text-gray-900 mb-6">
                  Books You Might Like
                </h3>
                <div
                  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <div
                    v-for="similarBook in similarBooks"
                    :key="similarBook.id"
                    class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                    @click="navigateToBook(similarBook.id)"
                  >
                    <div
                      class="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center"
                    >
                      <Icon name="book" class="text-2xl text-gray-400" />
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-1">
                      {{ similarBook.title }}
                    </h4>
                    <p class="text-sm text-gray-600 mb-2">
                      {{ similarBook.author }}
                    </p>
                    <div class="flex items-center justify-between">
                      <span class="text-sm font-medium text-yellow-600"
                        >★ {{ similarBook.rating }}</span
                      >
                      <span class="text-xs text-gray-500">{{
                        similarBook.genre
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 
        SEÇÃO DE AÇÕES ADICIONAIS
        Funcionalidades extras na parte inferior
      -->
      <div class="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">More Actions</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Criar lista de leitura customizada -->
          <div
            class="text-center p-6 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
          >
            <Icon name="list" class="text-3xl text-blue-600 mb-3" />
            <h4 class="font-semibold text-gray-900 mb-2">Add to Custom List</h4>
            <p class="text-sm text-gray-600 mb-4">
              Create or add to your reading lists
            </p>
            <button
              class="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Manage Lists →
            </button>
          </div>

          <!-- Encontrar livros similares -->
          <div
            class="text-center p-6 border border-gray-200 rounded-lg hover:border-green-300 transition-colors"
          >
            <Icon name="compass" class="text-3xl text-green-600 mb-3" />
            <h4 class="font-semibold text-gray-900 mb-2">Find Similar Books</h4>
            <p class="text-sm text-gray-600 mb-4">
              Discover books with similar themes
            </p>
            <button
              class="text-green-600 hover:text-green-800 font-medium text-sm"
            >
              Explore Now →
            </button>
          </div>

          <!-- Recomendar para amigos -->
          <div
            class="text-center p-6 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
          >
            <Icon name="users" class="text-3xl text-purple-600 mb-3" />
            <h4 class="font-semibold text-gray-900 mb-2">
              Recommend to Friends
            </h4>
            <p class="text-sm text-gray-600 mb-4">
              Share this book with your network
            </p>
            <button
              class="text-purple-600 hover:text-purple-800 font-medium text-sm"
            >
              Share Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

//
// === INTEGRAÇÃO COM NOSSO SISTEMA CENTRALIZADO ===
// Agora usamos o composable em vez de dados isolados
//
import { useBooks } from "~/composables/useBooks";

// Inicializar o sistema de livros
const {
  getBookById,
  getSimilarBooks,
  toggleFavorite: toggleBookFavorite,
  toggleReadingList: toggleBookReadingList,
  updateReadingProgress,
  rateBook,
  addPersonalNote,
  simulateLoading,
  isLoading,
} = useBooks();

// Capturar ID da rota
const route = useRoute();
const bookId = computed(() => parseInt(route.params.id));

//
// === ESTADOS REATIVOS ===
//
const error = ref(false);
const activeTab = ref("overview");

// O livro agora vem diretamente do sistema centralizado!
const book = computed(() => getBookById(bookId.value));

// Livros similares também vêm do sistema
const similarBooks = computed(() => getSimilarBooks(bookId.value));

// Configuração das tabs
const tabs = [
  { id: "overview", label: "Overview", icon: "info" },
  { id: "reviews", label: "Reviews", icon: "star" },
  { id: "similar", label: "Similar Books", icon: "books" },
];

// Reviews de exemplo (em produção viria da API)
const sampleReviews = ref([
  {
    id: 1,
    author: "BookLover123",
    rating: 5,
    date: "2 days ago",
    content:
      "Absolutely incredible book! I couldn't put it down. The character development is outstanding and the plot twists kept me guessing until the very end.",
  },
  {
    id: 2,
    author: "ReadingAddict",
    rating: 4,
    date: "1 week ago",
    content:
      "Really enjoyed this one. The writing style is engaging and the story is compelling. Would definitely recommend to anyone who enjoys this genre.",
  },
  {
    id: 3,
    author: "CriticalReader",
    rating: 5,
    date: "2 weeks ago",
    content:
      "One of the best books I've read this year. The author has a unique voice and the themes explored are both relevant and thought-provoking.",
  },
]);

//
// === MÉTODOS INTEGRADOS ===
//

// Carregar dados do livro
const loadBookData = async () => {
  await simulateLoading(800);

  if (!book.value) {
    error.value = true;
  }
};

// Agora usamos as funções do composable!
const toggleFavorite = () => {
  toggleBookFavorite(bookId.value);
};

const toggleReadingList = () => {
  toggleBookReadingList(bookId.value);
};

const updateProgress = () => {
  const currentProgress = book.value?.readingProgress || 0;
  const newProgress = prompt(
    "Enter reading progress (0-100%):",
    currentProgress
  );

  if (newProgress !== null) {
    const progress = Math.min(100, Math.max(0, parseInt(newProgress) || 0));
    updateReadingProgress(bookId.value, progress);
  }
};

// Funcionalidades avançadas
const shareBook = () => {
  if (!book.value) return;

  // Simular compartilhamento (em produção seria integração real)
  const shareData = {
    title: book.value.title,
    text: `Check out "${book.value.title}" by ${book.value.author}`,
    url: window.location.href,
  };

  if (navigator.share) {
    navigator.share(shareData);
  } else {
    // Fallback para copiar URL
    navigator.clipboard.writeText(window.location.href);
    alert("Book URL copied to clipboard!");
  }
};

const openNotes = () => {
  if (!book.value) return;

  const currentNote = book.value.personalNotes || "";
  const newNote = prompt(
    "Add your personal note about this book:",
    currentNote
  );

  if (newNote !== null) {
    addPersonalNote(bookId.value, newNote);
  }
};

const openReviewModal = () => {
  if (!book.value) return;

  // Simular modal de review (em produção seria um modal real)
  const rating = prompt(
    "Rate this book (1-5 stars):",
    book.value.userRating || ""
  );

  if (rating !== null) {
    const numRating = Math.min(5, Math.max(1, parseInt(rating) || 1));
    const review = prompt("Write a review (optional):") || "";

    rateBook(bookId.value, numRating, review);
  }
};

const navigateToBook = (id) => {
  navigateTo(`/book/${id}`);
};

// Meta tags dinâmicas - agora muito mais robustas
useHead(() => ({
  title: book.value?.title
    ? `${book.value.title} by ${book.value.author} - Book Scrapbook`
    : "Loading Book - Book Scrapbook",
  meta: [
    {
      name: "description",
      content: book.value?.description || "Book details and reviews",
    },
    {
      property: "og:title",
      content: book.value?.title || "Book Details",
    },
    {
      property: "og:description",
      content: book.value?.description || "Book details and reviews",
    },
    {
      name: "keywords",
      content: book.value?.tags?.join(", ") || "books, reading, reviews",
    },
  ],
}));

// Lifecycle hooks
onMounted(() => {
  loadBookData();
});

// Watch para mudanças de rota
watch(
  () => route.params.id,
  () => {
    error.value = false;
    loadBookData();
  }
);

// Componente Icon
const Icon = defineComponent({
  props: ["name"],
  template: `
    <span class="inline-block" :data-icon="name">
      {{ getIconSymbol(name) }}
    </span>
  `,
  setup(props) {
    const getIconSymbol = (name) => {
      const icons = {
        home: "🏠",
        "chevron-right": "›",
        book: "📚",
        heart: "🤍",
        "heart-filled": "❤️",
        plus: "➕",
        check: "✅",
        share: "🔗",
        note: "📝",
        info: "ℹ️",
        star: "⭐",
        books: "📚",
        user: "👤",
        more: "⋯",
        list: "📋",
        compass: "🧭",
        users: "👥",
      };
      return icons[name] || "📄";
    };

    return { getIconSymbol };
  },
});
</script>

<style scoped>
/* 
  Mínimo CSS customizado - a maior parte é feita com Tailwind!
  Apenas algumas animações e ajustes específicos
*/

/* Animação personalizada para loading */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Transição suave para mudanças de progresso */
.transition-all {
  transition: all 0.3s ease;
}

/* Efeito hover sutil para cards */
.hover-lift:hover {
  transform: translateY(-2px);
}
</style>
