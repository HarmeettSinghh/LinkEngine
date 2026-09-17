import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import BrandLogo from './BrandLogo';

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard', index: '01' },
    { name: 'My Links', path: '/my-links', icon: 'link', index: '02' },
    { name: 'Analytics', path: '/analytics', icon: 'monitoring', index: '03' },
    { name: 'Settings', path: '/settings', icon: 'settings', index: '04' },
  ];

  const handleShortenClick = () => {
    navigate('/dashboard');
    setTimeout(() => {
      const input = document.getElementById('url-input');
      if (input) input.focus();
    }, 100);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-paper text-ink font-body">
      {/* SideNav Desktop — Swiss Systems Rail */}
      <nav className="hidden md:flex flex-col h-screen fixed left-0 top-0 z-40 w-64 bg-paper border-r border-rule">
        {/* Brand Header */}
        <div className="p-lg border-b border-rule">
          <Link to="/" className="flex items-center gap-xs hover:opacity-80 transition-opacity">
            <BrandLogo className="w-5 h-5" />
            <span className="font-display font-extrabold text-xl text-ink tracking-tight lowercase">
              linkengine
            </span>
            <span className="period" />
          </Link>

          <button
            onClick={handleShortenClick}
            className="mt-lg w-full btn-primary py-sm px-md text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-xs"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Shorten Link
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 py-md overflow-y-auto">
          <div className="px-lg pb-xs font-label-caps text-[10px] uppercase tracking-widest text-muted">
            Index
          </div>
          <ul className="flex flex-col">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center justify-between px-lg py-sm font-label-caps text-xs uppercase tracking-wider transition-colors border-l-2 ${
                      active
                        ? 'text-ink bg-paper-2 border-accent font-bold'
                        : 'text-muted border-transparent hover:text-ink hover:bg-paper-2'
                    }`}
                  >
                    <div className="flex items-center gap-sm">
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[10px] text-muted font-mono">{item.index}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* User Info & Logout Strip */}
        <div className="p-md border-t border-rule flex flex-col gap-sm bg-paper-2">
          <div className="flex items-center gap-sm p-sm border border-rule bg-paper">
            <span className="material-symbols-outlined text-accent text-[20px]">person</span>
            <div className="truncate">
              <p className="text-xs font-bold text-ink truncate leading-tight">
                {user?.sub || user?.username || 'user'}
              </p>
              <p className="text-[10px] text-muted uppercase tracking-wider truncate">
                Member
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center gap-sm px-sm py-xs text-xs font-semibold uppercase tracking-wider text-muted hover:text-ink hover:bg-paper border border-transparent hover:border-rule transition-colors text-left"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            Logout
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-ink/40 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-paper border-r border-rule z-50 transform transition-transform duration-200 md:hidden flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-lg border-b border-rule flex justify-between items-center bg-paper">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-xs hover:opacity-80 transition-opacity">
            <BrandLogo className="w-5 h-5" />
            <span className="font-display font-extrabold text-lg text-ink lowercase tracking-tight">
              linkengine
            </span>
            <span className="period" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-xs text-muted hover:text-ink"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 py-md overflow-y-auto">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-lg py-sm font-label-caps text-xs uppercase tracking-wider ${
                    isActive(item.path)
                      ? 'text-ink bg-paper-2 border-l-2 border-accent font-bold'
                      : 'text-muted hover:text-ink hover:bg-paper-2'
                  }`}
                >
                  <div className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  <span className="text-[10px] text-muted font-mono">{item.index}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-md border-t border-rule bg-paper-2">
          <div className="text-[11px] text-muted truncate mb-sm">
            USER: <strong className="text-ink">{user?.sub || user?.username || 'user'}</strong>
          </div>
          <button
            onClick={logout}
            className="w-full btn-secondary py-xs text-xs font-semibold uppercase tracking-wider"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-30 bg-paper border-b border-rule px-lg py-sm flex justify-between items-center">
          <Link to="/" className="flex items-center gap-xs hover:opacity-80 transition-opacity">
            <BrandLogo className="w-5 h-5" />
            <span className="font-display font-extrabold text-base text-ink lowercase">linkengine</span>
            <span className="period" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-xs border border-rule text-ink bg-paper-2"
          >
            <span className="material-symbols-outlined text-lg">menu</span>
          </button>
        </header>

        <main className="flex-grow p-md md:p-xl max-w-container-max w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
