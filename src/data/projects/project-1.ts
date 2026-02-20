import type { MiniProject } from '../../types';

const project1: MiniProject = {
  id: 'project-1',
  moduleId: 'module-1',
  title: 'Type Declarations & Methods',
  description: 'Put your Java basics into practice by declaring variables, writing methods, and working with arrays — all translated from familiar JavaScript patterns.',
  estimatedMinutes: 5,
  steps: [
    {
      id: 'p1-s1',
      title: 'Declare Typed Variables',
      instructions: `Declare four variables with the correct Java types:
- A String called "name" set to "Alice"
- An int called "age" set to 30
- A double called "score" set to 95.5
- A boolean called "active" set to true`,
      starterCode: `// Declare your variables below:
`,
      validationPattern: 'String\\s+name\\s*=\\s*"Alice".*int\\s+age\\s*=\\s*30.*double\\s+score\\s*=\\s*95\\.5.*boolean\\s+active\\s*=\\s*true',
      hints: [
        'Remember: Java types go before the variable name (e.g., int x = 5;)',
        'String uses a capital S in Java — it\'s a class, not a primitive',
      ],
      explanation: 'Each Java variable declaration follows the pattern: Type name = value; Unlike JavaScript\'s let/const, the type must be explicit.',
    },
    {
      id: 'p1-s2',
      title: 'Write a Method',
      instructions: `Write a Java method called "greet" that:
- Takes a String parameter called "name"
- Returns a String: "Hello, " + name + "!"
- Use "public static" before the return type`,
      starterCode: `// Write the greet method:
`,
      validationPattern: 'public\\s+static\\s+String\\s+greet\\s*\\(\\s*String\\s+name\\s*\\)\\s*\\{.*return.*"Hello,?\\s*"\\s*\\+\\s*name\\s*\\+\\s*"!?".*\\}',
      hints: [
        'The return type (String) goes before the method name',
        'Method signature: public static String greet(String name)',
      ],
      explanation: 'Java methods require explicit return types and parameter types. "public static" makes the method callable without an object instance — similar to a standalone JS function.',
    },
    {
      id: 'p1-s3',
      title: 'Create and Iterate an Array',
      instructions: `Create a String array called "fruits" with three values: "apple", "banana", "cherry".
Then write a for-each loop that prints each fruit using System.out.println.`,
      starterCode: `// Create the array and loop:
`,
      validationPattern: 'String\\[\\]\\s+fruits\\s*=.*\\{.*"apple".*"banana".*"cherry".*\\}.*for\\s*\\(\\s*String\\s+\\w+\\s*:\\s*fruits\\s*\\).*System\\.out\\.println',
      hints: [
        'Array declaration: String[] fruits = {"apple", "banana", "cherry"};',
        'Enhanced for loop syntax: for (String fruit : fruits) { ... }',
      ],
      explanation: 'Java arrays use Type[] syntax and are fixed-size. The enhanced for loop (for-each) uses a colon (:) instead of JavaScript\'s "of" keyword.',
    },
    {
      id: 'p1-s4',
      title: 'Handle Null Safely',
      instructions: `Write a null-safe method called "getLength" that:
- Takes a String parameter called "text"
- Returns an int
- If text is null, return 0
- Otherwise, return text.length()`,
      starterCode: `// Write the null-safe getLength method:
`,
      validationPattern: '(public\\s+static\\s+)?int\\s+getLength\\s*\\(\\s*String\\s+text\\s*\\)\\s*\\{.*if\\s*\\(\\s*text\\s*[!=]=\\s*null\\s*\\).*return.*text\\.length\\(\\).*return\\s+0.*\\}',
      hints: [
        'Check for null first: if (text == null) return 0;',
        'String.length() is a method in Java (with parentheses), not a property',
      ],
      explanation: 'Null-checking is essential in Java to avoid NullPointerException. Unlike JavaScript\'s optional chaining (?.), Java requires explicit null checks.',
    },
  ],
};

export default project1;
