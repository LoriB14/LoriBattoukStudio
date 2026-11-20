import Lenis from 'lenis';

const reduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('static');
const clamp = (n: number) => Math.min(1, Math.max(0, n));

let lenis: Lenis | null = null;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -20, duration: 1.2 });
  else el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth' });
}

/** Smooth scroll, reveal-on-enter, and the scroll-linked effects. Returns cleanup. */
export function startMotion(): () => void {
  const cleanups: (() => void)[] = [];

  // Reveal: add .is-in once an element enters
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -12% 0px' },
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());

  if (reduced()) return () => cleanups.forEach((c) => c());

  lenis = new Lenis({ duration: 1.15, anchors: { offset: -20 } });
  let raf = 0;
  const loop = (t: number) => {
    lenis?.raf(t);
    update();
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  cleanups.push(() => {
    cancelAnimationFrame(raf);
    lenis?.destroy();
    lenis = null;
  });

  const panels = Array.from(document.querySelectorAll<HTMLElement>('.panel-s'));
  const steps = document.querySelector<HTMLElement>('.steps');
  const about = document.querySelector<HTMLElement>('.about-photo');

  function update() {
    const vh = window.innerHeight;
    const wide = window.innerWidth > 980;

    // Stacking panels: each one shrinks and dims as the next slides over it
    panels.forEach((p, i) => {
      const next = panels[i + 1];
      if (!wide || !next) {
        p.style.setProperty('--p', '0');
        return;
      }
      const r = p.getBoundingClientRect();
      const nr = next.getBoundingClientRect();
      p.style.setProperty('--p', clamp((r.bottom - nr.top) / r.height).toFixed(3));
    });

    // Process line draws as the steps scroll through
    if (steps) {
      const r = steps.getBoundingClientRect();
      steps.style.setProperty('--p', clamp((vh * 0.9 - r.top) / (vh * 0.6)).toFixed(3));
    }

    // About photo drifts slightly against the scroll
    if (about) {
      const r = about.getBoundingClientRect();
      about.style.setProperty('--py', ((r.top + r.height / 2 - vh / 2) * -0.08).toFixed(1));
    }
  }

  return () => cleanups.forEach((c) => c());
}
