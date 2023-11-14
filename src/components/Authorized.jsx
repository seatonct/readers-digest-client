import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "./Navbar";

export const Authorized = () => {
  if (localStorage.getItem("digest_token")) {
    return (
      <>
        <main className="p-4">
          <NavBar />
          <Outlet />
        </main>
      </>
    );
  }
  return <Navigate to="/login" replace />;
};
