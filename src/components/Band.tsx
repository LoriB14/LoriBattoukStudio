const WORDS = ['Clinics', 'Portfolios', 'Restaurants', 'Custom-made websites', 'Salons'];

function Star() {
  return (
    <svg className="star" width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
      <path d="M15 2v26M2 15h26M5.8 5.8l18.4 18.4M24.2 5.8 5.8 24.2" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}

function Row({ hidden }: { hidden?: boolean }) {
  // Two passes per row so the band stays full on wide screens
  const items = [...WORDS, ...WORDS];
  return (
    <ul aria-hidden={hidden || undefined}>
      {items.map((w, i) => (
        <li key={i}>
          {w}
          <Star />
        </li>
      ))}
    </ul>
  );
}

export default function Band() {
  return (
    <div className="band" aria-label="Clinics, portfolios, restaurants, custom-made websites and salons">
      <div className="band-track">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
