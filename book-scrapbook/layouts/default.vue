<!-- layouts/default.vue -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800"
  >
    <!-- Background texture overlay for paper-like effect -->
    <div class="min-h-screen bg-texture">
      <!-- Scrapbook Container -->
      <div class="container mx-auto px-4 py-8">
        <div class="max-w-7xl mx-auto">
          <!-- Scrapbook Book -->
          <div
            class="relative bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[85vh]"
          >
            <!-- Top Navigation Tabs (Bookmarks) -->
            <div class="relative">
              <!-- Tabs container -->
              <div class="flex bg-slate-100 border-b-2 border-slate-200">
                <ScrapbookTab
                  v-for="tab in navigationTabs"
                  :key="tab.name"
                  :tab="tab"
                  :is-active="isActiveTab(tab.path)"
                  @click="navigateToTab(tab.path)"
                />
              </div>

              <!-- Period filters (top right) -->
              <div class="absolute top-0 right-4 flex gap-1 text-xs">
                <button
                  v-for="period in periodFilters"
                  :key="period"
                  class="px-2 py-1 text-slate-600 hover:text-slate-800 transition-colors duration-200"
                  :class="{
                    'text-blue-600 font-semibold': activePeriod === period,
                  }"
                  @click="setActivePeriod(period)"
                >
                  {{ period }}
                </button>
              </div>
            </div>

            <!-- Main Content Area (Two-page spread) -->
            <div
              class="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(85vh-80px)]"
            >
              <!-- Left Page -->
              <div
                class="relative p-8 border-r border-slate-200 bg-gradient-to-br from-blue-50 to-slate-50"
              >
                <!-- Page content will be injected here -->
                <div class="h-full">
                  <slot name="left-page">
                    <!-- Default left page content -->
                    <div class="h-full flex flex-col">
                      <NuxtPage />
                    </div>
                  </slot>
                </div>

                <!-- Decorative elements for left page -->
                <div class="absolute top-4 left-4 text-slate-300">
                  <Icon name="bookmark" class="w-6 h-6" />
                </div>
              </div>

              <!-- Right Page -->
              <div
                class="relative p-8 bg-gradient-to-bl from-slate-50 to-blue-50"
              >
                <div class="h-full">
                  <slot name="right-page">
                    <!-- Default right page content -->
                    <div
                      class="h-full flex flex-col justify-center items-center text-slate-400"
                    >
                      <div class="text-6xl mb-4">📚</div>
                      <p class="text-lg">Visual content area</p>
                      <p class="text-sm">
                        Book covers, decorations, and highlights
                      </p>
                    </div>
                  </slot>
                </div>

                <!-- Decorative elements for right page -->
                <div class="absolute bottom-4 right-4 text-slate-300">
                  <Icon name="star" class="w-6 h-6" />
                </div>
              </div>
            </div>

            <!-- Scrapbook binding effect (center line) -->
            <div
              class="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-300 via-slate-200 to-slate-300 transform -translate-x-1/2 hidden lg:block"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Define reactive data for navigation and state management
const route = useRoute();
const router = useRouter();

// Navigation tabs configuration - these act as our bookmarks
const navigationTabs = ref([
  { name: "HOME", path: "/", icon: "🏠" },
  { name: "TRENDING", path: "/trending", icon: "🔥" },
  { name: "GENRES", path: "/genres", icon: "📚" },
  { name: "SEARCH", path: "/search", icon: "🔍" },
  { name: "FAVORITES", path: "/favorites", icon: "❤️" },
  { name: "READING", path: "/reading-list", icon: "📖" },
]);

// Period filters for trending books
const periodFilters = ref(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]);
const activePeriod = ref("WEEKLY");

// Helper function to check if a tab is currently active
const isActiveTab = (tabPath) => {
  if (tabPath === "/") {
    return route.path === "/";
  }
  return route.path.startsWith(tabPath);
};

// Navigation handler
const navigateToTab = (path) => {
  router.push(path);
};

// Period filter handler
const setActivePeriod = (period) => {
  activePeriod.value = period;
  // Here you would typically emit an event or update a store
  // to filter the trending books by the selected period
};

// Meta configuration for better SEO
useHead({
  title: "Book Scrapbook - Digital Reading Journal",
  meta: [
    {
      name: "description",
      content:
        "Your personal digital scrapbook for discovering and tracking amazing books",
    },
  ],
});
</script>

<style scoped>
/* Custom styles for scrapbook aesthetic */
.container {
  /* Ensure the scrapbook feels centered and contained */
  max-width: 1400px;
}

/* Background texture using CSS instead of problematic data URL */
.bg-texture {
  background-image: radial-gradient(
      circle at 20px 80px,
      rgba(120, 119, 198, 0.3) 1px,
      transparent 1px
    ),
    radial-gradient(
      circle at 80px 20px,
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px
    ),
    radial-gradient(
      circle at 40px 40px,
      rgba(120, 119, 198, 0.2) 1px,
      transparent 1px
    );
  background-size: 100px 100px, 120px 120px, 80px 80px;
  background-position: 0 0, 40px 60px, 20px 20px;
}

/* Add subtle animations for interactive elements */
.transition-colors {
  transition-property: color, background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Ensure mobile responsiveness */
@media (max-width: 1024px) {
  .grid-cols-1 {
    /* On mobile, stack pages vertically instead of side by side */
    grid-template-columns: 1fr;
  }
}
</style>
