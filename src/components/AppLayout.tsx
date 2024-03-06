import React from "react";
import { Navbar, Drawer } from ".";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Drawer />
    </>
  );
}

export default AppLayout;
