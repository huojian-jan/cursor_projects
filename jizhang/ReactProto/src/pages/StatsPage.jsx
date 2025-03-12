import React, { useState } from "react";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";

const StatsPage = () => {
  const [activeTab, setActiveTab] = useState("week");

  // 模拟数据 - 周统计
  const weekStats = {
    completionRate: "85%",
    streak: 12,
    totalCompleted: 45,
    activeHabits: 3,
  };

  // 模拟日历数据
  const calendarData = Array(28)
    .fill()
    .map((_, i) => {
      // 随机生成完成状态
      const status = Math.random();
      if (status > 0.7) return "completed";
      if (status > 0.5) return "partial";
      return "empty";
    });

  // 模拟图表数据
  const chartData = [
    { day: "دۈ", value: 60 },
    { day: "سە", value: 80 },
    { day: "چا", value: 70 },
    { day: "پە", value: 90 },
    { day: "جۈ", value: 85 },
    { day: "شە", value: 75 },
    { day: "يە", value: 95 },
  ];

  return (
    <div className="container">
      <header className="header">
        <h1>ستاتىستىكا</h1>
        <p>ئىلگىرىلىشىڭىزنى كۆزىتىش</p>
      </header>

      <div
        style={{
          display: "flex",
          background: "var(--ios-card-bg)",
          borderRadius: "var(--radius-full)",
          padding: "var(--spacing-xs)",
          marginBottom: "var(--spacing-md)",
          overflow: "hidden",
        }}
      >
        {["week", "month", "year"].map((tab) => (
          <button
            key={tab}
            className={`btn ${activeTab === tab ? "" : "btn-outline"}`}
            style={{
              flex: 1,
              borderRadius: "var(--radius-full)",
              padding: "var(--spacing-xs) var(--spacing-md)",
              border: "none",
              background: activeTab === tab ? "var(--ios-blue)" : "transparent",
              color: activeTab === tab ? "white" : "var(--ios-blue)",
              fontSize: "var(--font-small)",
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "week" ? "ھەپتە" : tab === "month" ? "ئاي" : "يىل"}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="card-content">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "var(--spacing-md)",
            }}
          >
            <StatsCard
              value={weekStats.completionRate}
              label="تاماملاش نىسبىتى"
              icon="fa-check-circle"
            />
            <StatsCard
              value={weekStats.streak}
              label="ئۇدا كۈنلەر"
              icon="fa-fire"
            />
            <StatsCard
              value={weekStats.totalCompleted}
              label="جەمئىي تاماملانغان"
              icon="fa-calendar-check"
            />
            <StatsCard
              value={weekStats.activeHabits}
              label="ئاكتىپ ئادەتلەر"
              icon="fa-list"
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>خاتىرە كالېندارى</h2>
          <span
            style={{ color: "var(--ios-blue)", fontSize: "var(--font-small)" }}
          >
            {activeTab === "week"
              ? "بۇ ھەپتە"
              : activeTab === "month"
              ? "بۇ ئاي"
              : "بۇ يىل"}
          </span>
        </div>
        <div className="card-content">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "var(--spacing-xs)",
              marginBottom: "var(--spacing-xs)",
            }}
          >
            {["دۈ", "سە", "چا", "پە", "جۈ", "شە", "يە"].map((day) => (
              <div
                key={day}
                style={{
                  textAlign: "center",
                  fontSize: "var(--font-tiny)",
                  color: "var(--ios-gray)",
                }}
              >
                {day}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "var(--spacing-xs)",
            }}
          >
            {calendarData.map((status, index) => (
              <div
                key={index}
                style={{
                  aspectRatio: "1",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor:
                    status === "completed"
                      ? "var(--ios-blue)"
                      : status === "partial"
                      ? "var(--ios-light-blue)"
                      : "var(--ios-light-gray)",
                  opacity: status === "empty" ? 0.3 : 1,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>تاماملاش تېندېنسىيەسى</h2>
        </div>
        <div className="card-content">
          <div
            style={{
              height: "200px",
              display: "flex",
              alignItems: "flex-end",
              gap: "var(--spacing-xs)",
              marginBottom: "var(--spacing-md)",
            }}
          >
            {chartData.map((item, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: `${item.value}%`,
                    backgroundColor: "var(--ios-blue)",
                    borderRadius: "var(--radius-sm) var(--radius-sm) 0 0",
                  }}
                />
                <div
                  style={{
                    marginTop: "var(--spacing-xs)",
                    fontSize: "var(--font-tiny)",
                    color: "var(--ios-gray)",
                  }}
                >
                  {item.day}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Navbar activeTab="stats" />
    </div>
  );
};

export default StatsPage;
