import { LoginCredentials, RegisterData, User } from '@/types/auth';

// Mock authentication storage (use localStorage)
export const mockUsers = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+234-123-456-7890',
    password: 'password123',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+234-098-765-4321',
    password: 'password123',
    createdAt: new Date().toISOString(),
  },
];

export const AUTH_STORAGE_KEY = 'diagnoxix_auth';
export const AUTH_USER_KEY = 'diagnoxix_user';

export function login(credentials: LoginCredentials): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        u => u.email === credentials.email && u.password === credentials.password
      );
      
      if (user) {
        const userData = { ...user };
        delete (userData as any).password;
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
        resolve(userData as User);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 500);
  });
}

export function register(data: RegisterData): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingUser = mockUsers.find(u => u.email === data.email);
      if (existingUser) {
        reject(new Error('Email already registered'));
        return;
      }
      
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        createdAt: new Date().toISOString(),
      };
      
      mockUsers.push({ ...newUser, password: data.password });
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
      resolve(newUser);
    }, 500);
  });
}

export function logout(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  const isAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY);
  if (isAuthenticated) {
    const userJson = localStorage.getItem(AUTH_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }
  return null;
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}

