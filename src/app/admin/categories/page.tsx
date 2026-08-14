'use client';

import { useEffect, useState } from 'react';
import { Plus, Layers, Check } from 'lucide-react';
import { DataService } from '@/lib/dataService';
import { Category, ProjectType } from '@/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [type, setType] = useState<ProjectType>('photography');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);

  const loadCategories = async () => {
    const list = await DataService.getCategories();
    setCategories(list);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleNameChange = (val: string) => {
    setName(val);
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setSlug(generatedSlug);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name,
      slug,
      type,
      description
    };

    await DataService.saveCategory(newCategory);
    await loadCategories();

    setName('');
    setSlug('');
    setDescription('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">TAXONOMY</span>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Category Architecture</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Dynamic category manager (Requirement 31: Add future categories like Wedding, Corporate, Product, Fashion, or Branding without code changes).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create Category Form */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-xs">
          <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">Add New Category</h2>

          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-700 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Category added successfully!</span>
            </div>
          )}

          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category Name</label>
              <input
                type="text"
                placeholder="e.g. Wedding Photography"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3.5 py-2 text-xs text-slate-900 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">URL Slug</label>
              <input
                type="text"
                placeholder="e.g. wedding-photography"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3.5 py-2 text-xs font-mono text-slate-800 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Discipline Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ProjectType)}
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-2 text-xs text-slate-900 outline-none"
              >
                <option value="photography">Photography Discipline</option>
                <option value="design">Visual Design Discipline</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description</label>
              <textarea
                rows={2}
                placeholder="Brief summary of this category..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3.5 py-2 text-xs text-slate-900 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider rounded-md flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create Category</span>
            </button>
          </form>
        </div>

        {/* Existing Categories Table */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Configured Categories ({categories.length})
            </h2>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider font-mono border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Discipline</th>
                <th className="px-4 py-3">Slug</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-semibold text-slate-900">{cat.name}</td>
                  <td className="px-4 py-3 capitalize text-slate-600">{cat.type}</td>
                  <td className="px-4 py-3 font-mono text-slate-400">/{cat.slug}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
