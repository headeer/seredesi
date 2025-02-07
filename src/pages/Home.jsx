import React from "react";

import Navigation from "../components/Navigation";
import SliderSection from "../components/SliderSection";
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};
const Home = () => {
  const isMobile = useIsMobile();

  return (
    <div className="home">
      <section className="center">
        <Navigation />
        <SliderSection />
      </section>
    </div>
  );
};

export default Home;
