'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Trash2, Edit3, ExternalLink, Search } from 'lucide-react';
import { DataService } from '@/lib/dataService';
import { Project } from '@/types';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    const list = await DataService.getProjects({ includeDrafts: true });
    setProjects(list);
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the project "${title}"? This cannot be undone.`)) {
      await DataService.deleteProject(id);
      loadProjects();
    }
  };

  const filtered = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || p.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">PROJECT MANAGEMENT</span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Portfolio Projects</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, edit, draft, and publish photography stories and design identities
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider rounded-md flex items-center gap-2 transition-colors self-start shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-100 rounded-md pl-9 pr-4 py-2 text-xs text-slate-900 outline-none shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              typeFilter === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            All Types ({projects.length})
          </button>
          <button
            onClick={() => setTypeFilter('photography')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              typeFilter === 'photography' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Photography
          </button>
          <button
            onClick={() => setTypeFilter('design')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              typeFilter === 'design' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Design
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider font-mono border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Project Title</th>
                <th className="px-5 py-3.5">Type / Category</th>
                <th className="px-5 py-3.5">Images</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Published Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((proj) => (
                <tr key={proj.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        <Image src={proj.coverImage} alt={proj.title} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900 block">{proj.title}</span>
                        <span className="text-[11px] text-slate-500 font-mono">/{proj.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="capitalize text-slate-800 font-semibold block">{proj.type}</span>
                    <span className="text-[11px] text-slate-500">{proj.categoryName}</span>
                  </td>
                  <td className="px-5 py-4 font-mono text-slate-600 font-medium">
                    {proj.images?.length || 1} images
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider ${
                      proj.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {proj.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500 font-mono">
                    {new Date(proj.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {/* Preview link */}
                      <Link
                        href={proj.type === 'photography' ? `/work/photography/story/${proj.slug}` : `/work/design/story/${proj.slug}`}
                        target="_blank"
                        className="text-slate-400 hover:text-blue-600 p-1"
                        title="Preview live on website"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      {/* Edit */}
                      <Link
                        href={`/admin/projects/${proj.id}`}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit project"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(proj.id, proj.title)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs">
            No matching projects found.
          </div>
        )}
      </div>
    </div>
  );
}
