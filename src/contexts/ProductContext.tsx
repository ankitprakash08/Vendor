import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getVendorProducts: (vendorId: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, ...productData } : product
    );
    saveProducts(updatedProducts);
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    saveProducts(updatedProducts);
  };

  const getVendorProducts = (vendorId: string) => {
    return products.filter(product => product.vendorId === vendorId);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getVendorProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};