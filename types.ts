// types.ts
export interface Product {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
  description?: string;
  rating?: number;
  specs?: {
    screen?: string;
    resolution?: string;
    processor?: string;
    mainCamera?: string;
    selfieCamera?: string;
    battery?: string;
    os?: string;
    screenRefreshRate?: string;
  };
  colorOptions?: { name: string; hexCode: string; imageUrl: string }[];
  storageOptions?: { capacity: string; price: number }[];
  similarProducts?: Product[];
}

export interface CarritoItem {
  id: string;
  name: string;
  brand: string;
  basePrice: number;
  imageUrl: string;
  cantidad: number;
  color: string;
  storage: string;
}
