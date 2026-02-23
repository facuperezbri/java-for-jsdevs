import type { Module } from '../../../../types';

const reactM5: Module = {
  id: 'react-m5',
  order: 5,
  title: 'React 18+',
  subtitle: 'Funcionalidades concurrentes, Suspense, Server Components y nuevos hooks',
  icon: '\uD83D\uDE80',
  accentColor: 'red',
  quizId: 'react-quiz-5',
  lessons: [
    // ─── Lección 1: React Concurrente ───────────────────────────────────────────
    {
      id: 'lesson-r5-1',
      moduleId: 'react-m5',
      title: 'React Concurrente',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'Renderizado síncrono vs concurrente',
          explanation:
            'Antes de React 18, el renderizado era síncrono: una vez que React comenzaba a renderizar un árbol de componentes, no podía interrumpirse hasta que todo el árbol estuviera renderizado. Esto podía congelar la UI en actualizaciones pesadas. El renderizado concurrente permite a React pausar, interrumpir y reanudar el trabajo, manteniendo la app responsiva incluso durante renderizados grandes.',
          analogy:
            'El renderizado síncrono es como un chef que comienza a cocinar una cena de 10 platos y no puede tomar ningún otro pedido hasta que los 10 platos estén listos. El renderizado concurrente es como un chef que puede pausar un plato de baja prioridad para preparar rápidamente un aperitivo de alta prioridad, y luego retomar el plato original.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: renderizado síncrono
// ReactDOM.render bloquea hasta terminar
import ReactDOM from 'react-dom';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// Actualización pesada de estado bloquea toda la UI
function handleClick() {
  // Esta actualización no puede interrumpirse
  setItems(generateHugeList());
  // El input del usuario se congela hasta que el renderizado termine
}`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18: renderizado concurrente via createRoot
import { createRoot } from 'react-dom/client';

const root = createRoot(
  document.getElementById('root')
);
root.render(<App />);

// React ahora puede interrumpir y priorizar renderizados
function handleClick() {
  // React puede pausar esto si llega trabajo
  // de mayor prioridad (como el usuario escribiendo)
  setItems(generateHugeList());
}`,
            },
            caption:
              'createRoot habilita funcionalidades concurrentes — ReactDOM.render ahora es legacy',
          },
          callout: {
            type: 'warning',
            text: 'Debes cambiar de ReactDOM.render() a createRoot() para optar por las funcionalidades concurrentes. Sin createRoot, React 18 se comporta como React 17.',
          },
          challenge: {
            id: 'ch-r5-1-1',
            type: 'fill-blank',
            prompt:
              'Migra este punto de entrada de la app a React 18:',
            code: `import { ___BLANK_1___ } from 'react-dom/client';

const root = ___BLANK_2___(
  document.getElementById('root')
);
root.___BLANK_3___(<App />);`,
            blanks: [
              { id: 'b1', expected: ['createRoot'], hint: 'nueva API de root' },
              { id: 'b2', expected: ['createRoot'], hint: 'crea un root concurrente' },
              { id: 'b3', expected: ['render'], hint: 'renderiza la app' },
            ],
            explanation:
              'React 18 usa createRoot de react-dom/client. Primero creas un root, luego llamas .render() en él. Esto reemplaza el antiguo patrón ReactDOM.render(element, container).',
          },
        },
        {
          id: 'c2',
          title: 'Batching automático',
          explanation:
            'En React 17, las actualizaciones de estado dentro de manejadores de eventos se agrupaban (se combinaban en un solo re-renderizado), pero las actualizaciones dentro de promesas, setTimeout o manejadores de eventos nativos NO se agrupaban. React 18 agrupa automáticamente TODAS las actualizaciones de estado sin importar dónde se originan, reduciendo re-renderizados innecesarios.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: batching solo en manejadores de eventos
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // Agrupado: UN re-renderizado (bien)
}

// Pero NO agrupado en contextos asíncronos:
fetch('/api/data').then(() => {
  setCount(c => c + 1); // re-renderizado 1
  setFlag(f => !f);     // re-renderizado 2
  // ¡DOS re-renderizados (desperdicio!)
});

