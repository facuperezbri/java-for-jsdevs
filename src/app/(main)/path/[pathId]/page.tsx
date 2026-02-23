import { HomePage } from '@/src/views/HomePage';

export default async function Page({
  params,
}: {
  params: Promise<{ pathId: string }>;
}) {
  const { pathId } = await params;
  return <HomePage pathId={pathId} />;
}
