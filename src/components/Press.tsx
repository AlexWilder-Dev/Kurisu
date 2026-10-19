import { press } from '../data/kurisu';
import { Reveal } from './Reveal';

export function Press() {
  return (
    <section className="section press" aria-labelledby="press-h">
      <div className="wrap">
        <h2 id="press-h" className="visually-hidden">
          What the critics said
        </h2>
        <ul className="press__list">
          {press.map((p, i) => (
            <li key={p.quote}>
              <Reveal delay={i * 0.05}>
                <blockquote>“{p.quote}”</blockquote>
                <cite>
                  {p.outlet === 'The Infatuation' && <span className="press__score">{p.who}</span>}
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    {p.outlet === 'The Infatuation' ? p.outlet : `${p.who}, ${p.outlet}`}
                  </a>
                  , {p.date}
                </cite>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
