// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7556/api';

// API Endpoints
export const API_ENDPOINTS = {
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
export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = getApiUrl(endpoint);
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

