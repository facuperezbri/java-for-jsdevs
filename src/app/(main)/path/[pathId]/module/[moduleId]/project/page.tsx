import { ProjectPage } from '@/src/views/ProjectPage';

export default async function Page({
  params,
}: {
  params: Promise<{ pathId: string; moduleId: string }>;
}) {
  const { pathId, moduleId } = await params;
  return <ProjectPage pathId={pathId} moduleId={moduleId} />;
}
