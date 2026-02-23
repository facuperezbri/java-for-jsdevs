import type { Module } from '../../../../types';
import project1 from '../projects/react-project-1';

const module: Module = {
  id: 'react-m1',
  order: 1,
  title: 'JS Essentials for React',
  subtitle: 'Modern JavaScript foundations every React developer needs',
  icon: '⚡',
  accentColor: 'cyan',
  quizId: 'react-quiz-1',
  project: project1,
  lessons: [
    // ─── Lesson 1: The DOM & Browsers ──────────────────────────────────────────
    {
      id: 'lesson-r1-1',
      moduleId: 'react-m1',
      title: 'The DOM & Browsers',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'What Is the DOM?',
          explanation:
            'The DOM (Document Object Model) is the browser\'s in-memory representation of your HTML page as a tree of objects. Every HTML element becomes a node you can read and manipulate with JavaScript. React exists precisely to abstract this away, but understanding the DOM is essential for debugging and performance.',
          analogy:
            'Think of the DOM as a live blueprint of a building. You can walk through the blueprint, find any room (element), and remodel it. Vanilla JS hands you a toolbox to do the remodeling yourself; React hires a contractor (the reconciler) to do it efficiently for you.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// The DOM is a tree of nodes
// <div id="app">
//   <h1>Hello</h1>
//   <p>World</p>
// </div>

const app = document.getElementById('app');
console.log(app.children.length); // 2
console.log(app.children[0].textContent); // "Hello"

// Walk the tree
const h1 = app.querySelector('h1');
console.log(h1.parentElement.id); // "app"`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// React builds a virtual DOM for you
// You describe WHAT you want, not HOW to find it

function App() {
  return (
    <div id="app">
      <h1>Hello</h1>
      <p>World</p>
    </div>
  );
}

// No document.getElementById needed!
// React handles the DOM tree internally`,
            },
            caption:
              'Vanilla JS requires you to manually query and traverse the DOM tree. React lets you declare your UI structure and manages the DOM for you.',
          },
        },
        {
          id: 'c2',
          title: 'Selecting & Modifying Elements',
          explanation:
            'Vanilla JS provides methods like getElementById, querySelector, and querySelectorAll to find elements in the DOM. Once you have a reference, you can change its content, styles, and attributes directly. React replaces all of this with declarative JSX -- you describe the desired state, and React figures out what to update.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// Select elements from the DOM
const title = document.querySelector('.title');
const items = document.querySelectorAll('.item');

// Modify content and style
title.textContent = 'Updated Title';
title.style.color = 'blue';
title.classList.add('active');

// Modify attributes
const link = document.querySelector('a');
link.setAttribute('href', 'https://example.com');
link.setAttribute('target', '_blank');`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// React: declare UI based on state
function Page({ isActive }) {
  const [title, setTitle] = useState('Initial Title');

  return (
    <>
      <h1
        className={isActive ? 'title active' : 'title'}
        style={{ color: 'blue' }}
      >
        {title}
      </h1>
      <a href="https://example.com" target="_blank">
        Click me
      </a>
    </>
  );
}`,
            },
            caption:
              'Vanilla JS imperatively mutates the DOM. React declaratively describes what the DOM should look like based on your data.',
          },
          callout: {
            type: 'tip',
            text: 'In React, you rarely touch the DOM directly. Instead of querySelector + mutation, you use state variables and JSX. When the state changes, React automatically updates only the DOM nodes that need it.',
          },
        },
        {
          id: 'c3',
          title: 'Creating Elements & Event Listeners',
          explanation:
            'In vanilla JS, creating new elements requires multiple imperative steps: createElement, set properties, then appendChild. Attaching event listeners means calling addEventListener on each element. React simplifies both by letting you write elements inline as JSX and attach handlers directly as props.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// Create a button and add it to the page
const button = document.createElement('button');
button.textContent = 'Click me';
button.className = 'btn primary';

button.addEventListener('click', () => {
  alert('Button clicked!');
});

// Must manually insert into the DOM
const container = document.getElementById('root');
container.appendChild(button);

// Cleanup: remove listener to avoid memory leaks
// button.removeEventListener('click', handler);`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// React: declare elements and handlers inline
function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div id="root">
      <button className="btn primary" onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}

