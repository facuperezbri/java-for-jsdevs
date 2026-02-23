import type { Module } from '../../../../types';

const reactModule4: Module = {
  id: 'react-m4',
  order: 4,
  title: 'Patrones avanzados',
  subtitle: 'Context, refs, error boundaries, HOCs y rendimiento',
  icon: '\uD83E\uDDE9',
  accentColor: 'green',
  quizId: 'react-quiz-4',
  lessons: [
    // ─── Lección 1: API de Context ──────────────────────────────────────────────
    {
      id: 'lesson-r4-1',
      moduleId: 'react-m4',
      title: 'API de Context',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Crear y proveer Context',
          explanation:
            'La API de Context te permite pasar datos a través del árbol de componentes sin prop drilling. Tanto en el enfoque de clases como en hooks, creas un contexto con React.createContext y envuelves un subárbol con un Provider. La diferencia está solo en cómo los componentes consumen el valor del contexto.',
          analogy:
            'Piensa en el contexto como una transmisión de radio: el Provider es la estación de radio, y los consumidores son radios sintonizados en esa frecuencia. Cualquier componente en el subárbol puede "sintonizar" sin que la señal sea retransmitida a través de cada componente intermedio.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `// Crear contexto (igual en ambos patrones)
const ThemeContext = React.createContext('light');

// Componente Provider (igual en ambos)
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

// Consumir con contextType (un solo contexto)
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
              code: `// Crear contexto (igual en ambos patrones)
const ThemeContext = React.createContext('light');

// Componente Provider (igual en ambos)
function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// Consumir con useContext
function ThemedButton() {
  const theme = useContext(ThemeContext);

  return <button className={theme}>Click</button>;
}`,
            },
            caption:
              'useContext reemplaza tanto static contextType como el patrón Consumer con render-prop',
          },
          challenge: {
            id: 'ch4-1-1',
            type: 'fill-blank',
            prompt: 'Completa el consumo de contexto basado en hooks:',
            code: `const UserContext = React.createContext(null);

function UserGreeting() {
  const user = ___BLANK_1___(___BLANK_2___);

  return <h1>Hello, {user.name}!</h1>;
}`,
            blanks: [
              { id: 'b1', expected: ['useContext'], hint: 'hook que lee contexto' },
              { id: 'b2', expected: ['UserContext'], hint: 'el objeto de contexto' },
            ],
            explanation:
              'useContext(UserContext) lee el valor actual del UserContext.Provider más cercano arriba en el árbol. Reemplaza el patrón static contextType de clases.',
          },
        },
        {
          id: 'c2',
          title: 'Consumer render prop vs useContext',
          explanation:
            'Antes de los hooks, consumir múltiples contextos en un componente de clase requería anidar componentes Consumer con render props. Esto llevaba a un anidamiento profundo tipo "callback hell". useContext elimina este anidamiento por completo, permitiéndote leer cualquier cantidad de contextos como simples asignaciones de variables.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `// Consumer render prop (soporta múltiples contextos)
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
              code: `// useContext — plano y legible
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
              'Múltiples contextos en clases requieren render props de Consumer anidados; los hooks lo aplanan completamente',
          },
          callout: {
            type: 'tip',
            text: 'Un patrón común es crear un hook personalizado como useTheme() que envuelve useContext(ThemeContext) y agrega una verificación de error si falta el provider. Esto centraliza la importación del contexto y da mejores mensajes de error.',
          },
        },
        {
          id: 'c3',
          title: 'Context con actualizaciones de estado',
          explanation:
            'Para que los consumidores actualicen el contexto, pasa una función setter junto con el valor. En clases, típicamente pasas un método; con hooks, pasas el setter de useState (o un dispatch de useReducer para estado complejo).',
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
              'La versión con hooks usa useMemo para estabilizar el objeto de valor del contexto y evitar re-renderizados innecesarios de los consumidores',
          },
          challenge: {
            id: 'ch4-1-2',
            type: 'fill-blank',
            prompt: 'Completa el consumidor de contexto que alterna el tema:',
            code: `function ThemeToggle() {
  const { theme, ___BLANK_1___ } = useContext(___BLANK_2___);

  return (
    <button onClick={___BLANK_3___}>
      Current: {theme}
    </button>
  );
}`,
            blanks: [
              { id: 'b1', expected: ['toggleTheme'], hint: 'la función que cambia los temas' },
              { id: 'b2', expected: ['ThemeContext'], hint: 'el objeto de contexto' },
              { id: 'b3', expected: ['toggleTheme'], hint: 'llama al alternador al hacer clic' },
            ],
            explanation:
              'Desestructura tanto el estado como el actualizador del contexto. La función toggleTheme fue provista por el provider, así que los consumidores pueden llamarla directamente.',
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
            'useContext(ThemeContext) reemplaza static contextType + this.context. El valor retornado se asigna a una variable local en lugar de accederse mediante this.context.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            '¿Por qué es importante memoizar el objeto de valor pasado a un Context Provider? ¿Qué pasa si creas un nuevo objeto en cada renderizado?',
          hint: 'Piensa en cómo React determina si los consumidores necesitan re-renderizarse.',
          answer:
            'Si el Provider crea un nuevo objeto de valor en cada renderizado (ej. value={{ theme, toggle }}), React ve una referencia diferente cada vez y re-renderiza TODOS los consumidores, incluso si los datos reales no han cambiado. Envolver el valor en useMemo asegura una referencia estable, así que los consumidores solo se re-renderizan cuando los datos realmente cambian.',
        },
        {
          id: 'e2',
          prompt:
            '¿Qué ventaja tiene useContext sobre el patrón Consumer con render-prop cuando un componente necesita leer tres contextos diferentes?',
          hint: 'Piensa en la profundidad de anidamiento y la legibilidad.',
          answer:
            'Con el patrón Consumer debes anidar tres callbacks de render-prop, creando una forma de pirámide difícil de leer. Con useContext, lo llamas tres veces al inicio de tu función — tres líneas planas en lugar de tres niveles de indentación. La lógica y el JSX permanecen al mismo nivel de indentación.',
        },
      ],
    },

    // ─── Lección 2: Refs ────────────────────────────────────────────────────────
    {
      id: 'lesson-r4-2',
      moduleId: 'react-m4',
      title: 'Refs',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'Crear Refs',
          explanation:
            'Las refs proporcionan una forma de acceder a nodos del DOM o almacenar valores mutables que persisten entre renderizados sin activar un re-renderizado. En componentes de clase usas React.createRef() (o callback refs); con hooks usas useRef(). Ambos producen un objeto con una propiedad .current.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `class TextInput extends React.Component {
  constructor(props) {
    super(props);
    // Crear una ref en el constructor
    this.inputRef = React.createRef();
  }

  focusInput = () => {
    // Acceder al nodo DOM via .current
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
  // Crear una ref con useRef
  const inputRef = useRef(null);

  const focusInput = () => {
    // Acceder al nodo DOM via .current
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
              'React.createRef() se llama en el constructor; useRef() se llama al inicio del componente funcional',
          },
          challenge: {
            id: 'ch4-2-1',
            type: 'fill-blank',
            prompt: 'Completa la ref basada en hooks para enfocar un input al montar:',
            code: `function AutoFocus() {
  const inputRef = ___BLANK_1___(null);

  useEffect(() => {
    inputRef.___BLANK_2___.focus();
  }, []);

  return <input ref={___BLANK_3___} />;
}`,
            blanks: [
              { id: 'b1', expected: ['useRef'], hint: 'hook que crea una ref' },
              { id: 'b2', expected: ['current'], hint: 'propiedad que contiene el nodo DOM' },
              { id: 'b3', expected: ['inputRef'], hint: 'conectar la ref al elemento' },
            ],
            explanation:
              'useRef(null) crea la ref, .current contiene el nodo DOM real después del montaje, y pasar ref={inputRef} al elemento JSX los conecta.',
          },
        },
        {
          id: 'c2',
          title: 'Refs como variables de instancia',
          explanation:
            'Más allá del acceso al DOM, las refs pueden contener cualquier valor mutable que deba persistir entre renderizados sin causar re-renderizados. En clases usarías propiedades de instancia regulares (this.timer). Con hooks, useRef sirve el mismo propósito — es el equivalente de una variable de instancia.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `class Timer extends React.Component {
  // Variable de instancia — persiste, sin re-renderizado
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
  // useRef como variable de instancia
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
              'useRef es el equivalente en hooks de las variables de instancia — mutable, persistente, y no activa re-renderizados',
          },
          callout: {
            type: 'warning',
            text: 'Nunca uses una variable let regular dentro de un componente funcional para valores que deben persistir entre renderizados. Un nuevo let se crea en cada renderizado. Usa useRef en su lugar.',
          },
        },
        {
          id: 'c3',
          title: 'forwardRef — Pasar refs a componentes hijos',
          explanation:
            'Por defecto, no puedes pasar una ref a un componente funcional — ref no es un prop regular. React.forwardRef permite que un componente hijo reciba una ref de su padre y la conecte a un elemento DOM interno. Esto es esencial para bibliotecas de componentes reutilizables.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `// Los componentes de clase pueden recibir refs directamente
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

// El padre obtiene ref a la instancia de clase
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
              code: `// forwardRef pasa la ref a un nodo DOM
const FancyInput = React.forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// El padre pasa la ref directamente al input DOM
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
              'forwardRef permite que los componentes funcionales expongan una ref a su elemento DOM interno',
          },
          callout: {
            type: 'tip',
            text: 'Combina forwardRef con useImperativeHandle para personalizar lo que el padre ve a través de la ref — por ejemplo, exponer solo un método .focus() en lugar del nodo DOM completo.',
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
// El usuario hace clic en el botón dos veces.
// ¿Qué se imprime en el tercer renderizado?`,
          language: 'jsx',
          expectedOutput: 'Renders: 3',
          explanation:
            'El componente se renderiza una vez inicialmente (renderCount se convierte en 1), luego se re-renderiza en cada clic (2, luego 3). En el tercer renderizado, renderCount.current es 3. Como useRef no activa re-renderizados, la mutación es silenciosa — pero el valor persiste entre renderizados.',
          hint: 'Los valores de useRef persisten entre renderizados. Cuenta el renderizado inicial más dos renderizados activados por clics.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            '¿Cuál es la diferencia clave entre almacenar un valor en useState vs useRef? ¿Cuándo elegirías uno sobre el otro?',
          hint: 'Piensa en qué activa un re-renderizado.',
          answer:
            'useState activa un re-renderizado cuando se actualiza; useRef no. Usa useState para valores de los que depende la UI (datos mostrados). Usa useRef para valores que necesitas persistir pero que no deberían causar re-renderizados (IDs de temporizadores, valores previos, nodos DOM, contadores de renderizados).',
        },
        {
          id: 'e2',
          prompt:
            '¿Por qué no puedes simplemente pasar un prop ref a un componente funcional regular? ¿Qué resuelve forwardRef?',
          hint: 'Piensa en cómo React trata el prop "ref" de forma especial.',
          answer:
            'React elimina el prop ref antes de pasar los props a los componentes funcionales — es un prop reservado como "key". forwardRef crea un componente que recibe ref como segundo argumento (separado de props), permitiendo que el hijo lo conecte a un elemento DOM interno o lo exponga vía useImperativeHandle.',
        },
      ],
    },

    // ─── Lección 3: Error Boundaries ────────────────────────────────────────────
    {
      id: 'lesson-r4-3',
      moduleId: 'react-m4',
      title: 'Error Boundaries',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'getDerivedStateFromError y componentDidCatch',
          explanation:
            'Los error boundaries son componentes de React que capturan errores de JavaScript en su árbol de componentes hijos, registran esos errores y muestran una UI de respaldo. Se implementan usando dos métodos de ciclo de vida de clase: static getDerivedStateFromError (para actualizar el estado y renderizar el respaldo) y componentDidCatch (para registrar información del error). No hay equivalente en hooks — los error boundaries deben ser componentes de clase.',
          analogy:
            'Un error boundary es como un interruptor diferencial en un panel eléctrico. Cuando ocurre una falla en un circuito (subárbol de componentes), el interruptor se dispara (muestra UI de respaldo) y evita que toda la casa (app) pierda energía (se caiga).',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  // Se llama durante la fase de renderizado — actualizar estado
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Se llama durante la fase de commit — efectos secundarios
  componentDidCatch(error, errorInfo) {
    console.error('Caught by boundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
    // Registrar en un servicio de reporte de errores
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
              code: `// Los error boundaries DEBEN ser componentes de clase.
// Patrón común: envolver en un componente reutilizable
// y usarlo desde componentes funcionales.

// 1. Mantener el error boundary de clase (ver izquierda)
// 2. Crear un hook wrapper conveniente:

function useErrorBoundary() {
  const [error, setError] = useState(null);

  // Para capturar errores en manejadores de eventos
  // (que los error boundaries NO capturan)
  const handleError = useCallback((error) => {
    setError(error);
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  if (error) throw error; // dejar que el boundary lo capture

  return { handleError, resetError };
}

// Uso en un componente funcional:
function DataLoader() {
  const { handleError } = useErrorBoundary();

  const fetchData = async () => {
    try {
      await api.getData();
    } catch (err) {
      handleError(err); // re-lanza para el boundary
    }
  };

  return <button onClick={fetchData}>Load</button>;
}`,
            },
            caption:
              'Los error boundaries siguen siendo solo de clase; el patrón con hooks los envuelve para uso ergonómico desde componentes funcionales',
          },
          callout: {
            type: 'warning',
            text: 'Los error boundaries NO capturan errores en manejadores de eventos, código asíncrono, renderizado del lado del servidor, ni errores lanzados en el propio boundary. Usa try/catch en manejadores de eventos y funciones asíncronas.',
          },
          challenge: {
            id: 'ch4-3-1',
            type: 'fill-blank',
            prompt: 'Completa la clase de error boundary:',
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
              { id: 'b1', expected: ['getDerivedStateFromError'], hint: 'método estático que retorna nuevo estado' },
              { id: 'b2', expected: ['componentDidCatch'], hint: 'método de ciclo de vida para logging' },
              { id: 'b3', expected: ['hasError'], hint: 'la bandera de estado que establecemos a true' },
            ],
            explanation:
              'getDerivedStateFromError es el método estático que actualiza el estado para activar el renderizado de respaldo. componentDidCatch es el método de instancia para efectos secundarios como el registro de errores. Juntos forman un error boundary completo.',
          },
        },
        {
          id: 'c2',
          title: 'Usar Error Boundaries en tu app',
          explanation:
            'Puedes colocar error boundaries a diferentes niveles de granularidad: alrededor de toda la app (catch-all), alrededor de secciones principales (sidebar, contenido principal), o alrededor de widgets individuales. Boundaries más granulares proporcionan una mejor experiencia de usuario porque solo la sección rota muestra un respaldo.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `// Error boundaries granulares
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

// Si Sidebar falla, Header y MainContent
// siguen funcionando normalmente.`,
            },
            right: {
              label: 'Hooks Pattern',
              language: 'jsx',
              code: `// Mismo uso de boundaries desde componentes funcionales
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

// El componente ErrorBoundary en sí sigue siendo
// una clase, pero el código que lo consume puede ser funcional.`,
            },
            caption:
              'Coloca error boundaries estratégicamente — mayor granularidad significa que menos UI se rompe cuando ocurren errores',
          },
        },
        {
          id: 'c3',
          title: 'Error Boundary con reinicio',
          explanation:
            'Un error boundary listo para producción debería ofrecer una forma de recuperación — típicamente un botón "Intentar de nuevo" que reinicia el estado de error. También puedes reiniciar en cambios de navegación usando un prop key que cambia cuando la ruta cambia.',
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

// Reiniciar en cambio de ruta usando key:
// <ErrorBoundary key={location.pathname}>`,
            },
            right: {
              label: 'Hooks Pattern',
              language: 'jsx',
              code: `// Bibliotecas como react-error-boundary proporcionan
// una API amigable con hooks sobre el patrón de clase:

// Usando la biblioteca react-error-boundary:
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
        // Reiniciar estado de la app aquí
      }}
      resetKeys={[location.pathname]}
    >
      <MainContent />
    </ErrorBoundary>
  );
}`,
            },
            caption:
              'La biblioteca react-error-boundary envuelve el patrón de clase en una API amigable con hooks con soporte de reinicio integrado',
          },
          callout: {
            type: 'tip',
            text: 'La biblioteca react-error-boundary (recomendada por el equipo de React) te da useErrorBoundary, componente ErrorBoundary con props FallbackComponent, onReset y resetKeys — todo respaldado por el mismo mecanismo basado en clases internamente.',
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

// Renderizado como:
// <Boundary><BuggyButton /></Boundary>
// El usuario hace clic en el botón. ¿Qué se muestra?`,
          language: 'jsx',
          expectedOutput: 'El botón permanece — el error NO es capturado por el boundary.',
          explanation:
            'Los error boundaries solo capturan errores durante el renderizado, métodos de ciclo de vida y constructores. Los errores lanzados dentro de manejadores de eventos NO son capturados por error boundaries. El error del manejador de clic se propagará como una excepción no manejada. Usa try/catch dentro de manejadores de eventos para esos casos.',
          hint: 'Piensa en cuándo los error boundaries capturan errores y cuándo no.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            '¿Por qué los error boundaries no pueden escribirse como componentes funcionales con hooks? ¿Qué se necesitaría en React para soportar esto?',
          hint: 'Piensa en qué métodos de ciclo de vida dependen los error boundaries.',
          answer:
            'Los error boundaries dependen de getDerivedStateFromError y componentDidCatch — dos métodos de ciclo de vida de clase sin equivalente en hooks. React necesitaría introducir hooks como useCatch o useErrorBoundary a nivel del framework. El equipo de React ha discutido esto pero no lo ha lanzado aún, así que los error boundaries siguen siendo solo de clase.',
        },
      ],
    },

    // ─── Lección 4: HOCs vs Custom Hooks ────────────────────────────────────────
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
            'Un Higher-Order Component es una función que toma un componente y retorna un nuevo componente mejorado. Es un patrón derivado de las funciones de orden superior. Los HOCs eran la forma principal de compartir lógica transversal (autenticación, obtención de datos, tematización) en React basado en clases. Funcionan envolviendo un componente e inyectando props.',
          analogy:
            'Un HOC es como un servicio de envoltorio de regalos: le das una caja simple (componente), y la envuelve en papel decorativo (comportamiento/props extras) y te devuelve un paquete más elegante. El regalo adentro no cambia.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `// HOC que agrega datos del usuario actual
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

