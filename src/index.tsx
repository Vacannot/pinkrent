import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material";
import "@fontsource/montserrat/100.css";
import "@fontsource/montserrat/200.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/900.css";
import AuthProvider from "./backend/Context";

const theme = createTheme({
  palette: {
    action: {
      disabledBackground: "#F5BBDC",
      disabled: "#FFFFFF",
    },
    primary: {
      main: "#F360B4",
      "100": "#ED80BE",
      "200": "#DB7A7A",
      "300": "#FF3B9D",
      "400": "#FF8CC6",
      "500": "#FF69B4",
    },
    secondary: {
      main: "#F5BBDC",
      "100": "#404040",
      "200": "#91C98C",
    },
    error: {
      main: "#E11010",
    },
    info: {
      main: "#F5BBDC",
    },
    success: {
      main: "#94DB5D",
    },
    warning: {
      main: "#91C98C",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
