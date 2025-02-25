import "./styles/main.scss";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import { SlideProvider } from "./context/SlideContext";
import "./i18n.ts";
import Travels from "./pages/Travels.jsx";
import Egypt from "./pages/Egypt.jsx";
import Loader from "./components/Loader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SlideProvider>
      <Router>
        <div className="app">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/travels" element={<Travels />} />
                <Route path="/egypt" element={<Egypt />} />
              </Routes>
            </>
          )}
        </div>
      </Router>
    </SlideProvider>
  );
};

export default App;
