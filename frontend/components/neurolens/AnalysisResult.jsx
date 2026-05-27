import { motion } from 'framer-motion';
import { Brain, Zap, Heart, Target, Lightbulb, TrendingUp } from 'lucide-react';
import MetricCard from './MetricCard';
import EmotionDisplay from './EmotionDisplay';

export default function AnalysisResult({ result }) {
  if (!result) return null;

  const {
    burnout_score,
    focus_score,
    productivity_score,
    primary_emotion,
    emotions,
    sentiment,
    recommendations = [],
    summary,
    energy_level,
  } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* Summary */}
      {summary && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Brain className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <p className="text-sm text-blue-800 leading-relaxed">{summary}</p>
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard label="Focus Score" value={focus_score} unit="/100" icon={Target} color="blue" />
        <MetricCard label="Burnout Level" value={burnout_score} unit="/100" icon={Zap}
          color={burnout_score > 70 ? 'red' : burnout_score > 40 ? 'orange' : 'green'} />
        <MetricCard label="Productivity" value={productivity_score} unit="/100" icon={TrendingUp} color="purple" />
        <MetricCard label="Energy Level" value={energy_level} unit="/100" icon={Heart} color="green" />
      </div>

      {/* Emotions */}
      {(emotions || primary_emotion || sentiment) && (
        <EmotionDisplay emotions={emotions} primary={primary_emotion} sentiment={sentiment} />
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-gray-900">AI Recommendations</h3>
          </div>
          <ul className="space-y-2.5">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 text-xs flex items-center justify-center shrink-0 mt-0.5 font-medium">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-600 leading-relaxed">{typeof rec === 'string' ? rec : rec.text || rec.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}