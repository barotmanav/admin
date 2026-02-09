
import React, { useState } from 'react';
import { Location } from '../types';

interface ChangeLocationPasswordModalProps {
  location: Location;
  onSave: (id: string, newPass: string) => void;
  onClose: () => void;
}

const ChangeLocationPasswordModal: React.FC<ChangeLocationPasswordModalProps> = ({ 
  location, 
  onSave, 
  onClose 
}) => {
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      setError('Passwords do not match');
      return;
    }
    if (newPass.length < 1) {
      setError('Password cannot be empty');
      return;
    }
    onSave(location.id, newPass);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="w-full max-w-sm glass rounded-3xl p-8 border border-white/10 shadow-2xl animate-in zoom-in duration-200">
        <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400 text-2xl mb-4">
                <i className="fas fa-key"></i>
            </div>
            <h2 className="text-xl font-bold text-blue-100">Reset Access Key</h2>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{location.code} - {location.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1 ml-1 uppercase">New Password</label>
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="••••••"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1 ml-1 uppercase">Confirm Password</label>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="••••••"
              required
            />
          </div>

          {error && <p className="text-red-400 text-xs text-center font-medium bg-red-400/10 py-2 rounded-lg">{error}</p>}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/5 hover:bg-white/10 text-gray-400 py-3 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-amber-600/20 transition-all active:scale-95"
            >
              Update Key
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeLocationPasswordModal;
