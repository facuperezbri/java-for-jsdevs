import type { Module } from '../../../../types';
import project4 from '../projects/react-project-4';

const reactModule4: Module = {
  id: 'react-m4',
  order: 4,
  title: 'Advanced Patterns',
  subtitle: 'Context, refs, error boundaries, HOCs, and performance',
  icon: '🧩',
  accentColor: 'green',
  quizId: 'react-quiz-4',
  project: project4,
  lessons: [
    // ─── Lesson 1: Context API ──────────────────────────────────────────────────
    {
      id: 'lesson-r4-1',
      moduleId: 'react-m4',
      title: 'Context API',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Creating & Providing Context',
          explanation:
            'The Context API lets you pass data through the component tree without prop drilling. In both class and hooks approaches, you create a context with React.createContext and wrap a subtree with a Provider. The difference is only in how components consume the context value.',
          analogy:
            'Think of context as a radio broadcast: the Provider is the radio station, and consumers are radios tuned to that frequency. Any component in the subtree can "tune in" without the signal being relayed through every component in between.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `// Create context (same in both patterns)
const ThemeContext = React.createContext('light');

// Provider component (same in both)
class App extends React.Component {
  state = { theme: 'dark' };

  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// Consuming with contextType (single context)
class ThemedButton extends React.Component {
  static contextType = ThemeContext;

  render() {
    return <button className={this.context}>Click</button>;
  }
}`,
            },
            right: {
              label: 'Hooks Pattern',
              language: 'jsx',
              code: `// Create context (same in both patterns)
const ThemeContext = React.createContext('light');

// Provider component (same in both)
function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// Consuming with useContext
function ThemedButton() {
  const theme = useContext(ThemeContext);

  return <button className={theme}>Click</button>;
}`,
            },
            caption:
              'useContext replaces both static contextType and the Consumer render-prop pattern',
          },
          challenge: {
            id: 'ch4-1-1',
            type: 'fill-blank',
            prompt: 'Complete the hook-based context consumption:',
            code: `const UserContext = React.createContext(null);

function UserGreeting() {
  const user = ___BLANK_1___(___BLANK_2___);

  return <h1>Hello, {user.name}!</h1>;
}`,
            blanks: [
              { id: 'b1', expected: ['useContext'], hint: 'hook that reads context' },
              { id: 'b2', expected: ['UserContext'], hint: 'the context object' },
            ],
            explanation:
              'useContext(UserContext) reads the current value from the nearest UserContext.Provider above in the tree. It replaces the class static contextType pattern.',
          },
        },
        {
          id: 'c2',
          title: 'Consumer Render Prop vs useContext',
          explanation:
            'Before hooks, consuming multiple contexts in a class component required nesting Consumer components with render props. This led to deeply nested "callback hell". useContext eliminates this nesting entirely, letting you read any number of contexts as simple variable assignments.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `// Consumer render prop (supports multiple contexts)
class StatusBar extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <UserContext.Consumer>
            {user => (
              <div className={theme}>
                Logged in as {user.name}
              </div>
            )}
          </UserContext.Consumer>
        )}
      </ThemeContext.Consumer>
    );
  }
}`,
            },
            right: {
              label: 'Hooks Pattern',
              language: 'jsx',
              code: `// useContext — flat and readable
