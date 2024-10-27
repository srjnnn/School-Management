import "./components/testComponents/index.js";
import "./components/pages/MainContainer/index.js";
import "./components/pages/Dashboard/index.js";
import "./App.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  app.appendChild(document.createElement("my-app"));
});
