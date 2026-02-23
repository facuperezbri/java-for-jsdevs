import type { Module } from '../../../../types';
import project2 from '../projects/react-project-2';

const reactModule2: Module = {
  id: 'react-m2',
  order: 2,
  title: 'React Fundamentals',
  subtitle: 'Components, JSX, props, and rendering patterns',
  icon: '⚛️',
  accentColor: 'blue',
  quizId: 'react-quiz-2',
  project: project2,
  lessons: [
    // ─── Lesson 1: What is React & Why ───────────────────────────────────────────
    {
      id: 'lesson-r2-1',
      moduleId: 'react-m2',
      title: 'What is React & Why',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'The Virtual DOM',
          explanation:
            'React uses a Virtual DOM — a lightweight JavaScript representation of the real DOM. When state changes, React computes the minimal diff between the old and new virtual trees, then applies only those changes to the real DOM. This is similar to how a database query planner optimizes writes: instead of re-rendering the whole page, React "batches" the minimal set of DOM mutations.',
          analogy:
            'Think of the Virtual DOM like a staging environment. React makes changes in the staging copy first, diffs it against production, then deploys only the delta — just like you would with database migrations instead of dropping and recreating the whole schema.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `// Class component: React manages the Virtual DOM
// for you — you just describe WHAT to render.
class Counter extends React.Component {
  state = { count: 0 };

  render() {
    // React diffs this output against the previous
    // render and updates only what changed in the DOM
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({
          count: this.state.count + 1
        })}>+1</button>
      </div>
    );
  }
}`,
            },
            right: {
              label: 'Functional',
              language: 'jsx',
              code: `// Functional component: same Virtual DOM behavior,
// cleaner syntax with hooks.
function Counter() {
  const [count, setCount] = useState(0);

  // Same deal: React diffs this output against
  // the previous render, updates only changes
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}`,
            },
            caption:
              'Both styles produce the same Virtual DOM output — React handles diffing and efficient updates regardless of component style',
          },
          challenge: {
            id: 'ch-r2-1-1',
            type: 'fill-blank',
            prompt:
              'Complete the functional component that displays a message:',
            code: `function Greeting() {
  const [name, ___BLANK_1___] = ___BLANK_2___("World");

  return <h1>Hello, {___BLANK_3___}!</h1>;
}`,
            blanks: [
              { id: 'b1', expected: ['setName'], hint: 'state setter function' },
              { id: 'b2', expected: ['useState'], hint: 'React hook for state' },
              { id: 'b3', expected: ['name'], hint: 'state variable' },
            ],
            explanation:
              'useState returns a pair: [currentValue, setterFunction]. The argument to useState is the initial value. You reference the state variable directly in JSX using curly braces.',
          },
        },
        {
          id: 'c2',
          title: 'Declarative vs Imperative',
          explanation:
            'React is declarative: you describe WHAT the UI should look like for a given state, and React figures out HOW to update the DOM. This is the opposite of imperative DOM manipulation (jQuery-style), where you tell the browser step-by-step what to change. If you have worked with SQL, you already think declaratively — SELECT describes what you want, not how to get it.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `// Declarative: describe the UI for each state
class UserCard extends React.Component {
  state = { isLoggedIn: false };

  render() {
    // You describe WHAT to show, not HOW to toggle
    return (
      <div>
        {this.state.isLoggedIn
          ? <p>Welcome back!</p>
          : <p>Please log in</p>}
        <button onClick={() => this.setState({
          isLoggedIn: !this.state.isLoggedIn
        })}>Toggle</button>
      </div>
    );
  }
}`,
            },
            right: {
              label: 'Functional',
              language: 'jsx',
              code: `// Same declarative approach, less boilerplate
function UserCard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Describe WHAT to show — React handles the DOM
  return (
    <div>
      {isLoggedIn
        ? <p>Welcome back!</p>
        : <p>Please log in</p>}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        Toggle
      </button>
    </div>
  );
}`,
            },
            caption:
              'Declarative: "show Welcome if logged in, else show Please log in" — no manual DOM toggling',
          },
        },
        {
          id: 'c3',
          title: 'The Component Model',
          explanation:
            'React apps are built by composing small, reusable components into a tree. Each component is a self-contained unit with its own markup, logic, and (optionally) state. Think of it like microservices for the UI: each component has a single responsibility and a clear API (props).',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `// Composition: small components build up the page
class Header extends React.Component {
  render() {
    return <header><h1>{this.props.title}</h1></header>;
  }
}

