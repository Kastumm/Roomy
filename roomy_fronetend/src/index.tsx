import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import "./assets/sass/global.scss";
import { RoomsProvider } from "./context/RoomsProvider";
import { MeetingsProvider } from "./context/MeetingsProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AuthProvider>
    <ThemeProvider>
      <BrowserRouter>
        <RoomsProvider>
          <MeetingsProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </MeetingsProvider>
        </RoomsProvider>
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>
);
