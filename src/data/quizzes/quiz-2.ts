import type { Quiz } from '../../types';

const quiz2: Quiz = {
  id: 'quiz-2',
  moduleId: 'module-2',
  title: 'OOP Quiz',
  questions: [
    {
      id: 'q1',
      question: 'You create a public class named "ProductService". What must the file be named?',
      options: [
        { key: 'a', text: 'productservice.java' },
        { key: 'b', text: 'product-service.java' },
        { key: 'c', text: 'ProductService.java' },
        { key: 'd', text: 'Any name with .java extension' },
      ],
      correctKey: 'c',
      explanation: 'In Java, the file name must exactly match the public class name, including capitalization. "ProductService.java" — case-sensitive. This is enforced by the Java compiler.',
    },
    {
      id: 'q2',
      question: 'Which access modifier makes a field accessible only within the same class?',
      options: [
        { key: 'a', text: 'public' },
        { key: 'b', text: 'protected' },
        { key: 'c', text: 'package' },
        { key: 'd', text: 'private' },
      ],
      correctKey: 'd',
      explanation: '"private" restricts access to the declaring class only. "protected" allows subclasses and same-package access. "public" allows everyone. No modifier = package-private (same package only).',
    },
    {
      id: 'q3',
      question: 'What does @Override do when placed on a method?',
      options: [
        { key: 'a', text: 'Makes the method execute faster' },
        { key: 'b', text: 'Tells the compiler to verify this method overrides a parent method' },
        { key: 'c', text: 'Makes the method private' },
        { key: 'd', text: 'Prevents the method from being overridden further' },
      ],
      correctKey: 'b',
      explanation: '@Override is a compile-time check: if the method doesn\'t match any parent class method signature, the compiler throws an error. This catches typos like "toSting()" instead of "toString()" — something JS doesn\'t have.',
    },
    {
      id: 'q4',
      question: 'Can a Java class extend multiple classes? (e.g., class C extends A, B)',
      options: [
        { key: 'a', text: 'Yes, Java supports multiple inheritance' },
        { key: 'b', text: 'No, Java only supports single class inheritance' },
        { key: 'c', text: 'Yes, but only for abstract classes' },
        { key: 'd', text: 'Only if the classes are in the same package' },
      ],
      correctKey: 'b',
      explanation: 'Java supports single inheritance for classes — a class can only extend ONE parent class. To achieve multiple-type behavior, implement multiple interfaces. This avoids the "diamond problem" of multiple inheritance.',
    },
    {
      id: 'q5',
      question: 'What is the key difference between a Java interface and an abstract class?',
      options: [
        { key: 'a', text: 'Interfaces cannot have any method implementations' },
        { key: 'b', text: 'Abstract classes cannot be extended' },
        { key: 'c', text: 'A class can implement multiple interfaces but extend only one abstract class' },
        { key: 'd', text: 'Interfaces are faster than abstract classes' },
      ],
      correctKey: 'c',
      explanation: 'The key practical difference: a class can implement multiple interfaces (multiple type contracts) but can only extend one class (abstract or concrete). Both can have method implementations (abstract classes always could; interfaces since Java 8 with default methods).',
    },
    {
      id: 'q6',
      question: 'In TypeScript: interface Serializable {}. What is the Java equivalent construct?',
      options: [
        { key: 'a', text: 'abstract class Serializable {}' },
        { key: 'b', text: 'interface Serializable {}' },
        { key: 'c', text: 'class Serializable {}' },
        { key: 'd', text: 'type Serializable = {}' },
      ],
      correctKey: 'b',
      explanation: 'Java also uses the "interface" keyword! The syntax is nearly identical to TypeScript. The main difference: Java interfaces are real runtime constructs (not erased like TypeScript), and can have default method implementations.',
    },
    {
      id: 'q7',
      question: 'What does it mean for a Java class to be "generic" (like Box<T>)?',
      options: [
        { key: 'a', text: 'The class can only store Objects' },
        { key: 'b', text: 'The class works with any specified type while maintaining type safety' },
        { key: 'c', text: 'The class has no constructors' },
        { key: 'd', text: 'The class cannot be extended' },
      ],
      correctKey: 'b',
      explanation: 'Generics allow writing type-safe code that works with different types. Box<String> only holds Strings; Box<Integer> only holds Integers. The compiler enforces this — no ClassCastException at runtime from wrong types.',
    },
    {
      id: 'q8',
      question: 'Where are Java class fields (instance variables) declared?',
      options: [
        { key: 'a', text: 'Inside the constructor with "this.field =" syntax' },
        { key: 'b', text: 'At the class level, before the constructor' },
        { key: 'c', text: 'Inside any method that uses them' },
        { key: 'd', text: 'In a separate interface file' },
      ],
      correctKey: 'b',
      explanation: 'Java fields are declared at the class level with their types: "private String name;" — before the constructor. Inside the constructor you assign them: "this.name = name;" The declaration and initialization are separate, unlike JS where you can do both in the constructor.',
    },
  ],
};

export default quiz2;
