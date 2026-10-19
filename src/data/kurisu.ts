// Everything factual on the site lives here. Each fact carries where it came from;
// see research/notes.md for the full trail. Past dishes are past: never tonight's menu.

export type Source = { label: string; url?: string };

export const BOOKING_URL =
  'https://www.sevenrooms.com/explore/kurisuomakase/reservations/create/search/';

export const venue = {
  name: 'Kurisu Omakase',
  // "Kurisu" is how Chris is written in Japanese.
  nameNote: '“Kurisu” is Chris, in Japanese.',
  address: {
    street: '58D Atlantic Road',
    area: 'Brixton',
    city: 'London',
    postcode: 'SW9 8PY',
  },
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=Kurisu+Omakase&query_place_id=ChIJEy90jC4FdkgRbDp-IFD2BQA',
  station: 'Brixton Underground (Victoria line) is about 150m away.',
  instagram: { handle: '@kurisuomakase', url: 'https://www.instagram.com/kurisuomakase/' },
  email: 'hello@kurisuomakase.com',
  newsletterUrl:
    'https://kurisuomakase.us3.list-manage.com/subscribe?u=6ec3fe25ce92d39b7b9bdce1a&id=6723279945',
  bookingUrl: BOOKING_URL,
  bookingPlatform: 'SevenRooms',
} as const;

// SevenRooms, checked 19 Oct 2026: shifts on Tue–Fri only, "1st Seating" 18:00 and
// "2nd Seating" 20:30, 120 minutes each, 8 covers, parties of 1–8.
export const service = {
  days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  daysShort: 'Tue–Fri',
  closedDays: 'Saturday to Monday',
  seats: 8,
  courses: 18,
  minutes: 120,
  partySize: { min: 1, max: 8 },
  structure: 'Small hot and cold starters, then nigiri, then dessert.',
  seatings: [
    { id: 'first', label: '6pm', name: 'First seating', start: '6pm', finish: 'around 8pm' },
    { id: 'second', label: '8.30pm', name: 'Second seating', start: '8.30pm', finish: 'around 10.30pm' },
  ],
  source: { label: 'Kurisu Omakase on SevenRooms, October 2026', url: BOOKING_URL } as Source,
};

export type SeatingId = (typeof service.seatings)[number]['id'];

export const price = {
  perHead: 150,
  serviceChargePct: 10,
  depositPerHead: 25,
  cancelNoticeHours: 48,
  lateCancelFeePerHead: 25,
  source: { label: 'SevenRooms booking page and policy, October 2026', url: BOOKING_URL } as Source,
};

export const season = {
  // The menu turns over with the seasons, roughly every three months (Resy, 2023).
  current: 'Autumn',
  changes: 'The menu changes every three months, and week to week with what the suppliers bring in.',
  dropsPerYear: 4,
  nextDrop: {
    // DEMO ONLY. A made-up date so the countdown has something to count to.
    // The real date goes out on Instagram and the newsletter.
    demo: true,
    isoDate: '2026-11-26T17:00:00Z',
    publicTime: '5pm',
    earlyTime: '4.30pm',
    // Real precedent: the summer 2025 newsletter.
    precedent:
      'That’s how the summer 2025 drop went: newsletter readers from 4.30pm, everyone else from 5pm.',
    source: {
      label: 'Kurisu newsletter, 28 April 2025',
      url: 'https://mailchi.mp/7a3e24871dc0/kurisu-summer-omakase-date-are-going-up-soon',
    } as Source,
  },
};

