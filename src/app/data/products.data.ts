import { Product } from '../models/product.model';

/**
 * Built-in catalogue used as an offline fallback when the API is not
 * configured or not reachable. Mirrors the 14 products in the backend seed.
 * Image paths use Angular's asset folder (src/assets/images).
 */
export const BUILTIN_PRODUCTS: Product[] = [
  { id: 1, name: 'Tenax Ager Colour Enhancing Sealer 1L', brand: 'Tenax', cat: 'sealers',
    img: 'assets/images/tenax-ager.jpg', price: 2850, mrp: 3400, rating: 4.9, reviews: 186, stock: 25, badge: 'HOT',
    spec: 'Italian wet-look sealer · Anti-graffiti · 1 Litre · Raw-smooth natural stones' },
  { id: 2, name: 'Tenax Hydrex Polished Stone Sealer 1L', brand: 'Tenax', cat: 'sealers',
    img: 'assets/images/tenax-hydrex.jpg', price: 2450, mrp: 2800, rating: 4.8, reviews: 142, stock: 18, badge: '',
    spec: 'Idro-oleorepellente · Water & oil repellent · For polished marble & granite' },
  { id: 3, name: 'Tenax Mastic Solido Paglierino Ivory', brand: 'Tenax', cat: 'adhesives',
    img: 'assets/images/tenax-mastic.jpg', price: 1850, mrp: 2200, rating: 4.7, reviews: 98, stock: 30, badge: '',
    spec: 'Ivory solid mastic · To fill and glue marble & stones' },
  { id: 4, name: 'MYK Laticrete Clenza TC Tile Cleaner 500ml', brand: 'MYK Laticrete', cat: 'cleaners',
    img: 'assets/images/clenza-tc.jpg', price: 650, mrp: 780, rating: 4.7, reviews: 234, stock: 60, badge: 'HOT',
    spec: 'Active cleaning tech · Heavy duty tile cleaner · Removes tough stains' },
  { id: 5, name: 'MYK Laticrete Clenza TS Tap & Shower Cleaner', brand: 'MYK Laticrete', cat: 'cleaners',
    img: 'assets/images/clenza-ts.jpg', price: 520, mrp: 620, rating: 4.6, reviews: 178, stock: 45, badge: '',
    spec: 'Spray bottle · Removes soap scum, hard water & limescale · Restores shine' },
  { id: 6, name: 'MYK Laticrete DWA 215 Waterproofing 20kg', brand: 'MYK Laticrete', cat: 'waterproof',
    img: 'assets/images/myk-dwa-215.jpg', price: 4200, mrp: 4800, rating: 4.7, reviews: 88, stock: 12, badge: 'B2B',
    spec: '20 kg pack · Cement-based waterproofing · For terraces & wet areas' },
  { id: 7, name: 'MYK Laticrete Sealer 190 (20L)', brand: 'MYK Laticrete', cat: 'waterproof',
    img: 'assets/images/myk-sealer-190.jpg', price: 6800, mrp: 7600, rating: 4.6, reviews: 64, stock: 8, badge: 'B2B',
    spec: '20 Litre bucket · Water-based · Weather resistant · Interior & exterior' },
  { id: 8, name: 'MYK Laticrete Latapoxy A+B Epoxy Adhesive 1.8kg', brand: 'MYK Laticrete', cat: 'adhesives',
    img: 'assets/images/latapoxy.jpg', price: 1450, mrp: 1700, rating: 4.8, reviews: 124, stock: 35, badge: 'NEW',
    spec: 'All purpose epoxy adhesive · Extra strong bond · 1.8 kg A+B kit' },
  { id: 9, name: 'Roff Cera Clean Rapid Action Tile Cleaner T16', brand: 'Roff (Pidilite)', cat: 'cleaners',
    img: 'assets/images/roff-cera-clean.jpg', price: 380, mrp: 450, rating: 4.5, reviews: 312, stock: 80, badge: '',
    spec: 'Rapid action · Removes stains · Can be diluted in water · Tile & ceramic' },
  { id: 10, name: 'Roff Rainbow Tile Mate Wide Additive T14', brand: 'Roff (Pidilite)', cat: 'grout',
    img: 'assets/images/roff-rainbow.jpg', price: 340, mrp: 400, rating: 4.6, reviews: 198, stock: 90, badge: '',
    spec: 'Latex-based tile grout additive · Higher flexibility · Water-resistant grout' },
  { id: 11, name: 'Araldite Standard Epoxy Resin + Hardener Kit', brand: 'Araldite', cat: 'adhesives',
    img: 'assets/images/araldite.webp', price: 285, mrp: 340, rating: 4.9, reviews: 892, stock: 200, badge: 'HOT',
    spec: 'AW 106 IN Resin + HV 953 IN Hardener · Highest bond · Multi substrate · Waterproof' },
  { id: 12, name: 'Astral Vetra LV 401 Instant Adhesive', brand: 'Astral Adhesives', cat: 'adhesives',
    img: 'assets/images/vetra-lv401.jpg', price: 240, mrp: 290, rating: 4.5, reviews: 156, stock: 120, badge: '',
    spec: 'Instant cyanoacrylate adhesive · Low viscosity · For glass, ceramic, metal' },
  { id: 13, name: 'Grip Stone Rough Coat for Better Grip', brand: 'Grip Stone', cat: 'polish',
    img: 'assets/images/grip-stone.png', price: 1850, mrp: 2100, rating: 4.6, reviews: 84, stock: 22, badge: '',
    spec: 'ISO 9001:2015 · For marble, granite, stone adhesion · Single coat · 24h drying' },
  { id: 14, name: 'Tenax Proseal Water & Oil Repellent 1L', brand: 'Tenax', cat: 'sealers',
    img: 'assets/images/tenax-hydrex.jpg', price: 2650, mrp: 3100, rating: 4.7, reviews: 76, stock: 15, badge: 'NEW',
    spec: 'Idro-oleorepellente · For polished granite · Italian quality' }
];
