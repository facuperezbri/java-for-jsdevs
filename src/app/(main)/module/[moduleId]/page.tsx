import { ModulePage } from '@/src/views/ModulePage';

export default async function Page({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  return <ModulePage moduleId={moduleId} />;
}
