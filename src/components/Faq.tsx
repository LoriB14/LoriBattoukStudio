import { useState } from 'react';
import Lines from './Lines';
import FAQ from '../faq.json';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section" aria-labelledby="faq-h">
      <div className="wrap faq">
        <div className="section-head" data-reveal>
          <h2 id="faq-h">
            <Lines lines={['Questions,', <span className="hl" key="a">answered.</span>]} />
          </h2>
          <p className="fade-up">The things small-business owners in Toronto and the GTA ask me most.</p>
        </div>
        <div className="faq-list">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item${isOpen ? ' open' : ''}`} key={f.q}>
                <h3>
                  <button type="button" aria-expanded={isOpen} aria-controls={`faq-a-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                    {f.q}
                    <span className="pm" aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
