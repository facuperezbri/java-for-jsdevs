import type { Quiz } from '../../../../types';

const reactQuiz1: Quiz = {
  id: 'react-quiz-1',
  moduleId: 'react-m1',
  title: 'JS Essentials Quiz',
  questions: [
    {
      id: 'q1',
      question: 'What is the DOM and why does React abstract it away?',
      options: [
        { key: 'a', text: 'The DOM is a CSS rendering engine; React replaces it with inline styles' },
        { key: 'b', text: 'The DOM is the browser\'s in-memory tree of HTML elements; React abstracts it to handle updates efficiently via a Virtual DOM' },
        { key: 'c', text: 'The DOM is a JavaScript runtime; React replaces it with JSX compilation' },
        { key: 'd', text: 'The DOM is a server-side template language; React moves rendering to the client' },
      ],
      correctKey: 'b',
      explanation: 'The DOM (Document Object Model) is the browser\'s live, in-memory representation of your HTML as a tree of objects. React creates a Virtual DOM to compute minimal diffs and batch efficient updates, rather than forcing developers to manually query and mutate DOM nodes.',
    },
    {
      id: 'q2',
      question: 'What is the key difference between "let" and "const" in modern JavaScript?',
      options: [
        { key: 'a', text: '"let" is function-scoped and "const" is block-scoped' },
        { key: 'b', text: '"const" prevents reassignment of the variable binding, while "let" allows reassignment; both are block-scoped' },
        { key: 'c', text: '"const" makes objects and arrays immutable, while "let" does not' },
        { key: 'd', text: 'They are identical; "const" is just a convention for readability' },
      ],
      correctKey: 'b',
      explanation: 'Both let and const are block-scoped. The difference is that const prevents reassignment of the binding (you cannot write myConst = newValue), but it does NOT make objects/arrays deeply immutable -- you can still mutate properties or push to a const array.',
    },
    {
      id: 'q3',
      question: 'What does the following code output?\n\nconst nums = [1, 2, 3, 4, 5];\nconst result = nums.filter(n => n > 2).map(n => n * 10);\nconsole.log(result);',
      options: [
        { key: 'a', text: '[10, 20, 30, 40, 50]' },
        { key: 'b', text: '[3, 4, 5]' },
        { key: 'c', text: '[30, 40, 50]' },
        { key: 'd', text: '[30, 40, 50, undefined, undefined]' },
      ],
      correctKey: 'c',
      explanation: 'filter(n => n > 2) keeps [3, 4, 5], then map(n => n * 10) transforms each to [30, 40, 50]. These methods chain without mutating the original array, which is exactly why React relies on them for rendering lists.',
    },
    {
      id: 'q4',
      question: 'Why must you spread state when adding an item to an array in React instead of using .push()?',
      options: [
        { key: 'a', text: '.push() is slower than the spread operator' },
        { key: 'b', text: '.push() mutates the array in place and returns the new length, so React cannot detect the change since the reference stays the same' },
        { key: 'c', text: '.push() only works with numbers, not objects' },
        { key: 'd', text: 'The spread operator adds TypeScript type safety that .push() lacks' },
      ],
      correctKey: 'b',
      explanation: 'React uses reference equality to detect state changes. .push() mutates the existing array without creating a new reference, so React sees the same array object and skips re-rendering. Spreading creates a new array: setItems([...items, newItem]).',
    },
    {
      id: 'q5',
      question: 'What happens when you call await inside an async function?',
      options: [
        { key: 'a', text: 'It blocks the entire JavaScript program until the Promise resolves' },
        { key: 'b', text: 'It pauses only the async function, returning control to the caller, and resumes when the Promise resolves' },
        { key: 'c', text: 'It immediately resolves the Promise and returns the value synchronously' },
        { key: 'd', text: 'It creates a new thread to handle the asynchronous work' },
      ],
      correctKey: 'b',
      explanation: 'await pauses execution of the async function at that point and yields control back to the calling code. The rest of the program continues running. When the awaited Promise resolves, the async function resumes from where it paused. JavaScript is single-threaded and does not create new threads.',
    },
    {
      id: 'q6',
      question: 'Why does fetch() NOT reject on HTTP 404 or 500 errors?',
      options: [
        { key: 'a', text: 'It is a bug in the fetch API that was never fixed' },
        { key: 'b', text: 'fetch() only rejects on network failures (no connection); HTTP errors are valid responses that you must check via response.ok or response.status' },
        { key: 'c', text: 'fetch() always resolves successfully regardless of any error' },
        { key: 'd', text: 'HTTP 404 and 500 are not considered errors by the HTTP specification' },
      ],
      correctKey: 'b',
      explanation: 'fetch() rejects only when the network request cannot be completed (e.g., DNS failure, no internet). An HTTP 404 or 500 is a valid server response -- the request succeeded at the network level. You must check response.ok (which is true for status 200-299) to detect HTTP-level errors.',
    },
    {
      id: 'q7',
      question: 'What is the difference between a named export and a default export in ES modules?',
      options: [
        { key: 'a', text: 'Named exports are faster; default exports are slower' },
        { key: 'b', text: 'A file can have multiple named exports but only one default export; named imports use curly braces { }, default imports do not' },
        { key: 'c', text: 'Default exports are for classes and named exports are for functions' },
        { key: 'd', text: 'Named exports work only in Node.js; default exports work only in browsers' },
      ],
      correctKey: 'b',
      explanation: 'A module can have many named exports (import { add, multiply } from "./math") but only one default export (import Calculator from "./Calculator"). The convention in React is: components use default exports, while utilities, hooks, and constants use named exports.',
    },
    {
      id: 'q8',
      question: 'Given: const { name, age, ...rest } = { name: "Alice", age: 30, role: "dev", active: true };\nWhat does "rest" contain?',
      options: [
        { key: 'a', text: '{ name: "Alice", age: 30, role: "dev", active: true }' },
        { key: 'b', text: '["role", "active"]' },
        { key: 'c', text: '{ role: "dev", active: true }' },
        { key: 'd', text: 'undefined' },
      ],
      correctKey: 'c',
      explanation: 'The rest operator (...rest) in object destructuring collects all remaining properties that were not explicitly destructured. Since name and age were extracted, rest contains the leftover: { role: "dev", active: true }. In React, this pattern is used to forward remaining props: const { className, ...rest } = props.',
    },
  ],
};

export default reactQuiz1;
