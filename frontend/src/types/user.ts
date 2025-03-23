export type UserRole = 'customer' | 'vendor' | 'admin';

export interface User {
  id: string;
  email: string;
  phone: string;
  role: UserRole;
  name: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer extends User {
  role: 'customer';
  address: string;
  subscriptionId?: string;
  preferences?: {
    dietaryRestrictions?: string[];
    mealPreferences?: string[];
  };
}

export interface Vendor extends User {
  role: 'vendor';
  businessName: string;
  description: string;
  businessAddress: string;
  serviceAreas: string[];
  deliveryAreas: string[];
  rating: number;
  capacity: number;
  cuisine: string[];
  license: string;
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
  };
  subscriptionPlans: Array<{
    name: string;
    description: string;
    price: number;
    duration: number;
    mealsPerDay: number;
  }>;
}

export interface Admin extends User {
  role: 'admin';
  department: string;
  permissions: string[];
}

export type UserType = Customer | Vendor | Admin;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  phone: string;
  role: UserRole;
  // Additional fields based on role will be handled in the registration form
}

export interface AuthResponse {
  user: UserType;
  token: string;
}

export interface RegistrationResponse {
  userId: string;
  message: string;
}

export interface UpdateProfileData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
} 