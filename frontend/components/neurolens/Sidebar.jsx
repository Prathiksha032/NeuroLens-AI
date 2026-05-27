import { Link, useLocation } from 'react-router-dom';
import { Brain, BarChart2, BookOpen, User, LogOut, Sparkles } from 'lucide-react';
import { useNeuroAuth } from '@/lib/neuroAuth';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/workspace', icon: Brain, label: 'Workspace' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/memory', icon: BookOpen, label: 'Memory' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useNeuroAuth();

  return (
    <aside className="w-60 bg-white border-r border-gray-100 flex flex-col py-6 px-4 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-2 mb-8">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-gray-900 tracking-tight">NeuroLens</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-gray-100 pt-4 mt-4">
        {user && (
          <div className="px-3 mb-3">
            <p className="text-xs font-medium text-gray-900 truncate">{user.full_name || user.email}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}