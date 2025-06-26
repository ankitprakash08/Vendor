import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Vendor, AuthState } from '../types';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (vendorData: Omit<Vendor, 'id' | 'createdAt'>) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    currentVendor: null,
  });

  useEffect(() => {
    const savedVendor = localStorage.getItem('currentVendor');
    if (savedVendor) {
      setAuthState({
        isAuthenticated: true,
        currentVendor: JSON.parse(savedVendor),
      });
    }
  }, []);

  const signUp = async (vendorData: Omit<Vendor, 'id' | 'createdAt'>): Promise<boolean> => {
    try {
      // Get existing vendors
      const existingVendors = JSON.parse(localStorage.getItem('vendors') || '[]');
      
      // Check if email already exists
      const emailExists = existingVendors.some((vendor: Vendor) => vendor.email === vendorData.email);
      if (emailExists) {
        return false;
      }

      // Create new vendor
      const newVendor: Vendor = {
        ...vendorData,
        id: Date.now().toString(),
        createdAt: new Date(),
      };

      // Save to localStorage
      existingVendors.push(newVendor);
      localStorage.setItem('vendors', JSON.stringify(existingVendors));

      // Set as current vendor
      const vendorWithoutPassword = { ...newVendor, password: '' };
      localStorage.setItem('currentVendor', JSON.stringify(vendorWithoutPassword));
      
      setAuthState({
        isAuthenticated: true,
        currentVendor: vendorWithoutPassword,
      });

      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      return false;
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const existingVendors = JSON.parse(localStorage.getItem('vendors') || '[]');
      const vendor = existingVendors.find((v: Vendor) => v.email === email && v.password === password);
      
      if (vendor) {
        const vendorWithoutPassword = { ...vendor, password: '' };
        localStorage.setItem('currentVendor', JSON.stringify(vendorWithoutPassword));
        
        setAuthState({
          isAuthenticated: true,
          currentVendor: vendorWithoutPassword,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Sign in error:', error);
      return false;
    }
  };

  const signInWithGoogle = async (): Promise<boolean> => {
    try {
      // Simulate Google OAuth flow
      // In a real app, you would integrate with Google OAuth API
      
      // For demo purposes, create a mock Google user
      const mockGoogleUser: Vendor = {
        id: `google_${Date.now()}`,
        businessName: 'Google Business Account',
        email: 'user@gmail.com',
        password: '',
        contactPerson: 'Google User',
        phone: '+1 (555) 000-0000',
        address: '1600 Amphitheatre Parkway, Mountain View, CA',
        createdAt: new Date(),
      };

      // Check if Google user already exists
      const existingVendors = JSON.parse(localStorage.getItem('vendors') || '[]');
      let existingGoogleUser = existingVendors.find((vendor: Vendor) => vendor.email === mockGoogleUser.email);

      if (!existingGoogleUser) {
        // Create new Google user
        existingVendors.push(mockGoogleUser);
        localStorage.setItem('vendors', JSON.stringify(existingVendors));
        existingGoogleUser = mockGoogleUser;
      }

      // Set as current vendor
      localStorage.setItem('currentVendor', JSON.stringify(existingGoogleUser));
      
      setAuthState({
        isAuthenticated: true,
        currentVendor: existingGoogleUser,
      });

      return true;
    } catch (error) {
      console.error('Google sign in error:', error);
      return false;
    }
  };

  const signOut = () => {
    localStorage.removeItem('currentVendor');
    setAuthState({
      isAuthenticated: false,
      currentVendor: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};