import { AUTH_TOKEN_KEY } from '@/lib/auth-storage';

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7556/v1';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH_LOGIN: '/login',

  // Centers
  CENTERS: '/centers',
  CENTERS_SEARCH: '/centers/search',
  CENTER_BY_ID: (id: string) => `/centers/${id}`,
  
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

