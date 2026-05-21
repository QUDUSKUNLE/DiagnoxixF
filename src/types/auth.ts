/** Values returned by the API `data.user_type` field */
export type ApiUserType = 'ADMIN' | 'PATIENT' | 'DIAGNOSTIC_CENTRE_MANAGER';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  type: ApiUserType;
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

export interface LoginResponseData {
  token: string;
  user_type: ApiUserType;
}

export interface ApiEnvelope<T> {
  data: T;
  status: number;
  success: boolean;
  message?: string;
}

export type LoginApiResponse = ApiEnvelope<LoginResponseData>;
