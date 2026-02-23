import type { Quiz } from '../../../../types';

const quiz: Quiz = {
  id: 'react-quiz-3',
  moduleId: 'react-m3',
  title: 'Quiz de Estado y Ciclo de Vida',
  questions: [
    {
      id: 'q1',
      question:
        '¿Qué retorna el hook useState al ser llamado?',
      options: [
        {
          key: 'a',
          text: 'Un objeto con las propiedades value y setValue',
        },
        {
          key: 'b',
          text: 'Un array con dos elementos: el valor actual del estado y una función para actualizarlo',
        },
        {
          key: 'c',
          text: 'Solo el valor actual del estado; la actualización se hace mediante this.setState',
        },
        {
          key: 'd',
          text: 'Una Promise que se resuelve con el valor del estado',
        },
      ],
      correctKey: 'b',
      explanation:
        'useState retorna un par [valorActual, funcionSetter]. La convención es usar desestructuración de array: const [count, setCount] = useState(0). El argumento de useState es el valor inicial. La función setter reemplaza el valor completo (a diferencia de this.setState de las clases, que hace una fusión superficial).',
    },
    {
      id: 'q2',
      question:
        'Si llamas setCount(count + 1) tres veces seguidas en el mismo manejador de eventos con count iniciando en 0, ¿cuál será el valor final?',
      options: [
        { key: 'a', text: '3' },
        { key: 'b', text: '1' },
        { key: 'c', text: '0' },
        { key: 'd', text: 'Depende de la velocidad del navegador' },
      ],
      correctKey: 'b',
      explanation:
        'El valor final será 1, no 3. Las tres llamadas leen count como 0 (su valor en el render actual) y lo establecen a 0 + 1 = 1. React agrupa (batch) las actualizaciones y solo hace un re-render con count = 1. Para incrementar tres veces, usa el actualizador funcional: setCount(prev => prev + 1).',
    },
    {
      id: 'q3',
      question:
        '¿Cuál es la diferencia entre useEffect(fn) sin array de dependencias y useEffect(fn, []) con array vacío?',
      options: [
        {
          key: 'a',
          text: 'No hay diferencia, ambos se ejecutan solo una vez',
        },
        {
          key: 'b',
          text: 'Sin array se ejecuta después de cada render; con array vacío se ejecuta solo una vez después del montaje inicial',
        },
        {
          key: 'c',
          text: 'Sin array se ejecuta antes del render; con array vacío se ejecuta después del render',
        },
        {
          key: 'd',
          text: 'Sin array nunca se ejecuta; con array vacío se ejecuta en cada render',
        },
      ],
      correctKey: 'b',
      explanation:
        'useEffect(fn) sin dependencias se ejecuta después de cada render (montaje + cada actualización). useEffect(fn, []) con array vacío se ejecuta solo una vez después del montaje inicial, equivalente a componentDidMount en componentes de clase. El array de dependencias controla cuándo se re-ejecuta el efecto.',
    },
    {
      id: 'q4',
      question:
        '¿Qué pasa si modificas el estado directamente con items.push(newItem) en vez de setItems([...items, newItem])?',
      options: [
        {
          key: 'a',
          text: 'Funciona igual pero es un poco más lento',
        },
        {
          key: 'b',
          text: 'React NO re-renderiza el componente porque la referencia del array no cambió',
        },
        {
          key: 'c',
          text: 'React lanza un error inmediatamente',
        },
        {
          key: 'd',
          text: 'El componente se re-renderiza pero con un retraso notable',
        },
      ],
      correctKey: 'b',
      explanation:
        'React usa igualdad por referencia para detectar cambios de estado. .push() muta el array existente sin crear una nueva referencia, así que React no sabe que algo cambió y no re-renderiza. Siempre debes crear un nuevo array u objeto usando spread (...) o métodos como .filter() y .map() que retornan nuevos arrays.',
    },
    {
      id: 'q5',
      question:
        '¿Cuál es el propósito de la función de limpieza (cleanup) retornada por useEffect?',
      options: [
        {
          key: 'a',
          text: 'Borrar los datos almacenados en localStorage',
        },
        {
          key: 'b',
          text: 'Cancelar suscripciones, limpiar timers y liberar recursos cuando el componente se desmonta o antes de que el efecto se re-ejecute',
        },
        {
          key: 'c',
          text: 'Resetear todos los estados del componente a sus valores iniciales',
        },
        {
          key: 'd',
          text: 'Enviar datos de analítica antes de cerrar la aplicación',
        },
      ],
      correctKey: 'b',
      explanation:
        'La función de limpieza se ejecuta cuando el componente se desmonta y también antes de que el efecto se re-ejecute (cuando cambian las dependencias). Es esencial para evitar fugas de memoria: cancelar suscripciones, limpiar setInterval/setTimeout, remover event listeners y abortar peticiones fetch con AbortController.',
    },
    {
      id: 'q6',
      question:
        '¿Cuándo conviene usar useReducer en vez de useState?',
      options: [
        {
          key: 'a',
          text: 'Siempre, porque useReducer es más moderno y eficiente',
        },
        {
          key: 'b',
          text: 'Cuando el estado tiene múltiples sub-valores relacionados o lógica de transición compleja (add, delete, toggle, etc.)',
        },
        {
          key: 'c',
          text: 'Solo cuando se necesita conectar con Redux',
        },
        {
          key: 'd',
          text: 'Cuando el estado es un simple booleano o string',
        },
      ],
      correctKey: 'b',
      explanation:
        'useReducer es ideal cuando el estado tiene múltiples sub-valores que cambian juntos, cuando el siguiente estado depende del anterior de formas complejas, o cuando hay muchas acciones relacionadas (agregar, eliminar, alternar, ordenar). Centraliza la lógica de transición en una función pura (reducer) que es fácil de probar. Para valores simples e independientes, useState es más limpio.',
    },
    {
      id: 'q7',
      question:
        '¿Qué significa "levantar el estado" (lifting state up) en React?',
      options: [
        {
          key: 'a',
          text: 'Mover el estado a un almacén global como Redux',
        },
        {
          key: 'b',
          text: 'Mover el estado al componente padre común más cercano cuando dos componentes hermanos necesitan compartirlo',
        },
        {
          key: 'c',
          text: 'Elevar la prioridad de una actualización de estado para que sea más rápida',
        },
        {
          key: 'd',
          text: 'Convertir el estado local en una variable de entorno del servidor',
        },
      ],
      correctKey: 'b',
      explanation:
        'Cuando dos componentes hermanos necesitan acceder al mismo estado, se "levanta" al componente padre común más cercano. El padre es dueño del estado y lo pasa a los hijos mediante props. Los hijos se comunican hacia arriba invocando callbacks que el padre les pasa como props.',
    },
    {
      id: 'q8',
      question:
        '¿Qué sucede con una petición fetch en curso si el componente se desmonta antes de que la respuesta llegue?',
      options: [
        {
          key: 'a',
          text: 'La respuesta se descarta automáticamente sin necesidad de código adicional',
        },
        {
          key: 'b',
          text: 'Sin manejo adecuado, React puede intentar actualizar el estado de un componente desmontado; se debe usar AbortController para cancelar la petición en la función de limpieza',
        },
        {
          key: 'c',
          text: 'El navegador cancela automáticamente todas las peticiones pendientes',
        },
        {
          key: 'd',
          text: 'La respuesta se guarda en caché y se aplica cuando el componente se vuelva a montar',
        },
      ],
      correctKey: 'b',
      explanation:
        'Sin manejo adecuado, la respuesta del fetch podría intentar actualizar el estado con setState en un componente ya desmontado. La solución es usar AbortController: crear uno al inicio del efecto, pasar su signal a fetch, y llamar controller.abort() en la función de limpieza del useEffect. Esto cancela las peticiones en curso de forma limpia.',
    },
  ],
};

export default quiz;
