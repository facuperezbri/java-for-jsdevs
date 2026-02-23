import type { Module } from '../../../../types';
import project3 from '../projects/react-project-3';

const reactModule3: Module = {
  id: 'react-m3',
  order: 3,
  title: 'State & Lifecycle',
  subtitle: 'Managing state and side effects in class and functional components',
  icon: '\uD83D\uDD04',
  accentColor: 'purple',
  quizId: 'react-quiz-3',
  project: project3,
  lessons: [
    // ─── Lesson 1: State Basics ──────────────────────────────────────────────────
    {
      id: 'lesson-r3-1',
      moduleId: 'react-m3',
      title: 'State Basics',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Declaring State: this.state vs useState',
          explanation:
            'In class components, state is an object stored in this.state and initialized in the constructor. In functional components, the useState hook lets you declare individual pieces of state as standalone variables. Each useState call returns a pair: the current value and a setter function.',
          analogy:
            'Think of class state as a filing cabinet with labeled drawers — everything lives in one big object. useState is like having individual sticky notes, each holding one piece of data you can update independently.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      name: 'Counter',
    };
  }

  render() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <p>Count: {this.state.count}</p>
      </div>
    );
  }
}`,
            },
            right: {
              label: 'Hooks',
              language: 'jsx',
              code: `function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Counter');

  return (
    <div>
      <h2>{name}</h2>
      <p>Count: {count}</p>
    </div>
  );
}`,
            },
            caption:
              'Class components keep all state in one object; hooks split state into independent variables',
          },
          challenge: {
            id: 'ch3-1-1',
            type: 'fill-blank',
            prompt:
              'Complete the hook version of a component that tracks a username:',
            code: `function Profile() {
  const [username, ___BLANK_1___] = ___BLANK_2___(___BLANK_3___);

  return <p>Hello, {username}</p>;
}`,
            blanks: [
              { id: 'b1', expected: ['setUsername'], hint: 'setter function' },
              { id: 'b2', expected: ['useState'], hint: 'state hook' },
              {
                id: 'b3',
                expected: ["'Guest'", '"Guest"'],
                hint: 'initial value',
              },
            ],
            explanation:
              'useState returns a [value, setter] pair. The convention is [thing, setThing]. The argument to useState is the initial value.',
          },
        },
        {
          id: 'c2',
          title: 'Updating State: setState vs Setter Functions',
          explanation:
            'In class components, you call this.setState() with an object that gets shallow-merged into the current state. With hooks, each setter function replaces the entire value for that piece of state. Both schedule a re-render.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class Counter extends React.Component {
  state = { count: 0 };

  increment = () => {
    // Merges { count: 1 } into state
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <button onClick={this.increment}>
        Clicked {this.state.count} times
      </button>
    );
  }
}`,
            },
            right: {
              label: 'Hooks',
              language: 'jsx',
              code: `function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // Replaces the count value entirely
    setCount(count + 1);
  };

  return (
    <button onClick={increment}>
      Clicked {count} times
    </button>
  );
}`,
            },
            caption:
              'this.setState shallow-merges; hook setters replace the value',
          },
          callout: {
            type: 'gotcha',
            text: 'State updates are asynchronous in both class and functional components. React batches multiple setState/setter calls for performance. Never rely on reading state immediately after setting it.',
          },
        },
        {
          id: 'c3',
          title: 'Immutability — Never Mutate State Directly',
          explanation:
            'In both class and functional components, you must treat state as immutable. Never modify state objects or arrays directly — always create new references. Mutating state directly will not trigger a re-render because React uses reference equality to detect changes.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class TodoList extends React.Component {
  state = { items: ['Buy milk'] };

  addItem = (item) => {
    // WRONG: mutating state directly
    // this.state.items.push(item);

    // CORRECT: create a new array
    this.setState({
      items: [...this.state.items, item],
    });
  };

  render() {
    return (
      <ul>
        {this.state.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
}`,
            },
            right: {
              label: 'Hooks',
              language: 'jsx',
              code: `function TodoList() {
  const [items, setItems] = useState(['Buy milk']);

  const addItem = (item) => {
    // WRONG: mutating state directly
    // items.push(item);

    // CORRECT: create a new array
    setItems([...items, item]);
  };

  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}`,
            },
            caption:
              'Always spread or copy state — mutations bypass React\'s change detection',
          },
          callout: {
            type: 'warning',
            text: 'Common beginner mistake: using .push(), .splice(), or direct property assignment on state. These mutate in place and React will NOT re-render. Always create new arrays/objects.',
          },
          challenge: {
            id: 'ch3-1-2',
            type: 'fix-bug',
            prompt:
              'This code has a bug — the UI does not update when removing an item. Fix it:',
            code: `function TodoList() {
  const [items, setItems] = useState(['A', 'B', 'C']);

  const removeItem = (index) => {
    ___BLANK_1___
  };

  return items.map((item, i) => (
    <button key={i} onClick={() => removeItem(i)}>{item}</button>
  ));
}`,
            blanks: [
              {
                id: 'b1',
                expected: [
                  'setItems(items.filter((_, i) => i !== index));',
                  'setItems(items.filter((_, i) => i !== index))',
                ],
                hint: 'Use filter to create a new array without the item at index',
              },
            ],
            explanation:
              'Use filter() to create a new array that excludes the item at the given index. This creates a new reference, which React can detect. Using splice() would mutate the original array.',
          },
        },
      ],
      translationDrills: [
        {
          id: 'td3-1-1',
          sourceLabel: 'Class Component',
          sourceCode: `class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOn: false };
  }

  toggle = () => {
    this.setState({ isOn: !this.state.isOn });
  };

  render() {
    return (
      <button onClick={this.toggle}>
        {this.state.isOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}`,
          targetLabel: 'Hooks',
          targetTemplate: `function Toggle() {
  const [isOn, ___SLOT_1___] = ___SLOT_2___(___SLOT_3___);

  const toggle = () => {
    ___SLOT_4___(___SLOT_5___);
  };

  return (
    <button onClick={toggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}`,
          slots: [
            { id: 'slot-1', expected: 'setIsOn' },
            { id: 'slot-2', expected: 'useState' },
            { id: 'slot-3', expected: 'false' },
            { id: 'slot-4', expected: 'setIsOn' },
            { id: 'slot-5', expected: '!isOn' },
          ],
          tokenBank: [
            'setIsOn',
            'useState',
            'false',
            'setIsOn',
            '!isOn',
            'true',
            'useReducer',
            'this.state.isOn',
          ],
          explanation:
            'useState(false) initializes the state. The setter setIsOn replaces the value. We pass !isOn (the negation of the current value) to toggle between true and false.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'What happens if you call setCount(count + 1) three times in a row inside the same event handler? What will the final count be if it starts at 0?',
          hint: 'Think about batching and when React reads the value of count.',
          answer:
            'The final count will be 1, not 3. All three calls read count as 0 (its value during this render) and set it to 0 + 1. Because React batches updates, it only schedules one re-render with count = 1. To increment three times, use the functional updater: setCount(prev => prev + 1).',
        },
        {
          id: 'e2',
          prompt:
            'In a class component, if your state has { name: "Alice", age: 25 } and you call this.setState({ age: 26 }), what happens to the name field?',
          hint: 'Think about how this.setState merges state.',
          answer:
            'The name field is preserved. this.setState performs a shallow merge, so only the age field is updated. The resulting state is { name: "Alice", age: 26 }. This differs from hook setters, which replace the entire value — so with useState for objects, you must spread the old state manually.',
        },
      ],
      predictOutputs: [
        {
          id: 'po3-1-1',
          code: `function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log(count);
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}
// User clicks the button once. What is logged?`,
          language: 'jsx',
          expectedOutput: '0',
          explanation:
            'State updates are asynchronous. The console.log runs synchronously and reads the current render\'s count, which is still 0. All three setCount calls also read count as 0, so they all set it to 1. After the re-render, count becomes 1 (not 3).',
          hint: 'State does not update immediately after calling the setter.',
        },
      ],
    },

    // ─── Lesson 2: Lifecycle vs useEffect ────────────────────────────────────────
    {
      id: 'lesson-r3-2',
      moduleId: 'react-m3',
      title: 'Lifecycle vs useEffect',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'componentDidMount vs useEffect(fn, [])',
          explanation:
            'In class components, componentDidMount runs once after the first render — ideal for fetching data, setting up subscriptions, or interacting with the DOM. The hooks equivalent is useEffect with an empty dependency array, which runs the effect exactly once after the initial render.',
          analogy:
            'componentDidMount is like a "grand opening" callback — it fires once when the store opens. useEffect(fn, []) is the same party, just written differently.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class UserProfile extends React.Component {
  state = { user: null, loading: true };

  componentDidMount() {
    fetch('/api/user/1')
      .then(res => res.json())
      .then(user => {
        this.setState({ user, loading: false });
      });
  }

  render() {
    if (this.state.loading) return <p>Loading...</p>;
    return <h1>{this.state.user.name}</h1>;
  }
}`,
            },
            right: {
              label: 'Hooks',
              language: 'jsx',
              code: `function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/1')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []); // empty array = run once on mount

  if (loading) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}`,
            },
            caption:
              'Empty dependency array [] = componentDidMount (runs once after first render)',
          },
          challenge: {
            id: 'ch3-2-1',
            type: 'fill-blank',
            prompt:
              'Complete this useEffect that fetches data once on mount:',
            code: `function Posts() {
  const [posts, setPosts] = useState([]);

  ___BLANK_1___(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, ___BLANK_2___);

  return posts.map(p => <p key={p.id}>{p.title}</p>);
}`,
            blanks: [
              { id: 'b1', expected: ['useEffect'], hint: 'effect hook' },
              { id: 'b2', expected: ['[]'], hint: 'run only on mount' },
            ],
            explanation:
              'useEffect with an empty dependency array [] runs only once after the initial render, just like componentDidMount. The effect function contains the fetch logic.',
          },
        },
        {
          id: 'c2',
          title: 'componentDidUpdate vs useEffect with Dependencies',
          explanation:
            'componentDidUpdate runs after every re-render (excluding the first). You typically add an if-check to compare prev/current props or state. With useEffect, you list the values you want to react to in the dependency array — React compares them automatically and only re-runs the effect when they change.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class SearchResults extends React.Component {
  state = { results: [] };

  componentDidUpdate(prevProps) {
    // Must manually compare to avoid infinite loop
    if (prevProps.query !== this.props.query) {
      fetch(\`/api/search?q=\${this.props.query}\`)
        .then(res => res.json())
        .then(results => {
          this.setState({ results });
        });
    }
  }

  render() {
    return (
      <ul>
        {this.state.results.map(r => (
          <li key={r.id}>{r.title}</li>
        ))}
      </ul>
    );
  }
}`,
            },
            right: {
              label: 'Hooks',
              language: 'jsx',
              code: `function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Runs whenever query changes
    fetch(\`/api/search?q=\${query}\`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, [query]); // React tracks this dependency

  return (
    <ul>
      {results.map(r => (
        <li key={r.id}>{r.title}</li>
      ))}
    </ul>
  );
}`,
            },
            caption:
              'Dependency array [query] replaces the manual prevProps comparison',
          },
          callout: {
            type: 'tip',
            text: 'The dependency array is not optional guidance — it is a contract. If your effect reads a value, list it in the deps array. The eslint-plugin-react-hooks rule "exhaustive-deps" enforces this.',
          },
        },
        {
          id: 'c3',
          title: 'componentWillUnmount vs Cleanup Function',
          explanation:
            'In class components, componentWillUnmount runs right before the component is removed from the DOM — used for canceling timers, unsubscribing from events, etc. In hooks, you return a cleanup function from useEffect. This cleanup runs before the component unmounts and also before the effect re-runs.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class Timer extends React.Component {
  state = { seconds: 0 };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(prev => ({
        seconds: prev.seconds + 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return <p>Elapsed: {this.state.seconds}s</p>;
  }
}`,
            },
            right: {
              label: 'Hooks',
              language: 'jsx',
              code: `function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup: runs on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <p>Elapsed: {seconds}s</p>;
}`,
            },
            caption:
              'The cleanup function returned from useEffect replaces componentWillUnmount',
          },
          callout: {
            type: 'warning',
            text: 'Forgetting cleanup is a common source of memory leaks. If your effect creates a subscription, timer, or event listener, always return a cleanup function to tear it down.',
          },
          challenge: {
            id: 'ch3-2-2',
            type: 'fill-blank',
            prompt:
              'Complete the cleanup in this useEffect that sets up a window resize listener:',
            code: `useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);

  ___BLANK_1___ () => {
    window.___BLANK_2___('resize', handleResize);
  };
}, []);`,
            blanks: [
              { id: 'b1', expected: ['return'], hint: 'how to return cleanup' },
              {
                id: 'b2',
                expected: ['removeEventListener'],
                hint: 'opposite of addEventListener',
              },
            ],
            explanation:
              'Return a cleanup function from useEffect that calls removeEventListener. This runs when the component unmounts, preventing memory leaks from orphaned event listeners.',
          },
        },
      ],
      translationDrills: [
        {
          id: 'td3-2-1',
          sourceLabel: 'Class Component',
          sourceCode: `class Clock extends React.Component {
  state = { time: new Date() };

  componentDidMount() {
    this.timerId = setInterval(
      () => this.setState({ time: new Date() }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return <p>{this.state.time.toLocaleTimeString()}</p>;
  }
}`,
          targetLabel: 'Hooks',
          targetTemplate: `function Clock() {
  const [time, setTime] = ___SLOT_1___(new Date());

  ___SLOT_2___(() => {
    const timerId = ___SLOT_3___(() => {
      setTime(___SLOT_4___);
    }, 1000);

    return () => ___SLOT_5___(timerId);
  }, []);

  return <p>{time.toLocaleTimeString()}</p>;
}`,
          slots: [
            { id: 'slot-1', expected: 'useState' },
            { id: 'slot-2', expected: 'useEffect' },
            { id: 'slot-3', expected: 'setInterval' },
            { id: 'slot-4', expected: 'new Date()' },
            { id: 'slot-5', expected: 'clearInterval' },
          ],
          tokenBank: [
            'useState',
            'useEffect',
            'setInterval',
            'new Date()',
            'clearInterval',
            'useRef',
            'setTimeout',
            'clearTimeout',
          ],
          explanation:
            'useState replaces this.state. useEffect with [] replaces componentDidMount. The returned cleanup function replaces componentWillUnmount. setInterval and clearInterval remain the same.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'What is the difference between useEffect(fn) with no dependency array and useEffect(fn, []) with an empty array?',
          hint: 'Think about how many times each version runs.',
          answer:
            'useEffect(fn) with no dependency array runs after every render (mount + every update). useEffect(fn, []) runs only once after the initial mount. Omitting the array is like componentDidMount + componentDidUpdate combined, while [] is just componentDidMount.',
        },
        {
          id: 'e2',
          prompt:
            'In a class component, how do you prevent componentDidUpdate from running on every render? How does useEffect solve this?',
          hint: 'Think about the manual comparison in componentDidUpdate.',
          answer:
            'In classes, you manually compare prevProps/prevState: if (prevProps.id !== this.props.id) { ... }. useEffect solves this with the dependency array: useEffect(() => { ... }, [id]). React automatically compares the deps and only re-runs the effect when they change — less boilerplate, fewer bugs.',
        },
      ],
      predictOutputs: [
        {
          id: 'po3-2-1',
          code: `function Logger({ value }) {
  useEffect(() => {
    console.log('Effect:', value);
    return () => console.log('Cleanup:', value);
  }, [value]);

  return <p>{value}</p>;
}
// value changes: "A" -> "B"
// What logs on the update?`,
          language: 'jsx',
          expectedOutput: 'Cleanup: A\nEffect: B',
          explanation:
            'When value changes from "A" to "B", React first runs the cleanup from the previous effect (logging "Cleanup: A"), then runs the new effect (logging "Effect: B"). Cleanup always runs with the values from the render that created it.',
          hint: 'Cleanup runs before the next effect, using the previous render\'s values.',
        },
      ],
    },

    // ─── Lesson 3: Complex State ─────────────────────────────────────────────────
    {
      id: 'lesson-r3-3',
      moduleId: 'react-m3',
      title: 'Complex State',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'setState Merging vs Spreading Objects',
          explanation:
            'Class component setState performs a shallow merge — you only pass the fields you want to update. With hooks, the setter replaces the entire value, so when state is an object, you must spread the previous state yourself to preserve other fields.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class Form extends React.Component {
  state = {
    name: '',
    email: '',
    age: 0,
  };

  updateName = (e) => {
    // Shallow merge: only name is updated,
    // email and age are preserved automatically
    this.setState({ name: e.target.value });
  };

  updateEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  render() {
    return (
      <form>
        <input value={this.state.name}
               onChange={this.updateName} />
        <input value={this.state.email}
               onChange={this.updateEmail} />
      </form>
    );
  }
}`,
            },
            right: {
              label: 'Hooks',
              language: 'jsx',
              code: `function Form() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: 0,
  });

  const updateName = (e) => {
    // Must spread to keep other fields!
    setForm({ ...form, name: e.target.value });
  };

  const updateEmail = (e) => {
    setForm({ ...form, email: e.target.value });
  };

  return (
    <form>
      <input value={form.name}
             onChange={updateName} />
      <input value={form.email}
             onChange={updateEmail} />
    </form>
  );
}`,
            },
            caption:
              'Class setState auto-merges; hook setters require manual spreading for object state',
          },
          callout: {
            type: 'tip',
            text: 'An alternative with hooks: use separate useState calls for each field. This avoids the spreading altogether and is often simpler: const [name, setName] = useState(""); const [email, setEmail] = useState("");',
          },
          challenge: {
            id: 'ch3-3-1',
            type: 'fix-bug',
            prompt:
              'This hook update loses the email field. Fix the setter:',
            code: `const [form, setForm] = useState({ name: '', email: '' });