// React handles creation, insertion, and cleanup
// No manual appendChild or removeEventListener`,
            },
            caption:
              'Vanilla JS requires createElement + appendChild + addEventListener. React lets you write it all declaratively in JSX.',
          },
          challenge: {
            id: 'ch-r1-1-1',
            type: 'fill-blank',
            prompt:
              'Complete the vanilla JS code to create a paragraph, set its text, and add it to the page:',
            code: `const p = document.___BLANK_1___('p');
p.___BLANK_2___ = 'Hello, world!';
document.body.___BLANK_3___(p);`,
            blanks: [
              { id: 'b1', expected: ['createElement'], hint: 'method to create a new DOM element' },
              { id: 'b2', expected: ['textContent'], hint: 'property to set the text inside an element' },
              { id: 'b3', expected: ['appendChild'], hint: 'method to insert a child element' },
            ],
            explanation:
              'document.createElement creates a new DOM node, textContent sets its text, and appendChild inserts it into the parent. In React, you would simply write <p>Hello, world!</p> in your JSX.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'Why do you think React was created to abstract away direct DOM manipulation? What problems does manual DOM management cause in large applications?',
          hint: 'Think about what happens when you have hundreds of elements that all depend on different pieces of data, and that data changes frequently.',
          answer:
            'Manual DOM manipulation becomes unwieldy in complex apps because you must track which elements need updating when data changes, manually synchronize state with the UI, and handle cleanup (removing listeners, nodes). Bugs creep in when you forget to update a node or remove a listener. React solves this with a declarative model: you describe the desired UI for each state, and React efficiently diffs and patches the real DOM.',
        },
      ],
      predictOutputs: [
        {
          id: 'po-r1-1-1',
          code: `const div = document.createElement('div');
div.id = 'box';
div.textContent = 'Hello';
document.body.appendChild(div);

const found = document.getElementById('box');
console.log(found.textContent);
console.log(found === div);`,
          language: 'javascript',
          expectedOutput: 'Hello\ntrue',
          explanation:
            'After creating the div and appending it to the body, getElementById finds the same node we just created. found.textContent is "Hello" because that is what we set. found === div is true because they are literally the same object in memory -- getElementById returns a reference to the exact DOM node.',
          hint: 'getElementById returns a reference to the DOM node, not a copy.',
        },
      ],
    },

    // ─── Lesson 2: Modern JS Syntax ────────────────────────────────────────────
    {
      id: 'lesson-r1-2',
      moduleId: 'react-m1',
      title: 'Modern JS Syntax',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'let, const & Block Scoping',
          explanation:
            'React code uses const by default and let when reassignment is needed. var is essentially never used in modern React because of its confusing function-scoping behavior. Understanding the difference is critical because React components rely on closures and block scoping working predictably.',
          analogy:
            'Think of var as a label that floats up to the nearest room (function). let and const are labels that stay on the exact shelf (block) where you placed them. React hooks depend on variables staying exactly where you declared them.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// var is function-scoped (hoisted)
function example() {
  console.log(x); // undefined (hoisted!)
  var x = 10;

  if (true) {
    var y = 20; // leaks out of the if block!
  }
  console.log(y); // 20 -- var ignores block scope
}

// let/const are block-scoped
function better() {
  // console.log(a); // ReferenceError!
  let a = 10;
  const b = 20;

  if (true) {
    let c = 30;
  }
  // console.log(c); // ReferenceError!
}`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// React components always use const/let
function UserProfile({ userId }) {
  // const for values that won't be reassigned
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // const for functions (they're values too)
  const fetchUser = async () => {
    const response = await fetch(\`/api/users/\${userId}\`);
    const data = await response.json();
    setUser(data);
    setLoading(false);
  };

  // let is rare in React -- mostly const
  let statusText = 'Active';
  if (user?.suspended) {
    statusText = 'Suspended';
  }

  return <p>{statusText}</p>;
}`,
            },
            caption:
              'Modern React code is almost entirely const. Use let only when you truly need reassignment.',
          },
          callout: {
            type: 'gotcha',
            text: 'Never use var in React code. Its hoisting and function-scoping behavior leads to subtle bugs, especially inside loops and event handlers where closures capture variables.',
          },
        },
        {
          id: 'c2',
          title: 'Arrow Functions',
          explanation:
            'Arrow functions are the default in React for inline handlers, callbacks, and component definitions. They offer concise syntax and, crucially, they do not have their own "this" binding -- they inherit "this" from their surrounding scope. This eliminates the classic "this" confusion in event handlers.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function equivalents
const add = (a, b) => a + b;

// Single param: parentheses optional
const double = n => n * 2;

// Multi-line body: need braces + return
const greet = (name) => {
  const message = \`Hello, \${name}!\`;
  return message;
};

// "this" behavior difference
const obj = {
  name: 'Alice',
  // Arrow inherits "this" from outer scope
  greet: () => console.log(this.name), // undefined!
  // Regular function gets its own "this"
  hello() { console.log(this.name); }  // "Alice"
};`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// Arrow functions dominate React code
const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

// Inline event handlers
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(prev => prev - 1)}>
        Decrement
      </button>
    </div>
  );
}

