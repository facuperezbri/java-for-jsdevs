import type { Quiz } from '../../../../types';

const reactQuiz3: Quiz = {
  id: 'react-quiz-3',
  moduleId: 'react-m3',
  title: 'State & Lifecycle Quiz',
  questions: [
    {
      id: 'q1',
      question: 'What is the key difference between how this.setState() and a useState setter handle object state?',
      options: [
        { key: 'a', text: 'this.setState() replaces the entire state object; useState setter performs a shallow merge' },
        { key: 'b', text: 'this.setState() performs a shallow merge of the provided fields; useState setter replaces the entire value' },
        { key: 'c', text: 'They behave identically -- both replace the entire state' },
        { key: 'd', text: 'They behave identically -- both perform a shallow merge' },
      ],
      correctKey: 'b',
      explanation: 'In class components, this.setState({ age: 26 }) merges only the age field into the existing state, preserving other fields. With hooks, the setter replaces the entire value, so setState({ age: 26 }) would lose all other fields. You must spread manually: setState(prev => ({ ...prev, age: 26 })).',
    },
    {
      id: 'q2',
      question: 'What does useEffect(() => { ... }, []) with an empty dependency array correspond to in class components?',
      options: [
        { key: 'a', text: 'componentDidUpdate' },
        { key: 'b', text: 'componentDidMount' },
        { key: 'c', text: 'componentWillUnmount' },
        { key: 'd', text: 'shouldComponentUpdate' },
      ],
      correctKey: 'b',
      explanation: 'An empty dependency array [] tells React to run the effect only once, after the initial render -- equivalent to componentDidMount. Without the array, the effect runs after every render (mount + every update). With specific dependencies [x, y], it runs when those values change.',
    },
    {
      id: 'q3',
      question: 'You call setCount(count + 1) three times in the same event handler. If count starts at 0, what will the final count be after the re-render?',
      options: [
        { key: 'a', text: '3' },
        { key: 'b', text: '1' },
        { key: 'c', text: '2' },
        { key: 'd', text: '0' },
      ],
      correctKey: 'b',
      explanation: 'All three calls read count as 0 (its value during the current render, captured by closure) and schedule an update to 0 + 1 = 1. React batches these, and the last value wins. To increment three times, use the functional updater: setCount(prev => prev + 1), which always reads the latest pending state.',
    },
    {
      id: 'q4',
      question: 'When should you choose useReducer over useState?',
      options: [
        { key: 'a', text: 'Always -- useReducer is strictly better than useState' },
        { key: 'b', text: 'Only for boolean toggle state' },
        { key: 'c', text: 'When state has multiple sub-values that change together or when transitions involve complex logic with many actions' },
        { key: 'd', text: 'Only when using TypeScript, since useReducer provides better type inference' },
      ],
      correctKey: 'c',
      explanation: 'useReducer is ideal when state logic is complex: multiple related sub-values, many different actions (add, delete, toggle, sort), or when the next state depends on the previous in intricate ways. It centralizes transitions in a pure reducer function that is easy to test. For simple, independent values, useState is cleaner.',
    },
    {
      id: 'q5',
      question: 'Two sibling components need to share the same piece of state. Where should the state live?',
      options: [
        { key: 'a', text: 'Each sibling should maintain its own copy of the state and synchronize via events' },
        { key: 'b', text: 'In the closest common parent component, passed down to each sibling via props' },
        { key: 'c', text: 'In a global variable outside the component tree' },
        { key: 'd', text: 'In the browser\'s localStorage' },
      ],
      correctKey: 'b',
      explanation: 'This is the "lifting state up" pattern. The state moves to the closest common parent, which passes the value down as props and passes a callback function for updates. This ensures a single source of truth and maintains React\'s one-way data flow.',
    },
    {
      id: 'q6',
      question: 'What does the cleanup function returned from useEffect do?',
      options: [
        { key: 'a', text: 'It runs before the component mounts to prepare the DOM' },
        { key: 'b', text: 'It runs when the component unmounts AND before the effect re-runs on dependency changes, to tear down the previous effect' },
        { key: 'c', text: 'It runs only when the user navigates away from the page' },
        { key: 'd', text: 'It automatically cancels all pending state updates' },
      ],
      correctKey: 'b',
      explanation: 'The cleanup function runs in two scenarios: (1) when the component unmounts, and (2) before the effect re-runs when dependencies change. This allows tearing down the previous subscription/timer before setting up a new one, preventing memory leaks and stale data.',
    },
    {
      id: 'q7',
      question: 'Why is it important to use AbortController when fetching data inside useEffect?',
      options: [
        { key: 'a', text: 'AbortController makes fetch requests faster' },
        { key: 'b', text: 'It prevents race conditions: if the component unmounts or dependencies change, the in-flight request is canceled so its stale response does not update state' },
        { key: 'c', text: 'AbortController is required by the fetch API specification' },
        { key: 'd', text: 'Without it, the browser limits you to one concurrent request' },
      ],
      correctKey: 'b',
      explanation: 'Without AbortController, if a dependency changes rapidly (e.g., userId: A -> B -> C), responses can arrive out of order and stale data overwrites fresh data. AbortController cancels the previous request in the cleanup function, ensuring only the latest response is used.',
    },
    {
      id: 'q8',
      question: 'What is the output when value changes from "A" to "B"?\n\nuseEffect(() => {\n  console.log("Effect:", value);\n  return () => console.log("Cleanup:", value);\n}, [value]);',
      options: [
        { key: 'a', text: 'Effect: B' },
        { key: 'b', text: 'Cleanup: B, then Effect: B' },
        { key: 'c', text: 'Cleanup: A, then Effect: B' },
        { key: 'd', text: 'Effect: B, then Cleanup: A' },
      ],
      correctKey: 'c',
      explanation: 'When value changes, React first runs the cleanup from the previous effect (which captured value as "A", so it logs "Cleanup: A"), then runs the new effect (with value "B", logging "Effect: B"). Cleanup always runs with the values from the render that created it.',
    },
  ],
};

export default reactQuiz3;
