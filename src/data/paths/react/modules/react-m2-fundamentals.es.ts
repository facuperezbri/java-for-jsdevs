import type { Module } from '../../../../types';

const reactModule2: Module = {
  id: 'react-m2',
  order: 2,
  title: 'Fundamentos de React',
  subtitle: 'Componentes, JSX, props y patrones de renderizado',
  icon: '⚛️',
  accentColor: 'blue',
  quizId: 'react-quiz-2',
  lessons: [
    // ─── Lección 1: Qué es React y Por Qué ─────────────────────────────────────
    {
      id: 'lesson-r2-1',
      moduleId: 'react-m2',
      title: 'Qué es React y Por Qué',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'El DOM Virtual',
          explanation:
            'React usa un DOM Virtual — una representación ligera en JavaScript del DOM real. Cuando el estado cambia, React calcula la diferencia mínima entre los árboles virtuales viejo y nuevo, luego aplica solo esos cambios al DOM real. Esto es similar a cómo un planificador de consultas de base de datos optimiza las escrituras: en lugar de re-renderizar toda la página, React "agrupa" el conjunto mínimo de mutaciones del DOM.',
          analogy:
            'Piensa en el DOM Virtual como un entorno de staging. React hace los cambios en la copia de staging primero, la compara contra producción, luego despliega solo el delta — igual que harías con migraciones de base de datos en lugar de eliminar y recrear todo el esquema.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `// Componente de clase: React gestiona el DOM Virtual
// por ti — tú solo describes QUÉ renderizar.
class Counter extends React.Component {
  state = { count: 0 };

  render() {
    // React compara esta salida contra el render
    // anterior y actualiza solo lo que cambió en el DOM
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
              code: `// Componente funcional: mismo comportamiento de DOM Virtual,
// sintaxis más limpia con hooks.
function Counter() {
  const [count, setCount] = useState(0);

  // Lo mismo: React compara esta salida contra
  // el render anterior, actualiza solo los cambios
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
              'Ambos estilos producen la misma salida de DOM Virtual — React maneja el diffing y las actualizaciones eficientes sin importar el estilo del componente',
          },
          challenge: {
            id: 'ch-r2-1-1',
            type: 'fill-blank',
            prompt:
              'Completa el componente funcional que muestra un mensaje:',
            code: `function Greeting() {
  const [name, ___BLANK_1___] = ___BLANK_2___("World");

  return <h1>Hello, {___BLANK_3___}!</h1>;
}`,
            blanks: [
              { id: 'b1', expected: ['setName'], hint: 'función setter del estado' },
              { id: 'b2', expected: ['useState'], hint: 'hook de React para estado' },
              { id: 'b3', expected: ['name'], hint: 'variable de estado' },
            ],
            explanation:
              'useState devuelve un par: [valorActual, funciónSetter]. El argumento de useState es el valor inicial. Referencia la variable de estado directamente en JSX usando llaves.',
          },
        },
        {
          id: 'c2',
          title: 'Declarativo vs Imperativo',
          explanation:
            'React es declarativo: describes CÓMO debería verse la UI para un estado dado, y React descifra CÓMO actualizar el DOM. Esto es lo opuesto a la manipulación imperativa del DOM (estilo jQuery), donde le dices al navegador paso a paso qué cambiar. Si has trabajado con SQL, ya piensas declarativamente — SELECT describe lo que quieres, no cómo obtenerlo.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `// Declarativo: describe la UI para cada estado
class UserCard extends React.Component {
  state = { isLoggedIn: false };

  render() {
    // Describes QUÉ mostrar, no CÓMO alternar
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
              code: `// Mismo enfoque declarativo, menos boilerplate
function UserCard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Describe QUÉ mostrar — React maneja el DOM
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
              'Declarativo: "muestra Welcome si está logueado, sino muestra Please log in" — sin alternancia manual del DOM',
          },
        },
        {
          id: 'c3',
          title: 'El Modelo de Componentes',
          explanation:
            'Las apps React se construyen componiendo componentes pequeños y reutilizables en un árbol. Cada componente es una unidad autocontenida con su propio markup, lógica y (opcionalmente) estado. Piénsalo como microservicios para la UI: cada componente tiene una sola responsabilidad y una API clara (props).',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `// Composición: componentes pequeños construyen la página
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
              code: `// Misma composición, sintaxis más limpia
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
              'Los componentes se componen como funciones: piezas pequeñas se combinan en UIs más grandes',
          },
          callout: {
            type: 'tip',
            text: 'Una buena regla general: si una pieza de UI se usa más de una vez, o si un componente se está haciendo demasiado grande (100+ líneas), extráelo en su propio componente.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            '¿Cómo se compara el enfoque del DOM Virtual de React con manipular directamente el DOM con document.querySelector e innerHTML?',
          hint: 'Piensa en qué pasa cuando tienes muchos elementos para actualizar a la vez',
          answer:
            'La manipulación directa del DOM es imperativa y puede causar layout thrashing (múltiples reflows/repaints). React agrupa cambios en el DOM Virtual, calcula la diferencia mínima, luego aplica todos los cambios en una sola pasada. Es como agrupar escrituras de base de datos en una transacción en lugar de ejecutar sentencias UPDATE individuales.',
        },
        {
          id: 'e2',
          prompt:
            '¿Por qué un desarrollador backend podría encontrar familiar el modelo declarativo de React?',
          hint: 'Piensa en SQL o herramientas de configuración-como-código',
          answer:
            'Los desarrolladores backend ya piensan declarativamente con SQL (SELECT lo que quieres, no cómo obtenerlo), Terraform/Kubernetes YAML (declarar estado deseado, el sistema reconcilia), y motores de plantillas (describir la estructura HTML). React funciona igual: declara cómo debería verse la UI y React reconcilia el DOM.',
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
            'useState(5) establece count en 5. El primer <p> renderiza {5 * 2} = 10. El segundo <p> evalúa {5 > 3 ? "big" : "small"} = "big" ya que 5 es mayor que 3. Las llaves en JSX evalúan cualquier expresión JavaScript.',
          hint: 'Las llaves en JSX evalúan expresiones JavaScript inline.',
        },
      ],
    },

    // ─── Lección 2: JSX a Fondo ──────────────────────────────────────────────────
    {
      id: 'lesson-r2-2',
      moduleId: 'react-m2',
      title: 'JSX a Fondo',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'JSX Es Solo JavaScript',
          explanation:
            'JSX es azúcar sintáctico para llamadas a React.createElement(). Cada etiqueta <Component /> se compila a una llamada de función. Esto significa que JSX no es un lenguaje de plantillas — es JavaScript completo con sintaxis similar a XML encima. Entender esto te ayuda a depurar problemas de transpilación y saber qué está y no está permitido dentro de JSX.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `// JSX en un componente de clase
class Welcome extends React.Component {
  render() {
    // Este JSX:
    return <h1 className="title">Hello</h1>;

    // ...se compila a esto:
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
              code: `// JSX en un componente funcional
function Welcome() {
  // Mismo JSX, misma salida compilada:
  return <h1 className="title">Hello</h1>;

  // Se compila exactamente a la misma
  // llamada React.createElement.
  // El estilo del componente no cambia
  // cómo funciona JSX.
}`,
            },
            caption:
              'JSX se compila a llamadas React.createElement() — es JavaScript, no HTML',
          },
          callout: {
            type: 'info',
            text: 'Como JSX es JavaScript, usas className en lugar de class (palabra reservada), htmlFor en lugar de for, y camelCase para atributos como onClick, tabIndex, etc.',
          },
        },
        {
          id: 'c2',
          title: 'Incrustar Expresiones en JSX',
          explanation:
            'Las llaves {} en JSX te permiten incrustar cualquier expresión JavaScript: variables, llamadas a funciones, aritmética, ternarios y más. Piensa en {} como una vía de escape del markup de vuelta a JavaScript. No puedes usar sentencias (if/else, for, switch) directamente — solo expresiones que producen un valor.',
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
              'Cualquier expresión JavaScript funciona dentro de {}: llamadas a métodos, ternarios, aritmética, lógica de plantilla',
          },
          challenge: {
            id: 'ch-r2-2-1',
            type: 'fill-blank',
            prompt:
              'Completa el JSX para mostrar un precio formateado:',
            code: `function PriceTag({ amount, currency }) {
  return (
    <span ___BLANK_1___="price-tag">
      {currency === 'USD' ___BLANK_2___ '$' ___BLANK_3___ '€'}
      {amount.___BLANK_4___(2)}
    </span>
  );
}`,
            blanks: [
              { id: 'b1', expected: ['className'], hint: 'JSX usa esto en lugar de class' },
              { id: 'b2', expected: ['?'], hint: 'operador ternario parte 1' },
              { id: 'b3', expected: [':'], hint: 'operador ternario parte 2' },
              { id: 'b4', expected: ['toFixed'], hint: 'formatear lugares decimales' },
            ],
            explanation:
              'En JSX, usa className (no class). El renderizado condicional dentro de {} usa el operador ternario (condición ? valorSiTrue : valorSiFalse). toFixed(2) formatea un número a 2 lugares decimales.',
          },
        },
        {
          id: 'c3',
          title: 'Estilos Inline y className',
          explanation:
            'En JSX, el atributo style toma un objeto JavaScript (no un string CSS), con nombres de propiedades en camelCase. Para nombres de clase, usa className en lugar de class. Esto sorprende a muchos desarrolladores backend porque parece HTML pero se comporta diferente.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class StyledCard extends React.Component {
  render() {
    const cardStyle = {
      backgroundColor: '#f0f0f0',   // ¡camelCase!
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
    backgroundColor: '#f0f0f0',   // ¡camelCase!
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
              'style toma un objeto JS con keys en camelCase — las dobles llaves {{ }} significan "objeto dentro de expresión JSX"',
          },
          callout: {
            type: 'gotcha',
            text: 'style={{ background-color: "red" }} fallará. Los nombres de propiedades CSS deben estar en camelCase en JSX: backgroundColor, fontSize, borderRadius, etc.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            '¿Por qué no puedes escribir if/else directamente dentro de las llaves de JSX? ¿Qué usas en su lugar?',
          hint: 'Piensa en la diferencia entre expresiones y sentencias de JavaScript',
          answer:
            'Las llaves de JSX solo aceptan expresiones (código que produce un valor), no sentencias. if/else es una sentencia. En su lugar, usa: (1) operador ternario: {condición ? a : b}, (2) AND lógico: {condición && <Elemento />}, o (3) extrae la lógica a una variable antes de la sentencia return.',
        },
        {
          id: 'e2',
          prompt:
            'Un colega escribe <div class="container" style="color: red">. ¿Cuáles son los dos errores en este JSX?',
          hint: 'Piensa en los nombres de atributos JSX y los tipos de valores de style',
          answer:
            'Dos errores: (1) class debería ser className (class es una palabra reservada en JS). (2) style debe ser un objeto JS, no un string: style={{ color: "red" }}. Las dobles llaves son necesarias porque las externas {} entran en una expresión JS y las internas {} son el literal de objeto.',
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
            'Los componentes funcionales reciben props como argumento de función. Puedes destructurar props directamente en la lista de parámetros: ({ count }). No más this.props — solo referencia la variable destructurada directamente.',
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
            'isUrgent es true, así que className se resuelve a "urgent". text es "hello" y toUpperCase() produce "HELLO". En el HTML final, className se convierte en el atributo class estándar.',
          hint: 'Evalúa el ternario y la llamada al método por separado.',
        },
      ],
    },

    // ─── Lección 3: Componentes y Props ──────────────────────────────────────────
    {
      id: 'lesson-r2-3',
      moduleId: 'react-m2',
      title: 'Componentes y Props',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Componentes de Clase vs Funcionales',
          explanation:
            'React tiene dos formas de definir componentes. Los componentes de clase extienden React.Component y usan un método render(). Los componentes funcionales son funciones simples que devuelven JSX. React moderno favorece fuertemente los componentes funcionales con hooks. Los componentes de clase siguen funcionando pero se consideran legacy para código nuevo.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `// Componente de clase: extiende React.Component
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

// Uso: <UserProfile name="Alice" email="a@b.com" role="Admin" />`,
            },
            right: {
              label: 'Functional',
              language: 'jsx',
              code: `// Componente funcional: solo una función
function UserProfile({ name, email, role }) {
  return (
    <div className="profile">
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
    </div>
  );
}

// El uso es idéntico:
// <UserProfile name="Alice" email="a@b.com" role="Admin" />`,
            },
            caption:
              'Los componentes funcionales son más cortos, no tienen "this" y son el estándar moderno',
          },
          callout: {
            type: 'tip',
            text: 'Si estás comenzando un proyecto nuevo, siempre usa componentes funcionales. Los componentes de clase siguen siendo soportados pero los hooks (useState, useEffect, etc.) solo funcionan en componentes funcionales.',
          },
        },
        {
          id: 'c2',
          title: 'Props con TypeScript',
          explanation:
            'En TypeScript, defines una interfaz o tipo para tus props. Esto te da autocompletado, verificación de tipos y sirve como documentación — similar a definir DTOs de request/response en una API backend. Los componentes de clase usan genéricos en React.Component, mientras que los componentes funcionales tipan el parámetro de props directamente.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `// Componente de clase con props TypeScript
interface AlertProps {
  message: string;
  severity: 'info' | 'warning' | 'error';
  dismissible?: boolean; // prop opcional
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
              code: `// Componente funcional con props TypeScript
interface AlertProps {
  message: string;
  severity: 'info' | 'warning' | 'error';
  dismissible?: boolean; // prop opcional
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
              'Las props de TypeScript funcionan como contratos de API: define la forma, obtén seguridad en tiempo de compilación',
          },
        },
        {
          id: 'c3',
          title: 'Props de Children',
          explanation:
            'La prop especial "children" representa lo que anides entre las etiquetas de apertura y cierre de un componente. Este es el modelo de composición de React — como envolver middleware en una app Express o anidar componentes de layout. Los componentes de clase acceden a ella via this.props.children; los componentes funcionales la destructuran de props.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `// Componente de clase con children
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

// Uso: children = todo entre las etiquetas
// <Card title="Settings">
//   <p>Any content here</p>
//   <button>Save</button>
// </Card>`,
            },
            right: {
              label: 'Functional',
              language: 'jsx',
              code: `// Componente funcional con children
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
              'children te permite crear componentes wrapper/layout — como middleware de Express envolviendo un handler',
          },
          challenge: {
            id: 'ch-r2-3-1',
            type: 'fill-blank',
            prompt:
              'Completa este componente funcional tipado que envuelve contenido en una sección:',
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
              { id: 'b1', expected: ['children'], hint: 'prop especial para contenido anidado' },
              { id: 'b2', expected: ['children'], hint: 'destructurar de props' },
              { id: 'b3', expected: ['heading'], hint: 'la prop de título de la sección' },
            ],
            explanation:
              'La prop "children" se tipa como React.ReactNode (acepta JSX, strings, números, arrays, null). Se destructura de props igual que cualquier otra prop y se renderiza con {children} en JSX.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            '¿Cuándo seguirías encontrando componentes de clase en un proyecto real, aunque los componentes funcionales sean el estándar moderno?',
          hint: 'Piensa en codebases existentes, error boundaries y librerías',
          answer:
            'Encontrarás componentes de clase en: (1) codebases legacy escritas antes de los hooks (pre-2019), (2) error boundaries — React aún requiere componentes de clase para componentDidCatch/getDerivedStateFromError, (3) algunas librerías de terceros más antiguas. Conocer ambos estilos es importante para mantener código existente.',
        },
        {
          id: 'e2',
          prompt:
            '¿Cómo se parecen las props de React a los parámetros de función o los cuerpos de request de API en un contexto backend?',
          hint: 'Piensa en la dirección del flujo de datos y la inmutabilidad',
          answer:
            'Las props fluyen en una dirección (padre a hijo) como los parámetros de request fluyen del cliente al servidor. Las props son de solo lectura — un componente no puede modificar sus propias props, igual que un handler no debería modificar el objeto de request entrante. Las interfaces TypeScript para props sirven el mismo propósito que los DTOs o JSON schemas: definen el contrato entre el que llama y el que es llamado.',
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
            'Convertir clase a funcional: elimina el boilerplate de class/render, usa una declaración de función, destructura props en la lista de parámetros, y elimina "this.props." — solo referencia el nombre de la prop directamente.',
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
            'La prop color no se pasa, así que se usa el valor por defecto "gray". El shorthand { color } en el objeto style es equivalente a { color: color } que se convierte en { color: "gray" }. El label "New" se renderiza como contenido de texto.',
          hint: 'Mira el valor de parámetro por defecto para color.',
        },
      ],
    },

    // ─── Lección 4: Renderizar Listas ────────────────────────────────────────────
    {
      id: 'lesson-r2-4',
      moduleId: 'react-m2',
      title: 'Renderizar Listas',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'Renderizar con map()',
          explanation:
            'Para renderizar una lista en React, usas Array.map() para transformar datos en elementos JSX. Esto es similar a mapear resultados de consultas en un motor de plantillas backend. Cada item de la lista debe tener una prop "key" única para que React pueda rastrear eficientemente qué items cambiaron, se agregaron o se eliminaron durante los re-renders.',
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
              'map() transforma arrays de datos en arrays de JSX — la prop key es requerida para un diffing eficiente',
          },
          callout: {
            type: 'warning',
            text: 'Nunca uses el índice del array como key si la lista puede ser reordenada, filtrada, o si los items pueden ser insertados/eliminados. Usa un identificador único estable (como un ID de base de datos). Usar el índice como key causa bugs sutiles con el estado de los componentes.',
          },
          challenge: {
            id: 'ch-r2-4-1',
            type: 'fill-blank',
            prompt:
              'Completa el renderizado de lista con keys apropiadas:',
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
              { id: 'b1', expected: ['map'], hint: 'método de transformación de array' },
              { id: 'b2', expected: ['key'], hint: 'prop de rastreo de React' },
              { id: 'b3', expected: ['id'], hint: 'identificador único' },
            ],
            explanation:
              'Usa .map() para transformar cada todo en un elemento <li>. La prop key debe establecerse con un identificador único y estable (todo.id) para que React pueda rastrear cada item eficientemente entre re-renders.',
          },
        },
        {
          id: 'c2',
          title: 'Renderizado Condicional',
          explanation:
            'React ofrece varios patrones para mostrar u ocultar elementos condicionalmente: el operador ternario para if/else, el AND lógico (&&) para mostrar/ocultar, y retornos tempranos para el renderizado completo del componente. Elige el patrón que mejor se ajuste a la complejidad de tu condición.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class Notification extends React.Component {
  render() {
    const { messages, isAdmin } = this.props;

    // Retorno temprano: nada que mostrar
    if (messages.length === 0) {
      return <p>No notifications</p>;
    }

    return (
      <div>
        {/* Ternario: if/else */}
        <h3>{messages.length > 5 ? 'Many' : 'Some'} messages</h3>

        {/* AND lógico: mostrar solo si es true */}
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
  // Retorno temprano: nada que mostrar
  if (messages.length === 0) {
    return <p>No notifications</p>;
  }

  return (
    <div>
      {/* Ternario: if/else */}
      <h3>{messages.length > 5 ? 'Many' : 'Some'} messages</h3>

      {/* AND lógico: mostrar solo si es true */}
      {isAdmin && <button>Clear All</button>}

      {messages.map(msg => (
        <p key={msg.id}>{msg.text}</p>
      ))}
    </div>
  );
}`,
            },
            caption:
              'Tres patrones: retorno temprano para condiciones grandes, ternario para if/else, && para mostrar/ocultar',
          },
          callout: {
            type: 'gotcha',
            text: 'Cuidado: {count && <p>Items</p>} renderiza "0" cuando count es 0, porque 0 es falsy pero sigue siendo un valor renderizable válido en React. Usa {count > 0 && <p>Items</p>} en su lugar.',
          },
        },
        {
          id: 'c3',
          title: 'Fragments — Evitar Nodos DOM Extra',
          explanation:
            'Los componentes React deben devolver un solo elemento raíz. Si no quieres agregar un <div> extra al DOM, usa un Fragment (<React.Fragment> o el atajo <>...</>). Los Fragments te permiten agrupar elementos sin introducir un nodo wrapper en la salida HTML.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class TableRow extends React.Component {
  render() {
    const { name, email, role } = this.props;

    // <></> es el atajo de Fragment
    // Sin él, necesitarías un <div> wrapper
    // lo cual rompería la estructura de <table>
    return (
      <>
        <td>{name}</td>
        <td>{email}</td>
        <td>{role}</td>
      </>
    );
  }
}

// Usado dentro de un <tr>:
// <tr><TableRow name="Alice" email="a@b.com" role="Admin" /></tr>`,
            },
            right: {
              label: 'Functional',
              language: 'jsx',
              code: `function TableRow({ name, email, role }) {
  // Fragment evita HTML inválido como:
  // <tr><div><td>...</td></div></tr>
  return (
    <>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
    </>
  );
}

// Fragments con key en listas:
// items.map(item => (
//   <React.Fragment key={item.id}>
//     <dt>{item.term}</dt>
//     <dd>{item.definition}</dd>
//   </React.Fragment>
// ))`,
            },
            caption:
              'Fragments (<>...</>) agrupan elementos sin agregar nodos DOM extra — esencial para HTML válido',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            '¿Por qué React requiere una prop "key" en los items de lista? ¿Qué pasa si la omites o usas el índice del array?',
          hint: 'Piensa en cómo React compara el DOM Virtual',
          answer:
            'Las keys ayudan a React a identificar qué items cambiaron, se agregaron o se eliminaron. Sin keys, React re-renderiza toda la lista en cada cambio. Usar el índice del array como key falla cuando los items se reordenan o eliminan: React asocia el estado con el item equivocado porque el índice se desplaza. Siempre usa un ID único y estable (como una clave primaria de base de datos).',
        },
        {
          id: 'e2',
          prompt:
            'Al renderizar una lista de items, notas que {0 && <p>Items</p>} renderiza "0" en pantalla. ¿Por qué, y cómo lo arreglas?',
          hint: 'Piensa en cómo JavaScript evalúa && con valores falsy',
          answer:
            'La evaluación de cortocircuito de JavaScript devuelve el operando izquierdo si es falsy. Como 0 es falsy, {0 && <p>Items</p>} devuelve 0, y React renderiza el número 0 como texto. Arréglalo usando un booleano explícito: {count > 0 && <p>Items</p>} o {!!count && <p>Items</p>} o un ternario.',
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
            'map() itera sobre el array con tanto el item como su índice. Cada <li> renderiza el índice seguido de dos puntos y el nombre del item. Nota: usar index como key funciona aquí porque la lista es estática, pero causaría bugs si los items pudieran ser reordenados.',
          hint: 'El callback de map recibe (item, index) — ambos se usan en el JSX.',
        },
      ],
    },

    // ─── Lección 5: Eventos y Formularios ────────────────────────────────────────
    {
      id: 'lesson-r2-5',
      moduleId: 'react-m2',
      title: 'Eventos y Formularios',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Event Handlers: onClick y onChange',
          explanation:
            'React usa nombres de eventos en camelCase (onClick, onChange, onSubmit) en lugar de minúsculas HTML (onclick). Los event handlers reciben un SyntheticEvent — el wrapper cross-browser de React sobre el evento DOM nativo. En componentes de clase, debes tener cuidado con el binding de "this"; los componentes funcionales evitan este problema por completo.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class ClickCounter extends React.Component {
  state = { count: 0 };

  // Arrow function auto-bindea "this"
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

  // Sin problemas de binding de "this"
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
              'Los componentes funcionales evitan el dolor de cabeza del binding de "this" — los handlers son solo variables locales',
          },
          callout: {
            type: 'gotcha',
            text: 'Error común: onClick={handleClick()} llama la función inmediatamente al renderizar. Usa onClick={handleClick} (sin paréntesis) para pasar una referencia. Si necesitas pasar argumentos: onClick={() => handleClick(id)}.',
          },
        },
        {
          id: 'c2',
          title: 'Inputs Controlados',
          explanation:
            'En React, un "input controlado" es un input cuyo valor es controlado por el estado. Estableces la prop value a la variable de estado y actualizas el estado via onChange. Esto le da a React control total sobre los datos del formulario — similar a cómo un backend valida y controla el flujo de datos en lugar de confiar en el estado del lado del cliente.',
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
              'Input controlado: value={state} + onChange={updateState} — React es la fuente única de verdad',
          },
          challenge: {
            id: 'ch-r2-5-1',
            type: 'fill-blank',
            prompt:
              'Completa este componente de input controlado:',
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
              { id: 'b1', expected: ['useState'], hint: 'hook de estado de React' },
              { id: 'b2', expected: ['value'], hint: 'vincula el input al estado' },
              { id: 'b3', expected: ['onChange'], hint: 'se dispara en cada tecla' },
              { id: 'b4', expected: ['target'], hint: 'el elemento DOM que disparó el evento' },
            ],
            explanation:
              'Un input controlado requiere: useState para mantener el valor, value={state} para vincular el input, onChange para actualizar el estado en cada tecla, y e.target.value para obtener el texto escrito del evento.',
          },
        },
        {
          id: 'c3',
          title: 'Envío de Formularios',
          explanation:
            'Para manejar el envío de formularios en React, adjunta un handler onSubmit al elemento <form> y llama e.preventDefault() para detener el comportamiento por defecto del navegador (que causaría una recarga completa de la página). Es lo mismo que llamar e.preventDefault() en vanilla JS — React no lo hace por ti.',
          codeExample: {
            left: {
              label: 'Class Component',
              language: 'jsx',
              code: `class LoginForm extends React.Component {
  state = { email: '', password: '' };

  handleSubmit = (e) => {
    e.preventDefault(); // prevenir recarga de página
    console.log('Login:', this.state.email);
    // llamar API, validar, etc.
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
    e.preventDefault(); // prevenir recarga de página
    console.log('Login:', email);
    // llamar API, validar, etc.
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
              'Siempre e.preventDefault() en onSubmit — de lo contrario el navegador recarga la página',
          },
          callout: {
            type: 'tip',
            text: 'Para formularios complejos con muchos campos, considera usar una librería de formularios como React Hook Form o Formik en lugar de gestionar cada input con llamadas useState separadas.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt:
            '¿Qué pasa si estableces la prop value de un input sin proporcionar un handler onChange?',
          hint: 'Piensa en lo que significa "controlado" — ¿quién controla el valor?',
          answer:
            'El input se vuelve de solo lectura. React bloqueará el valor mostrado a cualquier estado que establezcas, y como no hay onChange para actualizar el estado, el usuario no puede escribir nada. React también registrará una advertencia: "You provided a value prop without an onChange handler." Agrega onChange o usa defaultValue para inputs no controlados.',
        },
        {
          id: 'e2',
          prompt:
            '¿Por qué necesitas llamar e.preventDefault() en el handler onSubmit de un formulario? ¿Cómo es esto diferente del manejo de formularios backend?',
          hint: 'Piensa en lo que el navegador hace por defecto cuando se envía un formulario',
          answer:
            'Por defecto, el navegador envía una petición GET/POST a la URL de acción del formulario y recarga la página — este es el modelo tradicional de envío de formularios del lado del servidor. En una SPA de React, quieres manejar el envío en JavaScript (ej. llamar una API via fetch), así que previenes el comportamiento por defecto. En el backend, esto no es necesario porque el servidor ya está manejando la petición.',
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
            'useState(false) reemplaza la inicialización de estado de la clase. El setter (setIsOn) reemplaza this.setState. La negación (!isOn) es más simple porque referencias la variable de estado directamente en lugar de this.state.isOn. El handler es un const local, referenciado por nombre en onClick.',
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
            'El valor inicial es "hello". Cuando el usuario enfoca y escribe "world", cada tecla dispara handleChange que convierte el valor a mayúsculas via toUpperCase(). El input controlado siempre muestra el valor del estado, así que el input muestra "WORLD". Nota: el "hello" inicial es reemplazado completamente porque escribir en un input controlado reemplaza su valor.',
          hint: 'El handler onChange transforma el input antes de almacenarlo en el estado.',
        },
      ],
    },
  ],
};

export default reactModule2;
