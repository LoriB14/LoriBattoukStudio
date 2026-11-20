/** Placeholder cartoon portrait until Lori's own picture arrives. */
const CX = 200;
const CY = 222;
const deg = (d: number) => (d * Math.PI) / 180;

type Curl = { x: number; y: number; r: number; hl: boolean };

function ring(from: number, to: number, steps: number, rx: number, ry: number, r: number, cy = CY): Curl[] {
  return Array.from({ length: steps }, (_, i) => {
    const a = deg(from + ((to - from) * i) / (steps - 1));
    return { x: CX + rx * Math.cos(a), y: cy + ry * Math.sin(a), r: r + (i % 3 === 0 ? 4 : i % 2 ? -2 : 1), hl: i % 3 === 1 };
  });
}

const BACK: Curl[] = [
  ...ring(150, 390, 24, 108, 122, 30),
  ...[270, 300, 330, 358].flatMap((y, i) => [
    { x: 108 - (i % 2) * 6, y, r: 27, hl: i % 2 === 0 },
    { x: 292 + (i % 2) * 6, y, r: 27, hl: i % 2 === 1 },
  ]),
];
const FRONT: Curl[] = ring(200, 340, 9, 80, 92, 21, 214);

function Curls({ list, base, dark }: { list: Curl[]; base: string; dark: string }) {
  return (
    <>
      {list.map((c, i) => (
        <g key={i}>
          <circle cx={c.x} cy={c.y} r={c.r} fill={base} />
          {c.hl && <circle cx={c.x - c.r * 0.25} cy={c.y - c.r * 0.25} r={c.r * 0.55} fill="#d8ad68" />}
          <path d={`M${c.x - c.r * 0.45} ${c.y} a${c.r * 0.45} ${c.r * 0.45} 0 1 1 ${c.r * 0.45} ${c.r * 0.45}`} fill="none" stroke={dark} strokeWidth="3" strokeLinecap="round" opacity="0.55" />
        </g>
      ))}
    </>
  );
}

export default function Avatar() {
  return (
    <svg className="avatar-art" viewBox="0 0 400 500" role="img" aria-label="Illustration of Lori">
      <g className="av-bob">
        {/* hair behind */}
        <Curls list={BACK} base="#7a4b2a" dark="#4e2e18" />
        {/* body + neck */}
        <path d="M58 500 C 66 408, 136 372, 200 372 C 264 372, 334 408, 342 500 Z" fill="#164e3b" />
        <path d="M172 300 h56 v62 c0 16 -56 16 -56 0 Z" fill="#ebc3ab" />
        <path d="M168 372 Q 200 410 232 372" fill="none" stroke="#0f3d2e" strokeWidth="6" strokeLinecap="round" />
        {/* face */}
        <ellipse cx="200" cy="232" rx="78" ry="92" fill="#f5d6c2" />
        <ellipse cx="160" cy="262" rx="13" ry="8" fill="#f29a8f" opacity="0.4" />
        <ellipse cx="240" cy="262" rx="13" ry="8" fill="#f29a8f" opacity="0.4" />
        {/* brows */}
        <path d="M160 210 q 14 -9 28 -2" fill="none" stroke="#6b4123" strokeWidth="4" strokeLinecap="round" />
        <path d="M212 208 q 14 -7 28 2" fill="none" stroke="#6b4123" strokeWidth="4" strokeLinecap="round" />
        {/* eyes */}
        <g className="av-eyes">
          <ellipse cx="174" cy="234" rx="6.5" ry="8" fill="#2b1d16" />
          <ellipse cx="226" cy="234" rx="6.5" ry="8" fill="#2b1d16" />
          <circle cx="176" cy="231" r="2" fill="#fff" />
          <circle cx="228" cy="231" r="2" fill="#fff" />
        </g>
        {/* nose + smile */}
        <path d="M200 244 q -5 14 3 17" fill="none" stroke="#d9a58b" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M178 278 q 22 20 44 0" fill="#c4545e" stroke="#a8434c" strokeWidth="3" strokeLinejoin="round" />
        <path d="M184 281 q 16 9 32 0" fill="#fff" opacity="0.9" />
        {/* curls in front */}
        <Curls list={FRONT} base="#83522e" dark="#4e2e18" />
      </g>
    </svg>
  );
}
