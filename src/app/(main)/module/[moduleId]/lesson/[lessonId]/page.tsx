import { LessonPage } from '@/src/views/LessonPage';

export default async function Page({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const { moduleId, lessonId } = await params;
  return <LessonPage moduleId={moduleId} lessonId={lessonId} />;
}
