import React, { useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar";

export const ThemeContext = React.createContext();

export default function Layout() {

  const [isDark, setIsDark] = useState(false);


  function switchMode() {
    setIsDark(prev => !prev);
  }

  return (
    <div className={`layout ${isDark ? "dark" : "light"}`}>
      <Navbar isDark={isDark} switchMode={switchMode} />
      <main>
          <Outlet context={{ isDark }} />
          <ScrollRestoration />
      </main>
    </div>
  );
}
