import Image from "next/image";
import Reveal from "./Reveal";
import ParallaxFrame from "./ParallaxFrame";
import { CREATOR_SPECS } from "@/lib/sections";

export default function CreatorsSection() {
  return (
    <section id="designed-for-creators" className="sec sec--creators" aria-labelledby="creators-title">
      <div className="sec__inner">
        <div className="creators-layout">
          <Reveal className="creators-media">
            <ParallaxFrame aspectClass="media-frame--tall">
              <Image
                src="/images/creators-field.webp"
                alt="Photographer outdoors framing a shot with a matte black Sony Alpha mirrorless camera"
                width={1600}
                height={978}
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 56vw"
                className="media-img"
              />
            </ParallaxFrame>
            <p className="media-credit">
              Editorial field photography: Warren Wong (CC0 1.0, Wikimedia Commons — depicts Sony Alpha body handling)
            </p>
          </Reveal>

          <Reveal delay={0.08} className="creators-copy">
            <div className="sec__eyebrow-row">
              <p className="eyebrow">Designed for Creators</p>
              <span className="tech-pill">416 g Body · Magnesium Alloy</span>
            </div>
            <h2 id="creators-title" className="h-section">
              Your vision. Without limits.
            </h2>
            <p className="body">
              Engineered at roughly half the weight of traditional full-frame DSLRs, the Alpha 7 pairs a tilting 3.0-inch LCD, high-contrast XGA OLED Tru-Finder, and direct manual controls for composed studio sets or fast street work.
            </p>
            <ul className="points">
              <li>Tilting 3.0&quot; LCD monitor (up approx. 90°, down approx. 45°)</li>
              <li>0.71x magnification OLED electronic viewfinder</li>
              <li>Built-in Wi-Fi and NFC for instant transfer</li>
            </ul>

            <dl className="creators-specs">
              {CREATOR_SPECS.map((s) => (
                <div key={s.label} className="creators-spec">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
