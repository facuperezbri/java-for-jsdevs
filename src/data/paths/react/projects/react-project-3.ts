import type { MiniProject } from '../../../../types';

const project: MiniProject = {
  id: 'react-project-3',
  moduleId: 'react-m3',
  title: 'Stateful Counter App',
  description:
    'Build a feature-rich counter that uses useState, useEffect, useReducer, and cleanup functions — the core hooks for managing state and side effects.',
  estimatedMinutes: 5,
  steps: [
    {
      id: 'rp3-s1',
      title: 'Use useState for a Counter',
      instructions: `Create a "Counter" component that:
- Uses useState to track a "count" value starting at 0
- Renders the current count in a <p> tag
- Has an "Increment" button that increases count by 1
- Has a "Decrement" button that decreases count by 1`,
      starterCode: `import { useState } from 'react';

function Counter() {
  // Declare state here:

  return (
    <div>
      <p>Count: {/* display count */}</p>
      <button>{/* Decrement */}</button>
      <button>{/* Increment */}</button>
    </div>
  );
}
`,
      validationPattern:
        'useState\\s*\\(\\s*0\\s*\\).*setCount\\s*\\(.*count\\s*[-+]\\s*1|count\\s*\\+\\s*1.*setCount|setCount\\s*\\(\\s*prev\\s*=>',
      hints: [
        'Declare state: const [count, setCount] = useState(0);',
        'Update state with the setter: onClick={() => setCount(count + 1)}',
      ],
      explanation:
        'useState is the most fundamental React hook. It returns a pair — the current state value and a function to update it. React re-renders the component whenever state changes, keeping the UI in sync.',
    },
    {
      id: 'rp3-s2',
      title: 'Sync the Document Title with useEffect',
      instructions: `Add a useEffect to the Counter component that:
- Runs every time "count" changes
- Updates document.title to show the current count: \`Count: \${count}\`
- Include count in the dependency array`,
      starterCode: `import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // Add useEffect to sync document title:

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
`,
      validationPattern:
        'useEffect\\s*\\(\\s*\\(\\s*\\)\\s*=>\\s*\\{.*document\\.title.*count.*\\}\\s*,\\s*\\[\\s*count\\s*\\]\\s*\\)',
      hints: [
        'useEffect takes a function and a dependency array: useEffect(() => { ... }, [count])',
        'Set the title: document.title = `Count: ${count}`;',
      ],
      explanation:
        'useEffect synchronizes your component with external systems. The dependency array tells React when to re-run the effect — only when the listed values change. This replaces class lifecycle methods like componentDidMount and componentDidUpdate.',
    },
    {
      id: 'rp3-s3',
      title: 'Implement useReducer for Complex State',
      instructions: `Refactor the counter to use useReducer instead of useState:
- Define a reducer function that handles "INCREMENT", "DECREMENT", and "RESET" actions
- Initialize state as { count: 0 }
- Dispatch actions from the buttons
- Add a third "Reset" button that dispatches the RESET action`,
      starterCode: `import { useReducer } from 'react';

// Define the reducer function:
function counterReducer(state, action) {

}

function Counter() {
  // Use useReducer:

  return (
    <div>
      <p>Count: {/* display count */}</p>
      <button>{/* Decrement */}</button>
      <button>{/* Increment */}</button>
      <button>{/* Reset */}</button>
    </div>
  );
}
`,
      validationPattern:
        'function\\s+counterReducer.*switch\\s*\\(\\s*action\\.type\\s*\\).*useReducer\\s*\\(\\s*counterReducer.*dispatch\\s*\\(',
      hints: [
        'The reducer uses a switch: switch (action.type) { case "INCREMENT": return { count: state.count + 1 }; ... }',
        'Initialize with useReducer: const [state, dispatch] = useReducer(counterReducer, { count: 0 })',
      ],
      explanation:
        'useReducer is preferred over useState when state logic is complex or when the next state depends on the previous one. It centralizes state transitions in a pure function, making them predictable and testable.',
    },
    {
      id: 'rp3-s4',
      title: 'Add Cleanup for a Timer',
      instructions: `Add an auto-increment feature to the counter:
- Use useEffect to set up a setInterval that increments count every 1000ms
- Return a cleanup function from useEffect that calls clearInterval
- Use an "isRunning" state (useState) to control whether the timer is active
- Add a "Start/Stop" toggle button`,
      starterCode: `import { useState, useEffect } from 'react';

function AutoCounter() {
  const [count, setCount] = useState(0);
  // Add isRunning state:

  // Add useEffect with setInterval and cleanup:

  return (
    <div>
      <p>Count: {count}</p>
      <button>{/* Toggle Start/Stop */}</button>
    </div>
  );
}
`,
      validationPattern:
        'useState\\s*\\(\\s*false\\s*\\).*useEffect\\s*\\(.*setInterval.*return\\s*\\(\\s*\\)\\s*=>.*clearInterval',
      hints: [
        'Store the interval ID: const id = setInterval(() => setCount(c => c + 1), 1000);',
        'Return a cleanup function: return () => clearInterval(id);',
      ],
      explanation:
        'Cleanup functions prevent memory leaks by tearing down side effects (timers, subscriptions, event listeners) when the component unmounts or before the effect re-runs. Always clean up what you set up.',
    },
  ],
};

export default project;
