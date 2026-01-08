// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

// StringMode teeb topelt renderduse testkeskkonnas, ainult localhostis
// renderdamine --> html v2ljakuvaldamine
// topelt renderdamine on k6valefektide leidsmiseks

createRoot(document.getElementById("root")!).render(
  //<StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  //</StrictMode>
);
