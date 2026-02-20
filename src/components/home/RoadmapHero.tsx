import { useNavigate } from 'react-router-dom';
import { BookOpen, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useProgress } from '../../context/ProgressContext';
import { useCurriculum } from '../../data/curriculum';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';

export function RoadmapHero() {
  const { progress } = useProgress();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { CURRICULUM } = useCurriculum();

  const totalLessons = CURRICULUM.reduce((s, m) => s + m.lessons.length, 0);
  const completedLessons = CURRICULUM.reduce(
    (s, m) => s + (progress.modules[m.id]?.completedLessonIds.length ?? 0),
    0
  );
  const overallPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  function handleContinue() {
    if (progress.lastVisitedPath && progress.lastVisitedPath !== '/') {
      navigate(progress.lastVisitedPath);
      return;
    }
    // Find first incomplete lesson
    for (const mod of CURRICULUM) {
      for (const lesson of mod.lessons) {
        const done = progress.modules[mod.id]?.completedLessonIds.includes(lesson.id);
        if (!done) {
          navigate(`/module/${mod.id}/lesson/${lesson.id}`);
          return;
        }
      }
    }
    // All done!
    navigate(`/module/${CURRICULUM[0].id}/lesson/${CURRICULUM[0].lessons[0].id}`);
  }

  return (
    <div className="bg-surface-900 dark:bg-surface-950 rounded-2xl border border-surface-700 shadow-sm p-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={20} className="text-java" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">{t('roadmap.learningPath', 'Learning Path')}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {t('roadmap.title', 'Java for JavaScript Developers')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-5 max-w-lg">
            {t('roadmap.description', 'Master Java by comparing it to what you already know. Every concept is shown side-by-side with its JavaScript equivalent.')}
          </p>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {completedLessons === 0
                  ? t('roadmap.startJourney', 'Start your journey')
                  : t('roadmap.lessonsComplete', '{{completed}} of {{total}} lessons complete', { completed: completedLessons, total: totalLessons })}
              </span>
              <span className="text-sm text-gray-900 dark:text-gray-100 font-semibold">{Math.round(overallPercent)}%</span>
            </div>
            <ProgressBar value={overallPercent} color="default" />
          </div>
        </div>

        <div className="flex-shrink-0">
          <Button size="lg" onClick={handleContinue}>
            <Zap size={18} />
            {completedLessons === 0 ? t('roadmap.startLearning', 'Start learning') : t('roadmap.continue', 'Continue')}
          </Button>
        </div>
      </div>
    </div>
  );
}
