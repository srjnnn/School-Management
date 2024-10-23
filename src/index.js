// import "./components/elements/Button/index.js";
import "./components/MainContainer/index.js";
import "./components/elements/Card/index.js";
import "./components/Dashboard/index.js";
import "./components/elements/List/index.js";
import "./components/elements/TopNavar/index.js"
import "./components/elements/Sidebar/index.js"
import "./components/elements/List/index.js"

// import "./App.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  app.appendChild(document.createElement("my-dashboard"));
});
