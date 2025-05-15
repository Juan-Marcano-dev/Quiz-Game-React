import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Components/styles/GlobalStyles.scss";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
