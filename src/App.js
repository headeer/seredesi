import "./styles/main.scss";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import { SlideProvider } from "./context/SlideContext";
import "./i18n.ts";
import Travels from "./pages/Travels.jsx";
import Loader from "./components/Loader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SlideProvider>
      <Router>
        <div className="app">
          {isLoading ? (
            <Loader duration={1500} />
          ) : (
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/travels" element={<Travels />} />
              </Routes>
            </>
          )}
        </div>
      </Router>
    </SlideProvider>
  );
};

export default App;
