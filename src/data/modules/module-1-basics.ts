import type { Module } from '../../types';
import project1 from '../projects/project-1';

const module1: Module = {
  id: 'module-1',
  order: 1,
  title: 'Basic Syntax & Types',
  subtitle: 'Learn Java fundamentals through the lens of JavaScript',
  icon: '📝',
  accentColor: 'blue',
  quizId: 'quiz-1',
  project: project1,
  lessons: [
    {
      id: 'lesson-1-1',
      moduleId: 'module-1',
      title: 'Variables & Types',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'Dynamic vs Static Typing',
          explanation:
            'In JavaScript, variables can hold any type of value and types are determined at runtime. Java is statically typed — you must declare the type of every variable, and it cannot change.',
          analogy:
            'Think of JavaScript variables as boxes that can hold anything. Java variables are labeled boxes: a box labeled "int" can only hold whole numbers.',
          codeExample: {
            javascript: `// JS: type is inferred, can change
let age = 30;
age = "thirty"; // totally fine

const name = "Alice";
let isActive = true;
let price = 9.99;`,
            java: `// Java: type must be declared explicitly
int age = 30;
// age = "thirty"; // COMPILE ERROR

String name = "Alice";
boolean isActive = true;
double price = 9.99;`,
            caption: 'Java requires explicit type declarations — variables cannot change their type',
          },
          challenge: {
            id: 'ch1-1-1',
            type: 'fill-blank',
            prompt: 'Declare Java variables for a user\'s name, age, and active status:',
            code: `___BLANK_1___ username = "Alice";
___BLANK_2___ age = 25;
___BLANK_3___ isActive = true;`,
            blanks: [
              { id: 'b1', expected: ['String'], hint: 'text type' },
              { id: 'b2', expected: ['int'], hint: 'whole number' },
              { id: 'b3', expected: ['boolean'], hint: 'true/false' },
            ],
            explanation: 'In Java, you must declare String for text, int for whole numbers, and boolean for true/false values. Unlike JavaScript\'s let/const, the type name comes first.',
          },
        },
        {
          id: 'c2',
          title: 'Primitive Types',
          explanation:
            'Java has 8 primitive types. The most common ones you will use are int (whole numbers), double (decimals), boolean (true/false), and char (single character). String is a special case — it is actually a class, not a primitive.',
          codeExample: {
            javascript: `// JS has just Number, String, Boolean
const count = 42;          // Number
const pi = 3.14;           // Number
const letter = 'A';        // String (of length 1)
const flag = true;         // Boolean`,
            java: `// Java has distinct numeric types
int count = 42;         // 32-bit integer
long bigNum = 10000000000L; // 64-bit integer
double pi = 3.14;       // 64-bit decimal
float f = 3.14f;        // 32-bit decimal
char letter = 'A';      // Single character (use single quotes!)
boolean flag = true;    // true or false`,
            caption: 'Java distinguishes between int and long, float and double',
          },
          callout: {
            type: 'gotcha',
            text: 'In Java, char uses single quotes (\' \') and String uses double quotes (" "). Mixing them up is a common beginner mistake!',
          },
          challenge: {
            id: 'ch1-1-2',
            type: 'fill-blank',
            prompt: 'Fill in the correct Java types for these variables:',
            code: `___BLANK_1___ pi = 3.14159;
___BLANK_2___ initial = 'J';
___BLANK_3___ bigNumber = 9999999999L;`,
            blanks: [
              { id: 'b1', expected: ['double'], hint: 'decimal number' },
              { id: 'b2', expected: ['char'], hint: 'single character' },
              { id: 'b3', expected: ['long'], hint: '64-bit integer' },
            ],
            explanation: 'double is for decimal numbers, char is for single characters (with single quotes), and long is for large integers (note the L suffix on the value).',
          },
        },
        {
          id: 'c3',
          title: 'var — Type Inference (Java 10+)',
          explanation:
            'Since Java 10, you can use "var" to let the compiler infer the type. This looks similar to JavaScript, but the type is still fixed at compile time — you just don\'t have to write it.',
          codeExample: {
            javascript: `// JS: var/let/const with runtime type
let message = "Hello";
message = 42; // fine, types are dynamic`,
            java: `// Java var: type inferred at compile time
var message = "Hello"; // inferred as String
// message = 42;       // STILL a compile error
// var still = static type, just written less`,
            caption: 'Java var is syntactic sugar — types are still static, just inferred',
          },
        },
        {
          id: 'c4',
          title: 'final — Java\'s const',
          explanation:
            'Java\'s "final" keyword is the equivalent of JavaScript\'s "const" — it prevents reassignment. Like const in JS, final on an object reference doesn\'t make the object immutable.',
          codeExample: {
            javascript: `// JS: const prevents reassignment
const MAX = 100;
// MAX = 200; // TypeError!

const user = { name: "Alice" };
user.name = "Bob"; // allowed! const ≠ immutable`,
            java: `// Java: final prevents reassignment
final int MAX = 100;
// MAX = 200; // COMPILE ERROR!

final List<String> names = new ArrayList<>();
names.add("Alice"); // allowed! final ≠ immutable
// names = new ArrayList<>(); // COMPILE ERROR!`,
            caption: 'final = const — prevents reassignment, but does NOT make objects immutable',
          },
          callout: {
            type: 'gotcha',
            text: 'Just like const in JS, final in Java only prevents reassignment of the variable. You can still mutate the object it points to (add items to a list, change fields, etc.).',
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
          explanation: 'In Java, each variable needs its type declared: int for integers, String for text, boolean for true/false. Note that String uses double quotes (not single quotes like in JS).',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'In Java, what type would you use to store someone\'s age (a whole number)?',
          hint: 'Think about which Java type represents whole numbers (no decimals)',
          answer: 'Use "int" for whole numbers. Example: int age = 25; — not "let age" like in JS!',
        },
        {
          id: 'e2',
          prompt: 'Why does Java have both "int" and "long" when JavaScript just has "Number"?',
          hint: 'Think about memory and value ranges',
          answer: 'Java\'s int uses 32 bits (max ~2 billion). long uses 64 bits (max ~9 quintillion). JS uses 64-bit floats for all numbers, which is flexible but less memory-efficient for simple counters.',
        },
      ],
    },
    {
      id: 'lesson-1-2',
      moduleId: 'module-1',
      title: 'Functions & Methods',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Functions vs Methods',
          explanation:
            'In JavaScript, functions are standalone and can exist anywhere. In Java, every function must live inside a class and is called a "method". There are no global functions in Java.',
          codeExample: {
            javascript: `// JS: functions can be standalone
function greet(name) {
  return "Hello, " + name + "!";
}

// or as arrow functions
const greet = (name) => \`Hello, \${name}!\`;

console.log(greet("Alice")); // Hello, Alice!`,
            java: `// Java: methods must be inside a class
public class Greeter {
  // Must declare return type!
  public static String greet(String name) {
    return "Hello, " + name + "!";
  }

  public static void main(String[] args) {
    System.out.println(greet("Alice")); // Hello, Alice!
  }
}`,
            caption: 'Java methods always live inside a class and need explicit return types',
          },
          challenge: {
            id: 'ch1-2-1',
            type: 'fill-blank',
            prompt: 'Complete this Java method that adds two numbers:',
            code: `public static ___BLANK_1___ add(___BLANK_2___ a, ___BLANK_3___ b) {
  return a + b;
}`,
            blanks: [
              { id: 'b1', expected: ['int', 'double'], hint: 'return type' },
              { id: 'b2', expected: ['int', 'double'], hint: 'parameter type' },
              { id: 'b3', expected: ['int', 'double'], hint: 'parameter type' },
            ],
            explanation: 'Java methods must declare the return type and the type of each parameter. For adding numbers, you\'d use int (whole numbers) or double (decimals).',
          },
        },
        {
          id: 'c2',
          title: 'Return Types & void',
          explanation:
            'Every Java method must declare what type it returns. If it returns nothing, you use "void". This is unlike JavaScript where any function can return anything (or nothing).',
          codeExample: {
            javascript: `// JS: return type is implicit/flexible
function add(a, b) {
  return a + b; // could return anything
}

function logMessage(msg) {
  console.log(msg);
  // implicitly returns undefined
}`,
            java: `// Java: return type is explicit
int add(int a, int b) {
  return a + b; // MUST return an int
}

void logMessage(String msg) {
  System.out.println(msg);
  // void = no return value
}`,
            caption: '"void" means "this method returns nothing" — like implicitly returning undefined',
          },
          callout: {
            type: 'tip',
            text: 'If you declare a return type other than void, Java will give a compile error if any code path doesn\'t return a value.',
          },
        },
        {
          id: 'c3',
          title: 'Method Overloading',
          explanation:
            'Java allows multiple methods with the same name as long as their parameter types differ. This is called "method overloading". JavaScript doesn\'t have this — you\'d typically use default parameters or optional args.',
          codeExample: {
            javascript: `// JS: one function, handle variations inside
function greet(name, greeting = "Hello") {
  return \`\${greeting}, \${name}!\`;
}

greet("Alice");           // Hello, Alice!
greet("Bob", "Hi");       // Hi, Bob!`,
            java: `// Java: separate methods with same name
String greet(String name) {
  return "Hello, " + name + "!";
}

String greet(String name, String greeting) {
  return greeting + ", " + name + "!";
}

// Java picks the right one based on args
greet("Alice");           // Hello, Alice!
greet("Bob", "Hi");       // Hi, Bob!`,
            caption: 'Overloading lets you have multiple versions of a method with different parameter types',
          },
        },
        {
          id: 'c4',
          title: 'static vs Instance Methods',
          explanation:
            'In Java, "static" means "belongs to the class, not to an instance". Static methods are called on the class itself (like module-level functions in JS), while instance methods are called on objects.',
          codeExample: {
            javascript: `// JS: module functions vs instance methods
// Module-level function (like static)
export function calculateTax(amount) {
  return amount * 0.21;
}

// Instance method
class Calculator {
  add(a, b) { return a + b; }
}

const calc = new Calculator();
calc.add(1, 2);       // called on instance`,
            java: `// Java: static vs instance
public class MathUtils {
  // Static: called on the CLASS
  public static int square(int n) {
    return n * n;
  }

  // Instance: called on an OBJECT
  public int add(int a, int b) {
    return a + b;
  }
}

// Static call — no object needed:
MathUtils.square(5);          // 25

// Instance call — need an object:
MathUtils calc = new MathUtils();
calc.add(1, 2);               // 3`,
            caption: 'static methods: ClassName.method() | instance methods: object.method()',
          },
          challenge: {
            id: 'ch1-2-2',
            type: 'fill-blank',
            prompt: 'Complete this static method call:',
            code: `public class StringUtils {
  public static String reverse(String s) {
    return new StringBuilder(s).reverse().toString();
  }
}

// Call the static method:
String result = ___BLANK_1___.___BLANK_2___("hello");`,
            blanks: [
              { id: 'b1', expected: ['StringUtils'], hint: 'class name' },
              { id: 'b2', expected: ['reverse'], hint: 'method name' },
            ],
            explanation: 'Static methods are called on the class name: StringUtils.reverse("hello"). No need to create an instance with "new" — the method belongs to the class itself.',
          },
        },
        {
          id: 'c5',
          title: 'Packages & Imports',
          explanation:
            'Java organizes code into packages (like folders/modules in JS). Each file declares its package, and you import classes from other packages — similar to ES module imports.',
          codeExample: {
            javascript: `// JS: ES modules
// file: src/utils/math.js
export function add(a, b) { return a + b; }

// file: src/app.js
import { add } from './utils/math.js';
import axios from 'axios'; // from node_modules`,
            java: `// Java: packages & imports
// file: src/main/java/com/example/utils/MathUtils.java
package com.example.utils;

public class MathUtils {
  public static int add(int a, int b) { return a + b; }
}

// file: src/main/java/com/example/App.java
package com.example;

import com.example.utils.MathUtils;  // like import from
import java.util.ArrayList;          // from standard library

ArrayList<String> list = new ArrayList<>();
int sum = MathUtils.add(1, 2);`,
            caption: 'package = folder path, import = ES module import. Convention: reverse domain (com.company.project)',
          },
          callout: {
            type: 'info',
            text: 'Java uses reverse domain name convention for packages: com.google.maps, org.apache.commons. This guarantees uniqueness — like npm scoped packages (@google/maps).',
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
            { id: 'slot-1', expected: 'static' },
            { id: 'slot-2', expected: 'int' },
            { id: 'slot-3', expected: 'int' },
            { id: 'slot-4', expected: 'int' },
            { id: 'slot-5', expected: 'return' },
          ],
          tokenBank: ['static', 'int', 'int', 'int', 'return', 'void', 'String', 'function'],
          explanation: 'Java methods need the "static" keyword for class-level methods, a return type before the method name, and each parameter needs its own type declaration. The "return" keyword works the same as in JS.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'What return type would you give a Java method that calculates someone\'s BMI (a decimal number)?',
          hint: 'BMI can have decimal places, so which Java decimal type makes sense?',
          answer: '"double" — use "double calculateBMI(double weight, double height)". Use double for most decimal calculations, as float has less precision.',
        },
        {
          id: 'e2',
          prompt: 'In JS you can write: const isEven = n => n % 2 === 0. How would you write this as a Java method?',
          hint: 'The return value is true/false, and the input is a whole number',
          answer: 'boolean isEven(int n) { return n % 2 == 0; } — Note: boolean not "bool", and the method is inside a class.',
        },
      ],
    },
    {
      id: 'lesson-1-3',
      moduleId: 'module-1',
      title: 'Control Flow',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'if/else and Loops',
          explanation:
            'Java\'s control flow is nearly identical to JavaScript syntax-wise. The main difference is that conditions must be boolean — Java won\'t coerce truthy/falsy values.',
          codeExample: {
            javascript: `// JS: truthy/falsy coercion
if (count) { // 0 is falsy, nonzero is truthy
  console.log("has items");
}

for (let i = 0; i < 5; i++) {
  console.log(i);
}

let i = 0;
while (i < 5) {
  console.log(i++);
}`,
            java: `// Java: must be explicit boolean
if (count > 0) { // must be a boolean expression
  System.out.println("has items");
}

for (int i = 0; i < 5; i++) {
  System.out.println(i);
}

int i = 0;
while (i < 5) {
  System.out.println(i++);
}`,
            caption: 'Java requires explicit boolean conditions — no truthy/falsy shorthand',
          },
          callout: {
            type: 'gotcha',
            text: 'if (someString) compiles in JS but not Java. You need: if (someString != null && !someString.isEmpty())',
          },
        },
        {
          id: 'c2',
          title: 'String Equality: == vs .equals()',
          explanation:
            'This is one of the most common Java gotchas for JS developers. In Java, == on Strings checks if they are the same object in memory, not if they have the same content. Use .equals() for content comparison.',
          codeExample: {
            javascript: `// JS: == and === compare values
const a = "hello";
const b = "hello";
console.log(a === b); // true (same value)
console.log(a == b);  // true (same value)`,
            java: `// Java: == checks REFERENCE, not value
String a = "hello";
String b = new String("hello");

System.out.println(a == b);       // false (different objects!)
System.out.println(a.equals(b));  // true (same content ✓)

// String literals may be equal by == due to
// string pool optimization, but don't rely on it!`,
            caption: 'Always use .equals() to compare String values in Java',
          },
          callout: {
            type: 'warning',
            text: 'Using == to compare Strings in Java is a very common bug. Your IDE will often warn you, but always use .equals() for String comparison.',
          },
        },
        {
          id: 'c3',
          title: 'Enhanced for Loop',
          explanation:
            'Java has a for-each style loop for iterating collections, similar to JavaScript\'s for...of loop.',
          codeExample: {
            javascript: `// JS: for...of loop
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}`,
            java: `// Java: enhanced for loop
String[] fruits = {"apple", "banana", "cherry"};
for (String fruit : fruits) {
  System.out.println(fruit);
}
// Note: colon (:) instead of "of"`,
            caption: 'Java\'s enhanced for loop uses a colon (:) where JS uses "of"',
          },
        },
        {
          id: 'c4',
          title: 'Switch Statements',
          explanation:
            'Java\'s classic switch works like JavaScript\'s but with stricter types. Java 14+ also introduced switch expressions with arrow syntax for cleaner code.',
          codeExample: {
            javascript: `// JS switch
switch (day) {
  case "MON":
  case "TUE":
    console.log("Early week");
    break;
  case "FRI":
    console.log("TGIF!");
    break;
  default:
    console.log("Other day");
}`,
            java: `// Java classic switch (same as JS)
switch (day) {
  case "MON":
  case "TUE":
    System.out.println("Early week");
    break;
  case "FRI":
    System.out.println("TGIF!");
    break;
  default:
    System.out.println("Other day");
}

// Java 14+ switch expression (modern):
String result = switch (day) {
  case "MON", "TUE" -> "Early week";
  case "FRI" -> "TGIF!";
  default -> "Other day";
};`,
            caption: 'Java 14+ arrow switch: no break needed, can return values directly',
          },
          callout: {
            type: 'info',
            text: 'Java switch didn\'t support String until Java 7. Before that, only int/char/enum were allowed. The modern arrow syntax (Java 14+) eliminates fall-through bugs entirely.',
          },
        },
        {
          id: 'c5',
          title: 'Common String Methods',
          explanation:
            'Most JavaScript string methods have Java equivalents — some identical, some renamed. Here\'s a comparison of the most commonly used ones.',
          codeExample: {
            javascript: `// JS String methods
str.includes("x")       // contains check
str.slice(0, 5)          // substring
str.split(",")           // split into array
str.trim()               // remove whitespace
str.startsWith("A")      // prefix check
str.toUpperCase()        // to uppercase
\`Hello \${name}\`          // template literal`,
            java: `// Java String methods
str.contains("x")           // includes → contains
str.substring(0, 5)         // slice → substring
str.split(",")              // same!
str.trim()                  // same!
str.startsWith("A")         // same!
str.toUpperCase()           // same!
String.format("Hello %s", name) // template → format
// or: "Hello " + name           // concatenation`,
            caption: 'Many methods are the same! Key difference: includes→contains, slice→substring, template literals→String.format',
          },
          challenge: {
            id: 'ch1-3-1',
            type: 'fill-blank',
            prompt: 'Translate these JS string operations to Java:',
            code: `String greeting = "  Hello, World!  ";
String trimmed = greeting.___BLANK_1___();
boolean hasHello = greeting.___BLANK_2___("Hello");
String sub = greeting.___BLANK_3___(2, 7);`,
            blanks: [
              { id: 'b1', expected: ['trim'], hint: 'remove whitespace' },
              { id: 'b2', expected: ['contains'], hint: 'JS: includes()' },
              { id: 'b3', expected: ['substring'], hint: 'JS: slice()' },
            ],
            explanation: 'trim() is identical in both languages. JS includes() becomes Java contains(). JS slice() becomes Java substring(). Most string methods translate naturally!',
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
          explanation: 'a == b is false because == checks reference equality — a and b are different objects in memory. a.equals(b) is true because .equals() checks content equality. Always use .equals() for Strings!',
          hint: 'Remember: == checks if they are the same object, .equals() checks if they have the same content.',
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
          explanation: 'x is 10, which is greater than 5, so the if branch executes and prints "big". Java\'s if/else works just like JavaScript — the condition must be a boolean expression.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'Will this Java code compile? if (username) { System.out.println("logged in"); }',
          hint: 'Think about what Java requires inside the if() parentheses',
          answer: 'No! Java requires a boolean expression. Write: if (username != null && !username.isEmpty()) — Java won\'t coerce Strings to boolean like JS does.',
        },
        {
          id: 'e2',
          prompt: 'You have two String variables in Java: String s1 = "world"; String s2 = "world"; — will s1 == s2 be true?',
          hint: 'Consider the String pool optimization in Java',
          answer: 'Due to string pooling, string literals with the same content often share the same reference, so s1 == s2 might be true — but you should never rely on this. ALWAYS use s1.equals(s2) for reliable content comparison.',
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
          title: 'Fixed-Size Arrays',
          explanation:
            'Java arrays are fixed-size — once created, you cannot add or remove elements. This is unlike JavaScript arrays which are dynamic. For dynamic arrays in Java, you use ArrayList (covered in Module 3).',
          codeExample: {
            javascript: `// JS arrays are dynamic
const nums = [1, 2, 3];
nums.push(4);        // easy!
nums.push(5, 6);     // also fine
console.log(nums.length); // 6`,
            java: `// Java arrays have fixed size
int[] nums = {1, 2, 3};
// nums is now permanently size 3
// nums.push(4); // DOESN'T EXIST

// To create an empty array of size 5:
int[] scores = new int[5];
scores[0] = 95;
scores[1] = 87;
System.out.println(nums.length); // 3`,
            caption: 'Java arrays cannot grow or shrink — use ArrayList for dynamic collections',
          },
          callout: {
            type: 'info',
            text: 'In Java, arrays use .length (a property, no parentheses). Strings use .length() (a method, with parentheses). Don\'t mix them up!',
          },
          challenge: {
            id: 'ch1-4-1',
            type: 'fill-blank',
            prompt: 'Create a Java array of 3 strings and access the first element:',
            code: `___BLANK_1___ names = {"Alice", "Bob", "Charlie"};
System.out.println(names[___BLANK_2___]);`,
            blanks: [
              { id: 'b1', expected: ['String[]'], hint: 'array type' },
              { id: 'b2', expected: ['0'], hint: 'first index' },
            ],
            explanation: 'Java arrays use Type[] syntax (e.g., String[]) and are zero-indexed just like JavaScript. names[0] gives "Alice".',
          },
        },
        {
          id: 'c2',
          title: 'Array Syntax & Iteration',
          explanation:
            'Java array syntax uses square brackets like JS, but the type is declared before the brackets. You can iterate with a traditional for loop or the enhanced for-each loop.',
          codeExample: {
            javascript: `// JS arrays
const names = ["Alice", "Bob", "Charlie"];
console.log(names[0]);        // Alice
console.log(names.length);    // 3

names.forEach(name => {
  console.log(name);
});`,
            java: `// Java arrays
String[] names = {"Alice", "Bob", "Charlie"};
System.out.println(names[0]);       // Alice
System.out.println(names.length);   // 3

// Enhanced for loop:
for (String name : names) {
  System.out.println(name);
}`,
            caption: 'Java array iteration is similar to JS — the enhanced for loop is the most common',
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
          explanation: 'The array has 3 elements so .length is 3. Arrays are zero-indexed, so nums[1] is the second element: 20.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'How do you create a Java array of 10 integers, all initialized to 0?',
          hint: 'Use the "new" keyword with the type and size',
          answer: 'int[] scores = new int[10]; — Java automatically initializes int arrays to 0, boolean arrays to false, and object arrays to null.',
        },
        {
          id: 'e2',
          prompt: 'In JS, you can do arr.length to get the length. What\'s different about getting length in Java between arrays and Strings?',
          hint: 'One is a property, one is a method call',
          answer: 'Arrays: arr.length (no parentheses — it\'s a property). Strings: str.length() (parentheses — it\'s a method). This inconsistency is a known quirk of Java!',
        },
      ],
    },
    {
      id: 'lesson-1-5',
      moduleId: 'module-1',
      title: 'Null & Exceptions',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'null vs undefined',
          explanation:
            'Java has null (like JS) but has no "undefined". In JS, accessing a property on undefined throws a TypeError. In Java, calling a method on null throws a NullPointerException (NPE) — the most famous Java error.',
          codeExample: {
            javascript: `// JS: both null and undefined
let x;           // undefined
let y = null;    // null

// JS won't crash until you use it
console.log(x?.name);    // undefined (optional chaining)
console.log(y?.name);    // undefined (safe)`,
            java: `// Java: only null, no undefined
String name = null;

// This WILL crash at runtime:
// System.out.println(name.length()); // NullPointerException!

// Safe approach — check first:
if (name != null) {
  System.out.println(name.length());
}`,
            caption: 'NullPointerException (NPE) is to Java what "Cannot read property of undefined" is to JS',
          },
          callout: {
            type: 'gotcha',
            text: 'NullPointerException is the #1 most common Java runtime error. Always check for null before calling methods on object references.',
          },
        },
        {
          id: 'c2',
          title: 'Optional<T> — Java\'s Answer to null Safety',
          explanation:
            'Java 8 introduced Optional<T> as a way to explicitly handle potentially-absent values, similar to TypeScript\'s "T | undefined" or optional chaining in JS.',
          codeExample: {
            javascript: `// JS/TS: optional values
function findUser(id: number): User | undefined {
  return users.find(u => u.id === id);
}

const user = findUser(42);
const name = user?.name ?? "Unknown";`,
            java: `// Java: Optional<T>
Optional<String> maybeUser = findUser(42);

// Check if present
if (maybeUser.isPresent()) {
  System.out.println(maybeUser.get());
}

// Or use orElse (like ?? in JS):
String name = maybeUser.orElse("Unknown");

// Modern style with ifPresent:
maybeUser.ifPresent(u -> System.out.println(u));`,
            caption: 'Optional<T> makes it explicit when a value might be absent — no silent null surprises',
          },
        },
        {
          id: 'c3',
          title: 'try/catch Exceptions',
          explanation:
            'Java\'s try/catch is syntactically similar to JS. A key difference: Java has "checked exceptions" — some methods force you to handle exceptions at compile time.',
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
            java: `// Java: try/catch with typed exceptions
try {
  int result = Integer.parseInt(input);
  System.out.println(result);
} catch (NumberFormatException e) {
  System.err.println("Parse failed: " + e.getMessage());
} finally {
  System.out.println("Always runs");
}
// Note: you catch a specific exception type!`,
            caption: 'Java catch blocks specify the exception type — you can have multiple catch blocks for different errors',
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
          explanation: '"abc" cannot be parsed as an integer, so Integer.parseInt throws NumberFormatException. The catch block prints "Error!", then the finally block always runs and prints "Done". The result line is never reached.',
          hint: 'Think about what happens when parseInt gets a non-numeric string.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'What happens when you call a method on a null variable in Java vs accessing a property of undefined in JS?',
          hint: 'Think about when the error occurs — compile time or runtime',
          answer: 'Both crash at runtime! In JS: "TypeError: Cannot read properties of undefined". In Java: "NullPointerException". Neither language prevents you from writing the code — it only fails when executed.',
        },
        {
          id: 'e2',
          prompt: 'How does Optional<T> in Java compare to the || (OR) operator in JavaScript for providing defaults?',
          hint: 'Both provide a fallback value, but how do they differ?',
          answer: 'Both provide defaults: JS: const name = user.name || "Unknown", Java: String name = optional.orElse("Unknown"). Java\'s Optional is more explicit — it forces you to acknowledge the value might be absent. JS\'s || also coerces falsy values (like empty string), while Optional only checks for null/absent.',
        },
      ],
    },
  ],
};

export default module1;