function StatusBar() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);

  return (
    <div className={theme}>
      Logged in as {user.name}
    </div>
  );
}`,
            },
            caption:
              'Multiple contexts in classes require nested Consumer render props; hooks flatten this completely',
          },
          callout: {
            type: 'tip',
            text: 'A common pattern is to create a custom hook like useTheme() that wraps useContext(ThemeContext) and adds a missing-provider error check. This centralizes the context import and gives better error messages.',
          },
        },
        {
          id: 'c3',
          title: 'Context with State Updates',
          explanation:
            'To let consumers update context, pass a setter function alongside the value. In classes, you typically pass a method; with hooks, you pass the useState setter (or a dispatch from useReducer for complex state).',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});

class ThemeProvider extends React.Component {
  state = { theme: 'light' };

  toggleTheme = () => {
    this.setState(prev => ({
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  render() {
    const value = {
      theme: this.state.theme,
      toggleTheme: this.toggleTheme,
    };
    return (
      <ThemeContext.Provider value={value}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}`,
            },
            right: {
              label: 'Hooks Pattern',
              language: 'jsx',
              code: `const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme(prev =>
      prev === 'light' ? 'dark' : 'light'
    );
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}`,
            },
            caption:
              'The hooks version uses useMemo to stabilize the context value object and avoid unnecessary re-renders of consumers',
          },
          challenge: {
            id: 'ch4-1-2',
            type: 'fill-blank',
            prompt: 'Complete the context consumer that toggles the theme:',
            code: `function ThemeToggle() {
  const { theme, ___BLANK_1___ } = useContext(___BLANK_2___);

  return (
    <button onClick={___BLANK_3___}>
      Current: {theme}
    </button>
  );
}`,
            blanks: [
              { id: 'b1', expected: ['toggleTheme'], hint: 'the function that switches themes' },
              { id: 'b2', expected: ['ThemeContext'], hint: 'the context object' },
              { id: 'b3', expected: ['toggleTheme'], hint: 'call the toggler on click' },
            ],
            explanation:
              'Destructure both the state and the updater from context. The toggleTheme function was passed by the provider, so consumers can call it directly.',
          },
        },
      ],
      translationDrills: [
        {
          id: 'td4-1-1',
          sourceLabel: 'Class Pattern',
          sourceCode: `class Greeting extends React.Component {
  static contextType = ThemeContext;

  render() {
    return <h1 className={this.context}>Hello</h1>;
  }
}`,
          targetLabel: 'Hooks Pattern',
          targetTemplate: `function Greeting() {
  const theme = ___SLOT_1___(___SLOT_2___);

  return <h1 className={___SLOT_3___}>Hello</h1>;
}`,
          slots: [
            { id: 'slot-1', expected: 'useContext' },
            { id: 'slot-2', expected: 'ThemeContext' },
            { id: 'slot-3', expected: 'theme' },
          ],
          tokenBank: ['useContext', 'ThemeContext', 'theme', 'this.context', 'useState', 'context'],
          explanation:
            'useContext(ThemeContext) replaces static contextType + this.context. The returned value is assigned to a local variable instead of being accessed via this.context.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'Why is it important to memoize the value object passed to a Context Provider? What happens if you create a new object on every render?',
          hint: 'Think about how React determines whether consumers need to re-render.',
          answer:
            'If the Provider creates a new value object on every render (e.g., value={{ theme, toggle }}), React sees a different reference each time and re-renders ALL consumers, even if the actual data has not changed. Wrapping the value in useMemo ensures a stable reference, so consumers only re-render when the data truly changes.',
        },
        {
          id: 'e2',
          prompt:
            'What advantage does useContext have over the Consumer render-prop pattern when a component needs to read three different contexts?',
          hint: 'Think about nesting depth and readability.',
          answer:
            'With the Consumer pattern you must nest three render-prop callbacks, creating a pyramid shape that is hard to read. With useContext, you call it three times at the top of your function — three flat lines instead of three levels of indentation. The logic and JSX remain at the same indentation level.',
        },
      ],
    },

    // ─── Lesson 2: Refs ─────────────────────────────────────────────────────────
    {
      id: 'lesson-r4-2',
      moduleId: 'react-m4',
      title: 'Refs',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'Creating Refs',
          explanation:
            'Refs provide a way to access DOM nodes or store mutable values that persist across renders without triggering a re-render. In class components you use React.createRef() (or callback refs); with hooks you use useRef(). Both produce an object with a .current property.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `class TextInput extends React.Component {
  constructor(props) {
    super(props);
    // Create a ref in the constructor
    this.inputRef = React.createRef();
  }

  focusInput = () => {
    // Access the DOM node via .current
    this.inputRef.current.focus();
  };

  render() {
    return (
      <div>
        <input ref={this.inputRef} />
        <button onClick={this.focusInput}>
          Focus
        </button>
      </div>
    );
  }
}`,
            },
            right: {
              label: 'Hooks Pattern',
              language: 'jsx',
              code: `function TextInput() {
  // Create a ref with useRef
  const inputRef = useRef(null);

  const focusInput = () => {
    // Access the DOM node via .current
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>
        Focus
      </button>
    </div>
  );
}`,
            },
            caption:
              'React.createRef() is called in the constructor; useRef() is called at the top of the function component',
          },
          challenge: {
            id: 'ch4-2-1',
            type: 'fill-blank',
            prompt: 'Complete the hook-based ref to focus an input on mount:',
            code: `function AutoFocus() {
  const inputRef = ___BLANK_1___(null);

  useEffect(() => {
    inputRef.___BLANK_2___.focus();
  }, []);

  return <input ref={___BLANK_3___} />;
}`,
            blanks: [
              { id: 'b1', expected: ['useRef'], hint: 'hook that creates a ref' },
              { id: 'b2', expected: ['current'], hint: 'property that holds the DOM node' },
              { id: 'b3', expected: ['inputRef'], hint: 'attach the ref to the element' },
            ],
            explanation:
              'useRef(null) creates the ref, .current holds the actual DOM node after mount, and passing ref={inputRef} to the JSX element connects them.',
          },
        },
        {
          id: 'c2',
          title: 'Refs as Instance Variables',
          explanation:
            'Beyond DOM access, refs can hold any mutable value that should persist across renders without causing re-renders. In classes you would use regular instance properties (this.timer). With hooks, useRef serves the same purpose — it is the equivalent of an instance variable.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `class Timer extends React.Component {
  // Instance variable — persists, no re-render
  timerId = null;

  componentDidMount() {
    this.timerId = setInterval(() => {
      console.log('tick');
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return <div>Timer running</div>;
  }
}`,
            },
            right: {
              label: 'Hooks Pattern',
              language: 'jsx',
              code: `function Timer() {
  // useRef as instance variable
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      console.log('tick');
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  return <div>Timer running</div>;
}`,
            },
            caption:
              'useRef is the hooks equivalent of instance variables — mutable, persistent, and does not trigger re-renders',
          },
          callout: {
            type: 'warning',
            text: 'Never use a regular let variable inside a function component for values that must persist across renders. A new let is created on every render. Use useRef instead.',
          },
        },
        {
          id: 'c3',
          title: 'forwardRef — Passing Refs to Child Components',
          explanation:
            'By default, you cannot pass a ref to a function component — ref is not a regular prop. React.forwardRef lets a child component receive a ref from its parent and attach it to an internal DOM element. This is essential for reusable component libraries.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `// Class components can receive refs directly
class FancyInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  focus() {
    this.inputRef.current.focus();
  }

  render() {
    return <input ref={this.inputRef} />;
  }
}

// Parent gets ref to the class instance
class Parent extends React.Component {
  childRef = React.createRef();

  handleClick = () => {
    this.childRef.current.focus();
  };

  render() {
    return <FancyInput ref={this.childRef} />;
  }
}`,
            },
            right: {
              label: 'Hooks Pattern',
              language: 'jsx',
              code: `// forwardRef passes ref through to a DOM node
const FancyInput = React.forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// Parent passes ref directly to the DOM input
function Parent() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <FancyInput ref={inputRef} />
      <button onClick={handleClick}>Focus</button>
    </div>
  );
}`,
            },
            caption:
              'forwardRef lets function components expose a ref to their internal DOM element',
          },
          callout: {
            type: 'tip',
            text: 'Combine forwardRef with useImperativeHandle to customize what the parent sees through the ref — for example, exposing only a .focus() method instead of the entire DOM node.',
          },
        },
      ],
      predictOutputs: [
        {
          id: 'po4-2-1',
          code: `function Counter() {
  const renderCount = useRef(0);
  const [count, setCount] = useState(0);

  renderCount.current += 1;

  console.log('Renders:', renderCount.current);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}