// Uso — envolver el componente
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
              code: `// Hook personalizado que provee datos de usuario
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

// Uso — llamar al hook directamente
function Profile() {
  const { user, loading } = useUser();

  if (loading) return <Spinner />;
  return <h1>{user.name}</h1>;
}

// ¡Sin envoltorios, sin capas de componentes extra!`,
            },
            caption:
              'Los hooks personalizados reemplazan a los HOCs extrayendo lógica compartida en una función que llamas, no un wrapper que aplicas',
          },
          challenge: {
            id: 'ch4-4-1',
            type: 'fill-blank',
            prompt: 'Convierte este uso de HOC a un patrón de hook personalizado:',
            code: `// Hook personalizado
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
              { id: 'b1', expected: ['useState'], hint: 'hook para almacenar el ancho' },
              { id: 'b2', expected: ['useEffect'], hint: 'hook para efectos secundarios (event listener)' },
              { id: 'b3', expected: ['width'], hint: '¿qué valor retorna el hook?' },
            ],
            explanation:
              'El hook personalizado usa useState para rastrear el valor, useEffect para configurar y limpiar el event listener, y retorna solo el valor de width. Cualquier componente puede llamar useWindowWidth() sin ser envuelto.',
          },
        },
        {
          id: 'c2',
          title: 'Problemas con HOCs',
          explanation:
            'Los HOCs tienen varios problemas bien conocidos: "wrapper hell" (wrappers profundamente anidados en DevTools), colisión de props (dos HOCs inyectando la misma prop), indirección (difícil rastrear de dónde viene una prop), y composición estática (los HOCs se aplican al momento de definición, no dinámicamente). Los hooks personalizados resuelven todos estos problemas.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `// Wrapper hell — apilando múltiples HOCs
const EnhancedComponent = withRouter(
  withTheme(
    withAuth(
      withAnalytics(
        MyComponent
      )
    )
  )
);

// DevTools muestra:
// <withRouter(withTheme(withAuth(withAnalytics(MyComponent))))>
//   <withTheme(withAuth(withAnalytics(MyComponent)))>
//     <withAuth(withAnalytics(MyComponent))>
//       <withAnalytics(MyComponent)>
//         <MyComponent />

// Riesgo de colisión de props:
// Tanto withTheme como withAuth podrían inyectar
// una prop "loading" — la última gana silenciosamente.`,
            },
            right: {
              label: 'Hooks Pattern',
              language: 'jsx',
              code: `// Plano, explícito, componible
function MyComponent() {
  const { location } = useRouter();
  const theme = useTheme();
  const { user, isAuthed } = useAuth();
  const { track } = useAnalytics();

  // Sin componentes wrapper en DevTools
  // Sin colisiones de props — tú nombras las variables
  // Claro de dónde viene cada valor
  // Puede ser condicional:
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
              'Los hooks eliminan wrapper hell, colisiones de props y problemas de indirección que plagan a los HOCs',
          },
          callout: {
            type: 'gotcha',
            text: 'La llamada condicional de hook mostrada arriba (isAuthed ? useUserData() : null) en realidad viola las Reglas de los Hooks. Los hooks deben llamarse incondicionalmente. En su lugar, llama al hook siempre y maneja la condición dentro de él o después de que retorne.',
          },
        },
        {
          id: 'c3',
          title: 'Composición de hooks personalizados',
          explanation:
            'Una de las características más poderosas de los hooks personalizados es que pueden llamar a otros hooks. Esto te permite construir comportamientos complejos componiendo hooks más simples — algo que era incómodo con HOCs porque cada HOC era una capa de wrapper separada.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `// Componer HOCs es engorroso
function withUserAndPosts(WrappedComponent) {
  // Composición de HOCs anidada
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
              code: `// Componer hooks es natural
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
  // Hooks componiendo otros hooks
  const { user } = useUser();
  const posts = usePosts(user?.id);

  return { user, posts };
}

// Uso
function Dashboard() {
  const { user, posts } = useUserAndPosts();
  return <PostList user={user} posts={posts} />;
}`,
            },
            caption:
              'Los hooks personalizados se componen simplemente llamándose entre sí — sin anidamiento de wrappers necesario',
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
            'El patrón HOC se convierte en un hook personalizado: el estado de clase se convierte en useState, componentDidMount/WillUnmount se convierte en useEffect con un return de limpieza, y el componente envuelto se reemplaza por cualquier componente que llame a useMousePosition().',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'Tienes un HOC withAuth que verifica si el usuario está logueado y redirige a /login si no lo está. ¿Cómo lo reescribirías como hook personalizado?',
          hint: 'El hook debería retornar estado de autenticación, y el componente puede decidir qué hacer con él.',
          answer:
            'Crea un hook useAuth() que retorne { user, isAuthenticated, isLoading }. El componente llama al hook y maneja la redirección él mismo: if (!isAuthenticated && !isLoading) navigate("/login"). Esto es más flexible — el componente decide el destino y momento de la redirección en lugar de que el HOC tome esa decisión.',
        },
        {
          id: 'e2',
          prompt:
            '¿Puedes seguir usando HOCs con componentes funcionales? ¿Hay alguna razón para preferir un HOC sobre un hook personalizado?',
          hint: 'Piensa en la integración con bibliotecas de terceros y las preocupaciones a nivel de componente.',
          answer:
            'Sí, los HOCs funcionan con componentes funcionales también (envuelven cualquier componente). Un HOC podría preferirse cuando necesitas envolver un componente para un framework (ej. React.memo es técnicamente un HOC), cuando quieres interceptar/modificar props antes de que lleguen a un componente, o al integrarte con bibliotecas basadas en clases. Sin embargo, para lógica con estado compartida, los hooks personalizados son casi siempre la mejor opción.',
        },
      ],
    },

    // ─── Lección 5: Rendimiento ─────────────────────────────────────────────────
    {
      id: 'lesson-r4-5',
      moduleId: 'react-m4',
      title: 'Rendimiento',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Prevenir re-renderizados innecesarios',
          explanation:
            'Por defecto, cuando un padre se re-renderiza, todos los hijos también se re-renderizan — incluso si sus props no han cambiado. En componentes de clase, shouldComponentUpdate o extender PureComponent previene esto. Con hooks, React.memo envuelve un componente funcional para lograr la misma comparación superficial de props.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `// Opción 1: shouldComponentUpdate manual
class ExpensiveList extends React.Component {
  shouldComponentUpdate(nextProps) {
    // Solo re-renderizar si items realmente cambiaron
    return nextProps.items !== this.props.items;
  }

  render() {
    return this.props.items.map(item =>
      <li key={item.id}>{item.name}</li>
    );
  }
}

// Opción 2: PureComponent (comparación superficial)
class ExpensiveList extends React.PureComponent {
  // Implementa automáticamente shouldComponentUpdate
  // con comparación superficial de props + estado
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
              code: `// React.memo — PureComponent para funciones
const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  return items.map(item =>
    <li key={item.id}>{item.name}</li>
  );
});

// Con comparación personalizada (como shouldComponentUpdate):
const ExpensiveList = React.memo(
  function ExpensiveList({ items }) {
    return items.map(item =>
      <li key={item.id}>{item.name}</li>
    );
  },
  (prevProps, nextProps) => {
    // Retorna true para OMITIR re-renderizado (¡opuesto a sCU!)
    return prevProps.items === nextProps.items;
  }
);`,
            },
            caption:
              'React.memo = PureComponent para componentes funcionales. Nota: el comparador personalizado retorna true para omitir (opuesto a shouldComponentUpdate)',
          },
          callout: {
            type: 'gotcha',
            text: 'El comparador personalizado de React.memo retorna true para OMITIR el re-renderizado, pero shouldComponentUpdate retorna true para PERMITIR el re-renderizado. ¡Tienen semántica opuesta! Esta es una fuente común de confusión.',
          },
          challenge: {
            id: 'ch4-5-1',
            type: 'fill-blank',
            prompt: 'Envuelve este componente con React.memo para prevenir re-renderizados innecesarios:',
            code: `const UserCard = ___BLANK_1___(function UserCard({ name, avatar }) {
  console.log('UserCard rendered');
  return (
    <div>
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
    </div>
  );
});

// Esto solo se re-renderiza cuando ___BLANK_2___ o ___BLANK_3___ cambia.`,
            blanks: [
              { id: 'b1', expected: ['React.memo'], hint: 'el wrapper de memoización' },
              { id: 'b2', expected: ['name'], hint: 'primera prop' },
              { id: 'b3', expected: ['avatar'], hint: 'segunda prop' },
            ],
            explanation:
              'React.memo realiza una comparación superficial de props. Como UserCard recibe name y avatar, solo se re-renderiza cuando alguno de esos valores cambia por referencia.',
          },
        },
        {
          id: 'c2',
          title: 'useMemo — Memoizar cálculos costosos',
          explanation:
            'useMemo almacena en caché el resultado de un cálculo costoso y solo recalcula cuando sus dependencias cambian. En componentes de clase, calcularías en shouldComponentUpdate, usarías una biblioteca de memoización, o almacenarías datos derivados en el estado. useMemo hace esto declarativo.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `class FilteredList extends React.Component {
  // Memoización manual via caché de instancia
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
  // useMemo almacena el resultado en caché
  const filtered = useMemo(() => {
    // Cálculo costoso
    return items.filter(item =>
      item.name.includes(filter)
    );
  }, [items, filter]);
  // Solo recalcula cuando items o filter cambia

  return filtered.map(i =>
    <div key={i.id}>{i.name}</div>
  );
}`,
            },
            caption:
              'useMemo reemplaza la memoización manual con caché en una sola llamada declarativa',
          },
          callout: {
            type: 'tip',
            text: 'No abuses de useMemo. Tiene su propio costo (almacenar el resultado anterior y comparar dependencias). Solo úsalo para cálculos genuinamente costosos o cuando la igualdad referencial importa para componentes React.memo descendientes.',
          },
        },
        {
          id: 'c3',
          title: 'useCallback — Memoizar funciones',
          explanation:
            'Cada vez que un componente funcional se renderiza, cualquier función inline se recrea como una nueva referencia. Si esa función se pasa como prop a un hijo con React.memo, el hijo se re-renderiza de todas formas porque la prop cambió. useCallback memoiza la referencia de la función para que solo cambie cuando sus dependencias cambian.',
          codeExample: {
            left: {
              label: 'Class Pattern',
              language: 'jsx',
              code: `class TodoApp extends React.Component {
  state = { todos: [] };

  // Método de clase — referencia estable automáticamente
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

// this.handleDelete es siempre la misma referencia
// así que los hijos PureComponent no se re-renderizarán
// innecesariamente.`,
            },
            right: {
              label: 'Hooks Pattern',
              language: 'jsx',
              code: `function TodoApp() {
  const [todos, setTodos] = useState([]);

  // Sin useCallback: ¡nueva función cada renderizado!
  // const handleDelete = (id) => { ... };

  // Con useCallback: referencia estable
  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []); // sin deps porque usamos actualización funcional

  return (
    <TodoList
      todos={todos}
      onDelete={handleDelete}
    />
  );
}

// Ahora handleDelete mantiene la misma referencia
// para que React.memo(TodoList) pueda omitir re-renderizados.`,
            },
            caption:
              'useCallback estabiliza las referencias de funciones — crítico al pasar callbacks a hijos memoizados',
          },
          challenge: {
            id: 'ch4-5-2',
            type: 'fill-blank',
            prompt: 'Estabiliza este callback para que el hijo memoizado no se re-renderice:',
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
              { id: 'b1', expected: ['useCallback'], hint: 'hook que memoiza funciones' },
              { id: 'b2', expected: ['query'], hint: 'el valor usado dentro del callback' },
            ],
            explanation:
              'useCallback memoiza handleSearch para que MemoizedResults solo vea una nueva referencia cuando query cambia. Sin useCallback, se crea una nueva función en cada pulsación de tecla, anulando React.memo del componente de resultados.',
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
            'PureComponent se convierte en React.memo (para comparación superficial de props). El cálculo de ordenamiento se envuelve en useMemo con [users] como dependencia, así que solo recalcula cuando la referencia del array users cambia.',
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
// Montaje inicial, luego el usuario hace clic una vez. ¿Qué se imprime?`,
          language: 'jsx',
          expectedOutput: 'Parent rendered\nChild rendered\nParent rendered\nChild rendered',
          explanation:
            'Al montar, tanto Parent como Child se renderizan. Cuando el usuario hace clic, Parent se re-renderiza (count cambia), y aunque Child está envuelto en React.memo, handleClick es una nueva referencia de función en cada renderizado (sin useCallback). React.memo ve un prop onClick diferente y re-renderiza Child. Para arreglar esto, envuelve handleClick en useCallback.',
          hint: 'Piensa en si handleClick tiene la misma referencia entre renderizados.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'Tienes un padre que se re-renderiza frecuentemente y pasa un handler onClick a un hijo con React.memo. El hijo aún se re-renderiza cada vez. ¿Por qué, y cómo lo arreglas?',
          hint: 'Piensa en qué compara React.memo y qué pasa con las funciones inline en cada renderizado.',
          answer:
            'Las funciones inline se recrean en cada renderizado como nuevas referencias. React.memo hace una comparación superficial y ve un onClick "diferente" cada vez. Solución: envuelve el handler en useCallback con las dependencias apropiadas. Esto mantiene la referencia estable, para que React.memo correctamente omita el re-renderizado del hijo.',
        },
        {
          id: 'e2',
          prompt:
            '¿Cuál es la diferencia entre useMemo y useCallback? ¿Podrías implementar uno en términos del otro?',
          hint: 'Uno memoiza un valor, el otro memoiza una función. Piensa en qué es una función.',
          answer:
            'useMemo(() => fn, deps) retorna el resultado memoizado de llamar a fn. useCallback(fn, deps) retorna la fn memoizada en sí. useCallback(fn, deps) es equivalente a useMemo(() => fn, deps). Solo difieren en qué memorizan: un valor calculado vs una referencia de función.',
        },
      ],
    },
  ],
};

export default reactModule4;
