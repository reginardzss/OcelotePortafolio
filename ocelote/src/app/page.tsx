"use client"; // Solo si es necesario
import React from "react";
import Home from "./pages/home/page";
import { SpeedInsights } from "@vercel/speed-insights/next"


const App: React.FC = () => {
  return (
    <div className="App">
      <SpeedInsights/>
      <Home />
    </div>
  );
};

export default App;  
