
export interface Location {
  id: string;
  code: string;
  name: string;
}

export type ViewState = 'LOGIN' | 'SIGNUP' | 'DASHBOARD' | 'LOCATION_AUTH' | 'MATERIALS';

export interface AuthState {
  isAdmin: boolean;
  authenticatedLocation: string | null;
}
