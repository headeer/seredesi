import React, { createContext, useContext, useState } from "react";

const SlideContext = createContext();

export const SlideProvider = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <SlideContext.Provider value={{ currentSlide, setCurrentSlide }}>
      {children}
    </SlideContext.Provider>
  );
};

export const useSlide = () => useContext(SlideContext);
