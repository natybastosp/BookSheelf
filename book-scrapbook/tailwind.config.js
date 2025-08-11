module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        "book-brown": "#8B4513",
        "paper-cream": "#F5F5DC",
        "ink-blue": "#191970",
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
        handwrite: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};
