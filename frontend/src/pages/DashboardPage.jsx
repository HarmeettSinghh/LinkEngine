import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';
import { api } from '../services/api';
import Layout from '../components/Layout';
import Toast from '../components/Toast';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';

export default function DashboardPage() {
  const { user } = useContext(AuthContext);

  const [longUrl, setLongUrl] = useState('');
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shortening, setShortening] = useState(false);

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastDesc, setToastDesc] = useState('');
  const [toastType, setToastType] = useState('success');
  const [copiedLink, setCopiedLink] = useState('');

  const [lastShortened, setLastShortened] = useState(null);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const data = await api.getUserUrls();
      const sorted = [...data].sort((a, b) => {
        return new Date(b.createdDate || 0) - new Date(a.createdDate || 0);
      });
      setLinks(sorted);
    } catch (err) {
      console.error('Failed to load links', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleShortenSubmit = async (e) => {
    e.preventDefault();
    if (!longUrl) return;

    setShortening(true);
    setLastShortened(null);

    try {
      const newLink = await api.shortenUrl(longUrl);
      setLastShortened(newLink);
      setToastType('success');
      setToastMessage('Short link created!');
      setToastDesc(`Your short link: ${newLink.shortURl}`);
      setShowToast(true);
      setLongUrl('');
      fetchLinks();
    } catch (err) {
      setToastType('error');
      setToastMessage('Shortening Failed');
      setToastDesc(err.message || 'Error occurred while shortening URL');
      setShowToast(true);
    } finally {
      setShortening(false);
    }
  };

  // Copy — silent success via icon swap
  const handleCopyLink = (shortCode) => {
    const fullUrl = `${BASE_URL}/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(shortCode);
    setTimeout(() => setCopiedLink(''), 2000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  const totalLinks = links.length;
  const totalClicks = links.reduce((sum, item) => sum + (item.clickCount || 0), 0);
  const avgClicks = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : '0.0';
  const recentLinks = links.slice(0, 5);

  return (
    <Layout>
      {/* ── Page Header: Hallmark Grid Lowercase Display ────────────────── */}
      <header className="mb-xl pb-md border-b border-rule flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
        <div>
          <div className="flex items-center gap-xs font-label-caps text-xs uppercase tracking-widest text-muted font-semibold mb-1">
            <span className="w-2 h-2 bg-accent inline-block" />
            <span>Welcome, {user?.username || user?.sub || 'there'}</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-ink tracking-tight lowercase">
            dashboard<span className="period" />
          </h1>
        </div>
        <div className="font-mono text-xs text-muted">
          {/* intentionally blank */}
        </div>
      </header>

      {/* ── Shorten URL Workbench Cell ─────────────────────────────────── */}
      <section className="mb-xl border border-rule bg-paper p-lg">
        <div className="flex justify-between items-center pb-sm border-b border-rule mb-md">
          <h2 className="font-label-caps text-xs uppercase tracking-widest text-ink font-bold">
            Create a short link
          </h2>
          <span className="text-[10px] text-muted font-mono"></span>
        </div>

        <form onSubmit={handleShortenSubmit} className="flex flex-col md:flex-row gap-sm">
          <div className="flex-1 relative">
            <input
              id="url-input"
              type="url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://domain.com/very/long/target/path"
              className="input-base w-full px-md py-sm text-sm font-mono text-ink placeholder:text-muted/60"
              required
            />
          </div>
          <button
            type="submit"
            disabled={shortening}
            className="btn-primary py-sm px-xl text-xs uppercase tracking-wider font-semibold whitespace-nowrap flex items-center justify-center gap-xs"
          >
            <span className="material-symbols-outlined text-[16px]">
              {shortening ? 'hourglass_empty' : 'add_link'}
            </span>
            {shortening ? 'Processing...' : 'Shorten Link'}
          </button>
        </form>

        {/* Shortened URL Output Banner */}
        {lastShortened && (
          <div className="mt-md p-md bg-paper-2 border border-ink flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
            <div className="min-w-0 flex-1">
              <span className="font-label-caps text-[10px] text-accent uppercase tracking-wider font-bold block mb-0.5">
                Short link created!
              </span>
              <span className="font-mono text-sm md:text-base font-bold text-ink truncate block">
                {BASE_URL}/{lastShortened.shortURl}
              </span>
              <span className="font-mono text-xs text-muted truncate block mt-0.5">
                Original URL: {lastShortened.orignalUrl}
              </span>
            </div>
            <div className="flex items-center gap-xs w-full md:w-auto">
              <button
                onClick={() => handleCopyLink(lastShortened.shortURl)}
                className="btn-primary px-md py-xs text-xs font-semibold uppercase tracking-wider flex-1 md:flex-initial flex items-center justify-center gap-xs"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copiedLink === lastShortened.shortURl ? 'check' : 'content_copy'}
                </span>
                {copiedLink === lastShortened.shortURl ? 'Copied' : 'Copy'}
              </button>
              <a
                href={`${BASE_URL}/${lastShortened.shortURl}`}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary px-md py-xs text-xs font-semibold uppercase tracking-wider flex-1 md:flex-initial text-center"
              >
                Open link
              </a>
            </div>
          </div>
        )}
      </section>

      {/* ── Ruled Metric Cells: High-Contrast Swiss Architecture ───────── */}
      <section className="mb-xl">
        <div className="font-label-caps text-xs uppercase tracking-widest text-muted font-semibold mb-sm">
          Overview
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-rule">
          
          {/* Primary Metric: Total Clicks */}
          <div className="border-r border-b border-rule p-lg bg-paper flex flex-col justify-between">
            <div className="flex justify-between items-start mb-md">
              <span className="font-label-caps text-xs uppercase tracking-wider text-muted font-semibold">
                Total Redirections
              </span>
              <span className="w-2 h-2 bg-accent inline-block" />
            </div>
            <div>
              <p className="font-display text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
                {totalClicks}
              </p>
              <p className="text-[11px] text-muted font-label-caps uppercase tracking-wider mt-xs">
                Total clicks
              </p>
            </div>
          </div>

          {/* Metric 2: Total Links */}
          <div className="border-r border-b border-rule p-lg bg-paper flex flex-col justify-between">
            <div className="flex justify-between items-start mb-md">
              <span className="font-label-caps text-xs uppercase tracking-wider text-muted font-semibold">
                Total Short Links
              </span>
              <span className="material-symbols-outlined text-muted text-base">link</span>
            </div>
            <div>
              <p className="font-display text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
                {totalLinks}
              </p>
              <p className="text-[11px] text-muted font-label-caps uppercase tracking-wider mt-xs">
                Links created
              </p>
            </div>
          </div>

          {/* Metric 3: Avg Clicks */}
          <div className="border-r border-b border-rule p-lg bg-paper flex flex-col justify-between">
            <div className="flex justify-between items-start mb-md">
              <span className="font-label-caps text-xs uppercase tracking-wider text-muted font-semibold">
                Mean Clicks / Link
              </span>
              <span className="material-symbols-outlined text-muted text-base">monitoring</span>
            </div>
            <div>
              <p className="font-display text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
                {avgClicks}
              </p>
              <p className="text-[11px] text-muted font-label-caps uppercase tracking-wider mt-xs">
                Avg. clicks per link
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Recent Links Table: Swiss Directory Format ──────────────────── */}
      <section className="border border-rule bg-paper">
        <div className="p-md border-b border-rule flex justify-between items-center bg-paper-2">
          <div className="flex items-center gap-xs">
            <span className="font-label-caps text-xs uppercase tracking-widest text-ink font-bold">
              Recent Links
            </span>
          </div>
          <Link
            to="/my-links"
            className="font-label-caps text-xs uppercase tracking-wider text-accent font-semibold flex items-center gap-xs hover:underline"
          >
            Full Archive <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-rule bg-paper text-muted font-label-caps text-[11px] uppercase tracking-wider">
                <th className="p-md font-semibold">Short Link</th>
                <th className="p-md font-semibold">Original URL</th>
                <th className="p-md font-semibold">Created</th>
                <th className="p-md font-semibold text-right">Clicks</th>
                <th className="p-md font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-lg text-center text-muted font-body">
                    Loading your links...
                  </td>
                </tr>
              ) : recentLinks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-lg text-center text-muted font-body">
                    You haven't created any links yet. Create your first one above.
                  </td>
                </tr>
              ) : (
                recentLinks.map((link) => (
                  <tr key={link.id} className="hover:bg-paper-2 transition-colors">
                    <td className="p-md font-bold text-ink">
                      <a
                        href={`${BASE_URL}/${link.shortURl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent hover:underline flex items-center gap-xs"
                      >
                        {link.shortURl}
                        <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                      </a>
                    </td>
                    <td className="p-md text-muted max-w-xs truncate" title={link.orignalUrl}>
                      {link.orignalUrl}
                    </td>
                    <td className="p-md text-muted">
                      {formatDate(link.createdDate)}
                    </td>
                    <td className="p-md text-right font-bold text-ink">
                      {link.clickCount || 0}
                    </td>
                    <td className="p-md text-center">
                      <div className="flex justify-center items-center gap-xs">
                        <button
                          onClick={() => handleCopyLink(link.shortURl)}
                          className="p-xs text-muted hover:text-accent transition-colors"
                          title={copiedLink === link.shortURl ? 'Copied' : 'Copy'}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {copiedLink === link.shortURl ? 'check' : 'content_copy'}
                          </span>
                        </button>
                        <Link
                          to={`/analytics?shortUrl=${link.shortURl}`}
                          className="p-xs text-muted hover:text-accent transition-colors"
                          title="View Analytics"
                        >
                          <span className="material-symbols-outlined text-[16px]">monitoring</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Notification Toast */}
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
