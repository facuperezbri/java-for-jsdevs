// ─── Content Types ────────────────────────────────────────────────────────────

export interface CodeExample {
  left: { label: string; language: string; code: string };
  right: { label: string; language: string; code: string };
  caption?: string;
}

// Fill-in-the-blank / fix-the-bug challenges (inline within concepts)
export interface CodeChallengeBlank {
  id: string;
  expected: string[];
  hint?: string;
}

export interface CodeChallenge {
  id: string;
  type: 'fill-blank' | 'fix-bug';
  prompt: string;
  code: string; // uses ___BLANK_1___, ___BLANK_2___ placeholders
  blanks: CodeChallengeBlank[];
  explanation: string;
}

// Drag-and-drop translation drills (generic source→target)
export interface TranslationDrillSlot {
  id: string;
  expected: string;
}

export interface TranslationDrill {
  id: string;
  sourceLabel: string;
  sourceCode: string;
  targetLabel: string;
  targetTemplate: string; // code with ___SLOT_1___ placeholders
  slots: TranslationDrillSlot[];
  tokenBank: string[];
  explanation: string;
}

// Predict the output (free-text input)
export interface PredictOutput {
  id: string;
  code: string;
  language: string;
  expectedOutput: string;
  explanation: string;
  hint?: string;
}

// Mini project
export interface ProjectStep {
  id: string;
  title: string;
  instructions: string;
  starterCode: string;
  validationPattern: string; // regex string
  hints: string[];
  explanation: string;
}

export interface MiniProject {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  steps: ProjectStep[];
}

export interface ConceptSection {
  id: string;
  title: string;
  explanation: string;
  analogy?: string;
  codeExample?: CodeExample;
  callout?: {
    type: 'info' | 'warning' | 'tip' | 'gotcha';
    text: string;
  };
  challenge?: CodeChallenge;
}

export interface ThinkingExercise {
  id: string;
  prompt: string;
  hint: string;
  answer: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  estimatedMinutes: number;
  concepts: ConceptSection[];
  exercises: ThinkingExercise[];
  translationDrills?: TranslationDrill[];
  predictOutputs?: PredictOutput[];
}

export interface Module {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  icon: string;
  accentColor: 'blue' | 'purple' | 'green' | 'red' | 'cyan';
  lessons: Lesson[];
  quizId: string;
  project?: MiniProject;
}

// ─── Path Types ──────────────────────────────────────────────────────────────

export interface LearningPath {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  accentColor: string;
  audienceTag: string;
  moduleCount: number;
  lessonCount: number;
}

// ─── Quiz Types ───────────────────────────────────────────────────────────────

export interface QuizOption {
  key: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctKey: string;
  explanation: string;
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  questions: QuizQuestion[];
}

// ─── Progress Types ───────────────────────────────────────────────────────────

export interface QuizAttempt {
  quizId: string;
  score: number;
  completedAt: string;
  answers: Record<string, string>;
}

export interface ModuleProgress {
  moduleId: string;
  completedLessonIds: string[];
  quizAttempts: QuizAttempt[];
  lastVisitedLessonId?: string;
  revealedExercises?: Record<string, string[]>;
  completedChallenges?: Record<string, string[]>;
  completedDrills?: Record<string, string[]>;
  completedPredictions?: Record<string, string[]>;
  projectProgress?: { completedStepIds: string[]; lastStepId?: string };
}

export interface PathProgress {
  modules: Record<string, ModuleProgress>;
  lastVisitedLessonPath?: string;
}

export interface AppProgress {
  paths: Record<string, PathProgress>;
  activePath?: string;
  lastVisitedPath?: string;
}
