import type { Module } from '../../../../types';

const module: Module = {
  id: 'react-m1',
  order: 1,
  title: 'JS Esencial para React',
  subtitle: 'Fundamentos de JavaScript moderno que todo desarrollador React necesita',
  icon: '⚡',
  accentColor: 'cyan',
  quizId: 'react-quiz-1',
  lessons: [
    // ─── Lección 1: El DOM y los Navegadores ──────────────────────────────────
    {
      id: 'lesson-r1-1',
      moduleId: 'react-m1',
      title: 'El DOM y los Navegadores',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: '¿Qué es el DOM?',
          explanation:
            'El DOM (Document Object Model) es la representación en memoria del navegador de tu página HTML como un árbol de objetos. Cada elemento HTML se convierte en un nodo que puedes leer y manipular con JavaScript. React existe precisamente para abstraer esto, pero entender el DOM es esencial para depuración y rendimiento.',
          analogy:
            'Piensa en el DOM como el plano en vivo de un edificio. Puedes recorrer el plano, encontrar cualquier habitación (elemento) y remodelarlo. Vanilla JS te da una caja de herramientas para hacer la remodelación tú mismo; React contrata un contratista (el reconciliador) para hacerlo eficientemente por ti.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// El DOM es un árbol de nodos
// <div id="app">
//   <h1>Hello</h1>
//   <p>World</p>
// </div>

const app = document.getElementById('app');
console.log(app.children.length); // 2
console.log(app.children[0].textContent); // "Hello"

// Recorrer el árbol
const h1 = app.querySelector('h1');
console.log(h1.parentElement.id); // "app"`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// React construye un DOM virtual por ti
// Tú describes QUÉ quieres, no CÓMO encontrarlo

function App() {
  return (
    <div id="app">
      <h1>Hello</h1>
      <p>World</p>
    </div>
  );
}

// ¡No se necesita document.getElementById!
// React maneja el árbol DOM internamente`,
            },
            caption:
              'Vanilla JS requiere que consultes y recorras el árbol DOM manualmente. React te permite declarar tu estructura de UI y gestiona el DOM por ti.',
          },
        },
        {
          id: 'c2',
          title: 'Seleccionar y Modificar Elementos',
          explanation:
            'Vanilla JS proporciona métodos como getElementById, querySelector y querySelectorAll para encontrar elementos en el DOM. Una vez que tienes una referencia, puedes cambiar su contenido, estilos y atributos directamente. React reemplaza todo esto con JSX declarativo -- describes el estado deseado y React determina qué actualizar.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// Seleccionar elementos del DOM
const title = document.querySelector('.title');
const items = document.querySelectorAll('.item');

// Modificar contenido y estilo
title.textContent = 'Updated Title';
title.style.color = 'blue';
title.classList.add('active');

// Modificar atributos
const link = document.querySelector('a');
link.setAttribute('href', 'https://example.com');
link.setAttribute('target', '_blank');`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// React: declarar UI basada en estado
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
              'Vanilla JS muta el DOM imperativamente. React describe declarativamente cómo debería verse el DOM basado en tus datos.',
          },
          callout: {
            type: 'tip',
            text: 'En React, rara vez tocas el DOM directamente. En lugar de querySelector + mutación, usas variables de estado y JSX. Cuando el estado cambia, React actualiza automáticamente solo los nodos del DOM que lo necesitan.',
          },
        },
        {
          id: 'c3',
          title: 'Crear Elementos y Event Listeners',
          explanation:
            'En vanilla JS, crear nuevos elementos requiere múltiples pasos imperativos: createElement, establecer propiedades, luego appendChild. Adjuntar event listeners significa llamar addEventListener en cada elemento. React simplifica ambos al permitirte escribir elementos inline como JSX y adjuntar handlers directamente como props.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// Crear un botón y agregarlo a la página
const button = document.createElement('button');
button.textContent = 'Click me';
button.className = 'btn primary';

button.addEventListener('click', () => {
  alert('Button clicked!');
});

// Hay que insertarlo manualmente en el DOM
const container = document.getElementById('root');
container.appendChild(button);

// Limpieza: remover listener para evitar fugas de memoria
// button.removeEventListener('click', handler);`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// React: declarar elementos y handlers inline
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

// React maneja la creación, inserción y limpieza
// Sin appendChild ni removeEventListener manual`,
            },
            caption:
              'Vanilla JS requiere createElement + appendChild + addEventListener. React te permite escribir todo declarativamente en JSX.',
          },
          challenge: {
            id: 'ch-r1-1-1',
            type: 'fill-blank',
            prompt:
              'Completa el código vanilla JS para crear un párrafo, establecer su texto y agregarlo a la página:',
            code: `const p = document.___BLANK_1___('p');
p.___BLANK_2___ = 'Hello, world!';
document.body.___BLANK_3___(p);`,
            blanks: [
              { id: 'b1', expected: ['createElement'], hint: 'método para crear un nuevo elemento DOM' },
              { id: 'b2', expected: ['textContent'], hint: 'propiedad para establecer el texto dentro de un elemento' },
              { id: 'b3', expected: ['appendChild'], hint: 'método para insertar un elemento hijo' },
            ],
            explanation:
              'document.createElement crea un nuevo nodo DOM, textContent establece su texto, y appendChild lo inserta en el padre. En React, simplemente escribirías <p>Hello, world!</p> en tu JSX.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            '¿Por qué crees que React fue creado para abstraer la manipulación directa del DOM? ¿Qué problemas causa la gestión manual del DOM en aplicaciones grandes?',
          hint: 'Piensa en lo que pasa cuando tienes cientos de elementos que dependen de diferentes datos, y esos datos cambian frecuentemente.',
          answer:
            'La manipulación manual del DOM se vuelve inmanejable en aplicaciones complejas porque debes rastrear qué elementos necesitan actualizarse cuando cambian los datos, sincronizar manualmente el estado con la UI y manejar la limpieza (eliminar listeners, nodos). Los bugs aparecen cuando olvidas actualizar un nodo o eliminar un listener. React resuelve esto con un modelo declarativo: describes la UI deseada para cada estado, y React difiere y parchea eficientemente el DOM real.',
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
            'Después de crear el div y agregarlo al body, getElementById encuentra el mismo nodo que acabamos de crear. found.textContent es "Hello" porque eso es lo que establecimos. found === div es true porque son literalmente el mismo objeto en memoria -- getElementById devuelve una referencia al nodo DOM exacto.',
          hint: 'getElementById devuelve una referencia al nodo DOM, no una copia.',
        },
      ],
    },

    // ─── Lección 2: Sintaxis JS Moderna ────────────────────────────────────────
    {
      id: 'lesson-r1-2',
      moduleId: 'react-m1',
      title: 'Sintaxis JS Moderna',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'let, const y Alcance de Bloque',
          explanation:
            'El código React usa const por defecto y let cuando se necesita reasignación. var esencialmente nunca se usa en React moderno debido a su confuso comportamiento de alcance de función. Entender la diferencia es crítico porque los componentes React dependen de que las clausuras y el alcance de bloque funcionen de forma predecible.',
          analogy:
            'Piensa en var como una etiqueta que flota hasta la habitación más cercana (función). let y const son etiquetas que se quedan en el estante exacto (bloque) donde las colocaste. Los hooks de React dependen de que las variables se queden exactamente donde las declaraste.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// var tiene alcance de función (hoisting)
function example() {
  console.log(x); // undefined (¡hoisting!)
  var x = 10;

  if (true) {
    var y = 20; // ¡se escapa del bloque if!
  }
  console.log(y); // 20 -- var ignora el alcance de bloque
}

// let/const tienen alcance de bloque
function better() {
  // console.log(a); // ¡ReferenceError!
  let a = 10;
  const b = 20;

  if (true) {
    let c = 30;
  }
  // console.log(c); // ¡ReferenceError!
}`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// Los componentes React siempre usan const/let
function UserProfile({ userId }) {
  // const para valores que no se reasignarán
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // const para funciones (también son valores)
  const fetchUser = async () => {
    const response = await fetch(\`/api/users/\${userId}\`);
    const data = await response.json();
    setUser(data);
    setLoading(false);
  };

  // let es raro en React -- mayormente const
  let statusText = 'Active';
  if (user?.suspended) {
    statusText = 'Suspended';
  }

  return <p>{statusText}</p>;
}`,
            },
            caption:
              'El código React moderno es casi completamente const. Usa let solo cuando realmente necesites reasignación.',
          },
          callout: {
            type: 'gotcha',
            text: 'Nunca uses var en código React. Su comportamiento de hoisting y alcance de función lleva a bugs sutiles, especialmente dentro de bucles y event handlers donde las clausuras capturan variables.',
          },
        },
        {
          id: 'c2',
          title: 'Arrow Functions',
          explanation:
            'Las arrow functions son el estándar en React para handlers inline, callbacks y definiciones de componentes. Ofrecen una sintaxis concisa y, crucialmente, no tienen su propio binding de "this" -- heredan "this" del alcance circundante. Esto elimina la clásica confusión de "this" en event handlers.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// Función tradicional
function add(a, b) {
  return a + b;
}

// Equivalentes con arrow function
const add = (a, b) => a + b;

// Un solo parámetro: paréntesis opcionales
const double = n => n * 2;

// Cuerpo multilínea: necesita llaves + return
const greet = (name) => {
  const message = \`Hello, \${name}!\`;
  return message;
};

// Diferencia de comportamiento de "this"
const obj = {
  name: 'Alice',
  // Arrow hereda "this" del alcance externo
  greet: () => console.log(this.name), // ¡undefined!
  // Función regular obtiene su propio "this"
  hello() { console.log(this.name); }  // "Alice"
};`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// Las arrow functions dominan el código React
const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

// Event handlers inline
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

// Callbacks en hooks
useEffect(() => {
  console.log('Component mounted');
  return () => console.log('Cleanup');
}, []);`,
            },
            caption:
              'Las arrow functions están en todas partes en React: definiciones de componentes, event handlers, callbacks de hooks y funciones de actualización de estado.',
          },
        },
        {
          id: 'c3',
          title: 'Template Literals, Destructuring y Optional Chaining',
          explanation:
            'Estas tres características aparecen en casi cada línea de código React. Los template literals construyen strings dinámicos. El destructuring desempaqueta props, estado y respuestas de API. El optional chaining accede de forma segura a datos anidados que podrían ser null o undefined -- esencial al renderizar datos de llamadas API asíncronas.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// Template literals
const greeting = \`Hello, \${user.name}!\`;
const url = \`/api/users/\${id}/posts\`;

// Destructuring de objetos
const { name, age, email } = user;
const { data: users, error } = response;

// Destructuring de arrays
const [first, second, ...rest] = items;

// Optional chaining
const city = user?.address?.city;
const zip = user?.address?.zip ?? 'N/A';

// Combinándolos
const { name = 'Anonymous' } = user ?? {};`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// Los tres son fundamentales para los patrones React

// Destructuring de props directamente en la firma
function UserCard({ name, email, address }) {
  // Optional chaining para datos anidados/nulables
  const city = address?.city ?? 'Unknown';

  // Template literals para contenido dinámico
  const avatarUrl = \`/avatars/\${name.toLowerCase()}.png\`;

  // Destructuring de estado desde hooks
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
              'Destructuring de props, optional chaining para datos de API y template literals para strings dinámicos son el pan de cada día de los componentes React.',
          },
          callout: {
            type: 'tip',
            text: 'El operador ?? (nullish coalescing) solo aplica el respaldo para null/undefined, a diferencia de || que también captura 0, "" y false. En React, prefiere ?? al proporcionar valores por defecto para datos que podrían legítimamente ser 0 o un string vacío.',
          },
          challenge: {
            id: 'ch-r1-2-1',
            type: 'fill-blank',
            prompt:
              'Completa el destructuring y optional chaining en este componente React:',
            code: `function Profile({ ___BLANK_1___, bio, social }) {
  const website = social___BLANK_2___website ?? 'No website';
  const greeting = \`Welcome, ___BLANK_3___!\`;

  return <p>{greeting} - {website}</p>;
}`,
            blanks: [
              { id: 'b1', expected: ['name'], hint: 'prop destructurada para el nombre del usuario' },
              { id: 'b2', expected: ['?.'], hint: 'operador para acceso seguro a propiedades' },
              { id: 'b3', expected: ['${name}'], hint: 'interpolación de template literal' },
            ],
            explanation:
              'Las props se destructuran directamente en la firma de la función. El optional chaining (?.) accede de forma segura a social.website incluso si social es null/undefined. Los template literals usan ${} para incrustar expresiones dentro de strings con backticks.',
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
            'El JS moderno estilo React usa destructuring en la lista de parámetros para desempaquetar el objeto directamente, arrow functions en lugar de la palabra clave function, y template literals con ${} en lugar de concatenación de strings.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            '¿Por qué las arrow functions resuelven el clásico problema de "this" en event handlers, y por qué eso importa menos en React moderno con hooks?',
          hint: 'Piensa en componentes de clase vs componentes funcionales y cómo funciona el binding de "this" en cada uno.',
          answer:
            'En React basado en clases, los event handlers escritos como métodos regulares pierden su binding de "this" cuando se pasan como callbacks. Las arrow functions heredan "this" del alcance circundante, resolviendo el problema. En React moderno con hooks, los componentes son funciones simples -- no hay "this" en absoluto. El estado vive en hooks (useState), no en una instancia de clase, haciendo que el problema de "this" sea irrelevante.',
        },
      ],
    },

    // ─── Lección 3: Arrays y Patrones Funcionales ────────────────────────────
    {
      id: 'lesson-r1-3',
      moduleId: 'react-m1',
      title: 'Arrays y Patrones Funcionales',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'map, filter y reduce',
          explanation:
            'Estos tres métodos de array son los caballos de batalla del renderizado en React. map transforma arrays en listas de elementos JSX. filter elimina items antes de renderizar. reduce agrega datos para resúmenes y valores calculados. Todos devuelven nuevos arrays sin mutar el original -- que es exactamente lo que React necesita.',
          analogy:
            'Piensa en map como una línea de ensamblaje que transforma cada item. filter es un inspector de calidad que elimina items defectuosos. reduce es el contador que suma todo en un solo resumen. Ninguno de ellos cambia el inventario original.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `const users = [
  { name: 'Alice', age: 28, active: true },
  { name: 'Bob', age: 34, active: false },
  { name: 'Carol', age: 22, active: true },
];

// map: transformar cada item
const names = users.map(u => u.name);
// ['Alice', 'Bob', 'Carol']

// filter: mantener items que coincidan
const active = users.filter(u => u.active);
// [objetos Alice, Carol]

// reduce: agregar en un solo valor
const totalAge = users.reduce((sum, u) => sum + u.age, 0);
// 84

// Encadenamiento: filter luego map
const activeNames = users
  .filter(u => u.active)
  .map(u => u.name);
// ['Alice', 'Carol']`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `function UserList({ users }) {
  // filter + map para renderizar solo usuarios activos
  const activeUsers = users
    .filter(u => u.active)
    .map(u => (
      <li key={u.name}>
        {u.name} (age {u.age})
      </li>
    ));

  // reduce para estadísticas de resumen
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

// .map() es cómo React renderiza listas
// ¡Siempre incluye una prop "key" única!`,
            },
            caption:
              'El renderizado en React se construye sobre map/filter/reduce. Cada lista que ves en una app React es un array.map() por debajo.',
          },
          callout: {
            type: 'warning',
            text: 'Al usar .map() para renderizar listas en React, cada elemento DEBE tener una prop "key" única. React usa las keys para rastrear eficientemente qué items cambiaron, se agregaron o se eliminaron.',
          },
        },
        {
          id: 'c2',
          title: 'Operadores Spread y Rest',
          explanation:
            'El operador spread (...) copia arrays y objetos, y el operador rest (...) recolecta items restantes. En React, spread se usa constantemente: clonar estado antes de actualizar, pasar props y fusionar objetos. Estos operadores son esenciales porque React exige actualizaciones inmutables.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// Spread: copiar y extender arrays
const fruits = ['apple', 'banana'];
const moreFruits = [...fruits, 'cherry'];
// ['apple', 'banana', 'cherry']

// Spread: copiar y fusionar objetos
const defaults = { theme: 'light', lang: 'en' };
const prefs = { ...defaults, theme: 'dark' };
// { theme: 'dark', lang: 'en' }

// Rest: recolectar items restantes
const [first, ...others] = [1, 2, 3, 4];
// first = 1, others = [2, 3, 4]

// Rest: recolectar propiedades restantes
const { name, ...rest } = { name: 'Alice', age: 30, role: 'dev' };
// name = 'Alice', rest = { age: 30, role: 'dev' }`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `function TodoApp() {
  const [todos, setTodos] = useState([]);

  // Spread: agregar item sin mutar
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  };

  // Spread: actualizar un item de forma inmutable
  const toggleTodo = (id) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  // Rest: reenviar props restantes
  const Button = ({ children, ...rest }) => (
    <button className="btn" {...rest}>
      {children}
    </button>
  );

  return <Button onClick={() => addTodo('New')}>Add</Button>;
}`,
            },
            caption:
              'Spread es la clave para actualizaciones de estado inmutables en React. Nunca mutes el estado directamente -- siempre haz spread en un nuevo objeto o array.',
          },
          challenge: {
            id: 'ch-r1-3-1',
            type: 'fill-blank',
            prompt:
              'Completa la actualización de estado inmutable para agregar un nuevo item al array:',
            code: `const [items, setItems] = useState(['apple', 'banana']);

