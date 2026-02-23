import type { Quiz } from '../../../../types';

const quiz: Quiz = {
  id: 'react-quiz-5',
  moduleId: 'react-m5',
  title: 'Quiz de React 18+',
  questions: [
    {
      id: 'q1',
      question:
        '¿Qué se necesita para habilitar las funcionalidades concurrentes de React 18?',
      options: [
        {
          key: 'a',
          text: 'Instalar un paquete adicional llamado react-concurrent',
        },
        {
          key: 'b',
          text: 'Usar createRoot en vez de ReactDOM.render para montar la aplicación',
        },
        {
          key: 'c',
          text: 'Agregar la directiva "use concurrent" al inicio de cada archivo',
        },
        {
          key: 'd',
          text: 'Las funcionalidades concurrentes se activan automáticamente sin ningún cambio',
        },
      ],
      correctKey: 'b',
      explanation:
        'React 18 requiere usar createRoot() de "react-dom/client" para habilitar el renderizado concurrente. ReactDOM.render() sigue funcionando en modo legacy sin funcionalidades concurrentes. Esto permite que los equipos migren incrementalmente: primero actualizan a React 18 y luego optan por createRoot cuando estén listos.',
    },
    {
      id: 'q2',
      question:
        '¿Qué mejora introduce el "batching automático" de React 18?',
      options: [
        {
          key: 'a',
          text: 'Agrupa automáticamente los componentes en chunks para carga diferida',
        },
        {
          key: 'b',
          text: 'Agrupa todas las actualizaciones de estado en un solo re-render, incluso dentro de Promises, setTimeout y event listeners nativos',
        },
        {
          key: 'c',
          text: 'Combina automáticamente múltiples archivos JavaScript en un solo bundle',
        },
        {
          key: 'd',
          text: 'Ejecuta múltiples peticiones fetch en paralelo automáticamente',
        },
      ],
      correctKey: 'b',
      explanation:
        'En React 17, las actualizaciones de estado se agrupaban solo dentro de manejadores de eventos de React. En React 18, el batching automático agrupa TODAS las actualizaciones de estado en un solo re-render, sin importar de dónde vengan: Promises, setTimeout, event listeners nativos, etc. Si necesitas forzar un re-render inmediato, puedes usar flushSync().',
    },
    {
      id: 'q3',
      question:
        '¿Cuál es el propósito principal de useTransition?',
      options: [
        {
          key: 'a',
          text: 'Animar transiciones CSS entre componentes',
        },
        {
          key: 'b',
          text: 'Marcar actualizaciones de estado como no urgentes para que React mantenga la UI responsiva durante renderizados pesados',
        },
        {
          key: 'c',
          text: 'Transicionar entre diferentes rutas de la aplicación',
        },
        {
          key: 'd',
          text: 'Convertir componentes de clase a componentes funcionales',
        },
      ],
      correctKey: 'b',
      explanation:
        'useTransition permite separar actualizaciones urgentes (como escribir en un input) de actualizaciones no urgentes (como filtrar una lista grande). Retorna [isPending, startTransition]. Las actualizaciones dentro de startTransition se realizan en segundo plano y pueden ser interrumpidas si llegan actualizaciones más urgentes, manteniendo la UI responsiva.',
    },
    {
      id: 'q4',
      question:
        '¿Qué permite hacer Suspense cuando se usa con React.lazy()?',
      options: [
        {
          key: 'a',
          text: 'Pausar la aplicación hasta que todos los componentes estén cargados',
        },
        {
          key: 'b',
          text: 'Mostrar una interfaz de respaldo (fallback) mientras un componente cargado dinámicamente se descarga',
        },
        {
          key: 'c',
          text: 'Suspender la ejecución de JavaScript para mejorar el rendimiento',
        },
        {
          key: 'd',
          text: 'Pausar las animaciones CSS hasta que el DOM esté listo',
        },
      ],
      correctKey: 'b',
      explanation:
        'Suspense funciona con React.lazy() para mostrar un componente de respaldo (como un spinner) mientras el componente lazy se carga dinámicamente. En React 18, Suspense se extiende también a la obtención de datos: los componentes "suspenden" lanzando una Promise, y Suspense muestra el fallback hasta que se resuelve.',
    },
    {
      id: 'q5',
      question:
        '¿Cuál es la restricción principal de los React Server Components?',
      options: [
        {
          key: 'a',
          text: 'No pueden recibir props de otros componentes',
        },
        {
          key: 'b',
          text: 'No pueden usar useState, useEffect, manejadores de eventos ni APIs del navegador',
        },
        {
          key: 'c',
          text: 'Solo pueden renderizar texto plano, no elementos HTML',
        },
        {
          key: 'd',
          text: 'Deben estar escritos en TypeScript, no en JavaScript',
        },
      ],
      correctKey: 'b',
      explanation:
        'Los Server Components se ejecutan exclusivamente en el servidor y no envían JavaScript al cliente. Por lo tanto, no pueden usar hooks de estado (useState, useEffect), manejadores de eventos (onClick, onChange), ni APIs del navegador (window, document). Para interactividad, se debe extraer esa parte como Client Component con la directiva "use client".',
    },
    {
      id: 'q6',
      question:
        '¿Qué hace la directiva "use client" en un archivo de React?',
      options: [
        {
          key: 'a',
          text: 'Indica que el archivo solo puede importarse desde el lado del cliente',
        },
        {
          key: 'b',
          text: 'Marca el archivo como un Client Component, creando un límite donde el archivo y sus importaciones se incluyen en el bundle del cliente',
        },
        {
          key: 'c',
          text: 'Desactiva el renderizado del lado del servidor para toda la aplicación',
        },
        {
          key: 'd',
          text: 'Activa la validación de formularios del lado del cliente',
        },
      ],
      correctKey: 'b',
      explanation:
        'La directiva "use client" al inicio de un archivo marca ese componente como Client Component, creando un límite: el archivo y todo lo que importa se incluye en el bundle de JavaScript del cliente. Sin ella, los componentes son Server Components por defecto en frameworks como Next.js App Router. La regla es usar "use client" solo donde se necesite interactividad.',
    },
    {
      id: 'q7',
      question:
        '¿Cuál es el propósito del hook useId?',
      options: [
        {
          key: 'a',
          text: 'Generar IDs únicos para las keys de elementos en listas',
        },
        {
          key: 'b',
          text: 'Generar IDs únicos y deterministas que coinciden entre el renderizado del servidor y la hidratación del cliente, ideales para atributos de accesibilidad',
        },
        {
          key: 'c',
          text: 'Obtener el ID del componente actual en el árbol de React',
        },
        {
          key: 'd',
          text: 'Crear IDs de sesión para autenticación de usuarios',
        },
      ],
      correctKey: 'b',
      explanation:
        'useId genera IDs únicos y estables que son idénticos entre servidor y cliente, evitando errores de hidratación (hydration mismatch). Se usa para atributos de accesibilidad como htmlFor y aria-describedby. NO se debe usar para generar keys de listas. Se pueden derivar múltiples IDs de uno solo: `${id}-email`, `${id}-password`.',
    },
    {
      id: 'q8',
      question:
        '¿Qué hace único al hook use() comparado con los demás hooks de React?',
      options: [
        {
          key: 'a',
          text: 'Es el único hook que funciona en componentes de clase',
        },
        {
          key: 'b',
          text: 'Es el único hook que puede ser llamado dentro de condicionales y bucles, y puede leer tanto Promises como Context',
        },
        {
          key: 'c',
          text: 'Es el único hook que no necesita importarse de React',
        },
        {
          key: 'd',
          text: 'Es el único hook que funciona tanto en el servidor como en el cliente',
        },
      ],
      correctKey: 'b',
      explanation:
        'use() es el único hook de React exento de la regla "los hooks deben llamarse en el nivel superior sin condiciones". Puede usarse dentro de if, loops y después de returns tempranos. Cuando lee una Promise, el componente se "suspende" hasta que se resuelve (requiere un Suspense boundary). Cuando lee un contexto, funciona como useContext pero con la flexibilidad de ser condicional.',
    },
  ],
};

export default quiz;
