import "./components/elements/TopNavar/index.js";
import "./components/elements/Sidebar/index.js";
import "./components/pages/MainContainer/index.js";
import "./components/elements/Card/index.js";
import "./components/pages/Dashboard/index.js";
import "./components/elements/Button/index.js";
import "./components/elements/input/index.js";
import "./components/views/Sidebar/index.js";
import "./components/views/BusSummaryBox/index.js"

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  app.appendChild(document.createElement("my-dashboard"));
});
