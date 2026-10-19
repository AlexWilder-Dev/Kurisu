import { chrisOnHospitality } from '../data/kurisu';
import { Photo } from '../components/Photo';
import { ChrisQuote, Suwannee, Timeline } from '../components/Story';
import { Reveal } from '../components/Reveal';
import { BookButton } from '../components/BookButton';

export function StoryPage() {
  return (
    <main id="main">
      <header className="wrap pagehead">
        <span className="label" style={{ color: 'var(--tuna)' }}>
          The story
        </span>
        <h1 style={{ marginTop: 10 }}>From carrying the plates to running the counter.</h1>
        <p>
          “Kurisu” is Chris, in Japanese. The room it happens in has been the family’s since 1999. Here’s how the kid who
          carried the plates at Ichiban ended up serving some of the best sushi in the country, in his mum’s old
          restaurant.
        </p>
      </header>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap story">
          <Timeline />
          <div>
            <Reveal>
              <div className="polaroids">
                <figure className="polaroid polaroid--wide" style={{ transform: 'rotate(1deg)' }}>
                  <div className="frame">
                    <Photo id="chris-box" sizes="(min-width: 900px) 44vw, 92vw" style={{ objectPosition: '50% 30%' }} />
                  </div>
                  <figcaption>Chris with the day’s fish in the blonde-wood box. Photo: Kurisu Omakase, 2023.</figcaption>
                </figure>
                <figure className="polaroid" style={{ transform: 'rotate(-2deg)' }}>
                  <div className="frame">
                    <Photo id="prawn-2019" sizes="(min-width: 900px) 22vw, 46vw" />
                  </div>
                  <figcaption>Torched prawn, from the 2019 newsletter.</figcaption>
                </figure>
                <figure className="polaroid" style={{ transform: 'rotate(2deg)' }}>
                  <div className="frame">
                    <Photo id="whitefish-2019" sizes="(min-width: 900px) 22vw, 46vw" />
                  </div>
                  <figcaption>Scored and torched, 2019.</figcaption>
                </figure>
                <figure className="polaroid" style={{ transform: 'rotate(1.5deg)' }}>
                  <div className="frame">
                    <Photo id="ichiban-sashimi" sizes="(min-width: 900px) 22vw, 46vw" />
                  </div>
                  <figcaption>Ichiban’s sashimi, 2022.</figcaption>
                </figure>
                <figure className="polaroid" style={{ transform: 'rotate(-1.5deg)' }}>
                  <div className="frame">
                    <Photo id="ichiban-katsu" sizes="(min-width: 900px) 22vw, 46vw" />
                  </div>
                  <figcaption>Ichiban’s katsu curry, 2021.</figcaption>
                </figure>
              </div>
            </Reveal>
            <Suwannee />
          </div>
        </div>
      </section>

      <section className="section section--rice2">
        <div className="wrap" style={{ display: 'grid', gap: 28, maxWidth: '52rem' }}>
          <ChrisQuote />
          <Reveal>
            <p style={{ fontSize: '1.125rem' }}>
              That’s the whole idea. The fish is serious: aged for anything from four to thirty days, shaped by hand,
              torched, smoked, seared over Japanese charcoal. Everything else is a night round at Chris’s. Jokes,
              family stories, some of them from his mum’s restaurant, and a fair bit of Brixton coming through the door.
            </p>
          </Reveal>
          <Reveal>
            <blockquote style={{ margin: 0, paddingLeft: 16, borderLeft: '4px solid var(--tuna)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.25rem' }}>
              “{chrisOnHospitality.uniqueness}”
            </blockquote>
            <p className="source">Chris, to Resy, 2023</p>
          </Reveal>
          <div className="actions">
            <BookButton />
          </div>
        </div>
      </section>
    </main>
  );
}
