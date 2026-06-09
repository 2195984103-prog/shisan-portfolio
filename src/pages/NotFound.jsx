import Button from "../components/Button.jsx";
import DisplayTitle from "../components/DisplayTitle.jsx";

export default function NotFound() {
  return (
    <section className="page-shell section-space pt-32">
      <div className="title-stack">
        <p className="section-label title-eyebrow">404</p>
        <DisplayTitle as="h1" size="page" lines={["页面不存在"]} />
      </div>
      <Button to="/" className="mt-10">
        返回首页
      </Button>
    </section>
  );
}
