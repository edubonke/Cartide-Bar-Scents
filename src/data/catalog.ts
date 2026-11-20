export type ScentFamily =
  | 'Woody & Resin'
  | 'Floral & Botanical'
  | 'Citrus & Mineral'
  | 'Spiced Amber';

export interface ProductVariant {
  id: string;
  label: string;
  weight: string;
  price: number;
  detail: string;
}

export interface PerfumeProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  scentFamily: ScentFamily;
  batchCode: string;
  basePrice: number;
  image: string;
  imageAlt: string;
  featured: boolean;
  longevity: string;
  sillage: string;
  poeticSummary: string;
  craftStory: string;
  notes: {
    top: string;
    heart: string;
    base: string;
  };
  socialProof: {
    quote: string;
    author: string;
    context: string;
  };
  variants: ProductVariant[];
}

export interface JournalArticle {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  body: string[];
}

export interface DispatchFrame {
  id: string;
  caption: string;
  handleTag: string;
  image: string;
  imageAlt: string;
}

export const SCENT_FAMILIES: Array<'All' | ScentFamily> = [
  'All',
  'Woody & Resin',
  'Floral & Botanical',
  'Citrus & Mineral',
  'Spiced Amber',
];

export const PRODUCTS: PerfumeProduct[] = [
  {
    id: 'cbs-01',
    slug: 'no-01-oud-obsidian',
    name: 'No. 01 Oud & Smoked Cedar',
    subtitle: 'Resinous dark wood pressed in beeswax',
    scentFamily: 'Woody & Resin',
    batchCode: 'Batch 14 · 120 bars',
    basePrice: 370,
    image: '/src/assets/images/bar_woody_oud_1795179463505.jpg',
    imageAlt: 'Matte charcoal and brushed brass solid perfume bar containing No. 01 Oud and Smoked Cedar',
    featured: true,
    longevity: '6 to 8 hours on pulse points',
    sillage: 'Intimate, skin-warm projection',
    poeticSummary:
      'Dry cedar shavings warmed by evening rain, anchored in raw agarwood resin and blackened vetiver root.',
    craftStory:
      'Macerated over twenty-eight days in cold-pressed Cape jojoba and unrefined wild beeswax, No. 01 melts silently on contact with skin without the flash of alcohol.',
    notes: {
      top: 'Crushed black peppercorn, bitter bergamot rind',
      heart: 'Atlas cedarwood, roasted guaiac, dry iris root',
      base: 'Aged oud resin, Haitian vetiver, dark labdanum',
    },
    socialProof: {
      quote:
        'Wears close like fine cashmere. Three hours after applying to my wrists, colleagues still ask what I am wearing without it ever filling the room.',
      author: 'Thabo Mokoena',
      context: 'Architect, Johannesburg · Verified Collector',
    },
    variants: [
      {
        id: 'brass-case',
        label: 'Brushed Brass Slide Case',
        weight: '18g Solid Bar',
        price: 370,
        detail: 'Engraved solid brass outer sleeve with magnetic slide lid',
      },
      {
        id: 'obsidian-case',
        label: 'Anodized Obsidian Case',
        weight: '18g Solid Bar',
        price: 390,
        detail: 'Matte black anodized aluminum vessel with brushed interior',
      },
      {
        id: 'wax-refill',
        label: 'Atelier Wax Refill',
        weight: '18g Refill Pan',
        price: 210,
        detail: 'Drop-in compostable tray for existing Cartide metallic vessels',
      },
    ],
  },
  {
    id: 'cbs-02',
    slug: 'no-02-neroli-linen',
    name: 'No. 02 White Neroli & Linen',
    subtitle: 'Sunlit blossom and crisp raw cotton',
    scentFamily: 'Floral & Botanical',
    batchCode: 'Batch 19 · 95 bars',
    basePrice: 370,
    image: '/src/assets/images/bar_botanical_neroli_1795179464216.jpg',
    imageAlt: 'Champagne bronze solid perfume compact beside a white neroli blossom on travertine stone',
    featured: true,
    longevity: '5 to 7 hours on pulse points',
    sillage: 'Airy, radiant skin trail',
    poeticSummary:
      'Morning light across unbleached linen, bitter orange blossom crushed between fingers, and pale sandalwood.',
    craftStory:
      'Steam-distilled Tunisian neroli oil is folded into shea butter and candelilla wax at low heat to preserve the fragile green leaf facet of the blossom.',
    notes: {
      top: 'Petitgrain leaf, green mandarin zest',
      heart: 'Tunisian neroli blossom, white tea, crushed fig leaf',
      base: 'Unbleached musk, Australian sandalwood, ambrette seed',
    },
    socialProof: {
      quote:
        'Clean without ever smelling soapy. The champagne case sits permanently in my coat pocket for gallery openings and flights.',
      author: 'Claire van der Merwe',
      context: 'Curator, Cape Town · Verified Collector',
    },
    variants: [
      {
        id: 'champagne-case',
        label: 'Satin Champagne Case',
        weight: '18g Solid Bar',
        price: 370,
        detail: 'Turned champagne-bronze compact with hinged precision mirror',
      },
      {
        id: 'brass-case',
        label: 'Brushed Brass Slide Case',
        weight: '18g Solid Bar',
        price: 370,
        detail: 'Engraved solid brass outer sleeve with magnetic slide lid',
      },
      {
        id: 'wax-refill',
        label: 'Atelier Wax Refill',
        weight: '18g Refill Pan',
        price: 210,
        detail: 'Drop-in compostable tray for existing Cartide metallic vessels',
      },
    ],
  },
  {
    id: 'cbs-03',
    slug: 'no-03-amber-myrrh',
    name: 'No. 03 Burnished Amber & Myrrh',
    subtitle: 'Golden fossilized resin and warm spice',
    scentFamily: 'Spiced Amber',
    batchCode: 'Batch 11 · 80 bars',
    basePrice: 370,
    image: '/src/assets/images/bar_amber_resin_1795179463304.jpg',
    imageAlt: 'Antique bronze engraved solid perfume compact open with golden balm and raw amber resin',
    featured: true,
    longevity: '7 to 9 hours on pulse points',
    sillage: 'Velvety, enveloping warmth',
    poeticSummary:
      'Translucent amber tears melted over warm cedar bark, spiced gently with cardamom pod and cured vanilla bean.',
    craftStory:
      'Hand-poured into antique-finished bronze compacts, No. 03 deepens over hours as natural skin warmth releases the heavier benzoin and myrrh resins.',
    notes: {
      top: 'Green cardamom pod, toasted coriander, saffron thread',
      heart: 'Somali myrrh, benzoin Siam, smoked honey',
      base: 'Fossilized amber accord, Madagascar vanilla, cedar bark',
    },
    socialProof: {
      quote:
        'At R370 it outperforms bottles four times its price. Deeply resinous, never cloying, and zero spill anxiety while travelling.',
      author: 'Nadia Patel',
      context: 'Interior Stylist, Durban · Verified Collector',
    },
    variants: [
      {
        id: 'antique-bronze',
        label: 'Engraved Antique Bronze',
        weight: '18g Solid Bar',
        price: 395,
        detail: 'Botanical relief-engraved hinged bronze vessel',
      },
      {
        id: 'brass-case',
        label: 'Brushed Brass Slide Case',
        weight: '18g Solid Bar',
        price: 370,
        detail: 'Minimalist brushed brass slide case',
      },
      {
        id: 'wax-refill',
        label: 'Atelier Wax Refill',
        weight: '18g Refill Pan',
        price: 210,
        detail: 'Drop-in compostable tray for existing Cartide metallic vessels',
      },
    ],
  },
  {
    id: 'cbs-04',
    slug: 'no-04-bergamot-travertine',
    name: 'No. 04 Bergamot & Wet Travertine',
    subtitle: 'Dry mineral citrus and crushed vetiver',
    scentFamily: 'Citrus & Mineral',
    batchCode: 'Batch 22 · 110 bars',
    basePrice: 370,
    image: '/src/assets/images/hero_solid_perfume_1795179463910.jpg',
    imageAlt: 'Brushed bronze solid perfume bar on pale travertine stone with dried vetiver root and bergamot peel',
    featured: false,
    longevity: '5 to 6 hours on pulse points',
    sillage: 'Crisp, architectural clarity',
    poeticSummary:
      'Sun-baked Calabrian bergamot peel laid over cool limestone, grounded by earthy dried vetiver root.',
    craftStory:
      'Cold-expressed citrus oils typically evaporate within minutes in alcohol sprays; locked inside our botanical balm matrix, the zest stays luminous through midday.',
    notes: {
      top: 'Calabrian bergamot, crushed juniper berry, sea salt',
      heart: 'White sage, mineral flint accord, cypress needle',
      base: 'Dried vetiver root, pale oakmoss, cedarwood',
    },
    socialProof: {
      quote:
        'The first citrus scent I own that actually lasts past noon. Crisp, mineral, and remarkably composed.',
      author: 'Daniel Kruger',
      context: 'Industrial Designer, Pretoria · Verified Collector',
    },
    variants: [
      {
        id: 'brass-case',
        label: 'Brushed Brass Slide Case',
        weight: '18g Solid Bar',
        price: 370,
        detail: 'Precision-milled brushed bronze hinged case',
      },
      {
        id: 'wax-refill',
        label: 'Atelier Wax Refill',
        weight: '18g Refill Pan',
        price: 210,
        detail: 'Drop-in compostable tray for existing Cartide metallic vessels',
      },
    ],
  },
  {
    id: 'cbs-05',
    slug: 'no-05-vetiver-smoke',
    name: 'No. 05 Charred Vetiver & Suede',
    subtitle: 'Earthy roots and worn leather grain',
    scentFamily: 'Woody & Resin',
    batchCode: 'Batch 09 · 65 bars',
    basePrice: 370,
    image: '/src/assets/images/bar_woody_oud_1795179463505.jpg',
    imageAlt: 'Obsidian and brass solid perfume bar resting on limestone surface',
    featured: false,
    longevity: '7 to 8 hours on pulse points',
    sillage: 'Composed, dry-down trail',
    poeticSummary:
      'Rooty Java vetiver tempered with violet leaf, raw suede accord, and quiet birch tar.',
    craftStory:
      'Blended for deliberate evening wear, No. 05 pairs two harvests of vetiver—smoky Java and bright Haitian—inside a velvety matte balm.',
    notes: {
      top: 'Violet leaf, nutmeg husk, elemi resin',
      heart: 'Java & Haitian vetiver, smoked tea leaf',
      base: 'Brushed suede accord, birch tar, tonka bean',
    },
    socialProof: {
      quote:
        'Unapologetically dry and refined. Feels like stepping into an old architectural library.',
      author: 'Siyabonga Dlamini',
      context: 'Creative Director, Johannesburg · Verified Collector',
    },
    variants: [
      {
        id: 'obsidian-case',
        label: 'Anodized Obsidian Case',
        weight: '18g Solid Bar',
        price: 370,
        detail: 'Matte charcoal slide sleeve over brushed brass pan',
      },
      {
        id: 'wax-refill',
        label: 'Atelier Wax Refill',
        weight: '18g Refill Pan',
        price: 210,
        detail: 'Drop-in compostable tray for existing Cartide metallic vessels',
      },
    ],
  },
  {
    id: 'cbs-06',
    slug: 'no-06-fig-jasmine',
    name: 'No. 06 Wild Fig & Night Jasmine',
    subtitle: 'Sap-green orchard and velvet petal',
    scentFamily: 'Floral & Botanical',
    batchCode: 'Batch 16 · 90 bars',
    basePrice: 370,
    image: '/src/assets/images/bar_botanical_neroli_1795179464216.jpg',
    imageAlt: 'Champagne solid perfume bar with white botanical blossom on warm stone',
    featured: false,
    longevity: '6 to 7 hours on pulse points',
    sillage: 'Luminous, warm botanical trail',
    poeticSummary:
      'Snapped green fig branch at dusk just as night-blooming jasmine opens over creamy sandalwood.',
    craftStory:
      'Instead of synthetic floral isolates, we infuse hand-harvested jasmine sambac concrete directly into warm jojoba balm.',
    notes: {
      top: 'Crushed fig leaf, galbanum resin, green pear',
      heart: 'Jasmine sambac concrete, bitter almond, mimosa',
      base: 'Creamy fig wood, sandalwood, white benzoin',
    },
    socialProof: {
      quote:
        'Green and velvety at the same time. My partner keeps borrowing the tin whenever we travel.',
      author: 'Amara Okafor',
      context: 'Editor, Cape Town · Verified Collector',
    },
    variants: [
      {
        id: 'champagne-case',
        label: 'Satin Champagne Case',
        weight: '18g Solid Bar',
        price: 370,
        detail: 'Turned champagne-bronze compact with hinged lid',
      },
      {
        id: 'wax-refill',
        label: 'Atelier Wax Refill',
        weight: '18g Refill Pan',
        price: 210,
        detail: 'Drop-in compostable tray for existing Cartide metallic vessels',
      },
    ],
  },
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'journal-01',
    category: 'Craftsmanship',
    date: 'October 2026',
    readTime: '4 min read',
    title: 'Why Solid Perfumery Outlasts the Alcohol Flash',
    excerpt:
      'Without denatured alcohol racing off the skin, botanical oils bind to beeswax and release slowly with body warmth.',
    image: '/src/assets/images/atelier_craft_story_1795179463800.jpg',
    imageAlt: 'Cartide Bar Scents perfumer workbench with brass pouring molds and raw beeswax',
    body: [
      'Conventional spray perfumery relies on up to eighty percent ethanol to atomize fragrance into the air. While dramatic in the first thirty seconds, that rapid evaporation strips away fragile citrus and botanical top notes before the scent ever settles.',
      'At Cartide Bar Scents, we return to the oldest vehicle in fine perfumery: a calibrated matrix of unrefined wild beeswax, cold-pressed Cape jojoba, and raw plant waxes. Because the carrier melts just above thirty-four degrees Celsius, each swipe warms into the skin barrier rather than flashing off into the room.',
      'The result is an intimate aura—sophisticated luxury smell that rewards closeness rather than announcing itself from across a corridor. Every 18g solid bar yields roughly four months of daily pulse-point ritual and slips flat into a jacket pocket or carry-on.',
    ],
  },
  {
    id: 'journal-02',
    category: 'Materials',
    date: 'September 2026',
    readTime: '3 min read',
    title: 'Precision-Milled Bronze: Vessels Designed to Patina',
    excerpt:
      'Single-use glass atomizers belong to the past. Our refillable metallic cases age alongside the wearer.',
    image: '/src/assets/images/hero_solid_perfume_1795179463910.jpg',
    imageAlt: 'Brushed bronze solid perfume bar resting on carved travertine stone',
    body: [
      'A fragrance object should feel substantial in the palm before the lid even slides open. Each Cartide vessel is milled from solid architectural brass or anodized aluminum, finished by hand with directional brushing and recessed typography.',
      'Unlike lacquered plastics that chip or glass flacons that shatter in transit, raw brushed bronze develops a quiet, personal patina from the oils of your fingertips. When your balm reaches the pan floor after months of use, simply press in a R210 Atelier Wax Refill.',
      'Luxury begins where ordinary ends—not through excessive packaging, but through permanence, weight, and tactile restraint.',
    ],
  },
  {
    id: 'journal-03',
    category: 'Ritual',
    date: 'August 2026',
    readTime: '3 min read',
    title: 'The Art of Layering Two Solid Bars',
    excerpt:
      'Pairing dry citrus mineral top coats with resinous amber foundations creates a signature exclusive to your skin.',
    image: '/src/assets/images/bar_amber_resin_1795179463304.jpg',
    imageAlt: 'Antique bronze solid perfume compact with golden balm and raw amber resin',
    body: [
      'Because solid balms stay precisely where you place them on wrists, collarbone, or behind the ear, they invite intentional layering without muddying the air.',
      'Begin by warming No. 03 Burnished Amber & Myrrh across the lower pulse points for a resinous six-hour anchor, then trace No. 04 Bergamot & Wet Travertine over the inner forearm for crisp mineral lift.',
      'Because neither bar contains drying alcohol, the botanicals harmonize seamlessly on skin—evolving quietly from morning studio hours into late evening.',
    ],
  },
];

