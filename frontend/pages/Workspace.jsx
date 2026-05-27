import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { journalApi } from '@/lib/neuroApi';
import AnalysisResult from '@/components/neurolens/AnalysisResult';
import AnalysisSkeleton from '@/components/neurolens/AnalysisSkeleton';
import { useNeuroAuth } from '@/lib/neuroAuth';

const moods = ['😊 Great', '😐 Okay', '😔 Low', '😤 Stressed', '😴 Tired', '⚡ Energized'];

export default function Workspace() {
  const { user } = useNeuroAuth();
  const [text, setText] = useState('');
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [histLoading, setHistLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await journalApi.analyze({ content: text, mood: mood || undefined });
      setResult(data);
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async () => {
    if (showHistory) { setShowHistory(false); return; }
    setShowHistory(true);
    setHistLoading(true);
    try {
      const data = await journalApi.history(10);
      setHistory(Array.isArray(data) ? data : data.entries || []);
    } catch {
      setHistory([]);
    } finally {
      setHistLoading(false);
    }
  };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          {greeting()}{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">What's on your mind today? Share your thoughts for AI analysis.</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-4">
          {/* Mood selector */}
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">How are you feeling?</p>
            <div className="flex flex-wrap gap-2">
              {moods.map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(mood === m ? '' : m)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    mood === m
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Journal input */}
          <form onSubmit={handleAnalyze} className="space-y-3">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
              className="w-full px-4 py-3.5 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none leading-relaxed"
              placeholder="Write freely about your thoughts, challenges, goals, or how your day went. The more detail you share, the richer the AI insights will be..."
            />
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading || !text.trim()}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-blue-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            >
              <Send className="w-4 h-4" />
              {loading ? 'Analyzing with AI...' : 'Analyze with NeuroLens'}
            </button>
          </form>

          {/* History toggle */}
          <button
            onClick={loadHistory}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Clock className="w-4 h-4" />
            Recent entries
            {showHistory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2 overflow-hidden"
            >
              {histLoading ? (
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : history.length === 0 ? (
                <p className="text-sm text-gray-400 py-2">No previous entries found.</p>
              ) : (
                history.map((entry, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-lg px-4 py-3 cursor-pointer hover:border-blue-200 transition-colors"
                    onClick={() => setText(entry.content || entry.text || '')}>
                    <p className="text-xs text-gray-400 mb-1">{new Date(entry.created_at || entry.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600 truncate">{entry.content || entry.text}</p>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </div>

        {/* Analysis Panel */}
        <div>
          {loading && <AnalysisSkeleton />}
          {!loading && result && <AnalysisResult result={result} />}
          {!loading && !result && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                <Send className="w-6 h-6 text-blue-300" />
              </div>
              <p className="text-sm text-gray-400 font-medium">Your analysis will appear here</p>
              <p className="text-xs text-gray-300 mt-1">Write a journal entry and click Analyze</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}