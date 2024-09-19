import "./components/TopNavar/index.js";
import "./components/Sidebar/index.js";
import "./components/MainContainer/index.js";
import "./components/Card/index.js";
import "./components/Dashboard/index.js";
// import "./App.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  app.appendChild(document.createElement("my-dashboard"));
});
