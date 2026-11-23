import { useEffect, useState, type CSSProperties } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Band from './components/Band';
import Services from './components/Services';
import Process from './components/Process';
import About from './components/About';
import Contact from './components/Contact';
import Faq from './components/Faq';
import { scrollToId, startMotion } from './motion';
import type { ServiceId } from './data';

const CREDITS = [
  ['Leo219', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:Buds_and_flowers_of_Leucadendron_Plumosum_in_a_black_bucket.jpg'],
  ['Shixart1985', 'CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:Barista_prepares_espresso_at_coffee_shop.jpg'],
  ['Johann Jaritz', 'CC BY-SA 3.0 AT', 'https://commons.wikimedia.org/wiki/File:Stabentheiner_Hof_Brotbackstube_Brotbacken_12062014_224.JPG'],
  ['Kelly Sikkema', 'CC0', 'https://commons.wikimedia.org/wiki/File:Kelly_Sikkema_2016-03-09_(Unsplash).jpg'],
];

const WORDMARK = 'Lori Battouk';

export default function App() {
  const [picked, setPicked] = useState<ServiceId[]>([]);
  const [business, setBusiness] = useState('');

  useEffect(() => startMotion(), []);

  const applyRecommendation = (ids: ServiceId[], biz: string) => {
    setPicked(ids);
    if (biz && biz !== 'Something else') setBusiness(biz);
    scrollToId('contact');
    window.setTimeout(() => document.getElementById('f-name')?.focus({ preventScroll: true }), 1300);
  };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <Hero onApply={applyRecommendation} />
      <main id="main">
        <Band />
        <Services />
        <Process />
        <About />
        <Faq />
        <Contact picked={picked} setPicked={setPicked} business={business} setBusiness={setBusiness} />
      </main>
      <footer className="footer">
        <div className="wrap">
          <div className="footer-row">
            <span>© 2026 Lori Battouk · Web design and development in Toronto and the GTA</span>
            <nav aria-label="Social">
              <a href="https://github.com/LoriB14" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/loribattouk/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </nav>
          </div>
          <p className="credits">
            Photographs via Wikimedia Commons:{' '}
            {CREDITS.map(([by, lic, url], i) => (
              <span key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>{by}</a> ({lic}){i < CREDITS.length - 1 ? ', ' : '.'}
              </span>
            ))}
          </p>
        </div>
        <div className="wordmark-clip">
        <div className="wordmark" data-reveal aria-hidden="true">
          {WORDMARK.split('').map((ch, i) => (
            <span key={i} style={{ ['--i' as string]: i } as CSSProperties}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </div>
        </div>
      </footer>
    </>
  );
}
