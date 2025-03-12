import React from "react";

const StatsCard = ({ value, label, icon }) => {
  return (
    <div className="stats-card">
      {icon && (
        <i
          className={`fas ${icon}`}
          style={{
            fontSize: "24px",
            color: "var(--ios-blue)",
            marginBottom: "8px",
          }}
        ></i>
      )}
      <div className="stats-number">{value}</div>
      <div className="stats-label">{label}</div>
    </div>
  );
};

export default StatsCard;
