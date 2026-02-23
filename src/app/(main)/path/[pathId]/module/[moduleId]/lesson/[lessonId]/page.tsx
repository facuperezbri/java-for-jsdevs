import { LessonPage } from '@/src/views/LessonPage';

export default async function Page({
  params,
}: {
  params: Promise<{ pathId: string; moduleId: string; lessonId: string }>;
}) {
  const { pathId, moduleId, lessonId } = await params;
  return <LessonPage pathId={pathId} moduleId={moduleId} lessonId={lessonId} />;
}
