import { Link, NavLink } from 'react-router-dom';
import { asset } from '../lib/asset';
import { BookButton } from './BookButton';

export function TopBar() {
  return (
    <header className="topbar">
      <div className="wrap topbar__inner">
        <Link to="/" className="topbar__brand" aria-label="Kurisu Omakase, home">
          <img src={asset('img/logo-480.webp')} alt="" width={40} height={43} />
          <span className="topbar__name">
            Kurisu Omakase
            <span>Atlantic Road, Brixton</span>
          </span>
        </Link>
        <nav aria-label="Main">
          <NavLink to="/before-you-book">Before you book</NavLink>
          <NavLink to="/story">The story</NavLink>
        </nav>
        <BookButton small label="Book" className="topbar__book" />
      </div>
    </header>
  );
}
