import React from "react";
import Navbar from "../components/Navbar";
import HabitItem from "../components/HabitItem";
import StatsCard from "../components/StatsCard";

const HomePage = () => {
  // 模拟数据
  const todayHabits = [
    {
      id: 1,
      title: "30 مىنۇتلۇق ئەتىگەنلىك يۈگۈرۈش",
      frequency: "ھەر كۈنى",
      time: "6:30",
      streak: 5,
      completed: false,
    },
    {
      id: 2,
      title: "15 مىنۇتلۇق مېدىتاتسىيە",
      frequency: "ھەر كۈنى",
      time: "7:00",
      streak: 12,
      completed: true,
    },
    {
      id: 3,
      title: "30 مىنۇتلۇق كىتاب ئوقۇش",
      frequency: "خىزمەت كۈنلىرى",
      time: "21:00",
      streak: 3,
      completed: false,
    },
  ];

  return (
    <div className="container">
      <header className="header">
        <h1>ئادەتنى كونترول قىلىش</h1>
        <p>
          بۈگۈن،
          {new Date().toLocaleDateString("zh-CN", {
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <div className="card">
        <div className="card-header">
          <h2>بۈگۈنكى ئادەتلەر</h2>
          <span style={{ color: "var(--ios-blue)" }}>2/3</span>
        </div>
        <div className="card-content" style={{ padding: 0 }}>
          {todayHabits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} />
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>بۇ ھەپتىلىك ئىلگىرىلەش</h2>
          <span
            style={{ color: "var(--ios-blue)", fontSize: "var(--font-small)" }}
          >
            تېخىمۇ كۆپ كۆرۈش
          </span>
        </div>
        <div className="card-content">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "var(--spacing-md)",
            }}
          >
            <StatsCard value="85%" label="تاماملاش نىسبىتى" />
            <StatsCard value="12" label="ئۇدا كۈنلەر" />
          </div>

          {/* 简易周历 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "var(--spacing-md)",
            }}
          >
            {["دۈ", "سە", "چا", "پە", "جۈ", "شە", "يە"].map((day, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "var(--font-tiny)",
                    color: "var(--ios-gray)",
                    marginBottom: "var(--spacing-xs)",
                  }}
                >
                  {day}
                </div>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor:
                      index < 5
                        ? "var(--ios-blue)"
                        : index === 5
                        ? "var(--ios-light-blue)"
                        : "var(--ios-light-gray)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "var(--font-small)",
                  }}
                >
                  {index < 5 ? (
                    <i className="fas fa-check"></i>
                  ) : index === 5 ? (
                    "!"
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="btn" style={{ margin: "var(--spacing-md) 0" }}>
        <i className="fas fa-plus"></i> يېڭى ئادەت قوشۇش
      </button>

      <Navbar activeTab="home" />
    </div>
  );
};

export default HomePage;
