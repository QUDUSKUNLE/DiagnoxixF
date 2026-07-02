import { AUTH_TOKEN_KEY } from '@/lib/auth-storage';

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// API Endpoints
export const API_ENDPOINTS = {
  GET_METHOD:  'GET',
  POST_METHOD: 'POST',

  AUTH_LOGIN: '/login',
  AUTH_REGISTER: '/register',

  FORGOT_PASSWORD: '/request_password_reset',
  RESET_PASSWORD: '/reset_password',
  VERIFY_EMAIL: '/verify_email',
  RESEND_VERIFICATION: '/resend_verification',

  // Centers
  CENTER_BY_ID: (id: string) => `/centers/${id}`,
  CENTERS: '/centers',
  CENTERS_SEARCH: '/centers/search',
  DIAGNOSTIC_CENTRES_OWNER: '/diagnostic_centres/owner',
  CREATE_DIAGNOSTIC_CENTRE: '/diagnostic_centres',
  GET_MANAGERS: '/managers',
  CREATE_MANAGERS: '/diagnostic_centres/managers',
  ASSIGN_MANAGER: '/diagnostic_centres/assign',
  UNASSIGN_MANAGER: '/diagnostic_centres/unassign',
  // Tests
  TEST_TYPES: '/tests/types',
  TEST_TYPES_BY_ID: (id: string) => `/tests/types/${id}`,
  
  // Bookings
  BOOKINGS: '/bookings',
  BOOKING_BY_ID: (id: string) => `/bookings/${id}`,
  BOOKINGS_BY_USER: '/bookings/user',
  
  // Payments
  PAYMENTS: '/payments',
  PAYMENT_BY_ID: (id: string) => `/payments/${id}`,
  PAYMENT_INITIATE: '/payments/initiate',
  
  // Notifications
  NOTIFICATIONS: '/notifications',
  NOTIFICATIONS_SEND: '/notifications/send',
};

// Helper function to construct full URL
export function getApiUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`;
}

// Helper function for API calls
function getAuthHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
}

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = getApiUrl(endpoint);
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers as Record<string, string>),
    },
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      body?.message ||
      body?.data?.message ||
      `Request failed (${response.status})`;
    throw new Error(message);
  }

  return body as T;
}

