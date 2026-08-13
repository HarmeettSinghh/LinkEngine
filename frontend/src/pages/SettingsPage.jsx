import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import Layout from '../components/Layout';
import Toast from '../components/Toast';

export default function SettingsPage() {
  const { user } = useContext(AuthContext);

  const [username, setUsername] = useState(user?.sub || user?.username || 'admin_ops');
  const [email, setEmail] = useState(user?.email || 'ops@linkengine.dev');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastDesc, setToastDesc] = useState('');
  const [toastType, setToastType] = useState('success');

  const handleProfileSave = (e) => {
    e.preventDefault();
    setToastType('success');
    setToastMessage('Profile Information Saved');
    setToastDesc('(Simulated) Profile details updated successfully.');
    setShowToast(true);
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setToastType('error');
      setToastMessage('Update Failed');
      setToastDesc('Please enter both current and new passwords.');
      setShowToast(true);
      return;
    }
    setToastType('success');
    setToastMessage('Security Password Updated');
    setToastDesc('(Simulated) Password has been updated securely.');
    setShowToast(true);
    setCurrentPassword('');
    setNewPassword('');
  };

  const handleMockAction = (title, desc) => {
    setToastType('success');
    setToastMessage(title);
    setToastDesc(`(Simulated) ${desc}`);
    setShowToast(true);
  };

  const handleLightModeLocked = () => {
    setToastType('error');
    setToastMessage('Appearance Feature Locked');
    setToastDesc('Light mode theme is currently disabled.');
    setShowToast(true);
  };

  return (
    <Layout>
      <header className="mb-xl">
        <h2 className="font-display-lg text-display-lg text-on-surface mb-sm">Settings</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Manage your account preferences and security configurations.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Left Column: Navigation Tabs */}
        <div className="lg:col-span-1 hidden lg:block">
          <div className="flex flex-col gap-sm sticky top-lg">
            <button className="text-left px-md py-sm rounded text-primary font-label-caps text-label-caps bg-surface-container-high border-l-2 border-[#FF6B2C]">
              General
            </button>
            <button
              onClick={() => handleMockAction('API Keys Access', 'Navigated to API keys list.')}
              className="text-left px-md py-sm rounded text-on-surface-variant hover:bg-surface-container-low font-label-caps text-label-caps"
            >
              API Keys
            </button>
            <button
              onClick={() => handleMockAction('Billing Access', 'Navigated to billing information.')}
              className="text-left px-md py-sm rounded text-on-surface-variant hover:bg-surface-container-low font-label-caps text-label-caps"
            >
              Billing
            </button>
            <button
              onClick={() => handleMockAction('Team Access', 'Navigated to team settings.')}
              className="text-left px-md py-sm rounded text-on-surface-variant hover:bg-surface-container-low font-label-caps text-label-caps"
            >
              Team
            </button>
          </div>
        </div>

        {/* Right Column: Settings Content */}
        <div className="lg:col-span-2 flex flex-col gap-xl">
          {/* Profile Section */}
          <section className="card-surface rounded-lg p-lg bg-level-1">
            <div className="border-b border-[#292929] pb-sm mb-lg flex justify-between items-end">
              <h3 className="font-headline-md text-headline-md text-on-surface">Profile Information</h3>
              <span className="font-code-sm text-code-sm text-on-surface-variant">ID: usr_892x4a</span>
            </div>
            <form onSubmit={handleProfileSave}>
              <div className="flex flex-col sm:flex-row gap-lg mb-lg">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center overflow-hidden relative group cursor-pointer">
                    <img
                      className="w-full h-full object-cover"
                      alt="User avatar placeholder"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAyno8n2fsXMMTx0y3CChwgROgCu0vDHjWN6Po8kAfBUHgkMr9hLkO_dSf3ZdCRf348LSmkLVTZom4SEQXlYbmFx4k4Lrdou8at6ijV9a4chlj6wWEj90pPeiSS7wxztPN3IlkA7IRdoZwLluia7GfmAM8N_-DyiR4icX2n3Wy6qaW_ipkGXU7Lvxzgrg7PX5OIly9g1no4vaAZ4v5yD5_39yR7mjEZF_TSUVuHhBm7hZhmU0zbVUH"
                    />
                    <div
                      onClick={() => handleMockAction('Avatar Update', 'Triggered photo upload dialer.')}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-white">edit</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-md">
                  <div className="flex flex-col gap-xs">
                    <label className="font-label-caps text-label-caps text-on-surface-variant">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="input-surface font-code-md text-code-md text-on-surface p-sm rounded w-full md:w-2/3 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-xs">
                    <label className="font-label-caps text-label-caps text-on-surface-variant">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-surface font-code-md text-code-md text-on-surface p-sm rounded w-full md:w-2/3 transition-colors"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-md border-t border-[#292929]">
                <button
                  type="submit"
                  className="bg-primary-container text-white font-label-caps text-label-caps px-md py-sm rounded hover:bg-opacity-90 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </section>

          {/* Security Section */}
          <section className="card-surface rounded-lg p-lg bg-level-1">
            <div className="border-b border-[#292929] pb-sm mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface">Security</h3>
            </div>
            <form onSubmit={handlePasswordSave}>
              <div className="flex flex-col gap-md mb-lg">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-surface font-code-md text-code-md text-on-surface p-sm rounded w-full md:w-2/3 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-surface font-code-md text-code-md text-on-surface p-sm rounded w-full md:w-2/3 transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-md bg-[#1E1E1E] border border-[#333333] rounded mb-lg">
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-xs">Two-Factor Authentication</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Add an extra layer of security to your account.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleMockAction('2FA Setup', 'Two-Factor Authentication configuration started.')}
                  className="bg-transparent border border-[#292929] text-on-surface font-label-caps text-label-caps px-md py-sm rounded hover:bg-[#292929] transition"
                >
                  Enable 2FA
                </button>
              </div>
              <div className="flex justify-end pt-md border-t border-[#292929]">
                <button
                  type="submit"
                  className="bg-primary-container text-white font-label-caps text-label-caps px-md py-sm rounded hover:bg-opacity-90 transition"
                >
                  Update Password
                </button>
              </div>
            </form>
          </section>

          {/* Appearance Section */}
          <section className="card-surface rounded-lg p-lg bg-level-1">
            <div className="border-b border-[#292929] pb-sm mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface">Appearance</h3>
            </div>
            <div className="grid grid-cols-2 gap-md">
              <label className="cursor-pointer group">
                <div className="border-2 border-primary bg-[#151515] rounded p-sm h-32 flex flex-col justify-between relative overflow-hidden">
                  <div className="h-4 bg-[#292929] w-1/2 rounded mb-sm"></div>
                  <div className="space-y-2">
                    <div className="h-2 bg-[#292929] w-full rounded"></div>
                    <div className="h-2 bg-[#292929] w-3/4 rounded"></div>
                  </div>
                  <div className="absolute top-sm right-sm bg-primary-container w-4 h-4 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-[10px] text-white">check</span>
                  </div>
                </div>
                <div className="mt-sm text-center font-label-caps text-label-caps text-primary">
                  Dark (System)
                </div>
              </label>
              <label onClick={handleLightModeLocked} className="cursor-not-allowed opacity-50 group">
                <div className="border border-[#292929] bg-[#FFFFFF] rounded p-sm h-32 flex flex-col justify-between relative overflow-hidden">
                  <div className="h-4 bg-[#E5E5E5] w-1/2 rounded mb-sm"></div>
                  <div className="space-y-2">
                    <div className="h-2 bg-[#E5E5E5] w-full rounded"></div>
                    <div className="h-2 bg-[#E5E5E5] w-3/4 rounded"></div>
                  </div>
                </div>
                <div className="mt-sm text-center font-label-caps text-label-caps text-on-surface-variant flex items-center justify-center gap-xs">
                  Light <span className="material-symbols-outlined text-[14px]">lock</span>
                </div>
              </label>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="border border-error/20 bg-error/5 rounded-lg p-lg mt-md">
            <div className="pb-sm mb-md">
              <h3 className="font-headline-md text-headline-md text-[#ffb4ab]">Danger Zone</h3>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface mb-xs">Delete Account</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                  Permanently remove your account and all associated data.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleMockAction('Delete Account Request', 'Request to delete account logged.')}
                className="bg-error-container text-[#ffdad6] font-label-caps text-label-caps px-md py-sm rounded hover:opacity-90 transition whitespace-nowrap bg-[#93000a]"
              >
                Delete Account
              </button>
            </div>
          </section>
        </div>
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
