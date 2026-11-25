"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import BrandLogo from "./BrandLogo";
import { ANCHORS, NAV } from "@/lib/content";
import { OFFICIAL_SUPPORT_URL } from "@/lib/sections";
import { scrollToTarget } from "@/lib/scroll";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("overview");
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const burgerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      const specs = document.getElementById("specifications");
      if (specs && specs.getBoundingClientRect().top <= window.innerHeight * 0.45) {
        setActive("specifications");
        return;
      }

      const track = document.getElementById("camera-track");
      if (!track) return;
      if (track.getBoundingClientRect().bottom <= window.innerHeight * 0.35) {
        setActive("");
        return;
      }
      const range = Math.max(1, track.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, (y - track.offsetTop) / range));
      if (progress < (ANCHORS.engineering + ANCHORS.overview) * 0.5) setActive("overview");
      else if (progress < (ANCHORS.imaging + ANCHORS.engineering) * 0.5) setActive("engineering");
      else if (progress < (ANCHORS.technology + ANCHORS.imaging) * 0.5) setActive("imaging");
      else setActive("technology");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 960px)");
    const onChange = () => {
      if (!mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      const frame = requestAnimationFrame(() => {
        const first = sheetRef.current?.querySelector<HTMLElement>("a[href], button:not([disabled])");
        first?.focus({ preventScroll: true });
      });

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          setOpen(false);
          return;
        }
        if (e.key === "Tab") {
          const sheetItems = Array.from(
            sheetRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []
          );
          const focusables = [burgerRef.current, ...sheetItems].filter(
            (el): el is HTMLElement => Boolean(el && el.offsetParent !== null)
          );
          if (!focusables.length) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          const activeEl = document.activeElement as HTMLElement | null;
          if (e.shiftKey) {
            if (!activeEl || !focusables.includes(activeEl) || activeEl === first) {
              e.preventDefault();
              last.focus({ preventScroll: true });
            }
          } else if (!activeEl || !focusables.includes(activeEl) || activeEl === last) {
            e.preventDefault();
            first.focus({ preventScroll: true });
          }
        }
      };

      document.addEventListener("keydown", onKeyDown);
      return () => {
        cancelAnimationFrame(frame);
        document.removeEventListener("keydown", onKeyDown);
      };
    }

    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      if (window.matchMedia("(max-width: 960px)").matches) {
        burgerRef.current?.focus({ preventScroll: true });
      }
    }
  }, [open]);

  const go = (t: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    document.body.style.overflow = "";
    scrollToTarget(t);
  };

  return (
    <header className={`nav ${scrolled || open ? "nav--solid" : ""}`}>
      <div className="nav__inner">
        <a href="#overview" className="nav__brand" onClick={go("overview")} aria-label="Sony Alpha 7 home">
          <BrandLogo size={25} />
        </a>

        <nav className="nav__links" aria-label="Primary">
          {NAV.map((n) => {
            const isActive = active === n.target;
            return (
              <a
                key={n.target}
                href={`#${n.target}`}
                onClick={go(n.target)}
                className={isActive ? "is-active" : ""}
                aria-current={isActive ? "location" : undefined}
              >
                <span>{n.label}</span>
                {isActive && (
                  <motion.span
                    className="nav__indicator"
                    layoutId={reduce ? undefined : "nav-indicator"}
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="nav__actions">
          <a
            href={OFFICIAL_SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav__ext"
          >
            Explore on Sony <span aria-hidden="true">↗</span>
          </a>
          <a href="#final" className="nav__cta" onClick={go("final")}>
            Explore Camera
          </a>
        </div>

        <button
          ref={burgerRef}
          className="nav__burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-sheet"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={open ? "is-open" : ""} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-sheet"
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="nav__sheet"
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reduce ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
          >
            {NAV.map((n, i) => (
              <motion.a
                key={n.target}
                href={`#${n.target}`}
                onClick={go(n.target)}
                initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.2, delay: reduce ? 0 : 0.05 * i }}
              >
                {n.label}
              </motion.a>
            ))}
            <a
              href={OFFICIAL_SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav__sheet-ext"
            >
              Explore on Sony <span aria-hidden="true">↗</span>
            </a>
            <a href="#final" className="nav__cta nav__cta--sheet" onClick={go("final")}>
              Explore Camera
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
