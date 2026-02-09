
import React, { useState } from 'react';

interface AdminSignupProps {
  onSignupSuccess: () => void;
  onGoToLogin: () => void;
}

const AdminSignup: React.FC<AdminSignupProps> = ({ onSignupSuccess, onGoToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 3) {
      setError('Password must be at least 3 characters');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('admin_users') || '[]');
    if (existingUsers.some((u: any) => u.username === username) || username === 'admin') {
      setError('Username already taken');
      return;
    }

    // Always create as secondary (viewer) role
    const newUser = { username, password, role: 'secondary' };
    localStorage.setItem('admin_users', JSON.stringify([...existingUsers, newUser]));
    
    setSuccess(true);
    setTimeout(() => {
      onSignupSuccess();
    }, 1500);
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl glass shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/30 mb-4">
            <i className="fas fa-eye text-white text-2xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-center text-emerald-400 tracking-tight">
          Create Viewer Account
        </h2>
        <p className="text-gray-500 text-sm mt-2">View dashboard & add new locations</p>
      </div>

      {success ? (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400 text-4xl animate-bounce">
            <i className="fas fa-check"></i>
          </div>
          <h3 className="text-xl font-bold text-white">Success!</h3>
          <p className="text-gray-400 mt-2">Your viewer account is ready.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              placeholder="Username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              placeholder="Password"
              required
            />
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
            <p className="text-xs text-blue-300 leading-relaxed">
              <i className="fas fa-info-circle mr-2"></i>
              Viewer accounts can browse data and add new locations but cannot modify existing security settings or passwords.
            </p>
          </div>

          {error && <p className="text-red-400 text-xs text-center font-medium bg-red-400/10 py-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-600/30 transition-all transform active:scale-95"
          >
            CREATE ACCOUNT
          </button>

          <button
            type="button"
            onClick={onGoToLogin}
            className="w-full text-gray-500 hover:text-white text-xs font-medium transition-all uppercase tracking-widest"
          >
            Back to Login
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminSignup;
