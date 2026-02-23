import type { Module } from '../../../../types';
import project5 from '../projects/react-project-5';

const reactM5: Module = {
  id: 'react-m5',
  order: 5,
  title: 'React 18+',
  subtitle: 'Concurrent features, Suspense, Server Components, and new hooks',
  icon: '🚀',
  accentColor: 'red',
  quizId: 'react-quiz-5',
  project: project5,
  lessons: [
    // ─── Lesson 1: Concurrent React ─────────────────────────────────────────────
    {
      id: 'lesson-r5-1',
      moduleId: 'react-m5',
      title: 'Concurrent React',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'Synchronous vs Concurrent Rendering',
          explanation:
            'Before React 18, rendering was synchronous: once React started rendering a component tree, it could not be interrupted until the entire tree was rendered. This could freeze the UI on heavy updates. Concurrent rendering allows React to pause, interrupt, and resume work, keeping the app responsive even during large renders.',
          analogy:
            'Synchronous rendering is like a chef who starts cooking a 10-course meal and cannot take any other orders until all 10 courses are done. Concurrent rendering is like a chef who can pause a low-priority dish to quickly prepare a high-priority appetizer, then resume the original dish.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: synchronous rendering
// ReactDOM.render blocks until done
import ReactDOM from 'react-dom';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// Heavy state update blocks the entire UI
function handleClick() {
  // This update cannot be interrupted
  setItems(generateHugeList());
  // User input is frozen until render completes
}`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18: concurrent rendering via createRoot
import { createRoot } from 'react-dom/client';

const root = createRoot(
  document.getElementById('root')
);
root.render(<App />);

// React can now interrupt and prioritize renders
function handleClick() {
  // React may pause this if higher-priority
  // work (like user typing) comes in
  setItems(generateHugeList());
}`,
            },
            caption:
              'createRoot enables concurrent features — ReactDOM.render is now legacy',
          },
          callout: {
            type: 'warning',
            text: 'You must switch from ReactDOM.render() to createRoot() to opt into concurrent features. Without createRoot, React 18 behaves like React 17.',
          },
          challenge: {
            id: 'ch-r5-1-1',
            type: 'fill-blank',
            prompt:
              'Migrate this app entry point to React 18:',
            code: `import { ___BLANK_1___ } from 'react-dom/client';

const root = ___BLANK_2___(
  document.getElementById('root')
);
root.___BLANK_3___(<App />);`,
            blanks: [
              { id: 'b1', expected: ['createRoot'], hint: 'new root API' },
              { id: 'b2', expected: ['createRoot'], hint: 'creates a concurrent root' },
              { id: 'b3', expected: ['render'], hint: 'renders the app' },
            ],
            explanation:
              'React 18 uses createRoot from react-dom/client. You first create a root, then call .render() on it. This replaces the old ReactDOM.render(element, container) pattern.',
          },
        },
        {
          id: 'c2',
          title: 'Automatic Batching',
          explanation:
            'In React 17, state updates inside event handlers were batched (grouped into one re-render), but updates inside promises, setTimeout, or native event handlers were NOT batched. React 18 automatically batches ALL state updates regardless of where they originate, reducing unnecessary re-renders.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: batching only in event handlers
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // Batched: ONE re-render (good)
}

// But NOT batched in async contexts:
fetch('/api/data').then(() => {
  setCount(c => c + 1); // re-render 1
  setFlag(f => !f);     // re-render 2
  // TWO re-renders (wasteful!)
});

