import { ModulePage } from '@/src/views/ModulePage';

export default async function Page({
  params,
}: {
  params: Promise<{ pathId: string; moduleId: string }>;
}) {
  const { pathId, moduleId } = await params;
  return <ModulePage pathId={pathId} moduleId={moduleId} />;
}
