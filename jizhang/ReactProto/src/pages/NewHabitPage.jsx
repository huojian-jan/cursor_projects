import React, { useState } from "react";

const NewHabitPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    frequency: "daily",
    time: "",
    obvious: "",
    attractive: "",
    easy: "",
    satisfying: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // 这里可以添加保存逻辑
    alert("ئادەت مۇۋەپپەقىيەتلىك قۇرۇلدى!");
  };

  return (
    <div className="container">
      <header
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          style={{
            background: "none",
            border: "none",
            color: "var(--ios-blue)",
            fontSize: "var(--font-medium)",
          }}
          onClick={() => window.history.back()}
        >
          بىكار قىلىش
        </button>
        <h1 style={{ fontSize: "var(--font-title)" }}>يېڭى ئادەت قوشۇش</h1>
        <button
          style={{
            background: "none",
            border: "none",
            color: "var(--ios-blue)",
            fontSize: "var(--font-medium)",
            fontWeight: 600,
          }}
          onClick={handleSubmit}
        >
          ساقلاش
        </button>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-content">
            <div className="form-group">
              <label htmlFor="title">ئادەت نامى</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                placeholder="مەسىلەن: يۈگۈرۈش، مېدىتاتسىيە، كىتاب ئوقۇش"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">چۈشەندۈرۈش</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                rows="3"
                placeholder="بۇ ئادەتنىڭ مەزمۇنى ۋە نىشانىنى چۈشەندۈرۈڭ"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>ئادەت لايىھەلەش تۆت ئامىلى</h2>
            <i
              className="fas fa-lightbulb"
              style={{ color: "var(--ios-yellow)" }}
            ></i>
          </div>
          <div className="card-content">
            <div className="form-group">
              <label htmlFor="obvious">ئېنىق كۆرۈنۈشلۈك قىلىش</label>
              <input
                type="text"
                id="obvious"
                name="obvious"
                className="form-control"
                placeholder="قەيەردە/قاچان ئۆزىڭىزگە ئەسكەرتىسىز"
                value={formData.obvious}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="attractive">جەلپ قىلارلىق قىلىش</label>
              <input
                type="text"
                id="attractive"
                name="attractive"
                className="form-control"
                placeholder="قايسى خۇشاللىق ئىشلار بىلەن بىرلەشتۈرۈش"
                value={formData.attractive}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="easy">ئاسان قىلىش</label>
              <input
                type="text"
                id="easy"
                name="easy"
                className="form-control"
                placeholder="ھەرىكەت بوسۇغىسىنى قانداق تۆۋەنلىتىش"
                value={formData.easy}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="satisfying">قانائەتلەندۈرگۈچى قىلىش</label>
              <input
                type="text"
                id="satisfying"
                name="satisfying"
                className="form-control"
                placeholder="تاماملىغاندىن كېيىن ئۆزىڭىزنى قانداق مۇكاپاتلاش"
                value={formData.satisfying}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="form-group">
              <label htmlFor="frequency">قايتىلاش چاستوتىسى</label>
              <select
                id="frequency"
                name="frequency"
                className="form-control"
                value={formData.frequency}
                onChange={handleChange}
              >
                <option value="daily">ھەر كۈنى</option>
                <option value="weekly">ھەر ھەپتە</option>
                <option value="workdays">خىزمەت كۈنلىرى</option>
                <option value="weekends">دەم ئېلىش كۈنلىرى</option>
                <option value="custom">ئۆزى بەلگىلەش</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="time">ئەسكەرتىش ۋاقتى</label>
              <input
                type="time"
                id="time"
                name="time"
                className="form-control"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn"
          style={{ margin: "var(--spacing-md) 0" }}
        >
          <i className="fas fa-check"></i> ئادەت قۇرۇش
        </button>
      </form>
    </div>
  );
};

export default NewHabitPage;