setTimeout(() => {
  setCount(c => c + 1); // re-render 1
  setFlag(f => !f);     // re-render 2
}, 1000);`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18: automatic batching EVERYWHERE
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // Batched: ONE re-render (same as before)
}

// NOW batched in async contexts too!
fetch('/api/data').then(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // ONE re-render (automatic batching!)
});

setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // ONE re-render (automatic batching!)
}, 1000);`,
            },
            caption:
              'React 18 batches all state updates by default, even inside promises and timeouts',
          },
          callout: {
            type: 'tip',
            text: 'If you need to force a synchronous re-render (rare), use flushSync() from react-dom: flushSync(() => { setState(newValue); }). The DOM is updated immediately after flushSync finishes.',
          },
        },
        {
          id: 'c3',
          title: 'Strict Mode Double-Rendering',
          explanation:
            'React 18 Strict Mode intentionally double-invokes effects during development to help you find bugs caused by missing cleanup functions. Components mount, unmount, and re-mount to simulate real-world scenarios like Fast Refresh and future Offscreen API behavior. This only happens in development, never in production.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17 StrictMode:
// Double-renders only (no effect re-run)
<React.StrictMode>
  <App />
</React.StrictMode>

function Timer() {
  useEffect(() => {
    const id = setInterval(() => {
      console.log('tick');
    }, 1000);
    // Missing cleanup — works "fine" in dev
  }, []);

  return <div>Timer</div>;
}`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18 StrictMode:
// Mount → Unmount → Re-mount in dev
<React.StrictMode>
  <App />
</React.StrictMode>

function Timer() {
  useEffect(() => {
    const id = setInterval(() => {
      console.log('tick');
    }, 1000);

    // Cleanup is now ESSENTIAL
    // Without it, you get 2 intervals!
    return () => clearInterval(id);
  }, []);

  return <div>Timer</div>;
}`,
            },
            caption:
              'React 18 Strict Mode exposes missing cleanup by simulating unmount/remount cycles',
          },
          callout: {
            type: 'gotcha',
            text: 'If your effects run twice in development and cause issues, it means you are missing a cleanup function. Fix the cleanup instead of removing StrictMode.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'Why does React 18 require createRoot instead of just upgrading ReactDOM.render automatically?',
          hint: 'Think about backward compatibility and opting into new behavior',
          answer:
            'createRoot is an explicit opt-in to concurrent features. React kept ReactDOM.render working (in legacy mode) so existing apps do not break on upgrade. This lets teams migrate incrementally: upgrade to React 18, then switch to createRoot when ready for concurrent behavior.',
        },
        {
          id: 'e2',
          prompt:
            'You notice your useEffect runs twice in development after upgrading to React 18. Your teammate suggests removing StrictMode. Is this the right fix?',
          hint: 'Consider what the double-invocation is trying to tell you',
          answer:
            'No. The double-invocation is intentional and highlights missing cleanup functions in your effects. The correct fix is to add proper cleanup (return a function from useEffect that tears down subscriptions, intervals, etc.). StrictMode catches real bugs that would appear in production with Fast Refresh or future features.',
        },
      ],
      predictOutputs: [
        {
          id: 'po-r5-1-1',
          code: `// React 18 with createRoot
function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  console.log('render');

  function handleClick() {
    fetch('/api').then(() => {
      setA(1);
      setB(1);
    });
  }

  return <button onClick={handleClick}>Go</button>;
}
// How many times does "render" log after clicking?`,
          language: 'jsx',
          expectedOutput: 'render (once)',
          explanation:
            'In React 18 with createRoot, state updates inside promises are automatically batched. Both setA and setB are grouped into a single re-render, so "render" logs only once after the click. In React 17, this would have logged "render" twice.',
          hint: 'Think about automatic batching in React 18 and where the state updates happen.',
        },
      ],
    },

    // ─── Lesson 2: Transitions ──────────────────────────────────────────────────
    {
      id: 'lesson-r5-2',
      moduleId: 'react-m5',
      title: 'Transitions',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'useTransition',
          explanation:
            'useTransition lets you mark certain state updates as non-urgent (transitions). React will keep the current UI responsive while preparing the new UI in the background. The hook returns a boolean isPending flag and a startTransition function. This is the primary tool for keeping your app responsive during heavy updates.',
          analogy:
            'Imagine typing in a search box that filters a list of 10,000 items. Without transitions, each keystroke freezes the UI while the list re-renders. With useTransition, typing stays instant (urgent update) while the list re-render happens in the background (transition). If you type another letter before the list finishes, React discards the stale render and starts fresh.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: all updates are equal priority
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);       // updates input
    setResults(            // filters 10k items
      allItems.filter(i =>
        i.name.includes(value)
      )
    );
    // Both updates block together
    // Input feels laggy on every keystroke
  }

  return (
    <div>
      <input value={query} onChange={handleChange} />
      <ItemList items={results} />
    </div>
  );
}`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18: separate urgent from non-urgent
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);         // urgent: update input NOW

    startTransition(() => {
      setResults(            // non-urgent: can wait
        allItems.filter(i =>
          i.name.includes(value)
        )
      );
    });
  }

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <ItemList items={results} />
    </div>
  );
}`,
            },
            caption:
              'useTransition splits updates into urgent (input) and non-urgent (list filtering)',
          },
          challenge: {
            id: 'ch-r5-2-1',
            type: 'fill-blank',
            prompt:
              'Add a transition to defer the expensive tab content update:',
            code: `const [isPending, ___BLANK_1___] = useTransition();

function selectTab(tab) {
  ___BLANK_2___(() => {
    setActiveTab(tab);
  });
}

return (
  <div>
    {___BLANK_3___ && <Spinner />}
    <TabContent tab={activeTab} />
  </div>
);`,
            blanks: [
              { id: 'b1', expected: ['startTransition'], hint: 'function to start a transition' },
              { id: 'b2', expected: ['startTransition'], hint: 'wrap the non-urgent update' },
              { id: 'b3', expected: ['isPending'], hint: 'boolean indicating transition in progress' },
            ],
            explanation:
              'useTransition returns [isPending, startTransition]. Wrap the non-urgent setActiveTab inside startTransition. Use isPending to show a loading indicator while the new tab content renders in the background.',
          },
        },
        {
          id: 'c2',
          title: 'startTransition (standalone)',
          explanation:
            'React also exports a standalone startTransition function (not the hook). Use it when you need to mark an update as a transition outside of a component, such as in a library, router, or utility module. The difference: the standalone version does not give you an isPending flag.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: no way to deprioritize updates
// Router navigation blocks everything

// In a router library:
function navigate(url) {
  setURL(url);
  // This triggers a full re-render
  // UI freezes during heavy page transitions
}

// Developers used workarounds:
function navigate(url) {
  setURL(url);
  // Debounce or setTimeout to defer work
  setTimeout(() => {
    setPageContent(loadPage(url));
  }, 0);
}`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18: standalone startTransition
import { startTransition } from 'react';

// In a router library:
function navigate(url) {
  startTransition(() => {
    setURL(url);
    // React treats this as non-urgent
    // Current page stays interactive
  });
}

// In a data store or utility:
function updateStore(newData) {
  startTransition(() => {
    store.setState(newData);
  });
}
// No isPending — use useTransition in
// components when you need that flag`,
            },
            caption:
              'Standalone startTransition works anywhere; use useTransition in components when you need isPending',
          },
        },
        {
          id: 'c3',
          title: 'useDeferredValue',
          explanation:
            'useDeferredValue lets you defer re-rendering a part of the UI. You pass it a value, and React returns a "deferred" copy that lags behind during urgent updates. This is useful when you cannot control where the state update happens (e.g., the value comes from props) but still want to keep the UI responsive.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: manual debouncing
function SearchResults({ query }) {
  const [debouncedQuery, setDebouncedQuery] =
    useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Uses debounced value for expensive render
  const results = filterItems(debouncedQuery);

  return <List items={results} />;
}`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18: useDeferredValue
import { useDeferredValue } from 'react';

function SearchResults({ query }) {
  // React defers this value during urgent updates
  const deferredQuery = useDeferredValue(query);

  // Expensive render uses deferred value
  const results = filterItems(deferredQuery);

  // Show stale indicator while deferred
  const isStale = query !== deferredQuery;

  return (
    <div style={{ opacity: isStale ? 0.5 : 1 }}>
      <List items={results} />
    </div>
  );
}`,
            },
            caption:
              'useDeferredValue is like debouncing but smarter: it adapts to the device speed and integrates with concurrent rendering',
          },
          callout: {
            type: 'tip',
            text: 'Use useTransition when YOU control the state update. Use useDeferredValue when the value comes from OUTSIDE (props, context, or a parent). Both achieve the same goal: keeping the UI responsive during heavy renders.',
          },
          challenge: {
            id: 'ch-r5-2-2',
            type: 'fill-blank',
            prompt:
              'Use useDeferredValue to defer an expensive list render:',
            code: `function ProductList({ searchTerm }) {
  const deferred = ___BLANK_1___(searchTerm);
  const isStale = searchTerm !== ___BLANK_2___;

  const filtered = expensiveFilter(___BLANK_3___);
  return <List items={filtered} opacity={isStale ? 0.5 : 1} />;
}`,
            blanks: [
              { id: 'b1', expected: ['useDeferredValue'], hint: 'hook that defers a value' },
              { id: 'b2', expected: ['deferred'], hint: 'compare to detect staleness' },
              { id: 'b3', expected: ['deferred'], hint: 'pass the deferred value to the expensive computation' },
            ],
            explanation:
              'useDeferredValue(searchTerm) returns a deferred copy. Compare searchTerm !== deferred to detect when the deferred value is stale. Pass the deferred value to the expensive computation so it uses the lagging value while urgent updates proceed.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'You have a tab component where clicking a tab loads heavy content. The click feels unresponsive because the content renders synchronously. How would you fix this with useTransition?',
          hint: 'Think about which update is urgent (tab highlight) vs non-urgent (tab content)',
          answer:
            'Wrap the setActiveTab call inside startTransition. The tab highlight updates immediately (urgent), while the content renders in the background (transition). Use isPending to show a spinner or reduce opacity on the content area while it loads.',
        },
        {
          id: 'e2',
          prompt:
            'When should you use useDeferredValue instead of useTransition?',
          hint: 'Consider who controls the state update',
          answer:
            'Use useDeferredValue when you receive a value from outside (props, context) and cannot wrap the state update in startTransition. For example, if a parent component passes a search query as a prop, the child cannot control how it is set. useDeferredValue lets the child defer its own rendering based on that prop.',
        },
      ],
      predictOutputs: [
        {
          id: 'po-r5-2-1',
          code: `function App() {
  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    setText(e.target.value);
    startTransition(() => {
      setList(generateBigList(e.target.value));
    });
  }

  console.log('isPending:', isPending);
  // User types "a" — what is isPending on:
  // 1) The render right after typing?
  // 2) The render after the list finishes?`,
          language: 'jsx',
          expectedOutput: '1) isPending: true\n2) isPending: false',
          explanation:
            'After typing "a", React immediately re-renders with the new text and isPending: true (the transition is still in progress). Once the heavy list render completes, React re-renders again with the updated list and isPending: false.',
          hint: 'isPending is true while the transition render is in progress, and false once it completes.',
        },
      ],
    },

    // ─── Lesson 3: Suspense ─────────────────────────────────────────────────────
    {
      id: 'lesson-r5-3',
      moduleId: 'react-m5',
      title: 'Suspense',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Suspense for Code Splitting',
          explanation:
            'Suspense was originally introduced in React 16.6 for lazy-loading components with React.lazy(). It lets you declaratively show a fallback UI (like a spinner) while a dynamically imported component is loading. React 18 makes Suspense work with concurrent features and expands its use to data fetching.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: manual code splitting
import React, { useState, useEffect } from 'react';

function App() {
  const [Dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);

  function loadDashboard() {
    setLoading(true);
    import('./Dashboard').then(mod => {
      setDashboard(() => mod.default);
      setLoading(false);
    });
  }

  return (
    <div>
      <button onClick={loadDashboard}>
        Open Dashboard
      </button>
      {loading && <Spinner />}
      {Dashboard && <Dashboard />}
    </div>
  );
}`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18: Suspense + React.lazy
import React, { Suspense, lazy } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  const [showDashboard, setShowDashboard] =
    useState(false);

  return (
    <div>
      <button onClick={() => setShowDashboard(true)}>
        Open Dashboard
      </button>
      {showDashboard && (
        <Suspense fallback={<Spinner />}>
          <Dashboard />
        </Suspense>
      )}
    </div>
  );
}`,
            },
            caption:
              'Suspense eliminates manual loading state management for code-split components',
          },
          challenge: {
            id: 'ch-r5-3-1',
            type: 'fill-blank',
            prompt:
              'Lazy-load a Settings component with a fallback spinner:',
            code: `const Settings = ___BLANK_1___(() => import('./Settings'));

function App() {
  return (
    <___BLANK_2___ fallback={<___BLANK_3___ />}>
      <Settings />
    </___BLANK_2___>
  );
}`,
            blanks: [
              { id: 'b1', expected: ['lazy', 'React.lazy'], hint: 'function to lazy-load a component' },
              { id: 'b2', expected: ['Suspense', 'React.Suspense'], hint: 'boundary that shows fallback' },
              { id: 'b3', expected: ['Spinner', 'Loading'], hint: 'loading indicator component' },
            ],
            explanation:
              'React.lazy() wraps a dynamic import and returns a component that Suspense can catch. Suspense shows the fallback UI while the lazy component loads. Once loaded, the component renders normally.',
          },
        },
        {
          id: 'c2',
          title: 'Suspense for Data Fetching',
          explanation:
            'React 18 extends Suspense beyond code splitting to data fetching. Instead of managing loading/error/data states manually, you throw a promise from a data-fetching wrapper and let Suspense catch it. Frameworks like Next.js, Relay, and React Query integrate with this pattern. The key concept: a component "suspends" by throwing a promise, and Suspense shows the fallback until the promise resolves.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: imperative loading states
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchUser(userId)
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <Spinner />;
  if (error) return <Error msg={error} />;
  return <div>{user.name}</div>;
}`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18: declarative with Suspense
// Using a Suspense-compatible data source
// (e.g., React Query, Relay, Next.js, or use())

function UserProfile({ userId }) {
  // This "suspends" if data is not ready
  const user = use(fetchUser(userId));
  // Once resolved, renders directly
  return <div>{user.name}</div>;
}

// Parent handles loading + error boundaries
function Page({ userId }) {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Spinner />}>
        <UserProfile userId={userId} />
      </Suspense>
    </ErrorBoundary>
  );
}`,
            },
            caption:
              'Suspense inverts the loading pattern: children declare what they need, parents declare what to show while waiting',
          },
          callout: {
            type: 'info',
            text: 'You do not throw promises manually in application code. Use a Suspense-compatible library (React Query with suspense: true, Relay, Next.js) or the new use() hook. The framework handles the suspension protocol internally.',
          },
        },
        {
          id: 'c3',
          title: 'Nested Suspense Boundaries',
          explanation:
            'You can nest multiple Suspense boundaries to create granular loading states. Each boundary catches the nearest suspending child. This lets parts of the page load independently rather than showing a single full-page spinner.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: one big loading state
function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [feed, setFeed] = useState(null);
  const [sidebar, setSidebar] = useState(null);

  useEffect(() => {
    Promise.all([
      fetchProfile(),
      fetchFeed(),
      fetchSidebar(),
    ]).then(([p, f, s]) => {
      setProfile(p);
      setFeed(f);
      setSidebar(s);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner />;
  // All or nothing — everything loads at once
  return (
    <Layout profile={profile}
            feed={feed}
            sidebar={sidebar} />
  );
}`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18: granular Suspense boundaries
function Dashboard() {
  return (
    <div className="dashboard">
      <Suspense fallback={<ProfileSkeleton />}>
        <Profile />
      </Suspense>

      <Suspense fallback={<FeedSkeleton />}>
        <Feed />
      </Suspense>

      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
    </div>
  );
}
// Each section loads independently!
// Profile might appear first while
// Feed and Sidebar are still loading.`,
            },
            caption:
              'Nested Suspense boundaries let each section of the page load independently with its own skeleton',
          },
          callout: {
            type: 'tip',
            text: 'Place Suspense boundaries at meaningful UI divisions (sidebar, main content, header) rather than around every component. Too many boundaries can feel janky, while too few negate the benefit.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'You have a page with a fast-loading header and a slow-loading chart. How would you structure your Suspense boundaries so the header appears instantly?',
          hint: 'Think about wrapping only the slow part in Suspense',
          answer:
            'Wrap only the Chart component in a Suspense boundary with a skeleton fallback. The Header renders immediately outside the boundary. Structure: <><Header /><Suspense fallback={<ChartSkeleton />}><Chart /></Suspense></>. The header appears instantly while the chart shows its skeleton until data is ready.',
        },
        {
          id: 'e2',
          prompt:
            'What happens if a component suspends but there is no Suspense boundary above it in the tree?',
          hint: 'Think about what catches the thrown promise',
          answer:
            'If no Suspense boundary exists above a suspending component, the suspension propagates up to the root and the entire app shows nothing (or crashes in older setups). This is similar to an uncaught exception. Always wrap suspending components in a Suspense boundary, even if it is at the top of your app as a catch-all.',
        },
      ],
      predictOutputs: [
        {
          id: 'po-r5-3-1',
          code: `// Component tree:
<Suspense fallback={<p>Loading outer...</p>}>
  <Header />
  <Suspense fallback={<p>Loading feed...</p>}>
    <Feed />   {/* suspends for 2 seconds */}
  </Suspense>
</Suspense>

// Header renders instantly, Feed suspends.
// What does the user see initially?`,
          language: 'jsx',
          expectedOutput: 'Header + "Loading feed..."',
          explanation:
            'Header renders immediately because it does not suspend. Feed suspends and is caught by the inner Suspense boundary, which shows "Loading feed...". The outer Suspense boundary is NOT triggered because the inner one handles it. After 2 seconds, Feed replaces the fallback.',
          hint: 'Suspense boundaries catch suspensions from their children. The nearest ancestor boundary handles each suspension.',
        },
      ],
    },

    // ─── Lesson 4: Server Components Intro ──────────────────────────────────────
    {
      id: 'lesson-r5-4',
      moduleId: 'react-m5',
      title: 'Server Components Intro',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'The Server Component Model',
          explanation:
            'React Server Components (RSC) are components that run exclusively on the server. They never ship JavaScript to the client, can directly access databases and file systems, and send only their rendered output (as a serialized format) to the client. By default in frameworks like Next.js App Router, all components are Server Components unless you opt out with "use client".',
          analogy:
            'Think of Server Components as a restaurant kitchen: the chef (server) does all the heavy prep work (data fetching, access control, heavy computation) and sends only the finished dish (HTML/payload) to the table (client). Client Components are like a fondue set at the table: the diner interacts directly with it (clicking, typing, hovering).',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: everything runs on the client
// Every component ships JS to the browser

// page.jsx — runs in the browser
import { useState, useEffect } from 'react';
import { marked } from 'marked'; // 35KB library

function BlogPost({ id }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(\`/api/posts/\${id}\`)
      .then(r => r.json())
      .then(setPost);
  }, [id]);

  if (!post) return <Spinner />;
  return (
    <article>
      <h1>{post.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: marked(post.markdown),
        }}
      />
    </article>
  );
}`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18+ RSC: component runs on the server
// Zero JS shipped for this component!

// page.jsx — Server Component (default)
import { marked } from 'marked'; // stays on server
import { db } from '@/lib/database';

// async! Server Components can be async
async function BlogPost({ id }) {
  // Direct database access — no API route needed
  const post = await db.posts.findById(id);

  return (
    <article>
      <h1>{post.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: marked(post.markdown),
        }}
      />
    </article>
  );
}
// marked library never reaches the browser`,
            },
            caption:
              'Server Components fetch data directly, keep large dependencies off the client bundle, and can be async',
          },
          callout: {
            type: 'warning',
            text: 'Server Components cannot use useState, useEffect, event handlers (onClick, onChange), or browser APIs. If you need interactivity, that part must be a Client Component.',
          },
          challenge: {
            id: 'ch-r5-4-1',
            type: 'fill-blank',
            prompt:
              'Identify what makes this a valid Server Component:',
            code: `// This is a Server Component because:
// 1. No ___BLANK_1___ directive at the top
// 2. It uses ___BLANK_2___ (async/await)
// 3. It accesses the ___BLANK_3___ directly

async function ProductPage({ id }) {
  const product = await db.products.findById(id);
  return <h1>{product.name}</h1>;
}`,
            blanks: [
              { id: 'b1', expected: ['"use client"', "'use client'", 'use client'], hint: 'directive that opts into client rendering' },
              { id: 'b2', expected: ['await', 'async/await', 'async'], hint: 'Server Components can be async functions' },
              { id: 'b3', expected: ['database', 'db', 'server'], hint: 'server-side resource accessed directly' },
            ],
            explanation:
              'Server Components are the default (no "use client" directive). They can use async/await natively and access server-side resources like databases directly. None of this code reaches the browser.',
          },
        },
        {
          id: 'c2',
          title: '"use client" Boundary',
          explanation:
            'The "use client" directive marks a file as a Client Component. It creates a boundary: everything imported into that file also becomes part of the client bundle. You only need "use client" at the boundary — child components of a Client Component are automatically client-rendered too.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: no server/client distinction
// Everything is a "client component"

// Counter.jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}

// Used anywhere — always ships JS
export default Counter;`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18+ RSC: explicitly mark client boundary
// Counter.jsx
'use client'; // This file is a Client Component

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}

export default Counter;

// page.jsx — Server Component (default)
import Counter from './Counter';

async function Page() {
  const data = await fetchData();
  return (
    <div>
      <h1>{data.title}</h1>    {/* server-rendered */}
      <Counter />               {/* client-rendered */}
    </div>
  );
}`,
            },
            caption:
              '"use client" opts a file into the client bundle — only use it for interactive components',
          },
          callout: {
            type: 'gotcha',
            text: 'A common mistake is adding "use client" to every file. Only add it to files that need interactivity (state, effects, event handlers, browser APIs). The less "use client" you use, the less JavaScript you ship.',
          },
        },
        {
          id: 'c3',
          title: 'Server vs Client: When to Use Each',
          explanation:
            'The mental model is: keep as much as possible on the server, and push only interactive "leaves" to the client. Server Components handle data fetching, access control, and heavy rendering. Client Components handle clicks, form inputs, animations, and anything that uses browser APIs.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: one rendering model
// Common pattern: fetch in parent, pass down
function ProductPage({ id }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(\`/api/products/\${id}\`)
      .then(r => r.json())
      .then(setProduct);
  }, [id]);

  if (!product) return <Spinner />;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <AddToCartButton product={product} />
    </div>
  );
}
// All of this ships as JS to the browser`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// Server Component: data + layout
// page.jsx (no "use client")
async function ProductPage({ params }) {
  const product = await db.products.find(params.id);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* Only the button ships JS */}
      <AddToCartButton productId={product.id} />
    </div>
  );
}

// Client Component: interactivity only
// AddToCartButton.jsx
'use client';
function AddToCartButton({ productId }) {
  const [added, setAdded] = useState(false);
  return (
    <button onClick={() => {
      addToCart(productId);
      setAdded(true);
    }}>
      {added ? 'Added!' : 'Add to Cart'}
    </button>
  );
}`,
            },
            caption:
              'Server Components for data and layout, Client Components for interactivity — minimal JS shipped',
          },
          callout: {
            type: 'tip',
            text: 'Rule of thumb: if a component does not use useState, useEffect, onClick, onChange, or browser APIs, it should be a Server Component. Push the "use client" boundary as far down the tree as possible.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'A component displays a blog post fetched from a database and has a "Like" button. How would you split this into Server and Client Components?',
          hint: 'Think about which part needs interactivity and which just displays data',
          answer:
            'Make the BlogPost a Server Component that fetches the post from the database and renders the title, content, and metadata. Extract just the LikeButton as a Client Component ("use client") that manages the like state and click handler. Pass only the postId prop to LikeButton. The blog content stays on the server, and only the tiny button ships JavaScript.',
        },
      ],
      predictOutputs: [
        {
          id: 'po-r5-4-1',
          code: `// Will this component work as a Server Component?
// page.jsx (no "use client" directive)
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      {count}
    </button>
  );
}`,
          language: 'jsx',
          expectedOutput: 'Error: useState is not allowed in Server Components',
          explanation:
            'Server Components cannot use React hooks like useState or useEffect, and cannot have event handlers like onClick. This component needs "use client" at the top of the file because it requires client-side interactivity. Without it, the framework will throw an error at build time.',
          hint: 'Think about which React APIs are only available on the client.',
        },
      ],
    },

    // ─── Lesson 5: New Hooks & APIs ─────────────────────────────────────────────
    {
      id: 'lesson-r5-5',
      moduleId: 'react-m5',
      title: 'New Hooks & APIs',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'useId',
          explanation:
            'useId generates a unique, stable ID that is consistent between server and client rendering. Before this hook, generating IDs for accessibility attributes (htmlFor, aria-describedby) was problematic with SSR because Math.random() or incrementing counters produced different values on server vs client, causing hydration mismatches.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: fragile ID generation
let nextId = 0;

function EmailField() {
  // Problem: different on server vs client
  const [id] = useState(() => \`email-\${nextId++}\`);

  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input id={id} type="email" />
    </div>
  );
}

// Or even worse with SSR:
function PasswordField() {
  const id = \`pw-\${Math.random()}\`;
  // Hydration mismatch! Server and client
  // generate different random numbers
  return (
    <div>
      <label htmlFor={id}>Password</label>
      <input id={id} type="password" />
    </div>
  );
}`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18: useId for SSR-safe unique IDs
import { useId } from 'react';

