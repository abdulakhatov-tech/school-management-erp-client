import { createRoot } from "react-dom/client";

import "./index.css";
import AppRouter from "./router";
import AppProviders from "./providers";

createRoot(document.getElementById("root")!).render(
  <AppProviders>
    <AppRouter />
  </AppProviders>
);
