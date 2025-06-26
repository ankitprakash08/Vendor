export interface Vendor {
  id: string;
  businessName: string;
  email: string;
  password: string;
  contactPerson: string;
  phone: string;
  address: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  sellerPrice: number;
  mrp: number;
  category: string;
  weight?: number;
  weightUnit?: string;
  quantity?: number;
  quantityUnit?: string;
  imageUrl: string;
  imageFile?: File;
  inStock: boolean;
  createdAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentVendor: Vendor | null;
}

export interface CategoryConfig {
  category: string;
  hasWeight: boolean;
  hasQuantity: boolean;
  weightUnit?: string;
  quantityUnit?: string;
  weightPlaceholder?: string;
  quantityPlaceholder?: string;
  weightMin?: number;
  weightMax?: number;
  quantityMin?: number;
  quantityMax?: number;
  weightStep?: number;
  quantityStep?: number;
}