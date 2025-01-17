import React from "react";
import "./index.css";
import { Provider } from "react-redux";
import { QueryClientProvider } from "react-query";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { createRoot } from "react-dom/client";
import App from "./App";
import store from "./redux/store";
import queryClient from "./queryClient";

const theme = createTheme();

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);
