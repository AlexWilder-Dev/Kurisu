import { Link } from 'react-router-dom';
import { service, venue } from '../data/kurisu';
import { BreakItDown } from '../components/BreakItDown';
import { Counter } from '../components/Counter';
import { DropCard } from '../components/DropCard';
import { HouseRules } from '../components/HouseRules';
import { PastCourses } from '../components/PastCourses';
import { Press } from '../components/Press';
import { Sticker } from '../components/Sticker';
import { StoryTeaser, Suwannee } from '../components/Story';
import { Visit } from '../components/Visit';
import { Reveal } from '../components/Reveal';

export function Home() {
  return (
    <main id="main">
      <section className="drop" aria-labelledby="drop-h">
        <div className="wrap drop__grid">
          <div className="drop__intro">
            <Sticker className="drop__sticker" />
            <p className="drop__kicker label">
              <span>{venue.address.street}, {venue.address.area}</span>
              <span>{service.daysShort} · 6pm &amp; 8.30pm</span>
            </p>
            <h1 id="drop-h" className="drop__title">
              Put fish on rice and make it <em>nice.</em>
            </h1>
            <p className="drop__tag">#PutFishOnRiceAndMakeItNice. Chris’s hashtag, and more or less the plan.</p>
          </div>
          <div className="drop__card">
            <DropCard />
          </div>
          <p className="drop__lede">
            Eighteen courses, eight seats, one worn wooden counter on Atlantic Road. Chris is on the knife, the torch
            and the coals. His mum Suwannee runs the room. The idea is you leave feeling like you’ve been round a
            friend’s house, and the friend was showing off.
          </p>
        </div>
      </section>

      <section className="section section--dark on-dark" aria-labelledby="counter-h">
        <div className="wrap">
          <div className="section__head">
            <span className="label">The counter</span>
            <h2 id="counter-h">Which seat’s the best one?</h2>
            <p>
              Eight seats at one knee-high wooden counter, lovingly worn in, in a little mahogany room facing the
              pavement. You can’t book a particular seat, so we asked Chris.
            </p>
          </div>
          <Counter />
        </div>
      </section>

      <section className="section" aria-labelledby="how-h">
        <div className="wrap">
          <div className="section__head">
            <span className="label">How booking works</span>
            <h2 id="how-h">Nani? Let’s break it down.</h2>
            <p>That’s Chris, in a Kurisu newsletter from 2019. Still the best way to put it.</p>
          </div>
          <BreakItDown />
        </div>
      </section>

      <section className="section section--rice2" aria-labelledby="rules-h">
        <div className="wrap">
          <div className="section__head">
            <span className="label">House rules</span>
            <h2 id="rules-h">The small print, said nicely.</h2>
            <p>
              Eight seats and everything prepped days ahead means one empty seat, or one surprise allergy, really
              matters. Read this before you pay the deposit.{' '}
              <Link to="/before-you-book">Here it is on one page you can send to whoever you’re booking with.</Link>
            </p>
          </div>
          <HouseRules />
        </div>
      </section>

      <section className="section" aria-labelledby="menu-h">
        <div className="wrap">
          <div className="section__head">
            <span className="label">Past seasons</span>
            <h2 id="menu-h">Eighteen courses. Eighteen cuts.</h2>
            <p>
              Nobody can tell you what’s on the next menu. It changes every three months, and week to week with
              whatever the suppliers bring in. This is what’s been on it before, so you know the sort of thing.
            </p>
          </div>
          <PastCourses />
        </div>
      </section>

      <Press />

      <section className="section" aria-labelledby="story-h">
        <div className="wrap">
          <div className="section__head">
            <span className="label">The family</span>
            <h2 id="story-h">This room was Ichiban for 22 years.</h2>
            <p>
              Ichiban Sushi opened here in 1999. In December 2021 it closed, and handed the room to the kid who used
              to carry the plates.
            </p>
          </div>
          <StoryTeaser />
          <Suwannee />
        </div>
      </section>

      <section className="section section--rice2" aria-labelledby="visit-h">
        <div className="wrap">
          <div className="section__head">
            <span className="label">Finding us</span>
            <h2 id="visit-h" className="visually-hidden">
              Finding us
            </h2>
          </div>
          <Reveal>
            <Visit />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
