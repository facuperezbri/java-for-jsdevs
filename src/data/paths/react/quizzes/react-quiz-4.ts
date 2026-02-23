import type { Quiz } from '../../../../types';

const reactQuiz4: Quiz = {
  id: 'react-quiz-4',
  moduleId: 'react-m4',
  title: 'Advanced Patterns Quiz',
  questions: [
    {
      id: 'q1',
      question: 'What problem does the Context API solve that props alone cannot?',
      options: [
        { key: 'a', text: 'Context makes components render faster by caching props' },
        { key: 'b', text: 'Context allows passing data through the component tree without manually threading props through every intermediate level (prop drilling)' },
        { key: 'c', text: 'Context replaces the need for state management entirely' },
        { key: 'd', text: 'Context allows child components to modify parent state directly' },
      ],
      correctKey: 'b',
      explanation: 'Context lets you broadcast data (like theme, locale, or auth state) to any component in the subtree without passing it as props through every level. It is like a radio broadcast: the Provider sends and any consumer can tune in, regardless of depth in the tree.',
    },
    {
      id: 'q2',
      question: 'Why should you memoize the value object passed to a Context Provider?',
      options: [
        { key: 'a', text: 'It is required by the Context API or an error is thrown' },
        { key: 'b', text: 'Creating a new object on every render changes the reference, causing ALL context consumers to re-render unnecessarily' },
        { key: 'c', text: 'Memoization makes context values available synchronously' },
        { key: 'd', text: 'It prevents the Provider from unmounting during re-renders' },
      ],
      correctKey: 'b',
      explanation: 'If the Provider creates value={{ theme, toggle }} inline, a new object reference is created every render. React sees a different reference and re-renders every consumer even if theme and toggle have not changed. Wrapping with useMemo stabilizes the reference so consumers re-render only when actual data changes.',
    },
    {
      id: 'q3',
      question: 'What is the difference between storing a value in useState versus useRef?',
      options: [
        { key: 'a', text: 'useState is for strings and numbers; useRef is for objects and arrays' },
        { key: 'b', text: 'Updating useState triggers a re-render; updating useRef.current does not trigger a re-render' },
        { key: 'c', text: 'useRef values reset on every render; useState values persist' },
        { key: 'd', text: 'There is no difference; they are interchangeable' },
      ],
      correctKey: 'b',
      explanation: 'useState is for values the UI depends on -- updating it triggers a re-render. useRef stores mutable values that persist across renders (timer IDs, DOM nodes, previous values) without causing re-renders. Use useState when the screen should update; use useRef when it should not.',
    },
    {
      id: 'q4',
      question: 'Which types of errors do error boundaries NOT catch?',
      options: [
        { key: 'a', text: 'Errors in child component render methods' },
        { key: 'b', text: 'Errors in event handlers, async code (promises), and server-side rendering' },
        { key: 'c', text: 'Errors in class component constructors' },
        { key: 'd', text: 'Errors thrown by useState initializers' },
      ],
      correctKey: 'b',
      explanation: 'Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of child components. They do NOT catch errors in event handlers (use try/catch), async code (promises/setTimeout), SSR, or errors in the boundary itself. This is a common source of confusion.',
    },
    {
      id: 'q5',
      question: 'Why have custom hooks largely replaced Higher-Order Components (HOCs) in modern React?',
      options: [
        { key: 'a', text: 'HOCs are deprecated and will be removed in the next React version' },
        { key: 'b', text: 'Custom hooks avoid wrapper hell in DevTools, eliminate prop name collisions, and compose naturally by calling other hooks' },
        { key: 'c', text: 'HOCs do not work with functional components' },
        { key: 'd', text: 'Custom hooks are faster because they skip the Virtual DOM' },
      ],
      correctKey: 'b',
      explanation: 'HOCs create deeply nested wrapper components in DevTools, risk prop collisions (two HOCs injecting the same prop name), and make it hard to trace where data comes from. Custom hooks are flat function calls with explicit return values, compose by calling each other, and add zero wrapper layers.',
    },
    {
      id: 'q6',
      question: 'React.memo wraps a function component. When does the wrapped component skip re-rendering?',
      options: [
        { key: 'a', text: 'Always -- React.memo prevents all re-renders' },
        { key: 'b', text: 'When its props are shallowly equal to the previous render\'s props' },
        { key: 'c', text: 'When the parent component does not re-render' },
        { key: 'd', text: 'When the component has no children' },
      ],
      correctKey: 'b',
      explanation: 'React.memo performs a shallow comparison of all props. If every prop has the same value (by reference for objects/functions), the component skips re-rendering. This is why inline functions break memoization -- a new function reference is created each render, failing the shallow comparison.',
    },
    {
      id: 'q7',
      question: 'A parent passes an inline onClick handler to a React.memo child. The child still re-renders on every parent update. What is the fix?',
      options: [
        { key: 'a', text: 'Remove React.memo from the child component' },
        { key: 'b', text: 'Wrap the handler in useCallback so its reference stays stable across renders' },
        { key: 'c', text: 'Move the handler definition inside the child component' },
        { key: 'd', text: 'Use useRef to store the handler instead of declaring it as a function' },
      ],
      correctKey: 'b',
      explanation: 'Inline functions are recreated as new references on every render. React.memo sees a "different" onClick each time and allows the re-render. useCallback memoizes the function reference, keeping it stable so React.memo can correctly skip re-rendering when the function has not logically changed.',
    },
    {
      id: 'q8',
      question: 'What is the relationship between useMemo and useCallback?',
      options: [
        { key: 'a', text: 'They are unrelated hooks with completely different purposes' },
        { key: 'b', text: 'useMemo is for primitive values; useCallback is for objects' },
        { key: 'c', text: 'useCallback(fn, deps) is equivalent to useMemo(() => fn, deps) -- useCallback memoizes the function itself while useMemo memoizes a computed value' },
        { key: 'd', text: 'useMemo replaces useCallback in React 18; useCallback is deprecated' },
      ],
      correctKey: 'c',
      explanation: 'useMemo(() => expensiveCalc(), deps) caches the result of a computation. useCallback(fn, deps) caches the function reference itself. useCallback(fn, deps) is exactly equivalent to useMemo(() => fn, deps). Use useMemo for computed values, useCallback for stable function references passed to memoized children.',
    },
  ],
};

export default reactQuiz4;
