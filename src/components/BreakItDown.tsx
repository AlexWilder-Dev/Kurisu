import { howItWorks, price, service, venue } from '../data/kurisu';
import { Reveal } from './Reveal';

export function Receipt() {
  const rows: [string, string][] = [
    ['Signature omakase', `£${price.perHead} pp`],
    ['Service', `${price.serviceChargePct}%`],
    ['Deposit to book', `£${price.depositPerHead} pp`],
    ['Cancel by', `${price.cancelNoticeHours} hrs before`],
    ['Late cancel / no-show', `£${price.lateCancelFeePerHead} pp`],
    ['Courses', String(service.courses)],
    ['At the counter', `about ${service.minutes / 60} hrs`],
    ['Party size', `${service.partySize.min}–${service.partySize.max}`],
  ];
  return (
    <div className="receipt" aria-label="Prices and terms">
      <h3>Kurisu Omakase</h3>
      <p className="receipt__sub">
        {venue.address.street}, {venue.address.area} · {service.daysShort} · 6pm &amp; 8.30pm
      </p>
      <dl>
        {rows.map(([k, v]) => (
          <div className="receipt__row" key={k}>
            <dt>{k}</dt>
            <span className="receipt__dots" aria-hidden="true" />
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <p className="receipt__foot">
        As listed on {venue.bookingPlatform}, October 2026.
        <br />
        Arigato gozaimasu.
      </p>
    </div>
  );
}

export function Steps() {
  return (
    <ol className="steps">
      {howItWorks.map((s, i) => (
        <li key={s.title}>
          <span className="steps__n" aria-hidden="true">
            {i + 1}
          </span>
          <Reveal>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            {s.quote && <blockquote>“{s.quote}”</blockquote>}
            <a className="source" href={s.source.url} target="_blank" rel="noopener noreferrer">
              {s.source.label}
            </a>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function BreakItDown() {
  return (
    <div className="breakdown">
      <Steps />
      <Reveal>
        <Receipt />
      </Reveal>
    </div>
  );
}
