'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Save, Eye, Trash2, Plus, Check } from 'lucide-react';
import { DataService } from '@/lib/dataService';
import { Project, Category, ProjectType } from '@/types';
import { sampleImages } from '@/config/sampleImages';

export default function ProjectEditorPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const isNew = resolvedParams.id === 'new';

  const [project, setProject] = useState<Partial<Project>>({
    id: isNew ? `proj-${Date.now()}` : resolvedParams.id,
    title: '',
    slug: '',
    subtitle: '',
    type: 'photography',
    category: 'graduation',
    categoryName: 'Graduation',
    year: '2026',
    location: 'Jaffna, Sri Lanka',
    description: '',
    coverImage: sampleImages.photography.graduation[0],
    images: [],
    featured: false,
    status: 'draft',
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');

  useEffect(() => {
    async function load() {
      const allCategories = await DataService.getCategories();
      setCategories(allCategories);

      if (!isNew) {
        const projects = await DataService.getProjects({ includeDrafts: true });
        const existing = projects.find(p => p.id === resolvedParams.id);
        if (existing) {
          setProject(existing);
        }
      }
      setLoading(false);
    }
    load();
  }, [resolvedParams.id, isNew]);

  const handleTitleChange = (title: string) => {
    setProject(prev => {
      const generatedSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return {
        ...prev,
        title,
        slug: prev.slug || generatedSlug
      };
    });
  };

  const handleTypeChange = (type: ProjectType) => {
    const defaultCat = type === 'photography' ? 'graduation' : 'logo';
    const catObj = categories.find(c => c.slug === defaultCat);
    setProject(prev => ({
      ...prev,
      type,
      category: defaultCat,
      categoryName: catObj?.name || defaultCat
    }));
  };

  const handleCategoryChange = (catSlug: string) => {
    const catObj = categories.find(c => c.slug === catSlug);
    setProject(prev => ({
      ...prev,
      category: catSlug,
      categoryName: catObj?.name || catSlug
    }));
  };

  const handleAddImage = () => {
    if (!newImageUrl) return;
    const newImg = {
      id: `img-${Date.now()}`,
      projectId: project.id || 'new',
      url: newImageUrl,
      altText: newImageAlt || project.title || 'Portfolio Image',
      sortOrder: project.images?.length || 0
    };
    setProject(prev => ({
      ...prev,
      images: [...(prev.images || []), newImg]
    }));
    setNewImageUrl('');
    setNewImageAlt('');
  };

  const handleRemoveImage = (imgId: string) => {
    setProject(prev => ({
      ...prev,
      images: (prev.images || []).filter(i => i.id !== imgId)
    }));
  };

  const handleSave = async (publishStatus?: 'draft' | 'published') => {
    setSaving(true);
    setSavedSuccess(false);

    const statusToSave = publishStatus || project.status || 'draft';
    const projectToSave: Project = {
      id: project.id || `proj-${Date.now()}`,
      title: project.title || 'Untitled Project',
      slug: project.slug || `project-${Date.now()}`,
      subtitle: project.subtitle || '',
      type: project.type || 'photography',
      category: project.category || 'graduation',
      categoryName: project.categoryName || 'Graduation',
      year: project.year || '2026',
      location: project.location || 'Jaffna',
      description: project.description || '',
      coverImage: project.coverImage || sampleImages.hero,
      images: project.images || [],
      featured: Boolean(project.featured),
      status: statusToSave,
      publishedAt: statusToSave === 'published' && project.status !== 'published' ? new Date().toISOString() : (project.publishedAt || new Date().toISOString()),
      createdAt: project.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      designStages: project.designStages,
      posterFormats: project.posterFormats
    };

    await DataService.saveProject(projectToSave);
    setProject(projectToSave);
    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);

    if (isNew) {
      router.push(`/admin/projects/${projectToSave.id}`);
    }
  };

  if (loading) {
    return <div className="p-8 text-xs font-mono text-slate-500">LOADING PROJECT EDITOR...</div>;
  }

  const previewUrl = project.type === 'photography'
    ? `/work/photography/story/${project.slug}`
    : `/work/design/story/${project.slug}`;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
              {isNew ? 'CREATE NEW PROJECT' : 'EDIT PROJECT'}
            </span>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {project.title || 'Untitled Project'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {project.slug && (
            <Link
              href={previewUrl}
              target="_blank"
              className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 hover:text-blue-600 text-xs uppercase tracking-wider font-semibold rounded-md flex items-center gap-2 transition-colors shadow-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs uppercase tracking-wider font-semibold rounded-md transition-colors shadow-xs"
          >
            Save Draft
          </button>

          <button
            type="button"
            onClick={() => handleSave('published')}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider rounded-md flex items-center gap-2 transition-colors shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Publish Live'}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-700 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Project saved successfully! (Status: {project.status})</span>
        </div>
      )}

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title & Subtitle */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-xs">
            <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">Core Information</h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Moratuwa Convocation 2026"
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3.5 py-2 text-sm text-slate-900 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={project.slug}
                  onChange={(e) => setProject(p => ({ ...p, slug: e.target.value }))}
                  placeholder="e.g. moratuwa-convocation"
                  className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3.5 py-2 text-xs font-mono text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subtitle / Sub-statement</label>
                <input
                  type="text"
                  value={project.subtitle}
                  onChange={(e) => setProject(p => ({ ...p, subtitle: e.target.value }))}
                  placeholder="e.g. University of Moratuwa · 2026"
                  className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3.5 py-2 text-xs text-slate-900 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description / Story Narrative</label>
              <textarea
                rows={3}
                value={project.description}
                onChange={(e) => setProject(p => ({ ...p, description: e.target.value }))}
                placeholder="Editorial story context or case study summary..."
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3.5 py-2 text-xs text-slate-900 outline-none"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-xs">
            <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">Cover Image</h2>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Image URL (Unsplash or Supabase Storage)</label>
              <input
                type="text"
                value={project.coverImage}
                onChange={(e) => setProject(p => ({ ...p, coverImage: e.target.value }))}
                placeholder="https://..."
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3.5 py-2 text-xs text-slate-900 outline-none"
              />
            </div>
            {project.coverImage && (
              <div className="relative aspect-[16/9] w-full max-w-md rounded-md bg-slate-100 overflow-hidden border border-slate-200 shadow-xs">
                <Image src={project.coverImage} alt="Cover Preview" fill className="object-cover" />
              </div>
            )}
          </div>

          {/* Gallery Images */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-xs">
            <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
              Gallery Story Images ({project.images?.length || 0})
            </h2>

            {/* Add Image Box */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-3">
              <span className="text-xs font-bold text-slate-800 block">Add Image to Story</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Image URL (Unsplash/Storage)..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="bg-white border border-slate-300 focus:border-blue-600 rounded-md px-3 py-1.5 text-xs text-slate-900 outline-none"
                />
                <input
                  type="text"
                  placeholder="Alt text / Caption..."
                  value={newImageAlt}
                  onChange={(e) => setNewImageAlt(e.target.value)}
                  className="bg-white border border-slate-300 focus:border-blue-600 rounded-md px-3 py-1.5 text-xs text-slate-900 outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleAddImage}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-md text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-blue-400" />
                <span>Append Image</span>
              </button>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              {project.images?.map((img, idx) => (
                <div key={img.id} className="relative group aspect-square rounded-md bg-slate-100 overflow-hidden border border-slate-200 shadow-xs">
                  <Image src={img.url} alt={img.altText || `Image ${idx}`} fill className="object-cover" />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(img.id)}
                      className="p-1.5 bg-red-600 hover:bg-red-700 rounded-md text-white shadow-sm"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="absolute bottom-1 left-1 bg-white/90 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold text-slate-800 shadow-xs">
                    #{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Classification */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-xs">
            <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">Classification</h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Discipline Type</label>
              <select
                value={project.type}
                onChange={(e) => handleTypeChange(e.target.value as ProjectType)}
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-2 text-xs text-slate-900 outline-none"
              >
                <option value="photography">Photography</option>
                <option value="design">Visual Design</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={project.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-2 text-xs text-slate-900 outline-none"
              >
                {categories.filter(c => c.type === project.type).map(cat => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Year</label>
                <input
                  type="text"
                  value={project.year}
                  onChange={(e) => setProject(p => ({ ...p, year: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-1.5 text-xs text-slate-900 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={project.location}
                  onChange={(e) => setProject(p => ({ ...p, location: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-1.5 text-xs text-slate-900 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Visibility & Status */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-xs">
            <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">Publication</h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
              <select
                value={project.status}
                onChange={(e) => setProject(p => ({ ...p, status: e.target.value as any }))}
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-2 text-xs text-slate-900 outline-none"
              >
                <option value="draft">Draft (Hidden from Public)</option>
                <option value="published">Published (Live on Website)</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="featured-toggle"
                checked={Boolean(project.featured)}
                onChange={(e) => setProject(p => ({ ...p, featured: e.target.checked }))}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
              />
              <label htmlFor="featured-toggle" className="text-xs text-slate-700 font-medium cursor-pointer">
                Showcase in Homepage Featured Stories
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