// User clicks the button twice.
// What is logged on the third render?`,
          language: 'jsx',
          expectedOutput: 'Renders: 3',
          explanation:
            'The component renders once initially (renderCount becomes 1), then re-renders on each click (2, then 3). On the third render, renderCount.current is 3. Because useRef does not trigger re-renders, the mutation is silent — but the value persists across renders.',
          hint: 'useRef values persist across renders. Count the initial render plus two click-triggered renders.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'What is the key difference between storing a value in useState vs useRef? When would you choose one over the other?',
          hint: 'Think about what triggers a re-render.',
          answer:
            'useState triggers a re-render when updated; useRef does not. Use useState for values the UI depends on (displayed data). Use useRef for values you need to persist but that should not cause re-renders (timer IDs, previous values, DOM nodes, render counts).',
        },
        {
          id: 'e2',
          prompt:
            'Why can\'t you just pass a ref prop to a regular function component? What does forwardRef solve?',
          hint: 'Think about how React treats the "ref" prop specially.',
          answer:
            'React strips the ref prop before passing props to function components — it is a reserved prop like "key". forwardRef creates a component that receives ref as a second argument (separate from props), allowing the child to attach it to an internal DOM element or expose it via useImperativeHandle.',
        },
      ],
    },

    // ─── Lesson 3: Error Boundaries ─────────────────────────────────────────────
    {
      id: 'lesson-r4-3',
      moduleId: 'react-m4',
      title: 'Error Boundaries',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'getDerivedStateFromError & componentDidCatch',
          explanation:
            'Error boundaries are React components that catch JavaScript errors in their child component tree, log those errors, and display a fallback UI. They are implemented using two class lifecycle methods: static getDerivedStateFromError (to update state and render fallback) and componentDidCatch (to log error info). There is no hooks equivalent — error boundaries must be class components.',
          analogy:
            'An error boundary is like a circuit breaker in an electrical panel. When a fault occurs in one circuit (component subtree), the breaker trips (shows fallback UI) and prevents the entire house (app) from losing power (crashing).',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  // Called during render phase — update state
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Called during commit phase — side effects
  componentDidCatch(error, errorInfo) {
    console.error('Caught by boundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
    // Log to an error reporting service
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h2>Something went wrong.</h2>
          <pre>{this.state.error?.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}`,
            },
            right: {
              label: 'Hooks Pattern',
              language: 'jsx',
              code: `// Error boundaries MUST be class components.
// Common pattern: wrap in a reusable component
// and use it from function components.

// 1. Keep the class error boundary (see left)
// 2. Create a convenient wrapper hook:

function useErrorBoundary() {
  const [error, setError] = useState(null);

  // For catching errors in event handlers
  // (which error boundaries do NOT catch)
  const handleError = useCallback((error) => {
    setError(error);
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  if (error) throw error; // let boundary catch it

  return { handleError, resetError };
}

// Usage in a function component:
function DataLoader() {
  const { handleError } = useErrorBoundary();

  const fetchData = async () => {
    try {
      await api.getData();
    } catch (err) {
      handleError(err); // re-throws for boundary
    }
  };

  return <button onClick={fetchData}>Load</button>;
}`,
            },
            caption:
              'Error boundaries remain class-only; the hooks pattern wraps them for ergonomic use from function components',
          },
          callout: {
            type: 'warning',
            text: 'Error boundaries do NOT catch errors in event handlers, async code, server-side rendering, or errors thrown in the boundary itself. Use try/catch in event handlers and async functions.',
          },
          challenge: {
            id: 'ch4-3-1',
            type: 'fill-blank',
            prompt: 'Complete the error boundary class:',
            code: `class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static ___BLANK_1___(error) {
    return { hasError: true };
  }

  ___BLANK_2___(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.___BLANK_3___) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}`,
            blanks: [
              { id: 'b1', expected: ['getDerivedStateFromError'], hint: 'static method that returns new state' },
              { id: 'b2', expected: ['componentDidCatch'], hint: 'lifecycle method for logging' },
              { id: 'b3', expected: ['hasError'], hint: 'the state flag we set to true' },
            ],
            explanation:
              'getDerivedStateFromError is the static method that updates state to trigger fallback rendering. componentDidCatch is the instance method for side effects like error logging. Together they form a complete error boundary.',
          },
        },
        {
          id: 'c2',
          title: 'Using Error Boundaries in Your App',
          explanation:
            'You can place error boundaries at different granularity levels: around the entire app (catch-all), around major sections (sidebar, main content), or around individual widgets. Finer-grained boundaries provide a better user experience because only the broken section shows a fallback.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `// Granular error boundaries
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>

        <div className="content">
          <ErrorBoundary>
            <Sidebar />
          </ErrorBoundary>

          <ErrorBoundary>
            <MainContent />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

// If Sidebar crashes, Header and MainContent
// continue working normally.`,
            },
            right: {
              label: 'Hooks Pattern',
              language: 'jsx',
              code: `// Same boundary usage from function components
function App() {
  return (
    <div className="app">
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>

      <div className="content">
        <ErrorBoundary>
          <Sidebar />
        </ErrorBoundary>

        <ErrorBoundary>
          <MainContent />
        </ErrorBoundary>
      </div>
    </div>
  );
}

// The ErrorBoundary component itself is still
// a class, but consuming code can be functional.`,
            },
            caption:
              'Place error boundaries strategically — finer granularity means less of the UI breaks when errors occur',
          },
        },
        {
          id: 'c3',
          title: 'Error Boundary with Reset',
          explanation:
            'A production-ready error boundary should offer a way to recover — typically a "Try again" button that resets the error state. You can also reset on navigation changes by using a key prop that changes when the route changes.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `class ResettableErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    logErrorToService(error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={this.handleReset}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Reset on route change using key:
// <ErrorBoundary key={location.pathname}>`,
            },
            right: {
              label: 'Hooks Pattern',
              language: 'jsx',
              code: `// Libraries like react-error-boundary provide
// a hook-friendly API around the class pattern:

// Using react-error-boundary library:
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset app state here
      }}
      resetKeys={[location.pathname]}
    >
      <MainContent />
    </ErrorBoundary>
  );
}`,
            },
            caption:
              'The react-error-boundary library wraps the class pattern in a hook-friendly API with built-in reset support',
          },
          callout: {
            type: 'tip',
            text: 'The react-error-boundary library (by the React team\'s recommendation) gives you useErrorBoundary, ErrorBoundary component with FallbackComponent, onReset, and resetKeys props — all backed by the same class-based mechanism under the hood.',
          },
        },
      ],
      predictOutputs: [
        {
          id: 'po4-3-1',
          code: `class Boundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <p>Error!</p>;
    return this.props.children;
  }
}

function BuggyButton() {
  const handleClick = () => { throw new Error('boom'); };
  return <button onClick={handleClick}>Click</button>;
}

// Rendered as:
// <Boundary><BuggyButton /></Boundary>
// User clicks the button. What is displayed?`,
          language: 'jsx',
          expectedOutput: 'The button remains — the error is NOT caught by the boundary.',
          explanation:
            'Error boundaries only catch errors during rendering, lifecycle methods, and constructors. Errors thrown inside event handlers are NOT caught by error boundaries. The click handler error will propagate as an unhandled exception instead. Use try/catch inside event handlers for those cases.',
          hint: 'Think about when error boundaries catch errors and when they do not.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'Why can\'t error boundaries be written as function components with hooks? What would be needed in React to support this?',
          hint: 'Think about what lifecycle methods error boundaries rely on.',
          answer:
            'Error boundaries rely on getDerivedStateFromError and componentDidCatch — two class lifecycle methods with no hook equivalents. React would need to introduce hooks like useCatch or useErrorBoundary at the framework level. The React team has discussed this but has not shipped it yet, so error boundaries remain class-only.',
        },
      ],
    },

    // ─── Lesson 4: HOCs vs Custom Hooks ─────────────────────────────────────────
    {
      id: 'lesson-r4-4',
      moduleId: 'react-m4',
      title: 'HOCs vs Custom Hooks',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Higher-Order Components (HOCs)',
          explanation:
            'A Higher-Order Component is a function that takes a component and returns a new enhanced component. It is a pattern derived from higher-order functions. HOCs were the primary way to share cross-cutting logic (auth, data fetching, theming) in class-based React. They work by wrapping a component and injecting props.',
          analogy:
            'A HOC is like a gift-wrapping service: you give it a plain box (component), and it wraps it in decorative paper (extra behavior/props) and hands back a fancier package. The gift inside is unchanged.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `// HOC that adds current user data
function withUser(WrappedComponent) {
  return class extends React.Component {
    state = { user: null, loading: true };

    componentDidMount() {
      fetchUser().then(user =>
        this.setState({ user, loading: false })
      );
    }

    render() {
      if (this.state.loading) return <Spinner />;
      return (
        <WrappedComponent
          user={this.state.user}
          {...this.props}
        />
      );
    }
  };
}

// Usage — wrap the component
class Profile extends React.Component {
  render() {
    return <h1>{this.props.user.name}</h1>;
  }
}

const ProfileWithUser = withUser(Profile);`,
            },
            right: {
              label: 'Hooks Pattern',
              language: 'jsx',
              code: `// Custom hook that provides user data
function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser().then(data => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  return { user, loading };
}

// Usage — call the hook directly
function Profile() {
  const { user, loading } = useUser();

  if (loading) return <Spinner />;
  return <h1>{user.name}</h1>;
}

// No wrapping, no extra component layers!`,
            },
            caption:
              'Custom hooks replace HOCs by extracting shared logic into a function you call, not a wrapper you apply',
          },
          challenge: {
            id: 'ch4-4-1',
            type: 'fill-blank',
            prompt: 'Convert this HOC usage to a custom hook pattern:',
            code: `// Custom hook
function useWindowWidth() {
  const [width, setWidth] = ___BLANK_1___(window.innerWidth);

  ___BLANK_2___(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return ___BLANK_3___;
}`,
            blanks: [
              { id: 'b1', expected: ['useState'], hint: 'hook to store the width' },
              { id: 'b2', expected: ['useEffect'], hint: 'hook for side effects (event listener)' },
              { id: 'b3', expected: ['width'], hint: 'what value does the hook return?' },
            ],
            explanation:
              'The custom hook uses useState to track the value, useEffect to set up and tear down the event listener, and returns just the width value. Any component can call useWindowWidth() without being wrapped.',
          },
        },
        {
          id: 'c2',
          title: 'Problems with HOCs',
          explanation:
            'HOCs have several well-known problems: "wrapper hell" (deeply nested wrappers in DevTools), prop collision (two HOCs injecting the same prop name), indirection (hard to trace where a prop comes from), and static composition (HOCs are applied at definition time, not dynamically). Custom hooks solve all of these issues.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `// Wrapper hell — stacking multiple HOCs
const EnhancedComponent = withRouter(
  withTheme(
    withAuth(
      withAnalytics(
        MyComponent
      )
    )
  )
);

// DevTools shows:
// <withRouter(withTheme(withAuth(withAnalytics(MyComponent))))>
//   <withTheme(withAuth(withAnalytics(MyComponent)))>
//     <withAuth(withAnalytics(MyComponent))>
//       <withAnalytics(MyComponent)>
//         <MyComponent />

// Prop collision risk:
// Both withTheme and withAuth might inject
// a "loading" prop — last one wins silently.`,
            },
            right: {
              label: 'Hooks Pattern',
              language: 'jsx',
              code: `// Flat, explicit, composable
function MyComponent() {
  const { location } = useRouter();
  const theme = useTheme();
  const { user, isAuthed } = useAuth();
  const { track } = useAnalytics();

  // No wrapper components in DevTools
  // No prop collisions — you name the variables
  // Clear where each value comes from
  // Can be conditional:
  const data = isAuthed ? useUserData() : null;

  return (
    <div className={theme}>
      <p>Welcome, {user.name}</p>
      <p>Current path: {location.pathname}</p>
    </div>
  );
}`,
            },
            caption:
              'Hooks eliminate wrapper hell, prop collisions, and indirection problems that plague HOCs',
          },
          callout: {
            type: 'gotcha',
            text: 'The conditional hook call shown above (isAuthed ? useUserData() : null) actually violates the Rules of Hooks. Hooks must be called unconditionally. Instead, call the hook always and handle the condition inside it or after it returns.',
          },
        },
        {
          id: 'c3',
          title: 'Custom Hook Composition',
          explanation:
            'One of the most powerful features of custom hooks is that they can call other hooks. This lets you build complex behaviors by composing simpler hooks — something that was awkward with HOCs because each HOC was a separate wrapper layer.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `// Composing HOCs is unwieldy
function withUserAndPosts(WrappedComponent) {
  // Nested HOC composition
  return withUser(
    class extends React.Component {
      state = { posts: [] };

      componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
          fetchPosts(this.props.user.id)
            .then(posts => this.setState({ posts }));
        }
      }

      render() {
        return (
          <WrappedComponent
            posts={this.state.posts}
            {...this.props}
          />
        );
      }
    }
  );
}`,
            },
            right: {
              label: 'Hooks Pattern',
              language: 'jsx',
              code: `// Composing hooks is natural
