'use client';

import { useEffect, useState } from 'react';
import { BarChart3, MessageCircle, Eye, TrendingUp, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from '@/components/common/Icons';
import { DataService } from '@/lib/dataService';
import { AnalyticsSummary } from '@/types';

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const summary = await DataService.getAnalyticsSummary();
      setAnalytics(summary);
      setLoading(false);
    }
    load();
  }, []);

  if (loading || !analytics) {
    return <div className="p-8 text-xs font-mono text-slate-500">LOADING ANALYTICS...</div>;
  }

  const maxServiceCount = Math.max(...Object.values(analytics.serviceInterest), 1);

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">PERFORMANCE METRICS</span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Privacy-Conscious Analytics</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Zero third-party tracking cookies. Measures portfolio engagement and WhatsApp client conversions (Requirement 37).
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-700 font-mono font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>GDPR / Privacy Compliant</span>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase font-semibold">Total Views</span>
            <Eye className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{analytics.totalViews.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">Portfolio visits</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase font-semibold">Gallery Views</span>
            <BarChart3 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{analytics.galleryViews.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">Lightbox image opens</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase font-semibold">WhatsApp Inquiries</span>
            <MessageCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">{analytics.whatsappClicks}</div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">Direct client bookings</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase font-semibold">Instagram Reach</span>
            <InstagramIcon className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{analytics.instagramClicks}</div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">Outbound social clicks</p>
        </div>
      </div>

      {/* Grid: Service Interest & Project Traffic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Service Inquiry Demand */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-lg p-6 space-y-6 shadow-xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Service Interest Breakdown</h2>
            <p className="text-xs text-slate-500 mt-0.5">Top photography disciplines and design requests initiated</p>
          </div>

          <div className="space-y-4">
            {Object.entries(analytics.serviceInterest).map(([service, count]) => {
              const percentage = Math.round((count / maxServiceCount) * 100);
              return (
                <div key={service} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="capitalize text-slate-800 font-semibold">{service.replace('-', ' ')}</span>
                    <span className="font-mono text-blue-600 font-semibold">{count} enquiries</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Viewed Stories */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-lg p-6 space-y-6 shadow-xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Most Viewed Visual Stories</h2>
            <p className="text-xs text-slate-500 mt-0.5">Projects generating highest engagement</p>
          </div>

          <div className="space-y-3 divide-y divide-slate-100">
            {Object.entries(analytics.projectViews).map(([slug, views], idx) => (
              <div key={slug} className="pt-3 first:pt-0 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400 font-semibold">0{idx + 1}</span>
                  <span className="text-xs font-semibold text-slate-800 capitalize">
                    {slug.replace(/-/g, ' ')}
                  </span>
                </div>
                <span className="text-xs font-mono font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {views} views
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
