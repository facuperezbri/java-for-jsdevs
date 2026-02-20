import { ProjectPage } from '@/src/views/ProjectPage';

export default async function Page({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  return <ProjectPage moduleId={moduleId} />;
}