// Callbacks in hooks
useEffect(() => {
  console.log('Component mounted');
  return () => console.log('Cleanup');
}, []);`,
            },
            caption:
              'Arrow functions are everywhere in React: component definitions, event handlers, hook callbacks, and state updater functions.',
          },
        },
        {
          id: 'c3',
          title: 'Template Literals, Destructuring & Optional Chaining',
          explanation:
            'These three features appear on nearly every line of React code. Template literals build dynamic strings. Destructuring unpacks props, state, and API responses. Optional chaining safely accesses nested data that might be null or undefined -- essential when rendering data from async API calls.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// Template literals
const greeting = \`Hello, \${user.name}!\`;
const url = \`/api/users/\${id}/posts\`;

// Destructuring objects
const { name, age, email } = user;
const { data: users, error } = response;

// Destructuring arrays
const [first, second, ...rest] = items;

// Optional chaining
const city = user?.address?.city;
const zip = user?.address?.zip ?? 'N/A';

// Combining them
const { name = 'Anonymous' } = user ?? {};`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// All three are core to React patterns

// Destructuring props directly in the signature
function UserCard({ name, email, address }) {
  // Optional chaining for nested/nullable data
  const city = address?.city ?? 'Unknown';

  // Template literals for dynamic content
  const avatarUrl = \`/avatars/\${name.toLowerCase()}.png\`;

  // Destructuring state from hooks
  const [isOpen, setIsOpen] = useState(false);
  const { data, error, loading } = useFetch('/api/user');

  return (
    <div className={\`card \${isOpen ? 'expanded' : ''}\`}>
      <img src={avatarUrl} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
      <p>City: {city}</p>
    </div>
  );
}`,
            },
            caption:
              'Destructuring props, optional chaining for API data, and template literals for dynamic strings are the bread and butter of React components.',
          },
          callout: {
            type: 'tip',
            text: 'The ?? (nullish coalescing) operator only falls back for null/undefined, unlike || which also catches 0, "", and false. In React, prefer ?? when providing default values for data that might legitimately be 0 or an empty string.',
          },
          challenge: {
            id: 'ch-r1-2-1',
            type: 'fill-blank',
            prompt:
              'Complete the destructuring and optional chaining in this React component:',
            code: `function Profile({ ___BLANK_1___, bio, social }) {
  const website = social___BLANK_2___website ?? 'No website';
  const greeting = \`Welcome, ___BLANK_3___!\`;

  return <p>{greeting} - {website}</p>;
}`,
            blanks: [
              { id: 'b1', expected: ['name'], hint: 'destructured prop for the user\'s name' },
              { id: 'b2', expected: ['?.'], hint: 'operator for safe property access' },
              { id: 'b3', expected: ['${name}'], hint: 'template literal interpolation' },
            ],
            explanation:
              'Props are destructured directly in the function signature. Optional chaining (?.) safely accesses social.website even if social is null/undefined. Template literals use ${} to embed expressions inside backtick strings.',
          },
        },
      ],
      translationDrills: [
        {
          id: 'td-r1-2-1',
          sourceLabel: 'Vanilla JS',
          sourceCode: `function getGreeting(user) {
  const name = user.name;
  const age = user.age;
  return 'Hello, ' + name + '! Age: ' + age;
}`,
          targetLabel: 'React',
          targetTemplate: `const getGreeting = (___SLOT_1___) => {
  return ___SLOT_2___Hello, ___SLOT_3___! Age: ___SLOT_4___\`;
};`,
          slots: [
            { id: 'slot-1', expected: '{ name, age }' },
            { id: 'slot-2', expected: '`' },
            { id: 'slot-3', expected: '${name}' },
            { id: 'slot-4', expected: '${age}' },
          ],
          tokenBank: [
            '{ name, age }',
            '`',
            '${name}',
            '${age}',
            'user.name',
            'user.age',
            '(user)',
            '"',
          ],
          explanation:
            'Modern React-style JS uses destructuring in the parameter list to unpack the object directly, arrow functions instead of the function keyword, and template literals with ${} instead of string concatenation.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'Why do arrow functions solve the classic "this" problem in event handlers, and why does that matter less in modern React with hooks?',
          hint: 'Think about class components vs function components and how "this" binding works in each.',
          answer:
            'In class-based React, event handlers written as regular methods lose their "this" binding when passed as callbacks. Arrow functions inherit "this" from the enclosing scope, fixing the problem. In modern React with hooks, components are plain functions -- there is no "this" at all. State lives in hooks (useState), not on a class instance, making the "this" issue irrelevant.',
        },
      ],
    },

    // ─── Lesson 3: Arrays & Functional Patterns ────────────────────────────────
    {
      id: 'lesson-r1-3',
      moduleId: 'react-m1',
      title: 'Arrays & Functional Patterns',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'map, filter & reduce',
          explanation:
            'These three array methods are the workhorses of React rendering. map transforms arrays into lists of JSX elements. filter removes items before rendering. reduce aggregates data for summaries and computed values. They all return new arrays without mutating the original -- which is exactly what React needs.',
          analogy:
            'Think of map as a factory assembly line that transforms each item. filter is a quality inspector that removes defective items. reduce is the accountant who tallies everything into a single summary. None of them change the original inventory.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `const users = [
  { name: 'Alice', age: 28, active: true },
  { name: 'Bob', age: 34, active: false },
  { name: 'Carol', age: 22, active: true },
];

