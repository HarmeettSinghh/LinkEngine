import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../App';
import Navbar from '../components/Navbar';
import BrandLogo from '../components/BrandLogo';

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const [demoInput, setDemoInput] = useState('');
  const [demoResult, setDemoResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDemoShorten = (e) => {
    e.preventDefault();
    if (!demoInput) return;

    setLoading(true);
    setDemoResult('');

    setTimeout(() => {
      // client-side demo shortened hashing mimicking Stitch landing view
      const hash = Math.random().toString(36).substring(2, 7);
      setDemoResult(`http://localhost:8080/${hash}`);
      setLoading(false);
    }, 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(demoResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleManageLinks = () => {
    if (isAuthenticated) {
      navigate('/my-links');
    } else {
      navigate('/login');
    }
  };

  const handleCreateShortLink = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0B0B] text-on-surface">
      {/* Promotional Top Info Bar */}
      <div className="w-full bg-[#1E1E1E] border-b border-border-subtle py-xs px-md flex items-center justify-center text-center">
        <p className="font-code-sm text-[11px] text-on-surface-variant">
          <span className="text-[#FF6B2C] font-bold">SYSTEM ONLINE</span> (v2.4.1) — High performance URL routing and click analytics engine active.
        </p>
      </div>

      <Navbar />

      <main className="flex-grow flex flex-col relative w-full max-w-container-max mx-auto px-margin-mobile md:px-lg">
        
        {/* Hero Section */}
        <section className="relative pt-2xl pb-2xl flex flex-col items-center justify-center text-center mt-xl border-b border-border-subtle">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0"></div>
          
          <div className="z-10 flex flex-col items-center max-w-3xl w-full">
            <div className="inline-flex items-center gap-2 px-sm py-xs rounded bg-surface-level-2 border border-border-subtle mb-lg">
              <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></span>
              <span className="font-code-sm text-code-sm text-on-surface-variant">LinkEngine Routing Active</span>
            </div>

            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-md tracking-tight">
              LINKENGINE — <br className="md:hidden" />Shorten. Share. Track.
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl max-w-2xl font-normal leading-relaxed">
              Generate precise technical aliases for your long web links, track client-side request data telemetry, and redirect users with sub-millisecond response rates.
            </p>

            {/* URL Shortener Demo Tool */}
            <div className="w-full max-w-2xl card-surface rounded-lg p-sm mb-xl shadow-2xl shadow-black/50">
              <form onSubmit={handleDemoShorten} className="flex flex-col md:flex-row gap-sm w-full">
                <div className="relative flex-grow flex items-center">
                  <span className="material-symbols-outlined absolute left-md text-on-surface-variant">
                    link
                  </span>
                  <input
                    type="url"
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                    className="input-tech w-full py-md pl-xl pr-md rounded-md focus:border-[#FF6B2C] focus:ring-0"
                    placeholder="https://your-long-url.com/path?param=value"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary px-lg py-md rounded-md font-label-caps whitespace-nowrap flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  ) : (
                    <>
                      <span>Shorten Link</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {/* Result Area */}
              {demoResult && (
                <div className="mt-sm p-md bg-surface-level-2 border border-border-subtle rounded-md flex justify-between items-center transition-all duration-300">
                  <div className="flex items-center gap-sm overflow-hidden">
                    <span className="font-code-md text-[#FF6B2C] truncate font-bold">{demoResult}</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-xs text-on-surface-variant hover:text-white transition-colors flex items-center"
                    title="Copy to clipboard"
                  >
                    <span className="material-symbols-outlined">
                      {copied ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Authentic SaaS CTA Workflow buttons */}
            <div className="flex flex-wrap justify-center gap-md">
              <button
                onClick={handleManageLinks}
                className="btn-primary px-lg py-md rounded font-label-caps tracking-widest text-label-caps"
              >
                {isAuthenticated ? 'Manage Links' : 'Login to Manage'}
              </button>
              <button
                onClick={handleCreateShortLink}
                className="btn-secondary px-lg py-md rounded font-label-caps tracking-widest text-label-caps"
              >
                {isAuthenticated ? 'Dashboard Shortener' : 'Get Started Free'}
              </button>
            </div>

            {/* Premium Brand CSS Graphic representation */}
            <div className="relative w-full max-w-lg h-64 bg-surface-level-2 border border-border-subtle rounded-lg overflow-hidden flex items-center justify-center p-md mt-xl">
              <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
              
              <div className="flex items-center justify-between w-full px-lg relative z-10">
                {/* Node 1 */}
                <div className="flex flex-col items-center gap-xs">
                  <div className="w-12 h-12 rounded-full bg-[#151515] border border-border-subtle flex items-center justify-center text-on-surface-variant hover:border-[#FF6B2C] hover:text-[#FF6B2C] transition-colors duration-300">
                    <span className="material-symbols-outlined">link</span>
                  </div>
                  <span className="font-code-sm text-[10px] text-on-surface-variant uppercase">Original Link</span>
                </div>
                
                {/* Line 1 */}
                <div className="flex-grow h-[2px] bg-gradient-to-r from-border-subtle via-[#FF6B2C] to-border-subtle mx-md relative">
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse"></div>
                </div>

                {/* Brand Center Node */}
                <div className="flex flex-col items-center gap-xs">
                  <div className="w-16 h-16 rounded-full bg-[#1E1E1E] border-2 border-[#FF6B2C] flex items-center justify-center text-[#FF6B2C] shadow-lg shadow-[#FF6B2C]/20">
                    <BrandLogo className="w-8 h-8" />
                  </div>
                  <span className="font-code-sm text-[10px] text-primary font-bold uppercase tracking-wider">LinkEngine</span>
                </div>

                {/* Line 2 */}
                <div className="flex-grow h-[2px] bg-gradient-to-r from-border-subtle via-[#FF6B2C] to-border-subtle mx-md relative">
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse"></div>
                </div>

                {/* Node 3 */}
                <div className="flex flex-col items-center gap-xs">
                  <div className="w-12 h-12 rounded-full bg-[#151515] border border-border-subtle flex items-center justify-center text-on-surface-variant hover:border-[#FF6B2C] hover:text-[#FF6B2C] transition-colors duration-300">
                    <span className="material-symbols-outlined">analytics</span>
                  </div>
                  <span className="font-code-sm text-[10px] text-on-surface-variant uppercase">Redirection</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Product Explanation Section */}
        <section id="about" className="py-2xl border-b border-border-subtle">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
            <div className="space-y-md text-left">
              <h2 className="font-headline-md text-headline-md text-white">How LinkEngine Works</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                LinkEngine is built for modern developer workflows. When a client accesses a shortened URL, our gateway resolves the hash using MySQL indexes in under 2ms, logs telemetry click metadata, and sends an HTTP 302 redirect.
              </p>
              <ul className="space-y-sm font-code-sm text-code-sm text-[#A1A1AA]">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FF6B2C] rounded-full"></span>
                  High performance Java + Spring Boot core logic.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FF6B2C] rounded-full"></span>
                  JWT authentication keeps URL lists private and protected.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FF6B2C] rounded-full"></span>
                  Detailed click logs generated for every redirect request.
                </li>
              </ul>
            </div>
            <div className="bg-surface-level-1 border border-border-subtle p-lg rounded-lg space-y-md text-left">
              <div className="flex items-center justify-between border-b border-border-subtle pb-xs">
                <span className="font-label-caps text-label-caps text-[#FF6B2C]">API Example Request</span>
                <span className="font-code-sm text-[10px] text-on-surface-variant">cURL</span>
              </div>
              <pre className="font-code-sm text-code-sm text-on-surface-variant bg-[#0B0B0B] p-md rounded overflow-x-auto border border-border-subtle">
{`curl -X POST http://localhost:8080/api/urls/shorten \\
  -H "Authorization: Bearer <JWT_TOKEN>" \\
  -H "Content-Type: application/json" \\
  -d '{"originalUrl": "https://example.com"}'`}
              </pre>
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="py-2xl w-full">
          <div className="flex flex-col items-center mb-xl">
            <h2 className="font-headline-md text-headline-md text-white mb-sm">
              Features Built for Scale
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl text-center">
              Built for speed, simplicity, and technical integrity. Track telemetry with minimal overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {/* Feature 1 */}
            <div className="card-surface rounded-lg p-lg bg-level-1 text-left flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-md pb-xs border-b border-border-subtle">
                  <h3 className="font-headline-sm text-headline-sm text-white">Edge Resolution</h3>
                  <span className="material-symbols-outlined text-[#FF6B2C]">bolt</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Links are resolved dynamically on-demand, fetching original targets in sub-millisecond rates.
                </p>
              </div>
              <div className="font-code-sm text-code-sm text-accent-primary mt-lg">
                Status: Latency Optimal
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card-surface rounded-lg p-lg bg-level-1 text-left flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-md pb-xs border-b border-[#292929]">
                  <h3 className="font-headline-sm text-headline-sm text-white">Click Analytics</h3>
                  <span className="material-symbols-outlined text-[#FF6B2C]">monitoring</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Each redirect logs access time stamps and logs click counts to help you understand traffic growth.
                </p>
              </div>
              <div className="font-code-sm text-code-sm text-accent-primary mt-lg">
                Telemetries: Logged
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card-surface rounded-lg p-lg bg-level-1 text-left flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-md pb-xs border-b border-[#292929]">
                  <h3 className="font-headline-sm text-headline-sm text-white">Secured Storage</h3>
                  <span className="material-symbols-outlined text-[#FF6B2C]">security</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  JWT authentication with Spring Security isolates URL mappings, keeping your dashboard logs secure.
                </p>
              </div>
              <div className="font-code-sm text-code-sm text-accent-primary mt-lg">
                Access Control: Active
              </div>
            </div>
          </div>
        </section>

        {/* Trust/Value Section */}
        <section className="py-2xl border-t border-border-subtle bg-level-1/20 rounded-lg p-lg text-center my-xl">
          <h3 className="font-headline-md text-headline-md text-white mb-md">High-Performance Link Utilities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-lg">
            <div className="p-md bg-[#151515] border border-border-subtle rounded-lg">
              <p className="font-display-lg-mobile text-[#FF6B2C] font-bold">99.9%</p>
              <p className="font-code-sm text-[10px] text-on-surface-variant uppercase mt-1">Uptime SLA</p>
            </div>
            <div className="p-md bg-[#151515] border border-border-subtle rounded-lg">
              <p className="font-display-lg-mobile text-[#FF6B2C] font-bold">&lt; 3ms</p>
              <p className="font-code-sm text-[10px] text-on-surface-variant uppercase mt-1">Redirect Time</p>
            </div>
            <div className="p-md bg-[#151515] border border-border-subtle rounded-lg">
              <p className="font-display-lg-mobile text-[#FF6B2C] font-bold">100%</p>
              <p className="font-code-sm text-[10px] text-on-surface-variant uppercase mt-1">Open Source</p>
            </div>
            <div className="p-md bg-[#151515] border border-border-subtle rounded-lg">
              <p className="font-display-lg-mobile text-[#FF6B2C] font-bold">MySQL</p>
              <p className="font-code-sm text-[10px] text-on-surface-variant uppercase mt-1">Indexed Storage</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-surface-dim border-t border-border-subtle w-full py-xl px-lg flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto">
        <div className="flex items-center gap-2 mb-md md:mb-0">
          <span className="font-headline-sm text-headline-sm text-primary">LinkEngine</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant ml-4">
            © 2026 LinkEngine Inc. All rights reserved.
          </span>
        </div>
        <div className="flex gap-md font-body-sm text-body-sm">
          <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#privacy">Privacy Policy</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#terms">Terms of Service</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#api">API Docs</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}
