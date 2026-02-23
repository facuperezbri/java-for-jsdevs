import type { Quiz } from '../../../../types';

const quiz: Quiz = {
  id: 'react-quiz-2',
  moduleId: 'react-m2',
  title: 'Quiz de Fundamentos de React',
  questions: [
    {
      id: 'q1',
      question:
        '¿Qué es el Virtual DOM y por qué React lo utiliza?',
      options: [
        {
          key: 'a',
          text: 'Es una copia del DOM real que se almacena en el servidor para mejorar el SEO',
        },
        {
          key: 'b',
          text: 'Es una representación ligera en JavaScript del DOM real; React calcula el diff mínimo y aplica solo los cambios necesarios',
        },
        {
          key: 'c',
          text: 'Es un navegador virtual que React usa para probar componentes',
        },
        {
          key: 'd',
          text: 'Es una librería externa que React requiere para funcionar',
        },
      ],
      correctKey: 'b',
      explanation:
        'El Virtual DOM es una representación ligera en JavaScript del DOM real. Cuando el estado cambia, React crea un nuevo Virtual DOM, lo compara con el anterior (diffing), y aplica solo las mutaciones mínimas necesarias al DOM real. Esto es más eficiente que manipular el DOM directamente.',
    },
    {
      id: 'q2',
      question:
        '¿Qué produce el JSX después de ser compilado?',
      options: [
        {
          key: 'a',
          text: 'Código HTML puro que el navegador interpreta directamente',
        },
        {
          key: 'b',
          text: 'Llamadas a React.createElement() que crean objetos JavaScript',
        },
        {
          key: 'c',
          text: 'Código CSS optimizado para los estilos del componente',
        },
        {
          key: 'd',
          text: 'Archivos XML que el servidor procesa antes de enviárselos al cliente',
        },
      ],
      correctKey: 'b',
      explanation:
        'JSX es azúcar sintáctico para llamadas a React.createElement(). Por ejemplo, <h1 className="title">Hola</h1> se compila a React.createElement("h1", { className: "title" }, "Hola"). Por eso JSX no es HTML: es JavaScript con sintaxis parecida a XML.',
    },
    {
      id: 'q3',
      question:
        '¿Por qué se debe usar "className" en vez de "class" en JSX?',
      options: [
        {
          key: 'a',
          text: 'Porque React no soporta clases CSS',
        },
        {
          key: 'b',
          text: 'Porque "class" es una palabra reservada en JavaScript y JSX es JavaScript',
        },
        {
          key: 'c',
          text: 'Porque className es más rápido de procesar que class',
        },
        {
          key: 'd',
          text: 'Porque es un error de diseño de React que nunca se corrigió',
        },
      ],
      correctKey: 'b',
      explanation:
        'Dado que JSX se compila a JavaScript, y "class" es una palabra reservada en JavaScript (usada para definir clases), React usa "className" para el atributo de clase CSS. De manera similar, se usa "htmlFor" en vez de "for" en las etiquetas <label>.',
    },
    {
      id: 'q4',
      question:
        '¿Cuál es la forma correcta de pasar y recibir props en un componente funcional?',
      options: [
        {
          key: 'a',
          text: 'Se pasan como atributos XML y se reciben con this.props',
        },
        {
          key: 'b',
          text: 'Se pasan como atributos en JSX y se reciben desestructurando el parámetro de la función',
        },
        {
          key: 'c',
          text: 'Se pasan usando setState y se reciben usando getState',
        },
        {
          key: 'd',
          text: 'Se definen como variables globales accesibles desde cualquier componente',
        },
      ],
      correctKey: 'b',
      explanation:
        'Las props se pasan como atributos en JSX: <UserCard name="Alice" age={25} />. En el componente funcional, se reciben como un objeto que típicamente se desestructura en el parámetro: function UserCard({ name, age }) { ... }. No se usa this.props en componentes funcionales, eso es exclusivo de componentes de clase.',
    },
    {
      id: 'q5',
      question:
        '¿Por qué React requiere una prop "key" única al renderizar listas con .map()?',
      options: [
        {
          key: 'a',
          text: 'Para ordenar los elementos automáticamente en orden alfabético',
        },
        {
          key: 'b',
          text: 'Para que React pueda identificar eficientemente qué elementos cambiaron, se agregaron o se eliminaron',
        },
        {
          key: 'c',
          text: 'Para que CSS pueda aplicar estilos a cada elemento individualmente',
        },
        {
          key: 'd',
          text: 'Es solo una convención de estilo, no tiene impacto funcional',
        },
      ],
      correctKey: 'b',
      explanation:
        'Las keys ayudan a React a identificar qué elementos de la lista cambiaron, se agregaron o se eliminaron durante el proceso de diffing del Virtual DOM. Sin keys únicas y estables, React re-renderiza toda la lista en cada cambio. Nunca se debe usar el índice del array como key si la lista puede reordenarse o modificarse.',
    },
    {
      id: 'q6',
      question:
        '¿Qué pasa si escribes onClick={handleClick()} en vez de onClick={handleClick} en JSX?',
      options: [
        {
          key: 'a',
          text: 'Funciona exactamente igual, los paréntesis son opcionales',
        },
        {
          key: 'b',
          text: 'La función se ejecuta inmediatamente durante el renderizado en vez de ejecutarse al hacer clic',
        },
        {
          key: 'c',
          text: 'React lanza un error de sintaxis y no compila',
        },
        {
          key: 'd',
          text: 'El evento se dispara dos veces: una al renderizar y otra al hacer clic',
        },
      ],
      correctKey: 'b',
      explanation:
        'Con paréntesis, handleClick() se ejecuta inmediatamente durante el renderizado y su valor de retorno se asigna a onClick. Sin paréntesis, handleClick se pasa como referencia a la función, que será llamada cuando ocurra el evento clic. Si necesitas pasar argumentos, usa una función flecha: onClick={() => handleClick(id)}.',
    },
    {
      id: 'q7',
      question:
        '¿Qué es un "input controlado" (controlled input) en React?',
      options: [
        {
          key: 'a',
          text: 'Un input que está deshabilitado y no permite interacción del usuario',
        },
        {
          key: 'b',
          text: 'Un input cuyo valor es manejado por el estado de React mediante value y onChange',
        },
        {
          key: 'c',
          text: 'Un input que valida automáticamente los datos ingresados',
        },
        {
          key: 'd',
          text: 'Un input que solo acepta números como entrada',
        },
      ],
      correctKey: 'b',
      explanation:
        'Un input controlado tiene su valor vinculado al estado de React con value={state} y se actualiza mediante onChange={handler}. React es la fuente única de verdad para el valor del input. Si se establece value sin onChange, el input se vuelve de solo lectura porque React bloquea el valor al estado actual.',
    },
    {
      id: 'q8',
      question:
        '¿Por qué es necesario llamar a e.preventDefault() en el onSubmit de un formulario en React?',
      options: [
        {
          key: 'a',
          text: 'Para evitar que React lance un error al procesar el formulario',
        },
        {
          key: 'b',
          text: 'Para evitar que el navegador recargue la página con el comportamiento por defecto de envío de formulario',
        },
        {
          key: 'c',
          text: 'Para limpiar automáticamente los campos del formulario',
        },
        {
          key: 'd',
          text: 'Para prevenir ataques de seguridad tipo CSRF',
        },
      ],
      correctKey: 'b',
      explanation:
        'Por defecto, el navegador envía una petición GET/POST a la URL del formulario y recarga la página completa. En una SPA de React, queremos manejar el envío con JavaScript (por ejemplo, llamar a una API con fetch), así que prevenimos el comportamiento por defecto con e.preventDefault().',
    },
  ],
};

export default quiz;
