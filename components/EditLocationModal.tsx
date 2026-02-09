
import React, { useState } from 'react';
import { Location } from '../types';

interface EditLocationModalProps {
  location: Location;
  onSave: (loc: Location) => void;
  onClose: () => void;
}

const EditLocationModal: React.FC<EditLocationModalProps> = ({ location, onSave, onClose }) => {
  const [name, setName] = useState(location.name);
  const [code, setCode] = useState(location.code);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...location, name, code });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="w-full max-w-md glass rounded-3xl p-8 border border-white/10 shadow-2xl animate-in zoom-in duration-200">
        <h2 className="text-2xl font-bold mb-6 text-blue-100 flex items-center gap-3">
            <i className="fas fa-edit text-blue-500"></i>
            Edit Location
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Location Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Location Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 py-3 rounded-xl border border-white/10 transition-all"
            >
              Discard
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all"
            >
              Update Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLocationModal;
