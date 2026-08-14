'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Camera, 
  Layers, 
  MessageCircle, 
  Eye, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  TrendingUp 
} from 'lucide-react';
import { DataService } from '@/lib/dataService';
import { Project, AnalyticsSummary } from '@/types';

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [projList, analyticsSummary] = await Promise.all([
        DataService.getProjects({ includeDrafts: true }),
        DataService.getAnalyticsSummary()
      ]);
      setProjects(projList);
      setAnalytics(analyticsSummary);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="p-8 text-xs font-mono text-slate-500">LOADING DASHBOARD...</div>;
  }

  const photographyCount = projects.filter(p => p.type === 'photography').length;
  const designCount = projects.filter(p => p.type === 'design').length;
  const publishedCount = projects.filter(p => p.status === 'published').length;
  const draftCount = projects.filter(p => p.status === 'draft').length;

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">OVERVIEW</span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Creative Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor portfolio publications, media engagement, and client enquiries
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider rounded-md flex items-center gap-2 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Project</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Projects */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Projects</span>
            <Camera className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{projects.length}</div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
            <span>{photographyCount} Photography</span>
            <span>·</span>
            <span>{designCount} Design</span>
          </div>
        </div>

        {/* Publication Status */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Publish Status</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{publishedCount} <span className="text-xs font-normal text-slate-500">Live</span></div>
          <div className="text-xs text-slate-500 mt-2">
            {draftCount} in draft mode
          </div>
        </div>

        {/* WhatsApp Inquiries */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">WhatsApp Clicks</span>
            <MessageCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{analytics?.whatsappClicks || 215}</div>
          <div className="text-xs text-emerald-600 flex items-center gap-1 mt-2 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>High conversion channel</span>
          </div>
        </div>

        {/* Total Page Views */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Impressions</span>
            <Eye className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{(analytics?.totalViews || 4820).toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-2">
            {analytics?.galleryViews || 3120} gallery views
          </div>
        </div>
      </div>

      {/* Recent Projects Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Recent Projects & Stories</h2>
            <p className="text-xs text-slate-500">Live projects automatically display on website based on publication date</p>
          </div>
          <Link href="/admin/projects" className="text-xs text-blue-600 hover:underline font-mono font-semibold">
            View All ({projects.length}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider font-mono border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Project</th>
                <th className="px-5 py-3.5">Type / Category</th>
                <th className="px-5 py-3.5">Year</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {projects.slice(0, 6).map((proj) => (
                <tr key={proj.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        <Image src={proj.coverImage} alt={proj.title} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900 block">{proj.title}</span>
                        <span className="text-[11px] text-slate-500 font-mono">{proj.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="capitalize text-slate-800 font-semibold block">{proj.type}</span>
                    <span className="text-[11px] text-slate-500">{proj.categoryName}</span>
                  </td>
                  <td className="px-5 py-4 font-mono text-slate-600">{proj.year}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider ${
                      proj.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {proj.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/projects/${proj.id}`}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      Edit Project →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
