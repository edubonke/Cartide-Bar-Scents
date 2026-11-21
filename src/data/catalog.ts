export const INSTAGRAM = 'https://www.instagram.com/cartide_barscents/';
export const FACEBOOK = 'https://www.facebook.com/people/Cartide-Bar-Scents/61590558068103/';
export const BRAND_IMAGE = '/src/assets/brand/';

export type ScentFamily = 'Fresh & Vibrant' | 'Warm & Rich' | 'Signature';
export interface PerfumeProduct {
  id: string;
  name: string;
  subtitle: string;
  scentFamily: ScentFamily;
  format: string;
  size: string | null;
  advertisedPrice: number | null;
  image: string;
  imageAlt: string;
  post: string;
  description: string;
  featured?: boolean;
}
export const SCENT_FAMILIES: Array<'All' | ScentFamily> = ['All', 'Fresh & Vibrant', 'Warm & Rich', 'Signature'];

// Details are from Cartide's public Instagram product artwork and Facebook posts.
// Unconfirmed prices and sizes are deliberately left null.
export const PRODUCTS: PerfumeProduct[] = [
  { id: 'green-sapphire', name: 'Green Sapphire', subtitle: 'A bold expression of freshness and sophistication', scentFamily: 'Fresh & Vibrant', format: 'Eau de Parfum', size: '100 ml', advertisedPrice: null, image: BRAND_IMAGE + 'green-sapphire.jpg', imageAlt: 'Green Sapphire perfume artwork with a green bottle and gold cap', post: 'https://www.instagram.com/cartide_barscents/p/DZiMPqKIWcI/', description: 'Discover the striking green and gold presentation of Green Sapphire, a fresh, sophisticated fragrance featured in the Cartide collection.', featured: true },
  { id: 'mochawood', name: 'MochaWood', subtitle: 'Warm spices, smooth woods and creamy mocha', scentFamily: 'Warm & Rich', format: 'Eau de Parfum', size: '100 ml', advertisedPrice: null, image: BRAND_IMAGE + 'mochawood.jpg', imageAlt: 'MochaWood perfume in a faceted amber bottle beside its brown carton', post: 'https://www.instagram.com/cartide_barscents/p/DZiNOUgIU63/', description: 'Warm, smooth and unforgettable. The Cartide artwork describes a blend of warm spices, smooth woods and creamy mocha indulgence.', featured: true },
  { id: 'proud-of-you', name: 'Proud of You Absolute', subtitle: 'A bold expression of strength, confidence and individuality', scentFamily: 'Signature', format: 'Eau de Parfum', size: '100 ml', advertisedPrice: null, image: BRAND_IMAGE + 'proud-of-you.jpg', imageAlt: 'Proud of You Absolute perfume bottle and black and gold packaging', post: 'https://www.instagram.com/cartide_barscents/p/DZiNn0oIzWA/', description: 'A statement fragrance presented in striking black and gold packaging. Be bold, be proud, be you.', featured: true },
  { id: 'tobacco-gourmand', name: 'Tobacco Gourmand', subtitle: 'Warm tobacco and sweet indulgence', scentFamily: 'Warm & Rich', format: 'Extrait de Parfum', size: '80 ml', advertisedPrice: null, image: BRAND_IMAGE + 'tobacco-gourmand.jpg', imageAlt: 'Tobacco Gourmand perfume and cream carton on dark wood', post: 'https://www.instagram.com/cartide_barscents/p/DZiNxEvIZKp/', description: 'The published artwork presents Tobacco Gourmand as a rich blend of warm tobacco and sweet indulgence, with a warm, sensual character.' },
  { id: 'tropical-jewel', name: 'Tropical Jewel', subtitle: 'A radiant escape into tropical luxury', scentFamily: 'Fresh & Vibrant', format: 'Extrait de Parfum', size: '50 ml', advertisedPrice: null, image: BRAND_IMAGE + 'tropical-jewel.jpg', imageAlt: 'Tropical Jewel red fragrance bottle and matching red box', post: 'https://www.instagram.com/cartide_barscents/p/DZiOA3GIqk2/', description: 'A radiant escape with striking red presentation. The Cartide artwork describes Tropical Jewel as exquisite, elegant and unforgettable.' },
  { id: 'black-optra', name: 'Black Optra', subtitle: 'A sophisticated fragrance in distinctive black packaging', scentFamily: 'Signature', format: 'Fragrance', size: null, advertisedPrice: 370, image: BRAND_IMAGE + 'black-optra.jpg', imageAlt: 'Hand holding a Black Optra perfume carton from Cartide’s Instagram post', post: 'https://www.instagram.com/cartide_barscents/p/DZkgbJ8iBVK/', description: 'Featured in Cartide’s June 14 social post. The Facebook promotion advertised R370; contact Cartide to confirm the current offer, bottle size and availability.' },
  { id: 'scandal-by-night', name: 'Scandal by Night', subtitle: 'A statement scent with a distinctive red bottle', scentFamily: 'Signature', format: 'Fragrance', size: null, advertisedPrice: null, image: BRAND_IMAGE + 'scandal.jpg', imageAlt: 'Hand holding the red Scandal by Night fragrance bottle from Cartide’s Instagram', post: 'https://www.instagram.com/cartide_barscents/p/DaBHifWCAEl/', description: 'Featured in Cartide’s June 25 Instagram carousel. Contact the brand for the available size, price and stock.' },
];
export interface JournalArticle { id: string; title: string; date: string; image: string; imageAlt: string; excerpt: string; post: string; }
export const JOURNAL_ARTICLES: JournalArticle[] = [
  { id: 'scandal', title: 'Scandal by Night', date: '25 June 2026', image: BRAND_IMAGE + 'scandal.jpg', imageAlt: 'Scandal by Night in hand', excerpt: 'A closer look at the fragrance featured in Cartide’s latest visible carousel.', post: PRODUCTS[6].post },
  { id: 'black-optra', title: 'Leave an impression', date: '14 June 2026', image: BRAND_IMAGE + 'black-optra.jpg', imageAlt: 'Black Optra carton in hand', excerpt: 'The brand’s June fragrance promotion, featuring Black Optra and the advertised R370 offer.', post: PRODUCTS[5].post },
  { id: 'proud', title: 'Be bold. Be proud. Be you.', date: '13 June 2026', image: BRAND_IMAGE + 'proud-in-hand.jpg', imageAlt: 'Proud of You Absolute bottle in hand', excerpt: 'See Proud of You Absolute up close in Cartide’s original Instagram reel.', post: 'https://www.instagram.com/cartide_barscents/reel/DZiewVVIXTe/' },
];
