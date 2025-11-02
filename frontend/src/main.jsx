import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./App.css"; // keep global css
import { ThemeProvider } from "./landing_page/admin/context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider>
    <AuthProvider>
       <App />
      </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
