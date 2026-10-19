import { venue } from '../data/kurisu';

export function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M3 11 L11 3 M5 3 H11 V9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Props = { label?: string; className?: string; small?: boolean };

export function BookButton({ label = `Book on ${venue.bookingPlatform}`, className = '', small }: Props) {
  return (
    <a
      className={`btn ${small ? 'btn--small' : ''} ${className}`}
      href={venue.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
      <Arrow />
      <span className="visually-hidden"> (opens SevenRooms in a new tab)</span>
    </a>
  );
}