function EmailField() {
  const id = useId();
  // Same ID on server and client!

  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input id={id} type="email" />
    </div>
  );
}

// Derive multiple related IDs from one:
function FormField({ label }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={\`\${id}-input\`}>{label}</label>
      <input id={\`\${id}-input\`}
             aria-describedby={\`\${id}-hint\`} />
      <p id={\`\${id}-hint\`}>Help text here</p>
    </div>
  );
}`,
            },
            caption:
              'useId produces deterministic IDs that match between SSR and hydration',
          },
          callout: {
            type: 'warning',
            text: 'Do NOT use useId to generate keys for list items. It is designed for accessibility attributes (htmlFor, aria-*), not for React keys. Use stable data IDs for keys.',
          },
          challenge: {
            id: 'ch-r5-5-1',
            type: 'fill-blank',
            prompt:
              'Create an accessible form field using useId:',
            code: `function SearchField() {
  const id = ___BLANK_1___();
  return (
    <div>
      <label ___BLANK_2___={id}>Search</label>
      <input ___BLANK_3___={id} type="search" />
    </div>
  );
}`,
            blanks: [
              { id: 'b1', expected: ['useId'], hint: 'hook for generating unique IDs' },
              { id: 'b2', expected: ['htmlFor'], hint: 'label attribute that points to an input' },
              { id: 'b3', expected: ['id'], hint: 'input attribute that the label references' },
            ],
            explanation:
              'useId() generates a unique ID. The label uses htmlFor (React version of for) to reference the input\'s id. This creates an accessible connection: clicking the label focuses the input.',
          },
        },
        {
          id: 'c2',
          title: 'useSyncExternalStore',
          explanation:
            'useSyncExternalStore is designed for subscribing to external data sources (Redux stores, browser APIs, third-party state libraries) in a way that is safe for concurrent rendering. Before this hook, external stores could cause "tearing" where different parts of the UI showed different values from the same store during a concurrent render.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: manual subscription pattern
function WindowWidth() {
  const [width, setWidth] = useState(
    window.innerWidth
  );

  useEffect(() => {
    const handler = () =>
      setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () =>
      window.removeEventListener('resize', handler);
  }, []);

  return <p>Width: {width}px</p>;
}

// Problem with concurrent rendering:
// Between the time React reads the store value
// and finishes rendering, the value could change.
// Different components might see different values!`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18: useSyncExternalStore
import { useSyncExternalStore } from 'react';

function subscribe(callback) {
  window.addEventListener('resize', callback);
  return () =>
    window.removeEventListener('resize', callback);
}

function getSnapshot() {
  return window.innerWidth;
}

function getServerSnapshot() {
  return 1024; // default for SSR
}

function WindowWidth() {
  const width = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot // optional, for SSR
  );

  return <p>Width: {width}px</p>;
}
// Guaranteed consistent during concurrent renders`,
            },
            caption:
              'useSyncExternalStore prevents tearing by synchronizing external store reads with React rendering',
          },
          callout: {
            type: 'info',
            text: 'Most developers will not use useSyncExternalStore directly. It is primarily for library authors (Redux, Zustand, etc.). If you use a state management library, it likely uses this hook internally.',
          },
        },
        {
          id: 'c3',
          title: 'use() Hook',
          explanation:
            'The use() hook is a special React API that can read the value of a promise or context. Unlike other hooks, use() can be called inside conditionals and loops. When used with a promise, it integrates with Suspense: the component suspends until the promise resolves. When used with context, it replaces useContext but with the flexibility to be called conditionally.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: useContext + useEffect for data
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './theme';

function UserProfile({ userId, isAdmin }) {
  // useContext cannot be conditional
  const theme = useContext(ThemeContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  if (!user) return <Spinner />;

  // Cannot conditionally read context
  // const adminCtx = isAdmin
  //   ? useContext(AdminContext)  // RULE VIOLATION!
  //   : null;

  return <div style={{ color: theme.text }}>
    {user.name}
  </div>;
}`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18+: use() for promises and context
import { use } from 'react';
import { ThemeContext } from './theme';

function UserProfile({ userId, isAdmin }) {
  // use() with context (like useContext)
  const theme = use(ThemeContext);

  // use() with a promise — suspends until resolved
  const user = use(fetchUser(userId));

  // use() CAN be called conditionally!
  let adminConfig = null;
  if (isAdmin) {
    adminConfig = use(AdminContext);
  }

  return (
    <div style={{ color: theme.text }}>
      {user.name}
      {adminConfig && <AdminPanel config={adminConfig} />}
    </div>
  );
}
// Must be wrapped in <Suspense> for the promise`,
            },
            caption:
              'use() reads promises (with Suspense) and context, and uniquely can be called conditionally',
          },
          callout: {
            type: 'gotcha',
            text: 'When use() reads a promise, the component MUST be wrapped in a Suspense boundary. The promise must also be created outside the component (or memoized), otherwise every render creates a new promise and the component suspends forever.',
          },
          challenge: {
            id: 'ch-r5-5-2',
            type: 'fill-blank',
            prompt:
              'Use the use() hook to read a promise and context:',
            code: `import { ___BLANK_1___ } from 'react';

function Comments({ commentsPromise }) {
  const comments = ___BLANK_2___(commentsPromise);
  const theme = ___BLANK_3___(ThemeContext);

  return comments.map(c =>
    <p style={{ color: theme.text }}>{c.body}</p>
  );
}`,
            blanks: [
              { id: 'b1', expected: ['use'], hint: 'new React API for reading promises and context' },
              { id: 'b2', expected: ['use'], hint: 'reads the promise and suspends until resolved' },
              { id: 'b3', expected: ['use'], hint: 'reads context (can also use useContext)' },
            ],
            explanation:
              'use() is imported from react and can read both promises and context. When reading a promise, it suspends the component (requires a Suspense boundary above). When reading context, it works like useContext but with the bonus of being callable inside conditionals.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'You are building a form component that renders on both the server and client. Each input needs a unique ID for its label. How do you ensure the IDs match between server-rendered HTML and client hydration?',
          hint: 'Think about which hook produces deterministic IDs across server and client',
          answer:
            'Use useId() to generate the IDs. It produces the same deterministic ID on both server and client, preventing hydration mismatches. You can derive multiple IDs from one by appending suffixes: const id = useId(); then use `${id}-email` and `${id}-password` for different fields.',
        },
        {
          id: 'e2',
          prompt:
            'What is unique about use() compared to every other React hook?',
          hint: 'Think about the rules of hooks and where they can be called',
          answer:
            'use() is the only React hook that can be called inside conditionals, loops, and after early returns. All other hooks (useState, useEffect, useContext, etc.) must follow the Rules of Hooks: they must be called at the top level of the component, unconditionally, in the same order every render. use() is exempt from this rule.',
        },
      ],
      predictOutputs: [
        {
          id: 'po-r5-5-1',
          code: `import { useId } from 'react';

function Field({ label }) {
  const id = useId();
  console.log(id);
  return <label htmlFor={id}>{label}</label>;
}

function Form() {
  return (
    <>
      <Field label="Name" />
      <Field label="Email" />
    </>
  );
}
// What do the two logged IDs look like?`,
          language: 'jsx',
          expectedOutput: ':r1: and :r2: (two different unique IDs)',
          explanation:
            'Each call to useId() in a separate component instance produces a different unique ID. The format is implementation-specific (React uses :r0:, :r1:, etc. internally), but the key property is that each Field gets its own stable, unique ID. The same IDs are generated on both server and client.',
          hint: 'Each component instance that calls useId() gets a distinct ID.',
        },
      ],
    },
  ],
};

export default reactM5;
