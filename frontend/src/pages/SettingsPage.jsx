import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../App';
import { api } from '../services/api';
import Layout from '../components/Layout';
import Toast from '../components/Toast';

export default function SettingsPage() {
  const { user, logout } = useContext(AuthContext);

  // ── Change Password State ──────────────────────────────────────────────────
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  // ── Preferences State (localStorage) ──────────────────────────────────────
  const [autoCopy, setAutoCopy] = useState(() =>
    localStorage.getItem('pref_autoCopy') !== 'false'
  );
  const [openAfterShorten, setOpenAfterShorten] = useState(() =>
    localStorage.getItem('pref_openAfterShorten') === 'true'
  );

  // ── Toast ──────────────────────────────────────────────────────────────────
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastDesc, setToastDesc] = useState('');
  const [toastType, setToastType] = useState('success');

  const toast = (type, message, desc = '') => {
    setToastType(type);
    setToastMessage(message);
    setToastDesc(desc);
    setShowToast(true);
  };

  // Persist preferences
  useEffect(() => {
    localStorage.setItem('pref_autoCopy', autoCopy);
  }, [autoCopy]);

  useEffect(() => {
    localStorage.setItem('pref_openAfterShorten', openAfterShorten);
  }, [openAfterShorten]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmNewPassword) return;
    if (newPassword !== confirmNewPassword) {
      toast('error', 'Passwords do not match', 'New password and confirmation must be identical.');
      return;
    }
    if (newPassword.length < 8) {
      toast('error', 'Password too short', 'New password must be at least 8 characters.');
      return;
    }
    setPwLoading(true);
    try {
      await api.changePassword(currentPassword, newPassword);
      toast('success', 'Password updated', 'Your password has been changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      toast('error', 'Could not update password', err.message || 'Please check your current password and try again.');
    } finally {
      setPwLoading(false);
    }
  };

  const Toggle = ({ checked, onChange, id }) => (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 flex-shrink-0 transition-colors duration-200 border ${
        checked ? 'bg-accent border-accent' : 'bg-paper-2 border-rule'
      }`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 bg-paper transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );

  return (
    <Layout>
      <header className="mb-xl pb-md border-b border-rule">
        <div className="font-label-caps text-xs uppercase tracking-widest text-muted font-semibold mb-1">
          Account
        </div>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-ink tracking-tight lowercase">
          settings<span className="period" />
        </h1>
      </header>

      <div className="max-w-2xl space-y-xl">

        {/* ── 01. Profile ───────────────────────────────────────────────────── */}
        <section className="border border-rule bg-paper p-lg">
          <div className="border-b border-rule pb-sm mb-lg flex justify-between items-center">
            <h2 className="font-label-caps text-xs uppercase tracking-widest text-ink font-bold">
              01. Profile
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-lg">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 border border-rule bg-paper-2 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-muted">person</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-md">
              <div>
                <label className="font-label-caps text-[11px] uppercase tracking-wider text-muted font-semibold block mb-1">
                  Username
                </label>
                <div className="font-mono text-xs text-ink p-sm bg-paper-2 border border-rule">
                  {user?.username || user?.sub || '—'}
                </div>
              </div>
              <div>
                <label className="font-label-caps text-[11px] uppercase tracking-wider text-muted font-semibold block mb-1">
                  Email Address
                </label>
                <div className="font-mono text-xs text-ink p-sm bg-paper-2 border border-rule">
                  {user?.email || user?.sub || '—'}
                </div>
              </div>
              <p className="text-[11px] text-muted font-mono">
                To update your username or email, please contact support.
              </p>
            </div>
          </div>
        </section>

        {/* ── 02. Security — Change Password ────────────────────────────────── */}
        <section className="border border-rule bg-paper p-lg">
          <div className="border-b border-rule pb-sm mb-lg">
            <h2 className="font-label-caps text-xs uppercase tracking-widest text-ink font-bold">
              02. Security
            </h2>
            <p className="font-mono text-[11px] text-muted mt-1">Change your account password.</p>
          </div>

          <form onSubmit={handleChangePassword} className="flex flex-col gap-md">
            {/* Current Password */}
            <div>
              <label className="font-label-caps text-[11px] uppercase tracking-wider text-muted font-semibold block mb-1" htmlFor="current-password">
                Current Password
              </label>
              <div className="relative">
                <input
                  id="current-password"
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="input-base w-full px-md py-sm pr-xl text-xs font-mono"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute inset-y-0 right-0 pr-sm flex items-center text-muted hover:text-ink"
                  aria-label={showCurrent ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {showCurrent ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="font-label-caps text-[11px] uppercase tracking-wider text-muted font-semibold block mb-1" htmlFor="new-password">
                New Password
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="input-base w-full px-md py-sm pr-xl text-xs font-mono"
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute inset-y-0 right-0 pr-sm flex items-center text-muted hover:text-ink"
                  aria-label={showNew ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {showNew ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="font-label-caps text-[11px] uppercase tracking-wider text-muted font-semibold block mb-1" htmlFor="confirm-new-password">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirm-new-password"
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="input-base w-full px-md py-sm pr-xl text-xs font-mono"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-0 pr-sm flex items-center text-muted hover:text-ink"
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {showConfirm ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="pt-xs">
              <button
                type="submit"
                disabled={pwLoading}
                className="btn-primary py-sm px-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-xs disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {pwLoading ? 'hourglass_empty' : 'lock_reset'}
                </span>
                {pwLoading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </section>

        {/* ── 03. Preferences ───────────────────────────────────────────────── */}
        <section className="border border-rule bg-paper p-lg">
          <div className="border-b border-rule pb-sm mb-lg">
            <h2 className="font-label-caps text-xs uppercase tracking-widest text-ink font-bold">
              03. Preferences
            </h2>
            <p className="font-mono text-[11px] text-muted mt-1">Saved to this browser.</p>
          </div>

          <div className="flex flex-col divide-y divide-rule">
            {/* Auto-copy */}
            <div className="flex items-center justify-between py-md gap-md">
              <div>
                <p className="font-mono text-xs text-ink font-semibold">Auto-copy short link</p>
                <p className="font-mono text-[11px] text-muted mt-0.5">
                  Automatically copy the short link to your clipboard after creating it.
                </p>
              </div>
              <Toggle
                id="pref-autocopy"
                checked={autoCopy}
                onChange={setAutoCopy}
              />
            </div>

            {/* Open after shorten */}
            <div className="flex items-center justify-between py-md gap-md">
              <div>
                <p className="font-mono text-xs text-ink font-semibold">Open link after shortening</p>
                <p className="font-mono text-[11px] text-muted mt-0.5">
                  Open your new short link in a new tab immediately after creation.
                </p>
              </div>
              <Toggle
                id="pref-open-after"
                checked={openAfterShorten}
                onChange={setOpenAfterShorten}
              />
            </div>
          </div>
        </section>

        {/* ── 04. Danger Zone ───────────────────────────────────────────────── */}
        <section className="border border-accent/40 bg-paper p-lg">
          <div className="border-b border-rule pb-sm mb-lg">
            <h2 className="font-label-caps text-xs uppercase tracking-widest text-accent font-bold">
              04. Danger Zone
            </h2>
          </div>

          <div className="flex flex-col gap-md">
            {/* Sign Out */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md p-md bg-paper-2 border border-rule">
              <div>
                <p className="font-mono text-xs text-ink font-semibold">Sign out</p>
                <p className="font-mono text-[11px] text-muted mt-0.5">
                  Sign out of your account on this device.
                </p>
              </div>
              <button
                onClick={logout}
                className="btn-secondary py-sm px-lg text-xs uppercase tracking-wider font-semibold flex items-center gap-xs whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                Sign Out
              </button>
            </div>

            {/* Delete Account — UI only placeholder */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md p-md bg-paper-2 border border-rule opacity-50">
              <div>
                <p className="font-mono text-xs text-ink font-semibold">Delete account</p>
                <p className="font-mono text-[11px] text-muted mt-0.5">
                  Permanently delete your account and all your links. This cannot be undone.
                </p>
              </div>
              <button
                disabled
                className="btn-secondary py-sm px-lg text-xs uppercase tracking-wider font-semibold flex items-center gap-xs whitespace-nowrap cursor-not-allowed"
                title="Coming soon"
              >
                <span className="material-symbols-outlined text-[16px]">delete_forever</span>
                Delete Account
              </button>
            </div>
          </div>
        </section>

      </div>

      <Toast
        show={showToast}
        message={toastMessage}
        description={toastDesc}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </Layout>
  );
}
