import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={lightTheme}>
    <RouterProvider router={router} />
    <ToastContainer />
  </ThemeProvider>
);
