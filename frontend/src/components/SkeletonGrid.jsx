import SkeletonCard from './SkeletonCard';

export default function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {Array(8).fill().map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}
