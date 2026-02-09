
import React, { useState, useEffect } from 'react';
import AdminLogin from './components/AdminLogin';
import AdminSignup from './components/AdminSignup';
import LocationGrid from './components/LocationGrid';
import LocationPasswordModal from './components/LocationPasswordModal';
import MaterialDashboard from './components/MaterialDashboard';
import EditLocationModal from './components/EditLocationModal';
import ChangeLocationPasswordModal from './components/ChangeLocationPasswordModal';
import NewLocationModal from './components/NewLocationModal';
import { ViewState, AuthState, Location } from './types';
import { LOCATIONS as INITIAL_LOCATIONS, ADMIN_CREDENTIALS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('LOGIN');
  const [auth, setAuth] = useState<AuthState>({
    isAdmin: false,
    role: null,
    authenticatedLocation: null,
  });
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  // Modals state
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [changingPasswordLocation, setChangingPasswordLocation] = useState<Location | null>(null);
  const [isAddingLocation, setIsAddingLocation] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('app_locations');
    if (stored) {
      setLocations(JSON.parse(stored));
    } else {
      setLocations(INITIAL_LOCATIONS);
      localStorage.setItem('app_locations', JSON.stringify(INITIAL_LOCATIONS));
    }
  }, []);

  const saveLocations = (newLocations: Location[]) => {
    setLocations(newLocations);
    localStorage.setItem('app_locations', JSON.stringify(newLocations));
  };

  const handleAdminLogin = (username: string) => {
    let role: 'primary' | 'secondary' = 'secondary';
    
    // Assign role based on hardcoded credentials or stored users
    if (username === ADMIN_CREDENTIALS.username) {
      role = 'primary';
    } else {
      const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
      const user = users.find((u: any) => u.username === username);
      if (user) {
        role = user.role;
      }
    }

    setAuth({ ...auth, isAdmin: true, role });
    setView('DASHBOARD');
  };

  const handleLogout = () => {
    setAuth({ isAdmin: false, role: null, authenticatedLocation: null });
    setView('LOGIN');
    setSelectedLocation(null);
  };

  const handleLocationClick = (loc: Location) => {
    setSelectedLocation(loc);
    setView('LOCATION_AUTH');
  };

  const handleLocationAuthSuccess = (code: string) => {
    setAuth({ ...auth, authenticatedLocation: code });
    setView('MATERIALS');
  };

  const handleBackToDashboard = () => {
    setSelectedLocation(null);
    setView('DASHBOARD');
  };

  const handleUpdateLocation = (updated: Location) => {
    const next = locations.map(l => l.id === updated.id ? updated : l);
    saveLocations(next);
    setEditingLocation(null);
  };

  const handleChangePassword = (id: string, newPass: string) => {
    const next = locations.map(l => l.id === id ? { ...l, password: newPass } : l);
    saveLocations(next);
    setChangingPasswordLocation(null);
  };

  const handleAddNewLocation = (newLoc: { code: string; name: string; password?: string }) => {
    const loc: Location = {
      id: Date.now().toString(),
      code: newLoc.code,
      name: newLoc.name,
      password: newLoc.password || 'pass'
    };
    saveLocations([...locations, loc]);
    setIsAddingLocation(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Sticky Header for authenticated users */}
      {auth.isAdmin && (
        <header className="fixed top-0 left-0 w-full p-4 flex justify-between items-center glass z-50">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${auth.role === 'primary' ? 'bg-blue-500' : 'bg-emerald-500'}`}>
              <i className={`fas ${auth.role === 'primary' ? 'fa-user-shield' : 'fa-eye'} text-white`}></i>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-wider text-blue-100 uppercase text-xs sm:text-base leading-none">Control Center</span>
              <span className={`text-[10px] font-black uppercase mt-1 tracking-widest ${auth.role === 'primary' ? 'text-blue-400' : 'text-emerald-400'}`}>
                {auth.role === 'primary' ? 'Full Administrator' : 'Viewer Access'}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/40 text-red-200 px-4 py-2 rounded-lg border border-red-500/50 transition-all text-sm"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </header>
      )}

      {/* Main Content Area */}
      <main className="w-full max-w-6xl flex flex-col items-center">
        {view === 'LOGIN' && (
          <AdminLogin 
            onLoginSuccess={handleAdminLogin} 
            onGoToSignup={() => setView('SIGNUP')} 
          />
        )}

        {view === 'SIGNUP' && (
          <AdminSignup 
            onSignupSuccess={() => setView('LOGIN')} 
            onGoToLogin={() => setView('LOGIN')} 
          />
        )}

        {view === 'DASHBOARD' && (
          <div className="mt-16 w-full flex flex-col items-center">
            <LocationGrid 
              locations={locations}
              userRole={auth.role}
              onLocationClick={handleLocationClick} 
              onEditLocation={setEditingLocation}
              onChangePassword={setChangingPasswordLocation}
              onAddNew={() => setIsAddingLocation(true)}
            />
          </div>
        )}

        {view === 'LOCATION_AUTH' && selectedLocation && (
          <LocationPasswordModal
            location={selectedLocation}
            onSuccess={() => handleLocationAuthSuccess(selectedLocation.code)}
            onCancel={handleBackToDashboard}
          />
        )}

        {view === 'MATERIALS' && auth.authenticatedLocation && (
          <div className="mt-16 w-full flex flex-col items-center">
            <MaterialDashboard
              locationCode={auth.authenticatedLocation}
              onBack={handleBackToDashboard}
            />
          </div>
        )}
      </main>

      {/* Admin Management Modals */}
      {editingLocation && (
        <EditLocationModal 
          location={editingLocation}
          onSave={handleUpdateLocation}
          onClose={() => setEditingLocation(null)}
        />
      )}

      {changingPasswordLocation && (
        <ChangeLocationPasswordModal
          location={changingPasswordLocation}
          onSave={handleChangePassword}
          onClose={() => setChangingPasswordLocation(null)}
        />
      )}

      {isAddingLocation && (
        <NewLocationModal
          onSave={handleAddNewLocation}
          onClose={() => setIsAddingLocation(false)}
        />
      )}
    </div>
  );
};

export default App;
