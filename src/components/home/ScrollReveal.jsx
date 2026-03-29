import { useEffect } from "react";

// ─── Scroll-based reveal animation controller
function ScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll("[data-reveal]");

    const scrollReveal = () => {
      revealElements.forEach((el) => {
        const elementIsInScreen =
          el.getBoundingClientRect().top < window.innerHeight / 1.15;

        if (elementIsInScreen) {
          el.classList.add("revealed");
        } else {
          el.classList.remove("revealed");
        }
      });
    };

    window.addEventListener("scroll", scrollReveal);

    // run once on load
    scrollReveal();

    return () => {
      window.removeEventListener("scroll", scrollReveal);
    };
  }, []);

  return null;
}

export default ScrollReveal;
