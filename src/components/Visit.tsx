import { Link } from 'react-router-dom';
import { price, service, venue } from '../data/kurisu';
import { BookButton, Arrow } from './BookButton';
import { Reveal } from './Reveal';

export function CantGetIn() {
  return (
    <div className="cantget">
      <span className="label" style={{ color: 'var(--peach)' }}>
        Sold out again?
      </span>
      <h3 style={{ marginTop: 8 }}>Don’t give up on us.</h3>
      <ol>
        <li>
          Join the notify list for the nights you want on{' '}
          <a href={venue.bookingUrl} target="_blank" rel="noopener noreferrer">
            {venue.bookingPlatform}
          </a>
          . Three months is a long time, and seats come back.
        </li>
        <li>
          Get the{' '}
          <a href={venue.newsletterUrl} target="_blank" rel="noopener noreferrer">
            newsletter
          </a>
          . Last summer it got a half-hour head start on the drop.
        </li>
        <li>
          Next drop, try the <Link to="/before-you-book">furthest-month trick</Link>.
        </li>
        <li>
          Follow{' '}
          <a href={venue.instagram.url} target="_blank" rel="noopener noreferrer">
            {venue.instagram.handle}
          </a>{' '}
          for the dates.
        </li>
      </ol>
    </div>
  );
}

export function Visit() {
  const a = venue.address;
  return (
    <div className="visit">
      <Reveal>
        <address className="address">
          {a.street},
          <br />
          {a.area} <span>{a.postcode}</span>
        </address>
        <dl className="facts" style={{ marginTop: 20 }}>
          <div>
            <dt>When</dt>
            <dd>
              {service.days.join(', ').replace(/, (?=[^,]*$)/, ' and ')}. Two seatings: 6pm and 8.30pm.
            </dd>
          </div>
          <div>
            <dt>Closed</dt>
            <dd>{service.closedDays}. No walk-ins.</dd>
          </div>
          <div>
            <dt>Price</dt>
            <dd>
              £{price.perHead} a head for {service.courses} courses, plus {price.serviceChargePct}% service.
            </dd>
          </div>
          <div>
            <dt>Getting here</dt>
            <dd>{venue.station} Look for the little room facing the pavement.</dd>
          </div>
          <div>
            <dt>Say hello</dt>
            <dd>
              <a href={venue.instagram.url} target="_blank" rel="noopener noreferrer">
                {venue.instagram.handle}
              </a>{' '}
              or <a href={`mailto:${venue.email}`}>{venue.email}</a>
            </dd>
          </div>
        </dl>
        <div className="actions">
          <BookButton />
          <a className="btn btn--rice" href={venue.mapUrl} target="_blank" rel="noopener noreferrer">
            Open in Google Maps <Arrow />
          </a>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <CantGetIn />
      </Reveal>
    </div>
  );
}