export const DISPATCH_FRAMES: DispatchFrame[] = [
  {
    id: 'disp-01',
    caption: 'Small-batch pour #14 cooling in turned brass pans before hand-stamping.',
    handleTag: '@cartidebarscents · Atelier Bench',
    image: '/src/assets/images/atelier_craft_story_1795179463800.jpg',
    imageAlt: 'Artisan perfumery bench with brass molds and raw beeswax',
  },
  {
    id: 'disp-02',
    caption: 'No. 01 Oud & Smoked Cedar — brushed brass meets matte obsidian.',
    handleTag: '@cartidebarscents · Object Study',
    image: '/src/assets/images/bar_woody_oud_1795179463505.jpg',
    imageAlt: 'Obsidian and brass solid perfume bar on limestone',
  },
  {
    id: 'disp-03',
    caption: 'Morning light over travertine and Tunisian neroli harvest trials.',
    handleTag: '@cartidebarscents · Botanical Notes',
    image: '/src/assets/images/bar_botanical_neroli_1795179464216.jpg',
    imageAlt: 'Champagne solid perfume bar beside white neroli flower',
  },
  {
    id: 'disp-04',
    caption: 'Raw Somali myrrh and fossilized amber tears prior to maceration.',
    handleTag: '@cartidebarscents · Raw Resin',
    image: '/src/assets/images/bar_amber_resin_1795179463304.jpg',
    imageAlt: 'Antique bronze compact with raw amber resin crystals',
  },
];
