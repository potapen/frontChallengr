import { Outlet } from "react-router";
import NavBar from "./NavBar";
import "./Layout.css";

function Layout() {
  return (
    <>
      <NavBar />
      <div className="separator"></div>
      <Outlet />
    </>
  );
}

export default Layout;
