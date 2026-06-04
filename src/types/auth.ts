/** Values returned by the API `data.user_type` field */
export type ApiUserType = 'PATIENT' | 'DIAGNOSTIC_CENTRE_MANAGER' | 'DIAGNOSTIC_CENTRE_OWNER';

export interface User {
  id: string;
  name: string;
  email: string;
  type?: ApiUserType;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email?: string;
  phone: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface PasswordResetResponse {
  message: string;
  resetToken?: string;
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
  error?: {
    message: string
    code: string
  }
}

export type LoginApiResponse = ApiEnvelope<LoginResponseData>;
