import { Link } from 'react-router-dom';
import { venue } from '../data/kurisu';
import { asset } from '../lib/asset';

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <img src={asset('img/logo-480.webp')} alt="" width={56} height={60} />
          <div>
            <strong>{venue.name}</strong>
            <div>
              {venue.address.street}, {venue.address.area} {venue.address.postcode}
            </div>
          </div>
        </div>
        <nav aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/before-you-book">Before you book</Link>
          <Link to="/story">The story</Link>
          <a href={venue.bookingUrl} target="_blank" rel="noopener noreferrer">
            Book
          </a>
          <a href={venue.instagram.url} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </nav>
        <small>
          A speculative demo made for Kurisu Omakase, not their official site. The countdown date is invented for the
          demo; prices, days and policies are as listed on SevenRooms in October 2026. Photos are Kurisu Omakase’s and
          Ichiban Sushi’s own, from their Instagram, newsletters and a Resy feature.
        </small>
        <p>
          <strong>Site by AlexWilder-Dev</strong>
        </p>
      </div>
    </footer>
  );
}
