import type { Product, Review } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Noir d\'Or EDP',
    description: 'A sophisticated blend of black amber, golden vanilla, and exotic woods.',
    price: 85000,
    category: 'unisex',
    size: '50ml',
    image: '/images/product_noir_dor.jpg',
    featured: true,
  },
  {
    id: '2',
    name: 'Velvet Rose Extrait',
    description: 'Luxurious rose petals wrapped in velvet musk and precious oud.',
    price: 92000,
    category: 'women',
    size: '30ml',
    image: '/images/product_velvet_rose.jpg',
    featured: true,
  },
  {
    id: '3',
    name: 'Santal d\'Orient EDP',
    description: 'Warm sandalwood meets oriental spices in this captivating blend.',
    price: 78000,
    category: 'men',
    size: '50ml',
    image: '/images/product_santal_orient.jpg',
    featured: true,
  },
  {
    id: '4',
    name: 'Citrus Noir EDP',
    description: 'Fresh citrus notes balanced with dark amber and musk.',
    price: 68000,
    category: 'men',
    size: '50ml',
    image: '/images/product_citrus_noir.jpg',
    featured: false,
  },
  {
    id: '5',
    name: 'Amber Oud Extrait',
    description: 'Rich amber combined with premium oud for the discerning connoisseur.',
    price: 105000,
    category: 'unisex',
    size: '30ml',
    image: '/images/product_amber_oud.jpg',
    featured: false,
  },
  {
    id: '6',
    name: 'Fleur de Nuit EDP',
    description: 'Night-blooming jasmine and tuberose in an enchanting floral bouquet.',
    price: 72000,
    category: 'women',
    size: '50ml',
    image: '/images/product_fleur_nuit.jpg',
    featured: false,
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Amara T.',
    text: 'The packaging alone feels like a gift. The scent lasts all day without being loud. 𝕸𝖎𝖗𝖆𝖈𝖑𝖊 𝕾𝖎𝖌𝖓𝖆𝖙𝖚𝖗𝖊 𝕾𝖈𝖊𝖓𝖙𝖘✍ has become my go-to for luxury fragrances.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Chidi O.',
    text: 'Finally a fragrance house that understands subtlety. I get compliments every time I wear Santal d\'Orient. The quality is unmatched.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Zainab K.',
    text: 'Delivery was fast and the handwritten note was a beautiful touch. You can tell they truly care about their customers.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Emmanuel N.',
    text: 'Been buying from 𝕸𝖎𝖗𝖆𝖈𝖑𝖊 𝕾𝖎𝖌𝖓𝖆𝖙𝖚𝖗𝖊 𝕾𝖈𝖊𝖓𝖙𝖘✍ for over a year now. Authentic products, great prices, and excellent customer service.',
    rating: 5,
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
