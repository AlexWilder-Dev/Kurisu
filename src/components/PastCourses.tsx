import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { pastCourses, service, type Course } from '../data/kurisu';
import { Photo } from './Photo';
import { Reveal } from './Reveal';

const CUTS = 18;
const R = 76;
// Score lines across the scallop, before rotation.
const lineX = (i: number) => 100 - R + ((i + 1) * (2 * R)) / (CUTS + 1);

function Cut({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const length = useTransform(progress, [i / CUTS, (i + 1) / CUTS], [0, 1]);
  return (
    <motion.line
      x1={lineX(i)}
      x2={lineX(i)}
      y1={8}
      y2={192}
      stroke="#42210b"
      strokeWidth={2.2}
      strokeLinecap="round"
      opacity={0.75}
      style={{ pathLength: length }}
    />
  );
}

function Scallop({ progress }: { progress: MotionValue<number> }) {
  // The knife follows the next cut.
  const knifeX = useTransform(progress, [0, 1], [lineX(0) - 100, lineX(CUTS - 1) - 100]);
  const knifeY = useTransform(progress, (p) => (p >= 1 ? -40 : -36 + ((p * CUTS) % 1) * 84));
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <clipPath id="scallop-clip">
          <circle cx={100} cy={100} r={R - 2} />
        </clipPath>
        <radialGradient id="scallop-flesh" cx="42%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#fffaf2" />
          <stop offset="100%" stopColor="#efe2cf" />
        </radialGradient>
      </defs>
      <ellipse cx={104} cy={106} rx={R} ry={R} fill="#42210b" />
      <circle cx={100} cy={100} r={R} fill="url(#scallop-flesh)" stroke="#42210b" strokeWidth={4} />
      <circle cx={100} cy={100} r={R - 12} fill="none" stroke="#e6d6bf" strokeWidth={2} />
      <g clipPath="url(#scallop-clip)">
        <g transform="rotate(28 100 100)">
          {Array.from({ length: CUTS }, (_, i) => (
            <Cut key={i} i={i} progress={progress} />
          ))}
        </g>
      </g>
      <g transform="rotate(28 100 100)">
        <motion.g className="scallop__knife" style={{ x: knifeX, y: knifeY }}>
          <path d="M100 18 L106 22 L106 92 L100 100 Z" fill="#c8d8df" stroke="#42210b" strokeWidth={2} strokeLinejoin="round" />
          <rect x={98.5} y={-14} width={9} height={32} rx={3} fill="#bb7840" stroke="#42210b" strokeWidth={2} />
        </motion.g>
      </g>
    </svg>
  );
}

function CourseItem({ c }: { c: Course }) {
  return (
    <Reveal className={`course ${c.photo ? 'course--photo' : ''}`}>
      <div>
        <span className="course__when">Past season · {c.when}</span>
        <h4>{c.name}</h4>
        <p>{c.detail}</p>
        {c.quote && <blockquote>“{c.quote}”</blockquote>}
        <a className="source" href={c.source.url} target="_blank" rel="noopener noreferrer">
          {c.source.label}
        </a>
      </div>
      {c.photo && (
        <figure>
          <div className="frame">
            <Photo id={c.photo} sizes="(min-width: 640px) 220px, 92vw" />
          </div>
          <figcaption>{c.photoNote ?? `Photo: ${c.source.label}.`}</figcaption>
        </figure>
      )}
    </Reveal>
  );
}

export function PastCourses() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 70%'] });
  const [cuts, setCuts] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (p) => setCuts(Math.min(CUTS, Math.floor(p * CUTS + 0.001))));

  const parts = ['Starters', 'Nigiri', 'To finish'] as const;

  return (
    <div className="courses">
      <div className="scallop">
        <Scallop progress={scrollYProgress} />
        <div>
          <p className="scallop__count" aria-live="off">
            {cuts === CUTS ? 'Eighteen cuts. Done.' : `Cut ${cuts} of ${CUTS}`}
          </p>
          <p className="scallop__note">Hokkaido scallop, scored 18 times. Chris calls it the Houdini cut.</p>
          <p className="scallop__long">
            “It’s called the Houdini cut because it disappears on the palate.” {service.courses} courses, {CUTS} cuts:
            scroll the menus and watch it go.
          </p>
        </div>
      </div>

      <div ref={listRef}>
        {parts.map((part) => (
          <div key={part}>
            <div className="course-part">
              <h3>{part}</h3>
            </div>
            {pastCourses
              .filter((c) => c.part === part)
              .map((c) => (
                <CourseItem key={c.name} c={c} />
              ))}
          </div>
        ))}
        <p className="courses__end">Then dessert. Then you go home and tell everyone about the scallop.</p>
      </div>
    </div>
  );
}
