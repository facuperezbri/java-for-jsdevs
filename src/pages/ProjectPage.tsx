import { useState, useEffect } from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';
import { ChevronRight, Clock, Hammer, CheckCircle2 } from 'lucide-react';
import { useCurriculum } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';
import { isModuleUnlocked, getModuleAccentClasses } from '../lib/utils';
import { ProjectProgress } from '../components/project/ProjectProgress';
import { ProjectStep } from '../components/project/ProjectStep';
import { Badge } from '../components/ui/Badge';
import { cn } from '../lib/utils';

export function ProjectPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { progress, setLastVisited, completeProjectStep, isProjectStepComplete } = useProgress();
  const { CURRICULUM, getModule } = useCurriculum();

  const module = getModule(moduleId ?? '');
  if (!module) return <Navigate to="/" />;

  const unlocked = isModuleUnlocked(module.order, CURRICULUM, progress);
  if (!unlocked) return <Navigate to="/" />;

  const project = module.project;
  if (!project) return <Navigate to={`/module/${module.id}`} />;

  const accent = getModuleAccentClasses(module.accentColor);

  // Determine initial step from progress
  const lastStepId = progress.modules[module.id]?.projectProgress?.lastStepId;
  const lastStepIndex = lastStepId ? project.steps.findIndex((s) => s.id === lastStepId) : -1;
  const initialStep = lastStepIndex >= 0 ? Math.min(lastStepIndex + 1, project.steps.length - 1) : 0;

  const [currentStep, setCurrentStep] = useState(initialStep);

  useEffect(() => {
    setLastVisited(`/module/${module.id}/project`, module.id);
  }, [module.id, setLastVisited]);

  const completedStepIndices = new Set(
    project.steps
      .map((s, i) => (isProjectStepComplete(module.id, s.id) ? i : -1))
      .filter((i) => i >= 0)
  );

  const allComplete = project.steps.every((s) => isProjectStepComplete(module.id, s.id));

  function handleStepComplete(stepId: string) {
    completeProjectStep(module!.id, stepId);
    // Auto-advance to next step
    const stepIndex = project!.steps.findIndex((s) => s.id === stepId);
    if (stepIndex < project!.steps.length - 1) {
      setTimeout(() => setCurrentStep(stepIndex + 1), 500);
    }
  }

  const step = project.steps[currentStep];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link to="/" className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">Home</Link>
        <ChevronRight size={14} className="text-gray-400 dark:text-gray-500" />
        <Link to={`/module/${module.id}`} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">{module.title}</Link>
        <ChevronRight size={14} className="text-gray-400 dark:text-gray-500" />
        <span className="text-gray-700 dark:text-gray-300">Mini Project</span>
      </div>

      {/* Project header */}
      <div className={cn('rounded-2xl border p-6 mb-8', accent.bgLight, 'border-' + module.accentColor + '/20')}>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant={module.accentColor} size="sm">Module {module.order}</Badge>
          <Badge variant="gray" size="sm">
            <Hammer size={10} />
            Mini Project
          </Badge>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{project.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{project.description}</p>
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            ~{project.estimatedMinutes} min
          </div>
          <div>{project.steps.length} steps</div>
          <div>{completedStepIndices.size}/{project.steps.length} complete</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <ProjectProgress
          totalSteps={project.steps.length}
          currentStep={currentStep}
          completedStepIndices={completedStepIndices}
          onStepClick={setCurrentStep}
        />
      </div>

      {/* Current step */}
      {step && (
        <ProjectStep
          key={step.id}
          step={step}
          stepNumber={currentStep + 1}
          isComplete={isProjectStepComplete(module.id, step.id)}
          onComplete={handleStepComplete}
        />
      )}

      {/* All complete */}
      {allComplete && (
        <div className="mt-8 text-center p-6 rounded-xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 animate-fade-in">
          <CheckCircle2 size={32} className="text-green-500 dark:text-green-400 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-1">Project Complete!</h3>
          <p className="text-sm text-green-700 dark:text-green-400 mb-4">You've finished all {project.steps.length} steps.</p>
          <Link
            to={`/module/${module.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Back to Module
          </Link>
        </div>
      )}
    </div>
  );
}
