import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useProgress } from '../context/ProgressContext';
import { useCurriculum } from '../data/curriculum';
import { ModuleCard } from '../components/home/ModuleCard';
import { RoadmapHero } from '../components/home/RoadmapHero';

export function HomePage() {
  const { setLastVisited } = useProgress();
  const { t } = useTranslation();
  const { CURRICULUM } = useCurriculum();

  useEffect(() => {
    setLastVisited('/');
  }, [setLastVisited]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <RoadmapHero />

      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{t('home.courseModules', 'Course Modules')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CURRICULUM.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t('home.stats', '4 modules · 20 lessons · 4 quizzes · Built for React/JS developers')}
        </p>
      </div>
    </div>
  );
}
