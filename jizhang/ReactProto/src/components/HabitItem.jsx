import React, { useState } from "react";

const HabitItem = ({ habit }) => {
  const [completed, setCompleted] = useState(habit.completed);
  const [bounce, setBounce] = useState(false);

  const toggleComplete = () => {
    setCompleted(!completed);
    setBounce(true);
    setTimeout(() => setBounce(false), 1000);
  };

  return (
    <div className="habit-item">
      <div
        className={`habit-check ${completed ? "completed" : ""} ${
          bounce ? "bounce" : ""
        }`}
        onClick={toggleComplete}
      ></div>
      <div className="habit-info">
        <div className="habit-title">{habit.title}</div>
        <div className="habit-streak">
          {habit.frequency} · {habit.time}
          {habit.streak > 0 && ` · 连续${habit.streak}天`}
        </div>
      </div>
      <div className="habit-actions">
        <button className="action-btn">
          <i className="fas fa-ellipsis-h"></i>
        </button>
      </div>
    </div>
  );
};

export default HabitItem;
