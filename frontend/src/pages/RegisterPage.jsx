import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import BrandLogo from '../components/BrandLogo';
import Toast from '../components/Toast';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastDesc, setToastDesc] = useState('');
  const [toastType, setToastType] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      setToastType('error');
      setToastMessage('Registration Failed');
      setToastDesc('Passwords do not match');
      setShowToast(true);
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      await api.register(username, email, password);
      setToastType('success');
      setToastMessage('Account Created');
      setToastDesc('Taking you to sign in...');
      setShowToast(true);

      setTimeout(() => { navigate('/login'); }, 1200);
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed');
      setToastType('error');
      setToastMessage('Registration Failed');
      setToastDesc(err.message || 'Username or email already exists');
      setShowToast(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper text-ink relative p-md overflow-x-clip font-body">
      {/* ── Exposed 12-Column Grid Rails ─────────────────────────────────── */}
      <div className="rails" aria-hidden="true" />

      <main className="w-full max-w-[480px] relative z-10">
        <div className="border border-rule bg-paper">
          {/* Header Strip */}
          <div className="p-lg border-b border-rule bg-paper-2 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-xs">
              <BrandLogo className="w-5 h-5" />
              <span className="font-display font-extrabold text-base text-ink lowercase tracking-tight">
                linkengine
              </span>
              <span className="period" />
            </Link>
            <span className="font-label-caps text-[10px] uppercase tracking-widest text-muted font-mono">
              Create Account
            </span>
          </div>

          <div className="p-lg md:p-xl">
            <h1 className="font-display font-extrabold text-3xl text-ink tracking-tight lowercase mb-xs">
              create account<span className="period" />
            </h1>
            <p className="font-mono text-xs text-muted mb-lg">
              Create your account to start shortening links.
            </p>

            {errorMsg && (
              <div className="mb-md p-sm bg-accent/8 border border-accent text-accent font-mono text-xs flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px]">priority_high</span>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-md">
              {/* Username */}
              <div>
                <label className="font-label-caps text-[11px] uppercase tracking-wider text-muted font-semibold block mb-1" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="operator"
                  className="input-base w-full px-md py-sm text-xs font-mono"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="font-label-caps text-[11px] uppercase tracking-wider text-muted font-semibold block mb-1" htmlFor="reg-email">
                  Email Address
                </label>
                <input
                  id="reg-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-base w-full px-md py-sm text-xs font-mono"
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div>
                <label className="font-label-caps text-[11px] uppercase tracking-wider text-muted font-semibold block mb-1" htmlFor="reg-password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="input-base w-full px-md py-sm pr-xl text-xs font-mono"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-sm flex items-center text-muted hover:text-ink"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="font-label-caps text-[11px] uppercase tracking-wider text-muted font-semibold block mb-1" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="input-base w-full px-md py-sm pr-xl text-xs font-mono"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-sm flex items-center text-muted hover:text-ink"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {showConfirmPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit & Login Links */}
              <div className="pt-sm space-y-sm">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-sm text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {loading ? 'hourglass_empty' : 'how_to_reg'}
                  </span>
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>

                <Link
                  to="/login"
                  className="btn-secondary w-full block text-center py-sm text-xs uppercase tracking-wider font-semibold"
                >
                  Already Registered? Sign In
                </Link>
              </div>
            </form>
          </div>

          {/* Footer Strip */}
          <div className="p-sm border-t border-rule bg-paper-2 flex justify-between items-center text-[10px] font-mono text-muted">
            <span>linkengine.io</span>
            <span className="text-accent font-bold">SECURE</span>
          </div>
        </div>
      </main>

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
