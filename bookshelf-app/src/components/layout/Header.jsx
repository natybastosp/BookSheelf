import React from "react";
import { Search } from "lucide-react";

const Header = () => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  return (
    <nav className="glassmorphism border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Navigation Tabs */}
          <div className="flex gap-1 bg-white/10 p-2 rounded-full">
            <NavTab href="#" icon="🏠" text="PROJECT" />
            <NavTab href="#" icon="📚" text="BOOKSHELF" active />
            <NavTab href="#" icon="💰" text="EXPENSE" />
            <NavTab href="#" icon="🎯" text="REFLECT" />
            <NavTab href="#" icon="📝" text="JOURNAL" />
          </div>

          {/* Calendar */}
          <div className="hidden md:flex gap-1 text-xs">
            {months.map((month, index) => (
              <span
                key={month}
                className={`px-2 py-1 rounded-lg transition-all ${
                  month === "AUG"
                    ? "bg-accent-pink text-white"
                    : "bg-white/10 text-white/60 hover:bg-white/20"
                }`}
              >
                {month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavTab = ({ href, icon, text, active = false }) => (
  <a
    href={href}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
      active
        ? "bg-white/20 text-white"
        : "text-white/70 hover:bg-white/15 hover:text-white"
    }`}
  >
    <span className="mr-1">{icon}</span>
    {text}
  </a>
);

export default Header;
