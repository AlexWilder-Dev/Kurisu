import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { bestSeats, service, type SeatingId } from '../data/kurisu';
import { Photo } from './Photo';

// Schematic only: the counter's real layout isn't published. Eight stools, the
// chopping board in front of two of them, the coals, the box of fish.
const COUNTER = { x: 18, y: 100, w: 324, h: 46 };
const STOOL_Y = 178;
const DOOR = { x: 287, y: 312 };
const seatX = (n: number) => COUNTER.x + (COUNTER.w / 8) * (n - 0.5);
const SEATS = [1, 2, 3, 4, 5, 6, 7, 8];
const isBoard = (n: number) => bestSeats.board.includes(n);

// Arrival order for a seating: the first two in ask Chris and get the truth.
function arrivals(seed: number): number[] {
  const rest = SEATS.filter((n) => !isBoard(n));
  let s = seed * 9301 + 49297;
  const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  const board = rand() > 0.5 ? [4, 5] : [5, 4];
  return [...board, ...rest];
}

function Smoke() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  const wisps = [
    'M172 62 C166 50 178 42 172 30 C166 20 176 14 172 4',
    'M184 62 C190 52 180 44 186 32 C192 22 182 16 188 6',
    'M196 62 C190 50 200 40 194 28',
  ];
  return (
    <g aria-hidden="true">
      {wisps.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="#efe4d0"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: [0, 0.55, 0], y: [6, -8, -18] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: i * 1.05, ease: 'easeOut' }}
        />
      ))}
    </g>
  );
}

function Coals() {
  const reduce = useReducedMotion();
  const coals = [
    [42, 72], [56, 70], [70, 73], [84, 71],
    [48, 82], [63, 84], [78, 82],
  ];
  return (
    <g aria-hidden="true">
      <rect x={30} y={62} width={64} height={32} rx={4} fill="#1c1d1a" stroke="#0e0e0c" strokeWidth={2} />
      {coals.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r={5}
          fill="#f08a3c"
          animate={reduce ? undefined : { opacity: [0.45, 1, 0.6] }}
          transition={{ duration: 1.6 + (i % 3) * 0.4, repeat: Infinity, repeatType: 'mirror', delay: i * 0.2 }}
        />
      ))}
    </g>
  );
}

function SuwanneePotters() {
  const reduce = useReducedMotion();
  // The Infatuation: Suwannee "pottering around … followed by their chihuahua".
  const xs = [36, 330, 330, 36, 36];
  const ys = [222, 222, 246, 246, 222];
  const t = { duration: 16, repeat: Infinity, ease: 'linear' as const, times: [0, 0.42, 0.5, 0.92, 1] };
  if (reduce) {
    return (
      <g aria-hidden="true">
        <circle cx={120} cy={222} r={8} fill="#f7f1e6" stroke="#d33c4a" strokeWidth={3} />
        <circle cx={104} cy={226} r={3.5} fill="#e3c9a0" />
      </g>
    );
  }
  return (
    <g aria-hidden="true">
      <path d="M36 222 H330 V246 H36 Z" fill="none" stroke="#7a4a35" strokeWidth={1.5} strokeDasharray="2 6" />
      <motion.circle r={3.5} fill="#e3c9a0" animate={{ cx: xs, cy: ys.map((y) => y + 4) }} transition={{ ...t, delay: 0.7 }} />
      <motion.circle r={8} fill="#f7f1e6" stroke="#d33c4a" strokeWidth={3} animate={{ cx: xs, cy: ys }} transition={t} />
    </g>
  );
}

function Seat({ n, selected, onPick }: { n: number; selected: boolean; onPick: (n: number) => void }) {
  const x = seatX(n);
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPick(n);
    }
  };
  return (
    <g
      className="seat"
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`Seat ${n}${isBoard(n) ? ', in front of the chopping board' : ''}`}
      onClick={() => onPick(n)}
      onKeyDown={onKey}
    >
      <circle cx={x} cy={STOOL_Y} r={22} fill="transparent" />
      {selected && (
        <motion.circle
          className="seat__ring"
          cx={x}
          cy={STOOL_Y}
          r={21}
          fill="none"
          stroke="#d33c4a"
          strokeWidth={4}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ originX: `${x}px`, originY: `${STOOL_Y}px` }}
        />
      )}
      <circle className="seat__ring" cx={x} cy={STOOL_Y} r={15} fill="#6e4b33" stroke="#f7f1e6" strokeWidth={2.5} />
      <text x={x} y={STOOL_Y + 5} textAnchor="middle" fontSize={14} fontWeight={800} fill="#f7f1e6" fontFamily="Karla, sans-serif">
        {n}
      </text>
    </g>
  );
}

