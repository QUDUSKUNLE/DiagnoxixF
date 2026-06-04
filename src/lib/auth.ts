import { API_ENDPOINTS, getApiUrl } from '@/lib/api-config';
import {
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  clearAuthStorage,
  getAuthToken,
} from '@/lib/auth-storage';
import {
  ApiUserType,
  LoginApiResponse,
  LoginCredentials,
  RegisterData,
  User,
} from '@/types/auth';

interface MockUserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
  type: ApiUserType;
}


const mockUsers: MockUserRecord[] = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@diagnoxix.com',
    phone: '+234-800-000-0001',
    password: 'password123',
    createdAt: new Date().toISOString(),
    type: 'ADMIN',
  },
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+234-123-456-7890',
    password: 'password123',
    createdAt: new Date().toISOString(),
    type: 'DIAGNOSTIC_CENTRE_MANAGER',
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+234-098-765-4321',
    password: 'password123',
    createdAt: new Date().toISOString(),
    type: 'DIAGNOSTIC_CENTRE_MANAGER',
  },
];

function parseJwtPayload(token: string): Record<string, string> | null {
  try {
    const segment = token.split('.')[1];
    if (!segment) return null;
    const json = atob(segment.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json) as Record<string, string>;
  } catch {
    return null;
  }
}

export function normalizeApiUserType(raw: string): ApiUserType {
  const value = raw.toUpperCase();

  if (value === 'ADMIN') return 'ADMIN';
  if (value === 'PATIENT') return 'PATIENT';
  if (value === 'DIAGNOSTIC_CENTRE_MANAGER') return 'DIAGNOSTIC_CENTRE_MANAGER';

  throw new Error(`Unsupported account type: ${raw}`);
}

function persistSession(user: User, token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

function buildUserFromLogin(
  token: string,
  userType: ApiUserType,
  email: string
): User {
  const payload = parseJwtPayload(token);
  const id = payload?.user_id ?? '';

  return {
    id,
    email,
    name: email.split('@')[0] || 'User',
    phone: '',
    createdAt: new Date().toISOString(),
    type: userType,
  };
}

/** Route after login based on API `user_type`. */
export function getPostLoginPath(user: Pick<User, 'type'>): string {
  switch (user.type) {
    case 'ADMIN':
      return '/admin';
    case 'DIAGNOSTIC_CENTRE_MANAGER':
      return '/centre-dashboard';
    case 'PATIENT':
      return '/download-app';
    default:
      return '/login';
  }
}

export function isPatientUser(user: Pick<User, 'type'>): boolean {
  return user.type === 'PATIENT';
}

export function canAccessAdminPortal(user: Pick<User, 'type'>): boolean {
  return user.type === 'ADMIN';
}

export function canAccessCentreDashboard(user: Pick<User, 'type'>): boolean {
  return user.type === 'DIAGNOSTIC_CENTRE_MANAGER';
}

async function loginWithApi(credentials: LoginCredentials): Promise<User> {
  const response = await fetch(getApiUrl(API_ENDPOINTS.AUTH_LOGIN), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const body = (await response.json().catch(() => ({}))) as LoginApiResponse & {
    message?: string;
  };

  if (!response.ok || !body.success || !body.data?.token) {
    throw new Error(
      body.message || 'Invalid email or password'
    );
  }

  const userType = normalizeApiUserType(body.data.user_type);
  const user = buildUserFromLogin(
    body.data.token,
    userType,
    credentials.email
  );

  persistSession(user, body.data.token);
  return user;
}

export function login(credentials: LoginCredentials): Promise<User> {
  return loginWithApi(credentials);
}

export function register(data: RegisterData): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingUser = mockUsers.find((u) => u.email === data.email);
      if (existingUser) {
        reject(new Error('Email already registered'));
        return;
      }

      const newUser: MockUserRecord = {
        id: `user-${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        createdAt: new Date().toISOString(),
        type: 'DIAGNOSTIC_CENTRE_MANAGER',
      };

      mockUsers.push(newUser);
      const { password: _password, ...user } = newUser;
      persistSession(user, `mock-token-${user.id}`);
      resolve(user);
    }, 500);
  });
}

export function logout(): void {
  clearAuthStorage();
}

export { getAuthToken };

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  if (!getAuthToken()) return null;

  const userJson = localStorage.getItem(AUTH_USER_KEY);
  if (!userJson) return null;

  try {
    const user = JSON.parse(userJson) as User;
    if (user.type) {
      user.type = normalizeApiUserType(user.type as string);
    }
    return user;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