function usePosts(userId) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchPosts(userId).then(setPosts);
    }
  }, [userId]);

  return posts;
}

function useUserAndPosts() {
  // Hooks composing other hooks
  const { user } = useUser();
  const posts = usePosts(user?.id);

  return { user, posts };
}

// Usage
function Dashboard() {
  const { user, posts } = useUserAndPosts();
  return <PostList user={user} posts={posts} />;
}`,
            },
            caption:
              'Custom hooks compose by simply calling each other — no wrapper nesting required',
          },
        },
      ],
      translationDrills: [
        {
          id: 'td4-4-1',
          sourceLabel: 'Class Pattern',
          sourceCode: `function withMousePosition(Component) {
  return class extends React.Component {
    state = { x: 0, y: 0 };

    handleMouseMove = (e) => {
      this.setState({ x: e.clientX, y: e.clientY });
    };

    componentDidMount() {
      window.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillUnmount() {
      window.removeEventListener('mousemove', this.handleMouseMove);
    }

    render() {
      return <Component mouseX={this.state.x} mouseY={this.state.y} {...this.props} />;
    }
  };
}`,
          targetLabel: 'Hooks Pattern',
          targetTemplate: `function useMousePosition() {
  const [position, setPosition] = ___SLOT_1___({ x: 0, y: 0 });

  ___SLOT_2___(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.___SLOT_3___, y: e.___SLOT_4___ });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.___SLOT_5___('mousemove', handleMouseMove);
  }, []);

  return position;
}`,
          slots: [
            { id: 'slot-1', expected: 'useState' },
            { id: 'slot-2', expected: 'useEffect' },
            { id: 'slot-3', expected: 'clientX' },
            { id: 'slot-4', expected: 'clientY' },
            { id: 'slot-5', expected: 'removeEventListener' },
          ],
          tokenBank: [
            'useState',
            'useEffect',
            'clientX',
            'clientY',
            'removeEventListener',
            'useRef',
            'pageX',
            'pageY',
            'addEventListener',
          ],
          explanation:
            'The HOC pattern is converted to a custom hook: class state becomes useState, componentDidMount/WillUnmount becomes useEffect with a cleanup return, and the wrapped component is replaced by any component calling useMousePosition().',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'You have a withAuth HOC that checks if the user is logged in and redirects to /login if not. How would you rewrite this as a custom hook?',
          hint: 'The hook should return auth state, and the component can decide what to do with it.',
          answer:
            'Create a useAuth() hook that returns { user, isAuthenticated, isLoading }. The component calls the hook and handles the redirect itself: if (!isAuthenticated && !isLoading) navigate("/login"). This is more flexible — the component decides the redirect target and timing instead of the HOC making that decision.',
        },
        {
          id: 'e2',
          prompt:
            'Can you still use HOCs with function components? Is there ever a reason to prefer a HOC over a custom hook?',
          hint: 'Think about third-party library integration and component-level concerns.',
          answer:
            'Yes, HOCs work with function components too (they wrap any component). A HOC might still be preferred when you need to wrap a component for a framework (e.g., React.memo is technically a HOC), when you want to intercept/modify props before they reach a component, or when integrating with class-based libraries. However, for shared stateful logic, custom hooks are almost always the better choice.',
        },
      ],
    },

    // ─── Lesson 5: Performance ──────────────────────────────────────────────────
    {
      id: 'lesson-r4-5',
      moduleId: 'react-m4',
      title: 'Performance',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Preventing Unnecessary Re-renders',
          explanation:
            'By default, when a parent re-renders, all children re-render too — even if their props haven\'t changed. In class components, shouldComponentUpdate or extending PureComponent prevents this. With hooks, React.memo wraps a function component to achieve the same shallow-prop comparison.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `// Option 1: manual shouldComponentUpdate