const updateName = (name) => {
  setForm(___BLANK_1___);
};`,
            blanks: [
              {
                id: 'b1',
                expected: [
                  '{ ...form, name }',
                  '{ ...form, name: name }',
                ],
                hint: 'Spread the existing state and override one field',
              },
            ],
            explanation:
              'Spreading the current form state with { ...form, name } preserves the email field while updating name. Without spreading, email would be lost.',
          },
        },
        {
          id: 'c2',
          title: 'Functional Updates with prevState',
          explanation:
            'When the next state depends on the previous state, both class and functional components support a callback form. In classes, you pass a function to setState that receives the previous state. In hooks, you pass a function to the setter. This avoids stale closure issues and is essential when batching multiple updates.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class Counter extends React.Component {
  state = { count: 0 };

  incrementThrice = () => {
    // Using prevState callback — all three work!
    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
    // count will be 3 after re-render
  };

  render() {
    return (
      <button onClick={this.incrementThrice}>
        Count: {this.state.count}
      </button>
    );
  }
}`,
            },
            right: {
              label: 'Hooks',
              language: 'jsx',
              code: `function Counter() {
  const [count, setCount] = useState(0);

  const incrementThrice = () => {
    // Using functional updater — all three work!
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    // count will be 3 after re-render
  };

  return (
    <button onClick={incrementThrice}>
      Count: {count}
    </button>
  );
}`,
            },
            caption:
              'Pass a function to setState/setter when next state depends on previous state',
          },
          callout: {
            type: 'gotcha',
            text: 'Without the functional updater, setCount(count + 1) called three times only increments once because count is a stale closure — it always reads the same value from the current render.',
          },
        },
        {
          id: 'c3',
          title: 'useReducer — Complex State Logic',
          explanation:
            'When state logic involves multiple sub-values or the next state depends on complex conditions, useReducer provides a structured alternative to useState. It follows the same pattern as Redux: dispatch an action, and a reducer function computes the next state. In classes, you would typically handle this with multiple setState calls or a complex updater function.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class TodoApp extends React.Component {
  state = { todos: [], nextId: 1 };

  addTodo = (text) => {
    this.setState(prev => ({
      todos: [...prev.todos, {
        id: prev.nextId, text, done: false,
      }],
      nextId: prev.nextId + 1,
    }));
  };

  toggleTodo = (id) => {
    this.setState(prev => ({
      todos: prev.todos.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    }));
  };

  deleteTodo = (id) => {
    this.setState(prev => ({
      todos: prev.todos.filter(t => t.id !== id),
    }));
  };
}`,
            },
            right: {
              label: 'Hooks',
              language: 'jsx',
              code: `const initialState = { todos: [], nextId: 1 };

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        todos: [...state.todos, {
          id: state.nextId,
          text: action.text,
          done: false,
        }],
        nextId: state.nextId + 1,
      };
    case 'TOGGLE':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.id
            ? { ...t, done: !t.done } : t
        ),
      };
    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter(
          t => t.id !== action.id
        ),
      };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(
    todoReducer, initialState
  );

  return (
    <>
      <button onClick={() =>
        dispatch({ type: 'ADD', text: 'New' })
      }>Add</button>
      {state.todos.map(t => (
        <TodoItem key={t.id} todo={t}
          onToggle={() =>
            dispatch({ type: 'TOGGLE', id: t.id })}
          onDelete={() =>
            dispatch({ type: 'DELETE', id: t.id })}
        />
      ))}
    </>
  );
}`,
            },
            caption:
              'useReducer centralizes state transitions in a pure function — easier to test and reason about',
          },
          challenge: {
            id: 'ch3-3-2',
            type: 'fill-blank',
            prompt:
              'Complete the useReducer setup for a counter with increment and reset actions:',
            code: `function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, ___BLANK_1___] = ___BLANK_2___(
    reducer,
    ___BLANK_3___
  );

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => ___BLANK_1___({ type: 'increment' })}>+</button>
      <button onClick={() => ___BLANK_1___({ type: 'reset' })}>Reset</button>
    </>
  );
}`,
            blanks: [
              { id: 'b1', expected: ['dispatch'], hint: 'function to send actions' },
              { id: 'b2', expected: ['useReducer'], hint: 'reducer hook' },
              {
                id: 'b3',
                expected: ['{ count: 0 }'],
                hint: 'initial state',
              },
            ],
            explanation:
              'useReducer returns [state, dispatch]. You pass the reducer function and initial state. dispatch sends action objects to the reducer, which returns the next state.',
          },
        },
      ],
      translationDrills: [
        {
          id: 'td3-3-1',
          sourceLabel: 'Class Component',
          sourceCode: `class Counter extends React.Component {
  state = { count: 0 };

  increment = () => {
    this.setState(prev => ({
      count: prev.count + 1,
    }));
  };

  decrement = () => {
    this.setState(prev => ({
      count: prev.count - 1,
    }));
  };

  reset = () => {
    this.setState({ count: 0 });
  };
}`,
          targetLabel: 'Hooks (useReducer)',
          targetTemplate: `function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = ___SLOT_1___(
    ___SLOT_2___, { count: 0 }
  );

  const increment = () => dispatch({ type: ___SLOT_3___ });
  const decrement = () => dispatch({ type: ___SLOT_4___ });
  const reset = () => dispatch({ type: ___SLOT_5___ });
}`,
          slots: [
            { id: 'slot-1', expected: 'useReducer' },
            { id: 'slot-2', expected: 'reducer' },
            { id: 'slot-3', expected: "'increment'" },
            { id: 'slot-4', expected: "'decrement'" },
            { id: 'slot-5', expected: "'reset'" },
          ],
          tokenBank: [
            'useReducer',
            'reducer',
            "'increment'",
            "'decrement'",
            "'reset'",
            'useState',
            'dispatch',
            "'update'",
          ],
          explanation:
            'useReducer takes the reducer function and initial state. Each class method becomes a dispatch call with an action type string. The reducer centralizes all the state transition logic.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'When would you choose useReducer over useState?',
          hint: 'Think about state complexity and the number of related state transitions.',
          answer:
            'Use useReducer when: (1) state has multiple sub-values that change together, (2) the next state depends on the previous state in complex ways, (3) you have many related actions (add, delete, toggle, sort), or (4) you want to extract state logic into a testable pure function. For simple independent values, useState is cleaner.',
        },
        {
          id: 'e2',
          prompt:
            'Why is the functional updater (prev => prev + 1) safer than directly using the state variable (count + 1) in event handlers?',
          hint: 'Think about closures and batching.',
          answer:
            'State variables in functional components are captured by closure — they reflect the value at the time of render, not the latest value. If you call setCount(count + 1) multiple times, each reads the same stale count. The functional updater setCount(prev => prev + 1) always receives the most recent state, making it safe for batched and sequential updates.',
        },
      ],
      predictOutputs: [
        {
          id: 'po3-3-1',
          code: `function App() {
  const [state, setState] = useState({
    name: 'Alice',
    age: 25,
  });

  const handleClick = () => {
    setState({ age: 26 });
  };
  // After click, what is state.name?
}`,
          language: 'jsx',
          expectedOutput: 'undefined',
          explanation:
            'Unlike class component this.setState, the hook setter replaces the entire state object. After setState({ age: 26 }), the state becomes { age: 26 } and name is lost. You need setState({ ...state, age: 26 }) or setState(prev => ({ ...prev, age: 26 })) to preserve name.',
          hint: 'Hook setters replace; class setState merges.',
        },
      ],
    },

    // ─── Lesson 4: Lifting State Up ──────────────────────────────────────────────
    {
      id: 'lesson-r3-4',
      moduleId: 'react-m3',
      title: 'Lifting State Up',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'Shared State in a Common Ancestor',
          explanation:
            'When two sibling components need to share state, move the state up to their closest common parent. The parent owns the state and passes it down via props. This is the same pattern in both class and functional components — the only difference is how you declare the state.',
          analogy:
            'If two rooms need the same thermostat reading, put the thermostat in the hallway (the parent) and run wires (props) into each room. Don\'t put a separate thermostat in each room and try to keep them in sync.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class TemperatureCalc extends React.Component {
  state = { celsius: '' };

  handleChange = (e) => {
    this.setState({ celsius: e.target.value });
  };

  render() {
    const { celsius } = this.state;
    const fahrenheit = celsius
      ? (parseFloat(celsius) * 9/5 + 32).toFixed(1)
      : '';

    return (
      <div>
        <CelsiusInput
          value={celsius}
          onChange={this.handleChange}
        />
        <FahrenheitDisplay
          value={fahrenheit}
        />
      </div>
    );
  }
}

class CelsiusInput extends React.Component {
  render() {
    return (
      <input
        value={this.props.value}
        onChange={this.props.onChange}
        placeholder="Celsius"
      />
    );
  }
}`,
            },
            right: {
              label: 'Hooks',
              language: 'jsx',
              code: `function TemperatureCalc() {
  const [celsius, setCelsius] = useState('');

  const fahrenheit = celsius
    ? (parseFloat(celsius) * 9/5 + 32).toFixed(1)
    : '';

  return (
    <div>
      <CelsiusInput
        value={celsius}
        onChange={(e) => setCelsius(e.target.value)}
      />
      <FahrenheitDisplay
        value={fahrenheit}
      />
    </div>
  );
}

function CelsiusInput({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder="Celsius"
    />
  );
}

function FahrenheitDisplay({ value }) {
  return <p>Fahrenheit: {value}</p>;
}`,
            },
            caption:
              'State lives in the parent; children receive values and callbacks through props',
          },
        },
        {
          id: 'c2',
          title: 'Callback Props — Child to Parent Communication',
          explanation:
            'Children communicate upward by calling callback functions passed as props. The parent defines the handler, passes it to the child, and the child invokes it with data. This is React\'s fundamental one-way data flow.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class Parent extends React.Component {
  state = { items: [] };

  handleAddItem = (item) => {
    this.setState(prev => ({
      items: [...prev.items, item],
    }));
  };

  render() {
    return (
      <div>
        <AddItemForm onAdd={this.handleAddItem} />
        <ItemList items={this.state.items} />
      </div>
    );
  }
}

