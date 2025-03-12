import React from "react";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>مېنىڭ</h1>
        <p>شەخسىي تەڭشەكلەر</p>
      </header>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "var(--spacing-lg)",
          background: "var(--ios-card-bg)",
          borderRadius: "var(--radius-md)",
          marginBottom: "var(--spacing-md)",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "var(--ios-light-blue)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "var(--spacing-md)",
            fontSize: "36px",
            color: "white",
          }}
        >
          <i className="fas fa-user"></i>
        </div>
        <h2 style={{ marginBottom: "var(--spacing-xs)" }}>ئەخمەت</h2>
        <p style={{ color: "var(--ios-gray)", fontSize: "var(--font-small)" }}>
          ئادەت يېتىلدۈرۈشنىڭ 15-كۈنى
        </p>
        <button
          className="btn btn-outline"
          style={{
            marginTop: "var(--spacing-md)",
            padding: "var(--spacing-xs) var(--spacing-md)",
          }}
        >
          ماتېرىيالنى تەھرىرلەش
        </button>
      </div>

      <div className="card" style={{ marginBottom: "var(--spacing-xs)" }}>
        <div className="card-content" style={{ padding: 0 }}>
          <SettingItem
            icon="fa-bell"
            title="ئەسكەرتىش تەڭشىكى"
            description="ئەسكەرتىش ۋاقتى ۋە ئۇسۇلىنى ئۆزلەشتۈرۈش"
            iconColor="var(--ios-red)"
          />
          <SettingItem
            icon="fa-moon"
            title="قاراڭغۇ ھالەت"
            iconColor="var(--ios-blue)"
            toggle={true}
          />
          <SettingItem
            icon="fa-palette"
            title="تېما رەڭگى"
            description="ئەپنىڭ تېمىسىنى ئۆزلەشتۈرۈش"
            iconColor="var(--ios-green)"
          />
        </div>
      </div>

      <div className="card" style={{ marginBottom: "var(--spacing-xs)" }}>
        <div className="card-content" style={{ padding: 0 }}>
          <SettingItem
            icon="fa-chart-line"
            title="سانلىق مەلۇمات ستاتىستىكىسى"
            description="تەپسىلىي ئادەت سانلىق مەلۇماتلىرىنى كۆرۈش"
            iconColor="var(--ios-yellow)"
          />
          <SettingItem
            icon="fa-cloud-upload-alt"
            title="سانلىق مەلۇمات زاپاسلاش"
            description="ئادەت سانلىق مەلۇماتلىرىڭىزنى زاپاسلاش ۋە ئەسلىگە كەلتۈرۈش"
            iconColor="var(--ios-light-blue)"
          />
        </div>
      </div>

      <div className="card">
        <div className="card-content" style={{ padding: 0 }}>
          <SettingItem
            icon="fa-info-circle"
            title="بىز ھەققىدە"
            description="نەشر ئۇچۇرى، ياردەم ۋە پىكىر"
            iconColor="var(--ios-gray)"
          />
          <SettingItem
            icon="fa-sign-out-alt"
            title="چېكىنىش"
            iconColor="var(--ios-red)"
          />
        </div>
      </div>

      <Navbar activeTab="profile" />
    </div>
  );
};

// 设置项组件
const SettingItem = ({ icon, title, description, iconColor, toggle }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "var(--spacing-md)",
        borderBottom: "1px solid var(--ios-border)",
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "8px",
          backgroundColor: iconColor + "15", // 添加透明度
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "var(--spacing-md)",
          color: iconColor,
        }}
      >
        <i className={`fas ${icon}`}></i>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 500 }}>{title}</div>
        {description && (
          <div
            style={{ fontSize: "var(--font-small)", color: "var(--ios-gray)" }}
          >
            {description}
          </div>
        )}
      </div>
      {toggle ? (
        <label className="toggle-switch">
          <input type="checkbox" />
          <span className="toggle-slider"></span>
        </label>
      ) : (
        <i
          className="fas fa-chevron-right"
          style={{ color: "var(--ios-light-gray)" }}
        ></i>
      )}
    </div>
  );
};

export default ProfilePage;
