
import React, { useState } from 'react';

interface NewLocationModalProps {
  onSave: (loc: { code: string; name: string; password?: string }) => void;
  onClose: () => void;
}

const NewLocationModal: React.FC<NewLocationModalProps> = ({ onSave, onClose }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ code, name, password });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="w-full max-w-md glass rounded-3xl p-8 border border-white/10 shadow-2xl animate-in zoom-in duration-200">
        <h2 className="text-2xl font-bold mb-6 text-emerald-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                <i className="fas fa-plus"></i>
            </div>
            Add New Location
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
                <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider ml-1">Code</label>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    maxLength={4}
                    placeholder="SOA"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center"
                    required
                />
            </div>
            <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider ml-1">Full Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Area Name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider ml-1">Initial Password (Access Key)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave empty for 'pass'"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 py-3 rounded-xl border border-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
            >
              Create Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewLocationModal;
