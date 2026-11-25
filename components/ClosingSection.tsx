"use client";
import Image from "next/image";
import BrandLogo from "./BrandLogo";
import Reveal from "./Reveal";
import {
  DISCLAIMER_TEXT,
  FOOTER_LINKS,
  OFFICIAL_SPECS_URL,
  OFFICIAL_SUPPORT_URL,
} from "@/lib/sections";
import { scrollToTarget } from "@/lib/scroll";

export default function ClosingSection() {
  const go = (target: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToTarget(target);
  };

  return (
    <section id="closing" className="closing" aria-labelledby="closing-title">
      <div className="closing__glow" aria-hidden="true" />

      <div className="closing__inner">
        <Reveal className="closing__copy">
          <p className="eyebrow">Sony Alpha 7 · ILCE-7 &amp; FE 28–70mm</p>
          <h2 id="closing-title" className="h-display h-display--md">
            Every moment deserves to be seen.
          </h2>
          <p className="sub">Full-frame clarity. Engineered to endure.</p>

          <div className="cta-row">
            <a
              className="btn btn--primary"
              href={OFFICIAL_SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore on Sony <span aria-hidden="true">↗</span>
            </a>
            <a
              className="btn btn--ghost"
              href={OFFICIAL_SPECS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Official Specifications <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="closing__media">
          <Image
            src="/images/closing-exploded.webp"
            alt="Exploded technical profile of the Sony Alpha 7 camera and FE 28-70mm lens"
            width={1376}
            height={768}
            loading="lazy"
            sizes="(max-width: 900px) 100vw, 78vw"
            className="closing__img"
          />
        </Reveal>

        <footer className="site-footer" aria-label="Site footer">
          <div className="site-footer__top">
            <a href="#overview" className="nav__brand" onClick={go("overview")} aria-label="Sony Alpha 7 back to top">
              <BrandLogo size={26} />
            </a>

            <nav className="site-footer__nav" aria-label="Footer sections">
              {FOOTER_LINKS.map((link) => (
                <a key={link.target} href={`#${link.target}`} onClick={go(link.target)}>
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="site-footer__ext" aria-label="Official Sony resources">
              <a href={OFFICIAL_SUPPORT_URL} target="_blank" rel="noopener noreferrer">
                Explore on Sony ↗
              </a>
              <a href={OFFICIAL_SPECS_URL} target="_blank" rel="noopener noreferrer">
                Official Specifications ↗
              </a>
            </div>
          </div>

          <div className="site-footer__bottom">
            <p className="site-footer__disclaimer">{DISCLAIMER_TEXT}</p>
            <p className="site-footer__legal">
              Sony and α are trademarks of Sony Group Corporation. Gallery captures verified SONY ILCE-7 via Wikimedia Commons (CC0 1.0, CC BY 2.0, CC BY-SA 4.0); see{" "}
              <a href="#photography-showcase" onClick={go("photography-showcase")} className="provenance-link">
                Asset Provenance
              </a>{" "}
              for full credits and hardware EXIF.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