// Steps for "Nani? Let's break it down" (Chris's own newsletter line, 2019).
export const howItWorks = [
  {
    title: 'The dates drop a season at a time.',
    body: 'Four times a year the whole next season opens in one go on SevenRooms. We say when on Instagram and in the newsletter.',
    source: { label: 'Chris to Resy, 2023', url: 'https://blog.resy.com/2023/05/kurisu-omakase-reservations-tips/' },
  },
  {
    title: 'The newsletter gets a head start.',
    body: 'For the summer 2025 drop, newsletter readers could book from 4.30pm. Everyone else got in at 5pm.',
    source: {
      label: 'Kurisu newsletter, April 2025',
      url: 'https://mailchi.mp/7a3e24871dc0/kurisu-summer-omakase-date-are-going-up-soon',
    },
  },
  {
    title: 'Book it. A £25 a head deposit holds your seats.',
    body: 'Tuesday to Friday, 6pm or 8.30pm, anything from one to eight of you. Eight is the whole counter.',
    source: { label: 'SevenRooms, October 2026', url: BOOKING_URL },
  },
  {
    title: 'All gone? Get on the notify list.',
    body: 'Three months is a long time. Chris says he can look at a week, know half the names, and find a lot of them have changed a few days later. When a seat comes back, everyone on the list for that night gets an email within minutes.',
    source: { label: 'Chris to Resy, 2023', url: 'https://blog.resy.com/2023/05/kurisu-omakase-reservations-tips/' },
  },
  {
    title: 'The genius move.',
    body: 'A guest told Chris this one. When the dates go live, skip the scramble for the first week and book the furthest month. Then go on the notify list for the earlier dates and wait.',
    quote:
      'When the guest told me that, I thought, ‘you are a genius’. But now I said it, I think that trick is out the window now.',
    source: { label: 'Chris to Resy, 2023', url: 'https://blog.resy.com/2023/05/kurisu-omakase-reservations-tips/' },
  },
] satisfies { title: string; body: string; quote?: string; source: Source }[];

// Written kindly, but every one of these is a real rule.
export const houseRules = [
  {
    title: 'We start when all eight are in.',
    body: 'The menu goes out to the whole counter at once, so the first course waits for the last guest. Running late? Let us know as soon as you can.',
    source: { label: 'SevenRooms booking note', url: BOOKING_URL },
  },
  {
    title: 'Seats are first in, first served.',
    body: 'You can’t book a particular seat. Get there early and ask Chris which ones are best. He’ll tell you the truth. Usually.',
    source: { label: 'Chris to Resy, 2023', url: 'https://blog.resy.com/2023/05/kurisu-omakase-reservations-tips/' },
  },
  {
    title: 'Can’t make it? 48 hours’ notice, please.',
    body: 'Cancel at least 48 hours before and your seats go to someone on the notify list. Later than that, or not turning up, means a £25 a head fee on the card you booked with.',
    source: { label: 'SevenRooms cancellation policy', url: BOOKING_URL },
  },
  {
    title: 'No walk-ins, really.',
    body: 'Everything is prepped a few days ahead for exactly eight. Once in a blue moon a last-minute cancellation frees a seat on the night, and that’s the only way in without a booking.',
    source: { label: 'Chris to Resy, 2023', url: 'https://blog.resy.com/2023/05/kurisu-omakase-reservations-tips/' },
  },
] satisfies { title: string; body: string; source: Source }[];

export const dietary = {
  cannot: ['Vegetarians or vegans', 'Soy allergies', 'Anyone who won’t eat rice'],
  why: 'It’s eighteen courses built on fish and rice, and some of the fish is brushed with soy. We’d much rather tell you now than disappoint you on the night.',
  otherAllergies:
    'Any other allergy or requirement, put it in the box when you book. Eight seats means everything is prepped days ahead, so we can’t always change things on the night.',
  sources: [
    { label: 'SquareMeal listing', url: 'https://www.squaremeal.co.uk/restaurants/kurisu-omakase_24433' },
    { label: 'SevenRooms booking note', url: BOOKING_URL },
    {
      label: 'The Observer, 2021',
      url: 'https://www.theguardian.com/food/2021/aug/22/kurisu-omakase-at-ichiban-sushi-london-it-is-both-dinner-and-theatre-restaurant-review',
    },
  ] as Source[],
};

export type PhotoId =
  | 'chris-box'
  | 'torched'
  | 'scallop'
  | 'ageing'
  | 'osuimono'
  | 'tuna-loin'
  | 'ika'
  | 'room'
  | 'ichiban-thai'
  | 'ichiban-sashimi'
  | 'ichiban-sushi'
  | 'ichiban-katsu'
  | 'prawn-2019'
  | 'squid-2019'
  | 'whitefish-2019';

