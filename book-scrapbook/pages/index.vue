<template>
  <div class="h-full flex flex-col">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-slate-800 mb-2">
        Welcome to Your Book Scrapbook
      </h1>
      <p class="text-slate-600 text-lg">
        Discover, track, and celebrate your reading journey
      </p>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 grid grid-cols-1 gap-8">
      <!-- Quick Stats Card -->
      <div class="bg-white rounded-lg shadow-sm border-2 border-slate-200 p-6">
        <h2
          class="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"
        >
          <span>📊</span>
          Your Reading Stats
        </h2>
        <div class="grid grid-cols-2 gap-4 text-center">
          <div class="p-4 bg-blue-50 rounded-lg">
            <div class="text-2xl font-bold text-blue-600">
              {{ stats.booksRead }}
            </div>
            <div class="text-sm text-slate-600">Books Read</div>
          </div>
          <div class="p-4 bg-green-50 rounded-lg">
            <div class="text-2xl font-bold text-green-600">
              {{ stats.currentlyReading }}
            </div>
            <div class="text-sm text-slate-600">Currently Reading</div>
          </div>
        </div>
      </div>

      <!-- Quick Navigation -->
      <div
        class="bg-gradient-to-r from-blue-50 to-slate-50 rounded-lg border-2 border-slate-200 p-6"
      >
        <h2
          class="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"
        >
          <span>🧭</span>
          Quick Navigation
        </h2>
        <div class="grid grid-cols-1 gap-3">
          <NuxtLink
            v-for="quickLink in quickLinks"
            :key="quickLink.name"
            :to="quickLink.path"
            class="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group"
          >
            <span class="text-2xl">{{ quickLink.icon }}</span>
            <div>
              <div class="font-medium text-slate-800 group-hover:text-blue-700">
                {{ quickLink.name }}
              </div>
              <div class="text-sm text-slate-600">
                {{ quickLink.description }}
              </div>
            </div>
            <div class="ml-auto text-slate-400 group-hover:text-blue-500">
              →
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="absolute -top-2 -left-2 text-4xl opacity-20 rotate-12">📚</div>
    <div class="absolute -bottom-4 -right-4 text-3xl opacity-20 -rotate-12">
      ✨
    </div>
  </div>
</template>

<script setup>
// Page metadata for SEO and browser tab
useHead({
  title: "Home - Book Scrapbook",
  meta: [
    {
      name: "description",
      content:
        "Your personal digital scrapbook for discovering and tracking amazing books",
    },
  ],
});

// Reactive data for user statistics
// In a real app, this would come from an API or database
const stats = ref({
  booksRead: 12,
  currentlyReading: 3,
  wishlist: 8,
  favoriteGenre: "Fantasy",
});

// Quick navigation links for easy access to main features
const quickLinks = ref([
  {
    name: "Trending Books",
    path: "/trending",
    icon: "🔥",
    description: "See what's popular this week",
  },
  {
    name: "Browse Genres",
    path: "/genres",
    icon: "📚",
    description: "Explore books by category",
  },
  {
    name: "Search Books",
    path: "/search",
    icon: "🔍",
    description: "Find your next great read",
  },
  {
    name: "My Favorites",
    path: "/favorites",
    icon: "❤️",
    description: "Your saved and loved books",
  },
]);

// You could add functions here to fetch real data
// For example:
// const fetchUserStats = async () => {
//   try {
//     const response = await $fetch('/api/user/stats')
//     stats.value = response
//   } catch (error) {
//     console.error('Failed to fetch user stats:', error)
//   }
// }

// onMounted(() => {
//   fetchUserStats()
// })
</script>

<style scoped>
/* Custom styles for this specific page */

/* Add a subtle floating animation to decorative elements */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(12deg);
  }
  50% {
    transform: translateY(-10px) rotate(12deg);
  }
}

.absolute:first-of-type {
  animation: float 6s ease-in-out infinite;
}

.absolute:last-of-type {
  animation: float 8s ease-in-out infinite reverse;
}

/* Ensure links have nice hover effects */
.group:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
