import "./components/testComponents/TopNavar/index.js";
import "./components/testComponents/Sidebar/index.js";
import "./components/pages/MainContainer/index.js";
import "./components/testComponents/Card/index.js";
import "./components/pages/Dashboard/index.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  app.appendChild(document.createElement("my-dashboard"));
});