// All of these are Kurisu's or Ichiban's own pictures. No press photographers' work.
export const photos: Record<PhotoId, { alt: string; credit: string; w: number; h: number }> = {
  'chris-box': {
    alt: 'Chris in a backwards cap and black tee, holding the blonde-wood box of the day’s fish.',
    credit: 'Kurisu Omakase, via Resy, 2023',
    w: 1067,
    h: 1600,
  },
  torched: {
    alt: 'A torched, peppered nigiri with a dab of sauce, on black slate.',
    credit: 'Kurisu Omakase, via Resy, 2023',
    w: 1600,
    h: 1128,
  },
  scallop: {
    alt: 'A huge raw scallop sitting in the palm of Chris’s hand.',
    credit: '@kurisuomakase, October 2022',
    w: 1080,
    h: 1080,
  },
  ageing: {
    alt: 'Fish fillets, red and silver, hanging in the dry-ageing cabinet.',
    credit: '@kurisuomakase, February 2023',
    w: 1080,
    h: 1080,
  },
  osuimono: {
    alt: 'Red mullet in a red lacquer bowl with mushrooms and a crown of enoki tempura, on the worn dark counter.',
    credit: '@kurisuomakase, February 2023',
    w: 1080,
    h: 1080,
  },
  'tuna-loin': {
    alt: 'A dark, aged tuna loin on a steel tray in the kitchen.',
    credit: '@kurisuomakase, February 2023',
    w: 1080,
    h: 1350,
  },
  ika: {
    alt: 'Squid nigiri on a speckled plate, chopsticks resting on blonde wood in front.',
    credit: '@kurisuomakase, July 2024',
    w: 1080,
    h: 1080,
  },
  room: {
    alt: 'The room laid as one long counter: dark wooden tables pushed together, chopsticks on white paper, the konro and chopping board at the far end, grey walls and mint-green trim.',
    credit: '@ichibansushibrixton, 4 December 2021',
    w: 1080,
    h: 612,
  },
  'ichiban-thai': {
    alt: 'Ichiban’s Thai dishes: papaya salad, grilled chicken and larb in pale green bowls.',
    credit: '@ichibansushibrixton, April 2022',
    w: 1080,
    h: 1080,
  },
  'ichiban-sashimi': {
    alt: 'Rows of sashimi bowls with tuna, salmon, uni and carved radish.',
    credit: '@ichibansushibrixton, June 2022',
    w: 1080,
    h: 1080,
  },
  'ichiban-sushi': {
    alt: 'An Ichiban sushi platter: nigiri, roe-rolled uramaki and cucumber maki on a glass plate.',
    credit: '@ichibansushibrixton, December 2021',
    w: 1080,
    h: 1080,
  },
  'ichiban-katsu': {
    alt: 'Two takeaway tubs of katsu curry with sesame and spring onion.',
    credit: '@ichibansushibrixton, November 2021',
    w: 1080,
    h: 1350,
  },
  'prawn-2019': {
    alt: 'Torched prawn nigiri with spring onion, on speckled stoneware.',
    credit: 'Kurisu newsletter, 2019',
    w: 1100,
    h: 720,
  },
  'squid-2019': {
    alt: 'Finely cut squid nigiri with cracked pepper.',
    credit: 'Kurisu newsletter, 2019',
    w: 1100,
    h: 720,
  },
  'whitefish-2019': {
    alt: 'A white fish nigiri scored and torched in stripes, with a dab of paste on top.',
    credit: 'Kurisu newsletter, 2019',
    w: 1100,
    h: 720,
  },
};

export type Course = {
  name: string;
  detail: string;
  part: 'Starters' | 'Nigiri' | 'To finish';
  when: string;
  quote?: string;
  photo?: PhotoId;
  photoNote?: string;
  source: Source;
};

const OBSERVER: Source = {
  label: 'Jay Rayner, The Observer, 2021',
  url: 'https://www.theguardian.com/food/2021/aug/22/kurisu-omakase-at-ichiban-sushi-london-it-is-both-dinner-and-theatre-restaurant-review',
};
const INFATUATION: Source = {
  label: 'The Infatuation, 2024',
  url: 'https://www.theinfatuation.com/london/reviews/kurisu-omakase',
};
const RESY: Source = {
  label: 'Chris to Resy, 2023',
  url: 'https://blog.resy.com/2023/05/kurisu-omakase-reservations-tips/',
};
const GSTP: Source = {
  label: 'God Save the Points, 2022',
  url: 'https://www.godsavethepoints.com/kurisu-omakase-london-sushi-heaven/',
};

