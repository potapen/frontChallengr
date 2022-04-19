import { Outlet } from "react-router";
import NavBar from "./NavBar";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default Layout;
