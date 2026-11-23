import { useState, type FormEvent, useRef } from 'react';
import Lines from './Lines';
import { SERVICES, SERVICE_ORDER, type ServiceId } from '../data';
import { Arrow } from './Icons';

const EMAIL = 'info@lorisworld.com';

type Props = {
  picked: ServiceId[];
  setPicked: (ids: ServiceId[]) => void;
  business: string;
  setBusiness: (b: string) => void;
};

export default function Contact({ picked, setPicked, business, setBusiness }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; form?: string }>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const nameRef = useRef<string>('');

  const toggle = (id: ServiceId) => setPicked(picked.includes(id) ? picked.filter((p) => p !== id) : [...picked, id]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = 'Add your name so I know who to reply to.';
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Add an email address like you@business.com.';
    setErrors(next);
    if (Object.keys(next).length) return;

    const needs = picked.map((p) => SERVICES[p].name).join(', ') || 'Not sure yet';
    nameRef.current = name;
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, business, needs, message }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setErrors({ form: 'Something went wrong. Email me directly at ' + EMAIL + '.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section contact-sec" aria-labelledby="contact-h">
      <div className="wrap contact">
        <div className="section-head" data-reveal>
          <h2 id="contact-h">
            <Lines lines={["Let's build", 'yours.']} />
          </h2>
          <p className="fade-up">Send a few lines about what you have in mind. I read every message myself and reply with next steps.</p>
          <p className="direct fade-up" style={{ ['--d' as string]: '80ms' }}>
            Prefer email? Write to <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>

        <div className="panel form-panel">
          {sent ? (
            <div className="sent" aria-live="polite">
              <h3>Thanks, {nameRef.current.split(' ')[0]}.</h3>
              <p>Your message is on its way. I&apos;ll reply within a day or two.</p>
              <button type="button" className="textbtn" onClick={() => setSent(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="two">
                <div className="field">
                  <label htmlFor="f-name">Your name</label>
                  <input id="f-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined} />
                  {errors.name && <p className="err" id="e-name">{errors.name}</p>}
                </div>
                <div className="field">
                  <label htmlFor="f-email">Email</label>
                  <input id="f-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'e-email' : undefined} />
                  {errors.email && <p className="err" id="e-email">{errors.email}</p>}
                </div>
              </div>
              <div className="field">
                <label htmlFor="f-biz">
                  Business <small>(optional)</small>
                </label>
                <input id="f-biz" autoComplete="organization" placeholder="e.g. a physio clinic in Aurora" value={business} onChange={(e) => setBusiness(e.target.value)} />
              </div>
              <fieldset className="field">
                <legend>What do you need?</legend>
                <div className="checks">
                  {SERVICE_ORDER.map((id) => (
                    <label className="check" key={id}>
                      <input type="checkbox" checked={picked.includes(id)} onChange={() => toggle(id)} />
                      <span>
                        {SERVICES[id].name}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="field">
                <label htmlFor="f-msg">
                  Tell me more <small>(optional)</small>
                </label>
                <textarea id="f-msg" rows={4} placeholder="What you sell, who your customers are, and anything you'd like the site to do." value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              {errors.form && <p className="err">{errors.form}</p>}
              <button type="submit" className="btn" disabled={sending}>
                {sending ? 'Sending…' : <><span>Send my inquiry</span> <Arrow /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
