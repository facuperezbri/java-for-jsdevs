import type { Module } from '../../types';
import project1 from '../projects/project-1.es';

const module1: Module = {
  id: 'module-1',
  order: 1,
  title: 'Sintaxis básica y tipos',
  subtitle: 'Aprende los fundamentos de Java desde la perspectiva de JavaScript',
  icon: '📝',
  accentColor: 'blue',
  quizId: 'quiz-1',
  project: project1,
  lessons: [
    {
      id: 'lesson-1-1',
      moduleId: 'module-1',
      title: 'Variables y tipos',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'Tipado dinámico vs estático',
          explanation:
            'En JavaScript, las variables pueden contener cualquier tipo de valor y los tipos se determinan en tiempo de ejecución. Java es de tipado estático: debes declarar el tipo de cada variable y no puede cambiar.',
          analogy:
            'Piensa en las variables de JavaScript como cajas que pueden contener cualquier cosa. Las variables de Java son cajas etiquetadas: una caja etiquetada "int" solo puede contener números enteros.',
          codeExample: {
            javascript: `// JS: el tipo se infiere, puede cambiar
let age = 30;
age = "thirty"; // totalmente válido

const name = "Alice";
let isActive = true;
let price = 9.99;`,
            java: `// Java: el tipo debe declararse explícitamente
int age = 30;
// age = "thirty"; // ERROR DE COMPILACIÓN

String name = "Alice";
boolean isActive = true;
double price = 9.99;`,
            caption: 'Java requiere declaraciones de tipo explícitas — las variables no pueden cambiar su tipo',
          },
          challenge: {
            id: 'ch1-1-1',
            type: 'fill-blank',
            prompt: 'Declara variables Java para el nombre, edad y estado activo de un usuario:',
            code: `___BLANK_1___ username = "Alice";
___BLANK_2___ age = 25;
___BLANK_3___ isActive = true;`,
            blanks: [
              { id: 'b1', expected: ['String'], hint: 'tipo de texto' },
              { id: 'b2', expected: ['int'], hint: 'número entero' },
              { id: 'b3', expected: ['boolean'], hint: 'verdadero/falso' },
            ],
            explanation: 'En Java, debes declarar String para texto, int para números enteros y boolean para valores verdadero/falso. A diferencia del let/const de JavaScript, el nombre del tipo va primero.',
          },
        },
        {
          id: 'c2',
          title: 'Tipos primitivos',
          explanation:
            'Java tiene 8 tipos primitivos. Los más comunes que usarás son int (números enteros), double (decimales), boolean (verdadero/falso) y char (un solo carácter). String es un caso especial: en realidad es una clase, no un primitivo.',
          codeExample: {
            javascript: `// JS tiene solo Number, String, Boolean
const count = 42;          // Number
const pi = 3.14;           // Number
const letter = 'A';        // String (de longitud 1)
const flag = true;         // Boolean`,
            java: `// Java tiene tipos numéricos distintos
int count = 42;         // entero de 32 bits
long bigNum = 10000000000L; // entero de 64 bits
double pi = 3.14;       // decimal de 64 bits
float f = 3.14f;        // decimal de 32 bits
char letter = 'A';      // Un solo carácter (¡usa comillas simples!)
boolean flag = true;    // verdadero o falso`,
            caption: 'Java distingue entre int y long, float y double',
          },
          callout: {
            type: 'gotcha',
            text: 'En Java, char usa comillas simples (\' \') y String usa comillas dobles (" "). ¡Confundirlos es un error común de principiantes!',
          },
          challenge: {
            id: 'ch1-1-2',
            type: 'fill-blank',
            prompt: 'Completa los tipos Java correctos para estas variables:',
            code: `___BLANK_1___ pi = 3.14159;
___BLANK_2___ initial = 'J';
___BLANK_3___ bigNumber = 9999999999L;`,
            blanks: [
              { id: 'b1', expected: ['double'], hint: 'número decimal' },
              { id: 'b2', expected: ['char'], hint: 'un solo carácter' },
              { id: 'b3', expected: ['long'], hint: 'entero de 64 bits' },
            ],
            explanation: 'double es para números decimales, char es para caracteres individuales (con comillas simples) y long es para enteros grandes (nota el sufijo L en el valor).',
          },
        },
        {
          id: 'c3',
          title: 'var — Inferencia de tipos (Java 10+)',
          explanation:
            'Desde Java 10, puedes usar "var" para que el compilador infiera el tipo. Se parece a JavaScript, pero el tipo sigue siendo fijo en tiempo de compilación — simplemente no tienes que escribirlo.',
          codeExample: {
            javascript: `// JS: var/let/const con tipo en tiempo de ejecución
let message = "Hello";
message = 42; // bien, los tipos son dinámicos`,
            java: `// Java var: tipo inferido en tiempo de compilación
var message = "Hello"; // inferido como String
// message = 42;       // SIGUE siendo error de compilación
// var sigue siendo tipo estático, solo se escribe menos`,
            caption: 'Java var es azúcar sintáctico — los tipos siguen siendo estáticos, solo inferidos',
          },
        },
      ],
      translationDrills: [
        {
          id: 'td1-1-1',
          jsCode: `let count = 42;
let name = "Alice";
let isAdmin = false;`,
          javaTemplate: `___SLOT_1___ count = 42;
___SLOT_2___ name = ___SLOT_3___;
___SLOT_4___ isAdmin = ___SLOT_5___;`,
          slots: [
            { id: 'slot-1', expected: 'int' },
            { id: 'slot-2', expected: 'String' },
            { id: 'slot-3', expected: '"Alice"' },
            { id: 'slot-4', expected: 'boolean' },
            { id: 'slot-5', expected: 'false' },
          ],
          tokenBank: ['int', 'String', '"Alice"', 'boolean', 'false', 'let', 'var', 'true'],
          explanation: 'En Java, cada variable necesita su tipo declarado: int para enteros, String para texto, boolean para verdadero/falso. Nota que String usa comillas dobles (no comillas simples como en JS).',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'En Java, ¿qué tipo usarías para almacenar la edad de alguien (un número entero)?',
          hint: 'Piensa en qué tipo Java representa números enteros (sin decimales)',
          answer: 'Usa "int" para números enteros. Ejemplo: int age = 25; — ¡no "let age" como en JS!',
        },
        {
          id: 'e2',
          prompt: '¿Por qué Java tiene tanto "int" como "long" cuando JavaScript solo tiene "Number"?',
          hint: 'Piensa en memoria y rangos de valores',
          answer: 'El int de Java usa 32 bits (máx. ~2 mil millones). long usa 64 bits (máx. ~9 trillones). JS usa floats de 64 bits para todos los números, lo cual es flexible pero menos eficiente en memoria para contadores simples.',
        },
      ],
    },
    {
      id: 'lesson-1-2',
      moduleId: 'module-1',
      title: 'Funciones y métodos',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Funciones vs métodos',
          explanation:
            'En JavaScript, las funciones son independientes y pueden existir en cualquier lugar. En Java, cada función debe vivir dentro de una clase y se llama "método". No hay funciones globales en Java.',
          codeExample: {
            javascript: `// JS: las funciones pueden ser independientes
function greet(name) {
  return "Hello, " + name + "!";
}

// o como arrow functions
const greet = (name) => \`Hello, \${name}!\`;

console.log(greet("Alice")); // Hello, Alice!`,
            java: `// Java: los métodos deben estar dentro de una clase
public class Greeter {
  // ¡Debes declarar el tipo de retorno!
  public static String greet(String name) {
    return "Hello, " + name + "!";
  }

  public static void main(String[] args) {
    System.out.println(greet("Alice")); // Hello, Alice!
  }
}`,
            caption: 'Los métodos Java siempre viven dentro de una clase y necesitan tipos de retorno explícitos',
          },
          challenge: {
            id: 'ch1-2-1',
            type: 'fill-blank',
            prompt: 'Completa este método Java que suma dos números:',
            code: `public static ___BLANK_1___ add(___BLANK_2___ a, ___BLANK_3___ b) {
  return a + b;
}`,
            blanks: [
              { id: 'b1', expected: ['int', 'double'], hint: 'tipo de retorno' },
              { id: 'b2', expected: ['int', 'double'], hint: 'tipo del parámetro' },
              { id: 'b3', expected: ['int', 'double'], hint: 'tipo del parámetro' },
            ],
            explanation: 'Los métodos Java deben declarar el tipo de retorno y el tipo de cada parámetro. Para sumar números, usarías int (enteros) o double (decimales).',
          },
        },
        {
          id: 'c2',
          title: 'Tipos de retorno y void',
          explanation:
            'Cada método Java debe declarar qué tipo retorna. Si no retorna nada, usas "void". A diferencia de JavaScript donde cualquier función puede retornar cualquier cosa (o nada).',
          codeExample: {
            javascript: `// JS: el tipo de retorno es implícito/flexible
function add(a, b) {
  return a + b; // podría retornar cualquier cosa
}

function logMessage(msg) {
  console.log(msg);
  // retorna implícitamente undefined
}`,
            java: `// Java: el tipo de retorno es explícito
int add(int a, int b) {
  return a + b; // DEBE retornar un int
}

void logMessage(String msg) {
  System.out.println(msg);
  // void = sin valor de retorno
}`,
            caption: '"void" significa "este método no retorna nada" — como retornar undefined implícitamente',
          },
          callout: {
            type: 'tip',
            text: 'Si declaras un tipo de retorno distinto de void, Java dará un error de compilación si alguna ruta de código no retorna un valor.',
          },
        },
        {
          id: 'c3',
          title: 'Sobrecarga de métodos',
          explanation:
            'Java permite múltiples métodos con el mismo nombre siempre que sus tipos de parámetros difieran. Esto se llama "sobrecarga de métodos". JavaScript no tiene esto — típicamente usarías parámetros por defecto o argumentos opcionales.',
          codeExample: {
            javascript: `// JS: una función, maneja variaciones internamente
function greet(name, greeting = "Hello") {
  return \`\${greeting}, \${name}!\`;
}

greet("Alice");           // Hello, Alice!
greet("Bob", "Hi");       // Hi, Bob!`,
            java: `// Java: métodos separados con el mismo nombre
String greet(String name) {
  return "Hello, " + name + "!";
}

String greet(String name, String greeting) {
  return greeting + ", " + name + "!";
}

// Java elige el correcto según los argumentos
greet("Alice");           // Hello, Alice!
greet("Bob", "Hi");       // Hi, Bob!`,
            caption: 'La sobrecarga te permite tener múltiples versiones de un método con diferentes tipos de parámetros',
          },
        },
      ],
      translationDrills: [
        {
          id: 'td1-2-1',
          jsCode: `function multiply(a, b) {
  return a * b;
}`,
          javaTemplate: `___SLOT_1___ ___SLOT_2___ multiply(___SLOT_3___ a, ___SLOT_4___ b) {
  ___SLOT_5___ a * b;
}`,
          slots: [
            { id: 'slot-1', expected: 'int' },
            { id: 'slot-2', expected: 'int' },
            { id: 'slot-3', expected: 'int' },
            { id: 'slot-4', expected: 'int' },
            { id: 'slot-5', expected: 'return' },
          ],
          tokenBank: ['int', 'int', 'int', 'int', 'return', 'void', 'String', 'function'],
          explanation: 'Los métodos Java necesitan un tipo de retorno antes del nombre del método, y cada parámetro necesita su propia declaración de tipo. La palabra clave "return" funciona igual que en JS.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: '¿Qué tipo de retorno le darías a un método Java que calcula el IMC de alguien (un número decimal)?',
          hint: 'El IMC puede tener decimales, ¿qué tipo decimal de Java tiene sentido?',
          answer: '"double" — usa "double calculateBMI(double weight, double height)". Usa double para la mayoría de cálculos decimales, ya que float tiene menos precisión.',
        },
        {
          id: 'e2',
          prompt: 'En JS puedes escribir: const isEven = n => n % 2 === 0. ¿Cómo lo escribirías como método Java?',
          hint: 'El valor de retorno es verdadero/falso, y la entrada es un número entero',
          answer: 'boolean isEven(int n) { return n % 2 == 0; } — Nota: boolean no "bool", y el método está dentro de una clase.',
        },
      ],
    },
    {
      id: 'lesson-1-3',
      moduleId: 'module-1',
      title: 'Flujo de control',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'if/else y bucles',
          explanation:
            'El flujo de control de Java es casi idéntico a la sintaxis de JavaScript. La diferencia principal es que las condiciones deben ser boolean — Java no convierte valores truthy/falsy.',
          codeExample: {
            javascript: `// JS: coerción truthy/falsy
if (count) { // 0 es falsy, distinto de cero es truthy
  console.log("has items");
}

for (let i = 0; i < 5; i++) {
  console.log(i);
}

let i = 0;
while (i < 5) {
  console.log(i++);
}`,
            java: `// Java: debe ser boolean explícito
if (count > 0) { // debe ser una expresión boolean
  System.out.println("has items");
}

for (int i = 0; i < 5; i++) {
  System.out.println(i);
}

int i = 0;
while (i < 5) {
  System.out.println(i++);
}`,
            caption: 'Java requiere condiciones boolean explícitas — sin atajos truthy/falsy',
          },
          callout: {
            type: 'gotcha',
            text: 'if (someString) compila en JS pero no en Java. Necesitas: if (someString != null && !someString.isEmpty())',
          },
        },
        {
          id: 'c2',
          title: 'Igualdad de Strings: == vs .equals()',
          explanation:
            'Este es uno de los errores más comunes de Java para desarrolladores de JS. En Java, == en Strings verifica si son el mismo objeto en memoria, no si tienen el mismo contenido. Usa .equals() para comparar contenido.',
          codeExample: {
            javascript: `// JS: == y === comparan valores
const a = "hello";
const b = "hello";
console.log(a === b); // true (mismo valor)
console.log(a == b);  // true (mismo valor)`,
            java: `// Java: == verifica REFERENCIA, no valor
String a = "hello";
String b = new String("hello");

System.out.println(a == b);       // false (¡objetos diferentes!)
System.out.println(a.equals(b));  // true (mismo contenido ✓)

// Los literales de String pueden ser iguales por == debido a
// la optimización del string pool, ¡pero no confíes en ello!`,
            caption: 'Siempre usa .equals() para comparar valores de String en Java',
          },
          callout: {
            type: 'warning',
            text: 'Usar == para comparar Strings en Java es un bug muy común. Tu IDE a menudo te advertirá, pero siempre usa .equals() para comparación de Strings.',
          },
        },
        {
          id: 'c3',
          title: 'Bucle for mejorado',
          explanation:
            'Java tiene un bucle estilo for-each para iterar colecciones, similar al bucle for...of de JavaScript.',
          codeExample: {
            javascript: `// JS: bucle for...of
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}`,
            java: `// Java: bucle for mejorado
String[] fruits = {"apple", "banana", "cherry"};
for (String fruit : fruits) {
  System.out.println(fruit);
}
// Nota: dos puntos (:) en lugar de "of"`,
            caption: 'El bucle for mejorado de Java usa dos puntos (:) donde JS usa "of"',
          },
        },
      ],
      predictOutputs: [
        {
          id: 'po1-3-1',
          code: `String a = "hello";
String b = new String("hello");
System.out.println(a == b);
System.out.println(a.equals(b));`,
          language: 'java',
          expectedOutput: 'false\ntrue',
          explanation: 'a == b es false porque == verifica igualdad de referencias — a y b son objetos diferentes en memoria. a.equals(b) es true porque .equals() verifica igualdad de contenido. ¡Siempre usa .equals() para Strings!',
          hint: 'Recuerda: == verifica si son el mismo objeto, .equals() verifica si tienen el mismo contenido.',
        },
        {
          id: 'po1-3-2',
          code: `int x = 10;
if (x > 5) {
  System.out.println("big");
} else {
  System.out.println("small");
}`,
          language: 'java',
          expectedOutput: 'big',
          explanation: 'x es 10, que es mayor que 5, así que se ejecuta la rama if e imprime "big". El if/else de Java funciona igual que JavaScript — la condición debe ser una expresión boolean.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: '¿Compilará este código Java? if (username) { System.out.println("logged in"); }',
          hint: 'Piensa en qué requiere Java dentro de los paréntesis del if()',
          answer: '¡No! Java requiere una expresión boolean. Escribe: if (username != null && !username.isEmpty()) — Java no convierte Strings a boolean como JS.',
        },
        {
          id: 'e2',
          prompt: 'Tienes dos variables String en Java: String s1 = "world"; String s2 = "world"; — ¿será s1 == s2 verdadero?',
          hint: 'Considera la optimización del string pool en Java',
          answer: 'Debido al string pooling, los literales de string con el mismo contenido a menudo comparten la misma referencia, así que s1 == s2 podría ser true — pero nunca debes confiar en esto. SIEMPRE usa s1.equals(s2) para una comparación de contenido confiable.',
        },
      ],
    },
    {
      id: 'lesson-1-4',
      moduleId: 'module-1',
      title: 'Arrays',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'Arrays de tamaño fijo',
          explanation:
            'Los arrays de Java tienen tamaño fijo — una vez creados, no puedes agregar ni eliminar elementos. A diferencia de los arrays de JavaScript que son dinámicos. Para arrays dinámicos en Java, usas ArrayList (cubierto en el Módulo 3).',
          codeExample: {
            javascript: `// Los arrays de JS son dinámicos
const nums = [1, 2, 3];
nums.push(4);        // ¡fácil!
nums.push(5, 6);     // también bien
console.log(nums.length); // 5`,
            java: `// Los arrays de Java tienen tamaño fijo
int[] nums = {1, 2, 3};
// nums ahora tiene permanentemente tamaño 3
// nums.push(4); // ¡NO EXISTE!

// Para crear un array vacío de tamaño 5:
int[] scores = new int[5];
scores[0] = 95;
scores[1] = 87;
System.out.println(nums.length); // 3`,
            caption: 'Los arrays de Java no pueden crecer ni reducirse — usa ArrayList para colecciones dinámicas',
          },
          callout: {
            type: 'info',
            text: 'En Java, los arrays usan .length (propiedad, sin paréntesis). Los Strings usan .length() (método, con paréntesis). ¡No los confundas!',
          },
          challenge: {
            id: 'ch1-4-1',
            type: 'fill-blank',
            prompt: 'Crea un array Java de 3 strings y accede al primer elemento:',
            code: `___BLANK_1___ names = {"Alice", "Bob", "Charlie"};
System.out.println(names[___BLANK_2___]);`,
            blanks: [
              { id: 'b1', expected: ['String[]'], hint: 'tipo de array' },
              { id: 'b2', expected: ['0'], hint: 'primer índice' },
            ],
            explanation: 'Los arrays Java usan sintaxis Tipo[] (ej. String[]) y son de índice cero como JavaScript. names[0] da "Alice".',
          },
        },
        {
          id: 'c2',
          title: 'Sintaxis de arrays e iteración',
          explanation:
            'La sintaxis de arrays en Java usa corchetes como JS, pero el tipo se declara antes de los corchetes. Puedes iterar con un bucle for tradicional o el bucle for-each mejorado.',
          codeExample: {
            javascript: `// Arrays en JS
const names = ["Alice", "Bob", "Charlie"];
console.log(names[0]);        // Alice
console.log(names.length);    // 3

names.forEach(name => {
  console.log(name);
});`,
            java: `// Arrays en Java
String[] names = {"Alice", "Bob", "Charlie"};
System.out.println(names[0]);       // Alice
System.out.println(names.length);   // 3

// Bucle for mejorado:
for (String name : names) {
  System.out.println(name);
}`,
            caption: 'La iteración de arrays en Java es similar a JS — el bucle for mejorado es el más común',
          },
        },
      ],
      predictOutputs: [
        {
          id: 'po1-4-1',
          code: `int[] nums = {10, 20, 30};
System.out.println(nums.length);
System.out.println(nums[1]);`,
          language: 'java',
          expectedOutput: '3\n20',
          explanation: 'El array tiene 3 elementos así que .length es 3. Los arrays son de índice cero, así que nums[1] es el segundo elemento: 20.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: '¿Cómo creas un array Java de 10 enteros, todos inicializados a 0?',
          hint: 'Usa la palabra clave "new" con el tipo y tamaño',
          answer: 'int[] scores = new int[10]; — Java inicializa automáticamente los arrays int a 0, los boolean a false y los arrays de objetos a null.',
        },
        {
          id: 'e2',
          prompt: 'En JS puedes hacer arr.length para obtener la longitud. ¿Qué hay de diferente al obtener la longitud en Java entre arrays y Strings?',
          hint: 'Uno es una propiedad, el otro es una llamada a método',
          answer: 'Arrays: arr.length (sin paréntesis — es una propiedad). Strings: str.length() (con paréntesis — es un método). ¡Esta inconsistencia es una peculiaridad conocida de Java!',
        },
      ],
    },
    {
      id: 'lesson-1-5',
      moduleId: 'module-1',
      title: 'Null y excepciones',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'null vs undefined',
          explanation:
            'Java tiene null (como JS) pero no tiene "undefined". En JS, acceder a una propiedad de undefined lanza un TypeError. En Java, llamar un método en null lanza NullPointerException (NPE) — el error más famoso de Java.',
          codeExample: {
            javascript: `// JS: tanto null como undefined
let x;           // undefined
let y = null;    // null

// JS no falla hasta que lo uses
console.log(x?.name);    // undefined (optional chaining)
console.log(y?.name);    // undefined (seguro)`,
            java: `// Java: solo null, sin undefined
String name = null;

// ¡Esto SÍ fallará en tiempo de ejecución!
// System.out.println(name.length()); // ¡NullPointerException!

// Enfoque seguro — verifica primero:
if (name != null) {
  System.out.println(name.length());
}`,
            caption: 'NullPointerException (NPE) es para Java lo que "Cannot read property of undefined" es para JS',
          },
          callout: {
            type: 'gotcha',
            text: 'NullPointerException es el error de tiempo de ejecución más común en Java. Siempre verifica null antes de llamar métodos en referencias a objetos.',
          },
        },
        {
          id: 'c2',
          title: 'Optional<T> — La respuesta de Java a la seguridad ante null',
          explanation:
            'Java 8 introdujo Optional<T> como forma de manejar explícitamente valores potencialmente ausentes, similar a "T | undefined" de TypeScript o optional chaining en JS.',
          codeExample: {
            javascript: `// JS/TS: valores opcionales
function findUser(id: number): User | undefined {
  return users.find(u => u.id === id);
}

const user = findUser(42);
const name = user?.name ?? "Unknown";`,
            java: `// Java: Optional<T>
Optional<String> maybeUser = findUser(42);

// Verifica si está presente
if (maybeUser.isPresent()) {
  System.out.println(maybeUser.get());
}

// O usa orElse (como ?? en JS):
String name = maybeUser.orElse("Unknown");

// Estilo moderno con ifPresent:
maybeUser.ifPresent(u -> System.out.println(u));`,
            caption: 'Optional<T> hace explícito cuando un valor puede estar ausente — sin sorpresas de null silenciosas',
          },
        },
        {
          id: 'c3',
          title: 'Excepciones try/catch',
          explanation:
            'El try/catch de Java es sintácticamente similar a JS. Una diferencia clave: Java tiene "excepciones verificadas" — algunos métodos te obligan a manejar excepciones en tiempo de compilación.',
          codeExample: {
            javascript: `// JS: try/catch
try {
  const data = JSON.parse(input);
  console.log(data.name);
} catch (error) {
  console.error("Parse failed:", error);
} finally {
  console.log("Always runs");
}`,
            java: `// Java: try/catch con excepciones tipadas
try {
  int result = Integer.parseInt(input);
  System.out.println(result);
} catch (NumberFormatException e) {
  System.err.println("Parse failed: " + e.getMessage());
} finally {
  System.out.println("Always runs");
}
// Nota: ¡capturas un tipo de excepción específico!`,
            caption: 'Los bloques catch de Java especifican el tipo de excepción — puedes tener múltiples bloques catch para diferentes errores',
          },
        },
      ],
      predictOutputs: [
        {
          id: 'po1-5-1',
          code: `try {
  int result = Integer.parseInt("abc");
  System.out.println(result);
} catch (NumberFormatException e) {
  System.out.println("Error!");
} finally {
  System.out.println("Done");
}`,
          language: 'java',
          expectedOutput: 'Error!\nDone',
          explanation: '"abc" no puede parsearse como entero, así que Integer.parseInt lanza NumberFormatException. El bloque catch imprime "Error!", luego el bloque finally siempre se ejecuta e imprime "Done". La línea result nunca se alcanza.',
          hint: 'Piensa en qué pasa cuando parseInt recibe un string no numérico.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: '¿Qué pasa cuando llamas un método en una variable null en Java vs acceder a una propiedad de undefined en JS?',
          hint: 'Piensa en cuándo ocurre el error — tiempo de compilación o ejecución',
          answer: '¡Ambos fallan en tiempo de ejecución! En JS: "TypeError: Cannot read properties of undefined". En Java: "NullPointerException". Ningún lenguaje te impide escribir el código — solo falla cuando se ejecuta.',
        },
        {
          id: 'e2',
          prompt: '¿Cómo se compara Optional<T> en Java con el operador || (OR) en JavaScript para proporcionar valores por defecto?',
          hint: 'Ambos proporcionan un valor de respaldo, pero ¿cómo difieren?',
          answer: 'Ambos proporcionan valores por defecto: JS: const name = user.name || "Unknown", Java: String name = optional.orElse("Unknown"). El Optional de Java es más explícito — te obliga a reconocer que el valor puede estar ausente. El || de JS también convierte valores falsy (como string vacío), mientras que Optional solo verifica null/ausente.',
        },
      ],
    },
  ],
};

export default module1;
