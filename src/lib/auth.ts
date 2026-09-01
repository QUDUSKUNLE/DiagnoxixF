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
  RegisterApiResponse,
  RegisterData,
  ResetPasswordRequest,
  User,
} from '@/types/auth';


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

  if (value === 'DIAGNOSTIC_CENTRE_OWNER') return 'DIAGNOSTIC_CENTRE_OWNER';
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
  return {
    id: payload?.user_id ?? '',
    name: email.split('@')[0] || 'User',
    email: email,
    type: userType,
  };
}

/** Route after login based on API `user_type`. */
export function getPostLoginPath(user: Pick<User, 'type'>): string {
  switch (user.type) {
    case 'DIAGNOSTIC_CENTRE_OWNER':
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
  return user.type === 'DIAGNOSTIC_CENTRE_OWNER';
}

export function canAccessCentreDashboard(user: Pick<User, 'type'>): boolean {
  return user.type === 'DIAGNOSTIC_CENTRE_MANAGER';
}

async function loginWithApi(credentials: LoginCredentials): Promise<User> {
  const response = await fetch(getApiUrl(API_ENDPOINTS.AUTH_LOGIN), {
    method: API_ENDPOINTS.POST_METHOD,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const body = (await response.json().catch(() => ({}))) as LoginApiResponse & {
    message?: string;
  };

  if (!response.ok || !body.success || !body.data?.token) {
    throw new Error(
      body.error?.message || 'Invalid email or password'
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

async function registerWithApi(params: RegisterData): Promise<RegisterApiResponse> {
  const response = await fetch(getApiUrl(API_ENDPOINTS.AUTH_REGISTER), {
    method: API_ENDPOINTS.POST_METHOD,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const body = (await response.json().catch(() => ({}))) as RegisterApiResponse & {
    message?: string
  }

  if (!response.ok || !body.success || !body.data?.id) {
    throw new Error(body.error?.message ?? 'Error registering a new user');
  }

  return body
 }

export function login(credentials: LoginCredentials): Promise<User> {
  return loginWithApi(credentials);
}

export function register(credentials: RegisterData): Promise<RegisterApiResponse> {
  return registerWithApi(credentials)
}

export async function forgotPassword(email: string): Promise<void> {
  const response = await fetch(getApiUrl(API_ENDPOINTS.FORGOT_PASSWORD), {
    method: API_ENDPOINTS.POST_METHOD,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const body = (await response.json().catch(() => ({}))) as any;

  if (!response.ok || !body.success) {
    throw new Error(
      body.error?.message || body.message || 'Failed to send reset link'
    );
  }
}

export async function resetPassword(credentials: ResetPasswordRequest): Promise<User> {
  const response = await fetch(getApiUrl(API_ENDPOINTS.RESET_PASSWORD), {
    method: API_ENDPOINTS.POST_METHOD,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: credentials.email,
      token: credentials.token,
      new_password: credentials.password, 
      confirm_password: credentials.confirmPassword }),
  });

  const body = (await response.json().catch(() => ({}))) as any;

  if (!response.ok || !body.success) {
    throw new Error(
      body.error?.message || body.message || 'Failed to reset password'
    );
  }

  if (body.data?.token) {
    const userType = normalizeApiUserType(body.data.user_type);
    const user = buildUserFromLogin(body.data.token, userType, body.data.email);
    persistSession(user, body.data.token);
    return user;
  }

  throw new Error('Failed to reset password');
}

export async function verifyEmail(token: string, email: string): Promise<void> {
  const response = await fetch(getApiUrl(`${API_ENDPOINTS.VERIFY_EMAIL}?token=${token}&email=${email}`), {
    method: API_ENDPOINTS.GET_METHOD,
    headers: { 'Content-Type': 'application/json' },
  });

  const body = (await response.json().catch(() => ({}))) as any;

  if (!response.ok || !body.success) {
    throw new Error(body.error?.message || body.message || 'Email verification failed');
  }
}

export async function resendVerification(email: string): Promise<void> {
  const response = await fetch(getApiUrl(API_ENDPOINTS.RESEND_VERIFICATION), {
    method: API_ENDPOINTS.POST_METHOD,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const body = (await response.json().catch(() => ({}))) as any;

  if (!response.ok || !body.success) {
    throw new Error(
      body.error?.message || body.message || 'Failed to resend verification email'
    );
  }
}

export function logout(): void {
  clearAuthStorage();
}

export function updateCurrentUser(updatedFields: Partial<User>): User | null {
  if (typeof window === 'undefined') return null;
  const existing = getCurrentUser();
  if (!existing) return null;
  const next = { ...existing, ...updatedFields };
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(next));
  return next;
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
