import SectionTitle from "../components/SectionTitle.jsx";

export default function About() {
  return (
    <section className="page-shell section-space pt-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionTitle
          label="About"
          title="关于我"
          titleLines={["关于我"]}
          className="mb-0"
        />
        <div>
          <p className="type-lede max-w-3xl">
            我是一名视觉设计师，主要关注汽车广告、美妆视觉、品牌内容和 AIGC 工作流。这些作品记录了我对画面、信息层级和商业落地的阶段性思考。
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {["视觉设计", "广告 KV", "美妆视觉", "汽车视觉", "AIGC 工作流", "后期合成"].map(
              (item) => (
                <div key={item} className="border-t border-[rgba(255,255,255,0.11)] pt-5">
                  <h2 className="text-xl font-medium tracking-[0]">{item}</h2>
                </div>
              ),
            )}
          </div>
          <div className="mt-14 border-t border-[rgba(255,255,255,0.11)] pt-6">
            <p className="section-label">Contact</p>
            <a
              href="mailto:2195984103@qq.com"
              className="mt-4 inline-block text-2xl font-medium transition hover:text-[#f26a1b]"
            >
              2195984103@qq.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
