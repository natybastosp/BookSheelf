import React from "react";
import { motion } from "framer-motion";
import { Star, Heart } from "lucide-react";

const BookCard = ({
  book = {
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    category: "Romance",
    ranking: 1,
    weeks: 15,
    rating: 4.5,
    readers: "2.1M",
    price: 29.9,
    cover: "/api/placeholder/240/360",
  },
  categoryColors = "romance",
}) => {
  const colorSchemes = {
    fiction: {
      primary: "from-fiction-primary to-fiction-secondary",
      accent: "fiction-accent",
      bg: "bg-fiction-primary/20",
    },
    romance: {
      primary: "from-romance-primary to-romance-secondary",
      accent: "romance-accent",
      bg: "bg-romance-primary/20",
    },
    mystery: {
      primary: "from-mystery-primary to-mystery-secondary",
      accent: "mystery-accent",
      bg: "bg-mystery-primary/20",
    },
  };

  const colors = colorSchemes[categoryColors] || colorSchemes.romance;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="journal-background rounded-3xl p-8 shadow-float relative overflow-hidden"
    >
      {/* Floating Decorative Elements */}
      <FloatingElements />

      {/* Center Divider */}
      <div className="absolute left-1/2 top-8 bottom-8 w-0.5 bg-white/10 transform -translate-x-1/2" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 min-h-[600px] relative z-10">
        {/* Left Page - Book Cover */}
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            className="absolute top-4 right-4 bg-accent-pink text-white px-4 py-2 rounded-full font-handwritten font-bold text-sm transform rotate-12 shadow-lg border-2 border-white"
            animate={{ rotate: [12, 8, 12] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            #{book.ranking} Bestseller
          </motion.div>

          {/* Book Cover */}
          <motion.div
            className="w-60 h-80 rounded-lg shadow-xl transform perspective-1000 hover:scale-105 transition-transform duration-300"
            style={{
              background: `linear-gradient(135deg, #${
                categoryColors === "fiction"
                  ? "4a6fa5"
                  : categoryColors === "romance"
                  ? "667eea"
                  : "56ab2f"
              } 0%, #${
                categoryColors === "fiction"
                  ? "5d7bb5"
                  : categoryColors === "romance"
                  ? "764ba2"
                  : "a8e6cf"
              } 100%)`,
              backgroundImage: `url("data:image/svg+xml,${createBookCoverSVG(
                book.title,
                book.author,
                categoryColors
              )}")`,
            }}
            whileHover={{ rotateY: -5 }}
          />

          {/* Doodles */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-[15%] left-[10%] text-accent-yellow text-xl"
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ⭐
            </motion.div>
            <motion.div
              className="absolute bottom-[25%] right-[15%] text-accent-pink text-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💕
            </motion.div>
            <motion.div
              className="absolute top-[60%] left-[5%] text-accent-green text-base"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              ✨
            </motion.div>
          </div>
        </div>

        {/* Right Page - Book Info */}
        <div className="relative space-y-6">
          <div className="text-right text-white/70 font-handwritten text-lg mb-6">
            Mini journal
          </div>

          <div className="glassmorphism rounded-2xl p-6 space-y-4">
            {/* Washi Tape */}
            <div className="absolute -top-2 -right-2 w-24 h-6 bg-gradient-to-r from-accent-coral/80 to-accent-cream/80 transform rotate-8 rounded-sm" />

            {/* Book Title & Author */}
            <div>
              <h2 className="font-handwritten text-3xl text-white mb-2 transform -rotate-1">
                {book.title}
              </h2>
              <p className="text-accent-coral text-lg font-handwritten transform rotate-slight">
                por {book.author}
              </p>
              <span
                className={`inline-block ${colors.bg} text-white px-3 py-1 rounded-full text-sm font-medium mt-3 transform -rotate-1`}
              >
                {book.category} ✨
              </span>
            </div>

            {/* Description */}
            <div className="font-sans text-white/90 leading-relaxed text-sm">
              Uma história envolvente que captura o coração dos leitores mundo
              afora.
              <span className="text-accent-green font-semibold">
                {" "}
                Este livro é simplesmente incrível!
              </span>{" "}
              ⭐⭐⭐⭐⭐
            </div>

            {/* Stats */}
            <div className="bg-black/20 rounded-xl p-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-accent-yellow text-xl font-bold">
                  {book.weeks}
                </div>
                <div className="text-white/70 text-xs uppercase tracking-wide">
                  semanas
                </div>
              </div>
              <div>
                <div className="text-accent-yellow text-xl font-bold">
                  {book.rating}★
                </div>
                <div className="text-white/70 text-xs uppercase tracking-wide">
                  rating
                </div>
              </div>
              <div>
                <div className="text-accent-yellow text-xl font-bold">
                  {book.readers}
                </div>
                <div className="text-white/70 text-xs uppercase tracking-wide">
                  leitores
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                className="flex-1 bg-gradient-to-r from-accent-pink to-accent-coral text-white px-6 py-3 rounded-full font-medium text-sm transform -rotate-1 hover:scale-105 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Comprar R$ {book.price.toFixed(2)}
              </motion.button>
              <motion.button
                className="glassmorphism border-white/20 text-white px-6 py-3 rounded-full font-medium text-sm transform rotate-1 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Detalhes
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        {[0, 1, 2, 3].map((dot, index) => (
          <div
            key={dot}
            className={`w-2 h-2 rounded-full transition-all ${
              index === 0 ? "bg-accent-pink scale-125" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Floating decorative elements
const FloatingElements = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute w-4 h-4 ${getRandomShape(i)} ${getRandomColor(i)}`}
        style={{
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 80 + 10}%`,
        }}
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: i * 0.5,
        }}
      />
    ))}
  </div>
);

// Helper functions
const getRandomShape = (index) => {
  const shapes = [
    "rounded-full",
    "transform rotate-45",
    "clip-polygon-triangle",
  ];
  return shapes[index % 3];
};

const getRandomColor = (index) => {
  const colors = ["bg-accent-pink", "bg-accent-green", "bg-accent-yellow"];
  return colors[index % 3];
};

const createBookCoverSVG = (title, author, category) => {
  const colorMap = {
    fiction: { primary: "4a6fa5", secondary: "5d7bb5" },
    romance: { primary: "667eea", secondary: "764ba2" },
    mystery: { primary: "56ab2f", secondary: "a8e6cf" },
  };

  const colors = colorMap[category] || colorMap.romance;

  return encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 320">
      <defs>
        <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#${
            colors.primary
          };stop-opacity:1" />
          <stop offset="100%" style="stop-color:#${
            colors.secondary
          };stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="240" height="320" fill="url(#bookGrad)"/>
      <rect x="20" y="20" width="200" height="30" fill="white" opacity="0.9" rx="4"/>
      <text x="120" y="40" text-anchor="middle" fill="#${
        colors.primary
      }" font-size="12" font-weight="bold" font-family="Inter">BESTSELLER</text>
      <rect x="30" y="70" width="180" height="2" fill="#ff6b9d"/>
      <rect x="30" y="80" width="160" height="2" fill="#ffd93d"/>
      <rect x="30" y="90" width="140" height="2" fill="#6bcf7f"/>
      <text x="120" y="140" text-anchor="middle" fill="white" font-size="16" font-family="Georgia" font-weight="bold">${title
        .split(" ")
        .slice(0, 2)
        .join(" ")}</text>
      <text x="120" y="160" text-anchor="middle" fill="white" font-size="16" font-family="Georgia" font-weight="bold">${title
        .split(" ")
        .slice(2)
        .join(" ")}</text>
      <text x="120" y="200" text-anchor="middle" fill="white" font-size="10" font-family="Georgia" opacity="0.9">${author}</text>
      <rect x="30" y="240" width="180" height="1" fill="white" opacity="0.3"/>
      <text x="120" y="270" text-anchor="middle" fill="white" font-size="8" font-family="Georgia" opacity="0.7">A Novel</text>
    </svg>
  `);
};

export default BookCard;
