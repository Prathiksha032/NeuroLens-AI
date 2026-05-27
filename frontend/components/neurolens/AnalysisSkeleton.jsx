export default function AnalysisSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="bg-blue-50 rounded-xl p-4 h-16" />
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-xl h-24" />
        ))}
      </div>
      <div className="bg-gray-100 rounded-xl h-28" />
      <div className="bg-gray-100 rounded-xl h-40" />
    </div>
  );
}