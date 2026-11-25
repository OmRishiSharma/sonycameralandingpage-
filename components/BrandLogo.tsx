import { useId } from "react";

type EmblemProps = {
  size?: number;
  className?: string;
};

/**
 * Custom vector emblem combining a segmented E-mount bayonet ring, subtle radial
 * cobalt/cyan optical coating sheen, and a precision geometric Alpha (α) ribbon.
 */
export function AlphaEmblem({ size = 26, className = "" }: EmblemProps) {
  const uid = useId().replace(/:/g, "");
  const bgId = `a7-bg-${uid}`;
  const strokeId = `a7-st-${uid}`;
  const glowId = `a7-gl-${uid}`;
  const alphaId = `a7-al-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={`brand-emblem ${className}`.trim()}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={bgId} x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#11141c" />
          <stop offset="55%" stopColor="#07080c" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
        <linearGradient id={strokeId} x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="55%" stopColor="#00d6ff" stopOpacity="0.52" />
          <stop offset="100%" stopColor="#0050ff" stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0050ff" stopOpacity="0.28" />
          <stop offset="70%" stopColor="#00d6ff" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#050505" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={alphaId} x1="9" y1="12" x2="31" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="58%" stopColor="#cfe2ff" />
          <stop offset="100%" stopColor="#00d6ff" />
        </linearGradient>
      </defs>

      <rect x="1.5" y="1.5" width="37" height="37" rx="9.5" fill={`url(#${bgId})`} stroke={`url(#${strokeId})`} strokeWidth="1.25" />
      <circle cx="20" cy="20" r="14.5" fill={`url(#${glowId})`} />
      <circle cx="20" cy="20" r="13.75" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="0.9" strokeDasharray="32 6 8 6" />
      <circle cx="20" cy="6.25" r="0.9" fill="#00d6ff" fillOpacity="0.75" />

      <path
        d="M 28.5 13.8 C 26.4 19.6, 22.8 27.1, 16.4 27.1 C 11.8 27.1, 9.5 24.1, 9.5 20 C 9.5 15.8, 11.9 12.9, 16.5 12.9 C 22.2 12.9, 24.3 21.8, 27.6 25.5 C 28.5 26.5, 29.6 26.7, 30.8 26.2"
        stroke={`url(#${alphaId})`}
        strokeWidth="2.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type LockupProps = {
  size?: number;
};

export default function BrandLogo({ size = 26 }: LockupProps) {
  return (
    <span className="brand-lockup">
      <AlphaEmblem size={size} />
      <span className="brand-lockup__text">
        <span className="nav__sony">Sony</span>
        <span className="brand-lockup__sep" aria-hidden="true" />
        <span className="nav__mark">
          <span className="nav__alpha">α</span>7
        </span>
      </span>
    </span>
  );
}
