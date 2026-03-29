import { useEffect } from "react";

// ─── Custom cursor interaction component
function CustomCursor() {
  useEffect(() => {
    const cursor = document.querySelector("[data-cursor]");
    const anchorElements = document.querySelectorAll("a");
    const buttons = document.querySelectorAll("button");

    if (!cursor) return;

    // ─── Update cursor position
    const handleMouseMove = (event) => {
      setTimeout(() => {
        cursor.style.top = `${event.clientY}px`;
        cursor.style.left = `${event.clientX}px`;
      }, 100);
    };

    // ─── Hover effects
    const hoverActive = () => cursor.classList.add("hovered");
    const hoverDeactive = () => cursor.classList.remove("hovered");

    // ─── Cursor hide / show
    const mouseOutBody = () => cursor.classList.add("disabled");
    const mouseOverBody = () => cursor.classList.remove("disabled");

    document.body.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseout", mouseOutBody);
    document.body.addEventListener("mouseover", mouseOverBody);

    anchorElements.forEach((el) => {
      el.addEventListener("mouseover", hoverActive);
      el.addEventListener("mouseout", hoverDeactive);
    });

    buttons.forEach((btn) => {
      btn.addEventListener("mouseover", hoverActive);
      btn.addEventListener("mouseout", hoverDeactive);
    });

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseout", mouseOutBody);
      document.body.removeEventListener("mouseover", mouseOverBody);

      anchorElements.forEach((el) => {
        el.removeEventListener("mouseover", hoverActive);
        el.removeEventListener("mouseout", hoverDeactive);
      });

      buttons.forEach((btn) => {
        btn.removeEventListener("mouseover", hoverActive);
        btn.removeEventListener("mouseout", hoverDeactive);
      });
    };
  }, []);

  return <div className="cursor" data-cursor></div>;
}

export default CustomCursor;