export function Counter() {
  const reduce = useReducedMotion();
  const [seating, setSeating] = useState<SeatingId>('first');
  const [runs, setRuns] = useState(1);
  const [selected, setSelected] = useState<number | null>(null);
  const order = useMemo(() => arrivals(runs), [runs]);
  const current = service.seatings.find((s) => s.id === seating)!;
  const cardRef = useRef<HTMLDivElement>(null);

  // On a phone the card sits under the drawing; bring it up when a seat is picked.
  useEffect(() => {
    if (selected === null || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    if (r.top > window.innerHeight * 0.6) {
      cardRef.current.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
  }, [selected, reduce]);
  const late = seating === 'second';

  const pickSeating = (id: SeatingId) => {
    if (id === seating) return;
    setSeating(id);
    setRuns((r) => r + 1);
  };

  return (
    <div className="counter">
      <div>
        <div className="seg" role="group" aria-label="Choose a seating">
          {service.seatings.map((s) => (
            <button key={s.id} type="button" aria-pressed={seating === s.id} onClick={() => pickSeating(s.id)}>
              {seating === s.id && <motion.span layoutId="seg-pill" className="seg__pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span className="seg__text">{s.label}</span>
            </button>
          ))}
        </div>
        <p className="counter__time" aria-live="polite">
          {current.name}: sit down at {current.start}, done {current.finish}. The first course goes when all eight are in.
        </p>

        <svg className="counter__svg" viewBox="0 0 360 334" role="group" aria-label="The counter from above. Pick a seat.">
          {/* the room */}
          <rect x={6} y={6} width={348} height={300} rx={16} fill="#4b2519" stroke="#6a3626" strokeWidth={3} />
          {Array.from({ length: 14 }, (_, i) => (
            <line key={i} x1={18 + i * 24} y1={8} x2={18 + i * 24} y2={44} stroke="#5e3122" strokeWidth={2} />
          ))}
          <text x={288} y={54} textAnchor="middle" fontSize={9} letterSpacing={2} fill="#c0a879" fontFamily="Karla, sans-serif" fontWeight={800}>
            CHRIS’S SIDE
          </text>

          <Coals />
          {/* chopping board */}
          <rect x={150} y={64} width={60} height={30} rx={4} fill="#e3c9a0" stroke="#42210b" strokeWidth={2} />
          <line x1={160} y1={86} x2={196} y2={72} stroke="#c8d8df" strokeWidth={3} strokeLinecap="round" />
          <line x1={156} y1={88} x2={162} y2={85} stroke="#bb7840" strokeWidth={4} strokeLinecap="round" />
          {/* the blonde-wood box of the day's fish */}
          <rect x={248} y={60} width={80} height={34} rx={3} fill="#e3c9a0" stroke="#42210b" strokeWidth={2} />
          {[['#d33c4a', 254], ['#f29b7a', 272], ['#f4ece0', 290], ['#8fa3ad', 308]].map(([c, x]) => (
            <rect key={String(x)} x={Number(x)} y={66} width={14} height={22} rx={3} fill={String(c)} stroke="#42210b" strokeWidth={1} />
          ))}
          <Smoke />

          {/* the counter, worn where the elbows go */}
          <rect x={COUNTER.x} y={COUNTER.y} width={COUNTER.w} height={COUNTER.h} rx={8} fill="#987b4b" stroke="#2a130c" strokeWidth={3} />
          {[110, 118, 127, 136].map((y, i) => (
            <path key={y} d={`M24 ${y} C 90 ${y - 3}, 150 ${y + 3}, 220 ${y - 1} S 320 ${y + 2}, 336 ${y}`} fill="none" stroke={i % 2 ? '#84683c' : '#a98b58'} strokeWidth={1.4} />
          ))}
          {SEATS.map((n) => (
            <g key={n} aria-hidden="true">
              <ellipse cx={seatX(n)} cy={138} rx={15} ry={6} fill="#c0a879" opacity={0.45} />
              <rect x={seatX(n) - 8} y={124} width={16} height={10} rx={1.5} fill="#f7f1e6" />
              <line x1={seatX(n) - 6} y1={129} x2={seatX(n) + 6} y2={129} stroke="#42210b" strokeWidth={1.4} />
            </g>
          ))}

          {/* the view from the two best seats */}
          {[4, 5].map((n) => (
            <line
              key={n}
              x1={seatX(n)}
              y1={STOOL_Y - 16}
              x2={n === 4 ? 170 : 190}
              y2={95}
              stroke="#fec1a6"
              strokeWidth={2}
              strokeDasharray="3 4"
              opacity={selected === n ? 1 : 0.45}
              aria-hidden="true"
            />
          ))}

          {SEATS.map((n) => (
            <Seat key={n} n={n} selected={selected === n} onPick={setSelected} />
          ))}

          {/* guests arriving, first in first served */}
          <g key={runs} aria-hidden="true" pointerEvents="none">
            {order.map((n, i) => (
              <motion.circle
                key={n}
                r={8}
                fill="#fec1a6"
                stroke="#42210b"
                strokeWidth={2}
                initial={reduce ? { cx: seatX(n), cy: STOOL_Y + 26, opacity: 1 } : { cx: DOOR.x, cy: DOOR.y, opacity: 0 }}
                animate={{ cx: seatX(n), cy: STOOL_Y + 26, opacity: 1 }}
                transition={{ delay: reduce ? 0 : 0.2 + i * 0.32, duration: reduce ? 0 : 0.9, ease: [0.3, 0.7, 0.3, 1] }}
              />
            ))}
          </g>

          <SuwanneePotters />

          {/* the pavement side */}
          <rect x={30} y={300} width={196} height={12} rx={2} fill={late ? '#56656e' : '#c8d8df'} stroke="#f7f1e6" strokeWidth={2} />
          <rect x={262} y={300} width={50} height={12} fill="#3a1c13" />
          <path d="M262 306 A 46 46 0 0 1 306 262" fill="none" stroke="#c0a879" strokeWidth={1.5} strokeDasharray="3 4" aria-hidden="true" />
          <text x={128} y={328} textAnchor="middle" fontSize={9.5} letterSpacing={2.2} fill="#c0a879" fontFamily="Karla, sans-serif" fontWeight={800}>
            ATLANTIC ROAD
          </text>
          <text x={287} y={328} textAnchor="middle" fontSize={9} letterSpacing={2} fill="#c0a879" fontFamily="Karla, sans-serif" fontWeight={800}>
            DOOR
          </text>
        </svg>

        <div className="counter__legend">
          <span><i style={{ background: '#fec1a6' }} />Guests, first in first served</span>
          <span><i style={{ background: '#f7f1e6', border: '2px solid #d33c4a' }} />Suwannee, pottering</span>
          <span><i style={{ background: '#e3c9a0' }} />The chihuahua</span>
          <span>Schematic, not to scale.</span>
        </div>
      </div>

      <div aria-live="polite" ref={cardRef} style={{ scrollMarginTop: 84 }}>
        <AnimatePresence mode="wait" initial={false}>
          {selected === null ? (
            <motion.div
              key="none"
              className="seatcard seatcard__empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <span className="label" style={{ color: 'var(--tuna)' }}>Tap a seat</span>
              <h3>Which one would you sit in?</h3>
              <p>Pick any of the eight and we’ll show you the view, and tell you what Chris would say.</p>
            </motion.div>
          ) : (
            <motion.figure
              key={selected}
              className="seatcard"
              style={{ margin: 0 }}
              initial={{ opacity: 0, y: 16, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            >
              <div className="seatcard__photo">
                {isBoard(selected) ? (
                  <Photo id="chris-box" sizes="(min-width: 900px) 34vw, 92vw" style={{ objectPosition: '50% 62%' }} />
                ) : (
                  <Photo id="room" sizes="(min-width: 900px) 34vw, 92vw" style={{ objectPosition: `${((selected - 1) / 7) * 100}% 60%` }} />
                )}
              </div>
              <div className="seatcard__body">
                <div className="seatcard__num">
                  <span className="label">Seat {selected}</span>
                  <span className="label" style={{ color: 'var(--ink-soft)' }}>{current.label} seating</span>
                </div>
                {isBoard(selected) ? (
                  <>
                    <h3>Honestly? The best seat in the house.</h3>
                    <blockquote>“{bestSeats.honest}”</blockquote>
                    <figcaption>The view from here: the day’s fish, in the blonde-wood box. Photo: Kurisu Omakase.</figcaption>
                  </>
                ) : (
                  <>
                    <h3>Best seat in the house.</h3>
                    <p className="seatcard__note" style={{ fontSize: '1rem', color: 'var(--ink)' }}>
                      That’s what Chris will tell you, anyway. Seats {bestSeats.board.join(' and ')} are the ones in front of the board. The other six are also the best, apparently.
                    </p>
                    <blockquote>“{bestSeats.cheeky}”</blockquote>
                    <figcaption>The counter laid for service, December 2021. Photo: Ichiban Sushi.</figcaption>
                  </>
                )}
                <p className="seatcard__note">
                  “{bestSeats.rule}” Chris, to{' '}
                  <a href={bestSeats.source.url} target="_blank" rel="noopener noreferrer">
                    Resy
                  </a>
                  , 2023.
                </p>
              </div>
            </motion.figure>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
