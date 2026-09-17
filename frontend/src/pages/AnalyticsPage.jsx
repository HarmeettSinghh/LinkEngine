import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import Layout from '../components/Layout';
import Toast from '../components/Toast';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';

export default function AnalyticsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialShortUrl = searchParams.get('shortUrl') || '';

  const [links, setLinks] = useState([]);
  const [selectedShortUrl, setSelectedShortUrl] = useState(initialShortUrl);
  const [period, setPeriod] = useState('7');
  const [analyticsData, setAnalyticsData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastDesc, setToastDesc] = useState('');
  const [toastType, setToastType] = useState('success');

  const formatLocalISO = (date) => {
    const pad = (num) => String(num).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  useEffect(() => {
    const loadLinks = async () => {
      try {
        const data = await api.getUserUrls();
        setLinks(data);
        if (data.length > 0 && !initialShortUrl && !selectedShortUrl) {
          setSelectedShortUrl(data[0].shortURl);
        }
      } catch (err) {
        console.error('Failed to load links for dropdown', err);
      }
    };
    loadLinks();
  }, []);

  useEffect(() => {
    const urlParam = searchParams.get('shortUrl');
    if (urlParam) setSelectedShortUrl(urlParam);
  }, [searchParams]);

  useEffect(() => {
    if (!selectedShortUrl) return;
    const loadAnalytics = async () => {
      setLoading(true);
      try {
        const end = new Date();
        const start = new Date();
        const days = parseInt(period, 10);
        start.setDate(start.getDate() - days);
        const data = await api.getUrlAnalytics(selectedShortUrl, formatLocalISO(start), formatLocalISO(end));
        setAnalyticsData(data || []);
      } catch (err) {
        console.error('Failed to load analytics', err);
        setToastType('error');
        setToastMessage('Analytics Load Failed');
        setToastDesc(err.message || 'Error occurred while fetching analytics');
        setShowToast(true);
        setAnalyticsData([]);
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, [selectedShortUrl, period]);

  const daysCount = parseInt(period, 10);

  const generateLabelsAndData = () => {
    const labels = [];
    const counts = [];
    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      let displayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
      if (daysCount > 7) displayLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      labels.push(displayLabel);
      const match = analyticsData.find((item) => {
        if (Array.isArray(item.clickDate)) {
          const [y, m, day] = item.clickDate;
          const pad = (n) => String(n).padStart(2, '0');
          return `${y}-${pad(m)}-${pad(day)}` === dateStr;
        }
        return item.clickDate === dateStr;
      });
      counts.push(match ? match.count : 0);
    }
    return { labels, counts };
  };

  const { labels: chartLabels, counts: chartDataPoints } = generateLabelsAndData();
  const totalClicksSelected = chartDataPoints.reduce((sum, val) => sum + val, 0);
  const selectedLinkDetails = links.find((l) => l.shortURl === selectedShortUrl);
  const selectedLinkTotalClicks = selectedLinkDetails ? selectedLinkDetails.clickCount : 0;
  const selectedLinkCreatedDate = selectedLinkDetails
    ? new Date(selectedLinkDetails.createdDate).toLocaleDateString()
    : '—';

  // Swiss Graph Styles — Signal Red & Ink
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Redirect Clicks',
        data: chartDataPoints,
        borderColor: '#e62b1e',
        backgroundColor: 'rgba(230, 43, 30, 0.06)',
        borderWidth: 2,
        pointBackgroundColor: '#16171d',
        pointBorderColor: '#e62b1e',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.1, // Snapped, geometric lines
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#16171d',
        titleColor: '#ffffff',
        bodyColor: '#dedfe5',
        borderColor: '#16171d',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 0,
        displayColors: false,
        titleFont: { family: 'Archivo', size: 12, weight: 'bold' },
        bodyFont: { family: 'Archivo', size: 12 },
      },
    },
    scales: {
      x: {
        grid: { color: '#dedfe5' },
        ticks: { color: '#737682', font: { family: 'Archivo', size: 10 } },
      },
      y: {
        grid: { color: '#dedfe5' },
        ticks: { color: '#737682', font: { family: 'Archivo', size: 10 }, precision: 0 },
      },
    },
    interaction: { intersect: false, mode: 'index' },
  };

  const totalLinksCount = links.length;
  const allLinksTotalClicks = links.reduce((sum, item) => sum + (item.clickCount || 0), 0);
  const avgClicksCount = totalLinksCount > 0 ? (allLinksTotalClicks / totalLinksCount).toFixed(1) : '0.0';

  return (
    <Layout>
      {/* ── Page Header: Hallmark Grid Lowercase Display ────────────────── */}
      <header className="mb-xl pb-md border-b border-rule flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
        <div>
          <div className="font-label-caps text-xs uppercase tracking-widest text-muted font-semibold mb-1">
            Telemetry // Time-Series Log
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-ink tracking-tight lowercase">
            analytics<span className="period" />
          </h1>
          {selectedShortUrl && (
            <p className="font-mono text-xs text-muted mt-1">
              TARGET ALIAS: <strong className="text-accent">{BASE_URL}/{selectedShortUrl}</strong>
            </p>
          )}
        </div>

        {/* Filter Controls: 0-radius hairlines */}
        <div className="flex flex-wrap items-center gap-xs w-full md:w-auto">
          {links.length > 0 && (
            <select
              value={selectedShortUrl}
              onChange={(e) => {
                setSelectedShortUrl(e.target.value);
                setSearchParams({ shortUrl: e.target.value });
              }}
              className="input-base text-xs font-mono px-md py-xs flex-grow md:flex-initial"
            >
              {links.map((link) => (
                <option key={link.id} value={link.shortURl}>{link.shortURl}</option>
              ))}
            </select>
          )}
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="input-base text-xs font-mono px-md py-xs"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="365">This Year</option>
          </select>
        </div>
      </header>

      {/* ── Metric Cells ────────────────────────────────────────────────── */}
      <section className="mb-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-rule">
          <div className="border-r border-b border-rule p-lg bg-paper">
            <div className="flex justify-between items-start mb-md">
              <span className="font-label-caps text-xs uppercase tracking-wider text-muted font-semibold">
                Selected Link Clicks
              </span>
              <span className="w-2 h-2 bg-accent inline-block" />
            </div>
            <p className="font-display text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
              {selectedShortUrl ? selectedLinkTotalClicks : 0}
            </p>
            <p className="text-[11px] text-muted font-label-caps uppercase tracking-wider mt-xs">
              Registered: {selectedLinkCreatedDate}
            </p>
          </div>

          <div className="border-r border-b border-rule p-lg bg-paper">
            <div className="flex justify-between items-start mb-md">
              <span className="font-label-caps text-xs uppercase tracking-wider text-muted font-semibold">
                Period Volume
              </span>
              <span className="material-symbols-outlined text-muted text-base">date_range</span>
            </div>
            <p className="font-display text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
              {totalClicksSelected}
            </p>
            <p className="text-[11px] text-muted font-label-caps uppercase tracking-wider mt-xs">
              Past {period} Days Window
            </p>
          </div>

          <div className="border-r border-b border-rule p-lg bg-paper">
            <div className="flex justify-between items-start mb-md">
              <span className="font-label-caps text-xs uppercase tracking-wider text-muted font-semibold">
                Account Average
              </span>
              <span className="material-symbols-outlined text-muted text-base">monitoring</span>
            </div>
            <p className="font-display text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
              {avgClicksCount}
            </p>
            <p className="text-[11px] text-muted font-label-caps uppercase tracking-wider mt-xs">
              Across {totalLinksCount} Links
            </p>
          </div>
        </div>
      </section>

      {/* ── Time-Series Chart Box ────────────────────────────────────────── */}
      <section className="mb-xl border border-rule bg-paper">
        <div className="p-md border-b border-rule flex justify-between items-center bg-paper-2">
          <h2 className="font-label-caps text-xs uppercase tracking-widest text-ink font-bold">
            02. Redirection Frequency Graph
          </h2>
          <span className="text-[10px] text-muted font-mono">SAMPLING: DAILY</span>
        </div>
        <div className="p-lg h-80 w-full relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-paper/90 text-muted font-mono text-xs">
              Streaming telemetry points...
            </div>
          ) : !selectedShortUrl ? (
            <div className="absolute inset-0 flex items-center justify-center text-muted font-mono text-xs">
              Select an active short URL to visualize data.
            </div>
          ) : (
            <Line data={chartData} options={chartOptions} />
          )}
        </div>
      </section>

      {/* ── Link Performance Table ──────────────────────────────────────── */}
      <section className="border border-rule bg-paper">
        <div className="p-md border-b border-rule bg-paper-2">
          <h2 className="font-label-caps text-xs uppercase tracking-widest text-ink font-bold">
            03. Registry Traffic Breakdown
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-rule text-muted font-label-caps text-[11px] uppercase tracking-wider">
                <th className="p-md font-semibold">Short Code</th>
                <th className="p-md font-semibold">Target Destination</th>
                <th className="p-md font-semibold text-right">Total Hits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {links.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-lg text-center text-muted font-body">
                    No links shortened yet.
                  </td>
                </tr>
              ) : (
                links.map((link) => (
                  <tr
                    key={link.id}
                    onClick={() => {
                      setSelectedShortUrl(link.shortURl);
                      setSearchParams({ shortUrl: link.shortURl });
                    }}
                    className={`hover:bg-paper-2 transition-colors cursor-pointer ${
                      selectedShortUrl === link.shortURl
                        ? 'bg-paper-2 border-l-2 border-accent'
                        : ''
                    }`}
                  >
                    <td className="p-md text-accent font-bold">
                      {link.shortURl}
                    </td>
                    <td className="p-md text-muted truncate max-w-sm" title={link.orignalUrl}>
                      {link.orignalUrl}
                    </td>
                    <td className="p-md text-right font-bold text-ink">
                      {link.clickCount || 0}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

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
