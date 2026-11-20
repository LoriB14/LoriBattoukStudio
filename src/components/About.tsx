import Lines from './Lines';
import Avatar from './Avatar';

const TOOLS = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Supabase', 'Gemini API', 'Vercel'];

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-h">
      <div className="wrap about">
        <div className="about-photo">
          <Avatar />
        </div>
        <div className="about-body" data-reveal>
          <h2 id="about-h">
            <Lines lines={['Hi, I’m Lori.', <span className="hl" key="h">One person,</span>, 'the whole job.']} />
          </h2>
          <p className="fade-up">
            I’m a web designer and frontend developer in <strong>Toronto and the GTA</strong>. I work with small businesses to make websites that match
            the quality of their work: clean, fast and built to last.
          </p>
          <p className="fade-up" style={{ ['--d' as string]: '80ms' }}>
            I’m also a computer science student.
          </p>
          <ul className="tools fade-up" style={{ ['--d' as string]: '160ms' }} aria-label="Tools I build with">
            {TOOLS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="about-links">
            <a className="link" href="https://www.linkedin.com/in/loribattouk/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="link" href="https://github.com/LoriB14" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
}
