import "./styles/main.scss";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import { SlideProvider } from "./context/SlideContext"; // Import the SlideProvider
import "./i18n.ts";

const App = () => (
  <SlideProvider>
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  </SlideProvider>
);

export default App;
