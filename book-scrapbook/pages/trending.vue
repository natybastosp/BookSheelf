<!-- pages/trending.vue -->
<template>
  <div class="h-full flex flex-col">
    <!-- Page Header with Period Information -->
    <div class="mb-6">
      <h1
        class="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3"
      >
        <span class="text-4xl">🔥</span>
        Trending Books
      </h1>
      <p class="text-slate-600">
        Most popular books this {{ currentPeriod.toLowerCase() }} • Updated
        daily
      </p>
    </div>

    <!-- Period Filter Pills (Visual feedback) -->
    <div class="mb-6">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="period in periodOptions"
          :key="period"
          class="px-3 py-1 rounded-full text-sm font-medium transition-all duration-200"
          :class="
            period === currentPeriod
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          "
          @click="currentPeriod = period"
        >
          {{ period }}
        </button>
      </div>
    </div>

    <!-- Trending Books List -->
    <div class="flex-1 space-y-4 overflow-y-auto">
      <div
        v-for="(book, index) in trendingBooks"
        :key="book.id"
        class="bg-white rounded-lg border-2 border-slate-200 p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 group cursor-pointer"
        @click="navigateToBook(book.id)"
      >
        <!-- Book ranking and info -->
        <div class="flex items-start gap-4">
          <!-- Ranking Badge -->
          <div class="flex-shrink-0">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
              :class="getRankingColor(index + 1)"
            >
              {{ index + 1 }}
            </div>
          </div>

          <!-- Book Details -->
          <div class="flex-1 min-w-0">
            <h3
              class="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors"
            >
              {{ book.title }}
            </h3>
            <p class="text-slate-600 text-sm mb-2">by {{ book.author }}</p>

            <!-- Genre and Rating -->
            <div class="flex items-center gap-3 text-sm">
              <span class="px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                {{ book.genre }}
              </span>
              <div class="flex items-center gap-1">
                <span class="text-yellow-500">⭐</span>
                <span class="text-slate-600">{{ book.rating }}/5</span>
              </div>
            </div>
          </div>

          <!-- Trend Indicator -->
          <div class="flex-shrink-0 text-right">
            <div class="text-sm font-medium" :class="getTrendColor(book.trend)">
              {{ formatTrend(book.trend) }}
            </div>
            <div class="text-xs text-slate-500 mt-1">
              {{ book.readers }} readers
            </div>
          </div>
        </div>

        <!-- Book Description (Preview) -->
        <div class="mt-3 pt-3 border-t border-slate-100">
          <p class="text-sm text-slate-600 line-clamp-2">
            {{ book.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="absolute top-0 right-0 text-6xl opacity-10 -rotate-12">📈</div>
  </div>
</template>

<script setup>
// Page metadata for SEO
useHead({
  title: "Trending Books - Book Scrapbook",
  meta: [
    {
      name: "description",
      content: "Discover the most popular books trending this week",
    },
  ],
});

// Current time period selection
const currentPeriod = ref("WEEKLY");

// Available period options
const periodOptions = ref(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]);

// Mock data for trending books
// In a real application, this would be fetched from an API based on the selected period
const trendingBooks = ref([
  {
    id: 1,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    genre: "Historical Fiction",
    rating: 4.8,
    trend: +15,
    readers: "12.5k",
    description:
      "A reclusive Hollywood icon finally tells her story to a young journalist, revealing secrets about her seven marriages and rise to fame.",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    rating: 4.7,
    trend: +8,
    readers: "9.2k",
    description:
      "An easy and proven way to build good habits and break bad ones through tiny changes that deliver remarkable results.",
  },
  {
    id: 3,
    title: "The Song of Achilles",
    author: "Madeline Miller",
    genre: "Mythology",
    rating: 4.9,
    trend: +12,
    readers: "8.7k",
    description:
      "A breathtaking retelling of the Iliad that explores the relationship between Achilles and Patroclus.",
  },
  {
    id: 4,
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Science Fiction",
    rating: 4.6,
    trend: -3,
    readers: "7.1k",
    description:
      "A lone astronaut must save humanity after waking up on a spaceship with no memory of how he got there.",
  },
  {
    id: 5,
    title: "The Invisible Life of Addie LaRue",
    author: "V.E. Schwab",
    genre: "Fantasy",
    rating: 4.5,
    trend: +5,
    readers: "6.8k",
    description:
      "A young woman makes a Faustian bargain to live forever but is cursed to be forgotten by everyone she meets.",
  },
]);

// Helper function to get color classes for ranking badges
const getRankingColor = (rank) => {
  switch (rank) {
    case 1:
      return "bg-yellow-500 text-white"; // Gold for #1
    case 2:
      return "bg-gray-400 text-white"; // Silver for #2
    case 3:
      return "bg-amber-600 text-white"; // Bronze for #3
    default:
      return "bg-slate-200 text-slate-700";
  }
};

// Helper function to get color classes for trend indicators
const getTrendColor = (trend) => {
  if (trend > 0) return "text-green-600"; // Green for positive trends
  if (trend < 0) return "text-red-600"; // Red for negative trends
  return "text-slate-500"; // Gray for no change
};

// Helper function to format trend numbers with proper signs
const formatTrend = (trend) => {
  if (trend > 0) return `+${trend}%`;
  if (trend < 0) return `${trend}%`;
  return "0%";
};

// Navigation function to book detail page
const navigateToBook = (bookId) => {
  // Using programmatic navigation to book detail page
  navigateTo(`/book/${bookId}`);
};

// Watch for period changes to potentially fetch new data
watch(currentPeriod, (newPeriod) => {
  console.log(`Fetching trending books for period: ${newPeriod}`);
  // In a real app, you would make an API call here:
  // await fetchTrendingBooks(newPeriod)
});

// CSS utility for text truncation
useHead({
  style: [
    {
      children: `
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `,
    },
  ],
});
</script>

<style scoped>
/* Custom scrollbar for the book list */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
s
