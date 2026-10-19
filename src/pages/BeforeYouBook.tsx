import { useState } from 'react';
import { service } from '../data/kurisu';
import { Receipt, Steps } from '../components/BreakItDown';
import { HouseRules } from '../components/HouseRules';
import { Visit } from '../components/Visit';
import { BookButton } from '../components/BookButton';

function ShareLink() {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Kurisu Omakase: before you book', url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      /* dismissed */
    }
  };
  return (
    <span className="sendthis">
      <button type="button" className="btn btn--ink btn--small" onClick={share}>
        Send this to your plus-one
      </button>
      <span role="status">{copied ? 'Link copied.' : ''}</span>
    </span>
  );
}

export function BeforeYouBook() {
  return (
    <main id="main">
      <header className="wrap pagehead">
        <span className="label" style={{ color: 'var(--tuna)' }}>
          Before you book
        </span>
        <h1 style={{ marginTop: 10 }}>Everything we’d otherwise answer in the DMs.</h1>
        <p>
          How the drop works, what it costs, what we can and can’t cook for, and what happens on the night. Read it
          before you pay the deposit, and send it to whoever’s coming with you.
        </p>
        <ShareLink />
      </header>

      <section className="section" style={{ paddingTop: 24 }} aria-labelledby="b-drop">
        <div className="wrap breakdown">
          <div>
            <h2 id="b-drop" style={{ fontSize: 'clamp(1.9rem, 7vw, 3rem)', marginBottom: 18 }}>
              How the drop works
            </h2>
            <Steps />
          </div>
          <Receipt />
        </div>
      </section>

      <section className="section section--rice2" aria-labelledby="b-rules">
        <div className="wrap">
          <h2 id="b-rules" style={{ fontSize: 'clamp(1.9rem, 7vw, 3rem)', marginBottom: 18 }}>
            House rules
          </h2>
          <HouseRules />
        </div>
      </section>

      <section className="section" aria-labelledby="b-night">
        <div className="wrap">
          <h2 id="b-night" style={{ fontSize: 'clamp(1.9rem, 7vw, 3rem)', marginBottom: 18 }}>
            On the night
          </h2>
          <ol className="timeline" style={{ maxWidth: '40rem' }}>
            <li className="is-key">
              <span className="timeline__year">6pm or 8.30pm</span>
              <h3>Turn up a touch early.</h3>
              <p>Seats are first in, first served, and the first course goes when all {service.seats} are in.</p>
            </li>
            <li>
              <span className="timeline__year">First</span>
              <h3>Small hot and cold starters.</h3>
              <p>Off the coals, out of the fryer, out of the smoke. Stories included.</p>
            </li>
            <li>
              <span className="timeline__year">Then</span>
              <h3>Nigiri, one piece at a time.</h3>
              <p>Shaped in front of you and put straight down in front of you. There’s no soy dish to fiddle with: where a piece wants soy, it’s already brushed on.</p>
            </li>
            <li className="is-key">
              <span className="timeline__year">About two hours in</span>
              <h3>Dessert, and out you go.</h3>
              <p>The {service.seatings[0].label} lot are done {service.seatings[0].finish}; the {service.seatings[1].label} lot {service.seatings[1].finish}.</p>
            </li>
          </ol>
          <div className="actions">
            <BookButton />
          </div>
        </div>
      </section>

      <section className="section section--rice2" aria-labelledby="b-visit">
        <div className="wrap">
          <h2 id="b-visit" className="visually-hidden">
            Finding us
          </h2>
          <Visit />
        </div>
      </section>
    </main>
  );
}