class ExpensiveList extends React.Component {
  shouldComponentUpdate(nextProps) {
    // Only re-render if items actually changed
    return nextProps.items !== this.props.items;
  }

  render() {
    return this.props.items.map(item =>
      <li key={item.id}>{item.name}</li>
    );
  }
}

// Option 2: PureComponent (shallow comparison)
class ExpensiveList extends React.PureComponent {
  // Automatically implements shouldComponentUpdate
  // with shallow prop + state comparison
  render() {
    return this.props.items.map(item =>
      <li key={item.id}>{item.name}</li>
    );
  }
}`,
            },
            right: {
              label: 'Hooks Pattern',
              language: 'jsx',
              code: `// React.memo — PureComponent for functions
const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  return items.map(item =>
    <li key={item.id}>{item.name}</li>
  );
});

// With custom comparison (like shouldComponentUpdate):
const ExpensiveList = React.memo(
  function ExpensiveList({ items }) {
    return items.map(item =>
      <li key={item.id}>{item.name}</li>
    );
  },
  (prevProps, nextProps) => {
    // Return true to SKIP re-render (opposite of sCU!)
    return prevProps.items === nextProps.items;
  }
);`,
            },
            caption:
              'React.memo = PureComponent for function components. Note: the custom comparator returns true to skip (opposite of shouldComponentUpdate)',
          },
          callout: {
            type: 'gotcha',
            text: 'React.memo\'s custom comparator returns true to SKIP re-render, but shouldComponentUpdate returns true to ALLOW re-render. They have opposite semantics! This is a common source of confusion.',
          },
          challenge: {
            id: 'ch4-5-1',
            type: 'fill-blank',
            prompt: 'Wrap this component with React.memo to prevent unnecessary re-renders:',
            code: `const UserCard = ___BLANK_1___(function UserCard({ name, avatar }) {
  console.log('UserCard rendered');
  return (
    <div>
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
    </div>
  );
});

