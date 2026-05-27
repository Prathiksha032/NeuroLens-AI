import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, BarChart2, BookOpen, Sparkles, Shield, Zap, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Deep AI Analysis',
    description: 'Claude-powered NLP processes your thoughts and surfaces profound cognitive and emotional insights.',
  },
  {
    icon: Zap,
    title: 'Burnout Detection',
    description: 'Real-time burnout scoring and early warning signals to help you maintain sustainable performance.',
  },
  {
    icon: BarChart2,
    title: 'Productivity Trends',
    description: 'Track focus, energy, and output over time with beautiful, actionable analytics dashboards.',
  },
  {
    icon: BookOpen,
    title: 'Semantic Memory',
    description: 'Your AI remembers context across all your entries, connecting patterns invisible to the naked eye.',
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    description: 'End-to-end JWT authentication. Your mental health data stays yours, always.',
  },
  {
    icon: Sparkles,
    title: 'Smart Recommendations',
    description: 'Personalized, AI-generated guidance tailored to your unique cognitive and emotional profile.',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">NeuroLens</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors px-3 py-1.5">
              Sign in
            </Link>
            <Link
              to="/signup"
              className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-medium px-3.5 py-1.5 rounded-full mb-6 border border-blue-100">
              <Sparkles className="w-3 h-3" />
              Powered by Claude AI + Advanced NLP
            </div>
            <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 tracking-tight leading-tight mb-6">
              Understand Your Mind.
              <br />
              <span className="text-blue-500">Amplify Your Performance.</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-10">
              NeuroLens analyzes your thoughts, detects burnout early, and delivers personalized AI insights — so you can work smarter and feel better.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/signup"
                className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-700 transition-all flex items-center gap-2 shadow-sm"
              >
                Start for free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="text-gray-500 px-6 py-3 rounded-xl font-medium hover:text-gray-900 hover:bg-gray-50 transition-all border border-gray-200"
              >
                Sign in to your account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-semibold text-gray-900 tracking-tight mb-3">
              Built for peak cognitive performance
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Every feature is designed to surface the insights that matter most to your mental clarity and output.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <f.icon className="w-4.5 h-4.5 text-blue-500 w-[18px] h-[18px]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold text-gray-900 tracking-tight mb-4">
              Your mind deserves better tools.
            </h2>
            <p className="text-gray-500 mb-8">
              Join thousands of professionals using NeuroLens to optimize their cognitive performance.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-7 py-3.5 rounded-xl font-medium hover:bg-blue-600 transition-all shadow-sm"
            >
              Get started free <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 text-center">
        <p className="text-sm text-gray-400">© 2026 NeuroLens AI. All rights reserved.</p>
      </footer>
    </div>
  );
}