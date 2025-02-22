export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
  isActive: boolean;
  phone: string;
  address: string;
  createdAt: Date;
};
export type AddBikePayload = {
  name: string;
  brand: string;
  model: string;
  price: number;
  category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
  description: string;
  bikeImg: string;
  quantity: number;
};

// Define the type for the registration response
export type TRegisterResponse = {
  message: string;
  userId: string;
};

// Define the type for the sign-in request payload
export type TSignInRequest = {
  email: string;
  password: string;
};

// Define the type for the sign-in response
export type TSignInResponse = {
  message: string;
  token: string;
  userId: string;
};
export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
