
import React, { useState } from 'react';
import AdminLogin from './components/AdminLogin';
import AdminSignup from './components/AdminSignup';
import LocationGrid from './components/LocationGrid';
import LocationPasswordModal from './components/LocationPasswordModal';
import MaterialDashboard from './components/MaterialDashboard';
import { ViewState, AuthState } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('LOGIN');
  const [auth, setAuth] = useState<AuthState>({
    isAdmin: false,
    authenticatedLocation: null,
  });
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleAdminLogin = () => {
    setAuth({ ...auth, isAdmin: true });
    setView('DASHBOARD');
  };

  const handleLogout = () => {
    setAuth({ isAdmin: false, authenticatedLocation: null });
    setView('LOGIN');
    setSelectedLocation(null);
  };

  const handleLocationClick = (code: string) => {
    setSelectedLocation(code);
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Sticky Header for authenticated users */}
      {auth.isAdmin && (
        <header className="fixed top-0 left-0 w-full p-4 flex justify-between items-center glass z-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-user-shield text-white"></i>
            </div>
            <span className="font-bold tracking-wider text-blue-100 uppercase">Admin Control</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/40 text-red-200 px-4 py-2 rounded-lg border border-red-500/50 transition-all"
          >
            <i className="fas fa-sign-out-alt"></i>
            Logout
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
            <LocationGrid onLocationClick={handleLocationClick} />
          </div>
        )}

        {view === 'LOCATION_AUTH' && selectedLocation && (
          <LocationPasswordModal
            locationCode={selectedLocation}
            onSuccess={() => handleLocationAuthSuccess(selectedLocation)}
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
    </div>
  );
};

export default App;
