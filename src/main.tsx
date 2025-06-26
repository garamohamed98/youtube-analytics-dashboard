import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import ThemeWrapper from "./theme/ThemeWrapper.tsx";
import { RouterProvider } from "react-router";
import { router } from "./router/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeWrapper>
        <RouterProvider
          router={router}
        />
      </ThemeWrapper>
    </Provider>
  </StrictMode>
);
