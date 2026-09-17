import React, { useContext } from 'react';
import { AuthContext } from '../App';
import Layout from '../components/Layout';

export default function SettingsPage() {
  const { user } = useContext(AuthContext);

  return (
    <Layout>
      {/* ── Page Header: Hallmark Grid Lowercase Display ────────────────── */}
      <header className="mb-xl pb-md border-b border-rule">
        <div className="font-label-caps text-xs uppercase tracking-widest text-muted font-semibold mb-1">
          Configuration // Identity
        </div>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-ink tracking-tight lowercase">
          settings<span className="period" />
        </h1>
      </header>

      {/* ── Ruled Settings Matrix ────────────────────────────────────────── */}
      <div className="max-w-2xl space-y-xl">
        {/* Profile Specification */}
        <section className="border border-rule bg-paper p-lg">
          <div className="border-b border-rule pb-sm mb-lg flex justify-between items-center">
            <h2 className="font-label-caps text-xs uppercase tracking-widest text-ink font-bold">
              01. User Account Profile
            </h2>
            <span className="text-[10px] text-muted font-mono">AUTH // JWT</span>
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
                  Username Identifier
                </label>
                <div className="font-mono text-xs text-ink p-sm bg-paper-2 border border-rule">
                  {user?.username || user?.sub || 'user'}
                </div>
              </div>

              <div>
                <label className="font-label-caps text-[11px] uppercase tracking-wider text-muted font-semibold block mb-1">
                  Email Address
                </label>
                <div className="font-mono text-xs text-ink p-sm bg-paper-2 border border-rule">
                  {user?.email || user?.sub || 'user@example.com'}
                </div>
              </div>

              <div>
                <label className="font-label-caps text-[11px] uppercase tracking-wider text-muted font-semibold block mb-1">
                  Assigned Roles
                </label>
                <div className="font-mono text-xs text-muted p-sm bg-paper-2 border border-rule">
                  {user?.roles || 'ROLE_USER'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Theme Specification */}
        <section className="border border-rule bg-paper p-lg">
          <div className="border-b border-rule pb-sm mb-lg">
            <h2 className="font-label-caps text-xs uppercase tracking-widest text-ink font-bold">
              02. Design Architecture
            </h2>
          </div>

          <div className="flex items-center justify-between p-md bg-paper-2 border border-rule">
            <div className="flex items-center gap-md">
              <span className="w-3 h-3 bg-accent inline-block" />
              <div>
                <p className="font-bold text-sm text-ink font-mono">Hallmark Grid Theme</p>
                <p className="text-xs text-muted font-mono mt-0.5">
                  Swiss neo-grotesque systems design · 12-column exposed grid · Archivo
                </p>
              </div>
            </div>
            <span className="px-sm py-xs bg-paper border border-accent text-accent font-bold text-[10px] uppercase font-mono">
              Active
            </span>
          </div>
        </section>
      </div>
    </Layout>
  );
}
