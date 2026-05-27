import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Clock, Brain, ChevronRight } from 'lucide-react';
import { memoryApi } from '@/lib/neuroApi';

function MemoryCard({ entry, index }) {
  const [expanded, setExpanded] = useState(false);
  const date = entry.date || entry.created_at;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-all cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {date && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            )}
            {entry.primary_emotion && (
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full capitalize">
                {entry.primary_emotion}
              </span>
            )}
            {entry.similarity_score != null && (
              <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                {Math.round(entry.similarity_score * 100)}% match
              </span>
            )}
          </div>
          <p className={`text-sm text-gray-700 leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>
            {entry.content || entry.text}
          </p>
          {entry.ai_insight && (
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3 border-t border-gray-50 overflow-hidden"
                >
                  <div className="flex items-start gap-2">
                    <Brain className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-gray-500 leading-relaxed">{entry.ai_insight}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
        <ChevronRight className={`w-4 h-4 text-gray-300 shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </div>
      {entry.focus_score != null && (
        <div className="flex gap-4 mt-3 pt-3 border-t border-gray-50">
          <span className="text-xs text-gray-400">Focus: <strong className="text-gray-600">{entry.focus_score}</strong></span>
          <span className="text-xs text-gray-400">Burnout: <strong className="text-gray-600">{entry.burnout_score}</strong></span>
          <span className="text-xs text-gray-400">Productivity: <strong className="text-gray-600">{entry.productivity_score}</strong></span>
        </div>
      )}
    </motion.div>
  );
}

export default function MemoryExplorer() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [recentLoading, setRecentLoading] = useState(true);

  useEffect(() => {
    memoryApi.recent()
      .then((data) => setRecent(Array.isArray(data) ? data : data.entries || []))
      .catch(() => setRecent([]))
      .finally(() => setRecentLoading(false));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const data = await memoryApi.search(query);
      setResults(Array.isArray(data) ? data : data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const displayList = searched ? results : recent;
  const isLoading = searched ? loading : recentLoading;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Memory Explorer</h1>
        <p className="text-sm text-gray-500 mt-1">Semantically search your past journals and AI insights.</p>
      </motion.div>

      {/* Search */}
      <form onSubmit={handleSearch} className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!e.target.value) setSearched(false);
          }}
          className="w-full pl-11 pr-24 py-3.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all bg-white shadow-sm"
          placeholder="Search memories... e.g. 'when I felt overwhelmed' or 'focus sessions'"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors disabled:opacity-40"
        >
          Search
        </button>
      </form>

      {/* Section header */}
      <div className="flex items-center gap-2 mb-4">
        {searched ? (
          <>
            <Search className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">
              {loading ? 'Searching...' : `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
            </span>
            <button onClick={() => { setSearched(false); setQuery(''); }} className="text-xs text-blue-500 hover:underline ml-auto">
              Clear search
            </button>
          </>
        ) : (
          <>
            <BookOpen className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Recent memories</span>
          </>
        )}
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : displayList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-gray-300" />
          </div>
          <p className="text-sm text-gray-400">
            {searched ? 'No memories found for that query.' : 'No journal entries yet. Start writing to build your memory.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayList.map((entry, i) => (
            <MemoryCard key={entry.id || i} entry={entry} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}