// This only re-renders when ___BLANK_2___ or ___BLANK_3___ changes.`,
            blanks: [
              { id: 'b1', expected: ['React.memo'], hint: 'the memoization wrapper' },
              { id: 'b2', expected: ['name'], hint: 'first prop' },
              { id: 'b3', expected: ['avatar'], hint: 'second prop' },
            ],
            explanation:
              'React.memo performs a shallow comparison of props. Since UserCard receives name and avatar, it only re-renders when either of those values changes by reference.',
          },
        },
        {
          id: 'c2',
          title: 'useMemo — Memoizing Expensive Computations',
          explanation:
            'useMemo caches the result of an expensive computation and only recalculates when its dependencies change. In class components, you would either compute in shouldComponentUpdate, use a memoization library, or store derived data in state. useMemo makes this declarative.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `class FilteredList extends React.Component {
  // Manual memoization via instance cache
  lastItems = null;
  lastFilter = null;
  lastResult = null;

  getFilteredItems() {
    if (
      this.props.items === this.lastItems &&
      this.props.filter === this.lastFilter
    ) {
      return this.lastResult;
    }

    const result = this.props.items.filter(item =>
      item.name.includes(this.props.filter)
    );

    this.lastItems = this.props.items;
    this.lastFilter = this.props.filter;
    this.lastResult = result;
    return result;
  }

  render() {
    const filtered = this.getFilteredItems();
    return filtered.map(i =>
      <div key={i.id}>{i.name}</div>
    );
  }
}`,
            },
            right: {
              label: 'Hooks Pattern',
              language: 'jsx',
              code: `function FilteredList({ items, filter }) {
  // useMemo caches the result
  const filtered = useMemo(() => {
    // Expensive computation
    return items.filter(item =>
      item.name.includes(filter)
    );
  }, [items, filter]);
  // Only recomputes when items or filter changes

  return filtered.map(i =>
    <div key={i.id}>{i.name}</div>
  );
}`,
            },
            caption:
              'useMemo replaces manual memoization caching with a single declarative call',
          },
          callout: {
            type: 'tip',
            text: 'Don\'t overuse useMemo. It has its own overhead (storing the previous result and comparing dependencies). Only use it for genuinely expensive computations or when referential equality matters for downstream React.memo components.',
          },
        },
        {
          id: 'c3',
          title: 'useCallback — Memoizing Functions',
          explanation:
            'Every time a function component renders, any inline function is recreated as a new reference. If that function is passed as a prop to a React.memo child, the child re-renders anyway because the prop changed. useCallback memoizes the function reference so it only changes when its dependencies change.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `class TodoApp extends React.Component {
  state = { todos: [] };

  // Class method — stable reference automatically
  handleDelete = (id) => {
    this.setState(prev => ({
      todos: prev.todos.filter(t => t.id !== id),
    }));
  };

  render() {
    return (
      <TodoList
        todos={this.state.todos}
        onDelete={this.handleDelete}
      />
    );
  }
}

