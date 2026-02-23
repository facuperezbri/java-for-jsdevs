import type { Module } from '../../../../types';
import project2 from '../projects/project-2.es';

const module2: Module = {
  id: 'module-2',
  order: 2,
  title: 'Programación orientada a objetos',
  subtitle: 'Clases, herencia e interfaces en Java',
  icon: '🏗️',
  accentColor: 'purple',
  quizId: 'quiz-2',
  project: project2,
  lessons: [
    {
      id: 'lesson-2-1',
      moduleId: 'module-2',
      title: 'Clases y objetos',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Sintaxis de clases',
          explanation: 'Las clases Java son similares a las de JavaScript pero más estructuradas. En Java, cada clase pública debe estar en su propio archivo con el mismo nombre. Los campos (propiedades) se declaran fuera de los constructores.',
          codeExample: {
            left: { label: 'JavaScript', language: 'javascript', code: `// Clase JS
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return \`Hi, I'm \${this.name}\`;
  }
}

const alice = new Person("Alice", 30);` },
            right: { label: 'Java', language: 'java', code: `// Clase Java (debe estar en Person.java)
public class Person {
  // Campos declarados a nivel de clase con tipos
  private String name;
  private int age;

  // Constructor
  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public String greet() {
    return "Hi, I'm " + name;
  }
}

Person alice = new Person("Alice", 30);` },
            caption: 'Los campos Java se declaran a nivel de clase con sus tipos — no dentro del constructor',
          },
          challenge: {
            id: 'ch2-1-1',
            type: 'fill-blank',
            prompt: 'Completa esta declaración de clase Java:',
            code: `public class Car {
  ___BLANK_1___ String make;
  ___BLANK_2___ int year;

  public Car(String make, int year) {
    ___BLANK_3___ = make;
    this.year = year;
  }
}`,
            blanks: [
              { id: 'b1', expected: ['private'], hint: 'modificador de acceso' },
              { id: 'b2', expected: ['private'], hint: 'modificador de acceso' },
              { id: 'b3', expected: ['this.make'], hint: 'asignar al campo' },
            ],
            explanation: 'Los campos Java típicamente son private (encapsulación). El constructor usa "this.fieldName = parameterName" para distinguir el campo del parámetro — mismo patrón que JavaScript.',
          },
        },
        {
          id: 'c2',
          title: 'Un archivo, una clase pública',
          explanation: 'En Java, una clase pública debe estar en un archivo con el nombre exacto (incluyendo mayúsculas). Esto es impuesto por el compilador.',
          codeExample: {
            left: { label: 'JavaScript', language: 'javascript', code: `// JS: pon cualquier cosa en cualquier archivo
// utils.js puede exportar múltiples clases
export class Dog { ... }
export class Cat { ... }
export class Animal { ... }` },
            right: { label: 'Java', language: 'java', code: `// Java: una clase pública por archivo
// Archivo: Dog.java
public class Dog { ... }

// Archivo: Cat.java
public class Cat { ... }

// (Puedes tener clases helper no públicas
// en el mismo archivo, pero es raro)` },
            caption: 'El nombre del archivo DEBE coincidir con el nombre de la clase pública — Dog.java contiene class Dog',
          },
          callout: {
            type: 'warning',
            text: 'Si tu clase se llama "Person" pero el archivo se llama "person.java" (p minúscula), Java se negará a compilar. ¡Las mayúsculas importan!',
          },
        },
      ],
      translationDrills: [
        {
          id: 'td2-1-1',
          sourceLabel: 'JavaScript',
          sourceCode: `class Dog {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }
}`,
          targetLabel: 'Java',
          targetTemplate: `public class Dog {
  ___SLOT_1___ String name;
  ___SLOT_2___ String breed;

  public Dog(___SLOT_3___ name, String breed) {
    ___SLOT_4___ = name;
    this.breed = breed;
  }
}`,
          slots: [
            { id: 'slot-1', expected: 'private' },
            { id: 'slot-2', expected: 'private' },
            { id: 'slot-3', expected: 'String' },
            { id: 'slot-4', expected: 'this.name' },
          ],
          tokenBank: ['private', 'private', 'String', 'this.name', 'public', 'let', 'name', 'var'],
          explanation: 'Los campos de clase Java se declaran a nivel de clase con modificadores de acceso (private) y tipos (String). El constructor usa this.field = param para asignar valores, igual que JavaScript.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'Tienes una clase Java llamada "ShoppingCart". ¿Cómo debe llamarse el archivo?',
          hint: 'El nombre del archivo debe coincidir exactamente con el nombre de la clase',
          answer: 'ShoppingCart.java — coincidencia exacta, sensible a mayúsculas. Si lo nombras shoppingCart.java o shopping_cart.java, el compilador lo rechazará.',
        },
        {
          id: 'e2',
          prompt: 'En JS puedes escribir "this.name = name" dentro del constructor. ¿Dónde declaras el campo name en Java?',
          hint: 'Los campos se declaran antes del constructor en Java',
          answer: 'A nivel de clase, antes del constructor: "String name;" — luego dentro del constructor sigues escribiendo "this.name = name" para asignarlo. La declaración y asignación son separadas en Java.',
        },
      ],
    },
    {
      id: 'lesson-2-2',
      moduleId: 'module-2',
      title: 'Modificadores de acceso',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'public, private, protected',
          explanation: 'Java tiene modificadores de acceso formales para controlar la visibilidad. JavaScript añadió campos privados de clase (#) recientemente, pero Java lo ha tenido desde el principio.',
          codeExample: {
            left: { label: 'JavaScript', language: 'javascript', code: `// Campos privados modernos en JS
class BankAccount {
  #balance = 0; // private

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}` },
            right: { label: 'Java', language: 'java', code: `// Modificadores de acceso en Java
public class BankAccount {
  private double balance = 0; // solo accesible en esta clase

  public void deposit(double amount) {
    balance += amount;
  }

  public double getBalance() {
    return balance;
  }
}` },
            caption: 'private = solo esta clase | public = todos | protected = esta clase + subclases',
          },
        },
        {
          id: 'c2',
          title: 'Getters y setters',
          explanation: 'En Java, es convencional hacer los campos private y exponerlos mediante métodos getter/setter públicos. Esto se llama "encapsulación".',
          codeExample: {
            left: { label: 'JavaScript', language: 'javascript', code: `// Getters/setters en JS
class Person {
  #name;

  get name() { return this.#name; }
  set name(val) {
    if (val.length > 0) this.#name = val;
  }
}` },
            right: { label: 'Java', language: 'java', code: `// Getters y setters en Java (convención)
public class Person {
  private String name;

  public String getName() {    // getter
    return name;
  }

  public void setName(String name) {  // setter
    if (name.length() > 0) {
      this.name = name;
    }
  }
}` },
            caption: 'Convención Java: métodos getName()/setName(), no palabras clave get/set',
          },
          callout: {
            type: 'tip',
            text: 'IDEs como IntelliJ pueden auto-generar getters y setters. En Java moderno, podrías usar "records" o Lombok para evitar el código repetitivo por completo.',
          },
        },
      ],
      predictOutputs: [
        {
          id: 'po2-2-1',
          code: `BankAccount account = new BankAccount();
account.deposit(100.0);
account.deposit(50.0);
System.out.println(account.getBalance());`,
          language: 'java',
          expectedOutput: '150.0',
          explanation: 'La cuenta empieza en 0, luego se depositan 100, luego 50. getBalance() retorna el total: 150.0. El campo privado balance solo puede modificarse a través del método deposit — eso es encapsulación.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: '¿Qué modificador de acceso usarías para un método auxiliar que solo la clase misma debería llamar?',
          hint: 'Piensa en el nivel de acceso más restrictivo',
          answer: 'private — "private void helperMethod() {...}" — los métodos private son invisibles fuera de la clase, perfectos para detalles de implementación internos.',
        },
        {
          id: 'e2',
          prompt: '¿Por qué los desarrolladores Java usan campos private + getters públicos en lugar de solo hacer los campos public?',
          hint: 'Piensa en qué puedes hacer en un setter que no puedes con acceso directo al campo',
          answer: '¡Encapsulación! Con un setter puedes agregar validación (ej. rechazar edades negativas), logging, o cambiar la representación interna después sin romper los llamadores. El acceso directo al campo es un atajo que sacrifica control.',
        },
      ],
    },
    {
      id: 'lesson-2-3',
      moduleId: 'module-2',
      title: 'Herencia',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'extends y super()',
          explanation: 'La herencia en Java funciona similar a la herencia de clases en JavaScript, usando la palabra clave "extends". Una diferencia clave: si la clase padre tiene constructor, el hijo debe llamar super() como primera línea.',
          codeExample: {
            left: { label: 'JavaScript', language: 'javascript', code: `class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return \`\${this.name} makes a sound\`;
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // llamar constructor padre
  }
  speak() {
    return \`\${this.name} barks!\`;
  }
}` },
            right: { label: 'Java', language: 'java', code: `public class Animal {
  protected String name;

  public Animal(String name) {
    this.name = name;
  }

  public String speak() {
    return name + " makes a sound";
  }
}

public class Dog extends Animal {
  public Dog(String name) {
    super(name); // ¡DEBE ser la primera línea!
  }

  @Override
  public String speak() {
    return name + " barks!";
  }
}` },
            caption: 'Java usa la anotación @Override para marcar explícitamente métodos sobrescritos',
          },
          challenge: {
            id: 'ch2-3-1',
            type: 'fill-blank',
            prompt: 'Completa esta clase Cat que extiende Animal:',
            code: `public class Cat ___BLANK_1___ Animal {
  public Cat(String name) {
    ___BLANK_2___;
  }

  ___BLANK_3___
  public String speak() {
    return name + " meows!";
  }
}`,
            blanks: [
              { id: 'b1', expected: ['extends'], hint: 'palabra clave de herencia' },
              { id: 'b2', expected: ['super(name)'], hint: 'llamar constructor padre' },
              { id: 'b3', expected: ['@Override'], hint: 'anotación para sobrescribir' },
            ],
            explanation: '"extends" establece la relación de herencia. super(name) debe ser la primera línea para llamar al constructor padre. @Override es una verificación de seguridad en tiempo de compilación que asegura que realmente estás sobrescribiendo un método padre.',
          },
        },
        {
          id: 'c2',
          title: 'Anotación @Override',
          explanation: 'La anotación @Override le dice al compilador "este método debería sobrescribir un método padre". Si no coincide con ningún método padre, el compilador lanza un error — ayudando a detectar typos temprano.',
          codeExample: {
            left: { label: 'JavaScript', language: 'javascript', code: `// JS: sobrescritura silenciosa, sin advertencia
class Dog extends Animal {
  speek() { // ¡typo! pero JS no se queja
    return "bark";
  }
}

const d = new Dog("Rex");
d.speak(); // llama Animal.speak(), ¡no Dog.speek()!` },
            right: { label: 'Java', language: 'java', code: `// Java: @Override detecta errores
class Dog extends Animal {
  @Override
  public String speek() { // ¡ERROR DE COMPILACIÓN!
    // "speek" no coincide con ningún método padre
    return "bark";
  }

  @Override
  public String speak() { // ¡correcto!
    return "bark";
  }
}` },
            caption: '@Override es opcional pero muy recomendado — detecta typos en tiempo de compilación',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: '¿Por qué se recomienda @Override aunque sea opcional?',
          hint: 'Piensa en qué pasa si escribes mal el nombre del método',
          answer: '@Override actúa como verificación de seguridad en tiempo de compilación. Sin él, un typo como "toSting()" crearía silenciosamente un método nuevo en lugar de sobrescribir "toString()". Con @Override, el compilador lo rechaza inmediatamente.',
        },
        {
          id: 'e2',
          prompt: '¿Puede una clase Java extender múltiples clases? (ej. class C extends A, B)',
          hint: 'Esta es una pregunta común sobre Java vs C++',
          answer: '¡No! Java solo soporta herencia simple de clases. Una clase solo puede extender UNA clase padre. Para lograr comportamiento de múltiples tipos, usa interfaces (siguiente lección). Esto evita el "problema del diamante" que crea la herencia múltiple.',
        },
      ],
    },
    {
      id: 'lesson-2-4',
      moduleId: 'module-2',
      title: 'Interfaces y clases abstractas',
      estimatedMinutes: 14,
      concepts: [
        {
          id: 'c1',
          title: 'Interfaces — Como las de TypeScript, pero con implementación',
          explanation: 'Las interfaces Java son similares a las de TypeScript pero también pueden contener implementaciones de métodos por defecto (desde Java 8). Una clase "implementa" una interfaz y puede implementar múltiples interfaces.',
          codeExample: {
            left: { label: 'JavaScript', language: 'javascript', code: `// Interfaz TypeScript (contrato puro)
interface Drawable {
  draw(): void;
  getColor(): string;
}

class Circle implements Drawable {
  draw() { console.log("Drawing circle"); }
  getColor() { return "red"; }
}` },
            right: { label: 'Java', language: 'java', code: `// Interfaz Java
public interface Drawable {
  void draw();           // abstracto (sin cuerpo)
  String getColor();     // abstracto

  // método default (Java 8+):
  default void highlight() {
    System.out.println("Highlighting " + getColor());
  }
}

public class Circle implements Drawable {
  public void draw() { System.out.println("Drawing circle"); }
  public String getColor() { return "red"; }
}` },
            caption: 'Las interfaces Java pueden tener implementaciones por defecto — a diferencia de las de TypeScript',
          },
        },
        {
          id: 'c2',
          title: 'Clases abstractas',
          explanation: 'Una clase abstracta es un término medio: puede tener tanto métodos completamente implementados como métodos abstractos (no implementados). A diferencia de las interfaces, las clases abstractas pueden tener estado (campos).',
          codeExample: {
            left: { label: 'JavaScript', language: 'javascript', code: `// JS no tiene clases abstractas nativamente
// Convención: lanzar Error para métodos no implementados
class Shape {
  area() {
    throw new Error("Must implement area()");
  }
  describe() {
    return \`Area: \${this.area()}\`;
  }
}` },
            right: { label: 'Java', language: 'java', code: `// Clase abstracta Java
public abstract class Shape {
  private String color;

  public Shape(String color) {
    this.color = color;
  }

  // abstracto: DEBE ser sobrescrito
  public abstract double area();

  // concreto: heredado tal cual
  public String describe() {
    return "Area: " + area() + ", Color: " + color;
  }
}

public class Circle extends Shape {
  private double radius;
  public Circle(double r) { super("red"); radius = r; }

  @Override
  public double area() { return Math.PI * radius * radius; }
}` },
            caption: 'Las clases abstractas pueden mezclar métodos concretos y abstractos — no puedes instanciarlas directamente',
          },
        },
      ],
      predictOutputs: [
        {
          id: 'po2-4-1',
          code: `Circle c = new Circle(5.0);
System.out.println(c.getColor());
c.draw();
c.highlight();`,
          language: 'java',
          expectedOutput: 'red\nDrawing circle\nHighlighting red',
          explanation: 'getColor() retorna "red". draw() imprime "Drawing circle". highlight() es un método default de la interfaz Drawable — llama getColor() internamente e imprime "Highlighting red".',
          hint: 'El método highlight() se hereda de la interfaz y llama getColor().',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: '¿Cuándo usarías una interfaz vs una clase abstracta en Java?',
          hint: 'Piensa en "qué puede hacer algo" vs "qué es algo"',
          answer: 'Interfaz: capacidad "puede-hacer" (Runnable, Comparable, Serializable) — usa cuando clases no relacionadas comparten comportamiento. Clase abstracta: relación "es-un" — usa cuando tienes un tipo base con estado/lógica compartida (Shape → Circle/Rectangle). También: una clase puede implementar muchas interfaces pero extender solo una clase abstracta.',
        },
        {
          id: 'e2',
          prompt: '¿Cómo difiere una interfaz Java con métodos default de una interfaz TypeScript?',
          hint: 'Las interfaces TypeScript son puramente estructurales',
          answer: 'Las interfaces TypeScript son solo en tiempo de compilación (se borran en runtime) y no pueden tener cuerpos de métodos. Las interfaces Java son objetos reales en runtime y pueden incluir implementaciones de métodos default desde Java 8. Las interfaces Java también soportan métodos estáticos y constantes.',
        },
      ],
    },
    {
      id: 'lesson-2-5',
      moduleId: 'module-2',
      title: 'Introducción a genéricos',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'Parámetros de tipo',
          explanation: 'Los genéricos te permiten escribir clases y métodos que funcionan con cualquier tipo manteniendo seguridad de tipos. Lo has visto en TypeScript — los genéricos de Java funcionan igual.',
          codeExample: {
            left: { label: 'JavaScript', language: 'javascript', code: `// Genéricos TypeScript
function firstItem<T>(arr: T[]): T | undefined {
  return arr[0];
}

const num = firstItem([1, 2, 3]);     // number
const str = firstItem(["a", "b"]);    // string` },
            right: { label: 'Java', language: 'java', code: `// Genéricos Java
public static <T> T firstItem(T[] arr) {
  if (arr.length == 0) return null;
  return arr[0];
}

Integer num = firstItem(new Integer[]{1, 2, 3});
String str = firstItem(new String[]{"a", "b"});` },
            caption: 'La sintaxis de genéricos Java es casi idéntica a TypeScript — <T> es el parámetro de tipo',
          },
          challenge: {
            id: 'ch2-5-1',
            type: 'fill-blank',
            prompt: 'Completa esta clase genérica Pair:',
            code: `public class Pair___BLANK_1___ {
  private T first;
  private T second;

  public Pair(T first, ___BLANK_2___ second) {
    this.first = first;
    this.second = second;
  }

  public T ___BLANK_3___() { return first; }
}`,
            blanks: [
              { id: 'b1', expected: ['<T>'], hint: 'parámetro de tipo' },
              { id: 'b2', expected: ['T'], hint: 'mismo tipo' },
              { id: 'b3', expected: ['getFirst'], hint: 'nombre del getter' },
            ],
            explanation: 'Las clases genéricas usan <T> después del nombre de la clase. El parámetro de tipo T se usa para campos, parámetros del constructor y tipos de retorno. Esto asegura seguridad de tipos: Pair<String> solo contiene Strings.',
          },
        },
        {
          id: 'c2',
          title: 'Clases genéricas',
          explanation: 'Puedes hacer clases enteras genéricas. Así funcionan ArrayList<T>, Optional<T> y otras colecciones Java.',
          codeExample: {
            left: { label: 'JavaScript', language: 'javascript', code: `// Clase genérica TypeScript
class Box<T> {
  private value: T;
  constructor(val: T) { this.value = val; }
  getValue(): T { return this.value; }
}

const numBox = new Box<number>(42);
const strBox = new Box<string>("hello");` },
            right: { label: 'Java', language: 'java', code: `// Clase genérica Java
public class Box<T> {
  private T value;

  public Box(T value) { this.value = value; }

  public T getValue() { return value; }
}

Box<Integer> numBox = new Box<>(42);    // inferencia diamante
Box<String> strBox = new Box<>("hello");

Integer n = numBox.getValue(); // ¡seguro en tipos!` },
            caption: 'El operador diamante <> permite que Java infiera el tipo del contexto',
          },
          callout: {
            type: 'info',
            text: 'Los genéricos Java usan letras mayúsculas por convención: T (Type), E (Element), K (Key), V (Value), N (Number). Los verás en la biblioteca estándar.',
          },
        },
        {
          id: 'c3',
          title: 'Records (Java 16+)',
          explanation:
            'Los records de Java son clases de datos inmutables que auto-generan el constructor, getters, equals(), hashCode() y toString(). Son ideales para DTOs y objetos de valor — similar a los tipos/interfaces de TypeScript.',
          codeExample: {
            left: { label: 'JavaScript', language: 'javascript', code: `// TypeScript: tipo de datos simple
type Point = { x: number; y: number };
const p: Point = { x: 10, y: 20 };
console.log(p.x);   // 10

// O con una clase:
class Point {
  constructor(public x: number, public y: number) {}
}` },
            right: { label: 'Java', language: 'java', code: `// Java record — ¡una línea!
record Point(int x, int y) {}

// Auto-genera: constructor, getters, equals, hashCode, toString
Point p = new Point(10, 20);
System.out.println(p.x());     // 10 (getter, no campo)
System.out.println(p);          // Point[x=10, y=20]

// Los records son inmutables — sin setters
// p.x = 30; // ERROR DE COMPILACIÓN

// ¡Equivalente a escribir 50+ líneas de código de clase!` },
            caption: 'Los records eliminan código repetitivo — una línea reemplaza constructor, getters, equals, hashCode, toString',
          },
          callout: {
            type: 'tip',
            text: 'Usa records para DTOs, respuestas de API y cualquier clase de "solo datos". Usa clases regulares cuando necesites mutabilidad, herencia o lógica personalizada más allá de contener datos simples.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: '¿Cuál es la diferencia entre Box<Object> y Box<T> en Java?',
          hint: 'Piensa en qué pasa cuando llamas getValue() en cada uno',
          answer: 'Box<Object>.getValue() retorna Object — tendrías que hacer cast manualmente y podrías obtener ClassCastException en runtime. Box<T> es seguro en tipos: Box<String>.getValue() retorna String directamente. Los genéricos detectan incompatibilidades de tipos en tiempo de compilación, no en runtime.',
        },
        {
          id: 'e2',
          prompt: '¿Puedes poner un int (primitivo) directamente en un Box<int>? ¿Como new Box<int>(42)?',
          hint: 'Recuerda la distinción de Java entre primitivos y objetos',
          answer: '¡No! Los genéricos Java solo funcionan con tipos referencia (objetos), no primitivos. Usa la clase wrapper: Box<Integer> (I mayúscula). Java convertirá automáticamente "int" a "Integer" en la mayoría de casos (autoboxing), pero el parámetro de tipo debe ser Integer, no int.',
        },
      ],
    },
    {
      id: 'lesson-2-6',
      moduleId: 'module-2',
      title: 'Enums',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Enums básicos',
          explanation:
            'Los enums de Java definen un conjunto fijo de constantes — como los objetos "as const" o union types de TypeScript, pero con seguridad de tipos y más poderosos.',
          codeExample: {
            left: { label: 'JavaScript', language: 'javascript', code: `// TypeScript: union type o const object
type Color = "RED" | "GREEN" | "BLUE";

// o:
const Color = {
  RED: "RED",
  GREEN: "GREEN",
  BLUE: "BLUE",
} as const;

let c: Color = "RED";
// c = "PURPLE"; // error TS` },
            right: { label: 'Java', language: 'java', code: `// Enum Java
enum Color {
  RED, GREEN, BLUE
}

Color c = Color.RED;
// c = "RED";     // ERROR DE COMPILACIÓN — ¡no es un String!
// c = Color.PURPLE; // ERROR DE COMPILACIÓN — ¡no existe!

System.out.println(c);            // RED
System.out.println(c.name());     // "RED" (String)
System.out.println(c.ordinal());  // 0 (índice)` },
            caption: 'Los enums Java son constantes con seguridad de tipos — no strings, no ints, sino su propio tipo',
          },
          challenge: {
            id: 'ch2-6-1',
            type: 'fill-blank',
            prompt: 'Declara un enum Java para tallas de camiseta:',
            code: `___BLANK_1___ Size {
  ___BLANK_2___, MEDIUM, LARGE, XL
}

Size mySize = ___BLANK_3___;`,
            blanks: [
              { id: 'b1', expected: ['enum'], hint: 'palabra clave enum' },
              { id: 'b2', expected: ['SMALL'], hint: 'primera constante' },
              { id: 'b3', expected: ['Size.MEDIUM', 'Size.SMALL', 'Size.LARGE', 'Size.XL'], hint: 'NombreEnum.VALOR' },
            ],
            explanation: 'Los enums se declaran con la palabra clave "enum". Las constantes son MAYÚSCULAS por convención. Se acceden como NombreEnum.VALOR — ¡no son strings!',
          },
        },
        {
          id: 'c2',
          title: 'Enums con campos y métodos',
          explanation:
            'A diferencia de TypeScript, los enums de Java pueden tener constructores, campos y métodos. Cada constante es en realidad una instancia de la clase enum — haciéndolos sorprendentemente poderosos.',
          codeExample: {
            left: { label: 'JavaScript', language: 'javascript', code: `// TypeScript: parecido a enum con datos
const HttpStatus = {
  OK: { code: 200, message: "OK" },
  NOT_FOUND: { code: 404, message: "Not Found" },
  ERROR: { code: 500, message: "Server Error" },
} as const;

console.log(HttpStatus.OK.code); // 200` },
            right: { label: 'Java', language: 'java', code: `// Enum Java con campos y métodos
enum HttpStatus {
  OK(200, "OK"),
  NOT_FOUND(404, "Not Found"),
  ERROR(500, "Server Error");

  private final int code;
  private final String message;

  HttpStatus(int code, String message) {
    this.code = code;
    this.message = message;
  }

  public int getCode() { return code; }
  public String getMessage() { return message; }
}

System.out.println(HttpStatus.OK.getCode());      // 200
System.out.println(HttpStatus.NOT_FOUND.getMessage()); // Not Found` },
            caption: 'Los enums Java pueden contener datos y comportamiento — cada constante es una instancia de objeto',
          },
        },
        {
          id: 'c3',
          title: 'Enums con Switch',
          explanation:
            'Los enums se combinan naturalmente con sentencias switch. El compilador puede incluso advertirte si olvidas manejar un caso — algo que las verificaciones exhaustivas de TypeScript también hacen.',
          codeExample: {
            left: { label: 'JavaScript', language: 'javascript', code: `// TypeScript switch exhaustivo
type Season = "SPRING" | "SUMMER" | "FALL" | "WINTER";

function describe(s: Season): string {
  switch (s) {
    case "SPRING": return "Flowers blooming";
    case "SUMMER": return "Beach time";
    case "FALL": return "Leaves falling";
    case "WINTER": return "Snow!";
  }
}` },
            right: { label: 'Java', language: 'java', code: `// Java enum + switch
enum Season { SPRING, SUMMER, FALL, WINTER }

String describe(Season s) {
  return switch (s) {
    case SPRING -> "Flowers blooming";
    case SUMMER -> "Beach time";
    case FALL -> "Leaves falling";
    case WINTER -> "Snow!";
    // ¡el compilador advierte si falta un caso!
  };
}` },
            caption: 'Switch con enums da verificación de exhaustividad en compilación — el compilador detecta casos faltantes',
          },
        },
      ],
      translationDrills: [
        {
          id: 'td2-6-1',
          sourceLabel: 'JavaScript',
          sourceCode: `const Priority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
};`,
          targetLabel: 'Java',
          targetTemplate: `___SLOT_1___ Priority {
  ___SLOT_2___, ___SLOT_3___, ___SLOT_4___
}`,
          slots: [
            { id: 'slot-1', expected: 'enum' },
            { id: 'slot-2', expected: 'LOW' },
            { id: 'slot-3', expected: 'MEDIUM' },
            { id: 'slot-4', expected: 'HIGH' },
          ],
          tokenBank: ['enum', 'LOW', 'MEDIUM', 'HIGH', 'class', 'const', 'type', 'interface'],
          explanation: 'Los enums Java usan la palabra clave "enum" y listan constantes sin valores. A diferencia de los objetos const de TypeScript, las constantes de enum Java son su propio tipo — no strings.',
        },
      ],
      predictOutputs: [
        {
          id: 'po2-6-1',
          code: `enum Day { MON, TUE, WED, THU, FRI, SAT, SUN }

Day d = Day.WED;
System.out.println(d);
System.out.println(d.ordinal());
System.out.println(d.name().toLowerCase());`,
          language: 'java',
          expectedOutput: 'WED\n2\nwed',
          explanation: 'println(d) imprime "WED" (el nombre de la constante). ordinal() retorna el índice base-0: MON=0, TUE=1, WED=2. name() retorna "WED" como String, y toLowerCase() lo convierte a "wed".',
          hint: 'ordinal() es base cero. name() retorna el nombre de la constante como String.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: '¿Cuándo usarías un enum Java en lugar de constantes String (como static final String RED = "RED")?',
          hint: 'Piensa en seguridad de tipos y qué puede verificar el compilador',
          answer: 'Los enums son seguros en tipos: un método que acepta Color solo puede recibir Color.RED/GREEN/BLUE — no cualquier String aleatorio. Con constantes String, podrías pasar "PURPLE" y el compilador no lo detectaría. Los enums también funcionan con verificación de exhaustividad en switch, tienen name()/ordinal() integrados, y pueden contener datos y métodos.',
        },
        {
          id: 'e2',
          prompt: '¿Pueden los enums Java implementar interfaces? ¿Cómo sería útil?',
          hint: 'Piensa en enums con comportamiento',
          answer: '¡Sí! Cada constante de enum puede implementar métodos de interfaz de forma diferente. Ejemplo: enum Operation implements Calculator { ADD { double calc(a,b) { return a+b; } }, SUBTRACT { ... } }. Esta es la versión Java del patrón strategy con enums — muy poderoso y seguro en tipos.',
        },
      ],
    },
  ],
};

export default module2;
