import { price, service } from '../data/kurisu';
import { BookButton } from './BookButton';

// Phone only: most people arrive from an Instagram post, thumb already hovering.
export function BookBar() {
  return (
    <div className="bookbar">
      <p>
        <strong>
          {service.courses} courses · £{price.perHead}
        </strong>
        {service.daysShort} · 6pm &amp; 8.30pm
      </p>
      <BookButton small label="Book" />
    </div>
  );
}
