export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