class Page extends React.Component {
  render() {
    return (
      <div>
        <Header title="My App" />
        <main>
          <p>Content goes here</p>
        </main>
      </div>
    );
  }
}`,
            },
            right: {
              label: 'Functional',
              language: 'jsx',
              code: `// Same composition, cleaner syntax
function Header({ title }) {
  return <header><h1>{title}</h1></header>;
}

function Page() {
  return (
    <div>
      <Header title="My App" />
      <main>
        <p>Content goes here</p>
      </main>
    </div>
  );
}`,
            },
            caption:
              'Components compose like functions: small pieces combine into larger UIs',
          },
          callout: {
            type: 'tip',
            text: 'A good rule of thumb: if a piece of UI is used more than once, or if a component is getting too large (100+ lines), extract it into its own component.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'How does React\'s Virtual DOM approach compare to directly manipulating the DOM with document.querySelector and innerHTML?',
          hint: 'Think about what happens when you have many elements to update at once',
          answer:
            'Direct DOM manipulation is imperative and can cause layout thrashing (multiple reflows/repaints). React batches changes in the Virtual DOM, computes the minimal diff, then applies all changes in one pass. This is like batching database writes in a transaction instead of running individual UPDATE statements.',
        },
        {
          id: 'e2',
          prompt:
            'Why might a backend developer find React\'s declarative model familiar?',
          hint: 'Think about SQL or configuration-as-code tools',
          answer:
            'Backend developers already think declaratively with SQL (SELECT what you want, not how to get it), Terraform/Kubernetes YAML (declare desired state, the system reconciles), and template engines (describe the HTML structure). React works the same way: declare what the UI should look like, and React reconciles the DOM.',
        },
      ],
      predictOutputs: [
        {
          id: 'po-r2-1-1',
          code: `function App() {
  const [count, setCount] = useState(5);

  return (
    <div>
      <p>{count * 2}</p>
      <p>{count > 3 ? "big" : "small"}</p>
    </div>
  );
}

