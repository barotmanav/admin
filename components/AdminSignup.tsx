
import React, { useState } from 'react';

interface AdminSignupProps {
  onSignupSuccess: () => void;
  onGoToLogin: () => void;
}

const AdminSignup: React.FC<AdminSignupProps> = ({ onSignupSuccess, onGoToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 3) {
      setError('Password must be at least 3 characters');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('admin_users') || '[]');
    if (existingUsers.some((u: any) => u.username === username) || username === 'admin') {
      setError('Username already exists');
      return;
    }

    const newUser = { username, password };
    localStorage.setItem('admin_users', JSON.stringify([...existingUsers, newUser]));
    
    setSuccess(true);
    setTimeout(() => {
      onSignupSuccess();
    }, 1500);
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl glass shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/30 mb-4">
            <i className="fas fa-user-plus text-white text-2xl"></i>
        </div>
        <h2 className="text-3xl font-bold text-center text-emerald-400 tracking-tight">
          Create Account
        </h2>
        <p className="text-gray-500 text-sm mt-2">Join the Admin Network</p>
      </div>

      {success ? (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400 text-4xl animate-bounce">
            <i className="fas fa-check"></i>
          </div>
          <h3 className="text-xl font-bold text-white">Account Created!</h3>
          <p className="text-gray-400 mt-2">Redirecting to login...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
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
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                placeholder="Choose a username"
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
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                placeholder="Create password"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-check-double"></i>
              </span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                placeholder="Confirm password"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-600/30 transition-all transform active:scale-95"
          >
            SIGN UP
          </button>

          <button
            type="button"
            onClick={onGoToLogin}
            className="w-full text-gray-400 hover:text-white text-sm font-medium transition-all"
          >
            Already have an account? Log In
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminSignup;
