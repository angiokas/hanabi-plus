import React from "react";
//import GameSession from "./pages/GameSession";
//import Lobbies from "@/pages/Lobbies";
import { useState } from "react";
import NavigationBar from "@/components/Base/NavigationBar";
import Footer from "@/components/Base/Footer";
function App() {
  const [currentPage, setCurrentPage] = useState("lobbies");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <NavigationBar currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Page Content */}
      <main className="main-content">
        <div className="content-container">
          <h1 className="page-title">
            {currentPage.charAt(0).toUpperCase() +
              currentPage.slice(1).replace("-", " ")}
          </h1>
          <p className="page-description">
            This is the {currentPage.replace("-", " ")} page content. The
            navigation bar and footer are fully functional and ready to be
            integrated into your Hanabi application.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
