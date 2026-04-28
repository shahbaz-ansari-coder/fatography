import { Outlet } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import CustomCursor from "./CustomCursor";

function RouterWrapper() {
  return (
    <>
      <ScrollReveal />
      <CustomCursor />
      <Outlet />
    </>
  );
}

export default RouterWrapper;
