import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../App';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isLinkActive = (path) => location.pathname === path;

  return (
    <nav className="border-b border-rule w-full px-lg py-sm sticky top-0 z-50 bg-paper">
      <div className="max-w-container-max mx-auto flex justify-between items-center w-full">
        {/* Brand: Lowercase Swiss Display + Period Mark */}
        <div className="flex items-center gap-md">
          <Link to="/" className="flex items-center gap-xs">
            <BrandLogo className="w-5 h-5" />
            <span className="font-display font-extrabold text-xl text-ink tracking-tight lowercase">
              linkengine
            </span>
            <span className="period" />
          </Link>
        </div>

        {/* Public nav links — only show when not authenticated */}
        {!isAuthenticated && (
          <div className="hidden md:flex items-center gap-lg">
            <Link
              to="/"
              className={`font-label-caps text-label-caps tracking-widest uppercase font-semibold transition-colors ${
                isLinkActive('/') ? 'text-accent' : 'text-muted hover:text-ink'
              }`}
            >
              Home
            </Link>
            <a
              href="#features"
              className="font-label-caps text-label-caps tracking-widest uppercase font-semibold text-muted hover:text-ink transition-colors"
            >
              Features
            </a>
            <a
              href="#architecture"
              className="font-label-caps text-label-caps tracking-widest uppercase font-semibold text-muted hover:text-ink transition-colors"
            >
              Specs
            </a>
          </div>
        )}

        {/* CTA buttons — Swiss 0-radius */}
        <div className="flex items-center gap-sm">
          {isAuthenticated ? (
            <div className="flex items-center gap-sm">
              <div className="flex items-center gap-xs px-sm py-xs border border-rule font-code-sm text-code-sm text-ink bg-paper-2">
                <span className="material-symbols-outlined text-sm text-muted">person</span>
                <span>{user?.sub || user?.username || 'user'}</span>
              </div>
              <button
                onClick={logout}
                className="btn-secondary px-md py-xs text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn-secondary px-md py-xs text-xs font-semibold uppercase tracking-wider transition-colors hidden md:inline-block"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn-primary px-md py-xs text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