setTimeout(() => {
  setCount(c => c + 1); // re-renderizado 1
  setFlag(f => !f);     // re-renderizado 2
}, 1000);`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18: batching automático EN TODAS PARTES
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // Agrupado: UN re-renderizado (igual que antes)
}

// ¡AHORA agrupado en contextos asíncronos también!
fetch('/api/data').then(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // UN re-renderizado (¡batching automático!)
});

setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // UN re-renderizado (¡batching automático!)
}, 1000);`,
            },
            caption:
              'React 18 agrupa todas las actualizaciones de estado por defecto, incluso dentro de promesas y timeouts',
          },
          callout: {
            type: 'tip',
            text: 'Si necesitas forzar un re-renderizado síncrono (raro), usa flushSync() de react-dom: flushSync(() => { setState(newValue); }). El DOM se actualiza inmediatamente después de que flushSync termina.',
          },
        },
        {
          id: 'c3',
          title: 'Doble renderizado en Strict Mode',
          explanation:
            'El Strict Mode de React 18 invoca intencionalmente los efectos dos veces durante el desarrollo para ayudarte a encontrar bugs causados por funciones de limpieza faltantes. Los componentes se montan, desmontan y re-montan para simular escenarios del mundo real como Fast Refresh y el futuro comportamiento de la API Offscreen. Esto solo ocurre en desarrollo, nunca en producción.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17 StrictMode:
// Solo doble renderizado (sin re-ejecución de efectos)
<React.StrictMode>
  <App />
</React.StrictMode>

function Timer() {
  useEffect(() => {
    const id = setInterval(() => {
      console.log('tick');
    }, 1000);
    // Limpieza faltante — funciona "bien" en dev
  }, []);

  return <div>Timer</div>;
}`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18 StrictMode:
// Mount -> Unmount -> Re-mount en dev
<React.StrictMode>
  <App />
</React.StrictMode>

function Timer() {
  useEffect(() => {
    const id = setInterval(() => {
      console.log('tick');
    }, 1000);

    // La limpieza ahora es ESENCIAL
    // ¡Sin ella, obtienes 2 intervals!
    return () => clearInterval(id);
  }, []);

  return <div>Timer</div>;
}`,
            },
            caption:
              'El Strict Mode de React 18 expone limpiezas faltantes simulando ciclos de unmount/remount',
          },
          callout: {
            type: 'gotcha',
            text: 'Si tus efectos se ejecutan dos veces en desarrollo y causan problemas, significa que te falta una función de limpieza. Corrige la limpieza en lugar de eliminar StrictMode.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            '¿Por qué React 18 requiere createRoot en lugar de simplemente actualizar ReactDOM.render automáticamente?',
          hint: 'Piensa en compatibilidad hacia atrás y optar por el nuevo comportamiento',
          answer:
            'createRoot es un opt-in explícito a las funcionalidades concurrentes. React mantuvo ReactDOM.render funcionando (en modo legacy) para que las apps existentes no se rompan al actualizar. Esto permite que los equipos migren incrementalmente: actualizar a React 18, luego cambiar a createRoot cuando estén listos para el comportamiento concurrente.',
        },
        {
          id: 'e2',
          prompt:
            'Notas que tu useEffect se ejecuta dos veces en desarrollo después de actualizar a React 18. Tu compañero sugiere eliminar StrictMode. ¿Es la solución correcta?',
          hint: 'Considera qué intenta decirte la doble invocación',
          answer:
            'No. La doble invocación es intencional y resalta funciones de limpieza faltantes en tus efectos. La solución correcta es agregar limpieza apropiada (retornar una función desde useEffect que desmonte suscripciones, intervals, etc.). StrictMode detecta bugs reales que aparecerían en producción con Fast Refresh o funcionalidades futuras.',
        },
      ],
      predictOutputs: [
        {
          id: 'po-r5-1-1',
          code: `// React 18 con createRoot
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
// ¿Cuántas veces se imprime "render" después de hacer clic?`,
          language: 'jsx',
          expectedOutput: 'render (una vez)',
          explanation:
            'En React 18 con createRoot, las actualizaciones de estado dentro de promesas se agrupan automáticamente. Tanto setA como setB se agrupan en un solo re-renderizado, así que "render" se imprime solo una vez después del clic. En React 17, esto habría impreso "render" dos veces.',
          hint: 'Piensa en el batching automático de React 18 y dónde ocurren las actualizaciones de estado.',
        },
      ],
    },

    // ─── Lección 2: Transiciones ────────────────────────────────────────────────
    {
      id: 'lesson-r5-2',
      moduleId: 'react-m5',
      title: 'Transiciones',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'useTransition',
          explanation:
            'useTransition te permite marcar ciertas actualizaciones de estado como no urgentes (transiciones). React mantendrá la UI actual responsiva mientras prepara la nueva UI en segundo plano. El hook retorna una bandera booleana isPending y una función startTransition. Esta es la herramienta principal para mantener tu app responsiva durante actualizaciones pesadas.',
          analogy:
            'Imagina escribir en un cuadro de búsqueda que filtra una lista de 10,000 elementos. Sin transiciones, cada pulsación congela la UI mientras la lista se re-renderiza. Con useTransition, la escritura permanece instantánea (actualización urgente) mientras el re-renderizado de la lista ocurre en segundo plano (transición). Si escribes otra letra antes de que la lista termine, React descarta el renderizado obsoleto y comienza de nuevo.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: todas las actualizaciones tienen igual prioridad
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);       // actualiza el input
    setResults(            // filtra 10k elementos
      allItems.filter(i =>
        i.name.includes(value)
      )
    );
    // Ambas actualizaciones bloquean juntas
    // El input se siente lento en cada pulsación
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
              code: `// React 18: separar urgente de no urgente
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);         // urgente: actualizar input AHORA

    startTransition(() => {
      setResults(            // no urgente: puede esperar
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
              'useTransition separa actualizaciones en urgentes (input) y no urgentes (filtrado de lista)',
          },
          challenge: {
            id: 'ch-r5-2-1',
            type: 'fill-blank',
            prompt:
              'Agrega una transición para diferir la actualización costosa del contenido de pestaña:',
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
              { id: 'b1', expected: ['startTransition'], hint: 'función para iniciar una transición' },
              { id: 'b2', expected: ['startTransition'], hint: 'envolver la actualización no urgente' },
              { id: 'b3', expected: ['isPending'], hint: 'booleano que indica transición en progreso' },
            ],
            explanation:
              'useTransition retorna [isPending, startTransition]. Envuelve el setActiveTab no urgente dentro de startTransition. Usa isPending para mostrar un indicador de carga mientras el nuevo contenido de pestaña se renderiza en segundo plano.',
          },
        },
        {
          id: 'c2',
          title: 'startTransition (independiente)',
          explanation:
            'React también exporta una función startTransition independiente (no el hook). Úsala cuando necesites marcar una actualización como transición fuera de un componente, como en una biblioteca, router o módulo utilitario. La diferencia: la versión independiente no te da una bandera isPending.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: sin forma de despriorizar actualizaciones
// La navegación del router bloquea todo

// En una biblioteca de router:
function navigate(url) {
  setURL(url);
  // Esto dispara un re-renderizado completo
  // La UI se congela durante transiciones pesadas de página
}

// Los desarrolladores usaban soluciones alternativas:
function navigate(url) {
  setURL(url);
  // Debounce o setTimeout para diferir trabajo
  setTimeout(() => {
    setPageContent(loadPage(url));
  }, 0);
}`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18: startTransition independiente
import { startTransition } from 'react';

