import { useMemo, useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { season, venue } from '../data/kurisu';
import { londonDate, nextDrop, splitDuration, useNow } from '../lib/time';
import { BookButton } from './BookButton';
import { Flame } from './Flame';

function Digit({ value, label }: { value: number; label: string }) {
  const reduce = useReducedMotion();
  const text = String(value).padStart(2, '0');
  return (
    <div className="countdown__unit">
      <span className="countdown__num" aria-hidden="true">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={text}
            initial={reduce ? false : { y: '-70%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={reduce ? undefined : { y: '70%', opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="countdown__lbl">{label}</span>
    </div>
  );
}

export function DropCard() {
  const now = useNow(1000);
  const drop = useMemo(() => nextDrop(season.nextDrop.isoDate, now), [now]);
  const left = splitDuration(drop.getTime() - now.getTime());
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Demo: nothing leaves the page.
    setDone(true);
  };

  return (
    <div className="card dropcard">
      <div className="dropcard__head">
        <span className="label">
          <Flame size={14} /> The next drop
        </span>
        <span className="stamp" title="This date is invented for the demo">
          Demo date
        </span>
      </div>

      <div
        className="countdown"
        role="timer"
        aria-label={`${left.days} days, ${left.hours} hours and ${left.minutes} minutes until the next dates go live`}
      >
        <Digit value={left.days} label="days" />
        <Digit value={left.hours} label="hrs" />
        <Digit value={left.minutes} label="mins" />
        <Digit value={left.seconds} label="secs" />
      </div>

      <p className="dropcard__when">
        Next season’s dates go live on {venue.bookingPlatform} on{' '}
        <strong>
          {londonDate(drop)} at {season.nextDrop.publicTime}
        </strong>
        .
      </p>
      <p className="dropcard__fine">
        The real date goes out on Instagram and the newsletter. This one’s made up for the demo.
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div
            key="done"
            className="notify__done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            role="status"
          >
            <strong>You’re on the list.</strong>
            We’ll email you before the dates go live, with the early link for {season.nextDrop.earlyTime}. Arigato
            gozaimasu.
            <p className="dropcard__fine">
              Demo only: nothing was sent. The real newsletter is{' '}
              <a href={venue.newsletterUrl} target="_blank" rel="noopener noreferrer">
                here
              </a>
              .
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" className="notify" onSubmit={onSubmit} exit={{ opacity: 0 }}>
            <label htmlFor="notify-email">
              Newsletter readers get a 30-minute head start: {season.nextDrop.earlyTime}, not{' '}
              {season.nextDrop.publicTime}.
            </label>
            <div className="notify__row">
              <input
                id="notify-email"
                className="input"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn--ink" type="submit">
                Get the head start
              </button>
            </div>
            <p className="dropcard__fine">
              {season.nextDrop.precedent}{' '}
              <a href={season.nextDrop.source.url} target="_blank" rel="noopener noreferrer">
                See the email
              </a>
              .
            </p>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="dropcard__or">
        <BookButton small />
        <span>
          Sold out? Join the notify list on {venue.bookingPlatform}. When someone cancels, you hear within minutes.
        </span>
      </div>
    </div>
  );
}

