import { Outlet } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

function RouterWrapper() {
  return (
    <>
      <ScrollReveal />
      <Outlet />
    </>
  );
}

export default RouterWrapper;
