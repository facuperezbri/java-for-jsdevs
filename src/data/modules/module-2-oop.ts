import type { Module } from '../../types';
import project2 from '../projects/project-2';

const module2: Module = {
  id: 'module-2',
  order: 2,
  title: 'Object-Oriented Programming',
  subtitle: 'Classes, inheritance, and interfaces in Java',
  icon: '🏗️',
  accentColor: 'purple',
  quizId: 'quiz-2',
  project: project2,
  lessons: [
    {
      id: 'lesson-2-1',
      moduleId: 'module-2',
      title: 'Classes & Objects',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Class Syntax',
          explanation: 'Java classes are similar to JavaScript classes but more structured. In Java, each public class must be in its own file with the same name. Fields (properties) are declared outside constructors.',
          codeExample: {
            javascript: `// JS class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return \`Hi, I'm \${this.name}\`;
  }
}

const alice = new Person("Alice", 30);`,
            java: `// Java class (must be in Person.java)
public class Person {
  // Fields declared at class level with types
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

Person alice = new Person("Alice", 30);`,
            caption: 'Java fields are declared at the class level with their types — not inside the constructor',
          },
          challenge: {
            id: 'ch2-1-1',
            type: 'fill-blank',
            prompt: 'Complete this Java class declaration:',
            code: `public class Car {
  ___BLANK_1___ String make;
  ___BLANK_2___ int year;

  public Car(String make, int year) {
    ___BLANK_3___ = make;
    this.year = year;
  }
}`,
            blanks: [
              { id: 'b1', expected: ['private'], hint: 'access modifier' },
              { id: 'b2', expected: ['private'], hint: 'access modifier' },
              { id: 'b3', expected: ['this.make'], hint: 'assign to field' },
            ],
            explanation: 'Java fields are typically private (encapsulation). The constructor uses "this.fieldName = parameterName" to distinguish the field from the parameter — same pattern as JavaScript.',
          },
        },
        {
          id: 'c2',
          title: 'One File, One Public Class',
          explanation: 'In Java, a public class must be in a file with the exact same name (including capitalization). This is enforced by the compiler.',
          codeExample: {
            javascript: `// JS: put anything in any file
// utils.js can export multiple classes
export class Dog { ... }
export class Cat { ... }
export class Animal { ... }`,
            java: `// Java: one public class per file
// File: Dog.java
public class Dog { ... }

// File: Cat.java
public class Cat { ... }

// (You can have non-public helper classes
// in the same file, but that's rare)`,
            caption: 'File name MUST match the public class name — Dog.java contains class Dog',
          },
          callout: {
            type: 'warning',
            text: 'If your class is named "Person" but the file is named "person.java" (lowercase p), Java will refuse to compile. Case matters!',
          },
        },
      ],
      translationDrills: [
        {
          id: 'td2-1-1',
          jsCode: `class Dog {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }
}`,
          javaTemplate: `public class Dog {
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
          explanation: 'Java class fields are declared at the class level with access modifiers (private) and types (String). The constructor uses this.field = param to assign values, just like JavaScript.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'You have a Java class called "ShoppingCart". What must the file be named?',
          hint: 'The file name must exactly match the class name',
          answer: 'ShoppingCart.java — exact match, case-sensitive. If you name it shoppingCart.java or shopping_cart.java, the compiler will reject it.',
        },
        {
          id: 'e2',
          prompt: 'In JS, you can write "this.name = name" inside the constructor. Where do you declare the name field in Java?',
          hint: 'Fields are declared before the constructor in Java',
          answer: 'At the class level, before the constructor: "String name;" — then inside the constructor you still write "this.name = name" to assign it. The declaration and assignment are separate in Java.',
        },
      ],
    },
    {
      id: 'lesson-2-2',
      moduleId: 'module-2',
      title: 'Access Modifiers',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'public, private, protected',
          explanation: 'Java has formal access modifiers to control visibility. JavaScript added private class fields (#) recently, but Java has had this since the beginning.',
          codeExample: {
            javascript: `// Modern JS private fields
class BankAccount {
  #balance = 0; // private

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}`,
            java: `// Java access modifiers
public class BankAccount {
  private double balance = 0; // only accessible in this class

  public void deposit(double amount) {
    balance += amount;
  }

  public double getBalance() {
    return balance;
  }
}`,
            caption: 'private = only this class | public = everyone | protected = this class + subclasses',
          },
        },
        {
          id: 'c2',
          title: 'Getters & Setters',
          explanation: 'In Java, it\'s conventional to make fields private and expose them via public getter/setter methods. This is called "encapsulation".',
          codeExample: {
            javascript: `// JS getters/setters
class Person {
  #name;

  get name() { return this.#name; }
  set name(val) {
    if (val.length > 0) this.#name = val;
  }
}`,
            java: `// Java getters and setters (convention)
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
}`,
            caption: 'Java convention: getName()/setName() methods, not get/set keywords',
          },
          callout: {
            type: 'tip',
            text: 'IDEs like IntelliJ can auto-generate getters and setters. In modern Java, you might use "records" or Lombok to avoid boilerplate entirely.',
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
          explanation: 'The account starts at 0, then 100 is deposited, then 50. getBalance() returns the total: 150.0. The private balance field can only be modified through the deposit method — that\'s encapsulation.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'What access modifier would you use for a helper method that only the class itself should call?',
          hint: 'Think about the most restrictive access level',
          answer: 'private — "private void helperMethod() {...}" — private methods are invisible outside the class, perfect for internal implementation details.',
        },
        {
          id: 'e2',
          prompt: 'Why do Java developers use private fields + public getters instead of just making fields public?',
          hint: 'Think about what you can do in a setter that you can\'t do with direct field access',
          answer: 'Encapsulation! With a setter, you can add validation (e.g., reject negative ages), logging, or change the internal representation later without breaking callers. Direct field access is a shortcut that sacrifices control.',
        },
      ],
    },
    {
      id: 'lesson-2-3',
      moduleId: 'module-2',
      title: 'Inheritance',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'extends and super()',
          explanation: 'Java inheritance works similarly to JavaScript class inheritance, using the "extends" keyword. A key difference: if the parent class has a constructor, the child must call super() as the first line.',
          codeExample: {
            javascript: `class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return \`\${this.name} makes a sound\`;
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // call parent constructor
  }
  speak() {
    return \`\${this.name} barks!\`;
  }
}`,
            java: `public class Animal {
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
    super(name); // MUST be first line!
  }

  @Override
  public String speak() {
    return name + " barks!";
  }
}`,
            caption: 'Java uses @Override annotation to explicitly mark overridden methods',
          },
          challenge: {
            id: 'ch2-3-1',
            type: 'fill-blank',
            prompt: 'Complete this Cat class that extends Animal:',
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
              { id: 'b1', expected: ['extends'], hint: 'inheritance keyword' },
              { id: 'b2', expected: ['super(name)'], hint: 'call parent constructor' },
              { id: 'b3', expected: ['@Override'], hint: 'annotation for overriding' },
            ],
            explanation: '"extends" establishes the inheritance relationship. super(name) must be the first line to call the parent constructor. @Override is a compile-time safety check ensuring you\'re actually overriding a parent method.',
          },
        },
        {
          id: 'c2',
          title: '@Override Annotation',
          explanation: 'The @Override annotation tells the compiler "this method should override a parent method". If it doesn\'t match any parent method, the compiler throws an error — helping catch typos early.',
          codeExample: {
            javascript: `// JS: silent override, no warning
class Dog extends Animal {
  speek() { // typo! but JS won't complain
    return "bark";
  }
}

const d = new Dog("Rex");
d.speak(); // calls Animal.speak(), not Dog.speek()!`,
            java: `// Java: @Override catches mistakes
class Dog extends Animal {
  @Override
  public String speek() { // COMPILE ERROR!
    // "speek" doesn't match any parent method
    return "bark";
  }

  @Override
  public String speak() { // correct!
    return "bark";
  }
}`,
            caption: '@Override is optional but highly recommended — it catches typos at compile time',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'Why is @Override recommended even though it\'s optional?',
          hint: 'Think about what happens if you misspell the method name',
          answer: '@Override acts as a compile-time safety check. Without it, a typo like "toSting()" would silently create a new method instead of overriding "toString()". With @Override, the compiler rejects it immediately.',
        },
        {
          id: 'e2',
          prompt: 'Can a Java class extend multiple classes? (e.g., class C extends A, B)',
          hint: 'This is a common question about Java vs C++',
          answer: 'No! Java only supports single inheritance for classes. A class can only extend ONE parent class. To achieve multiple-type behavior, use interfaces (next lesson). This avoids the "diamond problem" that multiple inheritance creates.',
        },
      ],
    },
    {
      id: 'lesson-2-4',
      moduleId: 'module-2',
      title: 'Interfaces & Abstract Classes',
      estimatedMinutes: 14,
      concepts: [
        {
          id: 'c1',
          title: 'Interfaces — Like TypeScript interfaces, but with implementation',
          explanation: 'Java interfaces are similar to TypeScript interfaces but can also contain default method implementations (since Java 8). A class "implements" an interface and can implement multiple interfaces.',
          codeExample: {
            javascript: `// TypeScript interface (pure contract)
interface Drawable {
  draw(): void;
  getColor(): string;
}

class Circle implements Drawable {
  draw() { console.log("Drawing circle"); }
  getColor() { return "red"; }
}`,
            java: `// Java interface
public interface Drawable {
  void draw();           // abstract (no body)
  String getColor();     // abstract

  // default method (Java 8+):
  default void highlight() {
    System.out.println("Highlighting " + getColor());
  }
}

public class Circle implements Drawable {
  public void draw() { System.out.println("Drawing circle"); }
  public String getColor() { return "red"; }
}`,
            caption: 'Java interfaces can have default implementations — unlike TypeScript interfaces',
          },
        },
        {
          id: 'c2',
          title: 'Abstract Classes',
          explanation: 'An abstract class is a middle ground: it can have both fully-implemented methods and abstract (unimplemented) methods. Unlike interfaces, abstract classes can have state (fields).',
          codeExample: {
            javascript: `// JS doesn't have abstract classes natively
// Convention: throw Error for unimplemented methods
class Shape {
  area() {
    throw new Error("Must implement area()");
  }
  describe() {
    return \`Area: \${this.area()}\`;
  }
}`,
            java: `// Java abstract class
public abstract class Shape {
  private String color;

  public Shape(String color) {
    this.color = color;
  }

  // abstract: MUST be overridden
  public abstract double area();

  // concrete: inherited as-is
  public String describe() {
    return "Area: " + area() + ", Color: " + color;
  }
}

public class Circle extends Shape {
  private double radius;
  public Circle(double r) { super("red"); radius = r; }

  @Override
  public double area() { return Math.PI * radius * radius; }
}`,
            caption: 'Abstract classes can mix concrete and abstract methods — you cannot instantiate them directly',
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
          explanation: 'getColor() returns "red". draw() prints "Drawing circle". highlight() is a default method from the Drawable interface — it calls getColor() internally and prints "Highlighting red".',
          hint: 'The highlight() method is inherited from the interface and calls getColor().',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'When would you use an interface vs an abstract class in Java?',
          hint: 'Think about "what a thing can do" vs "what a thing is"',
          answer: 'Interface: "can-do" capability (Runnable, Comparable, Serializable) — use when multiple unrelated classes share behavior. Abstract class: "is-a" relationship — use when you have a base type with shared state/logic (Shape → Circle/Rectangle). Also: a class can implement many interfaces but extends only one abstract class.',
        },
        {
          id: 'e2',
          prompt: 'How does a Java interface with default methods differ from a TypeScript interface?',
          hint: 'TypeScript interfaces are purely structural',
          answer: 'TypeScript interfaces are compile-time only (erased at runtime) and can\'t have method bodies. Java interfaces are real runtime objects and can include default method implementations since Java 8. Java interfaces also support static methods and constants.',
        },
      ],
    },
    {
      id: 'lesson-2-5',
      moduleId: 'module-2',
      title: 'Generics Introduction',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'Type Parameters',
          explanation: 'Generics let you write classes and methods that work with any type while keeping type safety. You\'ve seen this in TypeScript — Java generics work the same way.',
          codeExample: {
            javascript: `// TypeScript generics
function firstItem<T>(arr: T[]): T | undefined {
  return arr[0];
}

const num = firstItem([1, 2, 3]);     // number
const str = firstItem(["a", "b"]);    // string`,
            java: `// Java generics
public static <T> T firstItem(T[] arr) {
  if (arr.length == 0) return null;
  return arr[0];
}

Integer num = firstItem(new Integer[]{1, 2, 3});
String str = firstItem(new String[]{"a", "b"});`,
            caption: 'Java generic syntax is nearly identical to TypeScript — <T> is the type parameter',
          },
          challenge: {
            id: 'ch2-5-1',
            type: 'fill-blank',
            prompt: 'Complete this generic Pair class:',
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
              { id: 'b1', expected: ['<T>'], hint: 'type parameter' },
              { id: 'b2', expected: ['T'], hint: 'same type' },
              { id: 'b3', expected: ['getFirst'], hint: 'getter name' },
            ],
            explanation: 'Generic classes use <T> after the class name. The type parameter T is used for fields, constructor parameters, and return types. This ensures type safety: Pair<String> only holds Strings.',
          },
        },
        {
          id: 'c2',
          title: 'Generic Classes',
          explanation: 'You can make entire classes generic. This is how ArrayList<T>, Optional<T>, and other Java collections work.',
          codeExample: {
            javascript: `// TypeScript generic class
class Box<T> {
  private value: T;
  constructor(val: T) { this.value = val; }
  getValue(): T { return this.value; }
}

const numBox = new Box<number>(42);
const strBox = new Box<string>("hello");`,
            java: `// Java generic class
public class Box<T> {
  private T value;

  public Box(T value) { this.value = value; }

  public T getValue() { return value; }
}

Box<Integer> numBox = new Box<>(42);    // diamond inference
Box<String> strBox = new Box<>("hello");

Integer n = numBox.getValue(); // type-safe!`,
            caption: 'The <> "diamond operator" lets Java infer the type from context',
          },
          callout: {
            type: 'info',
            text: 'Java generics use uppercase letters by convention: T (Type), E (Element), K (Key), V (Value), N (Number). You\'ll see these in the standard library.',
          },
        },
        {
          id: 'c3',
          title: 'Records (Java 16+)',
          explanation:
            'Java records are immutable data classes that auto-generate the constructor, getters, equals(), hashCode(), and toString(). They\'re ideal for DTOs and value objects — similar to TypeScript type/interface objects.',
          codeExample: {
            javascript: `// TypeScript: simple data type
type Point = { x: number; y: number };
const p: Point = { x: 10, y: 20 };
console.log(p.x);   // 10

// Or with a class:
class Point {
  constructor(public x: number, public y: number) {}
}`,
            java: `// Java record — one line!
record Point(int x, int y) {}

// Auto-generates: constructor, getters, equals, hashCode, toString
Point p = new Point(10, 20);
System.out.println(p.x());     // 10 (getter, not field)
System.out.println(p);          // Point[x=10, y=20]

// Records are immutable — no setters
// p.x = 30; // COMPILE ERROR

// Equivalent to writing 50+ lines of class code!`,
            caption: 'Records eliminate boilerplate — one line replaces constructor, getters, equals, hashCode, toString',
          },
          callout: {
            type: 'tip',
            text: 'Use records for DTOs, API responses, and any "just data" class. Use regular classes when you need mutability, inheritance, or custom logic beyond simple data holding.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'What\'s the difference between Box<Object> and Box<T> in Java?',
          hint: 'Think about what happens when you call getValue() on each',
          answer: 'Box<Object>.getValue() returns Object — you\'d need to cast it manually and could get ClassCastException at runtime. Box<T> is type-safe: Box<String>.getValue() returns String directly. Generics catch type mismatches at compile time, not runtime.',
        },
        {
          id: 'e2',
          prompt: 'Can you put an int (primitive) directly into a Box<int>? Like new Box<int>(42)?',
          hint: 'Remember Java\'s distinction between primitives and objects',
          answer: 'No! Java generics only work with reference types (objects), not primitives. Use the wrapper class: Box<Integer> (capital I). Java will auto-box "int" to "Integer" automatically in most cases (autoboxing), but the type parameter must be Integer, not int.',
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
          title: 'Basic Enums',
          explanation:
            'Java enums define a fixed set of constants — like TypeScript\'s "as const" objects or union types, but type-safe and more powerful.',
          codeExample: {
            javascript: `// TypeScript: union type or const object
type Color = "RED" | "GREEN" | "BLUE";

// or:
const Color = {
  RED: "RED",
  GREEN: "GREEN",
  BLUE: "BLUE",
} as const;

let c: Color = "RED";
// c = "PURPLE"; // TS error`,
            java: `// Java enum
enum Color {
  RED, GREEN, BLUE
}

Color c = Color.RED;
// c = "RED";     // COMPILE ERROR — not a String!
// c = Color.PURPLE; // COMPILE ERROR — doesn't exist!

System.out.println(c);            // RED
System.out.println(c.name());     // "RED" (String)
System.out.println(c.ordinal());  // 0 (index)`,
            caption: 'Java enums are type-safe constants — not strings, not ints, but their own type',
          },
          challenge: {
            id: 'ch2-6-1',
            type: 'fill-blank',
            prompt: 'Declare a Java enum for T-shirt sizes:',
            code: `___BLANK_1___ Size {
  ___BLANK_2___, MEDIUM, LARGE, XL
}

Size mySize = ___BLANK_3___;`,
            blanks: [
              { id: 'b1', expected: ['enum'], hint: 'enum keyword' },
              { id: 'b2', expected: ['SMALL'], hint: 'first constant' },
              { id: 'b3', expected: ['Size.MEDIUM', 'Size.SMALL', 'Size.LARGE', 'Size.XL'], hint: 'EnumName.VALUE' },
            ],
            explanation: 'Enums are declared with the "enum" keyword. Constants are UPPER_CASE by convention. Access them as EnumName.VALUE — they are not strings!',
          },
        },
        {
          id: 'c2',
          title: 'Enums with Fields and Methods',
          explanation:
            'Unlike TypeScript, Java enums can have constructors, fields, and methods. Each constant is actually an instance of the enum class — making them surprisingly powerful.',
          codeExample: {
            javascript: `// TypeScript: enum-like with data
const HttpStatus = {
  OK: { code: 200, message: "OK" },
  NOT_FOUND: { code: 404, message: "Not Found" },
  ERROR: { code: 500, message: "Server Error" },
} as const;

console.log(HttpStatus.OK.code); // 200`,
            java: `// Java enum with fields and methods
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
System.out.println(HttpStatus.NOT_FOUND.getMessage()); // Not Found`,
            caption: 'Java enums can hold data and behavior — each constant is an object instance',
          },
        },
        {
          id: 'c3',
          title: 'Enums with Switch',
          explanation:
            'Enums pair naturally with switch statements. The compiler can even warn you if you forget to handle a case — something TypeScript\'s exhaustive checks also do.',
          codeExample: {
            javascript: `// TypeScript exhaustive switch
type Season = "SPRING" | "SUMMER" | "FALL" | "WINTER";

function describe(s: Season): string {
  switch (s) {
    case "SPRING": return "Flowers blooming";
    case "SUMMER": return "Beach time";
    case "FALL": return "Leaves falling";
    case "WINTER": return "Snow!";
  }
}`,
            java: `// Java enum + switch
enum Season { SPRING, SUMMER, FALL, WINTER }

String describe(Season s) {
  return switch (s) {
    case SPRING -> "Flowers blooming";
    case SUMMER -> "Beach time";
    case FALL -> "Leaves falling";
    case WINTER -> "Snow!";
    // compiler warns if you miss a case!
  };
}`,
            caption: 'Switch on enums gives compile-time exhaustiveness checking — the compiler catches missed cases',
          },
        },
      ],
      translationDrills: [
        {
          id: 'td2-6-1',
          jsCode: `const Priority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
};`,
          javaTemplate: `___SLOT_1___ Priority {
  ___SLOT_2___, ___SLOT_3___, ___SLOT_4___
}`,
          slots: [
            { id: 'slot-1', expected: 'enum' },
            { id: 'slot-2', expected: 'LOW' },
            { id: 'slot-3', expected: 'MEDIUM' },
            { id: 'slot-4', expected: 'HIGH' },
          ],
          tokenBank: ['enum', 'LOW', 'MEDIUM', 'HIGH', 'class', 'const', 'type', 'interface'],
          explanation: 'Java enums use the "enum" keyword and list constants without values. Unlike TypeScript const objects, Java enum constants are their own type — not strings.',
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
          explanation: 'println(d) prints "WED" (the constant name). ordinal() returns the 0-based index: MON=0, TUE=1, WED=2. name() returns "WED" as a String, and toLowerCase() converts it to "wed".',
          hint: 'ordinal() is zero-based. name() returns the constant name as a String.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'When would you use a Java enum instead of String constants (like static final String RED = "RED")?',
          hint: 'Think about type safety and what the compiler can check',
          answer: 'Enums are type-safe: a method accepting Color can only receive Color.RED/GREEN/BLUE — not any random String. With String constants, you could pass "PURPLE" and the compiler wouldn\'t catch it. Enums also work with switch exhaustiveness checking, have built-in name()/ordinal(), and can hold data and methods.',
        },
        {
          id: 'e2',
          prompt: 'Can Java enums implement interfaces? How would that be useful?',
          hint: 'Think about enums with behavior',
          answer: 'Yes! Each enum constant can implement interface methods differently. Example: enum Operation implements Calculator { ADD { double calc(a,b) { return a+b; } }, SUBTRACT { ... } }. This is Java\'s version of the strategy pattern with enums — very powerful and type-safe.',
        },
      ],
    },
  ],
};

export default module2;
