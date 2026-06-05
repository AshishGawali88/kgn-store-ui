export interface Product {
  id: number;
  name: string;
  brand: string;
  cat: string;       // sealers | adhesives | cleaners | waterproof | polish | grout
  img: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  stock: number;
  badge: string;
  spec: string;
}

export interface CartLine {
  product: Product;
  qty: number;
}
