
export interface Location {
  id: string;
  code: string;
  name: string;
  password?: string; // Optional, defaults to 'pass' if not set
}

export type ViewState = 'LOGIN' | 'SIGNUP' | 'DASHBOARD' | 'LOCATION_AUTH' | 'MATERIALS';

export interface AuthState {
  isAdmin: boolean;
  role: 'primary' | 'secondary' | null;
  authenticatedLocation: string | null;
}
