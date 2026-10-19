import { dietary, houseRules } from '../data/kurisu';
import { Reveal } from './Reveal';

export function Dietary() {
  return (
    <Reveal className="diet">
      <span className="label">Before anything else</span>
      <h3 style={{ marginTop: 8 }}>We can’t cook for everyone, and we’d rather say so now.</h3>
      <p className="diet__lead">We can’t cater for:</p>
      <ul aria-label="We can't cater for">
        {dietary.cannot.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
      <p>{dietary.why}</p>
      <p>{dietary.otherAllergies}</p>
      <span className="source">
        Sources:{' '}
        {dietary.sources.map((s, i) => (
          <span key={s.label}>
            {i > 0 && ' · '}
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ) : (
              s.label
            )}
          </span>
        ))}
      </span>
    </Reveal>
  );
}

export function HouseRules() {
  return (
    <>
      <div className="rules">
        {houseRules.map((r, i) => (
          <Reveal key={r.title} className="rule" delay={i * 0.05}>
            <h3>{r.title}</h3>
            <p>{r.body}</p>
            <a className="source" href={r.source.url} target="_blank" rel="noopener noreferrer">
              {r.source.label}
            </a>
          </Reveal>
        ))}
      </div>
      <Dietary />
    </>
  );
}
