'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Upload, Copy, Check, Trash2, Image as ImageIcon, Info } from 'lucide-react';
import { sampleImages } from '@/config/sampleImages';

interface MediaAsset {
  id: string;
  name: string;
  url: string;
  category: string;
  dimensions: string;
  size: string;
  alt: string;
}

const initialMedia: MediaAsset[] = [
  {
    id: 'med-1',
    name: 'Graduation Hero Landscape',
    url: sampleImages.hero,
    category: 'Graduation / Hero',
    dimensions: '2070 × 1380 px',
    size: '1.4 MB',
    alt: 'Cinematic graduation convocation photograph'
  },
  {
    id: 'med-2',
    name: 'Moratuwa Convocation Ceremony',
    url: sampleImages.featuredStories.graduation,
    category: 'Graduation',
    dimensions: '1600 × 1066 px',
    size: '980 KB',
    alt: 'Moratuwa convocation celebration'
  },
  {
    id: 'med-3',
    name: 'Cultural Evening Jaffna',
    url: sampleImages.featuredStories.events,
    category: 'Events',
    dimensions: '1600 × 1066 px',
    size: '1.1 MB',
    alt: 'Ambient evening gathering in Jaffna'
  },
  {
    id: 'med-4',
    name: 'Editorial Portrait Natural Light',
    url: sampleImages.featuredStories.portrait,
    category: 'Portrait',
    dimensions: '1600 × 2000 px',
    size: '1.2 MB',
    alt: 'Editorial portrait series'
  },
  {
    id: 'med-5',
    name: 'Kovil Devotional Festival',
    url: sampleImages.featuredStories.kovilEvents,
    category: 'Kovil Events',
    dimensions: '1600 × 1066 px',
    size: '1.3 MB',
    alt: 'Sacred temple festival illumination'
  },
  {
    id: 'med-6',
    name: 'Aura Brand Identity Mockup',
    url: sampleImages.design.logoProject.cover,
    category: 'Design / Logo',
    dimensions: '1600 × 1066 px',
    size: '890 KB',
    alt: 'Minimalist logo mockup'
  },
  {
    id: 'med-7',
    name: 'Northern Championship Poster',
    url: sampleImages.design.posterProject1.main,
    category: 'Design / Poster',
    dimensions: '1600 × 2000 px',
    size: '1.6 MB',
    alt: 'Sports matchday poster layout'
  },
  {
    id: 'med-8',
    name: 'Jeyantha Founder Portrait',
    url: sampleImages.about.portrait,
    category: 'About / Founder',
    dimensions: '1600 × 2000 px',
    size: '1.1 MB',
    alt: 'Jeyantha photographer portrait'
  }
];

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaAsset[]>(initialMedia);
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploadName, setUploadName] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Graduation');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrl) return;

    const newAsset: MediaAsset = {
      id: `med-${Date.now()}`,
      name: uploadName || 'Uploaded Asset',
      url: uploadUrl,
      category: uploadCategory,
      dimensions: '1920 × 1280 px',
      size: '1.2 MB',
      alt: uploadName || 'Portfolio media asset'
    };

    setMediaList([newAsset, ...mediaList]);
    setUploadUrl('');
    setUploadName('');
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    setMediaList(mediaList.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">STORAGE & ASSETS</span>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Media Library</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage original high-resolution photographs, brand assets, and Supabase Storage uploads (Requirement 36 & 58)
        </p>
      </div>

      {/* Supabase Storage Pipeline Info Box */}
      <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-lg flex items-start gap-3 text-xs">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-slate-700">
          <p className="font-semibold text-slate-900">Section 58 Architecture: Asset Replacement Pipeline</p>
          <p className="text-slate-600">
            Temporary Sample Image → Owner Uploads Real Photography → Supabase Storage → Media Library → Live Portfolio.
          </p>
        </div>
      </div>

      {/* Upload Box */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold mb-4">
          Upload / Register New Asset
        </h2>
        <form onSubmit={handleAddMedia} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-5">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Image URL (Unsplash or Supabase Storage URL)</label>
            <input
              type="text"
              placeholder="https://images.unsplash.com/..."
              value={uploadUrl}
              onChange={(e) => setUploadUrl(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-2 text-xs text-slate-900 outline-none"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Asset Label / Title</label>
            <input
              type="text"
              placeholder="e.g. Jaffna Convocation Shot #1"
              value={uploadName}
              onChange={(e) => setUploadName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-2 text-xs text-slate-900 outline-none"
            />
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider rounded-md flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Add to Library</span>
            </button>
          </div>
        </form>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mediaList.map((asset) => (
          <div key={asset.id} className="group bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <Image src={asset.url} alt={asset.alt} fill sizes="300px" className="object-cover" />
                <span className="absolute top-2 left-2 bg-white/95 px-2 py-0.5 rounded text-[10px] font-mono font-semibold text-slate-800 shadow-xs">
                  {asset.category}
                </span>
              </div>

              <div className="p-3.5 space-y-1">
                <h3 className="text-xs font-bold text-slate-900 truncate">{asset.name}</h3>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>{asset.dimensions}</span>
                  <span>{asset.size}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleCopy(asset.id, asset.url)}
                className="text-xs text-slate-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors font-medium"
              >
                {copiedId === asset.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleDelete(asset.id)}
                className="text-slate-400 hover:text-red-600 p-1"
                title="Delete asset"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
