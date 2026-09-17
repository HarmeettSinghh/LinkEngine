import React, { useEffect } from 'react';

export default function Toast({ show, message, description, type = 'success', onClose }) {
  useEffect(() => {
    if (show && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed bottom-lg right-lg bg-paper border border-ink p-md flex items-center gap-md z-50 min-w-[300px] max-w-[420px]">
      <div
        className={`w-6 h-6 flex items-center justify-center border ${
          isSuccess
            ? 'bg-paper-2 border-ink text-accent'
            : 'bg-accent text-paper border-accent'
        }`}
      >
        <span className="material-symbols-outlined text-[16px]">
          {isSuccess ? 'check' : 'priority_high'}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm text-ink leading-tight">{message}</p>
        {description && (
          <p className="text-xs text-muted font-mono truncate mt-0.5">{description}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="text-muted hover:text-ink p-xs transition-colors flex items-center"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
}
