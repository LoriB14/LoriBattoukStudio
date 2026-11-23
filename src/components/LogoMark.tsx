import type { CSSProperties } from 'react';

interface Props {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
  animated?: boolean;
}

export default function LogoMark({ size = 64, color = 'currentColor', className = '', style, animated = false }: Props) {
  const sw = Math.max(1.5, size / 26);

  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" aria-hidden="true" className={className} style={style}>
      <circle cx="32" cy="32" r="30" stroke={color} strokeWidth={sw} className={animated ? 'lm-circle' : undefined} />
      <path d="M 32 2 C 15 4 15 60 32 62" stroke={color} strokeWidth={sw} strokeLinecap="round" className={animated ? 'lm-lm' : undefined} />
      <path d="M 32 2 C 49 4 49 60 32 62" stroke={color} strokeWidth={sw} strokeLinecap="round" className={animated ? 'lm-rm' : undefined} />
      <path d="M 2 32 C 2 20 62 20 62 32 C 62 44 2 44 2 32" stroke={color} strokeWidth={sw} strokeLinecap="round" className={animated ? 'lm-eq' : undefined} />
    </svg>
  );
}