// En una biblioteca de router:
function navigate(url) {
  startTransition(() => {
    setURL(url);
    // React trata esto como no urgente
    // La página actual permanece interactiva
  });
}

// En un store de datos o utilidad:
function updateStore(newData) {
  startTransition(() => {
    store.setState(newData);
  });
}
// Sin isPending — usa useTransition en
// componentes cuando necesites esa bandera`,
            },
            caption:
              'startTransition independiente funciona en cualquier lugar; usa useTransition en componentes cuando necesites isPending',
          },
        },
        {
          id: 'c3',
          title: 'useDeferredValue',
          explanation:
            'useDeferredValue te permite diferir el re-renderizado de una parte de la UI. Le pasas un valor, y React retorna una copia "diferida" que se retrasa durante actualizaciones urgentes. Esto es útil cuando no puedes controlar dónde ocurre la actualización de estado (ej. el valor viene de props) pero aún quieres mantener la UI responsiva.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: debouncing manual
function SearchResults({ query }) {
  const [debouncedQuery, setDebouncedQuery] =
    useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Usa el valor debounced para renderizado costoso
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
  // React difiere este valor durante actualizaciones urgentes
  const deferredQuery = useDeferredValue(query);

  // El renderizado costoso usa el valor diferido
  const results = filterItems(deferredQuery);

  // Mostrar indicador de obsoleto mientras está diferido
  const isStale = query !== deferredQuery;

  return (
    <div style={{ opacity: isStale ? 0.5 : 1 }}>
      <List items={results} />
    </div>
  );
}`,
            },
            caption:
              'useDeferredValue es como debouncing pero más inteligente: se adapta a la velocidad del dispositivo y se integra con el renderizado concurrente',
          },
          callout: {
            type: 'tip',
            text: 'Usa useTransition cuando TÚ controlas la actualización de estado. Usa useDeferredValue cuando el valor viene de AFUERA (props, contexto o un padre). Ambos logran el mismo objetivo: mantener la UI responsiva durante renderizados pesados.',
          },
          challenge: {
            id: 'ch-r5-2-2',
            type: 'fill-blank',
            prompt:
              'Usa useDeferredValue para diferir un renderizado costoso de lista:',
            code: `function ProductList({ searchTerm }) {
  const deferred = ___BLANK_1___(searchTerm);
  const isStale = searchTerm !== ___BLANK_2___;

  const filtered = expensiveFilter(___BLANK_3___);
  return <List items={filtered} opacity={isStale ? 0.5 : 1} />;
}`,
            blanks: [
              { id: 'b1', expected: ['useDeferredValue'], hint: 'hook que difiere un valor' },
              { id: 'b2', expected: ['deferred'], hint: 'comparar para detectar obsolescencia' },
              { id: 'b3', expected: ['deferred'], hint: 'pasar el valor diferido al cálculo costoso' },
            ],
            explanation:
              'useDeferredValue(searchTerm) retorna una copia diferida. Compara searchTerm !== deferred para detectar cuándo el valor diferido está obsoleto. Pasa el valor diferido al cálculo costoso para que use el valor retrasado mientras las actualizaciones urgentes proceden.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'Tienes un componente de pestañas donde hacer clic en una pestaña carga contenido pesado. El clic se siente no responsivo porque el contenido se renderiza síncronamente. ¿Cómo lo arreglarías con useTransition?',
          hint: 'Piensa en qué actualización es urgente (resaltar pestaña) vs no urgente (contenido de pestaña)',
          answer:
            'Envuelve la llamada setActiveTab dentro de startTransition. El resaltado de la pestaña se actualiza inmediatamente (urgente), mientras el contenido se renderiza en segundo plano (transición). Usa isPending para mostrar un spinner o reducir la opacidad del área de contenido mientras carga.',
        },
        {
          id: 'e2',
          prompt:
            '¿Cuándo deberías usar useDeferredValue en lugar de useTransition?',
          hint: 'Considera quién controla la actualización de estado',
          answer:
            'Usa useDeferredValue cuando recibes un valor de afuera (props, contexto) y no puedes envolver la actualización de estado en startTransition. Por ejemplo, si un componente padre pasa una consulta de búsqueda como prop, el hijo no puede controlar cómo se establece. useDeferredValue permite al hijo diferir su propio renderizado basado en esa prop.',
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
  // El usuario escribe "a" — ¿cuál es isPending en:
  // 1) ¿El renderizado justo después de escribir?
  // 2) ¿El renderizado después de que la lista termina?`,
          language: 'jsx',
          expectedOutput: '1) isPending: true\n2) isPending: false',
          explanation:
            'Después de escribir "a", React re-renderiza inmediatamente con el nuevo texto e isPending: true (la transición aún está en progreso). Una vez que el renderizado pesado de la lista se completa, React re-renderiza de nuevo con la lista actualizada e isPending: false.',
          hint: 'isPending es true mientras el renderizado de la transición está en progreso, y false una vez que se completa.',
        },
      ],
    },

    // ─── Lección 3: Suspense ────────────────────────────────────────────────────
    {
      id: 'lesson-r5-3',
      moduleId: 'react-m5',
      title: 'Suspense',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Suspense para code splitting',
          explanation:
            'Suspense se introdujo originalmente en React 16.6 para carga diferida de componentes con React.lazy(). Te permite mostrar declarativamente una UI de respaldo (como un spinner) mientras un componente importado dinámicamente está cargando. React 18 hace que Suspense funcione con funcionalidades concurrentes y expande su uso a la obtención de datos.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: code splitting manual
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
              'Suspense elimina la gestión manual de estado de carga para componentes con code-split',
          },
          challenge: {
            id: 'ch-r5-3-1',
            type: 'fill-blank',
            prompt:
              'Carga diferidamente un componente Settings con un spinner de respaldo:',
            code: `const Settings = ___BLANK_1___(() => import('./Settings'));

function App() {
  return (
    <___BLANK_2___ fallback={<___BLANK_3___ />}>
      <Settings />
    </___BLANK_2___>
  );
}`,
            blanks: [
              { id: 'b1', expected: ['lazy', 'React.lazy'], hint: 'función para cargar un componente diferidamente' },
              { id: 'b2', expected: ['Suspense', 'React.Suspense'], hint: 'boundary que muestra el respaldo' },
              { id: 'b3', expected: ['Spinner', 'Loading'], hint: 'componente indicador de carga' },
            ],
            explanation:
              'React.lazy() envuelve un import dinámico y retorna un componente que Suspense puede capturar. Suspense muestra la UI de respaldo mientras el componente lazy carga. Una vez cargado, el componente se renderiza normalmente.',
          },
        },
        {
          id: 'c2',
          title: 'Suspense para obtención de datos',
          explanation:
            'React 18 extiende Suspense más allá del code splitting a la obtención de datos. En lugar de gestionar estados loading/error/data manualmente, lanzas una promesa desde un wrapper de obtención de datos y dejas que Suspense la capture. Frameworks como Next.js, Relay y React Query se integran con este patrón. El concepto clave: un componente "suspende" lanzando una promesa, y Suspense muestra el respaldo hasta que la promesa se resuelve.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: estados de carga imperativos
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
              code: `// React 18: declarativo con Suspense
// Usando una fuente de datos compatible con Suspense
// (ej. React Query, Relay, Next.js, o use())

function UserProfile({ userId }) {
  // Esto "suspende" si los datos no están listos
  const user = use(fetchUser(userId));
  // Una vez resuelto, renderiza directamente
  return <div>{user.name}</div>;
}

// El padre maneja loading + error boundaries
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
              'Suspense invierte el patrón de carga: los hijos declaran lo que necesitan, los padres declaran qué mostrar mientras esperan',
          },
          callout: {
            type: 'info',
            text: 'No lanzas promesas manualmente en el código de aplicación. Usa una biblioteca compatible con Suspense (React Query con suspense: true, Relay, Next.js) o el nuevo hook use(). El framework maneja el protocolo de suspensión internamente.',
          },
        },
        {
          id: 'c3',
          title: 'Suspense boundaries anidados',
          explanation:
            'Puedes anidar múltiples Suspense boundaries para crear estados de carga granulares. Cada boundary captura el hijo suspendido más cercano. Esto permite que partes de la página carguen independientemente en lugar de mostrar un único spinner de página completa.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: un gran estado de carga
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
  // Todo o nada — todo carga a la vez
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
              code: `// React 18: Suspense boundaries granulares
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
// ¡Cada sección carga independientemente!
// Profile podría aparecer primero mientras
// Feed y Sidebar aún están cargando.`,
            },
            caption:
              'Los Suspense boundaries anidados permiten que cada sección de la página cargue independientemente con su propio skeleton',
          },
          callout: {
            type: 'tip',
            text: 'Coloca Suspense boundaries en divisiones significativas de la UI (sidebar, contenido principal, header) en lugar de alrededor de cada componente. Demasiados boundaries pueden sentirse entrecortados, mientras que muy pocos anulan el beneficio.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'Tienes una página con un header de carga rápida y un gráfico de carga lenta. ¿Cómo estructurarías tus Suspense boundaries para que el header aparezca instantáneamente?',
          hint: 'Piensa en envolver solo la parte lenta en Suspense',
          answer:
            'Envuelve solo el componente Chart en un Suspense boundary con un skeleton de respaldo. El Header se renderiza inmediatamente fuera del boundary. Estructura: <><Header /><Suspense fallback={<ChartSkeleton />}><Chart /></Suspense></>. El header aparece al instante mientras el gráfico muestra su skeleton hasta que los datos estén listos.',
        },
        {
          id: 'e2',
          prompt:
            '¿Qué pasa si un componente suspende pero no hay un Suspense boundary arriba de él en el árbol?',
          hint: 'Piensa en qué captura la promesa lanzada',
          answer:
            'Si no existe un Suspense boundary arriba de un componente que suspende, la suspensión se propaga hasta la raíz y toda la app no muestra nada (o falla en configuraciones antiguas). Esto es similar a una excepción no capturada. Siempre envuelve los componentes que suspenden en un Suspense boundary, aunque sea en la parte superior de tu app como un catch-all.',
        },
      ],
      predictOutputs: [
        {
          id: 'po-r5-3-1',
          code: `// Árbol de componentes:
<Suspense fallback={<p>Loading outer...</p>}>
  <Header />
  <Suspense fallback={<p>Loading feed...</p>}>
    <Feed />   {/* suspende por 2 segundos */}
  </Suspense>
</Suspense>

// Header se renderiza al instante, Feed suspende.
// ¿Qué ve el usuario inicialmente?`,
          language: 'jsx',
          expectedOutput: 'Header + "Loading feed..."',
          explanation:
            'Header se renderiza inmediatamente porque no suspende. Feed suspende y es capturado por el Suspense boundary interno, que muestra "Loading feed...". El Suspense boundary externo NO se activa porque el interno lo maneja. Después de 2 segundos, Feed reemplaza el respaldo.',
          hint: 'Los Suspense boundaries capturan suspensiones de sus hijos. El boundary ancestro más cercano maneja cada suspensión.',
        },
      ],
    },

    // ─── Lección 4: Introducción a Server Components ────────────────────────────
    {
      id: 'lesson-r5-4',
      moduleId: 'react-m5',
      title: 'Introducción a Server Components',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'El modelo de Server Components',
          explanation:
            'Los React Server Components (RSC) son componentes que se ejecutan exclusivamente en el servidor. Nunca envían JavaScript al cliente, pueden acceder directamente a bases de datos y sistemas de archivos, y envían solo su salida renderizada (en formato serializado) al cliente. Por defecto en frameworks como Next.js App Router, todos los componentes son Server Components a menos que optes por salir con "use client".',
          analogy:
            'Piensa en los Server Components como la cocina de un restaurante: el chef (servidor) hace todo el trabajo pesado de preparación (obtención de datos, control de acceso, cálculos pesados) y envía solo el plato terminado (HTML/payload) a la mesa (cliente). Los Client Components son como un set de fondue en la mesa: el comensal interactúa directamente con él (clic, escritura, hover).',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: todo se ejecuta en el cliente
// Cada componente envía JS al navegador

// page.jsx — se ejecuta en el navegador
import { useState, useEffect } from 'react';
import { marked } from 'marked'; // biblioteca de 35KB

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
              code: `// React 18+ RSC: el componente se ejecuta en el servidor
// ¡Cero JS enviado para este componente!

// page.jsx — Server Component (por defecto)
import { marked } from 'marked'; // se queda en el servidor
import { db } from '@/lib/database';

// ¡async! Los Server Components pueden ser async
async function BlogPost({ id }) {
  // Acceso directo a base de datos — sin ruta API necesaria
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
// La biblioteca marked nunca llega al navegador`,
            },
            caption:
              'Los Server Components obtienen datos directamente, mantienen dependencias grandes fuera del bundle del cliente, y pueden ser async',
          },
          callout: {
            type: 'warning',
            text: 'Los Server Components no pueden usar useState, useEffect, manejadores de eventos (onClick, onChange), ni APIs del navegador. Si necesitas interactividad, esa parte debe ser un Client Component.',
          },
          challenge: {
            id: 'ch-r5-4-1',
            type: 'fill-blank',
            prompt:
              'Identifica qué hace que este sea un Server Component válido:',
            code: `// Este es un Server Component porque:
// 1. No tiene directiva ___BLANK_1___ arriba
// 2. Usa ___BLANK_2___ (async/await)
// 3. Accede a la ___BLANK_3___ directamente

async function ProductPage({ id }) {
  const product = await db.products.findById(id);
  return <h1>{product.name}</h1>;
}`,
            blanks: [
              { id: 'b1', expected: ['"use client"', "'use client'", 'use client'], hint: 'directiva que opta por renderizado en cliente' },
              { id: 'b2', expected: ['await', 'async/await', 'async'], hint: 'los Server Components pueden ser funciones async' },
              { id: 'b3', expected: ['database', 'db', 'server'], hint: 'recurso del lado del servidor accedido directamente' },
            ],
            explanation:
              'Los Server Components son el valor por defecto (sin directiva "use client"). Pueden usar async/await nativamente y acceder a recursos del lado del servidor como bases de datos directamente. Nada de este código llega al navegador.',
          },
        },
        {
          id: 'c2',
          title: 'Boundary "use client"',
          explanation:
            'La directiva "use client" marca un archivo como Client Component. Crea un boundary: todo lo importado en ese archivo también se convierte en parte del bundle del cliente. Solo necesitas "use client" en el boundary — los componentes hijos de un Client Component se renderizan automáticamente en el cliente también.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: sin distinción servidor/cliente
// Todo es un "client component"

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

// Se usa en cualquier lugar — siempre envía JS
export default Counter;`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18+ RSC: marcar explícitamente el boundary de cliente
// Counter.jsx
'use client'; // Este archivo es un Client Component

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

// page.jsx — Server Component (por defecto)
import Counter from './Counter';

async function Page() {
  const data = await fetchData();
  return (
    <div>
      <h1>{data.title}</h1>    {/* renderizado en servidor */}
      <Counter />               {/* renderizado en cliente */}
    </div>
  );
}`,
            },
            caption:
              '"use client" opta un archivo al bundle del cliente — solo úsalo para componentes interactivos',
          },
          callout: {
            type: 'gotcha',
            text: 'Un error común es agregar "use client" a cada archivo. Solo agrégalo a archivos que necesitan interactividad (estado, efectos, manejadores de eventos, APIs del navegador). Cuanto menos "use client" uses, menos JavaScript envías.',
          },
        },
        {
          id: 'c3',
          title: 'Servidor vs Cliente: Cuándo usar cada uno',
          explanation:
            'El modelo mental es: mantén tanto como sea posible en el servidor, y empuja solo las "hojas" interactivas al cliente. Los Server Components manejan obtención de datos, control de acceso y renderizado pesado. Los Client Components manejan clics, inputs de formulario, animaciones y cualquier cosa que use APIs del navegador.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: un solo modelo de renderizado
// Patrón común: fetch en padre, pasar hacia abajo
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
// Todo esto se envía como JS al navegador`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// Server Component: datos + layout
// page.jsx (sin "use client")
async function ProductPage({ params }) {
  const product = await db.products.find(params.id);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* Solo el botón envía JS */}
      <AddToCartButton productId={product.id} />
    </div>
  );
}