// Past seasons only. Nothing here is promised for the next menu.
export const pastCourses: Course[] = [
  {
    name: 'Seared aged tuna, ponzu, Parmesan',
    detail: 'Pale pink slices of tuna, aged for a denser texture, seared, in a puddle of brisk ponzu under a shower of Parmesan.',
    part: 'Starters',
    when: '2021',
    photo: 'tuna-loin',
    photoNote: 'An aged tuna loin in the kitchen, February 2023.',
    source: OBSERVER,
  },
  {
    name: 'Crab croquette, Thai nam jim',
    detail: 'White and brown crab meat, fried golden, sitting in a thick green pond of sweet-sour nam jim. The fried course, and a nod to the Thai side of the family.',
    part: 'Starters',
    when: '2021',
    source: OBSERVER,
  },
  {
    name: 'Miso hamachi off the brazier',
    detail: 'Miso-slicked hamachi seared over the coals until bubbling and brown, with a fan of enoki tempura, shredded radish and a ginger dressing.',
    part: 'Starters',
    when: '2021',
    source: OBSERVER,
  },
  {
    name: 'Confit uni butter risotto',
    detail: 'One of the openers the Infatuation called “unexpected masterstrokes”. A reviewer in 2022 was more succinct.',
    part: 'Starters',
    when: '2022 and 2024',
    quote: 'The uni risotto – omg.',
    source: GSTP,
  },
  {
    name: 'Osuimono',
    detail: 'Red mullet zuke and shimofuri, wild mushroom dashi, shiitake, hen of the woods, enoki tempura, salty fingers and kinome.',
    part: 'Starters',
    when: 'Winter 2022–23',
    photo: 'osuimono',
    source: { label: '@kurisuomakase, February 2023', url: 'https://www.instagram.com/p/Coz9ysZI7kA/' },
  },
  {
    name: 'Chutoro “chop chop”',
    detail: 'Medium-fatty tuna, torched, with a little tartare. Named after a snack Suwannee used to give Chris when he was small.',
    part: 'Nigiri',
    when: '2023',
    quote: 'Carrying that story, carrying that memory, being able to tell guests about chop chop.',
    source: RESY,
  },
  {
    name: 'Seared trout belly, Thai basil miso',
    detail: 'Trout belly seared on the brazier and finished with a Thai basil miso.',
    part: 'Nigiri',
    when: '2021',
    quote: 'A Thai basil miso so aromatic you could dab it behind your ears.',
    source: OBSERVER,
  },
  {
    name: 'Smoked trout, lime zest',
    detail: 'Theatrically smoked trout, finished with lime zest. The limes come from the Sainsbury’s round the corner.',
    part: 'Nigiri',
    when: '2024',
    source: INFATUATION,
  },
  {
    name: 'Ika',
    detail: 'Squid nigiri.',
    part: 'Nigiri',
    when: 'Summer 2024',
    photo: 'ika',
    source: { label: '@kurisuomakase, July 2024', url: 'https://www.instagram.com/p/C9xgTF6o8BC/' },
  },
  {
    name: 'Aged fish',
    detail: 'Nigiri made with fish aged, treated and cured for anything between 4 and 30 days. By early 2023 they had been dry-ageing fish here for over two years.',
    part: 'Nigiri',
    when: '2023',
    quote: 'It’s been a fun, education and very very tasty learning experience.',
    photo: 'ageing',
    source: { label: '@kurisuomakase, February 2023', url: 'https://www.instagram.com/p/CosFP8iISzW/' },
  },
  {
    name: 'Hokkaido scallop, the Houdini cut',
    detail: 'Scored 18 times so the surface opens out, with yuzu.',
    part: 'Nigiri',
    when: '2021 and 2024',
    quote: 'It’s called the Houdini cut because it disappears on the palate.',
    photo: 'scallop',
    photoNote: '“Just a stupidly large and beautiful scallop”, October 2022.',
    source: OBSERVER,
  },
  {
    name: 'Otoro “THC”',
    detail: 'Fatty tuna seared over charcoal with truffle, hanaho and caviar. Not that THC.',
    part: 'Nigiri',
    when: '2024',
    source: INFATUATION,
  },
  {
    name: 'Toro temaki',
    detail: 'A hand roll of the very best tuna tartare, the seaweed given a few slaps over the charcoal flame first, handed straight from his hand to yours.',
    part: 'To finish',
    when: '2021 and 2022',
    quote: 'Here. Have a tuna spliff.',
    source: { label: 'The Observer, 2021 · God Save the Points, 2022', url: OBSERVER.url },
  },
];

