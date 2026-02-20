import { LoadingSpinner } from '@/src/components/ui/LoadingSpinner';

export default function Loading() {
  return (
    <div className="grain flex min-h-screen flex-col items-center justify-center gap-4 bg-page-bg p-4">
      <LoadingSpinner />
      <p className="text-sm text-text-tertiary">Loading...</p>
    </div>
  );
}
