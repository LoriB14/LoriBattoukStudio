import { useState, type CSSProperties, type ReactNode } from 'react';
import Lines from './Lines';
import { Tick } from './Icons';
import { IMG } from '../data';

function Included({ items }: { items: string[] }) {
  return (
    <ul className="included">
      {items.map((i) => (
        <li key={i}>
          <Tick />
          {i}
        </li>
      ))}
    </ul>
  );
}

function WebsiteDemo() {
  return (
    <div className="demo">
      <span className="demo-tag">DEMO</span>
      <div className="browser-bar">
        <i />
        <i />
        <i />
        <div className="url">copperandstem.ca</div>
      </div>
      <div className="site">
        <div className="site-copy">
          <small>Copper &amp; Stem · Florist</small>
          <h4>Flowers for every Tuesday.</h4>
          <p>Seasonal bouquets wrapped by hand and delivered across the city the same day.</p>
          <span className="mini-btn">Order a bouquet</span>
        </div>
        <div className="site-img">
          <img src={IMG.buds} alt="" loading="lazy" decoding="async" />
        </div>
      </div>
    </div>
  );
}

const PRODUCTS = [
  { id: 'loaf', name: 'Caraway rye loaf', price: 9, img: IMG.bakery },
  { id: 'beans', name: 'House espresso, 340 g', price: 21, img: IMG.barista },
  { id: 'throw', name: 'Wool throw', price: 89, img: IMG.blankets },
];
const fmt = (n: number) => `$${n.toFixed(2)}`;