// map: transform each item
const names = users.map(u => u.name);
// ['Alice', 'Bob', 'Carol']

// filter: keep items that match
const active = users.filter(u => u.active);
// [Alice, Carol objects]

// reduce: aggregate into a single value
const totalAge = users.reduce((sum, u) => sum + u.age, 0);
// 84

// Chaining: filter then map
const activeNames = users
  .filter(u => u.active)
  .map(u => u.name);
// ['Alice', 'Carol']`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `function UserList({ users }) {
  // filter + map to render active users only
  const activeUsers = users
    .filter(u => u.active)
    .map(u => (
      <li key={u.name}>
        {u.name} (age {u.age})
      </li>
    ));

  // reduce for summary stats
  const avgAge = users.reduce((sum, u) => sum + u.age, 0)
    / users.length;

  return (
    <div>
      <h2>Active Users</h2>
      <ul>{activeUsers}</ul>
      <p>Average age: {avgAge.toFixed(1)}</p>
    </div>
  );
}

// .map() is how React renders lists
// Always include a unique "key" prop!`,
            },
            caption:
              'React rendering is built on map/filter/reduce. Every list you see in a React app is an array.map() under the hood.',
          },
          callout: {
            type: 'warning',
            text: 'When using .map() to render lists in React, every element MUST have a unique "key" prop. React uses keys to efficiently track which items changed, were added, or removed.',
          },
        },
        {
          id: 'c2',
          title: 'Spread & Rest Operators',
          explanation:
            'The spread operator (...) copies arrays and objects, and the rest operator (...) collects remaining items. In React, spread is used constantly: cloning state before updating, passing props, and merging objects. These operators are essential because React demands immutable updates.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// Spread: copy and extend arrays
const fruits = ['apple', 'banana'];
const moreFruits = [...fruits, 'cherry'];
// ['apple', 'banana', 'cherry']

// Spread: copy and merge objects
const defaults = { theme: 'light', lang: 'en' };
const prefs = { ...defaults, theme: 'dark' };
// { theme: 'dark', lang: 'en' }

// Rest: collect remaining items
const [first, ...others] = [1, 2, 3, 4];
// first = 1, others = [2, 3, 4]

// Rest: collect remaining properties
const { name, ...rest } = { name: 'Alice', age: 30, role: 'dev' };
// name = 'Alice', rest = { age: 30, role: 'dev' }`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `function TodoApp() {
  const [todos, setTodos] = useState([]);

  // Spread: add item without mutating
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  };

  // Spread: update one item immutably
  const toggleTodo = (id) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  // Rest: forward remaining props
  const Button = ({ children, ...rest }) => (
    <button className="btn" {...rest}>
      {children}
    </button>
  );

  return <Button onClick={() => addTodo('New')}>Add</Button>;
}`,
            },
            caption:
              'Spread is the key to immutable state updates in React. Never mutate state directly -- always spread into a new object or array.',
          },
          challenge: {
            id: 'ch-r1-3-1',
            type: 'fill-blank',
            prompt:
              'Complete the immutable state update to add a new item to the array:',
            code: `const [items, setItems] = useState(['apple', 'banana']);

