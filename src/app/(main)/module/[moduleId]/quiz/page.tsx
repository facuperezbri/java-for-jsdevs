import { QuizPage } from '@/src/views/QuizPage';

export default async function Page({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  return <QuizPage moduleId={moduleId} />;
}