export const press = [
  {
    quote:
      'I do not hesitate to say that what’s being served here is some of the very best sushi in the UK today.',
    who: 'Jay Rayner',
    outlet: 'The Observer',
    date: '22 August 2021',
    url: OBSERVER.url,
  },
  {
    quote: 'It is both dinner and theatre.',
    who: 'Jay Rayner',
    outlet: 'The Observer',
    date: '22 August 2021',
    url: OBSERVER.url,
  },
  {
    quote: 'Kurisu Omakase mixes incredible sushi with made-in-Brixton charm.',
    who: 'Rated 9.4',
    outlet: 'The Infatuation',
    date: 'in its London Top 25, 2026',
    url: INFATUATION.url,
  },
] as const;

// Chris on where to sit (Resy, 2023).
export const bestSeats = {
  board: [4, 5],
  honest:
    'I guess the best seats in the house would be the two seats that are directly in front of my counter, where I do the chopping board. You get the best view from there, and then we smoke some of the sushi, so you really get the first few of those aromas.',
  cheeky: 'Though sometimes I tell people, these are the best seats.',
  rule: 'Requesting specific seats is not really a thing. It’s kind of like, first in, first service.',
  source: RESY,
};

export const story = [
  {
    year: '1999',
    title: 'Ichiban Sushi opens at 58a Atlantic Road.',
    body: 'A Thai-Colombian family running a Japanese restaurant in Brixton: rice bowls, sturdy nigiri and properly punchy Thai green curries.',
    source: OBSERVER,
  },
  {
    year: 'Age 10',
    title: 'Chris starts carrying plates.',
    body: 'At weekends the food at Ichiban came out with a bright-eyed ten-year-old. He was watching more than he let on.',
    source: OBSERVER,
  },
  {
    year: 'Age 16',
    title: 'Into the kitchen, then off to Tokyo.',
    body: 'He ate his way round London’s best sushi counters, then got a place at the Tokyo Sushi Academy. Ask him about being turned away from Tokyo restaurants for his tattoos.',
    source: OBSERVER,
  },
  {
    year: '2019',
    title: 'Kurisu Omakase begins.',
    body: 'Eighteen courses for six at Ichiban, plus a run at The Wine Parlour on Vining Street. By 2020 it was Sundays and Mondays, when Ichiban was shut, at £80 a head. Dates went out on Instagram and the newsletter, and went fast.',
    source: {
      label: 'Kurisu newsletters, 2019–20',
      url: 'https://us3.campaign-archive.com/home/?u=6ec3fe25ce92d39b7b9bdce1a&id=6723279945',
    },
  },
  {
    year: '2021',
    title: 'Jay Rayner sets an alarm.',
    body: 'He booked at the drop like everyone else, came for dinner, and called it some of the very best sushi in the UK.',
    source: OBSERVER,
  },
  {
    year: '18 Dec 2021',
    title: 'Ichiban’s last day, after 22 years.',
    body: '“It’s going to be a home for @kurisuomakase.” The room the family had run since 1999 became Chris’s counter.',
    source: { label: '@ichibansushibrixton, 4 December 2021', url: 'https://www.instagram.com/p/CXEIZWQo3Tm/' },
  },
  {
    year: 'Now',
    title: 'Eight seats, Tuesday to Friday.',
    body: 'Chris on the knife, the torch and the coals. Suwannee runs the room. The back-and-forth between the two of them is half the night.',
    source: RESY,
  },
];

export const chrisOnHospitality = {
  quote: 'I want people to feel like they just left their friend’s house showing off, rather than a restaurant.',
  uniqueness:
    'The one thing we all have in common being humans is the fact that we’re unique. So being able to showcase your uniqueness in whichever vessel you can, such as food, art, music, I think it’s incredibly important.',
  source: RESY,
};
