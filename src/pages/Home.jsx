import React from "react";
import Navigation from "../components/Navigation";
import SliderSection from "../components/SliderSection";
import { useSlide } from "../context/SlideContext";
const Home = () => {
  const { currentSlide } = useSlide();

  return (
    <div className={`home home-${currentSlide}`}>
      <section className="center">
        <Navigation />
        <SliderSection />
      </section>
    </div>
  );
};

export default Home;
