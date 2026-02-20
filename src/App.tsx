import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppShell } from './components/layout/AppShell';
import { HomePage } from './pages/HomePage';
import { ModulePage } from './pages/ModulePage';
import { LessonPage } from './pages/LessonPage';
import { QuizPage } from './pages/QuizPage';
import { ProjectPage } from './pages/ProjectPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ProgressProvider>
          <Routes>
            <Route element={<AppShell />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/module/:moduleId" element={<ModulePage />} />
              <Route path="/module/:moduleId/lesson/:lessonId" element={<LessonPage />} />
              <Route path="/module/:moduleId/quiz" element={<QuizPage />} />
              <Route path="/module/:moduleId/project" element={<ProjectPage />} />
            </Route>
          </Routes>
        </ProgressProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
