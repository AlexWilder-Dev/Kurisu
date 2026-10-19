import { useEffect, useState } from 'react';

const DAY = 86_400_000;

// The demo drop date rolls forward four weeks at a time once it has passed,
// so the countdown never sits at zero during a pitch.
export function nextDrop(iso: string, now: Date): Date {
  let t = new Date(iso).getTime();
  while (t <= now.getTime()) t += 28 * DAY;
  return new Date(t);
}

export function useNow(intervalMs = 1000): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return now;
}

export function splitDuration(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86_400),
    hours: Math.floor((s % 86_400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export const londonDate = (d: Date) =>
  new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Europe/London',
  }).format(d);
