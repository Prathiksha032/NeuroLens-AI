import { cn } from '@/lib/utils';

const emotionColors = {
  joy: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  happy: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  calm: 'bg-blue-50 text-blue-700 border-blue-100',
  neutral: 'bg-gray-50 text-gray-600 border-gray-200',
  anxious: 'bg-orange-50 text-orange-700 border-orange-100',
  stressed: 'bg-red-50 text-red-700 border-red-100',
  sad: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  tired: 'bg-purple-50 text-purple-700 border-purple-100',
  excited: 'bg-green-50 text-green-700 border-green-100',
  focused: 'bg-teal-50 text-teal-700 border-teal-100',
};

const sentimentBadge = {
  positive: 'bg-green-50 text-green-700 border-green-100',
  neutral: 'bg-gray-50 text-gray-600 border-gray-200',
  negative: 'bg-red-50 text-red-700 border-red-100',
};

export default function EmotionDisplay({ emotions, primary, sentiment }) {
  const emotionList = emotions
    ? Object.entries(emotions).sort((a, b) => b[1] - a[1]).slice(0, 5)
    : primary ? [[primary, 1]] : [];

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Emotional Analysis</h3>
      <div className="flex flex-wrap gap-2 mb-3">
        {emotionList.map(([emotion, score]) => (
          <span
            key={emotion}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-medium border capitalize',
              emotionColors[emotion.toLowerCase()] || 'bg-gray-50 text-gray-600 border-gray-200'
            )}
          >
            {emotion} {typeof score === 'number' && score < 1 ? `${Math.round(score * 100)}%` : ''}
          </span>
        ))}
      </div>
      {sentiment && (
        <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
          <span className="text-xs text-gray-400">Overall sentiment:</span>
          <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize',
            sentimentBadge[sentiment?.toLowerCase()] || 'bg-gray-50 text-gray-600 border-gray-200'
          )}>
            {sentiment}
          </span>
        </div>
      )}
    </div>
  );
}