function StoreDemo() {
  const [cart, setCart] = useState<{ id: string; key: number }[]>([]);
  const [paid, setPaid] = useState(false);
  const [bump, setBump] = useState(0);
  const total = cart.reduce((s, x) => s + (PRODUCTS.find((p) => p.id === x.id)?.price ?? 0), 0);

  return (
    <div className="demo">
      <span className="demo-tag">DEMO</span>
      <div className="store">
        <div className="shelf">
          {PRODUCTS.map((p) => (
            <div className="product" key={p.id}>
              <img src={p.img} alt="" loading="lazy" decoding="async" />
              <span>
                <b>{p.name}</b>
                <small>{fmt(p.price)}</small>
              </span>
              <button
                type="button"
                className="add"
                aria-label={`Add ${p.name} to cart`}
                onClick={() => {
                  setPaid(false);
                  setBump((b) => b + 1);
                  setCart((x) => [...x, { id: p.id, key: Date.now() + Math.random() }]);
                }}
              >
                Add
              </button>
            </div>
          ))}
        </div>
        <div className="summary" aria-live="polite">
          <h4>
            Your cart
            <span>
              <span className={`badge${bump ? ' bump' : ''}`} key={bump}>
                {cart.length}
              </span>{' '}
              {cart.length === 1 ? 'item' : 'items'}
            </span>
          </h4>
          {cart.length === 0 ? (
            <p className="empty">{paid ? 'Order placed. A receipt is on its way.' : 'Nothing here yet. Add something.'}</p>
          ) : (
            cart.map((x, i) => {
              const p = PRODUCTS.find((q) => q.id === x.id)!;
              return (
                <div className={`line${i === cart.length - 1 ? ' new' : ''}`} key={x.key}>
                  <span>{p.name}</span>
                  <span>{fmt(p.price)}</span>
                </div>
              );
            })
          )}
          <div className="total">
            <span>Total</span>
            <span>{fmt(total)}</span>
          </div>
          {paid && cart.length === 0 ? (
            <p className="paid">
              <Tick /> Paid with Stripe
            </p>
          ) : (
            <button type="button" className="pay" disabled={cart.length === 0} onClick={() => { setPaid(true); setCart([]); }}>
              Checkout with Stripe
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const DAYS = [
  { day: 'Tue', slots: ['9:30', '11:00', '2:15'], taken: ['11:00'] },
  { day: 'Wed', slots: ['10:00', '1:30', '4:00'], taken: ['10:00'] },
  { day: 'Thu', slots: ['9:00', '12:30', '3:45'], taken: [] as string[] },
];

function BookingDemo() {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="demo">
      <span className="demo-tag">DEMO</span>
      <div className="booking-head">
        <img src={IMG.blankets} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="booking">
        <h4>Book a massage</h4>
        <p className="who">60 minutes with Sam · pick a time</p>
        <div className="days">
          {DAYS.map((d) => (
            <div className="day" key={d.day}>
              <h5>{d.day}</h5>
              {d.slots.map((s) => {
                const key = `${d.day} ${s}`;
                const taken = d.taken.includes(s);
                return (
                  <button key={s} type="button" className="slot" disabled={taken} aria-pressed={picked === key} aria-label={taken ? `${key}, taken` : `Book ${key}`} onClick={() => setPicked(picked === key ? null : key)}>
                    {s}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div aria-live="polite">
          {picked ? (
            <div className="confirm on" key={picked}>
              <Tick size={16} /> Booked for {picked}. A reminder goes out the day before.
            </div>
          ) : (
            <div className="confirm off">Pick a time to book.</div>
          )}
        </div>
      </div>
    </div>
  );
}

function AssistantDemo() {
  return (
    <div className="demo transcript">
      <span className="demo-tag">DEMO</span>
      <div className="msg me">I need a gift for my sister, she loves coffee.</div>
      <div className="msg bot">Our house espresso is a favourite. Want me to add a gift note?</div>
      <div className="rec-card">
        <img src={IMG.barista} alt="" loading="lazy" decoding="async" />
        <span>
          <b>House espresso, 340 g</b>
          <small>{fmt(21)} · in stock</small>
        </span>
        <span className="add" style={{ display: 'inline-flex', alignItems: 'center' }}>View</span>
      </div>
      <div className="msg me">Yes please!</div>
    </div>
  );
}

function Panel({ id, n, tone, title, lede, items, demo, extra }: { id: string; n: number; tone: string; title: string; lede: string; items: string[]; demo: ReactNode; extra?: ReactNode }) {
  return (
    <article className={`panel-s t-${tone}`} id={id} style={{ ['--n' as string]: n } as CSSProperties}>
      <div>
        <span className="num">0{n + 1} / 04</span>
        <h3>{title}</h3>
        <p className="lede">{lede}</p>
        <Included items={items} />
        {extra}
      </div>
      {demo}
    </article>
  );
}

export default function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-h">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <h2 id="services-h">
            <Lines lines={['Everything your', <>business needs <span className="hl">online.</span></>]} />
          </h2>
          <p className="fade-up">Pick one or combine them. Every example below works, so go ahead and try it.</p>
        </div>

        <div className="stack">
          <Panel
            id="website" n={0} tone="green" title="Custom websites"
            lede="A site designed around your business, not a template. Fast on phones, easy to find on Google, and simple for you to update."
            items={['A design you approve first', 'Built for phones first', 'Search basics set up', 'Hosting handled for you']}
            demo={<WebsiteDemo />}
          />
          <Panel
            id="store" n={1} tone="mandarin" title="Online stores"
            lede="Sell your products online with a cart and secure Stripe checkout. Filters help customers find the right item fast."
            items={['Product pages and filters', 'Cart and Stripe checkout', 'Order confirmation emails', 'Stock you can manage']}
            demo={<StoreDemo />}
          />
          <Panel
            id="booking" n={2} tone="crest" title="Online booking"
            lede="Clients pick a time and book without calling you. Reminders go out on their own, so fewer people miss appointments."
            items={['Live open times', 'Deposits or full payment', 'Automatic reminders', 'Works with JaneApp']}
            demo={<BookingDemo />}
          />
          <Panel
            id="assistant" n={3} tone="deep" title="AI assistants"
            lede="An assistant on your site that answers questions and points each visitor to the right product or service, in your voice."
            items={['Knows your products and services', 'Recommends and links items', 'Sends leads to your inbox', 'Powered by Google Gemini']}
            demo={<AssistantDemo />}
            extra={<p style={{ marginTop: 28 }}><a className="link" href="#top">Try the live one at the top</a></p>}
          />
        </div>
      </div>
    </section>
  );
}
