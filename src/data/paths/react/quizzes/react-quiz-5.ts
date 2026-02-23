import type { Quiz } from '../../../../types';

const reactQuiz5: Quiz = {
  id: 'react-quiz-5',
  moduleId: 'react-m5',
  title: 'React 18+ Quiz',
  questions: [
    {
      id: 'q1',
      question: 'What must you change in your app entry point to enable concurrent features in React 18?',
      options: [
        { key: 'a', text: 'Add the "concurrent" flag to React.StrictMode' },
        { key: 'b', text: 'Replace ReactDOM.render() with createRoot() from react-dom/client' },
        { key: 'c', text: 'Install a separate @react/concurrent package' },
        { key: 'd', text: 'Nothing -- React 18 enables concurrent features automatically for all render methods' },
      ],
      correctKey: 'b',
      explanation: 'You must switch from ReactDOM.render(element, container) to createRoot(container).render(element). This is an explicit opt-in to concurrent rendering. Without createRoot, React 18 runs in legacy mode with the same behavior as React 17.',
    },
    {
      id: 'q2',
      question: 'In React 17, state updates inside a setTimeout were NOT batched. What changed in React 18?',
      options: [
        { key: 'a', text: 'Nothing changed -- setTimeout updates are still not batched' },
        { key: 'b', text: 'React 18 automatically batches ALL state updates regardless of where they happen -- event handlers, promises, setTimeout, and native events' },
        { key: 'c', text: 'setTimeout state updates are now forbidden and throw an error' },
        { key: 'd', text: 'You must wrap setTimeout updates in flushSync() for batching' },
      ],
      correctKey: 'b',
      explanation: 'React 18 introduces automatic batching everywhere. In React 17, only event handler updates were batched. In React 18 with createRoot, updates inside promises, setTimeout, native events, and any other context are all batched into a single re-render, reducing unnecessary renders.',
    },
    {
      id: 'q3',
      question: 'What does useTransition allow you to do?',
      options: [
        { key: 'a', text: 'Animate elements transitioning between CSS states' },
        { key: 'b', text: 'Mark state updates as non-urgent so React keeps the UI responsive with the current content while rendering the new content in the background' },
        { key: 'c', text: 'Transition between different React component libraries' },
        { key: 'd', text: 'Create smooth page transitions between routes' },
      ],
      correctKey: 'b',
      explanation: 'useTransition returns [isPending, startTransition]. Wrapping a state update in startTransition tells React it is non-urgent. React processes urgent updates first (like typing) and defers the transition render. If new urgent work arrives, React can interrupt the transition. isPending indicates whether the transition is still rendering.',
    },
    {
      id: 'q4',
      question: 'When should you use useDeferredValue instead of useTransition?',
      options: [
        { key: 'a', text: 'When you need CSS animation support' },
        { key: 'b', text: 'When the value comes from outside your control (props, context) and you cannot wrap the state update in startTransition' },
        { key: 'c', text: 'When the state is a primitive type like a number or string' },
        { key: 'd', text: 'Never -- useDeferredValue is deprecated in favor of useTransition' },
      ],
      correctKey: 'b',
      explanation: 'Use useTransition when you control the state update and can wrap it in startTransition. Use useDeferredValue when the value comes from outside (props, context, parent component) and you cannot control how it is set. Both achieve the same goal: keeping the UI responsive during heavy renders.',
    },
    {
      id: 'q5',
      question: 'What does Suspense display while a lazy-loaded component or data source is loading?',
      options: [
        { key: 'a', text: 'A blank white screen' },
        { key: 'b', text: 'The fallback UI specified by the closest Suspense boundary\'s fallback prop' },
        { key: 'c', text: 'The previous version of the component' },
        { key: 'd', text: 'An automatically generated loading spinner' },
      ],
      correctKey: 'b',
      explanation: 'When a child component suspends (either from React.lazy or a Suspense-compatible data source), the nearest Suspense boundary renders its fallback prop. You define what the fallback looks like -- typically a spinner or skeleton. Multiple nested Suspense boundaries let different sections of the page load independently.',
    },
    {
      id: 'q6',
      question: 'What are the key constraints of React Server Components?',
      options: [
        { key: 'a', text: 'They cannot import CSS files or use TypeScript' },
        { key: 'b', text: 'They cannot use useState, useEffect, event handlers (onClick), or browser APIs -- they run exclusively on the server' },
        { key: 'c', text: 'They must be written as class components, not functions' },
        { key: 'd', text: 'They can only render static HTML without any JavaScript expressions' },
      ],
      correctKey: 'b',
      explanation: 'Server Components run on the server only and ship zero JavaScript to the client. They cannot use React hooks (useState, useEffect), attach event handlers, or access browser APIs. They CAN be async, access databases directly, and use heavy libraries without affecting client bundle size. Interactivity requires opting into a Client Component with "use client".',
    },
    {
      id: 'q7',
      question: 'What does the useId hook solve that Math.random() or an incrementing counter cannot?',
      options: [
        { key: 'a', text: 'useId generates shorter IDs that take less memory' },
        { key: 'b', text: 'useId generates deterministic IDs that are consistent between server-side rendering and client hydration, preventing mismatches' },
        { key: 'c', text: 'useId creates globally unique IDs across all browser tabs' },
        { key: 'd', text: 'useId automatically attaches the ID to the nearest DOM element' },
      ],
      correctKey: 'b',
      explanation: 'With SSR, the server and client must produce the same HTML. Math.random() generates different values on each run, causing hydration mismatches. An incrementing counter can differ if components render in different order. useId produces deterministic IDs based on the component tree position, matching on both server and client.',
    },
    {
      id: 'q8',
      question: 'What makes the use() hook unique compared to all other React hooks?',
      options: [
        { key: 'a', text: 'It is the only hook that works in class components' },
        { key: 'b', text: 'It can be called inside conditionals, loops, and after early returns -- unlike all other hooks which must follow the Rules of Hooks' },
        { key: 'c', text: 'It is the only hook that accepts TypeScript generics' },
        { key: 'd', text: 'It automatically memoizes its return value' },
      ],
      correctKey: 'b',
      explanation: 'All React hooks (useState, useEffect, useContext, etc.) must be called at the top level of a component, unconditionally, in the same order every render. use() is the exception: it can be called inside if statements, loops, and after early returns. It can read both promises (integrating with Suspense) and context values.',
    },
  ],
};

export default reactQuiz5;
