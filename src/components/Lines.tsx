import type { CSSProperties, ReactNode } from 'react';

/** Splits a heading into masked lines that rise in when the parent gets .is-in */
export default function Lines({ lines }: { lines: ReactNode[] }) {
  return (
    <>
      {lines.map((l, i) => (
        <span className="line-mask" key={i}>
          <span style={{ ['--i' as string]: i } as CSSProperties}>{l}</span>
        </span>
      ))}
    </>
  );
}
