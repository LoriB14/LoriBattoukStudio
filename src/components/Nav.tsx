import { useEffect, useState } from 'react';
import LogoMark from './LogoMark';

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setSolid(y > 24);
      setHide(y > 400 && y > last + 2);
      if (y < last - 2) setHide(false);
      last = y;
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <div className={`topbar${solid ? ' solid' : ''}${hide ? ' hide' : ''}`}>
      <div className="wrap">
        <a href="#top" className="brand">
          <span className="nav-mark">
            <LogoMark size={22} color="var(--forest-deep)" animated />
          </span>
          Lori Battouk
        </a>
        <nav className="nav" aria-label="Main">
          <a className="navlink" href="#services">What I build</a>
          <a className="navlink" href="#process">How it works</a>
          <a className="navlink" href="#about">About</a>
          <a className="btn sm" href="#contact">Start a project</a>
        </nav>
      </div>
    </div>
  );
}
