export type TBike = {
  _id: string;
  name: string;
  brand: string;
  category: string;
  model: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  stock: number;
  images: string[];
  rating: number;
  reviewCount: number;
  isStock: boolean;
};
export type TGear = {
  _id: string;
  name: string;
  brand: string;
  category: string;
  model: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  stock: number;
  images: string[];
  rating: number;
  reviewCount: number;
  isStock: boolean;
};


export type TRBike = {
  data: TBike;
  message: string;
  status: boolean;
};
