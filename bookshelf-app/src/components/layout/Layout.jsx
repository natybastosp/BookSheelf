import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-fiction-primary via-fiction-secondary to-romance-primary">
      {/* Background Pattern */}
      <div
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <Header />
      <main className="relative z-10">{children}</main>
    </div>
  );
};

export default Layout;
