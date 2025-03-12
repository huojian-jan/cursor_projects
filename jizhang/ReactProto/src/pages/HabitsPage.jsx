import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HabitItem from "../components/HabitItem";

const HabitsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // 模拟数据
  const habits = [
    {
      id: 1,
      title: "30 مىنۇتلۇق ئەتىگەنلىك يۈگۈرۈش",
      frequency: "ھەر كۈنى",
      time: "6:30",
      streak: 5,
      completed: false,
      status: "active",
    },
    {
      id: 2,
      title: "15 مىنۇتلۇق مېدىتاتسىيە",
      frequency: "ھەر كۈنى",
      time: "7:00",
      streak: 12,
      completed: true,
      status: "active",
    },
    {
      id: 3,
      title: "30 مىنۇتلۇق كىتاب ئوقۇش",
      frequency: "خىزمەت كۈنلىرى",
      time: "21:00",
      streak: 3,
      completed: false,
      status: "active",
    },
    {
      id: 4,
      title: "پروگرامما ئۆگىنىش",
      frequency: "ھەپتىدە 3 قېتىم",
      time: "20:00",
      streak: 0,
      completed: false,
      status: "paused",
    },
    {
      id: 5,
      title: "كۈندىلىك يېزىش",
      frequency: "ھەر كۈنى",
      time: "22:00",
      streak: 1,
      completed: true,
      status: "active",
    },
  ];

  const filteredHabits = habits.filter((habit) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "active") return habit.status === "active";
    if (activeFilter === "completed") return habit.completed;
    if (activeFilter === "paused") return habit.status === "paused";
    return true;
  });

  return (
    <div className="container">
      <header className="header">
        <h1>مېنىڭ ئادەتلىرىم</h1>
        <p>بارلىق ئادەتلىرىڭىزنى باشقۇرۇش</p>
      </header>

      <div
        style={{
          display: "flex",
          overflowX: "auto",
          padding: "var(--spacing-xs) var(--spacing-md)",
          marginBottom: "var(--spacing-md)",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {[
          { id: "all", label: "ھەممىسى" },
          { id: "active", label: "داۋاملىشىۋاتقان" },
          { id: "completed", label: "تامامالنغان" },
          { id: "paused", label: "توختىتىلغان" },
        ].map((filter) => (
          <button
            key={filter.id}
            className={`btn ${activeFilter === filter.id ? "" : "btn-outline"}`}
            style={{
              marginRight: "var(--spacing-sm)",
              padding: "var(--spacing-xs) var(--spacing-md)",
              minWidth: "auto",
              whiteSpace: "nowrap",
              fontSize: "var(--font-small)",
            }}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="card-content" style={{ padding: 0 }}>
          {filteredHabits.length > 0 ? (
            filteredHabits.map((habit) => (
              <HabitItem key={habit.id} habit={habit} />
            ))
          ) : (
            <div
              style={{
                padding: "var(--spacing-xl)",
                textAlign: "center",
                color: "var(--ios-gray)",
              }}
            >
              <i
                className="fas fa-list"
                style={{
                  fontSize: "48px",
                  marginBottom: "var(--spacing-md)",
                  opacity: 0.5,
                }}
              ></i>
              <p>شەرتكە ئۇيغۇن ئادەت تېپىلمىدى</p>
            </div>
          )}
        </div>
      </div>

      <button className="btn" style={{ margin: "var(--spacing-md) 0" }}>
        <i className="fas fa-plus"></i> يېڭى ئادەت قوشۇش
      </button>

      <Navbar activeTab="habits" />
    </div>
  );
};

export default HabitsPage;