// What renders inside the <div>?`,
          language: 'jsx',
          expectedOutput: '10\nbig',
          explanation:
            'useState(5) sets count to 5. The first <p> renders {5 * 2} = 10. The second <p> evaluates {5 > 3 ? "big" : "small"} = "big" since 5 is greater than 3. JSX curly braces evaluate any JavaScript expression.',
          hint: 'JSX curly braces evaluate JavaScript expressions inline.',
        },
      ],
    },

    // ─── Lesson 2: JSX Deep Dive ─────────────────────────────────────────────────
    {
      id: 'lesson-r2-2',
      moduleId: 'react-m2',
      title: 'JSX Deep Dive',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'JSX Is Just JavaScript',
          explanation:
            'JSX is syntactic sugar for React.createElement() calls. Every <Component /> tag compiles down to a function call. This means JSX is not a template language — it is full JavaScript with XML-like syntax on top. Understanding this helps you debug transpilation issues and know what is and is not allowed inside JSX.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `// JSX in a class component
class Welcome extends React.Component {
  render() {
    // This JSX:
    return <h1 className="title">Hello</h1>;

    // ...compiles to this:
    // return React.createElement(
    //   'h1',
    //   { className: 'title' },
    //   'Hello'
    // );
  }
}`,
            },
            right: {
              label: 'Functional',
              language: 'jsx',
              code: `// JSX in a functional component
function Welcome() {
  // Same JSX, same compiled output:
  return <h1 className="title">Hello</h1>;

  // Compiles to exactly the same
  // React.createElement call.
  // The component style doesn't change
  // how JSX works.
}`,
            },
            caption:
              'JSX compiles to React.createElement() calls — it is JavaScript, not HTML',
          },
          callout: {
            type: 'info',
            text: 'Because JSX is JavaScript, you use className instead of class (reserved keyword), htmlFor instead of for, and camelCase for attributes like onClick, tabIndex, etc.',
          },
        },
        {
          id: 'c2',
          title: 'Embedding Expressions in JSX',
          explanation:
            'Curly braces {} in JSX let you embed any JavaScript expression: variables, function calls, arithmetic, ternaries, and more. Think of {} as an escape hatch from the markup back into JavaScript. You cannot use statements (if/else, for, switch) directly — only expressions that produce a value.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class Dashboard extends React.Component {
  state = {
    user: 'Alice',
    unreadCount: 5,
    isAdmin: true,
  };

  render() {
    const { user, unreadCount, isAdmin } = this.state;
    return (
      <div>
        <h1>Hello, {user.toUpperCase()}</h1>
        <p>{unreadCount} unread message{unreadCount !== 1 ? 's' : ''}</p>
        <p>Role: {isAdmin ? 'Admin' : 'User'}</p>
        <p>Score: {unreadCount * 10}</p>
      </div>
    );
  }
}`,
            },
            right: {
              label: 'Functional',
              language: 'jsx',
              code: `function Dashboard() {
  const user = 'Alice';
  const unreadCount = 5;
  const isAdmin = true;

  return (
    <div>
      <h1>Hello, {user.toUpperCase()}</h1>
      <p>{unreadCount} unread message{unreadCount !== 1 ? 's' : ''}</p>
      <p>Role: {isAdmin ? 'Admin' : 'User'}</p>
      <p>Score: {unreadCount * 10}</p>
    </div>
  );
}`,
            },
            caption:
              'Any JavaScript expression works inside {}: method calls, ternaries, arithmetic, template logic',
          },
          challenge: {
            id: 'ch-r2-2-1',
            type: 'fill-blank',
            prompt:
              'Complete the JSX to display a formatted price:',
            code: `function PriceTag({ amount, currency }) {
  return (
    <span ___BLANK_1___="price-tag">
      {currency === 'USD' ___BLANK_2___ '$' ___BLANK_3___ '€'}
      {amount.___BLANK_4___(2)}
    </span>
  );
}`,
            blanks: [
              { id: 'b1', expected: ['className'], hint: 'JSX uses this instead of class' },
              { id: 'b2', expected: ['?'], hint: 'ternary operator part 1' },
              { id: 'b3', expected: [':'], hint: 'ternary operator part 2' },
              { id: 'b4', expected: ['toFixed'], hint: 'format decimal places' },
            ],
            explanation:
              'In JSX, use className (not class). Conditional rendering inside {} uses the ternary operator (condition ? valueIfTrue : valueIfFalse). toFixed(2) formats a number to 2 decimal places.',
          },
        },
        {
          id: 'c3',
          title: 'Inline Styles & className',
          explanation:
            'In JSX, the style attribute takes a JavaScript object (not a CSS string), with camelCase property names. For class names, use className instead of class. This catches many backend developers off guard because it looks like HTML but behaves differently.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class StyledCard extends React.Component {
  render() {
    const cardStyle = {
      backgroundColor: '#f0f0f0',   // camelCase!
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    };

    return (
      <div style={cardStyle} className="card">
        <h2 style={{ color: 'navy', fontSize: '1.5rem' }}>
          {this.props.title}
        </h2>
      </div>
    );
  }
}`,
            },
            right: {
              label: 'Functional',
              language: 'jsx',
              code: `function StyledCard({ title }) {
  const cardStyle = {
    backgroundColor: '#f0f0f0',   // camelCase!
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  return (
    <div style={cardStyle} className="card">
      <h2 style={{ color: 'navy', fontSize: '1.5rem' }}>
        {title}
      </h2>
    </div>
  );
}`,
            },
            caption:
              'style takes a JS object with camelCase keys — double braces {{ }} means "object inside JSX expression"',
          },
          callout: {
            type: 'gotcha',
            text: 'style={{ background-color: "red" }} will fail! CSS property names must be camelCase in JSX: backgroundColor, fontSize, borderRadius, etc.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'Why can\'t you write if/else directly inside JSX curly braces? What do you use instead?',
          hint: 'Think about the difference between JavaScript expressions and statements',
          answer:
            'JSX curly braces only accept expressions (code that produces a value), not statements. if/else is a statement. Instead, use: (1) ternary operator: {condition ? a : b}, (2) logical AND: {condition && <Element />}, or (3) extract the logic into a variable before the return statement.',
        },
        {
          id: 'e2',
          prompt:
            'A colleague writes <div class="container" style="color: red">. What are the two mistakes in this JSX?',
          hint: 'Think about JSX attribute naming and style value types',
          answer:
            'Two mistakes: (1) class should be className (class is a reserved word in JS). (2) style must be a JS object, not a string: style={{ color: "red" }}. The double braces are needed because the outer {} enters a JS expression and the inner {} is the object literal.',
        },
      ],
      translationDrills: [
        {
          id: 'td-r2-2-1',
          sourceLabel: 'Class Component',
          sourceCode: `class Badge extends React.Component {
  render() {
    return (
      <span className="badge" style={{ color: 'white' }}>
        {this.props.count}
      </span>
    );
  }
}`,
          targetLabel: 'Functional',
          targetTemplate: `___SLOT_1___ Badge({ ___SLOT_2___ }) {
  return (
    <span className="badge" style={{ color: 'white' }}>
      {___SLOT_3___}
    </span>
  );
}`,
          slots: [
            { id: 'slot-1', expected: 'function' },
            { id: 'slot-2', expected: 'count' },
            { id: 'slot-3', expected: 'count' },
          ],
          tokenBank: ['function', 'count', 'count', 'class', 'this.props.count', 'const', 'render'],
          explanation:
            'Functional components receive props as a function argument. You can destructure props directly in the parameter list: ({ count }). No more this.props — just reference the destructured variable directly.',
        },
      ],
      predictOutputs: [
        {
          id: 'po-r2-2-1',
          code: `function Label({ text, isUrgent }) {
  return (
    <p className={isUrgent ? "urgent" : "normal"}>
      {text.toUpperCase()}
    </p>
  );
}

// Rendered as: <Label text="hello" isUrgent={true} />`,
          language: 'jsx',
          expectedOutput: '<p class="urgent">HELLO</p>',
          explanation:
            'isUrgent is true, so className resolves to "urgent". text is "hello" and toUpperCase() produces "HELLO". In the final HTML, className becomes the standard class attribute.',
          hint: 'Evaluate the ternary and the method call separately.',
        },
      ],
    },

    // ─── Lesson 3: Components & Props ────────────────────────────────────────────
    {
      id: 'lesson-r2-3',
      moduleId: 'react-m2',
      title: 'Components & Props',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Class vs Functional Components',
          explanation:
            'React has two ways to define components. Class components extend React.Component and use a render() method. Functional components are plain functions that return JSX. Modern React strongly favors functional components with hooks. Class components still work but are considered legacy for new code.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `// Class component: extends React.Component
class UserProfile extends React.Component {
  render() {
    return (
      <div className="profile">
        <h2>{this.props.name}</h2>
        <p>Email: {this.props.email}</p>
        <p>Role: {this.props.role}</p>
      </div>
    );
  }
}

// Usage: <UserProfile name="Alice" email="a@b.com" role="Admin" />`,
            },
            right: {
              label: 'Functional',
              language: 'jsx',
              code: `// Functional component: just a function
function UserProfile({ name, email, role }) {
  return (
    <div className="profile">
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
    </div>
  );
}

// Usage is identical:
// <UserProfile name="Alice" email="a@b.com" role="Admin" />`,
            },
            caption:
              'Functional components are shorter, have no "this", and are the modern standard',
          },
          callout: {
            type: 'tip',
            text: 'If you are starting a new project, always use functional components. Class components are still supported but hooks (useState, useEffect, etc.) only work in functional components.',
          },
        },
        {
          id: 'c2',
          title: 'Props with TypeScript',
          explanation:
            'In TypeScript, you define an interface or type for your props. This gives you autocompletion, type checking, and serves as documentation — similar to defining request/response DTOs in a backend API. Class components use generics on React.Component, while functional components type the props parameter directly.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `// Class component with TypeScript props
interface AlertProps {
  message: string;
  severity: 'info' | 'warning' | 'error';
  dismissible?: boolean; // optional prop
}

class Alert extends React.Component<AlertProps> {
  render() {
    const { message, severity, dismissible = false } = this.props;
    return (
      <div className={\`alert alert-\${severity}\`}>
        <p>{message}</p>
        {dismissible && <button>Dismiss</button>}
      </div>
    );
  }
}`,
            },
            right: {
              label: 'Functional',
              language: 'jsx',
              code: `// Functional component with TypeScript props
interface AlertProps {
  message: string;
  severity: 'info' | 'warning' | 'error';
  dismissible?: boolean; // optional prop
}

function Alert({ message, severity, dismissible = false }: AlertProps) {
  return (
    <div className={\`alert alert-\${severity}\`}>
      <p>{message}</p>
      {dismissible && <button>Dismiss</button>}
    </div>
  );
}

// <Alert message="Saved!" severity="info" />`,
            },
            caption:
              'TypeScript props work like API contracts: define the shape, get compile-time safety',
          },
        },
        {
          id: 'c3',
          title: 'Children Props',
          explanation:
            'The special "children" prop represents whatever you nest between the opening and closing tags of a component. This is React\'s composition model — like wrapping middleware in an Express app or nesting layout components. Class components access it via this.props.children; functional components destructure it from props.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `// Class component with children
class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <h3>{this.props.title}</h3>
        <div className="card-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

// Usage: children = everything between tags
// <Card title="Settings">
//   <p>Any content here</p>
//   <button>Save</button>
// </Card>`,
            },
            right: {
              label: 'Functional',
              language: 'jsx',
              code: `// Functional component with children
interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// <Card title="Settings">
//   <p>Any content here</p>
//   <button>Save</button>
// </Card>`,
            },
            caption:
              'children lets you create wrapper/layout components — like Express middleware wrapping a handler',
          },
          challenge: {
            id: 'ch-r2-3-1',
            type: 'fill-blank',
            prompt:
              'Complete this typed functional component that wraps content in a section:',
            code: `interface SectionProps {
  heading: string;
  ___BLANK_1___: React.ReactNode;
}

function Section({ heading, ___BLANK_2___ }: SectionProps) {
  return (
    <section>
      <h2>{___BLANK_3___}</h2>
      <div>{children}</div>
    </section>
  );
}`,
            blanks: [
              { id: 'b1', expected: ['children'], hint: 'special prop for nested content' },
              { id: 'b2', expected: ['children'], hint: 'destructure from props' },
              { id: 'b3', expected: ['heading'], hint: 'the section title prop' },
            ],
            explanation:
              'The "children" prop is typed as React.ReactNode (accepts JSX, strings, numbers, arrays, null). It is destructured from props just like any other prop and rendered with {children} in JSX.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'When would you still encounter class components in a real project, even though functional components are the modern standard?',
          hint: 'Think about existing codebases, error boundaries, and libraries',
          answer:
            'You will encounter class components in: (1) legacy codebases written before hooks (pre-2019), (2) error boundaries — React still requires class components for componentDidCatch/getDerivedStateFromError, (3) some older third-party libraries. Knowing both styles is important for maintaining existing code.',
        },
        {
          id: 'e2',
          prompt:
            'How are React props similar to function parameters or API request bodies in a backend context?',
          hint: 'Think about data flow direction and immutability',
          answer:
            'Props flow one way (parent to child) like request parameters flow from client to server. Props are read-only — a component cannot modify its own props, just like a handler should not modify the incoming request object. TypeScript interfaces for props serve the same purpose as DTOs or JSON schemas: they define the contract between caller and callee.',
        },
      ],
      translationDrills: [
        {
          id: 'td-r2-3-1',
          sourceLabel: 'Class Component',
          sourceCode: `class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}`,
          targetLabel: 'Functional',
          targetTemplate: `___SLOT_1___ Greeting(___SLOT_2___) {
  return <h1>Hello, {___SLOT_3___}!</h1>;
}`,
          slots: [
            { id: 'slot-1', expected: 'function' },
            { id: 'slot-2', expected: '{ name }' },
            { id: 'slot-3', expected: 'name' },
          ],
          tokenBank: ['function', '{ name }', 'name', 'class', 'this.props.name', 'props', 'render'],
          explanation:
            'Converting class to functional: remove the class/render boilerplate, use a function declaration, destructure props in the parameter list, and drop "this.props." — just reference the prop name directly.',
        },
      ],
      predictOutputs: [
        {
          id: 'po-r2-3-1',
          code: `function Tag({ label, color = "gray" }) {
  return <span style={{ color }}>{label}</span>;
}

// What HTML does this produce?
// <Tag label="New" />`,
          language: 'jsx',
          expectedOutput: '<span style="color: gray;">New</span>',
          explanation:
            'The color prop is not passed, so the default value "gray" is used. The shorthand { color } in the style object is equivalent to { color: color } which becomes { color: "gray" }. The label "New" is rendered as the text content.',
          hint: 'Look at the default parameter value for color.',
        },
      ],
    },

    // ─── Lesson 4: Rendering Lists ───────────────────────────────────────────────
    {
      id: 'lesson-r2-4',
      moduleId: 'react-m2',
      title: 'Rendering Lists',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'Rendering with map()',
          explanation:
            'To render a list in React, you use Array.map() to transform data into JSX elements. This is similar to mapping over query results in a backend template engine. Each item in the list must have a unique "key" prop so React can efficiently track which items changed, were added, or were removed during re-renders.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class UserList extends React.Component {
  state = {
    users: [
      { id: 1, name: 'Alice', role: 'Admin' },
      { id: 2, name: 'Bob', role: 'User' },
      { id: 3, name: 'Charlie', role: 'User' },
    ],
  };

  render() {
    return (
      <ul>
        {this.state.users.map(user => (
          <li key={user.id}>
            {user.name} — {user.role}
          </li>
        ))}
      </ul>
    );
  }
}`,
            },
            right: {
              label: 'Functional',
              language: 'jsx',
              code: `function UserList() {
  const users = [
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' },
    { id: 3, name: 'Charlie', role: 'User' },
  ];

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} — {user.role}
        </li>
      ))}
    </ul>
  );
}`,
            },
            caption:
              'map() transforms data arrays into JSX arrays — key prop is required for efficient diffing',
          },
          callout: {
            type: 'warning',
            text: 'Never use array index as key if the list can be reordered, filtered, or items can be inserted/removed. Use a stable unique identifier (like a database ID). Using index as key causes subtle bugs with component state.',
          },
          challenge: {
            id: 'ch-r2-4-1',
            type: 'fill-blank',
            prompt:
              'Complete the list rendering with proper keys:',
            code: `function TodoList({ todos }) {
  return (
    <ul>
      {todos.___BLANK_1___(todo => (
        <li ___BLANK_2___={todo.___BLANK_3___}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}`,
            blanks: [
              { id: 'b1', expected: ['map'], hint: 'array transformation method' },
              { id: 'b2', expected: ['key'], hint: 'React tracking prop' },
              { id: 'b3', expected: ['id'], hint: 'unique identifier' },
            ],
            explanation:
              'Use .map() to transform each todo into a <li> element. The key prop must be set to a unique, stable identifier (todo.id) so React can track each item efficiently across re-renders.',
          },
        },
        {
          id: 'c2',
          title: 'Conditional Rendering',
          explanation:
            'React offers several patterns for conditionally showing or hiding elements: the ternary operator for if/else, the logical AND (&&) for show/hide, and early returns for entire component rendering. Choose the pattern that best fits the complexity of your condition.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class Notification extends React.Component {
  render() {
    const { messages, isAdmin } = this.props;

    // Early return: nothing to show
    if (messages.length === 0) {
      return <p>No notifications</p>;
    }

    return (
      <div>
        {/* Ternary: if/else */}
        <h3>{messages.length > 5 ? 'Many' : 'Some'} messages</h3>

        {/* Logical AND: show only if true */}
        {isAdmin && <button>Clear All</button>}

        {messages.map(msg => (
          <p key={msg.id}>{msg.text}</p>
        ))}
      </div>
    );
  }
}`,
            },
            right: {
              label: 'Functional',
              language: 'jsx',
              code: `function Notification({ messages, isAdmin }) {
  // Early return: nothing to show
  if (messages.length === 0) {
    return <p>No notifications</p>;
  }

  return (
    <div>
      {/* Ternary: if/else */}
      <h3>{messages.length > 5 ? 'Many' : 'Some'} messages</h3>

      {/* Logical AND: show only if true */}
      {isAdmin && <button>Clear All</button>}

      {messages.map(msg => (
        <p key={msg.id}>{msg.text}</p>
      ))}
    </div>
  );
}`,
            },
            caption:
              'Three patterns: early return for big conditions, ternary for if/else, && for show/hide',
          },
          callout: {
            type: 'gotcha',
            text: 'Watch out: {count && <p>Items</p>} renders "0" when count is 0, because 0 is falsy but still a valid React renderable value. Use {count > 0 && <p>Items</p>} instead.',
          },
        },
        {
          id: 'c3',
          title: 'Fragments — Avoiding Extra DOM Nodes',
          explanation:
            'React components must return a single root element. If you do not want to add an extra <div> to the DOM, use a Fragment (<React.Fragment> or the shorthand <>...</>). Fragments let you group elements without introducing a wrapper node in the HTML output.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class TableRow extends React.Component {
  render() {
    const { name, email, role } = this.props;

    // <></> is the Fragment shorthand
    // Without it, you'd need a wrapping <div>
    // which would break <table> structure
    return (
      <>
        <td>{name}</td>
        <td>{email}</td>
        <td>{role}</td>
      </>
    );
  }
}

// Used inside a <tr>:
// <tr><TableRow name="Alice" email="a@b.com" role="Admin" /></tr>`,
            },
            right: {
              label: 'Functional',
              language: 'jsx',
              code: `function TableRow({ name, email, role }) {
  // Fragment avoids invalid HTML like:
  // <tr><div><td>...</td></div></tr>
  return (
    <>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
    </>
  );
}

// Keyed fragments in lists:
// items.map(item => (
//   <React.Fragment key={item.id}>
//     <dt>{item.term}</dt>
//     <dd>{item.definition}</dd>
//   </React.Fragment>
// ))`,
            },
            caption:
              'Fragments (<>...</>) group elements without adding extra DOM nodes — essential for valid HTML',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'Why does React require a "key" prop on list items? What happens if you skip it or use the array index?',
          hint: 'Think about how React diffs the Virtual DOM',
          answer:
            'Keys help React identify which items changed, were added, or removed. Without keys, React re-renders the entire list on every change. Using array index as key breaks when items are reordered or deleted: React associates state with the wrong item because the index shifts. Always use a stable, unique ID (like a database primary key).',
        },
        {
          id: 'e2',
          prompt:
            'When rendering a list of items, you notice {0 && <p>Items</p>} renders "0" on screen. Why, and how do you fix it?',
          hint: 'Think about how JavaScript evaluates && with falsy values',
          answer:
            'JavaScript short-circuit evaluation returns the left operand if it is falsy. Since 0 is falsy, {0 && <p>Items</p>} returns 0, and React renders the number 0 as text. Fix it by using an explicit boolean: {count > 0 && <p>Items</p>} or {!!count && <p>Items</p>} or a ternary.',
        },
      ],
      predictOutputs: [
        {
          id: 'po-r2-4-1',
          code: `function App() {
  const items = ['apple', 'banana', 'cherry'];

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{index}: {item}</li>
      ))}
    </ul>
  );
}

// What text appears in the list items?`,
          language: 'jsx',
          expectedOutput: '0: apple\n1: banana\n2: cherry',
          explanation:
            'map() iterates over the array with both the item and its index. Each <li> renders the index followed by a colon and the item name. Note: using index as key works here because the list is static, but it would cause bugs if items could be reordered.',
          hint: 'The map callback receives (item, index) — both are used in the JSX.',
        },
      ],
    },

    // ─── Lesson 5: Events & Forms ────────────────────────────────────────────────
    {
      id: 'lesson-r2-5',
      moduleId: 'react-m2',
      title: 'Events & Forms',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Event Handlers: onClick and onChange',
          explanation:
            'React uses camelCase event names (onClick, onChange, onSubmit) instead of HTML lowercase (onclick). Event handlers receive a SyntheticEvent — React\'s cross-browser wrapper around the native DOM event. In class components, you must be careful about "this" binding; functional components avoid this problem entirely.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class ClickCounter extends React.Component {
  state = { count: 0 };

  // Arrow function auto-binds "this"
  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  handleReset = () => {
    this.setState({ count: 0 });
  };

  render() {
    return (
      <div>
        <p>Clicked {this.state.count} times</p>
        <button onClick={this.handleClick}>Add</button>
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}`,
            },
            right: {
              label: 'Functional',
              language: 'jsx',
              code: `function ClickCounter() {
  const [count, setCount] = useState(0);

  // No "this" binding issues
  const handleClick = () => {
    setCount(count + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div>
      <p>Clicked {count} times</p>
      <button onClick={handleClick}>Add</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}`,
            },
            caption:
              'Functional components avoid the "this" binding headache — handlers are just local variables',
          },
          callout: {
            type: 'gotcha',
            text: 'Common mistake: onClick={handleClick()} calls the function immediately on render! Use onClick={handleClick} (no parentheses) to pass a reference. If you need to pass arguments: onClick={() => handleClick(id)}.',
          },
        },
        {
          id: 'c2',
          title: 'Controlled Inputs',
          explanation:
            'In React, a "controlled input" is an input whose value is driven by state. You set the value prop to the state variable and update state via onChange. This gives React full control over the form data — similar to how a backend validates and controls data flow rather than trusting client-side state.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class SearchBox extends React.Component {
  state = { query: '' };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Search..."
        />
        <p>Searching for: {this.state.query}</p>
      </div>
    );
  }
}`,
            },
            right: {
              label: 'Functional',
              language: 'jsx',
              code: `function SearchBox() {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      <p>Searching for: {query}</p>
    </div>
  );
}`,
            },
            caption:
              'Controlled input: value={state} + onChange={updateState} — React is the single source of truth',
          },
          challenge: {
            id: 'ch-r2-5-1',
            type: 'fill-blank',
            prompt:
              'Complete this controlled input component:',
            code: `function NameInput() {
  const [name, setName] = ___BLANK_1___('');

  return (
    <input
      type="text"
      ___BLANK_2___={name}
      ___BLANK_3___={(e) => setName(e.___BLANK_4___.value)}
    />
  );
}`,
            blanks: [
              { id: 'b1', expected: ['useState'], hint: 'React state hook' },
              { id: 'b2', expected: ['value'], hint: 'binds input to state' },
              { id: 'b3', expected: ['onChange'], hint: 'fires on every keystroke' },
              { id: 'b4', expected: ['target'], hint: 'the DOM element that triggered the event' },
            ],
            explanation:
              'A controlled input requires: useState to hold the value, value={state} to bind the input, onChange to update state on each keystroke, and e.target.value to get the typed text from the event.',
          },
        },
        {
          id: 'c3',
          title: 'Form Submission',
          explanation:
            'To handle form submission in React, attach an onSubmit handler to the <form> element and call e.preventDefault() to stop the default browser behavior (which would cause a full page reload). This is the same as calling e.preventDefault() in vanilla JS — React does not do it for you.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class LoginForm extends React.Component {
  state = { email: '', password: '' };

  handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log('Login:', this.state.email);
    // call API, validate, etc.
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="email"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <input
          type="password"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
        />
        <button type="submit">Log In</button>
      </form>
    );
  }
}`,
            },
            right: {
              label: 'Functional',
              language: 'jsx',
              code: `function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log('Login:', email);
    // call API, validate, etc.
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Log In</button>
    </form>
  );
}`,
            },
            caption:
              'Always e.preventDefault() in onSubmit — otherwise the browser reloads the page',
          },
          callout: {
            type: 'tip',
            text: 'For complex forms with many fields, consider using a form library like React Hook Form or Formik instead of managing each input with separate useState calls.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'What happens if you set an input\'s value prop without providing an onChange handler?',
          hint: 'Think about what "controlled" means — who controls the value?',
          answer:
            'The input becomes read-only. React will lock the displayed value to whatever state you set, and since there is no onChange to update the state, the user cannot type anything. React will also log a warning: "You provided a value prop without an onChange handler." Either add onChange or use defaultValue for uncontrolled inputs.',
        },
        {
          id: 'e2',
          prompt:
            'Why do you need to call e.preventDefault() in a form\'s onSubmit handler? How is this different from backend form handling?',
          hint: 'Think about what the browser does by default when a form is submitted',
          answer:
            'By default, the browser sends a GET/POST request to the form action URL and reloads the page — this is the traditional server-side form submission model. In a React SPA, you want to handle submission in JavaScript (e.g., call an API via fetch), so you prevent the default behavior. On the backend, this is unnecessary because the server is already handling the request.',
        },
      ],
      translationDrills: [
        {
          id: 'td-r2-5-1',
          sourceLabel: 'Class Component',
          sourceCode: `class Toggle extends React.Component {
  state = { isOn: false };

  handleClick = () => {
    this.setState({ isOn: !this.state.isOn });
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}`,
          targetLabel: 'Functional',
          targetTemplate: `function Toggle() {
  const [isOn, ___SLOT_1___] = ___SLOT_2___(false);

  const handleClick = () => {
    ___SLOT_3___(___SLOT_4___);
  };

  return (
    <button onClick={___SLOT_5___}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}`,
          slots: [
            { id: 'slot-1', expected: 'setIsOn' },
            { id: 'slot-2', expected: 'useState' },
            { id: 'slot-3', expected: 'setIsOn' },
            { id: 'slot-4', expected: '!isOn' },
            { id: 'slot-5', expected: 'handleClick' },
          ],
          tokenBank: ['setIsOn', 'useState', 'setIsOn', '!isOn', 'handleClick', 'this.state.isOn', 'setState', 'toggle'],
          explanation:
            'useState(false) replaces the class state initialization. The setter (setIsOn) replaces this.setState. The negation (!isOn) is simpler because you reference the state variable directly instead of this.state.isOn. The handler is a local const, referenced by name in onClick.',
        },
      ],
      predictOutputs: [
        {
          id: 'po-r2-5-1',
          code: `function App() {
  const [text, setText] = useState("hello");

  const handleChange = (e) => {
    setText(e.target.value.toUpperCase());
  };

  return <input value={text} onChange={handleChange} />;
}

// User types "world" into the input.
// What is displayed in the input field?`,
          language: 'jsx',
          expectedOutput: 'WORLD',
          explanation:
            'The initial value is "hello". When the user focuses and types "world", each keystroke triggers handleChange which converts the value to uppercase via toUpperCase(). The controlled input always displays the state value, so the input shows "WORLD". Note: the initial "hello" is replaced entirely because typing into a controlled input replaces its value.',
          hint: 'The onChange handler transforms the input before storing it in state.',
        },
      ],
    },
  ],
};

export default reactModule2;
