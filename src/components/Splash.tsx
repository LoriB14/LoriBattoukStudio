import { useEffect, useState, type CSSProperties } from 'react';
import LogoMark from './LogoMark';
import { Arrow } from './Icons';

const LETTERS = "LORI'S WORLD".split('');

type Phase = 'in' | 'ready' | 'out' | 'gone';

export default function Splash() {
  const [phase, setPhase] = useState<Phase>('in');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('gone');
      return;
    }
    const t = window.setTimeout(() => setPhase('ready'), 1500);
    return () => window.clearTimeout(t);
  }, []);

  const enter = () => {
    setPhase('out');
    window.setTimeout(() => setPhase('gone'), 650);
  };

  if (phase === 'gone') return null;

  return (
    <div className={`splash${phase === 'out' ? ' splash-exit' : ''}`} aria-hidden="true">

      {/* Expanding pulse rings behind the globe */}
      <div className="sp-rings" aria-hidden="true">
        <div className="sp-ring sp-ring-1" />
        <div className="sp-ring sp-ring-2" />
        <div className="sp-ring sp-ring-3" />
      </div>

      <div className="splash-inner">
        <div className="splash-globe-wrap">

          {/* Glow behind globe */}
          <div className="sp-glow" />

          {/* Globe SVG */}
          <LogoMark size={160} color="var(--crest)" animated />

          {/* Orbiting ring */}
          <svg className="sp-orbit" viewBox="-108 -32 216 64" aria-hidden="true">
            <ellipse cx="0" cy="0" rx="104" ry="28" fill="none" stroke="var(--crest)"
              strokeWidth="1.2" strokeDasharray="7 5" strokeLinecap="round"
              className="sp-orbit-ellipse" />
          </svg>

          {/* Orbital dot */}
          <div className="sp-dot" />
        </div>

        {/* Wordmark */}
        <div className="splash-name">
          {LETTERS.map((ch, i) => (
            <span key={i} className="splash-ch" style={{ '--si': i } as CSSProperties}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </div>

        <p className="splash-sub">Web Design · Toronto</p>
      </div>

      {/* Click to enter */}
      <button
        className={`splash-enter${phase === 'ready' ? ' sp-enter-show' : ''}`}
        onClick={enter}
      >
        Enter site <Arrow />
      </button>
    </div>
  );
}
