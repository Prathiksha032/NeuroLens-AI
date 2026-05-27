import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function MetricCard({ label, value, unit = '', icon: Icon, color = 'blue', description }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
        {Icon && (
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', colorMap[color])}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <p className="text-3xl font-semibold text-gray-900 tracking-tight">
        {value ?? '—'}
        {value != null && <span className="text-lg text-gray-400 font-normal ml-1">{unit}</span>}
      </p>
      {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
    </motion.div>
  );
}