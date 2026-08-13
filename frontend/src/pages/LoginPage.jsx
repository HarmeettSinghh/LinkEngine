import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../App';
import { api } from '../services/api';
import Toast from '../components/Toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastDesc, setToastDesc] = useState('');
  const [toastType, setToastType] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await api.login(username, password);
      setToastType('success');
      setToastMessage('Authentication Successful');
      setToastDesc('Logged in successfully. Redirecting...');
      setShowToast(true);

      setTimeout(() => {
        login(response.token);
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setErrorMsg(err.message || 'Login failed');
      setToastType('error');
      setToastMessage('Authentication Failed');
      setToastDesc(err.message || 'Invalid username or password');
      setShowToast(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-body-md text-body-md bg-custom-bg antialiased selection:bg-custom-primary selection:text-white">
      <main className="w-full max-w-[420px] px-md md:px-0 relative z-10">
        <div className="bg-custom-surface border border-custom-border rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden">
          
          {/* Header Area */}
          <div className="p-lg border-b border-custom-border flex flex-col items-center justify-center space-y-md">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-custom-border bg-custom-bg flex items-center justify-center">
              <img
                alt="LinkEngine Logo"
                className="w-12 h-12 object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1VgH5ap4djWwyCDCmg4fk7oU-ZvyBvEbUzPQU0SSTumfqdGd3z-Gk7nQJk6PfuCCHoQYGdiFZfV4C1hn5u86Kkga72Jx00TTaka4sRysjv3HXhTRPEOYa0fjbegWuaztVoXvdNJogqwkPwrgBbsJ3zPsagKXN6Owp1LlorgVB3WQx5YrHc8TiPSb0Pa9Rrl9npA6gI7c-ogF0hadpyXO_VIqGiAdHrXjpRjbICH5tWcRfrpVMPzT8"
              />
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface">Sign in to LinkEngine</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Access your link management dashboard.</p>
          </div>

          {/* Form Area */}
          <form onSubmit={handleSubmit} className="p-lg space-y-lg">
            {errorMsg && (
              <div className="p-md rounded bg-[#ffb4ab]/10 border border-[#ffb4ab]/30 text-[#ffb4ab] text-body-sm">
                {errorMsg}
              </div>
            )}

            <div className="space-y-sm">
              <label className="block font-label-caps text-label-caps text-on-surface" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="SysAdmin_01"
                className="w-full input-field border rounded px-md py-sm font-code-md text-code-md transition-colors duration-200"
                required
              />
            </div>

            <div className="space-y-sm">
              <div className="flex items-center justify-between">
                <label className="block font-label-caps text-label-caps text-on-surface" htmlFor="password">
                  Password
                </label>
                <a className="font-body-sm text-body-sm text-custom-primary hover:underline animate-pulse" href="#forgot">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full input-field border rounded px-md py-sm font-code-md text-code-md transition-colors duration-200 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-md flex items-center text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="pt-sm space-y-md">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-custom-primary text-white font-label-caps text-label-caps py-md rounded hover:opacity-90 transition-opacity flex items-center justify-center space-x-sm"
              >
                <span>{loading ? 'Authenticating...' : 'Login'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              
              <Link
                to="/register"
                className="w-full block text-center bg-custom-surface border border-custom-border text-on-surface font-label-caps text-label-caps py-md rounded hover:bg-[#1e1e1e] transition-colors"
              >
                Create account
              </Link>
            </div>
          </form>

          {/* Footer Area */}
          <div className="px-lg py-md bg-[#0f0f0f] border-t border-custom-border text-center">
            <p className="font-code-sm text-code-sm text-on-surface-variant">
              System Status: <span className="text-[#4ade80]">Operational</span>
            </p>
          </div>
        </div>
      </main>

      {/* Toast Alert */}
      <Toast
        show={showToast}
        message={toastMessage}
        description={toastDesc}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
