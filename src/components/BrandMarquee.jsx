import { partnerBrands } from "../data/brands.js";

export default function BrandMarquee() {
  const marqueeGroups = [partnerBrands, partnerBrands];

  return (
    <section className="brand-marquee-section motion-section motion-brands" aria-labelledby="brand-marquee-title">
      <div className="page-shell">
        <div className="brand-marquee-heading">
          <p className="section-label">Trusted By</p>
          <h2 id="brand-marquee-title" className="type-section-title">
            合作品牌
          </h2>
        </div>
      </div>

      <div className="brand-marquee" aria-label="合作品牌 logo">
        <div className="brand-marquee-track">
          {marqueeGroups.map((group, groupIndex) => (
            <div className="brand-marquee-group" aria-hidden={groupIndex > 0} key={groupIndex}>
              {group.map((brand) => (
                <div className="brand-logo-item" key={`${groupIndex}-${brand.logo}`}>
                  <img src={brand.logo} alt={brand.name} loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
