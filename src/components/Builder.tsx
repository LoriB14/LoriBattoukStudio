import { useEffect, useRef, useState } from 'react';
import { SERVICES, SERVICE_ORDER, type ServiceId } from '../data';
import { Arrow, Tick } from './Icons';

const AUTOPLAY: ServiceId[] = ['store', 'booking', 'assistant'];

export default function Builder({ onApply }: { onApply: (ids: ServiceId[], business: string) => void }) {
  const [still] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('static'),
  );
  const [on, setOn] = useState<ServiceId[]>(() => (still ? ['website', ...AUTOPLAY] : ['website']));
  const touched = useRef(false);

  // Build the site up on its own until the visitor takes over
  useEffect(() => {
    if (still) return;
    const timers = AUTOPLAY.map((id, i) =>
      window.setTimeout(() => {
        if (!touched.current) setOn((o) => (o.includes(id) ? o : [...o, id]));
      }, 1500 + i * 1300),
    );
    return () => timers.forEach(clearTimeout);
  }, [still]);

  const toggle = (id: ServiceId) => {
    if (id === 'website') return;
    touched.current = true;
    setOn((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));
  };
  const has = (id: ServiceId) => on.includes(id);

  return (
    <div className="builder">
      <div className="bw">
        <div className="browser-bar">
          <i />
          <i />
          <i />
          <div className="url">copperandstem.ca</div>
          <span className="sample">SAMPLE</span>
        </div>
        <div className="bsite" aria-hidden="true">
          <div className="bnav">
            <b>Copper &amp; Stem</b>
            <span>
              <i>About</i>
              <i className={`navx${has('store') ? ' show' : ''}`}>Shop</i>
              <i className={`navx${has('booking') ? ' show' : ''}`}>Book</i>
            </span>
          </div>
          <div className="bhero">
            <h4>Flowers for every Tuesday.</h4>
            <p>Seasonal bouquets, wrapped by hand in the east end.</p>
          </div>

          <div className={`grow${has('store') ? ' open' : ''}`}>
            <div className="grow-in">
              <div className="bshop">
                {[
                  ['Market bunch', 'Add to cart', 'var(--mandarin)'],
                  ['Dried wreath', 'Add to cart', 'var(--crest)'],
                  ['Weekly flowers', 'Subscribe', 'var(--forest-3)'],
                ].map(([n, p, c]) => (
                  <div key={n}>
                    <span style={{ background: c }} />
                    <b>{n}</b>
                    <small>{p}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`grow${has('booking') ? ' open' : ''}`}>
            <div className="grow-in">
              <div className="bbook">
                <b>Book a wreath workshop</b>
                <div>
                  <span>Sat 10:00</span>
                  <span className="sel">Sat 1:00</span>
                  <span>Sun 11:00</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`bbot${has('assistant') ? ' show' : ''}`}>
            <span className="bdot" />
            Looking for a gift? I can help you pick.
          </div>
        </div>
      </div>

      <div className="bcontrols" role="group" aria-label="Choose what your site includes">
        {SERVICE_ORDER.map((id) => (
          <button key={id} type="button" className={`btog${has(id) ? ' on' : ''}`} aria-pressed={has(id)} disabled={id === 'website'} onClick={() => toggle(id)}>
            <span className="box">{has(id) && <Tick size={12} />}</span>
            {SERVICES[id].name}
          </button>
        ))}
      </div>
      <button type="button" className="btn light bapply" onClick={() => onApply(on, '')}>
        Start a project with these <Arrow />
      </button>
    </div>
  );
}
