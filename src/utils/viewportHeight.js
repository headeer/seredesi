// Function to update the viewport height CSS variable
export const updateViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

// Initialize and add event listener
export const initViewportHeight = () => {
  updateViewportHeight();

  // Update on resize and orientation change
  window.addEventListener("resize", updateViewportHeight);
  window.addEventListener("orientationchange", updateViewportHeight);

  // Clean up function
  return () => {
    window.removeEventListener("resize", updateViewportHeight);
    window.removeEventListener("orientationchange", updateViewportHeight);
  };
};
