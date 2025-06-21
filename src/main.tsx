import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import ThemeWrapper from "./theme/ThemeWrapper.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeWrapper>
        <App />
      </ThemeWrapper>
    </Provider>
  </StrictMode>
);
