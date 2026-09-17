import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import Layout from '../components/Layout';
import Toast from '../components/Toast';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';

export default function MyLinksPage() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastDesc, setToastDesc] = useState('');
  const [toastType, setToastType] = useState('success');
  const [copiedLink, setCopiedLink] = useState('');

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
      setToastType('error');
      setToastMessage('Failed to load links');
      setToastDesc(err.message || 'Please refresh and try again.');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

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

  const filteredLinks = links.filter((link) => {
    const query = searchQuery.toLowerCase();
    return (
      (link.orignalUrl && link.orignalUrl.toLowerCase().includes(query)) ||
      (link.shortURl && link.shortURl.toLowerCase().includes(query))
    );
  });

  const totalItems = filteredLinks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLinks.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

  const totalClicks = links.reduce((sum, item) => sum + (item.clickCount || 0), 0);

  return (
    <Layout>
      {/* ── Page Header: Hallmark Grid Lowercase Display ────────────────── */}
      <header className="mb-xl pb-md border-b border-rule flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
        <div>
          <div className="font-label-caps text-xs uppercase tracking-widest text-muted font-semibold mb-1">
            My Links
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-ink tracking-tight lowercase">
            my links<span className="period" />
          </h1>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-72">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="input-base w-full px-md py-xs text-xs font-mono text-ink placeholder:text-muted/60"
              placeholder="Filter by alias or URL..."
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-sm pointer-events-none text-muted">
              <span className="material-symbols-outlined text-[16px]">search</span>
            </span>
          </div>
        </div>
      </header>

      {/* ── Ruled Metric Summary ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-rule mb-xl">
        <div className="border-r border-b border-rule p-lg bg-paper">
          <div className="flex justify-between items-start mb-md">
            <span className="font-label-caps text-xs uppercase tracking-wider text-muted font-semibold">
              Total Clicks
            </span>
            <span className="w-2 h-2 bg-accent inline-block" />
          </div>
          <p className="font-display text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
            {totalClicks}
          </p>
          <p className="text-[11px] text-muted font-label-caps uppercase tracking-wider mt-xs">
            All time
          </p>
        </div>

        <div className="border-r border-b border-rule p-lg bg-paper">
          <div className="flex justify-between items-start mb-md">
            <span className="font-label-caps text-xs uppercase tracking-wider text-muted font-semibold">
              Total Links
            </span>
            <span className="material-symbols-outlined text-muted text-base">link</span>
          </div>
          <p className="font-display text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
            {links.length}
          </p>
          <p className="text-[11px] text-muted font-label-caps uppercase tracking-wider mt-xs">
            Links created
          </p>
        </div>
      </div>

      {/* ── Swiss Directory Table ───────────────────────────────────────── */}
      <div className="border border-rule bg-paper">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-rule bg-paper-2 text-muted font-label-caps text-[11px] uppercase tracking-wider">
                <th className="py-sm px-md font-semibold w-1/4">Short Link</th>
                <th className="py-sm px-md font-semibold w-5/12">Original URL</th>
                <th className="py-sm px-md font-semibold text-right w-1/12">Clicks</th>
                <th className="py-sm px-md font-semibold w-1/6">Created</th>
                <th className="py-sm px-md font-semibold text-center w-1/12">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-xl text-center text-muted font-body">
                    Loading your links...
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-xl text-center text-muted font-body">
                    No links match the search query.
                  </td>
                </tr>
              ) : (
                currentItems.map((link) => (
                  <tr key={link.id} className="hover:bg-paper-2 transition-colors">
                    <td className="py-sm px-md">
                      <a
                        href={`${BASE_URL}/${link.shortURl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent font-bold hover:underline flex items-center gap-xs"
                      >
                        {link.shortURl}
                        <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                      </a>
                    </td>
                    <td className="py-sm px-md text-muted truncate max-w-sm" title={link.orignalUrl}>
                      {link.orignalUrl}
                    </td>
                    <td className="py-sm px-md text-right font-bold text-ink">
                      {link.clickCount || 0}
                    </td>
                    <td className="py-sm px-md text-muted">
                      {formatDate(link.createdDate)}
                    </td>
                    <td className="py-sm px-md text-center">
                      <div className="flex items-center justify-center gap-xs">
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

        {/* Mobile Ruled Cards */}
        <div className="block md:hidden divide-y divide-rule">
          {loading ? (
            <div className="p-lg text-center text-muted font-body">Loading links...</div>
          ) : currentItems.length === 0 ? (
            <div className="p-lg text-center text-muted font-body">No matching links found.</div>
          ) : (
            currentItems.map((link) => (
              <div key={link.id} className="p-md space-y-xs font-mono text-xs">
                <div className="flex justify-between items-center">
                  <a
                    href={`${BASE_URL}/${link.shortURl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent font-bold hover:underline text-sm"
                  >
                    {link.shortURl}
                  </a>
                  <span className="text-muted font-semibold">{link.clickCount || 0} clicks</span>
                </div>
                <div className="text-muted truncate text-[11px]">
                  {link.orignalUrl}
                </div>
                <div className="flex justify-between items-center pt-xs text-muted text-[10px]">
                  <span>{formatDate(link.createdDate)}</span>
                  <div className="flex items-center gap-xs">
                    <button
                      onClick={() => handleCopyLink(link.shortURl)}
                      className="p-xs text-muted hover:text-accent"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {copiedLink === link.shortURl ? 'check' : 'content_copy'}
                      </span>
                    </button>
                    <Link
                      to={`/analytics?shortUrl=${link.shortURl}`}
                      className="p-xs text-muted hover:text-accent"
                    >
                      <span className="material-symbols-outlined text-[16px]">monitoring</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Swiss Pagination Bar ────────────────────────────────────────── */}
        <div className="p-sm border-t border-rule flex justify-between items-center bg-paper-2 font-mono text-xs text-muted">
          <span>
            {totalItems > 0 ? indexOfFirstItem + 1 : 0}–{Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
          </span>
          <div className="flex items-center gap-xs">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="btn-secondary px-sm py-xs text-xs disabled:opacity-40"
            >
              Previous
            </button>
            <span className="px-xs text-ink font-bold">Page {currentPage} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="btn-secondary px-sm py-xs text-xs disabled:opacity-40"
            >
              Next
            </button>
          </div>
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