// this.handleDelete is always the same reference
// so PureComponent children won't re-render
// unnecessarily.`,
            },
            right: {
              label: 'Hooks Pattern',
              language: 'jsx',
              code: `function TodoApp() {
  const [todos, setTodos] = useState([]);

  // Without useCallback: new function every render!
  // const handleDelete = (id) => { ... };

  // With useCallback: stable reference
  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []); // no deps because we use functional update

  return (
    <TodoList
      todos={todos}
      onDelete={handleDelete}
    />
  );
}

// Now handleDelete stays the same reference
// so React.memo(TodoList) can skip re-renders.`,
            },
            caption:
              'useCallback stabilizes function references — critical when passing callbacks to memoized children',
          },
          challenge: {
            id: 'ch4-5-2',
            type: 'fill-blank',
            prompt: 'Stabilize this callback so the memoized child does not re-render:',
            code: `function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = ___BLANK_1___(() => {
    fetchResults(query).then(setResults);
  }, [___BLANK_2___]);

  return (
    <div>
      <input onChange={e => setQuery(e.target.value)} />
      <MemoizedResults results={results} onSearch={handleSearch} />
    </div>
  );
}`,
            blanks: [
              { id: 'b1', expected: ['useCallback'], hint: 'hook that memoizes functions' },
              { id: 'b2', expected: ['query'], hint: 'the value used inside the callback' },
            ],
            explanation:
              'useCallback memoizes handleSearch so that MemoizedResults only sees a new reference when query changes. Without useCallback, a new function is created on every keystroke, defeating React.memo on the results component.',
          },
        },
      ],
      translationDrills: [
        {
          id: 'td4-5-1',
          sourceLabel: 'Class Pattern',
          sourceCode: `class UserList extends React.PureComponent {
  render() {
    const sorted = this.props.users.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    return sorted.map(u => <li key={u.id}>{u.name}</li>);
  }
}`,
          targetLabel: 'Hooks Pattern',
          targetTemplate: `const UserList = ___SLOT_1___(function UserList({ users }) {
  const sorted = ___SLOT_2___(() => {
    return users.sort((a, b) => a.name.localeCompare(b.name));
  }, [___SLOT_3___]);

  return sorted.map(u => <li key={u.id}>{u.name}</li>);
});`,
          slots: [
            { id: 'slot-1', expected: 'React.memo' },
            { id: 'slot-2', expected: 'useMemo' },
            { id: 'slot-3', expected: 'users' },
          ],
          tokenBank: [
            'React.memo',
            'useMemo',
            'users',
            'useCallback',
            'React.forwardRef',
            'useRef',
            'sorted',
          ],
          explanation:
            'PureComponent becomes React.memo (for shallow prop comparison). The sort computation is wrapped in useMemo with [users] as the dependency, so it only recalculates when the users array reference changes.',
        },
      ],
      predictOutputs: [
        {
          id: 'po4-5-1',
          code: `const Child = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(c => c + 1);
  };

  console.log('Parent rendered');
  return (
    <div>
      <p>{count}</p>
      <Child onClick={handleClick} />
    </div>
  );
}
// Initial mount, then user clicks once. What is logged?`,
          language: 'jsx',
          expectedOutput: 'Parent rendered\nChild rendered\nParent rendered\nChild rendered',
          explanation:
            'On mount, both Parent and Child render. When the user clicks, Parent re-renders (count changes), and even though Child is wrapped in React.memo, handleClick is a new function reference on every render (no useCallback). React.memo sees a different onClick prop and re-renders Child. To fix this, wrap handleClick in useCallback.',
          hint: 'Think about whether handleClick has the same reference between renders.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'You have a parent that re-renders frequently and passes an onClick handler to a React.memo child. The child still re-renders every time. Why, and how do you fix it?',
          hint: 'Think about what React.memo compares and what happens to inline functions on each render.',
          answer:
            'Inline functions are recreated on every render as new references. React.memo does a shallow comparison and sees a "different" onClick each time. Fix: wrap the handler in useCallback with appropriate dependencies. This keeps the reference stable, so React.memo correctly skips re-rendering the child.',
        },
        {
          id: 'e2',
          prompt:
            'What is the difference between useMemo and useCallback? Could you implement one in terms of the other?',
          hint: 'One memoizes a value, the other memoizes a function. Think about what a function is.',
          answer:
            'useMemo(() => fn, deps) returns the memoized result of calling fn. useCallback(fn, deps) returns the memoized fn itself. useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). They differ only in what they memoize: a computed value vs a function reference.',
        },
      ],
    },
  ],
};

export default reactModule4;
