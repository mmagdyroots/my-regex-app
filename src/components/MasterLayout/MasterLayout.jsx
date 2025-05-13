import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const MasterLayout = () => {
  return (
    <>
      <Navbar/>
      <Outlet />
    </>
  )
};

export default MasterLayout;