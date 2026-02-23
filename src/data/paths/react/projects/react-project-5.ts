import type { MiniProject } from '../../../../types';

const project: MiniProject = {
  id: 'react-project-5',
  moduleId: 'react-m5',
  title: 'React 18 Migration',
  description:
    'Apply React 18+ features — useTransition for non-blocking updates, Suspense for code splitting, useId for accessible forms, and the client/server component model.',
  estimatedMinutes: 5,
  steps: [
    {
      id: 'rp5-s1',
      title: 'Add useTransition for Non-Blocking Updates',
      instructions: `Create a "SearchPage" component that:
- Uses useState for a "query" input value
- Uses useState for a "results" array
- Uses useTransition to get isPending and startTransition
- Updates the query immediately on input change
- Wraps the expensive results filtering inside startTransition
- Shows a "Loading..." message when isPending is true`,
      starterCode: `import { useState, useTransition } from 'react';

function SearchPage({ items }) {
  // Declare state and transition:

  function handleChange(e) {
    // Update query immediately, filter results in a transition:

  }

  return (
    <div>
      <input value={/* query */} onChange={handleChange} />
      {/* Show loading indicator or results */}
    </div>
  );
}
`,
      validationPattern:
        'useTransition\\s*\\(\\s*\\).*startTransition\\s*\\(.*isPending',
      hints: [
        'Destructure: const [isPending, startTransition] = useTransition();',
        'Wrap the slow update: startTransition(() => setResults(items.filter(...)));',
      ],
      explanation:
        'useTransition marks state updates as non-urgent, letting React keep the UI responsive during expensive renders. The input stays snappy while the filtered list updates in the background — no manual debouncing needed.',
    },
    {
      id: 'rp5-s2',
      title: 'Use Suspense with React.lazy',
      instructions: `Set up code splitting with Suspense and lazy:
- Use React.lazy to lazily import a "Dashboard" component from "./Dashboard"
- Wrap the lazy component in a <Suspense> boundary
- Provide a fallback prop with a <div>Loading dashboard...</div>
- Render the lazy Dashboard inside the Suspense boundary`,
      starterCode: `import React, { Suspense } from 'react';

// Lazy import the Dashboard:

function App() {
  return (
    <div>
      <h1>My App</h1>
      {/* Wrap Dashboard in Suspense with a fallback */}
    </div>
  );
}
`,
      validationPattern:
        'React\\.lazy\\s*\\(\\s*\\(\\s*\\)\\s*=>\\s*import\\s*\\(.*Dashboard.*\\)\\s*\\).*<Suspense\\s+fallback\\s*=\\s*\\{.*Loading',
      hints: [
        'Lazy import: const Dashboard = React.lazy(() => import("./Dashboard"));',
        'Wrap in Suspense: <Suspense fallback={<div>Loading dashboard...</div>}>',
      ],
      explanation:
        'React.lazy and Suspense enable code splitting — loading components only when they are needed. This reduces the initial bundle size and improves load times. Suspense shows a fallback while the chunk downloads.',
    },
    {
      id: 'rp5-s3',
      title: 'Create a useId Pattern for Accessible Forms',
      instructions: `Create a "FormField" component that:
- Uses the useId hook to generate a unique ID
- Renders a <label> with the htmlFor attribute set to the generated ID
- Renders an <input> with the id attribute set to the same generated ID
- Accepts "label" and "type" as props`,
      starterCode: `import { useId } from 'react';

function FormField({ label, type }) {
  // Generate a unique ID:

  return (
    <div>
      {/* Render label and input with matching IDs */}
    </div>
  );
}
`,
      validationPattern:
        'useId\\s*\\(\\s*\\).*htmlFor\\s*=\\s*\\{\\s*id\\s*\\}.*id\\s*=\\s*\\{\\s*id\\s*\\}|id\\s*=\\s*\\{\\s*id\\s*\\}.*htmlFor\\s*=\\s*\\{\\s*id\\s*\\}',
      hints: [
        'Generate the ID: const id = useId();',
        'Link them: <label htmlFor={id}> and <input id={id} />',
      ],
      explanation:
        'useId generates unique IDs that are stable across server and client rendering. This solves the hydration mismatch problem that occurs when using Math.random() or incrementing counters for IDs in SSR apps.',
    },
    {
      id: 'rp5-s4',
      title: 'Mark Client vs Server Components',
      instructions: `Refactor the following code into a proper client/server component split:
- Create a server component "UserProfile" that fetches user data (no "use client" directive)
- Create a client component "LikeButton" with the "use client" directive at the top
- The LikeButton should use useState to track likes
- The UserProfile should import and render LikeButton, passing the userId`,
      starterCode: `// File: LikeButton.jsx
// Add the correct directive:

import { useState } from 'react';

function LikeButton({ userId }) {
  // Add state for likes:

  return (
    <button>
      {/* Show like count and handle click */}
    </button>
  );
}

// File: UserProfile.jsx (Server Component)
// No directive needed for server components

function UserProfile({ user }) {
  return (
    <div>
      <h1>{/* user name */}</h1>
      {/* Render LikeButton */}
    </div>
  );
}
`,
      validationPattern:
        "'use client'|\"use client\".*useState.*likes.*setLikes",
      hints: [
        'Add "use client"; as the very first line of the LikeButton file',
        'Server components cannot use hooks or browser APIs — push interactivity to client components',
      ],
      explanation:
        'React Server Components run on the server and ship zero JavaScript to the client. Client components (marked with "use client") handle interactivity. The key rule: push interactivity to the leaves of your component tree to minimize client-side JavaScript.',
    },
  ],
};

export default project;
