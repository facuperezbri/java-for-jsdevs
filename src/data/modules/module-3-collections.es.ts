import type { Module } from '../../types';
import project3 from '../projects/project-3.es';

const module3: Module = {
  id: 'module-3',
  order: 3,
  title: 'Colecciones y genéricos',
  subtitle: 'ArrayList, HashMap, HashSet y la API Streams',
  icon: '📦',
  accentColor: 'green',
  quizId: 'quiz-3',
  project: project3,
  lessons: [
    {
      id: 'lesson-3-1',
      moduleId: 'module-3',
      title: 'ArrayList',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'ArrayList — El array dinámico de Java',
          explanation: 'ArrayList es el equivalente en Java de un array de JavaScript — puede crecer y reducirse dinámicamente. A diferencia de los arrays de JS, debes especificar el tipo de elemento.',
          codeExample: {
            javascript: `// Array JS — dinámico por defecto
const fruits = [];
fruits.push("apple");
fruits.push("banana");
console.log(fruits.length); // 2
console.log(fruits[0]);     // apple
fruits.splice(0, 1);        // eliminar primero
console.log(fruits);        // ["banana"]`,
            java: `// ArrayList Java — array dinámico
import java.util.ArrayList;

ArrayList<String> fruits = new ArrayList<>();
fruits.add("apple");
fruits.add("banana");
System.out.println(fruits.size());   // 2 (¡no .length!)
System.out.println(fruits.get(0));   // apple (¡no [0]!)
fruits.remove(0);                    // eliminar por índice
System.out.println(fruits);          // [banana]`,
            caption: 'ArrayList usa .add()/.get()/.size() en lugar de push/[]/length',
          },
          callout: {
            type: 'info',
            text: 'Las declaraciones import van al inicio del archivo. La biblioteca estándar de Java requiere imports — no auto-importa como muchos bundlers de JS.',
          },
          challenge: {
            id: 'ch3-1-1',
            type: 'fill-blank',
            prompt: 'Crea un ArrayList de Strings y agrega dos elementos:',
            code: `ArrayList<___BLANK_1___> names = new ArrayList<>();
names.___BLANK_2___("Alice");
names.___BLANK_3___("Bob");
System.out.println(names.___BLANK_4___());`,
            blanks: [
              { id: 'b1', expected: ['String'], hint: 'tipo de elemento' },
              { id: 'b2', expected: ['add'], hint: 'como push()' },
              { id: 'b3', expected: ['add'], hint: 'como push()' },
              { id: 'b4', expected: ['size'], hint: 'como length' },
            ],
            explanation: 'ArrayList usa .add() en lugar de .push(), y .size() en lugar de .length. El parámetro de tipo <String> asegura que solo se puedan agregar Strings — el compilador lo impone.',
          },
        },
        {
          id: 'c2',
          title: 'Iterando ArrayLists',
          explanation: 'Puedes iterar un ArrayList con un bucle for-each o un bucle tradicional por índice, similar a JavaScript.',
          codeExample: {
            javascript: `const nums = [10, 20, 30];

// forEach
nums.forEach(n => console.log(n));

// for...of
for (const n of nums) {
  console.log(n);
}

// índice tradicional
for (let i = 0; i < nums.length; i++) {
  console.log(nums[i]);
}`,
            java: `ArrayList<Integer> nums = new ArrayList<>();
nums.add(10); nums.add(20); nums.add(30);

// forEach (lambda)
nums.forEach(n -> System.out.println(n));

// bucle for mejorado
for (int n : nums) {
  System.out.println(n);
}

// índice tradicional
for (int i = 0; i < nums.size(); i++) {
  System.out.println(nums.get(i));
}`,
            caption: 'La lambda "->" de Java es equivalente a la arrow function "=>" de JS',
          },
        },
      ],
      predictOutputs: [
        {
          id: 'po3-1-1',
          code: `ArrayList<String> list = new ArrayList<>();
list.add("apple");
list.add("banana");
list.add("cherry");
list.remove(1);
System.out.println(list.size());
System.out.println(list.get(1));`,
          language: 'java',
          expectedOutput: '2\ncherry',
          explanation: 'Después de agregar 3 elementos, remove(1) elimina el elemento en el índice 1 ("banana"). La lista restante es ["apple", "cherry"]. size() es 2, y get(1) retorna "cherry" que pasó al índice 1.',
          hint: 'remove(1) elimina por índice, no por valor. Los elementos restantes se desplazan.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'Quieres encontrar el índice de "banana" en un ArrayList<String>. ¿Cómo lo haces?',
          hint: 'ArrayList tiene un método similar a indexOf() de arrays en JS',
          answer: 'fruits.indexOf("banana") — retorna el índice o -1 si no se encuentra. ¡Mismo comportamiento que array.indexOf() de JS! También disponible: fruits.contains("banana") para una verificación boolean.',
        },
        {
          id: 'e2',
          prompt: '¿Qué pasa si intentas crear ArrayList<int>? ¿Por qué?',
          hint: 'Recuerda la regla sobre genéricos y tipos primitivos',
          answer: '¡Error de compilación! Los genéricos solo funcionan con tipos referencia. Usa ArrayList<Integer> en su lugar. Java convertirá automáticamente valores int a Integer (autoboxing), así que aún puedes hacer: list.add(42) — Java envuelve 42 en un objeto Integer internamente.',
        },
      ],
    },
    {
      id: 'lesson-3-2',
      moduleId: 'module-3',
      title: 'HashMap',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'HashMap — El Object/Map de Java',
          explanation: 'HashMap es el almacén clave-valor de Java, equivalente a un objeto plano {} o Map de JavaScript. Debes especificar tanto el tipo de clave como el de valor.',
          codeExample: {
            javascript: `// Objeto plano JS
const scores = {};
scores["Alice"] = 95;
scores["Bob"] = 87;
console.log(scores["Alice"]); // 95
console.log(Object.keys(scores)); // ["Alice", "Bob"]
delete scores["Bob"];`,
            java: `import java.util.HashMap;

HashMap<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
scores.put("Bob", 87);
System.out.println(scores.get("Alice")); // 95
System.out.println(scores.keySet());     // [Alice, Bob]
scores.remove("Bob");`,
            caption: 'HashMap usa put()/get() en lugar de notación de corchetes, y remove() en lugar de delete',
          },
          challenge: {
            id: 'ch3-2-1',
            type: 'fill-blank',
            prompt: 'Crea un HashMap y agrega pares clave-valor:',
            code: `HashMap<String, ___BLANK_1___> ages = new HashMap<>();
ages.___BLANK_2___("Alice", 30);
ages.___BLANK_3___("Bob", 25);
System.out.println(ages.___BLANK_4___("Alice"));`,
            blanks: [
              { id: 'b1', expected: ['Integer'], hint: 'wrapper para int' },
              { id: 'b2', expected: ['put'], hint: 'agregar par clave-valor' },
              { id: 'b3', expected: ['put'], hint: 'agregar par clave-valor' },
              { id: 'b4', expected: ['get'], hint: 'obtener por clave' },
            ],
            explanation: 'HashMap usa put(clave, valor) para agregar entradas y get(clave) para recuperarlas. Nota que el tipo de valor debe ser Integer (clase wrapper), no int (primitivo), ya que los genéricos requieren tipos referencia.',
          },
        },
        {
          id: 'c2',
          title: 'Iterando un HashMap',
          explanation: 'Iterar un HashMap es similar a Object.entries() en JavaScript. Usa entrySet() para obtener pares clave-valor.',
          codeExample: {
            javascript: `const scores = { Alice: 95, Bob: 87 };

// Object.entries
Object.entries(scores).forEach(([name, score]) => {
  console.log(\`\${name}: \${score}\`);
});

// for...of con Map
const map = new Map([["Alice", 95]]);
for (const [key, val] of map) {
  console.log(key, val);
}`,
            java: `HashMap<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
scores.put("Bob", 87);

// entrySet() — como Object.entries()
for (Map.Entry<String, Integer> entry : scores.entrySet()) {
  System.out.println(entry.getKey() + ": " + entry.getValue());
}

// forEach con lambda (más limpio)
scores.forEach((name, score) -> {
  System.out.println(name + ": " + score);
});`,
            caption: 'entrySet() itera pares clave-valor — como Object.entries() pero con tipos explícitos',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'En JS puedes hacer: const val = obj.key ?? "default". ¿Cuál es el equivalente en HashMap en Java?',
          hint: 'HashMap tiene un método que combina get + valor por defecto en una llamada',
          answer: 'scores.getOrDefault("Alice", 0) — retorna el valor si está presente, o 0 si no. Este es el equivalente limpio en Java de obj.key ?? valorPorDefecto.',
        },
        {
          id: 'e2',
          prompt: '¿Cómo verificas si un HashMap contiene una clave específica?',
          hint: 'Similar a hasOwnProperty o el operador "in" de JS',
          answer: 'scores.containsKey("Alice") — retorna boolean. Similar a "Alice" in scores (objeto JS) o scores.has("Alice") (Map de JS). También: scores.containsValue(95) verifica si existe un valor.',
        },
      ],
    },
    {
      id: 'lesson-3-3',
      moduleId: 'module-3',
      title: 'HashSet',
      estimatedMinutes: 8,
      concepts: [
        {
          id: 'c1',
          title: 'HashSet — Solo valores únicos',
          explanation: 'HashSet es el equivalente en Java del Set de JavaScript — almacena solo valores únicos, con tiempo de búsqueda O(1).',
          codeExample: {
            javascript: `// Set de JS
const seen = new Set();
seen.add("apple");
seen.add("banana");
seen.add("apple"); // duplicado, ignorado
console.log(seen.size);        // 2
console.log(seen.has("apple")); // true

// Eliminar duplicados de array:
const unique = [...new Set([1, 2, 2, 3, 3])];`,
            java: `import java.util.HashSet;

HashSet<String> seen = new HashSet<>();
seen.add("apple");
seen.add("banana");
seen.add("apple"); // duplicado, ignorado
System.out.println(seen.size());        // 2
System.out.println(seen.contains("apple")); // true

// Eliminar duplicados de lista:
ArrayList<Integer> nums = new ArrayList<>(List.of(1,2,2,3,3));
HashSet<Integer> unique = new HashSet<>(nums);`,
            caption: 'HashSet refleja el Set de JS — add/contains/size en lugar de add/has/size',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: '¿Por qué usarías HashSet en lugar de ArrayList para rastrear URLs visitadas en un rastreador web?',
          hint: 'Piensa en rendimiento de búsqueda y garantías de unicidad',
          answer: 'HashSet.contains() es O(1) — tiempo constante sin importar el tamaño. ArrayList.contains() es O(n) — escanea cada elemento. Para 1 millón de URLs, HashSet verifica al instante mientras ArrayList verificaría el millón. Además, HashSet previene duplicados automáticamente sin código extra.',
        },
      ],
    },
    {
      id: 'lesson-3-4',
      moduleId: 'module-3',
      title: 'Genéricos en profundidad',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Parámetros de tipo acotados',
          explanation: 'Puedes restringir qué tipos acepta un genérico usando "extends". Esto es como "extends" en restricciones genéricas de TypeScript.',
          codeExample: {
            javascript: `// Genéricos acotados en TypeScript
function sum<T extends number>(nums: T[]): T {
  return nums.reduce((a, b) => a + b, 0) as T;
}

// Genérico con restricción:
function getLength<T extends { length: number }>(item: T) {
  return item.length;
}`,
            java: `// Genéricos acotados en Java
// T debe ser Number o subclase (Integer, Double, etc.)
public static <T extends Number> double sum(List<T> nums) {
  double total = 0;
  for (T n : nums) {
    total += n.doubleValue(); // método de Number
  }
  return total;
}

sum(List.of(1, 2, 3));        // funciona (Integer extiende Number)
sum(List.of(1.5, 2.5));       // funciona (Double extiende Number)
// sum(List.of("a", "b"));    // ¡error de compilación!`,
            caption: '"extends" en genéricos significa "es un subtipo de" — funciona para clases e interfaces',
          },
        },
        {
          id: 'c2',
          title: 'Borrado de tipos',
          explanation: 'Una diferencia clave con TypeScript: la información de tipo genérico de Java se borra en runtime (type erasure). Los tipos de TypeScript también se borran en compilación pero nunca existen en runtime — Java tiene una razón histórica para esto.',
          codeExample: {
            javascript: `// TypeScript: los tipos son solo en tiempo de compilación
// En runtime, esto es solo un array normal
const nums: Array<number> = [1, 2, 3];`,
            java: `// Borrado de tipos en Java: en runtime, los genéricos se vuelven Object
ArrayList<String> strings = new ArrayList<>();
ArrayList<Integer> ints = new ArrayList<>();

// ¡En runtime, ambos son solo "ArrayList"!
System.out.println(strings.getClass() == ints.getClass()); // true!

// No puedes hacer: if (list instanceof ArrayList<String>) {}
// SÍ puedes hacer:  if (list instanceof ArrayList<?>) {}`,
            caption: 'En runtime, ArrayList<String> y ArrayList<Integer> son la misma clase debido al borrado de tipos',
          },
          callout: {
            type: 'info',
            text: 'El borrado de tipos es por qué no puedes crear arrays de tipos genéricos: new T[10] es error de compilación. Usa ArrayList<T> en su lugar.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: '¿Por qué no puedes escribir: if (myList instanceof ArrayList<String>) en Java?',
          hint: 'Piensa en qué pasa con la información de tipo genérico en runtime',
          answer: 'Debido al borrado de tipos, la información <String> se pierde en runtime. Solo puedes verificar instanceof ArrayList<?>. Para verificar el tipo de elemento, tendrías que examinar los elementos mismos o usar un patrón de token tipado.',
        },
      ],
    },
    {
      id: 'lesson-3-5',
      moduleId: 'module-3',
      title: 'API Streams',
      estimatedMinutes: 14,
      concepts: [
        {
          id: 'c1',
          title: 'Streams — La cadena de métodos de array de Java',
          explanation: 'La API Streams de Java (Java 8+) es como los métodos de array de JavaScript (filter, map, reduce) pero funciona en cualquier colección y se evalúa de forma perezosa.',
          codeExample: {
            javascript: `// Métodos de array en JS
const nums = [1, 2, 3, 4, 5, 6];

const result = nums
  .filter(n => n % 2 === 0)    // [2, 4, 6]
  .map(n => n * n)              // [4, 16, 36]
  .reduce((sum, n) => sum + n, 0); // 56

console.log(result); // 56`,
            java: `import java.util.List;
import java.util.stream.Collectors;

List<Integer> nums = List.of(1, 2, 3, 4, 5, 6);

int result = nums.stream()
  .filter(n -> n % 2 == 0)      // [2, 4, 6]
  .map(n -> n * n)               // [4, 16, 36]
  .reduce(0, Integer::sum);      // 56

System.out.println(result); // 56`,
            caption: '.stream() entra al pipeline de Stream — termina con .collect(), .reduce(), .forEach(), etc.',
          },
        },
        {
          id: 'c2',
          title: 'Recolectando resultados',
          explanation: 'Los Streams son perezosos — no hacen nada hasta que se llama una operación terminal. Usa .collect(Collectors.toList()) para convertir de vuelta a List.',
          codeExample: {
            javascript: `const names = ["alice", "bob", "charlie"];

// JS: map retorna un nuevo array directamente
const upper = names.map(n => n.toUpperCase());
// ["ALICE", "BOB", "CHARLIE"]`,
            java: `List<String> names = List.of("alice", "bob", "charlie");

// Java: debe collect() para obtener una List de vuelta
List<String> upper = names.stream()
  .map(n -> n.toUpperCase())
  .collect(Collectors.toList());
// [ALICE, BOB, CHARLIE]

// Java 16+: .toList() abreviado
List<String> upper2 = names.stream()
  .map(String::toUpperCase)  // referencia a método
  .toList();`,
            caption: '.collect(Collectors.toList()) es el equivalente en Java de que map() de JS retorne un nuevo array',
          },
        },
      ],
      predictOutputs: [
        {
          id: 'po3-5-1',
          code: `List<Integer> nums = List.of(1, 2, 3, 4, 5);
long count = nums.stream()
  .filter(n -> n % 2 == 0)
  .count();
System.out.println(count);`,
          language: 'java',
          expectedOutput: '2',
          explanation: 'El stream filtra números pares (2 y 4), luego .count() retorna cuántos elementos quedan. Hay 2 números pares en [1, 2, 3, 4, 5].',
          hint: 'Cuenta cuántos números del 1 al 5 son divisibles por 2.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: '¿Cuál es el equivalente en Java Streams de: names.filter(n => n.startsWith("A"))?',
          hint: 'Java también tiene un método filter() en streams',
          answer: 'names.stream().filter(n -> n.startsWith("A")).collect(Collectors.toList()) — o .toList() en Java 16+. La sintaxis lambda es casi idéntica: JS usa => y Java usa ->.',
        },
        {
          id: 'e2',
          prompt: '¿Qué significa "evaluación perezosa" para Java Streams, y cómo difiere de los métodos de array de JS?',
          hint: 'Piensa en cuándo realmente ocurre el filtrado/mapeo',
          answer: 'Los Streams de Java son perezosos: las operaciones filter/map no se ejecutan hasta que se llama una operación terminal (collect, reduce, forEach). Los métodos de array de JS (filter, map) se ejecutan inmediatamente y crean nuevos arrays en cada paso. La pereza de Java permite optimización — ej. si solo necesitas la primera coincidencia, puede parar temprano.',
        },
      ],
    },
  ],
};

export default module3;
