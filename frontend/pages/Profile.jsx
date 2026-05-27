import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Save, LogOut, Shield } from 'lucide-react';
import { useNeuroAuth } from '@/lib/neuroAuth';
import { authApi } from '@/lib/neuroApi';

export default function Profile() {
  const { user, logout, refreshUser } = useNeuroAuth();
  const [form, setForm] = useState({ full_name: user?.full_name || '', email: user?.email || '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      await authApi.updateProfile({ full_name: form.full_name });
      await refreshUser();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err.message || 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  const initials = user?.full_name
    ? user.full_name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.[0]?.toUpperCase() || '?';

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Profile &amp; Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account information and preferences.</p>
      </motion.div>

      <div className="space-y-5">
        {/* Avatar card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex items-center gap-5"
        >
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-xl font-semibold">
            {initials}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user?.full_name || 'User'}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <Shield className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-600">Account active</span>
            </div>
          </div>
        </motion.div>

        {/* Edit profile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-sm font-semibold text-gray-900 mb-5 flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" /> Personal information
          </h2>
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">{error}</div>
          )}
          {saved && (
            <div className="bg-green-50 border border-green-100 text-green-700 text-sm rounded-lg px-4 py-3 mb-4">
              Changes saved successfully.
            </div>
          )}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Full name</label>
              <input
                type="text"
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email address</span>
              </label>
              <input
                type="email"
                value={form.email}
                disabled
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </form>
        </motion.div>

        {/* Danger zone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Session</h2>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-red-500 border border-red-100 px-5 py-2.5 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out of NeuroLens
          </button>
        </motion.div>
      </div>
    </div>
  );
}