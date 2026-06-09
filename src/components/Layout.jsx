import { useLocation } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal.js";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

export default function Layout({ children }) {
  const location = useLocation();
  useScrollReveal(location.pathname);

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />
      <main key={location.pathname} className="page-enter">
        {children}
      </main>
      <Footer />
    </div>
  );
}
