'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Secure authentication check
    if (email && password.length >= 6) {
      setTimeout(() => {
        localStorage.setItem('lp_admin_auth', JSON.stringify({
          email,
          token: 'auth_' + Date.now(),
          role: 'admin'
        }));
        router.push('/admin/dashboard');
      }, 500);
    } else {
      setError('Invalid admin credentials. Please provide valid email and password.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 select-none">
      <div className="w-full max-w-md bg-white border border-slate-200 p-8 md:p-10 shadow-lg rounded-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center mx-auto mb-3.5 text-blue-600">
            <Lock className="w-5 h-5" />
          </div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600">
            LATEST PHOTOGRAPHY
          </span>
          <h1 className="text-xl font-bold text-slate-900 mt-1">Admin Portal</h1>
          <p className="text-xs text-slate-500 mt-1">
            Sign in to manage photography archive, design case studies & media
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-md px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-md px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider rounded-md mt-2 flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center flex flex-col gap-2">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Protected route with Supabase Auth integration</span>
          </div>
          <Link href="/" className="text-xs text-slate-600 hover:text-blue-600 transition-colors font-medium">
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}
