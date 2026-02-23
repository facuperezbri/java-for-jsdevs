import { QuizPage } from '@/src/views/QuizPage';

export default async function Page({
  params,
}: {
  params: Promise<{ pathId: string; moduleId: string }>;
}) {
  const { pathId, moduleId } = await params;
  return <QuizPage pathId={pathId} moduleId={moduleId} />;
}
