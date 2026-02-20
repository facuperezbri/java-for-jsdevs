import type { Quiz } from '../../types';

const quiz3: Quiz = {
  id: 'quiz-3',
  moduleId: 'module-3',
  title: 'Cuestionario de colecciones y genéricos',
  questions: [
    {
      id: 'q1',
      question: '¿Cuál es el equivalente en Java del array dinámico de JavaScript (push/pop/length)?',
      options: [
        { key: 'a', text: 'int[] (array Java)' },
        { key: 'b', text: 'ArrayList<T>' },
        { key: 'c', text: 'LinkedList<T>' },
        { key: 'd', text: 'HashSet<T>' },
      ],
      correctKey: 'b',
      explanation: 'ArrayList<T> es el equivalente del array dinámico en Java. A diferencia de los arrays Java (tamaño fijo), ArrayList puede crecer con .add() y reducirse con .remove(). Usa ArrayList<String>, ArrayList<Integer>, etc.',
    },
    {
      id: 'q2',
      question: 'En JavaScript: array.length. ¿Cuál es el equivalente para un ArrayList en Java?',
      options: [
        { key: 'a', text: 'list.length' },
        { key: 'b', text: 'list.length()' },
        { key: 'c', text: 'list.size()' },
        { key: 'd', text: 'list.count()' },
      ],
      correctKey: 'c',
      explanation: 'ArrayList (y todas las colecciones Java) usan .size() para obtener el conteo. Los arrays Java usan .length (sin paréntesis). Los Strings usan .length() (con paréntesis). Recuerda: ArrayList → .size(), Array → .length, String → .length()',
    },
    {
      id: 'q3',
      question: '¿Cuál es el equivalente en Java de un objeto plano {} de JavaScript usado como almacén clave-valor?',
      options: [
        { key: 'a', text: 'ArrayList<Object>' },
        { key: 'b', text: 'HashSet<String>' },
        { key: 'c', text: 'HashMap<String, Object>' },
        { key: 'd', text: 'LinkedList<Entry>' },
      ],
      correctKey: 'c',
      explanation: 'HashMap<K, V> es el almacén clave-valor de Java, equivalente a un objeto plano o Map de JS. Usa put() para establecer valores (en lugar de obj.key = val) y get() para recuperarlos (en lugar de obj.key).',
    },
    {
      id: 'q4',
      question: '¿Cómo iteras sobre los pares clave-valor de un HashMap en Java? (como Object.entries() en JS)',
      options: [
        { key: 'a', text: 'for (var entry : map.entries())' },
        { key: 'b', text: 'for (Map.Entry<K,V> entry : map.entrySet())' },
        { key: 'c', text: 'map.forEach(key => value)' },
        { key: 'd', text: 'map.entries().forEach()' },
      ],
      correctKey: 'b',
      explanation: 'Usa map.entrySet() para obtener pares clave-valor — como Object.entries() en JS. Cada entry es un Map.Entry<K,V> con métodos .getKey() y .getValue(). Alternativamente, usa map.forEach((k, v) -> ...) con lambda.',
    },
    {
      id: 'q5',
      question: '¿Cuál es la garantía principal de HashSet?',
      options: [
        { key: 'a', text: 'Los elementos se almacenan en orden de inserción' },
        { key: 'b', text: 'Los elementos siempre están ordenados' },
        { key: 'c', text: 'Sin elementos duplicados — todos los valores son únicos' },
        { key: 'd', text: 'Los elementos solo pueden ser Strings' },
      ],
      correctKey: 'c',
      explanation: 'HashSet garantiza unicidad — agregar un duplicado no hace nada silenciosamente. Como el Set de JavaScript. Usa .contains() para búsqueda O(1) en lugar de escanear un ArrayList con .contains() que es O(n).',
    },
    {
      id: 'q6',
      question: '¿Qué hace .stream() en Java?',
      options: [
        { key: 'a', text: 'Lee datos de un archivo' },
        { key: 'b', text: 'Abre una conexión de red' },
        { key: 'c', text: 'Convierte una colección en un pipeline perezoso para operaciones filter/map/reduce' },
        { key: 'd', text: 'Crea una copia de la colección' },
      ],
      correctKey: 'c',
      explanation: '.stream() entra a la API Stream — un pipeline perezoso similar a los métodos de array de JS (filter/map/reduce). Las operaciones no se ejecutan hasta que se llama una operación terminal (.collect(), .forEach(), .reduce()).',
    },
    {
      id: 'q7',
      question: '¿Cómo conviertes un Stream de vuelta a List después de operaciones filter/map en Java?',
      options: [
        { key: 'a', text: '.toArray()' },
        { key: 'b', text: '.collect(Collectors.toList()) o .toList() en Java 16+' },
        { key: 'c', text: '.end()' },
        { key: 'd', text: '.materialize()' },
      ],
      correctKey: 'b',
      explanation: '.collect(Collectors.toList()) es la operación terminal que materializa el stream en una List. En Java 16+, .toList() es una abreviación. Esta es la diferencia clave con JS: array.filter().map() retorna un nuevo array directamente, pero los streams de Java necesitan recolección explícita.',
    },
    {
      id: 'q8',
      question: '¿Por qué no puedes escribir ArrayList<int> en Java? ¿Qué deberías escribir en su lugar?',
      options: [
        { key: 'a', text: 'Java no soporta listas de números' },
        { key: 'b', text: 'Los genéricos solo funcionan con tipos referencia; usa ArrayList<Integer>' },
        { key: 'c', text: 'Usa ArrayList<Int> (I mayúscula)' },
        { key: 'd', text: 'Usa int[] en su lugar' },
      ],
      correctKey: 'b',
      explanation: 'Los genéricos Java solo funcionan con tipos referencia (objetos), no primitivos. Usa la clase wrapper: ArrayList<Integer> (no int), ArrayList<Double> (no double), ArrayList<Boolean> (no boolean). Java hace autoboxing de primitivos a sus wrappers al agregar a una colección.',
    },
  ],
};

export default quiz3;