// Client Component: solo interactividad
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
              'Server Components para datos y layout, Client Components para interactividad — mínimo JS enviado',
          },
          callout: {
            type: 'tip',
            text: 'Regla general: si un componente no usa useState, useEffect, onClick, onChange, ni APIs del navegador, debería ser un Server Component. Empuja el boundary "use client" lo más abajo posible en el árbol.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'Un componente muestra un post de blog obtenido de una base de datos y tiene un botón "Like". ¿Cómo lo dividirías en Server y Client Components?',
          hint: 'Piensa en qué parte necesita interactividad y cuál solo muestra datos',
          answer:
            'Haz que el BlogPost sea un Server Component que obtenga el post de la base de datos y renderice el título, contenido y metadatos. Extrae solo el LikeButton como Client Component ("use client") que gestione el estado del like y el manejador de clic. Pasa solo el prop postId a LikeButton. El contenido del blog se queda en el servidor, y solo el pequeño botón envía JavaScript.',
        },
      ],
      predictOutputs: [
        {
          id: 'po-r5-4-1',
          code: `// ¿Funcionará este componente como Server Component?
// page.jsx (sin directiva "use client")
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
          expectedOutput: 'Error: useState no está permitido en Server Components',
          explanation:
            'Los Server Components no pueden usar hooks de React como useState o useEffect, y no pueden tener manejadores de eventos como onClick. Este componente necesita "use client" al inicio del archivo porque requiere interactividad del lado del cliente. Sin él, el framework lanzará un error en tiempo de build.',
          hint: 'Piensa en qué APIs de React solo están disponibles en el cliente.',
        },
      ],
    },

    // ─── Lección 5: Nuevos Hooks y APIs ─────────────────────────────────────────
    {
      id: 'lesson-r5-5',
      moduleId: 'react-m5',
      title: 'Nuevos Hooks y APIs',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'useId',
          explanation:
            'useId genera un ID único y estable que es consistente entre el renderizado del servidor y del cliente. Antes de este hook, generar IDs para atributos de accesibilidad (htmlFor, aria-describedby) era problemático con SSR porque Math.random() o contadores incrementales producían valores diferentes en servidor vs cliente, causando errores de hidratación.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: generación frágil de IDs
let nextId = 0;

function EmailField() {
  // Problema: diferente en servidor vs cliente
  const [id] = useState(() => \`email-\${nextId++}\`);

  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input id={id} type="email" />
    </div>
  );
}

// O peor aún con SSR:
function PasswordField() {
  const id = \`pw-\${Math.random()}\`;
  // ¡Error de hidratación! Servidor y cliente
  // generan números aleatorios diferentes
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
              code: `// React 18: useId para IDs únicos seguros con SSR
import { useId } from 'react';

function EmailField() {
  const id = useId();
  // ¡Mismo ID en servidor y cliente!

  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input id={id} type="email" />
    </div>
  );
}

// Derivar múltiples IDs relacionados de uno:
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
              'useId produce IDs determinísticos que coinciden entre SSR e hidratación',
          },
          callout: {
            type: 'warning',
            text: 'NO uses useId para generar keys de elementos de lista. Está diseñado para atributos de accesibilidad (htmlFor, aria-*), no para keys de React. Usa IDs estables de datos para keys.',
          },
          challenge: {
            id: 'ch-r5-5-1',
            type: 'fill-blank',
            prompt:
              'Crea un campo de formulario accesible usando useId:',
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
              { id: 'b1', expected: ['useId'], hint: 'hook para generar IDs únicos' },
              { id: 'b2', expected: ['htmlFor'], hint: 'atributo del label que apunta a un input' },
              { id: 'b3', expected: ['id'], hint: 'atributo del input que el label referencia' },
            ],
            explanation:
              'useId() genera un ID único. El label usa htmlFor (versión React de for) para referenciar el id del input. Esto crea una conexión accesible: hacer clic en el label enfoca el input.',
          },
        },
        {
          id: 'c2',
          title: 'useSyncExternalStore',
          explanation:
            'useSyncExternalStore está diseñado para suscribirse a fuentes de datos externas (stores de Redux, APIs del navegador, bibliotecas de estado de terceros) de una manera segura para el renderizado concurrente. Antes de este hook, los stores externos podían causar "tearing" donde diferentes partes de la UI mostraban diferentes valores del mismo store durante un renderizado concurrente.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: patrón de suscripción manual
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

// Problema con renderizado concurrente:
// Entre el momento en que React lee el valor del store
// y termina de renderizar, el valor podría cambiar.
// ¡Diferentes componentes podrían ver diferentes valores!`,
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
  return 1024; // valor por defecto para SSR
}

