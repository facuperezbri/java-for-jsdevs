import type { Quiz } from '../../../../types';

const quiz: Quiz = {
  id: 'react-quiz-4',
  moduleId: 'react-m4',
  title: 'Quiz de Patrones Avanzados',
  questions: [
    {
      id: 'q1',
      question:
        '¿Cuál es el propósito principal de la Context API en React?',
      options: [
        {
          key: 'a',
          text: 'Reemplazar completamente a Redux como solución de manejo de estado global',
        },
        {
          key: 'b',
          text: 'Pasar datos a través del árbol de componentes sin necesidad de enviar props manualmente en cada nivel (evitar prop drilling)',
        },
        {
          key: 'c',
          text: 'Mejorar el rendimiento de los componentes al memorizar sus valores',
        },
        {
          key: 'd',
          text: 'Definir estilos globales que aplican a todos los componentes',
        },
      ],
      correctKey: 'b',
      explanation:
        'La Context API permite pasar datos a través del árbol de componentes sin pasar props manualmente en cada nivel intermedio. Se crea un contexto con React.createContext(), se envuelve el subárbol con un Provider que proporciona el valor, y los componentes consumidores leen el valor con useContext() sin importar qué tan profundo estén en el árbol.',
    },
    {
      id: 'q2',
      question:
        '¿Cuál es la diferencia entre useRef y useState?',
      options: [
        {
          key: 'a',
          text: 'No hay diferencia, ambos almacenan valores que persisten entre renders',
        },
        {
          key: 'b',
          text: 'useState provoca un re-render al actualizarse; useRef persiste el valor entre renders sin provocar re-render',
        },
        {
          key: 'c',
          text: 'useRef solo funciona con elementos del DOM, no con otros valores',
        },
        {
          key: 'd',
          text: 'useState es para componentes funcionales y useRef es para componentes de clase',
        },
      ],
      correctKey: 'b',
      explanation:
        'Ambos persisten valores entre renders, pero la diferencia clave es que actualizar useState provoca un re-render del componente, mientras que modificar useRef.current no lo hace. Usa useState para valores que la UI muestra y useRef para valores internos como IDs de timers, contadores de renders o referencias a nodos del DOM.',
    },
    {
      id: 'q3',
      question:
        '¿Cuál de las siguientes afirmaciones sobre Error Boundaries es correcta?',
      options: [
        {
          key: 'a',
          text: 'Se pueden implementar como componentes funcionales con hooks',
        },
        {
          key: 'b',
          text: 'Capturan todos los errores de la aplicación, incluyendo los de manejadores de eventos',
        },
        {
          key: 'c',
          text: 'Deben ser componentes de clase que implementan getDerivedStateFromError y/o componentDidCatch',
        },
        {
          key: 'd',
          text: 'Solo pueden existir uno por aplicación, en el nivel raíz',
        },
      ],
      correctKey: 'c',
      explanation:
        'Los Error Boundaries deben ser componentes de clase porque dependen de getDerivedStateFromError (para actualizar estado y mostrar fallback) y componentDidCatch (para registrar errores). No existe un equivalente en hooks. Importante: los Error Boundaries NO capturan errores en manejadores de eventos, código asíncrono o renderizado del servidor. Se pueden colocar múltiples en diferentes niveles del árbol.',
    },
    {
      id: 'q4',
      question:
        '¿Cuál es la principal ventaja de los custom hooks sobre los Higher-Order Components (HOCs)?',
      options: [
        {
          key: 'a',
          text: 'Los custom hooks son más rápidos en tiempo de ejecución',
        },
        {
          key: 'b',
          text: 'Eliminan el "wrapper hell", las colisiones de props y la indirección, haciendo el código más plano y explícito',
        },
        {
          key: 'c',
          text: 'Los custom hooks pueden modificar el DOM directamente',
        },
        {
          key: 'd',
          text: 'Los HOCs no funcionan con componentes funcionales',
        },
      ],
      correctKey: 'b',
      explanation:
        'Los custom hooks resuelven los problemas clásicos de los HOCs: el "wrapper hell" (componentes envolventes anidados en DevTools), las colisiones de props (dos HOCs inyectando el mismo nombre de prop), y la indirección (dificultad para rastrear de dónde viene una prop). Con hooks, la lógica es plana y explícita: cada hook retorna valores que tú nombras directamente.',
    },
    {
      id: 'q5',
      question:
        '¿Qué hace React.memo y cuándo deberías usarlo?',
      options: [
        {
          key: 'a',
          text: 'Almacena en caché el resultado de llamadas a APIs para evitar peticiones duplicadas',
        },
        {
          key: 'b',
          text: 'Envuelve un componente funcional para evitar re-renders innecesarios cuando sus props no cambian (comparación superficial)',
        },
        {
          key: 'c',
          text: 'Memoriza el valor de retorno de cualquier función JavaScript',
        },
        {
          key: 'd',
          text: 'Congela permanentemente un componente para que nunca se re-renderice',
        },
      ],
      correctKey: 'b',
      explanation:
        'React.memo es el equivalente funcional de PureComponent. Realiza una comparación superficial de las props y solo re-renderiza el componente si las props cambiaron. Úsalo en componentes que renderizan frecuentemente con las mismas props o que tienen renderizados costosos. No abuses de él porque tiene su propio overhead de comparación.',
    },
    {
      id: 'q6',
      question:
        '¿Por qué un componente hijo envuelto en React.memo aún se re-renderiza cuando el padre le pasa un callback inline?',
      options: [
        {
          key: 'a',
          text: 'Porque React.memo no funciona con funciones como props',
        },
        {
          key: 'b',
          text: 'Porque cada render crea una nueva referencia de la función, y React.memo detecta una prop diferente',
        },
        {
          key: 'c',
          text: 'Porque React.memo solo compara props de tipo string y number',
        },
        {
          key: 'd',
          text: 'Porque los callbacks se ejecutan antes de que React.memo haga la comparación',
        },
      ],
      correctKey: 'b',
      explanation:
        'Cada vez que el padre se re-renderiza, las funciones inline se recrean como nuevas referencias. React.memo hace una comparación superficial y ve una referencia diferente para onClick, así que re-renderiza el hijo. La solución es envolver el callback con useCallback para estabilizar la referencia entre renders.',
    },
    {
      id: 'q7',
      question:
        '¿Cuál es la diferencia entre useMemo y useCallback?',
      options: [
        {
          key: 'a',
          text: 'useMemo es para componentes de clase y useCallback es para componentes funcionales',
        },
        {
          key: 'b',
          text: 'useMemo memoriza el resultado de un cálculo; useCallback memoriza la referencia de una función',
        },
        {
          key: 'c',
          text: 'No hay diferencia, son alias del mismo hook',
        },
        {
          key: 'd',
          text: 'useMemo memoriza componentes y useCallback memoriza event handlers',
        },
      ],
      correctKey: 'b',
      explanation:
        'useMemo(() => computeValue(), deps) memoriza el valor retornado por la función. useCallback(fn, deps) memoriza la función en sí. De hecho, useCallback(fn, deps) es equivalente a useMemo(() => fn, deps). Usa useMemo para cálculos costosos y useCallback para estabilizar referencias de funciones que se pasan como props a componentes memorizados.',
    },
    {
      id: 'q8',
      question:
        '¿Por qué es importante memorizar el objeto value que se pasa a un Context Provider?',
      options: [
        {
          key: 'a',
          text: 'Porque los objetos no se pueden pasar como props sin memorización',
        },
        {
          key: 'b',
          text: 'Para evitar que todos los consumidores se re-rendericen innecesariamente cuando el Provider se re-renderiza pero los datos no cambiaron',
        },
        {
          key: 'c',
          text: 'Porque el Context API no funciona con objetos mutables',
        },
        {
          key: 'd',
          text: 'Para reducir el uso de memoria del navegador',
        },
      ],
      correctKey: 'b',
      explanation:
        'Si el Provider crea un nuevo objeto en cada render (value={{ theme, toggle }}), React ve una referencia diferente cada vez y re-renderiza TODOS los consumidores, aunque los datos no hayan cambiado. Usar useMemo para envolver el value asegura que la referencia sea estable, y los consumidores solo se re-rendericen cuando los datos realmente cambien.',
    },
  ],
};

export default quiz;
