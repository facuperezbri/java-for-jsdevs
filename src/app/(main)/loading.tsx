import { LoadingSpinner } from '@/src/components/ui/LoadingSpinner';

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <LoadingSpinner />
      <p className="text-sm text-text-tertiary">Loading...</p>
    </div>
  );
}