function WindowWidth() {
  const width = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot // opcional, para SSR
  );

  return <p>Width: {width}px</p>;
}
// Consistencia garantizada durante renderizados concurrentes`,
            },
            caption:
              'useSyncExternalStore previene tearing sincronizando las lecturas de stores externos con el renderizado de React',
          },
          callout: {
            type: 'info',
            text: 'La mayoría de desarrolladores no usarán useSyncExternalStore directamente. Es principalmente para autores de bibliotecas (Redux, Zustand, etc.). Si usas una biblioteca de gestión de estado, probablemente usa este hook internamente.',
          },
        },
        {
          id: 'c3',
          title: 'Hook use()',
          explanation:
            'El hook use() es una API especial de React que puede leer el valor de una promesa o contexto. A diferencia de otros hooks, use() puede llamarse dentro de condicionales y bucles. Cuando se usa con una promesa, se integra con Suspense: el componente suspende hasta que la promesa se resuelve. Cuando se usa con contexto, reemplaza useContext pero con la flexibilidad de llamarse condicionalmente.',
          codeExample: {
            left: {
              label: 'Before React 18',
              language: 'jsx',
              code: `// React 17: useContext + useEffect para datos
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './theme';

function UserProfile({ userId, isAdmin }) {
  // useContext no puede ser condicional
  const theme = useContext(ThemeContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  if (!user) return <Spinner />;

  // No se puede leer contexto condicionalmente
  // const adminCtx = isAdmin
  //   ? useContext(AdminContext)  // ¡VIOLACIÓN DE REGLA!
  //   : null;

  return <div style={{ color: theme.text }}>
    {user.name}
  </div>;
}`,
            },
            right: {
              label: 'React 18+',
              language: 'jsx',
              code: `// React 18+: use() para promesas y contexto
import { use } from 'react';
import { ThemeContext } from './theme';

function UserProfile({ userId, isAdmin }) {
  // use() con contexto (como useContext)
  const theme = use(ThemeContext);

  // use() con una promesa — suspende hasta resolverse
  const user = use(fetchUser(userId));

  // ¡use() PUEDE llamarse condicionalmente!
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
// Debe estar envuelto en <Suspense> para la promesa`,
            },
            caption:
              'use() lee promesas (con Suspense) y contexto, y de forma única puede llamarse condicionalmente',
          },
          callout: {
            type: 'gotcha',
            text: 'Cuando use() lee una promesa, el componente DEBE estar envuelto en un Suspense boundary. La promesa también debe crearse fuera del componente (o memoizarse), de lo contrario cada renderizado crea una nueva promesa y el componente suspende para siempre.',
          },
          challenge: {
            id: 'ch-r5-5-2',
            type: 'fill-blank',
            prompt:
              'Usa el hook use() para leer una promesa y contexto:',
            code: `import { ___BLANK_1___ } from 'react';

function Comments({ commentsPromise }) {
  const comments = ___BLANK_2___(commentsPromise);
  const theme = ___BLANK_3___(ThemeContext);

  return comments.map(c =>
    <p style={{ color: theme.text }}>{c.body}</p>
  );
}`,
            blanks: [
              { id: 'b1', expected: ['use'], hint: 'nueva API de React para leer promesas y contexto' },
              { id: 'b2', expected: ['use'], hint: 'lee la promesa y suspende hasta resolverse' },
              { id: 'b3', expected: ['use'], hint: 'lee contexto (también puede usar useContext)' },
            ],
            explanation:
              'use() se importa de react y puede leer tanto promesas como contexto. Al leer una promesa, suspende el componente (requiere un Suspense boundary arriba). Al leer contexto, funciona como useContext pero con el bonus de poder llamarse dentro de condicionales.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'Estás construyendo un componente de formulario que se renderiza tanto en el servidor como en el cliente. Cada input necesita un ID único para su label. ¿Cómo aseguras que los IDs coincidan entre el HTML renderizado en servidor y la hidratación del cliente?',
          hint: 'Piensa en qué hook produce IDs determinísticos entre servidor y cliente',
          answer:
            'Usa useId() para generar los IDs. Produce el mismo ID determinístico tanto en servidor como en cliente, previniendo errores de hidratación. Puedes derivar múltiples IDs de uno agregando sufijos: const id = useId(); luego usa `${id}-email` y `${id}-password` para diferentes campos.',
        },
        {
          id: 'e2',
          prompt:
            '¿Qué tiene de único use() comparado con todos los demás hooks de React?',
          hint: 'Piensa en las reglas de los hooks y dónde pueden llamarse',
          answer:
            'use() es el único hook de React que puede llamarse dentro de condicionales, bucles y después de retornos tempranos. Todos los demás hooks (useState, useEffect, useContext, etc.) deben seguir las Reglas de los Hooks: deben llamarse en el nivel superior del componente, incondicionalmente, en el mismo orden cada renderizado. use() está exento de esta regla.',
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
// ¿Cómo se ven los dos IDs impresos?`,
          language: 'jsx',
          expectedOutput: ':r1: y :r2: (dos IDs únicos diferentes)',
          explanation:
            'Cada llamada a useId() en una instancia de componente separada produce un ID único diferente. El formato es específico de la implementación (React usa :r0:, :r1:, etc. internamente), pero la propiedad clave es que cada Field obtiene su propio ID estable y único. Los mismos IDs se generan tanto en servidor como en cliente.',
          hint: 'Cada instancia de componente que llama a useId() obtiene un ID distinto.',
        },
      ],
    },
  ],
};

export default reactM5;
