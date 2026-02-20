import type { Quiz } from '../../types';

const quiz1: Quiz = {
  id: 'quiz-1',
  moduleId: 'module-1',
  title: 'Basic Syntax & Types Quiz',
  questions: [
    {
      id: 'q1',
      question: 'In JavaScript you write "let count = 5". What is the correct Java equivalent?',
      options: [
        { key: 'a', text: 'let count = 5;' },
        { key: 'b', text: 'var count = 5;' },
        { key: 'c', text: 'int count = 5;' },
        { key: 'd', text: 'number count = 5;' },
      ],
      correctKey: 'c',
      explanation: 'Java requires an explicit type. "int" is the type for whole numbers. "let" and "var" are JavaScript keywords, and "number" is not a Java type.',
    },
    {
      id: 'q2',
      question: 'Which Java type is equivalent to JavaScript\'s "true" / "false" values?',
      options: [
        { key: 'a', text: 'Bool' },
        { key: 'b', text: 'bool' },
        { key: 'c', text: 'Boolean (capital B only)' },
        { key: 'd', text: 'boolean (lowercase)' },
      ],
      correctKey: 'd',
      explanation: 'Java\'s primitive boolean type is lowercase "boolean". "Boolean" (capital B) is the wrapper class. For variable declarations, use lowercase "boolean flag = true;"',
    },
    {
      id: 'q3',
      question: 'You need to compare two String values in Java. Which is correct?',
      options: [
        { key: 'a', text: 'if (s1 == s2)' },
        { key: 'b', text: 'if (s1 === s2)' },
        { key: 'c', text: 'if (s1.equals(s2))' },
        { key: 'd', text: 'if (s1.compare(s2))' },
      ],
      correctKey: 'c',
      explanation: 'In Java, == on Strings checks object reference identity, not value. Always use .equals() to compare String content. "===" doesn\'t exist in Java.',
    },
    {
      id: 'q4',
      question: 'What does Java\'s "void" return type mean in a method declaration?',
      options: [
        { key: 'a', text: 'The method can return any type' },
        { key: 'b', text: 'The method returns null' },
        { key: 'c', text: 'The method returns nothing (like implicit undefined in JS)' },
        { key: 'd', text: 'The method is private' },
      ],
      correctKey: 'c',
      explanation: '"void" means the method has no return value, similar to a JS function that doesn\'t have a return statement (which implicitly returns undefined). void methods cannot use "return someValue;"',
    },
    {
      id: 'q5',
      question: 'In JavaScript: const names = ["Alice", "Bob"]; What is the Java equivalent?',
      options: [
        { key: 'a', text: 'String names[] = new String("Alice", "Bob");' },
        { key: 'b', text: 'String[] names = {"Alice", "Bob"};' },
        { key: 'c', text: 'Array<String> names = {"Alice", "Bob"};' },
        { key: 'd', text: 'var names = ["Alice", "Bob"];' },
      ],
      correctKey: 'b',
      explanation: 'Java array declaration uses the type followed by []. The initializer uses {} curly braces, not [] square brackets. String[] names = {"Alice", "Bob"} is the correct syntax.',
    },
    {
      id: 'q6',
      question: 'What is the most common Java runtime error equivalent to "Cannot read property of undefined" in JavaScript?',
      options: [
        { key: 'a', text: 'ClassCastException' },
        { key: 'b', text: 'ArrayIndexOutOfBoundsException' },
        { key: 'c', text: 'NullPointerException (NPE)' },
        { key: 'd', text: 'IllegalArgumentException' },
      ],
      correctKey: 'c',
      explanation: 'NullPointerException (NPE) occurs when you call a method on a null reference — like calling .length() on a String that is null. It\'s the Java equivalent of "Cannot read properties of undefined" in JavaScript.',
    },
    {
      id: 'q7',
      question: 'Which Java type would you use to store a price like $9.99?',
      options: [
        { key: 'a', text: 'int' },
        { key: 'b', text: 'float' },
        { key: 'c', text: 'double' },
        { key: 'd', text: 'decimal' },
      ],
      correctKey: 'c',
      explanation: '"double" is preferred for most decimal calculations. "float" has less precision. "int" can only hold whole numbers. "decimal" is not a Java primitive type (though BigDecimal exists for exact money calculations).',
    },
    {
      id: 'q8',
      question: 'How do you get the number of elements in a Java array vs a Java String?',
      options: [
        { key: 'a', text: 'Both use .length()' },
        { key: 'b', text: 'Both use .length (no parentheses)' },
        { key: 'c', text: 'Array: .length (property) | String: .length() (method)' },
        { key: 'd', text: 'Array: .size() | String: .length()' },
      ],
      correctKey: 'c',
      explanation: 'Java has an inconsistency: arrays use .length (a field, no parentheses) while Strings use .length() (a method, with parentheses). ArrayList uses .size(). This inconsistency is a known Java quirk.',
    },
  ],
};

export default quiz1;
