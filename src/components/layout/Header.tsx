import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';

export default function Header() {
  const { t } = useTranslation();
  const { settings, updateSettings } = useApp();
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header className="app-header">
      <Link to="/" className="logo">
        <img src="/logo.jpg" alt="RATATV" className="logo-img" />
        <span className="logo-text">RATATV</span>
      </Link>
      <form className="header-search" onSubmit={submit}>
        <input
          type="search"
          placeholder={t('search.placeholder')}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </form>
      <div className="header-actions">
        <select
          value={settings.uiLanguage}
          onChange={(e) => updateSettings({ uiLanguage: e.target.value as 'ar' | 'en' | 'fr' })}
          className="lang-select"
        >
          <option value="ar">العربية</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
        <Link to="/settings" className="icon-btn" aria-label={t('nav.settings')}>
          ⚙
        </Link>
      </div>
    </header>
  );
}
