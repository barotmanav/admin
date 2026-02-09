
import React, { useState } from 'react';
import { ADMIN_CREDENTIALS } from '../constants';

interface AdminLoginProps {
  onLoginSuccess: (username: string) => void;
  onGoToSignup: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onGoToSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check hardcoded admin credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      onLoginSuccess(username);
      return;
    }

    // Check local storage for viewer users
    const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
    const foundUser = users.find((u: any) => u.username === username && u.password === password);
    
    if (foundUser) {
      onLoginSuccess(username);
      return;
    }

    setError('Invalid credentials. Admin: admin / admin@123');
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl glass shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 mb-4">
            <i className="fas fa-shield-halved text-white text-2xl"></i>
        </div>
        <h2 className="text-3xl font-bold text-center text-blue-400 tracking-tight">
          Admin Control
        </h2>
        <p className="text-gray-500 text-sm mt-2">Sign in to manage factory locations</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Username</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <i className="fas fa-user"></i>
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Username"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <i className="fas fa-lock"></i>
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Password"
              required
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-xs text-center font-medium bg-red-400/10 py-3 px-2 rounded-lg leading-relaxed">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/30 transition-all transform active:scale-95"
        >
          LOG IN
        </button>

        <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-xs uppercase tracking-widest font-medium">Secondary Access</span>
            <div className="flex-grow border-t border-white/10"></div>
        </div>

        <button
          type="button"
          onClick={onGoToSignup}
          className="w-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-semibold py-3 rounded-xl border border-emerald-500/30 transition-all flex items-center justify-center gap-2"
        >
          <i className="fas fa-user-plus"></i>
          Create Viewer Account
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
