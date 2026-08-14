'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Upload, Copy, Check, Trash2, Info, Image as ImageIcon } from 'lucide-react';
import { sampleImages } from '@/config/sampleImages';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

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
  { id: 'med-1', name: 'Graduation Hero Landscape', url: sampleImages.hero, category: 'Graduation / Hero', dimensions: '2070 × 1380 px', size: '1.4 MB', alt: 'Cinematic graduation convocation photograph' },
  { id: 'med-2', name: 'Moratuwa Convocation Ceremony', url: sampleImages.featuredStories.graduation, category: 'Graduation', dimensions: '1600 × 1066 px', size: '980 KB', alt: 'Moratuwa convocation celebration' },
  { id: 'med-3', name: 'Cultural Evening Jaffna', url: sampleImages.featuredStories.events, category: 'Events', dimensions: '1600 × 1066 px', size: '1.1 MB', alt: 'Ambient evening gathering in Jaffna' },
  { id: 'med-4', name: 'Editorial Portrait Natural Light', url: sampleImages.featuredStories.portrait, category: 'Portrait', dimensions: '1600 × 2000 px', size: '1.2 MB', alt: 'Editorial portrait series' },
  { id: 'med-5', name: 'Kovil Devotional Festival', url: sampleImages.featuredStories.kovilEvents, category: 'Kovil Events', dimensions: '1600 × 1066 px', size: '1.3 MB', alt: 'Sacred temple festival illumination' },
  { id: 'med-6', name: 'Aura Brand Identity Mockup', url: sampleImages.design.logoProject.cover, category: 'Design / Logo', dimensions: '1600 × 1066 px', size: '890 KB', alt: 'Minimalist logo mockup' },
  { id: 'med-7', name: 'Northern Championship Poster', url: sampleImages.design.posterProject1.main, category: 'Design / Poster', dimensions: '1600 × 2000 px', size: '1.6 MB', alt: 'Sports matchday poster layout' },
  { id: 'med-8', name: 'Jeyantha Founder Portrait', url: sampleImages.about.portrait, category: 'About / Founder', dimensions: '1600 × 2000 px', size: '1.1 MB', alt: 'Jeyantha photographer portrait' }
];

