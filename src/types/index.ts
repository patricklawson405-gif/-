export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'men' | 'women' | 'unisex';
  size: string;
  image: string;
  featured?: boolean;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
