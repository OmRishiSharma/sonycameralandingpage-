import Image from "next/image";
import Reveal from "./Reveal";
import ParallaxFrame from "./ParallaxFrame";
import { IMAGING_PILLARS } from "@/lib/sections";

export default function ImagingTechnology() {
  return (
    <section id="imaging-showcase" className="sec sec--imaging" aria-labelledby="imaging-title">
      <div className="sec__inner">
        <Reveal className="sec__head">
          <div className="sec__eyebrow-row">
            <p className="eyebrow">Imaging Technology</p>
            <span className="tech-pill">ILCE-7 · Exmor CMOS</span>
          </div>
          <h2 id="imaging-title" className="h-section">
            Full-frame light, rendered without compromise.
          </h2>
          <p className="body">
            From subtle highlights to deep obsidian shadows, the 35mm Exmor CMOS sensor and BIONZ X processor translate fleeting light into rich, high-resolution detail.
          </p>
        </Reveal>

        <div className="pillars">
          {IMAGING_PILLARS.map((item, idx) => (
            <Reveal key={item.eyebrow} className={`pillar ${idx % 2 === 1 ? "pillar--rev" : ""}`} delay={0.05 * idx}>
              <div className="pillar__media">
                <ParallaxFrame aspectClass="media-frame--tall">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={1440}
                    height={960}
                    loading="lazy"
                    sizes="(max-width: 900px) 100vw, 54vw"
                    className="media-img"
                  />
                </ParallaxFrame>
                {"credit" in item && item.credit && <p className="media-credit">{item.credit}</p>}
              </div>

              <div className="pillar__copy">
                <span className="pillar__index" aria-hidden="true">0{idx + 1}</span>
                <p className="eyebrow">{item.eyebrow}</p>
                <h3 className="h-sub">{item.title}</h3>
                <p className="body">{item.body}</p>
                <dl className="stat-list">
                  {item.stats.map((s) => (
                    <div key={s.label}>
                      <dt>{s.label}</dt>
                      <dd>{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