const STORAGE_KEY = 'latest-photography-media';
const BUCKET = 'media';
const MAX_SIZE = 10 * 1024 * 1024;

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaAsset[]>(initialMedia);
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploadName, setUploadName] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Graduation');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setStatus('Please select a JPG, PNG, or WEBP image.');
      return;
    }

    if (file.size > MAX_SIZE) {
      setStatus('Image is too large. Maximum size is 10 MB.');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setUploadUrl('');
    if (!uploadName) setUploadName(file.name.replace(/\.[^/.]+$/, ''));
    setStatus('');
  };

  const getDimensions = (file: File): Promise<{ width: number; height: number }> =>
    new Promise((resolve, reject) => {
      const img = document.createElement('img');
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Could not read image dimensions.'));
      };
      img.src = objectUrl;
    });

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');

    // Keep the existing URL method.
    if (!selectedFile) {
      if (!uploadUrl.trim()) {
        setStatus('Choose an image from your computer or enter an image URL.');
        return;
      }

      const newAsset: MediaAsset = {
        id: `med-${Date.now()}`,
        name: uploadName || 'Uploaded Asset',
        url: uploadUrl.trim(),
        category: uploadCategory,
        dimensions: '1920 × 1280 px',
        size: 'External URL',
        alt: uploadName || 'Portfolio media asset'
      };

      setMediaList((current) => [newAsset, ...current]);
      setUploadUrl('');
      setUploadName('');
      setStatus('Image URL added to the library.');
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setStatus('Supabase is not configured. Add the NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY values to your environment.');
      return;
    }

    setIsUploading(true);

    try {
      const extension = selectedFile.name.split('.').pop()?.toLowerCase() || 'jpg';
      const safeName = (uploadName || 'image')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const path = `portfolio/${Date.now()}-${safeName || 'image'}.${extension}`;

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, selectedFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: selectedFile.type
        });

      if (error) throw error;

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      const dimensions = await getDimensions(selectedFile);

      const newAsset: MediaAsset = {
        id: `med-${Date.now()}`,
        name: uploadName || selectedFile.name,
        url: data.publicUrl,
        category: uploadCategory,
        dimensions: `${dimensions.width} × ${dimensions.height} px`,
        size: `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`,
        alt: uploadName || 'Portfolio media asset'
      };

      setMediaList((current) => [newAsset, ...current]);
      setSelectedFile(null);
      setPreviewUrl('');
      setUploadName('');
      setStatus('Image uploaded successfully to Supabase Storage.');
    } catch (error) {
      console.error(error);
      setStatus(error instanceof Error ? error.message : 'Upload failed. Check the Supabase Storage bucket and policies.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    setMediaList((current) => current.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">STORAGE & ASSETS</span>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Media Library</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage original high-resolution photographs, brand assets, and Supabase Storage uploads (Requirement 36 & 58)
        </p>
      </div>

      <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-lg flex items-start gap-3 text-xs">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-slate-700">
          <p className="font-semibold text-slate-900">Section 58 Architecture: Asset Replacement Pipeline</p>
          <p className="text-slate-600">Temporary Sample Image → Owner Uploads Real Photography → Supabase Storage → Media Library → Live Portfolio.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <h2 className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold mb-4">
          Upload / Register New Asset
        </h2>

        <form onSubmit={handleAddMedia} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
            <div className="sm:col-span-5">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Image URL (existing option)</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={uploadUrl}
                onChange={(e) => { setUploadUrl(e.target.value); if (e.target.value) setSelectedFile(null); }}
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-md px-3 py-2 text-xs text-slate-900 outline-none"
              >
                <option>Graduation</option>
                <option>Events</option>
                <option>Portrait</option>
                <option>Kovil Events</option>
                <option>Sports</option>
                <option>Design / Logo</option>
                <option>Design / Poster</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-5">
            <label className="block text-xs font-semibold text-slate-700 mb-2">Upload from your computer</label>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md cursor-pointer transition-colors">
                <ImageIcon className="w-4 h-4" />
                <span>{selectedFile ? 'Choose another image' : 'Choose Image'}</span>
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="hidden" />
              </label>

              {selectedFile && (
                <div className="text-xs text-slate-600">
                  <p className="font-semibold text-slate-900">{selectedFile.name}</p>
                  <p>{(selectedFile.size / 1024 / 1024).toFixed(1)} MB · {selectedFile.type}</p>
                </div>
              )}
            </div>

            {previewUrl && (
              <div className="mt-4 flex gap-4 items-center">
                <div className="relative w-28 h-20 rounded-md overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={previewUrl} alt="Selected image preview" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs text-slate-500">Preview only. The original image will be uploaded to Supabase Storage.</p>
              </div>
            )}
          </div>

          {status && (
            <div className="text-xs rounded-md px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700">
              {status}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isUploading}
              className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-xs uppercase tracking-wider rounded-md flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploading ? 'Uploading...' : 'Add to Library'}</span>
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mediaList.map((asset) => (
          <div key={asset.id} className="group bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <Image src={asset.url} alt={asset.alt} fill sizes="300px" className="object-cover" />
                <span className="absolute top-2 left-2 bg-white/95 px-2 py-0.5 rounded text-[10px] font-mono font-semibold text-slate-800 shadow-xs">{asset.category}</span>
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
              <button type="button" onClick={() => handleCopy(asset.id, asset.url)} className="text-xs text-slate-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors font-medium">
                {copiedId === asset.id ? (
                  <><Check className="w-3.5 h-3.5 text-emerald-600" /><span className="text-emerald-600">Copied!</span></>
                ) : (
                  <><Copy className="w-3.5 h-3.5" /><span>Copy URL</span></>
                )}
              </button>
              <button type="button" onClick={() => handleDelete(asset.id)} className="text-slate-400 hover:text-red-600 p-1" title="Delete asset">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}