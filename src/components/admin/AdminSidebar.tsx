'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Camera, 
  FolderPlus, 
  Image as ImageIcon, 
  BarChart3, 
  Settings, 
  ExternalLink,
  LogOut,
  Layers
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'All Projects', href: '/admin/projects', icon: Camera },
  { label: 'Categories', href: '/admin/categories', icon: Layers },
  { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lp_admin_auth');
    }
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 shadow-xs">
      <div>
        {/* Admin Header Brand */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold tracking-wider text-blue-600 uppercase">
              ADMIN WORKSPACE
            </span>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded font-mono">
              v2.0
            </span>
          </div>
          <h2 className="text-sm font-bold text-slate-900 mt-1">LATEST PHOTOGRAPHY</h2>
        </div>

        {/* Nav Links */}
        <nav className="p-3.5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t border-slate-100 space-y-1.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-md text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Website</span>
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-md text-xs text-red-600 hover:bg-red-50 transition-colors text-left font-medium"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
