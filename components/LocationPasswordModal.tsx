
import React, { useState } from 'react';
import { LOCATION_PASSWORD } from '../constants';

interface LocationPasswordModalProps {
  locationCode: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const LocationPasswordModal: React.FC<LocationPasswordModalProps> = ({ locationCode, onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    if (password === LOCATION_PASSWORD) {
      onSuccess();
    } else {
      setError('Incorrect location password');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm glass rounded-2xl p-8 border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.2)] animate-in zoom-in duration-200">
        <h2 className="text-xl font-bold mb-6 text-center text-blue-200">
          Enter Password for {locationCode}
        </h2>
        
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

          {error && <p className="text-red-400 text-xs text-center">{error}</p>}

          <div className="flex gap-3">
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
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPasswordModal;
