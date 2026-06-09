import { useEffect, useState, useCallback } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "作品", to: "/work" },
  { label: "关于", to: "/about" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const isProjectDetail =
    pathname.startsWith("/project/") || pathname.startsWith("/projects/");
  const isImmersiveTop = (isHome || isProjectDetail) && !scrolled;
  const isLightHomeTop = false;

  const goToContact = useCallback((e) => {
    e.preventDefault();
    if (isHome) {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      // After navigation, scroll to contact
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [isHome, navigate]);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 18);

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolled);
  }, [pathname]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-2xl transition-[background-color,border-color,box-shadow] duration-300",
        isLightHomeTop ? "border-black/5 bg-transparent text-[#090909]" : "",
        isImmersiveTop && !isLightHomeTop ? "border-white/10 bg-transparent text-white" : "",
        !isImmersiveTop
          ? "border-[rgba(255,255,255,0.1)] bg-[rgba(8,8,8,0.92)] text-white shadow-[0_8px_24px_rgba(0,0,0,0.32)]"
          : "",
      ].join(" ")}
    >
      <div className="page-shell flex h-16 items-center justify-between gap-3">
        <NavLink
          to="/"
          className="focus-ring flex shrink-0 items-center gap-1.5 rounded-[10px] text-[9px] font-semibold uppercase tracking-[0.13em] sm:gap-3 sm:text-xs sm:tracking-[0.2em]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#f26a1b] sm:h-2 sm:w-2" />
          <span className="ui-nowrap">Shisan Portfolio</span>
        </NavLink>
        <nav
          className={[
            "flex min-w-0 items-center justify-end gap-0.5 rounded-xl border p-1 text-[8px] tracking-[0.04em] sm:w-auto sm:justify-start sm:gap-1 sm:text-sm sm:tracking-[0.08em]",
            isImmersiveTop
              ? isLightHomeTop
                ? "border-black/10 bg-black/[0.03]"
                : "border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.1)]"
              : "border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.06)]",
          ].join(" ")}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "focus-ring ui-nowrap rounded-lg px-1.5 py-2 transition sm:px-4",
                  isActive ? "bg-[#f26a1b] text-[#090909] shadow-sm" : "",
                  !isActive && isLightHomeTop
                    ? "text-black/60 hover:bg-black/[0.06] hover:text-black"
                    : "",
                  !isActive && isImmersiveTop && !isLightHomeTop
                    ? "text-white/70 hover:bg-[rgba(255,255,255,0.1)] hover:text-white"
                    : "",
                  !isActive && !isImmersiveTop
                    ? "text-white/60 hover:bg-[rgba(255,255,255,0.1)] hover:text-white"
                    : "",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href="/#contact"
            onClick={goToContact}
            className={[
              "focus-ring ui-nowrap rounded-lg px-1.5 py-2 transition sm:px-4",
              isLightHomeTop
                ? "text-black/60 hover:bg-black/[0.06] hover:text-black"
                : isImmersiveTop
                ? "text-white/70 hover:bg-[rgba(255,255,255,0.1)] hover:text-white"
                : "text-white/60 hover:bg-[rgba(255,255,255,0.1)] hover:text-white",
            ].join(" ")}
          >
            联系
          </a>
        </nav>
      </div>
    </header>
  );
}
