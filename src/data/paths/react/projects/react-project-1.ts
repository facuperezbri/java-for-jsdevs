import type { MiniProject } from '../../../../types';

const project: MiniProject = {
  id: 'react-project-1',
  moduleId: 'react-m1',
  title: 'Modern JS Toolkit',
  description:
    'Practice the modern JavaScript features that React relies on every day — destructuring, array methods, async/await, and ES modules.',
  estimatedMinutes: 5,
  steps: [
    {
      id: 'rp1-s1',
      title: 'Destructure Data from an Object',
      instructions: `Use object destructuring to extract "name" and "age" from a person object, and array destructuring to get the first two items from a colors array.

- Create a const { name, age } from a person object { name: "Alice", age: 30 }
- Create a const [first, second] from a colors array ["red", "green", "blue"]`,
      starterCode: `const person = { name: "Alice", age: 30 };
const colors = ["red", "green", "blue"];

// Destructure person:

// Destructure colors:
`,
      validationPattern:
        'const\\s*\\{\\s*name\\s*,\\s*age\\s*\\}\\s*=\\s*person.*const\\s*\\[\\s*first\\s*,\\s*second\\s*\\]\\s*=\\s*colors',
      hints: [
        'Object destructuring uses curly braces: const { key } = obj;',
        'Array destructuring uses square brackets: const [a, b] = arr;',
      ],
      explanation:
        'Destructuring is used everywhere in React — from extracting props in function components to pulling values out of useState. It keeps your code concise and readable.',
    },
    {
      id: 'rp1-s2',
      title: 'Transform Data with Array Methods',
      instructions: `Given an array of numbers, use map, filter, and reduce to transform data:

- Use .filter() to keep only numbers greater than 3
- Use .map() on the filtered result to double each number
- Use .reduce() to sum all the doubled numbers into a single total`,
      starterCode: `const numbers = [1, 2, 3, 4, 5, 6];

// Filter numbers greater than 3:
const filtered =

// Double the filtered numbers:
const doubled =

// Sum all doubled numbers:
const total =
`,
      validationPattern:
        'filter\\s*\\(.*>\\s*3.*\\).*\\.map\\s*\\(.*\\*\\s*2.*\\).*\\.reduce\\s*\\(',
      hints: [
        'filter takes a callback that returns true/false: .filter(n => n > 3)',
        'reduce takes an accumulator and current value: .reduce((sum, n) => sum + n, 0)',
      ],
      explanation:
        'React relies heavily on .map() to render lists and .filter() to conditionally show items. Understanding these array methods is essential before working with JSX.',
    },
    {
      id: 'rp1-s3',
      title: 'Create an Async Fetch Function',
      instructions: `Write an async function called "fetchUser" that:
- Takes a userId parameter
- Uses fetch() to call \`https://api.example.com/users/\${userId}\`
- Awaits the response and calls .json() on it
- Returns the parsed data
- Wraps everything in a try/catch block`,
      starterCode: `// Write the fetchUser async function:
`,
      validationPattern:
        'async\\s+function\\s+fetchUser\\s*\\(\\s*userId\\s*\\)\\s*\\{.*try\\s*\\{.*await\\s+fetch\\s*\\(.*\\).*\\.json\\(\\).*catch',
      hints: [
        'Start with: async function fetchUser(userId) {',
        'Use template literals for the URL: `https://api.example.com/users/${userId}`',
      ],
      explanation:
        'Async/await is the standard pattern for data fetching in React — whether in useEffect callbacks, event handlers, or server-side code. The try/catch pattern maps directly to loading/error states.',
    },
    {
      id: 'rp1-s4',
      title: 'Export and Import Modules',
      instructions: `Create a module that exports a named function and a default value:

- Write a named export function called "formatPrice" that takes a number and returns a string with a "$" prefix (e.g., "$9.99")
- Write a default export of an object called "config" with properties: { currency: "USD", locale: "en-US" }

Then write the import statement that would bring both into another file.`,
      starterCode: `// Named export:

// Default export:

// In another file, write the import:
// import ______ from './utils';
`,
      validationPattern:
        'export\\s+(function|const)\\s+formatPrice.*export\\s+default',
      hints: [
        'Named exports use the export keyword directly: export function formatPrice(n) { ... }',
        'Default exports: export default { currency: "USD", locale: "en-US" }',
      ],
      explanation:
        'ES modules are the backbone of React project structure. Named exports let you import specific functions, while default exports are common for components. Understanding both is critical for organizing React apps.',
    },
  ],
};

export default project;