const addItem = (newItem) => {
  setItems([___BLANK_1___items, ___BLANK_2___]);
};

addItem('cherry');
// items ahora es ['apple', 'banana', 'cherry']`,
            blanks: [
              { id: 'b1', expected: ['...'], hint: 'operador para esparcir items existentes' },
              { id: 'b2', expected: ['newItem'], hint: 'el nuevo item a agregar al final' },
            ],
            explanation:
              'El operador spread (...items) copia todos los items existentes en un nuevo array, y newItem se agrega al final. Esto crea una referencia a un array completamente nuevo, que es lo que React necesita para detectar el cambio y re-renderizar.',
          },
        },
        {
          id: 'c3',
          title: 'Patrones de Actualización Inmutable',
          explanation:
            'El estado de React debe tratarse como inmutable. Nunca hagas push a un array, elimines una propiedad, o reasignes un campo anidado directamente. En su lugar, creas nuevas copias con los cambios deseados. Así es como React sabe que algo cambió y necesita re-renderizar. Dominar estos patrones es innegociable para el desarrollo con React.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// Enfoque MUTABLE (imperativo)
const users = [{ name: 'Alice', score: 10 }];

// Agregar item -- muta en el lugar
users.push({ name: 'Bob', score: 20 });

// Eliminar item -- muta en el lugar
users.splice(0, 1);

// Actualizar propiedad anidada -- muta
users[0].score = 25;

// Mutación de objeto
const config = { theme: 'light' };
config.theme = 'dark'; // mutación directa
delete config.oldProp;  // eliminación directa`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// Enfoque INMUTABLE (React)
const [users, setUsers] = useState([
  { name: 'Alice', score: 10 },
]);

// Agregar: spread en nuevo array
setUsers([...users, { name: 'Bob', score: 20 }]);

// Eliminar: filter crea un nuevo array
setUsers(users.filter(u => u.name !== 'Alice'));

// Actualizar anidado: map + spread
setUsers(users.map(u =>
  u.name === 'Bob' ? { ...u, score: 25 } : u
));

// Actualización de objeto: spread + sobreescritura
setConfig({ ...config, theme: 'dark' });

// Eliminar una key: destructuring + rest
const { oldProp, ...rest } = config;
setConfig(rest);`,
            },
            caption:
              'Cada patrón de mutación tiene un equivalente inmutable. push -> spread, splice -> filter, asignación directa -> map+spread.',
          },
          callout: {
            type: 'gotcha',
            text: 'Si mutas el estado directamente (ej. state.push()), React NO re-renderizará porque la referencia del array no cambió. Siempre debes crear un nuevo array u objeto para que React detecte la actualización.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'Tienes un array de productos y necesitas mostrar solo los items con precio mayor a $20, ordenados por precio ascendente, mostrando solo el nombre y precio. ¿Cómo encadenarías métodos de array para hacer esto?',
          hint: 'Piensa en qué métodos filtran, ordenan y transforman -- y el orden en que los encadenarías.',
          answer:
            'products.filter(p => p.price > 20).sort((a, b) => a.price - b.price).map(p => ({ name: p.name, price: p.price })). En React, encadenarías de la misma forma y envolverías el resultado en JSX: .map(p => <li key={p.name}>{p.name}: ${p.price}</li>). Nota: .sort() muta el array original, así que en React deberías hacer spread primero: [...products].sort(...).',
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
            'map duplica cada elemento en un nuevo array. filter mantiene solo los números pares (2 y 4). reduce suma todos los valores (1+2+3+4+5 = 15). Crucialmente, el array original no cambia -- los tres métodos devuelven nuevos arrays sin mutar la fuente. Este comportamiento sin mutación es por lo que React depende de ellos.',
          hint: 'Recuerda que map, filter y reduce todos devuelven nuevos valores. Nunca cambian el array original.',
        },
      ],
    },

    // ─── Lección 4: JavaScript Asíncrono ────────────────────────────────────────
    {
      id: 'lesson-r1-4',
      moduleId: 'react-m1',
      title: 'JavaScript Asíncrono',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'Promises',
          explanation:
            'Una Promise representa un valor que estará disponible en el futuro -- como una respuesta de API. Las Promises tienen tres estados: pending, fulfilled o rejected. En React, usas Promises cada vez que obtienes datos, y entenderlas es esencial para manejar estados de carga y errores en tus componentes.',
          analogy:
            'Una Promise es como un recibo de pedido en un restaurante. Recibes el recibo inmediatamente (pending), luego más tarde recibes tu comida (fulfilled) o te dicen que la cocina no tiene ese plato (rejected). Puedes planificar qué hacer en cada caso usando .then() y .catch().',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// Crear una Promise
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

// Consumir con .then()/.catch()
fetchData()
  .then(data => console.log(data.name))
  .catch(err => console.error(err.message))
  .finally(() => console.log('Done'));`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// React: Las Promises controlan estados de carga/error
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
              'Las Promises son la base de la obtención de datos asíncronos en React. Cada llamada a API devuelve una Promise que se resuelve con datos o se rechaza con un error.',
          },
        },
        {
          id: 'c2',
          title: 'async/await',
          explanation:
            'async/await es azúcar sintáctico sobre Promises que hace que el código asíncrono se vea síncrono. Marcas una función como async, luego usas await para pausar hasta que una Promise se resuelva. Este es el estilo preferido en React moderno porque es mucho más fácil de leer que cadenas de .then(), especialmente cuando múltiples operaciones asíncronas dependen unas de otras.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// async/await -- más limpio que cadenas .then()
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

// Secuencial vs paralelo
async function loadDashboard() {
  // Secuencial: uno después de otro
  const user = await fetchUser();
  const posts = await fetchPosts(user.id);

  // Paralelo: ambos a la vez (¡más rápido!)
  const [user2, notifications] = await Promise.all([
    fetchUser(),
    fetchNotifications(),
  ]);
}`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// React: async/await dentro de useEffect
function Dashboard({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // No se puede hacer async el callback de useEffect directamente
    // Así que definimos una función async adentro
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
              'async/await hace legible el código asíncrono. En React, define una función async dentro de useEffect -- nunca hagas el callback de useEffect async.',
          },
          callout: {
            type: 'warning',
            text: 'Nunca escribas useEffect(async () => { ... }). El callback de useEffect debe devolver nada o una función de limpieza, no una Promise. Siempre define la función async adentro y llámala inmediatamente.',
          },
        },
        {
          id: 'c3',
          title: 'fetch y Manejo de Errores',
          explanation:
            'La API fetch es la forma estándar de hacer peticiones HTTP en el navegador. Un detalle crítico: fetch NO rechaza en errores HTTP (404, 500) -- solo rechaza en fallos de red. Debes verificar response.ok manualmente. En React, el manejo adecuado de errores significa capturar tanto errores de red como errores HTTP y reflejarlos en el estado de tu componente.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// fetch con manejo de errores apropiado
async function fetchJSON(url) {
  const response = await fetch(url);

  // ¡fetch NO lanza en 404/500!
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
  }

  return response.json();
}

// Petición POST
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
              code: `// React: fetch reutilizable con manejo completo de errores
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
    return () => controller.abort(); // ¡limpieza!
  }, [url]);

  return state;
}`,
            },
            caption:
              'Siempre verifica response.ok con fetch. En React, usa AbortController para cancelar peticiones en vuelo cuando el componente se desmonta o las dependencias cambian.',
          },
          callout: {
            type: 'gotcha',
            text: 'fetch("https://bad-url.com/404") se resuelve exitosamente -- la Promise se cumple con un objeto Response que tiene ok: false. DEBES verificar response.ok o response.status para detectar errores HTTP.',
          },
          challenge: {
            id: 'ch-r1-4-1',
            type: 'fill-blank',
            prompt:
              'Completa la llamada fetch con manejo de errores apropiado:',
            code: `async function getUser(id) {
  const response = ___BLANK_1___ fetch(\`/api/users/\${id}\`);
  if (!response.___BLANK_2___) {
    throw new Error('Request failed');
  }
  return response.___BLANK_3___();
}`,
            blanks: [
              { id: 'b1', expected: ['await'], hint: 'palabra clave para esperar a que la Promise se resuelva' },
              { id: 'b2', expected: ['ok'], hint: 'propiedad booleana que indica éxito HTTP (200-299)' },
              { id: 'b3', expected: ['json'], hint: 'método para parsear el cuerpo de la respuesta como JSON' },
            ],
            explanation:
              'await pausa la ejecución hasta que la Promise de fetch se resuelve. response.ok es true para códigos de estado HTTP 200-299. response.json() parsea el cuerpo como JSON y devuelve otra Promise (que await también maneja).',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'Necesitas obtener un usuario y luego sus publicaciones (lo cual requiere el ID del usuario). ¿Deberías usar llamadas await secuenciales o Promise.all? ¿Qué pasa si también necesitas notificaciones que no dependen del usuario?',
          hint: 'Piensa en las dependencias de datos -- ¿qué peticiones dependen de los resultados de otras peticiones?',
          answer:
            'El usuario debe obtenerse primero ya que las publicaciones necesitan el ID del usuario -- esto es secuencial: const user = await fetchUser(); const posts = await fetchPosts(user.id). Sin embargo, las notificaciones son independientes del usuario, así que puedes ejecutar la secuencia usuario+publicaciones en paralelo con las notificaciones usando Promise.all: const [posts, notifications] = await Promise.all([fetchPostsForUser(), fetchNotifications()]). Siempre paraleliza peticiones independientes para reducir el tiempo total de carga.',
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
            'run() registra "start" síncronamente. El primer await suspende la función y devuelve el control al llamador, así que "after run" se registra después. Después de 100ms, la función se reanuda y registra "middle". Después de otros 100ms, registra "end". La idea clave: await pausa solo la función async, no el programa completo. El código después de la llamada a run() continúa inmediatamente.',
          hint: 'Una función async devuelve el control al llamador en el primer await. ¿Qué se ejecuta después en el hilo principal?',
        },
      ],
    },

    // ─── Lección 5: Módulos ES y Herramientas ────────────────────────────────
    {
      id: 'lesson-r1-5',
      moduleId: 'react-m1',
      title: 'Módulos ES y Herramientas',
      estimatedMinutes: 8,
      concepts: [
        {
          id: 'c1',
          title: 'import/export (Named vs Default)',
          explanation:
            'Los Módulos ES son la forma estándar de organizar código JavaScript en archivos separados. Las exportaciones con nombre (named exports) te permiten exportar múltiples cosas de un archivo e importarlas por nombre exacto. Las exportaciones por defecto (default exports) proporcionan una única exportación "principal" por archivo. Los componentes React son casi siempre la exportación por defecto de su archivo, mientras que funciones utilitarias y constantes usan exportaciones con nombre.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// ── utils/math.js ──
// Named exports: múltiples por archivo
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }

// ── utils/logger.js ──
// Default export: uno por archivo
export default function log(msg) {
  console.log(\`[\${new Date().toISOString()}] \${msg}\`);
}

// ── app.js ──
// Named imports: deben usar nombres exactos, con llaves
import { add, PI } from './utils/math.js';
// Default import: tú eliges el nombre, sin llaves
import log from './utils/logger.js';
// Combinar ambos:
import log, { add } from './module.js';`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// ── components/Button.jsx ──
// Default export: el componente mismo
export default function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

// ── hooks/useAuth.js ──
// Named export: un hook personalizado
export function useAuth() {
  const [user, setUser] = useState(null);
  return { user, login, logout };
}

// ── pages/Home.jsx ──
// Default import para componentes
import Button from '../components/Button';
// Named import para hooks y utilidades
import { useAuth } from '../hooks/useAuth';
import { formatDate, API_URL } from '../utils';

export default function Home() {
  const { user } = useAuth();
  return <Button label="Login" onClick={login} />;
}`,
            },
            caption:
              'Convención: los componentes React usan default exports. Los hooks, utilidades y constantes usan named exports.',
          },
          callout: {
            type: 'tip',
            text: 'Un patrón común: un default export (el componente) y named exports opcionales (tipos, helpers) por archivo. Los errores de import con named exports se capturan en tiempo de compilación, haciéndolos más seguros para refactorización.',
          },
          challenge: {
            id: 'ch-r1-5-1',
            type: 'fill-blank',
            prompt:
              'Completa las sentencias de import para un proyecto React:',
            code: `// Importar el componente Button exportado por defecto
import ___BLANK_1___ from './components/Button';

// Importar named exports useAuth y useTheme
import ___BLANK_2___ useAuth, useTheme ___BLANK_3___ from './hooks';`,
            blanks: [
              { id: 'b1', expected: ['Button'], hint: 'los default imports usan cualquier nombre, sin llaves' },
              { id: 'b2', expected: ['{'], hint: 'los named imports empiezan con...' },
              { id: 'b3', expected: ['}'], hint: 'los named imports terminan con...' },
            ],
            explanation:
              'Los default imports no tienen llaves y puedes nombrarlos como quieras (aunque la convención es hacer match con el nombre exportado). Los named imports usan llaves { } y deben coincidir con los nombres exportados exactamente.',
          },
        },
        {
          id: 'c2',
          title: 'npm y Conceptos Básicos de Bundlers',
          explanation:
            'npm (Node Package Manager) gestiona paquetes de terceros. Un bundler (Vite, webpack) procesa tus sentencias import/export, resuelve dependencias y produce bundles optimizados para el navegador. No necesitas ser un experto en configuración de bundlers, pero entender lo básico te ayuda a navegar la configuración de proyectos React y depurar problemas de build.',
          codeExample: {
            left: {
              label: 'Vanilla JS',
              language: 'javascript',
              code: `// Sin bundler: script tags en HTML
// <script src="lodash.min.js"></script>
// <script src="app.js"></script>
// ¡El orden importa! ¡Variables globales! ¡Sin tree-shaking!

// package.json -- manifiesto del proyecto
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

// Instalar un paquete
// npm install lodash
// npm install -D eslint  (-D = devDependency)`,
            },
            right: {
              label: 'React',
              language: 'jsx',
              code: `// Los proyectos React usan npm + un bundler (Vite, etc.)
// Crear un nuevo proyecto:
// npm create vite@latest my-app -- --template react

// Instalar dependencias:
// npm install axios react-router-dom

// Importar como cualquier otro módulo -- el bundler lo resuelve
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import styles from './App.module.css';

// El bundler se encarga de:
// - Resolver imports de node_modules
// - Compilar JSX a JavaScript
// - CSS modules e imports de assets
// - Tree-shaking de exports no usados
// - Code-splitting para carga lazy
// - Hot Module Replacement (HMR) en desarrollo

function App() {
  return <BrowserRouter><Route path="/" /></BrowserRouter>;
}
export default App;`,
            },
            caption:
              'npm gestiona paquetes, el bundler convierte tus imports en código optimizado listo para el navegador. Tú escribes JS/JSX moderno; la cadena de herramientas se encarga del resto.',
          },
          callout: {
            type: 'info',
            text: 'Vite es el bundler estándar para nuevos proyectos React en 2024+. Usa módulos ES nativos en desarrollo para hot-reload instantáneo y Rollup para builds de producción optimizados. También puedes usar Next.js que incluye su propio bundler (Turbopack).',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            'Importas una función pero obtienes el error "is not a function". ¿Cuál es la causa más probable y cómo lo depurarías?',
          hint: 'Piensa en la diferencia entre exportaciones default y con nombre, y qué pasa cuando las confundes.',
          answer:
            'La causa más probable es un desajuste de import default/named. Si un módulo usa export default function foo() pero escribes import { foo } from "./module", obtienes undefined (no es una función). Solución: verifica el archivo fuente -- si usa export default, importa sin llaves: import foo from "./module". Si usa export function foo, importa con llaves: import { foo } from "./module". Tu IDE y los mensajes de error del bundler a menudo dan pistas sobre esto.',
        },
      ],
    },
  ],
};

export default module;
