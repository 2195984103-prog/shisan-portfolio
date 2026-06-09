import { Link } from "react-router-dom";

const styles = {
  dark:
    "border-[rgba(255,255,255,0.16)] bg-[#151515] text-white hover:border-[#f26a1b] hover:bg-[#f26a1b] hover:text-[#090909]",
  light:
    "border-[rgba(255,255,255,0.25)] bg-[rgba(255,255,255,0.06)] text-white hover:border-[rgba(255,255,255,0.4)] hover:bg-[rgba(255,255,255,0.1)]",
  outline:
    "border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] text-white hover:border-[rgba(255,255,255,0.25)] hover:bg-[rgba(255,255,255,0.08)]",
  text: "border-transparent bg-transparent px-0 text-white/75 hover:text-[#f26a1b]",
};

export default function Button({
  children,
  to,
  href,
  variant = "dark",
  className = "",
  ...props
}) {
  const classes = [
    "focus-ring ui-nowrap inline-flex min-h-11 items-center justify-center rounded-[10px] border px-4 py-3 text-[11px] font-medium uppercase tracking-[0.08em] transition duration-300 sm:px-5 sm:text-xs sm:tracking-[0.1em]",
    styles[variant],
    className,
  ].join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
