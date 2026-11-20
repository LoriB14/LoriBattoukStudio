import Lines from './Lines';

const STEPS = [
  { t: 'A free call', d: 'We talk about your business, your customers and what the site needs to do.' },
  { t: 'Design first', d: 'You see and approve the design before anything gets built.' },
  { t: 'Build', d: 'I build it, connect payments and booking, and test it on real phones.' },
  { t: 'Launch', d: 'Your site goes live and I show you how to update it yourself.' },
];

export default function Process() {
  return (
    <section id="process" className="section process" aria-labelledby="process-h">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <h2 id="process-h">
            <Lines lines={['From first call', <>to <span className="hl">launch.</span></>]} />
          </h2>
          <p className="fade-up">Four steps, and you see the design before a single line of code is written.</p>
        </div>
        <div className="steps" role="list">
          <span className="track" aria-hidden="true">
            <i />
          </span>
          {STEPS.map((s, i) => (
            <div key={s.t} className="step" role="listitem" data-reveal>
              <span className="n fade-up" style={{ ['--d' as string]: `${i * 90}ms` }} aria-hidden="true">
                {i + 1}
              </span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
