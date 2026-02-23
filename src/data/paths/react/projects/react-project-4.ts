import type { MiniProject } from '../../../../types';

const project: MiniProject = {
  id: 'react-project-4',
  moduleId: 'react-m4',
  title: 'Theme System',
  description:
    'Build a theme system using Context, custom hooks, error boundaries, and memoization — the advanced patterns that power production React apps.',
  estimatedMinutes: 5,
  steps: [
    {
      id: 'rp4-s1',
      title: 'Create a Theme Context',
      instructions: `Create a theme context and provider:
- Use React.createContext to create a ThemeContext with a default value of "light"
- Create a ThemeProvider component that wraps children in ThemeContext.Provider
- Use useState inside the provider to manage the theme value ("light" or "dark")
- Pass both the theme value and a toggleTheme function in the context value`,
      starterCode: `import { createContext, useState } from 'react';

// Create the context:

// Create the provider component:
function ThemeProvider({ children }) {

  return (
    // Wrap children with the provider
  );
}
`,
      validationPattern:
        'createContext\\s*\\(.*\\).*ThemeProvider.*useState.*ThemeContext\\.Provider\\s+value\\s*=\\s*\\{',
      hints: [
        'Create context: const ThemeContext = createContext("light");',
        'Pass an object as value: <ThemeContext.Provider value={{ theme, toggleTheme }}>',
      ],
      explanation:
        'Context eliminates prop drilling by broadcasting values to any descendant component. Combining context with state in a provider component is the standard pattern for app-wide settings like themes, auth, and locale.',
    },
    {
      id: 'rp4-s2',
      title: 'Build a Custom Hook',
      instructions: `Create a custom hook called "useTheme" that:
- Calls useContext(ThemeContext) to get the context value
- Throws an error if used outside of a ThemeProvider (i.e., context is undefined)
- Returns the context value (theme and toggleTheme)`,
      starterCode: `import { useContext } from 'react';

// Write the useTheme custom hook:
function useTheme() {

}
`,
      validationPattern:
        'function\\s+useTheme\\s*\\(\\s*\\)\\s*\\{.*useContext\\s*\\(\\s*ThemeContext\\s*\\).*throw\\s+new\\s+Error.*return',
      hints: [
        'Get the value: const context = useContext(ThemeContext);',
        'Guard clause: if (!context) throw new Error("useTheme must be used within a ThemeProvider");',
      ],
      explanation:
        'Custom hooks encapsulate reusable logic and give you a clean API. The guard clause pattern ensures a meaningful error message instead of mysterious undefined errors when the hook is used outside its provider.',
    },
    {
      id: 'rp4-s3',
      title: 'Add an Error Boundary',
      instructions: `Create a class component called "ThemeErrorBoundary" that:
- Extends React.Component
- Has state: { hasError: false }
- Implements static getDerivedStateFromError() to set hasError to true
- Implements componentDidCatch(error, info) to log the error
- Renders a fallback <div> with "Something went wrong" when hasError is true
- Otherwise renders this.props.children`,
      starterCode: `import React from 'react';

class ThemeErrorBoundary extends React.Component {
  // Initialize state:

  // Implement getDerivedStateFromError:

  // Implement componentDidCatch:

  // Implement render:

}
`,
      validationPattern:
        'class\\s+ThemeErrorBoundary\\s+extends\\s+React\\.Component.*getDerivedStateFromError.*componentDidCatch.*hasError.*Something went wrong|render\\s*\\(\\s*\\).*this\\.state\\.hasError',
      hints: [
        'Static method: static getDerivedStateFromError(error) { return { hasError: true }; }',
        'Conditional render: if (this.state.hasError) return <div>Something went wrong</div>;',
      ],
      explanation:
        'Error boundaries are class components that catch JavaScript errors in their child component tree. They prevent a single broken component from crashing the entire app — similar to try/catch but for the React render tree.',
    },
    {
      id: 'rp4-s4',
      title: 'Optimize with React.memo',
      instructions: `Create a memoized component called "ThemeDisplay" that:
- Receives "theme" and "label" as props
- Renders a <div> showing the label and current theme
- Is wrapped with React.memo to prevent unnecessary re-renders
- Only re-renders when theme or label actually change`,
      starterCode: `import React from 'react';

// Create the memoized component:

`,
      validationPattern:
        'React\\.memo\\s*\\(|memo\\s*\\(.*function.*theme.*label',
      hints: [
        'Wrap the component: const ThemeDisplay = React.memo(function ThemeDisplay({ theme, label }) { ... });',
        'React.memo does a shallow comparison of props — it skips re-render if props have not changed',
      ],
      explanation:
        'React.memo is a higher-order component that memoizes the rendered output. It skips re-rendering when props are the same, which is crucial for performance in large component trees where parent re-renders are frequent.',
    },
  ],
};

export default project;
