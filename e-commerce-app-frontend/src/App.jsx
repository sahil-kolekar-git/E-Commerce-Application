import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";

const App = () => {
  let { theme } = useContext(ThemeContext);
  return (
    <div className={theme ? "bg-black text-white" : "bg-white text-black"}>
      <div className="w-screen h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default App;
