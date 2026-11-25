"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal, { CINEMATIC_EASE } from "./Reveal";
import assetsManifest from "@/lib/assets-manifest.json";
import { GALLERY_CATEGORIES, GALLERY_ITEMS, GalleryCategory } from "@/lib/sections";

export default function PhotographyShowcase() {
  const [active, setActive] = useState<GalleryCategory>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const reduce = useReducedMotion();

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const items = active === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === active);

  const activeItem = selectedIndex !== null ? items[selectedIndex] ?? null : null;

  const openLightbox = (index: number, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setSelectedIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    requestAnimationFrame(() => {
      lastTriggerRef.current?.focus({ preventScroll: true });
    });
  }, []);

  const stepLightbox = useCallback(
    (delta: number) => {
      if (items.length === 0) return;
      setSelectedIndex((prev) => {
        if (prev === null) return 0;
        return (prev + delta + items.length) % items.length;
      });
    },
    [items.length]
  );

  // Close lightbox if category filter changes
  useEffect(() => {
    setSelectedIndex(null);
  }, [active]);

  // Keyboard navigation + focus trap inside lightbox without touching body/html overflow
  useEffect(() => {
    if (selectedIndex === null) return;

    const focusTimer = requestAnimationFrame(() => {
      closeBtnRef.current?.focus({ preventScroll: true });
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        stepLightbox(-1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        stepLightbox(1);
        return;
      }
      if (e.key === "Tab") {
        const container = dialogRef.current;
        if (!container) return;
        const focusables = Array.from(
          container.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const current = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (!current || !focusables.includes(current) || current === first) {
            e.preventDefault();
            last.focus({ preventScroll: true });
          }
        } else if (!current || !focusables.includes(current) || current === last) {
          e.preventDefault();
          first.focus({ preventScroll: true });
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedIndex, closeLightbox, stepLightbox]);

  return (
    <section id="photography-showcase" className="sec sec--gallery" aria-labelledby="gallery-title">
      <div className="sec__inner">
        <div className="gallery-head">
          <Reveal>
            <div className="sec__eyebrow-row">
              <p className="eyebrow">Photography Showcase</p>
              <span className="tech-pill">EXIF-Verified Sony ILCE-7</span>
            </div>
            <h2 id="gallery-title" className="h-section">
              Captured on Sony Alpha 7.
            </h2>
            <p className="body">
              Public-domain and Creative Commons photographs with Wikimedia Commons EXIF confirming Sony ILCE-7 capture across landscapes, portraits, night streets, and twilight recovery.
            </p>
          </Reveal>

          <div className="gallery-tabs" role="group" aria-label="Filter showcase by photography category">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`tab-btn ${active === cat ? "is-active" : ""}`}
                aria-pressed={active === cat}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={reduce ? { duration: 0 } : { duration: 0.28, ease: CINEMATIC_EASE }}
            className={`gallery-grid ${active !== "All" ? "gallery-grid--single" : ""}`}
          >
            {items.map((item, idx) => (
              <figure
                key={item.id}
                className={`gallery-card ${item.featured && active === "All" ? "gallery-card--wide" : ""}`}
              >
                <button
                  type="button"
                  className="gallery-card__trigger"
                  onClick={(e) => openLightbox(idx, e.currentTarget)}
                  aria-label={`Inspect ${item.title} (${item.category}, ${item.exif}) in lightbox`}
                >
                  <div className="gallery-card__media">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={1600}
                      height={1000}
                      loading="lazy"
                      sizes={
                        item.featured || active !== "All"
                          ? "(max-width: 900px) 100vw, 60vw"
                          : "(max-width: 900px) 100vw, 38vw"
                      }
                      className="gallery-card__img"
                    />
                    <span className="gallery-card__cat">{item.category}</span>
                    <span className="gallery-card__inspect" aria-hidden="true">Inspect</span>
                  </div>
                </button>
                <figcaption className="gallery-card__cap">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.caption}</p>
                  </div>
                  <div className="gallery-card__right">
                    <span className="gallery-card__meta">{item.exif}</span>
                    <span className="gallery-card__credit">{item.credit}</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="provenance-wrap">
          <button
            type="button"
            className="provenance-toggle"
            aria-expanded={creditsOpen}
            aria-controls="asset-provenance-panel"
            onClick={() => setCreditsOpen((v) => !v)}
          >
            <span>Asset Provenance &amp; Verified Licenses ({assetsManifest.assets.length} local assets)</span>
            <span aria-hidden="true">{creditsOpen ? "−" : "+"}</span>
          </button>

          {creditsOpen && (
            <div id="asset-provenance-panel" className="provenance-panel">
              <div className="provenance-table-wrap">
                <table className="provenance-table">
                  <thead>
                    <tr>
                      <th scope="col">Asset</th>
                      <th scope="col">Section</th>
                      <th scope="col">Creator</th>
                      <th scope="col">Verified Hardware / EXIF</th>
                      <th scope="col">License</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetsManifest.assets.map((asset) => (
                      <tr key={asset.id}>
                        <td><code>{asset.path}</code></td>
                        <td>{asset.section}</td>
                        <td>
                          {asset.sourceUrl ? (
                            <a href={asset.sourceUrl} target="_blank" rel="noopener noreferrer" className="provenance-link">
                              {asset.creator} ↗
                            </a>
                          ) : (
                            asset.creator
                          )}
                        </td>
                        <td>{asset.cameraModel}{asset.exifSummary ? ` · ${asset.exifSummary}` : ""}</td>
                        <td>{asset.license}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {activeItem && selectedIndex !== null && (
          <motion.div
            ref={dialogRef}
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.22 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            <motion.div
              className="lightbox__panel"
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 6 }}
              transition={reduce ? { duration: 0 } : { duration: 0.26, ease: CINEMATIC_EASE }}
            >
              <div className="lightbox__bar">
                <span className="tech-tag">
                  {activeItem.category} · {selectedIndex + 1} / {items.length}
                </span>
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="lightbox__close"
                  onClick={closeLightbox}
                  aria-label="Close lightbox"
                >
                  Close (Esc)
                </button>
              </div>

              <div className="lightbox__media">
                <Image
                  key={activeItem.id}
                  src={activeItem.src}
                  alt={activeItem.alt}
                  width={1600}
                  height={1000}
                  priority
                  sizes="90vw"
                  className="lightbox__img"
                />
              </div>

              <div className="lightbox__footer">
                <div className="lightbox__info">
                  <h3 id="lightbox-title">{activeItem.title}</h3>
                  <p className="body">{activeItem.caption}</p>
                  <p className="lightbox__meta">
                    <strong>{activeItem.meta}</strong> · EXIF: {activeItem.exif}
                  </p>
                  <p className="lightbox__credit">
                    {activeItem.credit} ·{" "}
                    <a
                      href={activeItem.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="provenance-link"
                    >
                      Wikimedia Commons Source ({activeItem.license}) ↗
                    </a>
                  </p>
                </div>

                <div className="lightbox__nav">
                  <button
                    type="button"
                    className="tab-btn"
                    onClick={() => stepLightbox(-1)}
                    aria-label="Previous photograph"
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    className="tab-btn"
                    onClick={() => stepLightbox(1)}
                    aria-label="Next photograph"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
