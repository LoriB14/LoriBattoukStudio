import { useEffect, useState, type CSSProperties } from 'react';
import Builder from './Builder';
import Lines from './Lines';
import { Arrow } from './Icons';
import type { ServiceId } from '../data';

const WORDS = ['sell online.', 'take bookings.', 'look sharp.', 'get found.'];

function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % WORDS.length), 2600);
    return () => window.clearInterval(t);
  }, []);
  const prev = (i - 1 + WORDS.length) % WORDS.length;
  return (
    <span className="rotator">
      {WORDS.map((w, n) => (
        <span key={w} className={n === i ? 'on' : n === prev ? 'out' : ''}>
          {w}
        </span>
      ))}
    </span>
  );
}

export default function Hero({ onApply }: { onApply: (ids: ServiceId[], business: string) => void }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setLoaded(true)));
    return () => cancelAnimationFrame(r);
  }, []);

  return (
    <header className={`hero${loaded ? ' loaded' : ''}`} id="top">
      <div className="wrap hero-grid">
        <div>
          <h1>
            <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
              Websites that help small businesses sell online, take bookings, look sharp and get found.
            </span>
            <span aria-hidden="true">
              <Lines lines={['Websites that', 'help small', 'businesses', <Rotator key="r" />]} />
            </span>
          </h1>
          <p className="hero-sub fade-up">
            Custom websites, online stores, online booking and AI assistants, designed and built by one person in Toronto.
          </p>
          <div className="hero-actions fade-up" style={{ ['--d' as string]: '90ms' } as CSSProperties}>
            <a className="btn" href="#contact">
              Start a project <Arrow />
            </a>
            <a className="link" href="#services">See what I build</a>
          </div>
        </div>
        <div className="hero-visual">
          <Builder onApply={onApply} />
        </div>
      </div>
    </header>
  );
}
