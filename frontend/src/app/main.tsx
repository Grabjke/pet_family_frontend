import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../theme";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { store } from "./store";
import { Provider } from "react-redux";
import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={lightTheme}>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </ThemeProvider>
);
