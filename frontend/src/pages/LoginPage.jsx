import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../App';
import { api } from '../services/api';
import BrandLogo from '../components/BrandLogo';
import Toast from '../components/Toast';

function parseFriendlyError(raw) {
  if (!raw) return 'Invalid username or password.';
  try {
    const parsed = JSON.parse(raw);
    if (parsed.message) return parsed.message;
    if (parsed.error) return parsed.error;
  } catch (_) {}
  if (raw.toLowerCase().includes('bad credentials') || raw.toLowerCase().includes('unauthorized')) {
    return 'Invalid username or password.';
  }
  if (raw.toLowerCase().includes('forbidden')) return 'Access denied. Please check your credentials.';
  if (raw.toLowerCase().includes('not found')) return 'Account not found. Please register first.';
  return 'Something went wrong. Please try again.';
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastDesc, setToastDesc] = useState('');
  const [toastType, setToastType] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await api.login(email, password);
      setToastType('success');
      setToastMessage('Authentication Succeeded');
      setToastDesc('JWT token issued. Redirecting to workbench...');
      setShowToast(true);

      setTimeout(() => {
        login(response.token);
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      const friendly = parseFriendlyError(err.message);
      setErrorMsg(friendly);
      setToastType('error');
      setToastMessage('Authentication Failed');
      setToastDesc(friendly);
      setShowToast(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper text-ink relative p-md overflow-x-clip font-body">
      {/* ── Exposed 12-Column Grid Rails ─────────────────────────────────── */}
      <div className="rails" aria-hidden="true" />

      <main className="w-full max-w-[440px] relative z-10">
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
              SYS-AUTH // 01
            </span>
          </div>

          <div className="p-lg md:p-xl">
            <h1 className="font-display font-extrabold text-3xl text-ink tracking-tight lowercase mb-xs">
              sign in<span className="period" />
            </h1>
            <p className="font-mono text-xs text-muted mb-lg">
              Enter your credentials to access URL telemetry.
            </p>

            {errorMsg && (
              <div className="mb-md p-sm bg-accent/8 border border-accent text-accent font-mono text-xs flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px]">priority_high</span>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-md">
              {/* Email */}
              <div>
                <label className="font-label-caps text-[11px] uppercase tracking-wider text-muted font-semibold block mb-1" htmlFor="email">
                  Email Identifier
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@linkengine.io"
                  className="input-base w-full px-md py-sm text-xs font-mono"
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-label-caps text-[11px] uppercase tracking-wider text-muted font-semibold" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="input-base w-full px-md py-sm pr-xl text-xs font-mono"
                    required
                    autoComplete="current-password"
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

              {/* Submit & Register Links */}
              <div className="pt-sm space-y-sm">
                <button
                  type="submit"
                  disabled={loading}
                  id="login-submit-btn"
                  className="btn-primary w-full py-sm text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {loading ? 'hourglass_empty' : 'login'}
                  </span>
                  {loading ? 'Authenticating...' : 'Sign In'}
                </button>

                <Link
                  to="/register"
                  className="btn-secondary w-full block text-center py-sm text-xs uppercase tracking-wider font-semibold"
                >
                  Create New Account
                </Link>
              </div>
            </form>
          </div>

          {/* Footer Strip */}
          <div className="p-sm border-t border-rule bg-paper-2 flex justify-between items-center text-[10px] font-mono text-muted">
            <span>SECURE JWT PROTOCOL</span>
            <span className="text-accent font-bold">READY</span>
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
