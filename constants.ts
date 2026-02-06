
import { Location } from './types';

export const LOCATIONS: Location[] = [
  { id: '1', code: 'SOA', name: 'Standard Operations Area' },
  { id: '2', code: 'MAI', name: 'Main Assembly Industry' },
  { id: '3', code: 'NIA', name: 'North India Annex' },
  { id: '4', code: 'CAA', name: 'Central Admin Area' },
  { id: '5', code: 'MYR', name: 'Mysore Region' },
  { id: '6', code: 'HAP', name: 'Hapur Plant' },
  { id: '7', code: 'CAO', name: 'Central Allied Office' },
  { id: '8', code: 'DUI', name: 'Durgapur Unit I' },
  { id: '9', code: 'SEL', name: 'Salem Logistics' },
  { id: '10', code: 'AYL', name: 'Ayodhya Lane' },
  { id: '11', code: 'CAN', name: 'Cantonment Depot' },
];

export const MATERIAL_TABS = [
  'Production Plan',
  'Party Order',
  'Purchase Order',
  'Qty Dispatched from Factory',
  'Qty Exported'
];

export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: '123'
};

// For this demo, all locations use the same password or 'pass'
export const LOCATION_PASSWORD = 'pass';
