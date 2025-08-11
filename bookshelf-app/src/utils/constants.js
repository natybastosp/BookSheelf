// API Configuration
export const API_CONFIG = {
  NYT_BASE_URL: "https://api.nytimes.com/svc/books/v3",
  NYT_API_KEY: import.meta.env.VITE_NYT_API_KEY,
  GOOGLE_BOOKS_URL: "https://www.googleapis.com/books/v1/volumes",
};

// Book Categories
export const BOOK_CATEGORIES = {
  FICTION: {
    id: "combined-fiction",
    name: "Fiction",
    colors: {
      primary: "fiction-primary",
      secondary: "fiction-secondary",
      accent: "fiction-accent",
    },
    icon: "📚",
  },
  ROMANCE: {
    id: "romance",
    name: "Romance",
    colors: {
      primary: "romance-primary",
      secondary: "romance-secondary",
      accent: "romance-accent",
    },
    icon: "💕",
  },
  MYSTERY: {
    id: "crime-and-punishment",
    name: "Mystery",
    colors: {
      primary: "mystery-primary",
      secondary: "mystery-secondary",
      accent: "mystery-accent",
    },
    icon: "🔍",
  },
};

// Animation Variants
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 },
  },
  float: {
    initial: { y: 0 },
    animate: { y: [-10, 10, -10] },
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
