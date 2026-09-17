import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../App';
import BrandLogo from '../components/BrandLogo';
import Navbar from '../components/Navbar';
import '../landing.css';

/* Hallmark · theme: Grid · genre: editorial */

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const handleGetStarted = () => navigate(isAuthenticated ? '/dashboard' : '/register');

  return (
    <div className="landing-shell">
      {/* ── Public Navbar with 1px hairline border ──────────────────────── */}
      <Navbar />

      {/* ── Exposed 12-Column Hairline Grid ─────────────────────────────── */}
      <div className="rails" aria-hidden="true" />

      {/* ── Main Container (snapped to max-width 1280px) ────────────────── */}
      <div className="relative z-10 max-w-container-max mx-auto px-md md:px-lg">

        {/* ── Hero Band — Slammed Left, Asymmetric Occupancy ────────────── */}
        <section className="py-xl md:py-2xl border-b border-rule">
          <div className="grid-12 gap-y-xl items-start">
            
            {/* Left 7 Columns: Giant Lowercase Display + Copy + CTAs */}
            <div className="col-span-12 lg:col-span-7 pr-0 lg:pr-xl">
              <div className="flex items-center gap-sm mb-md">
                <span className="bar-accent" />
                <span className="font-label-caps text-xs tracking-widest uppercase font-semibold text-muted">
                  Sys Ref. 2026 // URL Management Engine
                </span>
              </div>

              <h1 className="font-display font-extrabold text-[clamp(44px,7.5vw,96px)] tracking-[-0.045em] leading-[0.9] text-ink lowercase mb-lg">
                shorten once.<br />
                track everything<span className="period" />
              </h1>

              <p className="font-body text-base md:text-lg text-ink/80 max-w-xl mb-xl leading-relaxed">
                A fast, reliable link shortener with built-in analytics.
                Turn long URLs into clean short links and track every click in real time.
              </p>

              <div className="flex flex-wrap items-center gap-sm mb-lg">
                <button
                  onClick={handleGetStarted}
                  className="btn-primary px-xl py-sm text-xs font-semibold uppercase tracking-wider flex items-center gap-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">add_link</span>
                  {isAuthenticated ? 'Open Dashboard' : 'Get Started — Free'}
                </button>
                <a
                  href="#features"
                  className="btn-secondary px-lg py-sm text-xs font-semibold uppercase tracking-wider flex items-center gap-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">south</span>
                  System Specs
                </a>
              </div>

              {/* Stack Spec Marks */}
              <div className="flex flex-wrap items-center gap-md pt-md border-t border-rule text-xs font-label-caps uppercase tracking-wider text-muted">
                <span className="flex items-center gap-xs">
                  <span className="w-1.5 h-1.5 bg-accent inline-block" /> Fast redirects
                </span>
                <span className="flex items-center gap-xs">
                  <span className="w-1.5 h-1.5 bg-ink inline-block" /> Click analytics
                </span>
                <span className="flex items-center gap-xs">
                  <span className="w-1.5 h-1.5 bg-ink inline-block" /> Secure accounts
                </span>
                <span className="flex items-center gap-xs">
                  <span className="w-1.5 h-1.5 bg-ink inline-block" /> Open source
                </span>
              </div>
            </div>

            {/* Right 5 Columns: Constructed Swiss Architecture Object */}
            <div className="col-span-12 lg:col-span-5 border border-rule bg-paper-2 p-md md:p-lg">
              <div className="flex justify-between items-center pb-sm border-b border-rule mb-md">
                <div className="font-label-caps text-[11px] uppercase tracking-widest font-semibold text-muted">
                  FIG 01 // Redirection Protocol
                </div>
                <div className="stepped-bars">
                  <span className="stepped-bar-1" />
                  <span className="stepped-bar-2" />
                  <span className="stepped-bar-3" />
                  <span className="stepped-bar-4" />
                </div>
              </div>

              <div className="space-y-sm font-mono text-xs">
                {/* Protocol Step 1 */}
                <div className="p-sm bg-paper border border-rule">
                  <div className="text-[10px] text-muted uppercase tracking-wider font-label-caps mb-1">
                    01. Input Source
                  </div>
                  <div className="text-ink truncate font-semibold">
                    https://example.com/very/long/target/path
                  </div>
                </div>

                {/* Protocol Arrow */}
                <div className="flex items-center justify-center text-muted py-0.5">
                  <span className="material-symbols-outlined text-sm">arrow_downward</span>
                </div>

                {/* Protocol Step 2 */}
                <div className="p-sm bg-paper border border-rule">
                  <div className="text-[10px] text-muted uppercase tracking-wider font-label-caps mb-1">
                    02. Short link generated
                  </div>
                  <div className="flex justify-between items-center text-ink">
                    <span>lnk.io/<strong className="text-accent">xK9mP2</strong></span>
                    <span className="text-muted text-[10px]">ready</span>
                  </div>
                </div>

                {/* Protocol Arrow */}
                <div className="flex items-center justify-center text-muted py-0.5">
                  <span className="material-symbols-outlined text-sm">arrow_downward</span>
                </div>

                {/* Protocol Step 3 */}
                <div className="p-sm bg-paper border border-accent">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-accent uppercase tracking-wider font-label-caps font-bold">
                      03. Instant redirect
                    </span>
                    <span className="w-2 h-2 bg-accent inline-block" />
                  </div>
                  <div className="text-ink font-bold mt-1">
                    Redirect executed in 1 round trip
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── The Plate: The Flooded Signal Red Poster Moment ─────────────── */}
        <section className="plate my-xl p-lg md:p-2xl">
          <div className="relative z-10 max-w-4xl">
            <div className="font-label-caps text-xs uppercase tracking-widest font-bold text-paper/80 mb-sm">
              Why LinkEngine
            </div>
            <h2 className="font-display font-extrabold text-[clamp(32px,5.5vw,72px)] tracking-[-0.04em] leading-[0.92] lowercase mb-md text-paper">
              zero sequential scans.<br />
              direct indexed dispatch<span className="inline-block w-3 h-3 bg-paper ml-1 align-baseline" />
            </h2>
            <p className="text-paper/90 font-body text-base max-w-2xl leading-relaxed">
              Your links redirect instantly, no matter how many you create.
            </p>
          </div>
        </section>

        {/* ── Features Matrix: 12-Column Ruled Cells ───────────────────────── */}
        <section id="features" className="py-xl border-t border-rule" aria-label="System Capabilities">
          <div className="flex justify-between items-end pb-md border-b border-rule mb-0">
            <div>
              <div className="font-label-caps text-xs uppercase tracking-widest text-muted font-semibold mb-1">
                Specifications
              </div>
              <h2 className="font-display font-extrabold text-3xl text-ink tracking-tight lowercase">
                system capabilities<span className="period" />
              </h2>
            </div>
            <div className="text-right font-mono text-xs text-muted">
              INDEX 01—04
            </div>
          </div>

          <div className="grid-12 border-l border-rule">
            {/* Cell 1: Index Engine */}
            <article className="col-span-12 md:col-span-6 lg:col-span-3 grid-spec-cell flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-md">
                  <span className="font-mono text-xs text-muted">01</span>
                  <span className="material-symbols-outlined text-accent text-xl">bolt</span>
                </div>
                <h3 className="font-display font-extrabold text-lg text-ink lowercase tracking-tight mb-xs">
                  instant redirects
                </h3>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Every short link redirects instantly. Clean, fast, and reliable every time.
                </p>
              </div>
              <div className="pt-md mt-md border-t border-rule/60 text-[11px] font-label-caps uppercase tracking-wider text-muted">
                HTTP 302 Redirect
              </div>
            </article>

            {/* Cell 2: Granular Telemetry */}
            <article className="col-span-12 md:col-span-6 lg:col-span-3 grid-spec-cell flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-md">
                  <span className="font-mono text-xs text-muted">02</span>
                  <span className="material-symbols-outlined text-accent text-xl">monitoring</span>
                </div>
                <h3 className="font-display font-extrabold text-lg text-ink lowercase tracking-tight mb-xs">
                  click telemetry
                </h3>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Every redirect request logs a timestamped event. Analyze total clicks, daily distributions, and trends per link.
                </p>
              </div>
              <div className="pt-md mt-md border-t border-rule/60 text-[11px] font-label-caps uppercase tracking-wider text-muted">
                Timestamped Event Log
              </div>
            </article>

            {/* Cell 3: JWT Security */}
            <article className="col-span-12 md:col-span-6 lg:col-span-3 grid-spec-cell flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-md">
                  <span className="font-mono text-xs text-muted">03</span>
                  <span className="material-symbols-outlined text-accent text-xl">lock</span>
                </div>
                <h3 className="font-display font-extrabold text-lg text-ink lowercase tracking-tight mb-xs">
                  secure accounts
                </h3>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Your links are private and only visible to you.
                </p>
              </div>
              <div className="pt-md mt-md border-t border-rule/60 text-[11px] font-label-caps uppercase tracking-wider text-muted">
                Private &amp; secure
              </div>
            </article>

            {/* Cell 4: Self-Hostable */}
            <article className="col-span-12 md:col-span-6 lg:col-span-3 grid-spec-cell flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-md">
                  <span className="font-mono text-xs text-muted">04</span>
                  <span className="material-symbols-outlined text-accent text-xl">terminal</span>
                </div>
                <h3 className="font-display font-extrabold text-lg text-ink lowercase tracking-tight mb-xs">
                  self-hostable
                </h3>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Run it yourself or use the hosted version. Your data stays yours.
                </p>
              </div>
              <div className="pt-md mt-md border-t border-rule/60 text-[11px] font-label-caps uppercase tracking-wider text-muted">
                Docker / Jar Native
              </div>
            </article>
          </div>
        </section>

        {/* ── Call to Action Band ─────────────────────────────────────────── */}
        <section className="py-xl border-t border-b border-rule bg-paper-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md px-lg">
            <div>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-ink tracking-tight lowercase mb-1">
                ready to get started<span className="period" />
              </h2>
              <p className="text-sm text-muted">
                Create a free account to start shortening links.
              </p>
            </div>
            <div className="flex items-center gap-sm">
              {isAuthenticated ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-primary px-xl py-sm text-xs font-semibold uppercase tracking-wider"
                >
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn-secondary px-lg py-sm text-xs font-semibold uppercase tracking-wider"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary px-lg py-sm text-xs font-semibold uppercase tracking-wider"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── Swiss Architectural Footer ─────────────────────────────────── */}
        <footer className="py-lg flex flex-col md:flex-row justify-between items-center gap-md text-xs text-muted font-label-caps uppercase tracking-wider">
          <div className="flex items-center gap-xs">
            <BrandLogo className="w-4 h-4" />
            <span className="text-ink font-bold lowercase font-display text-sm">linkengine</span>
            <span className="period" />
            <span className="ml-md text-[11px]">© {new Date().getFullYear()} · Open Source Systems</span>
          </div>

          <div className="flex items-center gap-lg">
            <a href="#features" className="hover:text-ink transition-colors">Features</a>
            <Link to="/login" className="hover:text-ink transition-colors">Sign In</Link>
            <Link to="/register" className="hover:text-ink transition-colors">Register</Link>
          </div>
        </footer>

      </div>
    </div>
  );
}
