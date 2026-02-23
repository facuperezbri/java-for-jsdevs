import type { Module } from '../../../../types';

const reactModule3: Module = {
  id: 'react-m3',
  order: 3,
  title: 'Estado y ciclo de vida',
  subtitle: 'Gestión de estado y efectos secundarios en componentes de clase y funcionales',
  icon: '\uD83D\uDD04',
  accentColor: 'purple',
  quizId: 'react-quiz-3',
  lessons: [
    // ─── Lección 1: Fundamentos de estado ───────────────────────────────────────
    {
      id: 'lesson-r3-1',
      moduleId: 'react-m3',
      title: 'Fundamentos de estado',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Declarar estado: this.state vs useState',
          explanation:
            'En componentes de clase, el estado es un objeto almacenado en this.state e inicializado en el constructor. En componentes funcionales, el hook useState te permite declarar piezas individuales de estado como variables independientes. Cada llamada a useState devuelve un par: el valor actual y una función setter.',
          analogy:
            'Piensa en el estado de clase como un archivador con cajones etiquetados — todo vive en un gran objeto. useState es como tener notas adhesivas individuales, cada una con un dato que puedes actualizar de forma independiente.',
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
              'Los componentes de clase mantienen todo el estado en un objeto; los hooks dividen el estado en variables independientes',
          },
          challenge: {
            id: 'ch3-1-1',
            type: 'fill-blank',
            prompt:
              'Completa la versión con hook de un componente que rastrea un nombre de usuario:',
            code: `function Profile() {
  const [username, ___BLANK_1___] = ___BLANK_2___(___BLANK_3___);

  return <p>Hello, {username}</p>;
}`,
            blanks: [
              { id: 'b1', expected: ['setUsername'], hint: 'función setter' },
              { id: 'b2', expected: ['useState'], hint: 'hook de estado' },
              {
                id: 'b3',
                expected: ["'Guest'", '"Guest"'],
                hint: 'valor inicial',
              },
            ],
            explanation:
              'useState devuelve un par [valor, setter]. La convención es [cosa, setCosa]. El argumento de useState es el valor inicial.',
          },
        },
        {
          id: 'c2',
          title: 'Actualizar estado: setState vs funciones setter',
          explanation:
            'En componentes de clase, llamas a this.setState() con un objeto que se fusiona superficialmente con el estado actual. Con hooks, cada función setter reemplaza el valor completo de esa pieza de estado. Ambos programan un re-renderizado.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class Counter extends React.Component {
  state = { count: 0 };

  increment = () => {
    // Fusiona { count: 1 } en el estado
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
    // Reemplaza el valor de count completamente
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
              'this.setState hace fusión superficial; los setters de hooks reemplazan el valor',
          },
          callout: {
            type: 'gotcha',
            text: 'Las actualizaciones de estado son asíncronas tanto en componentes de clase como funcionales. React agrupa múltiples llamadas a setState/setter para mejorar el rendimiento. Nunca confíes en leer el estado inmediatamente después de establecerlo.',
          },
        },
        {
          id: 'c3',
          title: 'Inmutabilidad — Nunca mutes el estado directamente',
          explanation:
            'Tanto en componentes de clase como funcionales, debes tratar el estado como inmutable. Nunca modifiques objetos o arrays del estado directamente — siempre crea nuevas referencias. Mutar el estado directamente no activará un re-renderizado porque React usa igualdad de referencia para detectar cambios.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class TodoList extends React.Component {
  state = { items: ['Buy milk'] };

  addItem = (item) => {
    // MAL: mutando el estado directamente
    // this.state.items.push(item);

    // CORRECTO: crear un nuevo array
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
    // MAL: mutando el estado directamente
    // items.push(item);

    // CORRECTO: crear un nuevo array
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
              'Siempre usa spread o copia el estado — las mutaciones evitan la detección de cambios de React',
          },
          callout: {
            type: 'warning',
            text: 'Error común de principiantes: usar .push(), .splice() o asignación directa de propiedades en el estado. Estos mutan en el lugar y React NO hará re-renderizado. Siempre crea nuevos arrays/objetos.',
          },
          challenge: {
            id: 'ch3-1-2',
            type: 'fix-bug',
            prompt:
              'Este código tiene un bug — la UI no se actualiza al eliminar un elemento. Corrígelo:',
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
                hint: 'Usa filter para crear un nuevo array sin el elemento en ese índice',
              },
            ],
            explanation:
              'Usa filter() para crear un nuevo array que excluya el elemento en el índice dado. Esto crea una nueva referencia, que React puede detectar. Usar splice() mutaría el array original.',
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
            'useState(false) inicializa el estado. El setter setIsOn reemplaza el valor. Pasamos !isOn (la negación del valor actual) para alternar entre true y false.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            '¿Qué pasa si llamas setCount(count + 1) tres veces seguidas dentro del mismo manejador de eventos? ¿Cuál será el valor final de count si empieza en 0?',
          hint: 'Piensa en el batching y cuándo React lee el valor de count.',
          answer:
            'El valor final de count será 1, no 3. Las tres llamadas leen count como 0 (su valor durante este renderizado) y lo establecen en 0 + 1. Debido a que React agrupa las actualizaciones, solo programa un re-renderizado con count = 1. Para incrementar tres veces, usa el actualizador funcional: setCount(prev => prev + 1).',
        },
        {
          id: 'e2',
          prompt:
            'En un componente de clase, si tu estado tiene { name: "Alice", age: 25 } y llamas this.setState({ age: 26 }), ¿qué pasa con el campo name?',
          hint: 'Piensa en cómo this.setState fusiona el estado.',
          answer:
            'El campo name se preserva. this.setState realiza una fusión superficial, así que solo el campo age se actualiza. El estado resultante es { name: "Alice", age: 26 }. Esto difiere de los setters de hooks, que reemplazan el valor completo — así que con useState para objetos, debes hacer spread del estado anterior manualmente.',
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
// El usuario hace clic en el botón una vez. ¿Qué se imprime en consola?`,
          language: 'jsx',
          expectedOutput: '0',
          explanation:
            'Las actualizaciones de estado son asíncronas. El console.log se ejecuta síncronamente y lee el count del renderizado actual, que sigue siendo 0. Las tres llamadas a setCount también leen count como 0, así que todas lo establecen en 1. Después del re-renderizado, count se convierte en 1 (no 3).',
          hint: 'El estado no se actualiza inmediatamente después de llamar al setter.',
        },
      ],
    },

    // ─── Lección 2: Ciclo de vida vs useEffect ─────────────────────────────────
    {
      id: 'lesson-r3-2',
      moduleId: 'react-m3',
      title: 'Ciclo de vida vs useEffect',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'componentDidMount vs useEffect(fn, [])',
          explanation:
            'En componentes de clase, componentDidMount se ejecuta una vez después del primer renderizado — ideal para obtener datos, configurar suscripciones o interactuar con el DOM. El equivalente en hooks es useEffect con un array de dependencias vacío, que ejecuta el efecto exactamente una vez después del renderizado inicial.',
          analogy:
            'componentDidMount es como un callback de "gran inauguración" — se dispara una vez cuando la tienda abre. useEffect(fn, []) es la misma fiesta, solo escrita de forma diferente.',
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
  }, []); // array vacío = ejecutar una vez al montar

  if (loading) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}`,
            },
            caption:
              'Array de dependencias vacío [] = componentDidMount (se ejecuta una vez después del primer renderizado)',
          },
          challenge: {
            id: 'ch3-2-1',
            type: 'fill-blank',
            prompt:
              'Completa este useEffect que obtiene datos una vez al montar:',
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
              { id: 'b1', expected: ['useEffect'], hint: 'hook de efectos' },
              { id: 'b2', expected: ['[]'], hint: 'ejecutar solo al montar' },
            ],
            explanation:
              'useEffect con un array de dependencias vacío [] se ejecuta solo una vez después del renderizado inicial, igual que componentDidMount. La función del efecto contiene la lógica del fetch.',
          },
        },
        {
          id: 'c2',
          title: 'componentDidUpdate vs useEffect con dependencias',
          explanation:
            'componentDidUpdate se ejecuta después de cada re-renderizado (excluyendo el primero). Típicamente agregas una verificación if para comparar props/estado previo vs actual. Con useEffect, listas los valores a los que quieres reaccionar en el array de dependencias — React los compara automáticamente y solo re-ejecuta el efecto cuando cambian.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class SearchResults extends React.Component {
  state = { results: [] };

  componentDidUpdate(prevProps) {
    // Debe comparar manualmente para evitar bucle infinito
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
    // Se ejecuta cuando query cambia
    fetch(\`/api/search?q=\${query}\`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, [query]); // React rastrea esta dependencia

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
              'El array de dependencias [query] reemplaza la comparación manual de prevProps',
          },
          callout: {
            type: 'tip',
            text: 'El array de dependencias no es una guía opcional — es un contrato. Si tu efecto lee un valor, inclúyelo en el array de deps. La regla "exhaustive-deps" de eslint-plugin-react-hooks lo hace obligatorio.',
          },
        },
        {
          id: 'c3',
          title: 'componentWillUnmount vs función de limpieza',
          explanation:
            'En componentes de clase, componentWillUnmount se ejecuta justo antes de que el componente sea eliminado del DOM — se usa para cancelar temporizadores, desuscribirse de eventos, etc. En hooks, retornas una función de limpieza desde useEffect. Esta limpieza se ejecuta antes de que el componente se desmonte y también antes de que el efecto se re-ejecute.',
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

    // Limpieza: se ejecuta al desmontar
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <p>Elapsed: {seconds}s</p>;
}`,
            },
            caption:
              'La función de limpieza retornada desde useEffect reemplaza componentWillUnmount',
          },
          callout: {
            type: 'warning',
            text: 'Olvidar la limpieza es una fuente común de fugas de memoria. Si tu efecto crea una suscripción, temporizador o event listener, siempre retorna una función de limpieza para desmontarlo.',
          },
          challenge: {
            id: 'ch3-2-2',
            type: 'fill-blank',
            prompt:
              'Completa la limpieza en este useEffect que configura un listener de redimensionamiento de ventana:',
            code: `useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);

  ___BLANK_1___ () => {
    window.___BLANK_2___('resize', handleResize);
  };
}, []);`,
            blanks: [
              { id: 'b1', expected: ['return'], hint: 'cómo retornar la limpieza' },
              {
                id: 'b2',
                expected: ['removeEventListener'],
                hint: 'opuesto de addEventListener',
              },
            ],
            explanation:
              'Retorna una función de limpieza desde useEffect que llama a removeEventListener. Esto se ejecuta cuando el componente se desmonta, previniendo fugas de memoria por event listeners huérfanos.',
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
            'useState reemplaza this.state. useEffect con [] reemplaza componentDidMount. La función de limpieza retornada reemplaza componentWillUnmount. setInterval y clearInterval siguen iguales.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            '¿Cuál es la diferencia entre useEffect(fn) sin array de dependencias y useEffect(fn, []) con un array vacío?',
          hint: 'Piensa en cuántas veces se ejecuta cada versión.',
          answer:
            'useEffect(fn) sin array de dependencias se ejecuta después de cada renderizado (montaje + cada actualización). useEffect(fn, []) se ejecuta solo una vez después del montaje inicial. Omitir el array es como componentDidMount + componentDidUpdate combinados, mientras que [] es solo componentDidMount.',
        },
        {
          id: 'e2',
          prompt:
            'En un componente de clase, ¿cómo evitas que componentDidUpdate se ejecute en cada renderizado? ¿Cómo resuelve esto useEffect?',
          hint: 'Piensa en la comparación manual en componentDidUpdate.',
          answer:
            'En clases, comparas manualmente prevProps/prevState: if (prevProps.id !== this.props.id) { ... }. useEffect resuelve esto con el array de dependencias: useEffect(() => { ... }, [id]). React compara automáticamente las deps y solo re-ejecuta el efecto cuando cambian — menos código repetitivo, menos bugs.',
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
// value cambia: "A" -> "B"
// ¿Qué se imprime en la actualización?`,
          language: 'jsx',
          expectedOutput: 'Cleanup: A\nEffect: B',
          explanation:
            'Cuando value cambia de "A" a "B", React primero ejecuta la limpieza del efecto anterior (imprimiendo "Cleanup: A"), luego ejecuta el nuevo efecto (imprimiendo "Effect: B"). La limpieza siempre se ejecuta con los valores del renderizado que la creó.',
          hint: 'La limpieza se ejecuta antes del siguiente efecto, usando los valores del renderizado anterior.',
        },
      ],
    },

    // ─── Lección 3: Estado complejo ─────────────────────────────────────────────
    {
      id: 'lesson-r3-3',
      moduleId: 'react-m3',
      title: 'Estado complejo',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Fusión de setState vs spread de objetos',
          explanation:
            'El setState de componentes de clase realiza una fusión superficial — solo pasas los campos que quieres actualizar. Con hooks, el setter reemplaza el valor completo, así que cuando el estado es un objeto, debes hacer spread del estado previo tú mismo para preservar los otros campos.',
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
    // Fusión superficial: solo se actualiza name,
    // email y age se preservan automáticamente
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
    // ¡Debes hacer spread para mantener los otros campos!
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
              'El setState de clase fusiona automáticamente; los setters de hooks requieren spread manual para estado tipo objeto',
          },
          callout: {
            type: 'tip',
            text: 'Una alternativa con hooks: usa llamadas separadas de useState para cada campo. Esto evita el spread por completo y suele ser más simple: const [name, setName] = useState(""); const [email, setEmail] = useState("");',
          },
          challenge: {
            id: 'ch3-3-1',
            type: 'fix-bug',
            prompt:
              'Esta actualización de hook pierde el campo email. Corrige el setter:',
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
                hint: 'Haz spread del estado existente y sobreescribe un campo',
              },
            ],
            explanation:
              'Hacer spread del estado actual del formulario con { ...form, name } preserva el campo email mientras actualiza name. Sin el spread, email se perdería.',
          },
        },
        {
          id: 'c2',
          title: 'Actualizaciones funcionales con prevState',
          explanation:
            'Cuando el siguiente estado depende del estado anterior, tanto los componentes de clase como los funcionales soportan una forma de callback. En clases, pasas una función a setState que recibe el estado anterior. En hooks, pasas una función al setter. Esto evita problemas de closures obsoletos y es esencial al agrupar múltiples actualizaciones.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class Counter extends React.Component {
  state = { count: 0 };

  incrementThrice = () => {
    // Usando callback de prevState — ¡las tres funcionan!
    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
    // count será 3 después del re-renderizado
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
    // Usando actualizador funcional — ¡las tres funcionan!
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    // count será 3 después del re-renderizado
  };

  return (
    <button onClick={incrementThrice}>
      Count: {count}
    </button>
  );
}`,
            },
            caption:
              'Pasa una función a setState/setter cuando el siguiente estado depende del estado anterior',
          },
          callout: {
            type: 'gotcha',
            text: 'Sin el actualizador funcional, setCount(count + 1) llamado tres veces solo incrementa una vez porque count es un closure obsoleto — siempre lee el mismo valor del renderizado actual.',
          },
        },
        {
          id: 'c3',
          title: 'useReducer — Lógica de estado complejo',
          explanation:
            'Cuando la lógica de estado involucra múltiples sub-valores o el siguiente estado depende de condiciones complejas, useReducer proporciona una alternativa estructurada a useState. Sigue el mismo patrón que Redux: despachas una acción, y una función reducer calcula el siguiente estado. En clases, típicamente manejarías esto con múltiples llamadas a setState o una función actualizadora compleja.',
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
              'useReducer centraliza las transiciones de estado en una función pura — más fácil de probar y razonar',
          },
          challenge: {
            id: 'ch3-3-2',
            type: 'fill-blank',
            prompt:
              'Completa la configuración de useReducer para un contador con acciones de incrementar y reiniciar:',
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
              { id: 'b1', expected: ['dispatch'], hint: 'función para enviar acciones' },
              { id: 'b2', expected: ['useReducer'], hint: 'hook de reducer' },
              {
                id: 'b3',
                expected: ['{ count: 0 }'],
                hint: 'estado inicial',
              },
            ],
            explanation:
              'useReducer retorna [state, dispatch]. Pasas la función reducer y el estado inicial. dispatch envía objetos de acción al reducer, que retorna el siguiente estado.',
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
            'useReducer toma la función reducer y el estado inicial. Cada método de clase se convierte en una llamada a dispatch con una cadena de tipo de acción. El reducer centraliza toda la lógica de transición de estado.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            '¿Cuándo elegirías useReducer en lugar de useState?',
          hint: 'Piensa en la complejidad del estado y la cantidad de transiciones de estado relacionadas.',
          answer:
            'Usa useReducer cuando: (1) el estado tiene múltiples sub-valores que cambian juntos, (2) el siguiente estado depende del anterior de maneras complejas, (3) tienes muchas acciones relacionadas (agregar, eliminar, alternar, ordenar), o (4) quieres extraer la lógica de estado en una función pura testeable. Para valores simples e independientes, useState es más limpio.',
        },
        {
          id: 'e2',
          prompt:
            '¿Por qué el actualizador funcional (prev => prev + 1) es más seguro que usar directamente la variable de estado (count + 1) en manejadores de eventos?',
          hint: 'Piensa en closures y batching.',
          answer:
            'Las variables de estado en componentes funcionales son capturadas por closure — reflejan el valor al momento del renderizado, no el valor más reciente. Si llamas setCount(count + 1) múltiples veces, cada una lee el mismo count obsoleto. El actualizador funcional setCount(prev => prev + 1) siempre recibe el estado más reciente, haciéndolo seguro para actualizaciones agrupadas y secuenciales.',
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
  // Después del clic, ¿cuál es state.name?
}`,
          language: 'jsx',
          expectedOutput: 'undefined',
          explanation:
            'A diferencia de this.setState de componentes de clase, el setter de hooks reemplaza el objeto de estado completo. Después de setState({ age: 26 }), el estado se convierte en { age: 26 } y name se pierde. Necesitas setState({ ...state, age: 26 }) o setState(prev => ({ ...prev, age: 26 })) para preservar name.',
          hint: 'Los setters de hooks reemplazan; el setState de clase fusiona.',
        },
      ],
    },

    // ─── Lección 4: Elevar el estado ────────────────────────────────────────────
    {
      id: 'lesson-r3-4',
      moduleId: 'react-m3',
      title: 'Elevar el estado',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'Estado compartido en un ancestro común',
          explanation:
            'Cuando dos componentes hermanos necesitan compartir estado, mueve el estado hacia arriba a su padre común más cercano. El padre es dueño del estado y lo pasa hacia abajo mediante props. Este es el mismo patrón en componentes de clase y funcionales — la única diferencia es cómo declaras el estado.',
          analogy:
            'Si dos habitaciones necesitan la misma lectura de termostato, pon el termostato en el pasillo (el padre) y pasa cables (props) a cada habitación. No pongas un termostato separado en cada habitación e intentes mantenerlos sincronizados.',
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
              'El estado vive en el padre; los hijos reciben valores y callbacks a través de props',
          },
        },
        {
          id: 'c2',
          title: 'Callback props — Comunicación de hijo a padre',
          explanation:
            'Los hijos se comunican hacia arriba llamando funciones callback pasadas como props. El padre define el manejador, lo pasa al hijo, y el hijo lo invoca con datos. Este es el flujo de datos unidireccional fundamental de React.',
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
              'Los datos fluyen hacia abajo como props; los eventos fluyen hacia arriba como invocaciones de callbacks',
          },
          challenge: {
            id: 'ch3-4-1',
            type: 'fill-blank',
            prompt:
              'Completa el componente hijo para que notifique al padre cuando se selecciona un color:',
            code: `function ColorPicker({ ___BLANK_1___ }) {
  return (
    <div>
      <button onClick={() => ___BLANK_2___('red')}>Red</button>
      <button onClick={() => ___BLANK_2___('blue')}>Blue</button>
    </div>
  );
}

// Uso en el padre:
// <ColorPicker onSelect={___BLANK_3___} />`,
            blanks: [
              { id: 'b1', expected: ['onSelect'], hint: 'prop callback desestructurada' },
              { id: 'b2', expected: ['onSelect'], hint: 'llama al callback con el color' },
              {
                id: 'b3',
                expected: ['handleColorSelect', 'setColor', '(color) => setColor(color)'],
                hint: 'función manejadora del padre',
              },
            ],
            explanation:
              'El hijo recibe onSelect como prop y lo llama con el color seleccionado. El padre pasa su función manejadora como la prop onSelect. Este es el patrón estándar para la comunicación de hijo a padre en React.',
          },
        },
        {
          id: 'c3',
          title: 'Fuente única de verdad',
          explanation:
            'Cada pieza de estado debería tener exactamente un propietario. Duplicar estado entre componentes lleva a bugs cuando se desincronizan. En su lugar, deriva valores de la fuente única de verdad, y usa valores calculados cuando sea posible.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `// MAL: estado duplicado
class App extends React.Component {
  state = { items: ['a', 'b', 'c'] };
  // ¡No almacenes count en el estado también!
  // state = { items: [...], count: 3 };

  render() {
    // BIEN: derivar count de items
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
              code: `// MAL: estado duplicado
function App() {
  const [items, setItems] = useState(['a', 'b', 'c']);
  // No hagas esto:
  // const [count, setCount] = useState(3);

  // BIEN: derivar count de items
  const count = items.length;

  // BIEN: derivar lista filtrada
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
              'Deriva valores del estado en lugar de duplicarlos — mantiene los datos consistentes',
          },
          callout: {
            type: 'tip',
            text: 'Una buena regla general: si puedes calcular un valor a partir del estado o props existentes, no lo almacenes en el estado. Los valores calculados (count de la longitud del array, listas filtradas, totales) deben derivarse durante el renderizado.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'Tienes un input de búsqueda en el componente A y una lista de resultados en el componente B (hermanos). ¿Dónde debería vivir el estado de la consulta de búsqueda?',
          hint: 'Piensa en qué componente necesita acceso a la consulta.',
          answer:
            'El estado de la consulta de búsqueda debería vivir en el padre común más cercano de A y B. El padre pasa el valor de la consulta hacia abajo a B (para filtrar) y un callback setQuery a A (para actualizar). Esto es "elevar el estado" — el padre se convierte en la fuente única de verdad.',
        },
        {
          id: 'e2',
          prompt:
            '¿Por qué deberías evitar almacenar items.length en una variable de estado separada junto al array de items?',
          hint: '¿Qué pasa si actualizas items pero olvidas actualizar el count?',
          answer:
            'Almacenar count por separado crea estado duplicado que puede desincronizarse. Si agregas un elemento pero olvidas incrementar count, la UI muestra el número incorrecto. En su lugar, derívalo: const count = items.length. Esto siempre es correcto porque lee de la fuente única de verdad.',
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
// ¿Qué muestra el botón después de hacer clic?`,
          language: 'jsx',
          expectedOutput: 'Bob',
          explanation:
            'Hacer clic en el botón llama a onRename("Bob"), que en realidad es setName("Bob") pasado desde el padre. Esto actualiza el estado del padre, causando un re-renderizado. El nuevo nombre "Bob" fluye como prop al Child, así que el botón muestra "Bob".',
          hint: 'Rastrea el callback: onRename es el setName del padre.',
        },
      ],
    },

    // ─── Lección 5: Efectos secundarios y limpieza ──────────────────────────────
    {
      id: 'lesson-r3-5',
      moduleId: 'react-m3',
      title: 'Efectos secundarios y limpieza',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'Suscripciones y event listeners',
          explanation:
            'Las aplicaciones reales se suscriben a fuentes de datos externas — mensajes de WebSocket, eventos del navegador o bibliotecas de terceros. En componentes de clase, te suscribes en componentDidMount y te desuscribes en componentWillUnmount. Con hooks, el par de suscripción/desuscripción vive junto en un solo useEffect.',
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

    // Limpieza: eliminar el listener
    return () => {
      window.removeEventListener(
        'resize', handleResize
      );
    };
  }, []); // Suscribirse una vez al montar

  return (
    <p>{size.width} x {size.height}</p>
  );
}`,
            },
            caption:
              'Los hooks co-localizan setup y teardown — no más división entre dos métodos de ciclo de vida',
          },
          callout: {
            type: 'info',
            text: 'La belleza de los hooks es la co-localización: el setup y la limpieza de una preocupación viven en el mismo useEffect. En clases, componentDidMount podría configurar cinco cosas diferentes, con sus limpiezas dispersas en componentWillUnmount.',
          },
          challenge: {
            id: 'ch3-5-1',
            type: 'fill-blank',
            prompt:
              'Completa este hook que se suscribe a eventos de online/offline del navegador:',
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
              { id: 'b1', expected: ['setIsOnline'], hint: 'actualizar el estado' },
              {
                id: 'b2',
                expected: ['removeEventListener'],
                hint: 'desuscribirse de eventos',
              },
              { id: 'b3', expected: ['[]'], hint: 'suscribirse una vez al montar' },
            ],
            explanation:
              'setIsOnline actualiza el estado cuando cambia la conectividad. La limpieza elimina ambos listeners. El array de dependencias vacío [] asegura que nos suscribimos una vez al montar y limpiamos al desmontar.',
          },
        },
        {
          id: 'c2',
          title: 'Temporizadores: setTimeout y setInterval',
          explanation:
            'Los temporizadores son una fuente clásica de fugas de memoria. Si un componente se desmonta antes de que un temporizador se dispare (setTimeout) o entre ticks (setInterval), el callback puede intentar actualizar el estado de un componente desmontado. Siempre limpia los temporizadores en la función de limpieza.',
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

// Alternativa: un solo setInterval
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
              'Siempre limpia los temporizadores en la función de limpieza para prevenir actualizaciones en componentes desmontados',
          },
          callout: {
            type: 'gotcha',
            text: 'Un error común: usar setInterval con una dependencia del estado dentro del callback. El closure captura un valor obsoleto. Siempre usa el actualizador funcional (prev => prev - 1) dentro de callbacks de interval, o usa setTimeout encadenado mediante las deps de useEffect.',
          },
        },
        {
          id: 'c3',
          title: 'Fetch con AbortController',
          explanation:
            'Al obtener datos en useEffect, el componente puede desmontarse o las dependencias pueden cambiar antes de que el fetch termine. AbortController te permite cancelar peticiones en curso, previniendo actualizaciones de estado en componentes desmontados y evitando condiciones de carrera.',
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

    // Cancelar fetch en la limpieza
    return () => controller.abort();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}`,
            },
            caption:
              'AbortController cancela el fetch al desmontar o cuando userId cambia — previniendo condiciones de carrera',
          },
          callout: {
            type: 'warning',
            text: 'Sin AbortController, si userId cambia rápidamente (A -> B -> C), las respuestas pueden llegar desordenadas. La respuesta de A podría sobreescribir los datos de B. AbortController asegura que solo se use la respuesta de la última petición.',
          },
          challenge: {
            id: 'ch3-5-2',
            type: 'fill-blank',
            prompt:
              'Completa la limpieza de abort en este efecto de obtención de datos:',
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
              { id: 'b1', expected: ['AbortController'], hint: 'API del navegador para cancelación' },
              { id: 'b2', expected: ['signal'], hint: 'propiedad pasada a las opciones de fetch' },
              { id: 'b3', expected: ['abort'], hint: 'método para cancelar la petición' },
            ],
            explanation:
              'Crea un AbortController, pasa su signal a fetch, y llama abort() en la función de limpieza. Cuando el efecto se re-ejecuta (id cambia) o el componente se desmonta, la petición en curso se cancela.',
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
            'useEffect con [roomId] reemplaza tres métodos de ciclo de vida: componentDidMount (conexión inicial), componentDidUpdate (reconexión cuando roomId cambia), y componentWillUnmount (desconexión). La limpieza se ejecuta antes de cada re-ejecución y al desmontar.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            '¿Por qué la función de limpieza de useEffect se ejecuta antes de que el efecto se re-ejecute al cambiar una dependencia, y no solo al desmontar?',
          hint: 'Piensa en qué pasa cuando una prop cambia y necesitas deshacer la suscripción anterior antes de configurar una nueva.',
          answer:
            'Si el efecto se suscribe a un recurso basado en una prop (ej. roomId), cambiar esa prop significa que la suscripción anterior está obsoleta. React ejecuta la limpieza primero para deshacer la suscripción anterior, luego ejecuta el efecto nuevamente con el nuevo valor. Sin esto, acumularías suscripciones obsoletas. En clases, tenías que manejar esto manualmente en componentDidUpdate.',
        },
        {
          id: 'e2',
          prompt:
            'Un componente obtiene datos de usuario cuando userId cambia, pero a veces la respuesta anterior llega después de la nueva. ¿Cómo soluciona AbortController esta condición de carrera?',
          hint: 'Piensa en qué pasa cuando el efecto se re-ejecuta antes de que el fetch anterior termine.',
          answer:
            'Cuando userId cambia, la limpieza de useEffect llama controller.abort(), que cancela el fetch en curso del userId anterior. El fetch cancelado lanza un AbortError (que ignoramos), así que su handler .then() nunca se ejecuta. El nuevo efecto inicia un fetch fresco para el nuevo userId. Esto garantiza que solo la respuesta de la última petición actualice el estado.',
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
// ¿Qué se imprime cuando se hace clic en el botón Hide?`,
          language: 'jsx',
          expectedOutput: 'unsubscribe',
          explanation:
            'Hacer clic en Hide establece show a false, eliminando <Timer /> del DOM. React desmonta Timer y ejecuta la función de limpieza de useEffect, que imprime "unsubscribe" y limpia el interval. No aparecerán más logs de "tick".',
          hint: 'Piensa en qué pasa con la función de limpieza cuando un componente se desmonta.',
        },
      ],
    },
  ],
};

export default reactModule3;
