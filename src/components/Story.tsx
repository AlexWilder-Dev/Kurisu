import { Link } from 'react-router-dom';
import { chrisOnHospitality, story } from '../data/kurisu';
import { Photo } from './Photo';
import { Reveal } from './Reveal';

const KEY_YEARS = ['1999', '2019', '18 Dec 2021'];

export function Timeline({ compact = false }: { compact?: boolean }) {
  const items = compact ? story.filter((s) => s.year !== '2021' && s.year !== 'Age 16') : story;
  return (
    <ol className="timeline">
      {items.map((s) => (
        <li key={s.year} className={KEY_YEARS.includes(s.year) ? 'is-key' : undefined}>
          <span className="timeline__year">{s.year}</span>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
          {!compact && (
            <a className="source" href={s.source.url} target="_blank" rel="noopener noreferrer">
              {s.source.label}
            </a>
          )}
        </li>
      ))}
    </ol>
  );
}

export function Suwannee() {
  return (
    <Reveal className="suwannee">
      <span className="label" style={{ color: 'var(--lacquer)' }}>
        Front of house
      </span>
      <h3 style={{ marginTop: 6 }}>And then there’s Suwannee.</h3>
      <p>
        Ichiban was her restaurant. Now she runs the room at Kurisu, fetching and carrying from the back kitchen,
        which is a neat reversal of who used to bring the plates out. Guests come for the sushi and
        remember the back-and-forth between the two of them.
      </p>
      <p>
        The chutoro “chop chop” is hers, really: named after a snack she used to give Chris when he was a kid. He
        tells that one at the counter.
      </p>
    </Reveal>
  );
}

export function StoryTeaser() {
  return (
    <div className="story">
      <Reveal>
        <div className="polaroids">
          <figure className="polaroid polaroid--wide" style={{ transform: 'rotate(-1.5deg)' }}>
            <div className="frame">
              <Photo id="room" sizes="(min-width: 900px) 44vw, 92vw" />
            </div>
            <figcaption>The room laid as one long counter, the month Ichiban closed. December 2021.</figcaption>
          </figure>
          <figure className="polaroid" style={{ transform: 'rotate(2deg)' }}>
            <div className="frame">
              <Photo id="ichiban-thai" sizes="(min-width: 900px) 22vw, 46vw" />
            </div>
            <figcaption>Ichiban’s Thai side.</figcaption>
          </figure>
          <figure className="polaroid" style={{ transform: 'rotate(-2.5deg)' }}>
            <div className="frame">
              <Photo id="ichiban-sushi" sizes="(min-width: 900px) 22vw, 46vw" />
            </div>
            <figcaption>Ichiban’s sushi, 2021.</figcaption>
          </figure>
        </div>
      </Reveal>
      <div>
        <Timeline compact />
        <p style={{ marginTop: 4 }}>
          <Link className="btn btn--rice btn--small" to="/story">
            The whole story
          </Link>
        </p>
      </div>
    </div>
  );
}

export function ChrisQuote() {
  return (
    <Reveal>
      <blockquote
        style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontVariationSettings: "'SOFT' 100",
          fontWeight: 800,
          fontSize: 'clamp(1.6rem, 6vw, 2.6rem)',
          lineHeight: 1.1,
        }}
      >
        “{chrisOnHospitality.quote}”
      </blockquote>
      <p className="source" style={{ fontSize: '0.9375rem' }}>
        Chris, to{' '}
        <a href={chrisOnHospitality.source.url} target="_blank" rel="noopener noreferrer">
          Resy
        </a>
        , 2023
      </p>
    </Reveal>
  );
}
