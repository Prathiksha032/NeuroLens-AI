import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { analyticsApi } from '@/lib/neuroApi';
import { TrendingUp, Brain, Zap, Target, BarChart2 } from 'lucide-react';

const DAYS_OPTIONS = [7, 14, 30, 90];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-md text-xs">
      <p className="font-medium text-gray-700 mb-1.5">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

function ChartCard({ title, icon: Icon, color, dataKey, data, name }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F4F4F5" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#A1A1AA' }} tickLine={false} axisLine={false} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#A1A1AA' }} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey={dataKey} name={name} stroke="#3B82F6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function Analytics() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    analyticsApi.trends(days)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [days]);

  const trends = data?.trends || data || [];
  const summary = data?.summary || {};

  const summaryCards = [
    { label: 'Avg Focus', value: summary.avg_focus, icon: Target, color: 'bg-blue-50 text-blue-500' },
    { label: 'Avg Productivity', value: summary.avg_productivity, icon: TrendingUp, color: 'bg-purple-50 text-purple-500' },
    { label: 'Avg Burnout', value: summary.avg_burnout, icon: Zap, color: 'bg-orange-50 text-orange-500' },
    { label: 'Entries', value: summary.total_entries || trends.length, icon: Brain, color: 'bg-green-50 text-green-500' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Analytics</h1>
            <p className="text-sm text-gray-500 mt-1">Your cognitive performance trends over time.</p>
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {DAYS_OPTIONS.map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  days === d ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />)}
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[...Array(4)].map((_, i) => <div key={i} className="h-52 bg-gray-100 rounded-xl animate-pulse" />)}
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl p-5">{error}</div>
      ) : (
        <div className="space-y-5">
          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {summaryCards.map(({ label, value, icon: Icon, color }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-2xl font-semibold text-gray-900">{value ?? '—'}</p>
                <p className="text-xs text-gray-400 mt-0.5">{label}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          {trends.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-5">
              <ChartCard title="Focus Score" icon={Target} color="bg-blue-50 text-blue-500" dataKey="focus_score" data={trends} name="Focus" />
              <ChartCard title="Productivity" icon={TrendingUp} color="bg-purple-50 text-purple-500" dataKey="productivity_score" data={trends} name="Productivity" />
              <ChartCard title="Burnout Level" icon={Zap} color="bg-orange-50 text-orange-500" dataKey="burnout_score" data={trends} name="Burnout" />
              <ChartCard title="Energy Level" icon={Brain} color="bg-green-50 text-green-500" dataKey="energy_level" data={trends} name="Energy" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                <BarChart2 className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-sm text-gray-400">No data yet. Start analyzing your journals to see trends.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}