const addItem = (newItem) => {
  setItems([___BLANK_1___items, ___BLANK_2___]);
};

addItem('cherry');
// items is now ['apple', 'banana', 'cherry']`,
            blanks: [
              { id: 'b1', expected: ['...'], hint: 'operator to spread existing items' },
              { id: 'b2', expected: ['newItem'], hint: 'the new item to add at the end' },
            ],
            explanation:
              'The spread operator (...items) copies all existing items into a new array, and newItem is appended at the end. This creates a brand-new array reference, which is what React needs to detect the change and re-render.',
          },
        },
        {
          id: 'c3',
          title: 'Immutable Update Patterns',
          explanation:
            'React state must be treated as immutable. You never push to an array, delete a property, or reassign a nested field directly. Instead, you create new copies with the desired changes. This is how React knows something changed and needs to re-render. Mastering these patterns is non-negotiable for React development.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// MUTABLE (imperative) approach
const users = [{ name: 'Alice', score: 10 }];

// Add item -- mutates in place
users.push({ name: 'Bob', score: 20 });

// Remove item -- mutates in place
users.splice(0, 1);

// Update nested property -- mutates
users[0].score = 25;

// Object mutation
const config = { theme: 'light' };
config.theme = 'dark'; // direct mutation
delete config.oldProp;  // direct deletion`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// IMMUTABLE (React) approach
const [users, setUsers] = useState([
  { name: 'Alice', score: 10 },
]);

// Add: spread into new array
setUsers([...users, { name: 'Bob', score: 20 }]);

// Remove: filter creates a new array
setUsers(users.filter(u => u.name !== 'Alice'));

// Update nested: map + spread
setUsers(users.map(u =>
  u.name === 'Bob' ? { ...u, score: 25 } : u
));

// Object update: spread + override
setConfig({ ...config, theme: 'dark' });

// Remove a key: destructure + rest
const { oldProp, ...rest } = config;
setConfig(rest);`,
            },
            caption:
              'Every mutation pattern has an immutable counterpart. push -> spread, splice -> filter, direct assign -> map+spread.',
          },
          callout: {
            type: 'gotcha',
            text: 'If you mutate state directly (e.g., state.push()), React will NOT re-render because the array reference did not change. You must always create a new array or object for React to detect the update.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'You have an array of products and need to display only items priced above $20, sorted by price ascending, showing just the name and price. How would you chain array methods to do this?',
          hint: 'Think about which methods filter, sort, and transform -- and the order you would chain them.',
          answer:
            'products.filter(p => p.price > 20).sort((a, b) => a.price - b.price).map(p => ({ name: p.name, price: p.price })). In React, you would chain the same way and wrap the result in JSX: .map(p => <li key={p.name}>{p.name}: ${p.price}</li>). Note: .sort() mutates the original array, so in React you should spread first: [...products].sort(...).',
        },
      ],
      predictOutputs: [
        {
          id: 'po-r1-3-1',
          code: `const original = [1, 2, 3, 4, 5];

const doubled = original.map(n => n * 2);
const evens = original.filter(n => n % 2 === 0);
const sum = original.reduce((acc, n) => acc + n, 0);

console.log(doubled);
console.log(evens);
console.log(sum);
console.log(original);`,
          language: 'javascript',
          expectedOutput: '[2, 4, 6, 8, 10]\n[2, 4]\n15\n[1, 2, 3, 4, 5]',
          explanation:
            'map doubles every element into a new array. filter keeps only even numbers (2 and 4). reduce sums all values (1+2+3+4+5 = 15). Crucially, the original array is unchanged -- all three methods return new arrays without mutating the source. This non-mutating behavior is why React relies on them.',
          hint: 'Remember that map, filter, and reduce all return new values. They never change the original array.',
        },
      ],
    },

    // ─── Lesson 4: Async JavaScript ────────────────────────────────────────────
    {
      id: 'lesson-r1-4',
      moduleId: 'react-m1',
      title: 'Async JavaScript',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'Promises',
          explanation:
            'A Promise represents a value that will be available in the future -- like an API response. Promises have three states: pending, fulfilled, or rejected. In React, you use Promises whenever you fetch data, and understanding them is essential for managing loading states and error handling in your components.',
          analogy:
            'A Promise is like an order receipt at a restaurant. You get the receipt immediately (pending), then later you either get your food (fulfilled) or you are told the kitchen is out of that dish (rejected). You can plan what to do in each case using .then() and .catch().',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// Creating a Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve({ id: 1, name: 'Alice' });
      } else {
        reject(new Error('Failed to fetch'));
      }
    }, 1000);
  });
};

// Consuming with .then()/.catch()
fetchData()
  .then(data => console.log(data.name))
  .catch(err => console.error(err.message))
  .finally(() => console.log('Done'));`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// React: Promises drive loading/error states
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <h1>{user.name}</h1>;
}`,
            },
            caption:
              'Promises are the foundation of async data fetching in React. Every API call returns a Promise that resolves with data or rejects with an error.',
          },
        },
        {
          id: 'c2',
          title: 'async/await',
          explanation:
            'async/await is syntactic sugar over Promises that makes asynchronous code look synchronous. You mark a function as async, then use await to pause until a Promise resolves. This is the preferred style in modern React because it is much easier to read than chained .then() calls, especially when multiple async operations depend on each other.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// async/await -- cleaner than .then() chains
async function loadUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    const user = await response.json();
    console.log(user.name);
    return user;
  } catch (error) {
    console.error('Failed:', error.message);
  }
}

// Sequential vs parallel
async function loadDashboard() {
  // Sequential: one after another
  const user = await fetchUser();
  const posts = await fetchPosts(user.id);

  // Parallel: both at once (faster!)
  const [user2, notifications] = await Promise.all([
    fetchUser(),
    fetchNotifications(),
  ]);
}`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// React: async/await inside useEffect
function Dashboard({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cannot make useEffect callback async directly
    // So we define an async function inside
    const loadData = async () => {
      try {
        const [user, posts] = await Promise.all([
          fetch(\`/api/users/\${userId}\`).then(r => r.json()),
          fetch(\`/api/posts?user=\${userId}\`).then(r => r.json()),
        ]);
        setData({ user, posts });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  return <h1>{data.user.name}</h1>;
}`,
            },
            caption:
              'async/await makes async code readable. In React, define an async function inside useEffect -- never make the useEffect callback itself async.',
          },
          callout: {
            type: 'warning',
            text: 'Never write useEffect(async () => { ... }). The useEffect callback must return either nothing or a cleanup function, not a Promise. Always define the async function inside and call it immediately.',
          },
        },
        {
          id: 'c3',
          title: 'fetch & Error Handling',
          explanation:
            'The fetch API is the standard way to make HTTP requests in the browser. A critical gotcha: fetch does NOT reject on HTTP errors (404, 500) -- it only rejects on network failures. You must check response.ok manually. In React, proper error handling means catching both network errors and HTTP errors and reflecting them in your component state.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// Proper fetch with error handling
async function fetchJSON(url) {
  const response = await fetch(url);

  // fetch does NOT throw on 404/500!
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
  }

  return response.json();
}

// POST request
async function createUser(data) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Create failed');
  return response.json();
}`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// React: reusable fetch with full error handling
function useApi(url) {
  const [state, setState] = useState({
    data: null, error: null, loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        const data = await res.json();
        setState({ data, error: null, loading: false });
      } catch (err) {
        if (err.name !== 'AbortError') {
          setState({ data: null, error: err.message, loading: false });
        }
      }
    };

    fetchData();
    return () => controller.abort(); // cleanup!
  }, [url]);

  return state;
}`,
            },
            caption:
              'Always check response.ok with fetch. In React, use AbortController to cancel in-flight requests when the component unmounts or dependencies change.',
          },
          callout: {
            type: 'gotcha',
            text: 'fetch("https://bad-url.com/404") resolves successfully -- the Promise is fulfilled with a Response object that has ok: false. You MUST check response.ok or response.status to detect HTTP errors.',
          },
          challenge: {
            id: 'ch-r1-4-1',
            type: 'fill-blank',
            prompt:
              'Complete the fetch call with proper error handling:',
            code: `async function getUser(id) {
  const response = ___BLANK_1___ fetch(\`/api/users/\${id}\`);
  if (!response.___BLANK_2___) {
    throw new Error('Request failed');
  }
  return response.___BLANK_3___();
}`,
            blanks: [
              { id: 'b1', expected: ['await'], hint: 'keyword to wait for the Promise to resolve' },
              { id: 'b2', expected: ['ok'], hint: 'boolean property that indicates HTTP success (200-299)' },
              { id: 'b3', expected: ['json'], hint: 'method to parse the response body as JSON' },
            ],
            explanation:
              'await pauses execution until the fetch Promise resolves. response.ok is true for HTTP 200-299 status codes. response.json() parses the body as JSON and returns another Promise (which await also handles).',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'You need to fetch a user and then fetch their posts (which requires the user ID). Should you use sequential await calls or Promise.all? What if you also need notifications that do not depend on the user?',
          hint: 'Think about data dependencies -- which requests depend on results from other requests?',
          answer:
            'The user must be fetched first since posts need the user ID -- this is sequential: const user = await fetchUser(); const posts = await fetchPosts(user.id). However, notifications are independent of the user, so you can run the user+posts sequence in parallel with notifications using Promise.all: const [posts, notifications] = await Promise.all([fetchPostsForUser(), fetchNotifications()]). Always parallelize independent requests to reduce total loading time.',
        },
      ],
      predictOutputs: [
        {
          id: 'po-r1-4-1',
          code: `const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
  console.log('start');
  await delay(100);
  console.log('middle');
  await delay(100);
  console.log('end');
}

run();
console.log('after run');`,
          language: 'javascript',
          expectedOutput: 'start\nafter run\nmiddle\nend',
          explanation:
            'run() logs "start" synchronously. The first await suspends the function and returns control to the caller, so "after run" is logged next. After 100ms, the function resumes and logs "middle". After another 100ms, it logs "end". The key insight: await pauses only the async function, not the entire program. Code after the run() call continues immediately.',
          hint: 'An async function returns to the caller at the first await. What runs next on the main thread?',
        },
      ],
    },

    // ─── Lesson 5: ES Modules & Tooling ────────────────────────────────────────
    {
      id: 'lesson-r1-5',
      moduleId: 'react-m1',
      title: 'ES Modules & Tooling',
      estimatedMinutes: 8,
      concepts: [
        {
          id: 'c1',
          title: 'import/export (Named vs Default)',
          explanation:
            'ES Modules are the standard way to organize JavaScript code into separate files. Named exports let you export multiple things from a file and import them by exact name. Default exports provide a single "main" export per file. React components are almost always the default export of their file, while utility functions and constants use named exports.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// ── utils/math.js ──
// Named exports: multiple per file
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }

// ── utils/logger.js ──
// Default export: one per file
export default function log(msg) {
  console.log(\`[\${new Date().toISOString()}] \${msg}\`);
}

// ── app.js ──
// Named imports: must use exact names, with braces
import { add, PI } from './utils/math.js';
// Default import: you choose the name, no braces
import log from './utils/logger.js';
// Combine both:
import log, { add } from './module.js';`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// ── components/Button.jsx ──
// Default export: the component itself
export default function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

// ── hooks/useAuth.js ──
// Named export: a custom hook
export function useAuth() {
  const [user, setUser] = useState(null);
  return { user, login, logout };
}

// ── pages/Home.jsx ──
// Default import for components
import Button from '../components/Button';
// Named import for hooks and utilities
import { useAuth } from '../hooks/useAuth';
import { formatDate, API_URL } from '../utils';

export default function Home() {
  const { user } = useAuth();
  return <Button label="Login" onClick={login} />;
}`,
            },
            caption:
              'Convention: React components use default exports. Hooks, utilities, and constants use named exports.',
          },
          callout: {
            type: 'tip',
            text: 'A common pattern: one default export (the component) and optional named exports (types, helpers) per file. Import errors with named exports are caught at build time, making them safer for refactoring.',
          },
          challenge: {
            id: 'ch-r1-5-1',
            type: 'fill-blank',
            prompt:
              'Complete the import statements for a React project:',
            code: `// Import the default-exported Button component
import ___BLANK_1___ from './components/Button';

// Import named exports useAuth and useTheme
import ___BLANK_2___ useAuth, useTheme ___BLANK_3___ from './hooks';`,
            blanks: [
              { id: 'b1', expected: ['Button'], hint: 'default imports use any name, no braces' },
              { id: 'b2', expected: ['{'], hint: 'named imports start with...' },
              { id: 'b3', expected: ['}'], hint: 'named imports end with...' },
            ],
            explanation:
              'Default imports have no braces and you can name them anything (though convention matches the export name). Named imports use curly braces { } and must match the exported names exactly.',
          },
        },
        {
          id: 'c2',
          title: 'npm & Bundler Basics',
          explanation:
            'npm (Node Package Manager) manages third-party packages. A bundler (Vite, webpack) processes your import/export statements, resolves dependencies, and produces optimized bundles for the browser. You do not need to be an expert in bundler configuration, but understanding the basics helps you navigate React project setup and debug build issues.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// Without a bundler: script tags in HTML
// <script src="lodash.min.js"></script>
// <script src="app.js"></script>
// Order matters! Global variables! No tree-shaking!

// package.json -- project manifest
// {
//   "name": "my-app",
//   "dependencies": {
//     "lodash": "^4.17.21"
//   },
//   "scripts": {
//     "start": "node server.js",
//     "build": "webpack --mode production"
//   }
// }

// Install a package
// npm install lodash
// npm install -D eslint  (-D = devDependency)`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// React projects use npm + a bundler (Vite, etc.)
// Create a new project:
// npm create vite@latest my-app -- --template react

// Install dependencies:
// npm install axios react-router-dom

// Import like any other module -- bundler resolves it
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import styles from './App.module.css';

// The bundler handles:
// - Resolving node_modules imports
// - Compiling JSX to JavaScript
// - CSS modules & asset imports
// - Tree-shaking unused exports
// - Code-splitting for lazy loading
// - Hot Module Replacement (HMR) in dev

function App() {
  return <BrowserRouter><Route path="/" /></BrowserRouter>;
}
export default App;`,
            },
            caption:
              'npm manages packages, the bundler turns your imports into optimized browser-ready code. You write modern JS/JSX; the toolchain handles the rest.',
          },
          callout: {
            type: 'info',
            text: 'Vite is the standard bundler for new React projects in 2024+. It uses native ES modules in development for instant hot-reload and Rollup for optimized production builds. You can also use Next.js which includes its own bundler (Turbopack).',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'You import a function but get the error "is not a function". What is the most likely cause, and how would you debug it?',
          hint: 'Think about the difference between default and named exports, and what happens when you mix them up.',
          answer:
            'The most likely cause is a default/named import mismatch. If a module uses export default function foo() but you write import { foo } from "./module", you get undefined (not a function). Fix: check the source file -- if it uses export default, import without braces: import foo from "./module". If it uses export function foo, import with braces: import { foo } from "./module". Your IDE and bundler error messages often hint at this.',
        },
      ],
    },
  ],
};

export default module;
