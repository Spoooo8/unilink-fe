import ScrollToTop from "./ScrollToTop";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}