class AddItemForm extends React.Component {
  state = { text: '' };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.text);
    this.setState({ text: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.text}
          onChange={e =>
            this.setState({ text: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}`,
            },
            right: {
              label: 'Hooks',
              language: 'jsx',
              code: `function Parent() {
  const [items, setItems] = useState([]);

  const handleAddItem = (item) => {
    setItems(prev => [...prev, item]);
  };

  return (
    <div>
      <AddItemForm onAdd={handleAddItem} />
      <ItemList items={items} />
    </div>
  );
}

function AddItemForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function ItemList({ items }) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}`,
            },
            caption:
              'Data flows down as props; events flow up as callback invocations',
          },
          challenge: {
            id: 'ch3-4-1',
            type: 'fill-blank',
            prompt:
              'Complete the child component so it notifies the parent when a color is selected:',
            code: `function ColorPicker({ ___BLANK_1___ }) {
  return (
    <div>
      <button onClick={() => ___BLANK_2___('red')}>Red</button>
      <button onClick={() => ___BLANK_2___('blue')}>Blue</button>
    </div>
  );
}

// Parent usage:
// <ColorPicker onSelect={___BLANK_3___} />`,
            blanks: [
              { id: 'b1', expected: ['onSelect'], hint: 'destructured callback prop' },
              { id: 'b2', expected: ['onSelect'], hint: 'call the callback with the color' },
              {
                id: 'b3',
                expected: ['handleColorSelect', 'setColor', '(color) => setColor(color)'],
                hint: 'parent handler function',
              },
            ],
            explanation:
              'The child receives onSelect as a prop and calls it with the selected color. The parent passes its handler function as the onSelect prop. This is the standard pattern for child-to-parent communication in React.',
          },
        },
        {
          id: 'c3',
          title: 'Single Source of Truth',
          explanation:
            'Every piece of state should have exactly one owner. Duplicating state across components leads to bugs when they get out of sync. Instead, derive values from the single source of truth, and use computed values where possible.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `// BAD: duplicated state
class App extends React.Component {
  state = { items: ['a', 'b', 'c'] };
  // Don't also store count in state!
  // state = { items: [...], count: 3 };

  render() {
    // GOOD: derive count from items
    const count = this.state.items.length;

    return (
      <div>
        <p>{count} items</p>
        <ItemList items={this.state.items} />
      </div>
    );
  }
}`,
            },
            right: {
              label: 'Hooks',
              language: 'jsx',
              code: `// BAD: duplicated state
function App() {
  const [items, setItems] = useState(['a', 'b', 'c']);
  // Don't do this:
  // const [count, setCount] = useState(3);

  // GOOD: derive count from items
  const count = items.length;

  // GOOD: derive filtered list
  const [filter, setFilter] = useState('');
  const filtered = items.filter(item =>
    item.includes(filter)
  );

  return (
    <div>
      <input
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="Filter..."
      />
      <p>{filtered.length} of {count} items</p>
      <ItemList items={filtered} />
    </div>
  );
}`,
            },
            caption:
              'Derive values from state instead of duplicating them — keeps data consistent',
          },
          callout: {
            type: 'tip',
            text: 'A good rule of thumb: if you can compute a value from existing state or props, don\'t store it in state. Computed values (count from array length, filtered lists, totals) should be derived during render.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'You have a search input in component A and a results list in component B (siblings). Where should the search query state live?',
          hint: 'Think about which component needs access to the query.',
          answer:
            'The search query state should live in the closest common parent of A and B. The parent passes the query value down to B (for filtering) and a setQuery callback to A (for updating). This is "lifting state up" — the parent becomes the single source of truth.',
        },
        {
          id: 'e2',
          prompt:
            'Why should you avoid storing items.length in a separate state variable alongside the items array?',
          hint: 'What happens if you update items but forget to update the count?',
          answer:
            'Storing count separately creates duplicate state that can get out of sync. If you add an item but forget to increment count, the UI shows the wrong number. Instead, derive it: const count = items.length. This is always correct because it reads from the single source of truth.',
        },
      ],
      predictOutputs: [
        {
          id: 'po3-4-1',
          code: `function Parent() {
  const [name, setName] = useState('Alice');
  return <Child name={name} onRename={setName} />;
}

function Child({ name, onRename }) {
  return (
    <button onClick={() => onRename('Bob')}>
      {name}
    </button>
  );
}
// What does the button display after clicking it?`,
          language: 'jsx',
          expectedOutput: 'Bob',
          explanation:
            'Clicking the button calls onRename("Bob"), which is actually setName("Bob") passed from the parent. This updates the parent\'s state, causing a re-render. The new name "Bob" flows down as a prop to Child, so the button displays "Bob".',
          hint: 'Trace the callback: onRename is the parent\'s setName.',
        },
      ],
    },

    // ─── Lesson 5: Side Effects & Cleanup ────────────────────────────────────────
    {
      id: 'lesson-r3-5',
      moduleId: 'react-m3',
      title: 'Side Effects & Cleanup',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'Subscriptions & Event Listeners',
          explanation:
            'Real applications subscribe to external data sources — WebSocket messages, browser events, or third-party libraries. In class components, you subscribe in componentDidMount and unsubscribe in componentWillUnmount. With hooks, the subscribe/unsubscribe pair lives together in a single useEffect.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class WindowSize extends React.Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  componentDidMount() {
    window.addEventListener(
      'resize', this.handleResize
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      'resize', this.handleResize
    );
  }

  render() {
    return (
      <p>
        {this.state.width} x {this.state.height}
      </p>
    );
  }
}`,
            },
            right: {
              label: 'Hooks',
              language: 'jsx',
              code: `function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener(
      'resize', handleResize
    );

    // Cleanup: remove the listener
    return () => {
      window.removeEventListener(
        'resize', handleResize
      );
    };
  }, []); // Subscribe once on mount

  return (
    <p>{size.width} x {size.height}</p>
  );
}`,
            },
            caption:
              'Hooks co-locate setup and teardown — no more split across two lifecycle methods',
          },
          callout: {
            type: 'info',
            text: 'The beauty of hooks is co-location: the setup and cleanup for one concern live in the same useEffect. In classes, componentDidMount might set up five different things, with their cleanups scattered in componentWillUnmount.',
          },
          challenge: {
            id: 'ch3-5-1',
            type: 'fill-blank',
            prompt:
              'Complete this hook that subscribes to online/offline browser events:',
            code: `function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => ___BLANK_1___(true);
    const goOffline = () => ___BLANK_1___(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.___BLANK_2___('online', goOnline);
      window.___BLANK_2___('offline', goOffline);
    };
  }, ___BLANK_3___);

  return isOnline;
}`,
            blanks: [
              { id: 'b1', expected: ['setIsOnline'], hint: 'update the state' },
              {
                id: 'b2',
                expected: ['removeEventListener'],
                hint: 'unsubscribe from events',
              },
              { id: 'b3', expected: ['[]'], hint: 'subscribe once on mount' },
            ],
            explanation:
              'setIsOnline updates the state when connectivity changes. The cleanup removes both listeners. The empty dependency array [] ensures we subscribe once on mount and clean up on unmount.',
          },
        },
        {
          id: 'c2',
          title: 'Timers: setTimeout and setInterval',
          explanation:
            'Timers are a classic source of memory leaks. If a component unmounts before a timer fires (setTimeout) or between ticks (setInterval), the callback may try to update state on an unmounted component. Always clear timers in cleanup.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class Countdown extends React.Component {
  state = { remaining: this.props.seconds };

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState(prev => {
        if (prev.remaining <= 1) {
          clearInterval(this.timerId);
          return { remaining: 0 };
        }
        return { remaining: prev.remaining - 1 };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return <p>{this.state.remaining}s left</p>;
  }
}`,
            },
            right: {
              label: 'Hooks',
              language: 'jsx',
              code: `function Countdown({ seconds }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) return;

    const timerId = setTimeout(() => {
      setRemaining(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [remaining]);

  return <p>{remaining}s left</p>;
}

// Alternative: single setInterval
function CountdownAlt({ seconds }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <p>{remaining}s left</p>;
}`,
            },
            caption:
              'Always clear timers in cleanup to prevent updates on unmounted components',
          },
          callout: {
            type: 'gotcha',
            text: 'A common mistake: using setInterval with a dependency on state inside the callback. The closure captures a stale value. Always use the functional updater (prev => prev - 1) inside interval callbacks, or use setTimeout chained via useEffect deps.',
          },
        },
        {
          id: 'c3',
          title: 'Fetch with AbortController',
          explanation:
            'When fetching data in useEffect, the component might unmount or the dependencies might change before the fetch completes. AbortController lets you cancel in-flight requests, preventing state updates on unmounted components and avoiding race conditions.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class UserData extends React.Component {
  state = { user: null, loading: true };
  controller = null;

  componentDidMount() {
    this.fetchUser(this.props.userId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser(this.props.userId);
    }
  }

  componentWillUnmount() {
    if (this.controller) {
      this.controller.abort();
    }
  }

  fetchUser(id) {
    if (this.controller) this.controller.abort();
    this.controller = new AbortController();

    this.setState({ loading: true });
    fetch(\`/api/users/\${id}\`, {
      signal: this.controller.signal,
    })
      .then(res => res.json())
      .then(user => this.setState({
        user, loading: false
      }))
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      });
  }

  render() {
    if (this.state.loading) return <p>Loading...</p>;
    return <h1>{this.state.user.name}</h1>;
  }
}`,
            },
            right: {
              label: 'Hooks',
              language: 'jsx',
              code: `function UserData({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    fetch(\`/api/users/\${userId}\`, {
      signal: controller.signal,
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      });

    // Cancel fetch on cleanup
    return () => controller.abort();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}`,
            },
            caption:
              'AbortController cancels the fetch on unmount or when userId changes — preventing race conditions',
          },
          callout: {
            type: 'warning',
            text: 'Without AbortController, if userId changes rapidly (A -> B -> C), the responses can arrive out of order. The response for A might overwrite B\'s data. AbortController ensures only the latest request\'s response is used.',
          },
          challenge: {
            id: 'ch3-5-2',
            type: 'fill-blank',
            prompt:
              'Complete the abort cleanup in this data-fetching effect:',
            code: `useEffect(() => {
  const controller = new ___BLANK_1___();

  fetch(\`/api/data/\${id}\`, {
    ___BLANK_2___: controller.signal,
  })
    .then(res => res.json())
    .then(setData);

  return () => controller.___BLANK_3___();
}, [id]);`,
            blanks: [
              { id: 'b1', expected: ['AbortController'], hint: 'browser API for cancellation' },
              { id: 'b2', expected: ['signal'], hint: 'property passed to fetch options' },
              { id: 'b3', expected: ['abort'], hint: 'method to cancel the request' },
            ],
            explanation:
              'Create an AbortController, pass its signal to fetch, and call abort() in the cleanup function. When the effect re-runs (id changes) or the component unmounts, the in-flight request is canceled.',
          },
        },
      ],
      translationDrills: [
        {
          id: 'td3-5-1',
          sourceLabel: 'Class Component',
          sourceCode: `class ChatRoom extends React.Component {
  componentDidMount() {
    this.connection = createConnection(this.props.roomId);
    this.connection.connect();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.roomId !== this.props.roomId) {
      this.connection.disconnect();
      this.connection = createConnection(this.props.roomId);
      this.connection.connect();
    }
  }

  componentWillUnmount() {
    this.connection.disconnect();
  }

  render() {
    return <p>Connected to {this.props.roomId}</p>;
  }
}`,
          targetLabel: 'Hooks',
          targetTemplate: `function ChatRoom({ roomId }) {
  ___SLOT_1___(() => {
    const connection = ___SLOT_2___(roomId);
    connection.___SLOT_3___();

    return () => {
      connection.___SLOT_4___();
    };
  }, [___SLOT_5___]);

  return <p>Connected to {roomId}</p>;
}`,
          slots: [
            { id: 'slot-1', expected: 'useEffect' },
            { id: 'slot-2', expected: 'createConnection' },
            { id: 'slot-3', expected: 'connect' },
            { id: 'slot-4', expected: 'disconnect' },
            { id: 'slot-5', expected: 'roomId' },
          ],
          tokenBank: [
            'useEffect',
            'createConnection',
            'connect',
            'disconnect',
            'roomId',
            'useLayoutEffect',
            'close',
            'props',
          ],
          explanation:
            'useEffect with [roomId] replaces three lifecycle methods: componentDidMount (initial connect), componentDidUpdate (reconnect when roomId changes), and componentWillUnmount (disconnect). The cleanup runs before each re-run and on unmount.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'Why does the useEffect cleanup function run before the effect re-runs on dependency change, not just on unmount?',
          hint: 'Think about what happens when a prop changes and you need to tear down the old subscription before setting up a new one.',
          answer:
            'If the effect subscribes to a resource based on a prop (e.g., roomId), changing that prop means the old subscription is stale. React runs cleanup first to tear down the old subscription, then runs the effect again with the new value. Without this, you would accumulate stale subscriptions. In classes, you had to handle this manually in componentDidUpdate.',
        },
        {
          id: 'e2',
          prompt:
            'A component fetches user data when userId changes, but sometimes the old response arrives after the new one. How does AbortController fix this race condition?',
          hint: 'Think about what happens when the effect re-runs before the previous fetch completes.',
          answer:
            'When userId changes, useEffect\'s cleanup calls controller.abort(), which cancels the in-flight fetch for the old userId. The canceled fetch throws an AbortError (which we ignore), so its .then() handler never runs. The new effect starts a fresh fetch for the new userId. This guarantees only the latest request\'s response updates state.',
        },
      ],
      predictOutputs: [
        {
          id: 'po3-5-1',
          code: `function App() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <button onClick={() => setShow(false)}>Hide</button>
      {show && <Timer />}
    </div>
  );
}

function Timer() {
  useEffect(() => {
    console.log('subscribe');
    const id = setInterval(() => console.log('tick'), 1000);
    return () => {
      console.log('unsubscribe');
      clearInterval(id);
    };
  }, []);

  return <p>Timer running</p>;
}
// What logs when the Hide button is clicked?`,
          language: 'jsx',
          expectedOutput: 'unsubscribe',
          explanation:
            'Clicking Hide sets show to false, removing <Timer /> from the DOM. React unmounts Timer and runs the useEffect cleanup function, which logs "unsubscribe" and clears the interval. No more "tick" logs will appear.',
          hint: 'Think about what happens to the cleanup function when a component unmounts.',
        },
      ],
    },
  ],
};

export default reactModule3;
