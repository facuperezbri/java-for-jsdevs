import type { Quiz } from '../../../../types';

const quiz: Quiz = {
  id: 'react-quiz-1',
  moduleId: 'react-m1',
  title: 'Quiz de Fundamentos de JS',
  questions: [
    {
      id: 'q1',
      question:
        '¿Qué es el DOM (Document Object Model) en el contexto del navegador?',
      options: [
        {
          key: 'a',
          text: 'Un lenguaje de programación para crear páginas web',
        },
        {
          key: 'b',
          text: 'Una representación en memoria del HTML como un árbol de objetos manipulable con JavaScript',
        },
        {
          key: 'c',
          text: 'Un framework de JavaScript para construir interfaces de usuario',
        },
        {
          key: 'd',
          text: 'Un protocolo de comunicación entre el servidor y el cliente',
        },
      ],
      correctKey: 'b',
      explanation:
        'El DOM es la representación en memoria que el navegador crea a partir del HTML. Cada elemento HTML se convierte en un nodo del árbol que puede ser leído y manipulado con JavaScript. React abstrae el DOM con su Virtual DOM para hacer las actualizaciones más eficientes.',
    },
    {
      id: 'q2',
      question:
        '¿Cuál es la diferencia principal entre "let" y "const" en JavaScript moderno?',
      options: [
        {
          key: 'a',
          text: '"let" es para números y "const" es para cadenas de texto',
        },
        {
          key: 'b',
          text: '"let" permite reasignación del valor, "const" no permite reasignación',
        },
        {
          key: 'c',
          text: '"const" es más rápido que "let" en tiempo de ejecución',
        },
        {
          key: 'd',
          text: '"let" tiene alcance de función y "const" tiene alcance de bloque',
        },
      ],
      correctKey: 'b',
      explanation:
        'Ambos "let" y "const" tienen alcance de bloque (block scope). La diferencia es que "const" no permite reasignar la variable después de su inicialización, mientras que "let" sí lo permite. En React, se usa "const" por defecto y "let" solo cuando se necesita reasignar.',
    },
    {
      id: 'q3',
      question:
        '¿Qué devuelve el método .map() cuando se aplica a un array?',
      options: [
        {
          key: 'a',
          text: 'Modifica el array original y devuelve undefined',
        },
        {
          key: 'b',
          text: 'Devuelve un nuevo array con los elementos transformados, sin modificar el original',
        },
        {
          key: 'c',
          text: 'Devuelve un único valor acumulado a partir de todos los elementos',
        },
        {
          key: 'd',
          text: 'Devuelve un nuevo array solo con los elementos que cumplen una condición',
        },
      ],
      correctKey: 'b',
      explanation:
        '.map() crea un nuevo array aplicando una función de transformación a cada elemento, sin modificar el array original. En React, .map() es el método principal para renderizar listas de elementos JSX. .filter() es el que filtra elementos, y .reduce() es el que acumula en un solo valor.',
    },
    {
      id: 'q4',
      question:
        '¿Por qué no se puede hacer directamente useEffect(async () => { ... })?',
      options: [
        {
          key: 'a',
          text: 'Porque async/await no funciona dentro de componentes de React',
        },
        {
          key: 'b',
          text: 'Porque useEffect espera que el callback retorne una función de limpieza o nada, no una Promise',
        },
        {
          key: 'c',
          text: 'Porque async es una palabra reservada que no se puede usar en React',
        },
        {
          key: 'd',
          text: 'Porque las funciones async son más lentas que las funciones normales',
        },
      ],
      correctKey: 'b',
      explanation:
        'El callback de useEffect debe retornar una función de limpieza (cleanup) o undefined. Una función async siempre retorna una Promise, lo cual confunde a React. La solución es definir una función async dentro del callback y llamarla inmediatamente: useEffect(() => { const fetchData = async () => { ... }; fetchData(); }, []);',
    },
    {
      id: 'q5',
      question:
        '¿Cuál es la forma correcta de agregar un elemento a un array de estado en React de manera inmutable?',
      options: [
        { key: 'a', text: 'items.push(newItem)' },
        { key: 'b', text: 'setItems([...items, newItem])' },
        { key: 'c', text: 'items[items.length] = newItem' },
        { key: 'd', text: 'setItems(items.concat(newItem).splice(0))' },
      ],
      correctKey: 'b',
      explanation:
        'En React, el estado debe tratarse como inmutable. Usar el operador spread (...) crea un nuevo array con todos los elementos existentes más el nuevo, generando una nueva referencia que React puede detectar para re-renderizar. .push() muta el array original, lo cual React no detecta.',
    },
    {
      id: 'q6',
      question:
        '¿Qué sucede cuando fetch recibe una respuesta HTTP 404?',
      options: [
        {
          key: 'a',
          text: 'La Promise es rechazada automáticamente con un error',
        },
        {
          key: 'b',
          text: 'La Promise se resuelve exitosamente, pero response.ok es false',
        },
        {
          key: 'c',
          text: 'El navegador muestra una alerta de error automáticamente',
        },
        {
          key: 'd',
          text: 'La función fetch retorna null',
        },
      ],
      correctKey: 'b',
      explanation:
        'fetch solo rechaza la Promise en errores de red (sin conexión). Para errores HTTP como 404 o 500, la Promise se resuelve normalmente con un objeto Response donde response.ok es false. Por eso es fundamental verificar response.ok manualmente antes de procesar la respuesta.',
    },
    {
      id: 'q7',
      question:
        '¿Cuál es la diferencia entre una exportación por defecto (export default) y una exportación nombrada (export)?',
      options: [
        {
          key: 'a',
          text: 'No hay diferencia, ambas funcionan exactamente igual',
        },
        {
          key: 'b',
          text: 'export default permite una sola exportación principal por archivo; export nombrado permite múltiples y requiere llaves {} al importar',
        },
        {
          key: 'c',
          text: 'export default es más rápido porque el bundler lo optimiza mejor',
        },
        {
          key: 'd',
          text: 'Las exportaciones nombradas solo funcionan con funciones, no con constantes',
        },
      ],
      correctKey: 'b',
      explanation:
        'export default permite una exportación principal por archivo que se importa sin llaves (import Button from "./Button"). Las exportaciones nombradas permiten múltiples exportaciones y requieren llaves (import { useAuth, useTheme } from "./hooks"). En React, los componentes suelen usar export default y los hooks y utilidades usan exportaciones nombradas.',
    },
    {
      id: 'q8',
      question:
        '¿Cuál es la ventaja principal del operador de encadenamiento opcional (?.) en JavaScript?',
      options: [
        {
          key: 'a',
          text: 'Hace que el código se ejecute más rápido al evitar cálculos innecesarios',
        },
        {
          key: 'b',
          text: 'Permite acceder a propiedades anidadas de forma segura sin lanzar un error si un valor intermedio es null o undefined',
        },
        {
          key: 'c',
          text: 'Convierte automáticamente valores null a cadenas vacías',
        },
        {
          key: 'd',
          text: 'Solo funciona con arrays, no con objetos',
        },
      ],
      correctKey: 'b',
      explanation:
        'El operador ?. (optional chaining) permite acceder a propiedades profundamente anidadas sin verificar manualmente cada nivel. Si un valor intermedio es null o undefined, la expresión retorna undefined en vez de lanzar un TypeError. Es esencial en React cuando se renderizan datos de APIs que pueden no estar cargados aún, por ejemplo: user?.address?.city.',
    },
  ],
};

export default quiz;
