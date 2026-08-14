'use client';

import { useEffect, useState } from 'react';
import { Save, Check, Globe, MessageCircle, Mail } from 'lucide-react';
import { InstagramIcon } from '@/components/common/Icons';
import { DataService } from '@/lib/dataService';
import { SiteSettings } from '@/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await DataService.getSiteSettings();
      setSettings(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    await DataService.saveSiteSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (loading || !settings) {
    return <div className="p-8 text-xs font-mono text-slate-500">LOADING SETTINGS...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">CONFIGURATION</span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Site & Brand Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage contact placeholders, founder bio, location reach, and global SEO metadata
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider rounded-md flex items-center gap-2 transition-colors self-start shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-700 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Site settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Brand & Founder Profile */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-xs">
          <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
            Brand Identity & Philosophy
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Brand Name</label>
              <input
                type="text"
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-2 text-xs text-slate-900 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Brand Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-2 text-xs text-slate-900 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Founder Name</label>
              <input
                type="text"
                value={settings.founderName}
                onChange={(e) => setSettings({ ...settings, founderName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-2 text-xs text-slate-900 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Founder Title</label>
              <input
                type="text"
                value={settings.founderTitle}
                onChange={(e) => setSettings({ ...settings, founderTitle: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-2 text-xs text-slate-900 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Short Philosophy / Motto</label>
            <input
              type="text"
              value={settings.founderBioShort}
              onChange={(e) => setSettings({ ...settings, founderBioShort: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-2 text-xs text-slate-900 outline-none"
            />
          </div>
        </div>

        {/* Contact Channels */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-xs">
          <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
            Contact & Social Channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Number (International format without +)</span>
              </label>
              <input
                type="text"
                value={settings.contact.whatsappNumber}
                onChange={(e) => setSettings({
                  ...settings,
                  contact: { ...settings.contact, whatsappNumber: e.target.value }
                })}
                placeholder="94770000000"
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-2 text-xs text-slate-900 font-mono outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <InstagramIcon className="w-3.5 h-3.5 text-blue-600" />
                <span>Instagram Profile URL</span>
              </label>
              <input
                type="text"
                value={settings.contact.instagramUrl}
                onChange={(e) => setSettings({
                  ...settings,
                  contact: { ...settings.contact, instagramUrl: e.target.value }
                })}
                placeholder="https://instagram.com/..."
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-2 text-xs text-slate-900 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>Public Email Address</span>
              </label>
              <input
                type="email"
                value={settings.contact.email}
                onChange={(e) => setSettings({
                  ...settings,
                  contact: { ...settings.contact, email: e.target.value }
                })}
                placeholder="contact@latestphotography.lk"
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-2 text-xs text-slate-900 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Location Primary</label>
              <input
                type="text"
                value={settings.locationPrimary}
                onChange={(e) => setSettings({ ...settings, locationPrimary: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-2 text-xs text-slate-900 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Global SEO Settings */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-xs">
          <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
            SEO & Social Previews (Requirement 38)
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Global Meta Title</label>
            <input
              type="text"
              value={settings.seo.metaTitle}
              onChange={(e) => setSettings({
                ...settings,
                seo: { ...settings.seo, metaTitle: e.target.value }
              })}
              className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-2 text-xs text-slate-900 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Global Meta Description</label>
            <textarea
              rows={3}
              value={settings.seo.metaDescription}
              onChange={(e) => setSettings({
                ...settings,
                seo: { ...settings.seo, metaDescription: e.target.value }
              })}
              className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-2 text-xs text-slate-900 outline-none"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
