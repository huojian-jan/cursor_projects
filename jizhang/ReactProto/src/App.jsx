import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import HabitsPage from "./pages/HabitsPage";
import StatsPage from "./pages/StatsPage";
import ProfilePage from "./pages/ProfilePage";
import NewHabitPage from "./pages/NewHabitPage";
import "./styles/globals.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  // 简单的路由逻辑
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "habits":
        return <HabitsPage onNavigate={setCurrentPage} />;
      case "stats":
        return <StatsPage onNavigate={setCurrentPage} />;
      case "profile":
        return <ProfilePage onNavigate={setCurrentPage} />;
      case "new-habit":
        return <NewHabitPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  // 监听哈希变化
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setCurrentPage(hash);
    }
  });

  // 更新页面标题
  document.title =
    currentPage === "home"
      ? "ئادەتنى كونترول قىلىش"
      : currentPage === "habits"
      ? "مېنىڭ ئادەتلىرىم"
      : currentPage === "stats"
      ? "ستاتىستىكا"
      : currentPage === "profile"
      ? "مېنىڭ"
      : currentPage === "new-habit"
      ? "يېڭى ئادەت قوشۇش"
      : "ئادەتنى كونترول قىلىش";

  return <div className="app">{renderPage()}</div>;
};

export default App;
