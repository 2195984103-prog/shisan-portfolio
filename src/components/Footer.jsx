export default function Footer() {
  return (
    <footer className="hairline bg-[#080808]">
      <div className="page-shell flex flex-col gap-6 py-10 text-sm leading-7 text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.1em]">
          Visual Designer Portfolio
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a
            href="mailto:2195984103@qq.com"
            className="transition hover:text-[#f26a1b]"
          >
            2195984103@qq.com
          </a>
          <span>WeChat: Z0ZMar17</span>
        </div>
      </div>
    </footer>
  );
}
