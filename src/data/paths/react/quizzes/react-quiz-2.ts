import type { Quiz } from '../../../../types';

const reactQuiz2: Quiz = {
  id: 'react-quiz-2',
  moduleId: 'react-m2',
  title: 'React Fundamentals Quiz',
  questions: [
    {
      id: 'q1',
      question: 'How does the Virtual DOM improve performance compared to directly manipulating the real DOM?',
      options: [
        { key: 'a', text: 'It replaces the real DOM entirely so the browser never has to render HTML' },
        { key: 'b', text: 'It computes the minimal diff between the old and new virtual trees, then batches only the necessary changes to the real DOM' },
        { key: 'c', text: 'It caches the entire page in memory so re-renders are instant' },
        { key: 'd', text: 'It sends DOM updates to a Web Worker to avoid blocking the main thread' },
      ],
      correctKey: 'b',
      explanation: 'React maintains a lightweight in-memory copy of the DOM (the Virtual DOM). When state changes, it creates a new virtual tree, diffs it against the previous one, and applies only the minimal set of mutations to the real DOM. This avoids expensive full-page re-renders.',
    },
    {
      id: 'q2',
      question: 'JSX is compiled to which JavaScript function calls?',
      options: [
        { key: 'a', text: 'document.createElement()' },
        { key: 'b', text: 'React.render()' },
        { key: 'c', text: 'React.createElement()' },
        { key: 'd', text: 'ReactDOM.createNode()' },
      ],
      correctKey: 'c',
      explanation: 'JSX like <h1 className="title">Hello</h1> compiles to React.createElement("h1", { className: "title" }, "Hello"). JSX is syntactic sugar over these function calls, not a template language. This is why you must use className instead of class -- it is a JavaScript function argument, not HTML.',
    },
    {
      id: 'q3',
      question: 'Why does JSX use "className" instead of "class" for CSS classes?',
      options: [
        { key: 'a', text: 'React uses a different CSS engine that requires className' },
        { key: 'b', text: '"class" is a reserved keyword in JavaScript, so JSX uses "className" to avoid conflicts' },
        { key: 'c', text: '"className" is faster to parse than "class"' },
        { key: 'd', text: 'It is a convention with no technical reason behind it' },
      ],
      correctKey: 'b',
      explanation: 'Since JSX compiles to JavaScript function calls, and "class" is a reserved keyword in JavaScript (used for class declarations), React uses "className" to set CSS classes. Similarly, "for" becomes "htmlFor" because "for" is also a reserved keyword.',
    },
    {
      id: 'q4',
      question: 'What is the difference between props and state in a React component?',
      options: [
        { key: 'a', text: 'Props are mutable and state is immutable' },
        { key: 'b', text: 'Props are passed from parent to child and are read-only; state is owned by the component and can be updated to trigger re-renders' },
        { key: 'c', text: 'State is passed from parent to child; props are internal to the component' },
        { key: 'd', text: 'There is no difference; they are interchangeable terms' },
      ],
      correctKey: 'b',
      explanation: 'Props flow one-way from parent to child and are read-only -- a component cannot modify its own props. State is internal data owned and managed by the component itself. Updating state triggers a re-render. Think of props as function arguments and state as local variables.',
    },
    {
      id: 'q5',
      question: 'When rendering a list with .map() in React, why is the "key" prop required on each element?',
      options: [
        { key: 'a', text: 'Keys are used for CSS styling of list items' },
        { key: 'b', text: 'Keys let React efficiently track which items changed, were added, or removed during re-renders by matching elements across renders' },
        { key: 'c', text: 'Keys prevent duplicate items from appearing in the list' },
        { key: 'd', text: 'Keys are required by HTML specification for ordered lists' },
      ],
      correctKey: 'b',
      explanation: 'React uses keys to match elements between the old and new virtual DOM trees. Without stable keys, React cannot determine which items moved or changed and may incorrectly reuse component instances. Use unique, stable identifiers (like database IDs), not array indices, for dynamic lists.',
    },
    {
      id: 'q6',
      question: 'What is wrong with this JSX: <button onClick={handleClick()}>Submit</button>?',
      options: [
        { key: 'a', text: 'Nothing is wrong; this is correct syntax' },
        { key: 'b', text: 'handleClick() calls the function immediately during render instead of passing a reference; it should be onClick={handleClick}' },
        { key: 'c', text: 'onClick must use a string like onClick="handleClick()"' },
        { key: 'd', text: 'The button element does not support onClick in React' },
      ],
      correctKey: 'b',
      explanation: 'Writing handleClick() with parentheses invokes the function immediately during rendering, not on click. This likely causes unintended behavior or infinite loops. Pass the function reference without parentheses: onClick={handleClick}. If you need arguments, use an arrow wrapper: onClick={() => handleClick(id)}.',
    },
    {
      id: 'q7',
      question: 'In a controlled input, what happens if you set the value prop but do not provide an onChange handler?',
      options: [
        { key: 'a', text: 'The input works normally without any issues' },
        { key: 'b', text: 'The input becomes read-only because React locks the displayed value to state, and without onChange the state never updates' },
        { key: 'c', text: 'The input crashes the application with a runtime error' },
        { key: 'd', text: 'The input ignores the value prop and acts as an uncontrolled input' },
      ],
      correctKey: 'b',
      explanation: 'A controlled input ties its displayed value to React state via the value prop. Without an onChange handler to update the state, the value never changes, making the input appear frozen and unresponsive. React also logs a warning about providing value without onChange.',
    },
    {
      id: 'q8',
      question: 'Why must you call e.preventDefault() in a form\'s onSubmit handler in a React SPA?',
      options: [
        { key: 'a', text: 'To prevent React from crashing when the form data is invalid' },
        { key: 'b', text: 'To stop the browser from sending a traditional form request and reloading the page, since React handles submission via JavaScript' },
        { key: 'c', text: 'To prevent the browser from caching the form data' },
        { key: 'd', text: 'It is not necessary; React automatically prevents default form behavior' },
      ],
      correctKey: 'b',
      explanation: 'By default, submitting a form triggers a full page reload as the browser sends a GET/POST request. In a React SPA, you want to handle submission in JavaScript (e.g., via fetch), so you call e.preventDefault() to stop the default browser behavior. React does not do this automatically.',
    },
  ],
};

export default reactQuiz2;
