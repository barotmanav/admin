
import React, { useState } from 'react';
import { LOCATION_PASSWORD as DEFAULT_PASS } from '../constants';
import { Location } from '../types';

interface LocationPasswordModalProps {
  location: Location;
  onSuccess: () => void;
  onCancel: () => void;
}

const LocationPasswordModal: React.FC<LocationPasswordModalProps> = ({ location, onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    const requiredPass = location.password || DEFAULT_PASS;
    if (password === requiredPass) {
      onSuccess();
    } else {
      setError('Incorrect location password');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm glass rounded-2xl p-8 border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.2)] animate-in zoom-in duration-200">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-400 text-2xl">
            <i className="fas fa-lock"></i>
        </div>
        <h2 className="text-xl font-bold mb-2 text-center text-blue-200">
          Secure Access
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">Enter password for {location.name}</p>
        
        <div className="space-y-4">
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-xl py-3 px-4 text-white text-center text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••"
            onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
          />

          {error && <p className="text-red-400 text-xs text-center font-medium">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-500/20 hover:bg-gray-500/40 text-gray-300 py-3 rounded-xl border border-gray-500/30 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleVerify}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all active:scale-95"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPasswordModal;
