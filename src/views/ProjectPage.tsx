'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Clock, Hammer, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCurriculum } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';
import { isModuleUnlocked, getModuleAccentClasses } from '../lib/utils';
import { ProjectProgress } from '../components/project/ProjectProgress';
import { ProjectStep } from '../components/project/ProjectStep';
import { Badge } from '../components/ui/Badge';
import { cn } from '../lib/utils';
import { staggerContainer, staggerItem } from '../lib/motion';

interface ProjectPageProps {
  moduleId: string;
}

export function ProjectPage({ moduleId }: ProjectPageProps) {
  const router = useRouter();
  const { progress, setLastVisited, completeProjectStep, isProjectStepComplete } = useProgress();
  const { CURRICULUM, getModule } = useCurriculum();

  const module = getModule(moduleId);
  const unlocked = module ? isModuleUnlocked(module.order, CURRICULUM, progress) : false;
  const project = module?.project;

  const lastStepId = module ? progress.modules[module.id]?.projectProgress?.lastStepId : undefined;
  const lastStepIndex = project && lastStepId ? project.steps.findIndex((s) => s.id === lastStepId) : -1;
  const initialStep = project && lastStepIndex >= 0 ? Math.min(lastStepIndex + 1, project.steps.length - 1) : 0;

  const [currentStep, setCurrentStep] = useState(initialStep);

  useEffect(() => {
    if (!module) {
      router.replace('/');
      return;
    }
    if (!unlocked) {
      router.replace('/');
      return;
    }
    if (!project) {
      router.replace(`/module/${module.id}`);
      return;
    }
    setLastVisited(`/module/${module.id}/project`, module.id);
  }, [moduleId, module, unlocked, project, router, setLastVisited]);

  if (!module || !unlocked || !project) return null;

  const accent = getModuleAccentClasses(module.accentColor);

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
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto px-4 py-8"
    >
      {/* Breadcrumb */}
      <motion.div variants={staggerItem} className="flex items-center gap-2 mb-6 text-sm">
        <Link href="/" className="text-text-muted hover:text-text-secondary transition-colors">Home</Link>
        <ChevronRight size={14} className="text-text-muted" />
        <Link href={`/module/${module.id}`} className="text-text-muted hover:text-text-secondary transition-colors">{module.title}</Link>
        <ChevronRight size={14} className="text-text-muted" />
        <span className="text-text-secondary">Mini Project</span>
      </motion.div>

      {/* Project header */}
      <motion.div variants={staggerItem} className={cn('rounded-2xl border p-6 mb-8 bg-gradient-to-br', accent.bgLight, 'border-border-subtle')}>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant={module.accentColor} size="sm">Module {module.order}</Badge>
          <Badge variant="gray" size="sm">
            <Hammer size={10} />
            Mini Project
          </Badge>
        </div>
        <h1 className="font-display text-display-md text-text-primary mb-1">{project.title}</h1>
        <p className="text-text-secondary text-sm mb-4">{project.description}</p>
        <div className="flex items-center gap-4 text-xs text-text-tertiary">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            ~{project.estimatedMinutes} min
          </div>
          <div>{project.steps.length} steps</div>
          <div>{completedStepIndices.size}/{project.steps.length} complete</div>
        </div>
      </motion.div>

      {/* Progress bar */}
      <motion.div variants={staggerItem} className="mb-8">
        <ProjectProgress
          totalSteps={project.steps.length}
          currentStep={currentStep}
          completedStepIndices={completedStepIndices}
          onStepClick={setCurrentStep}
        />
      </motion.div>

      {/* Current step */}
      {step && (
        <motion.div variants={staggerItem}>
          <ProjectStep
            key={step.id}
            step={step}
            stepNumber={currentStep + 1}
            isComplete={isProjectStepComplete(module.id, step.id)}
            onComplete={handleStepComplete}
          />
        </motion.div>
      )}

      {/* All complete */}
      {allComplete && (
        <motion.div
          variants={staggerItem}
          className="mt-8 text-center p-6 rounded-xl bg-module-green/5 border border-module-green/20 animate-fade-in"
        >
          <CheckCircle2 size={32} className="text-module-green mx-auto mb-2" />
          <h3 className="font-display text-lg font-semibold text-module-green mb-1">Project Complete!</h3>
          <p className="text-sm text-text-secondary mb-4">You've finished all {project.steps.length} steps.</p>
          <Link
            href={`/module/${module.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-module-green text-white text-sm font-medium hover:bg-module-green/90 transition-colors"
          >
            Back to Module
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
