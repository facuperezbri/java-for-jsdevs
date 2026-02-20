import type { Module } from '../../types';
import project3 from '../projects/project-3';

const module3: Module = {
  id: 'module-3',
  order: 3,
  title: 'Collections & Generics',
  subtitle: 'ArrayList, HashMap, HashSet, and the Streams API',
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
          title: 'ArrayList — Java\'s Dynamic Array',
          explanation: 'ArrayList is Java\'s equivalent of a JavaScript array — it can grow and shrink dynamically. Unlike JS arrays, you must specify the element type.',
          codeExample: {
            javascript: `// JS array — dynamic by default
const fruits = [];
fruits.push("apple");
fruits.push("banana");
console.log(fruits.length); // 2
console.log(fruits[0]);     // apple
fruits.splice(0, 1);        // remove first
console.log(fruits);        // ["banana"]`,
            java: `// Java ArrayList — dynamic array
import java.util.ArrayList;

ArrayList<String> fruits = new ArrayList<>();
fruits.add("apple");
fruits.add("banana");
System.out.println(fruits.size());   // 2 (not .length!)
System.out.println(fruits.get(0));   // apple (not [0]!)
fruits.remove(0);                    // remove by index
System.out.println(fruits);          // [banana]`,
            caption: 'ArrayList uses .add()/.get()/.size() instead of push/[]/length',
          },
          callout: {
            type: 'info',
            text: 'Import statements go at the top of the file. Java\'s standard library requires imports — it doesn\'t auto-import like many JS bundlers do.',
          },
          challenge: {
            id: 'ch3-1-1',
            type: 'fill-blank',
            prompt: 'Create an ArrayList of Strings and add two items:',
            code: `ArrayList<___BLANK_1___> names = new ArrayList<>();
names.___BLANK_2___("Alice");
names.___BLANK_3___("Bob");
System.out.println(names.___BLANK_4___());`,
            blanks: [
              { id: 'b1', expected: ['String'], hint: 'element type' },
              { id: 'b2', expected: ['add'], hint: 'like push()' },
              { id: 'b3', expected: ['add'], hint: 'like push()' },
              { id: 'b4', expected: ['size'], hint: 'like length' },
            ],
            explanation: 'ArrayList uses .add() instead of .push(), and .size() instead of .length. The type parameter <String> ensures only Strings can be added — the compiler enforces this.',
          },
        },
        {
          id: 'c2',
          title: 'Iterating ArrayLists',
          explanation: 'You can iterate an ArrayList with a for-each loop or a traditional index loop, similar to JavaScript.',
          codeExample: {
            javascript: `const nums = [10, 20, 30];

// forEach
nums.forEach(n => console.log(n));

// for...of
for (const n of nums) {
  console.log(n);
}

// traditional index
for (let i = 0; i < nums.length; i++) {
  console.log(nums[i]);
}`,
            java: `ArrayList<Integer> nums = new ArrayList<>();
nums.add(10); nums.add(20); nums.add(30);

// forEach (lambda)
nums.forEach(n -> System.out.println(n));

// enhanced for loop
for (int n : nums) {
  System.out.println(n);
}

// traditional index
for (int i = 0; i < nums.size(); i++) {
  System.out.println(nums.get(i));
}`,
            caption: 'Java\'s lambda "->" is equivalent to JS\'s arrow function "=>"',
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
          explanation: 'After adding 3 items, remove(1) removes the element at index 1 ("banana"). The remaining list is ["apple", "cherry"]. size() is 2, and get(1) returns "cherry" which shifted to index 1.',
          hint: 'remove(1) removes by index, not by value. The remaining elements shift down.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'You want to find the index of "banana" in an ArrayList<String>. How do you do it?',
          hint: 'ArrayList has a method similar to JS array\'s indexOf()',
          answer: 'fruits.indexOf("banana") — returns the index or -1 if not found. Same behavior as JS\'s array.indexOf()! Also available: fruits.contains("banana") for a boolean check.',
        },
        {
          id: 'e2',
          prompt: 'What happens if you try to create ArrayList<int>? Why?',
          hint: 'Remember the rule about generics and primitive types',
          answer: 'Compile error! Generics only work with reference types. Use ArrayList<Integer> instead. Java will auto-box int values to Integer automatically (autoboxing), so you can still do: list.add(42) — Java wraps 42 in an Integer object behind the scenes.',
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
          title: 'HashMap — Java\'s Object/Map',
          explanation: 'HashMap is Java\'s key-value store, equivalent to a JavaScript plain object {} or Map. You must specify both key and value types.',
          codeExample: {
            javascript: `// JS plain object
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
            caption: 'HashMap uses put()/get() instead of bracket notation, and remove() instead of delete',
          },
          challenge: {
            id: 'ch3-2-1',
            type: 'fill-blank',
            prompt: 'Create a HashMap and add key-value pairs:',
            code: `HashMap<String, ___BLANK_1___> ages = new HashMap<>();
ages.___BLANK_2___("Alice", 30);
ages.___BLANK_3___("Bob", 25);
System.out.println(ages.___BLANK_4___("Alice"));`,
            blanks: [
              { id: 'b1', expected: ['Integer'], hint: 'wrapper for int' },
              { id: 'b2', expected: ['put'], hint: 'add a key-value pair' },
              { id: 'b3', expected: ['put'], hint: 'add a key-value pair' },
              { id: 'b4', expected: ['get'], hint: 'retrieve by key' },
            ],
            explanation: 'HashMap uses put(key, value) to add entries and get(key) to retrieve them. Note that the value type must be Integer (wrapper class), not int (primitive), since generics require reference types.',
          },
        },
        {
          id: 'c2',
          title: 'Iterating a HashMap',
          explanation: 'Iterating a HashMap is similar to Object.entries() in JavaScript. Use entrySet() to get key-value pairs.',
          codeExample: {
            javascript: `const scores = { Alice: 95, Bob: 87 };

// Object.entries
Object.entries(scores).forEach(([name, score]) => {
  console.log(\`\${name}: \${score}\`);
});

// for...of with Map
const map = new Map([["Alice", 95]]);
for (const [key, val] of map) {
  console.log(key, val);
}`,
            java: `HashMap<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
scores.put("Bob", 87);

// entrySet() — like Object.entries()
for (Map.Entry<String, Integer> entry : scores.entrySet()) {
  System.out.println(entry.getKey() + ": " + entry.getValue());
}

// forEach with lambda (cleaner)
scores.forEach((name, score) -> {
  System.out.println(name + ": " + score);
});`,
            caption: 'entrySet() iterates key-value pairs — like Object.entries() but with explicit types',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'In JS you can do: const val = obj.key ?? "default". What is the HashMap equivalent in Java?',
          hint: 'HashMap has a method that combines get + default in one call',
          answer: 'scores.getOrDefault("Alice", 0) — returns the value if present, or 0 if not. This is the clean Java equivalent of obj.key ?? defaultValue.',
        },
        {
          id: 'e2',
          prompt: 'How do you check if a HashMap contains a specific key?',
          hint: 'Similar to JS\'s hasOwnProperty or "in" operator',
          answer: 'scores.containsKey("Alice") — returns boolean. Similar to "Alice" in scores (JS object) or scores.has("Alice") (JS Map). Also: scores.containsValue(95) checks if a value exists.',
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
          title: 'HashSet — Unique Values Only',
          explanation: 'HashSet is Java\'s equivalent of JavaScript\'s Set — it stores unique values only, with O(1) lookup time.',
          codeExample: {
            javascript: `// JS Set
const seen = new Set();
seen.add("apple");
seen.add("banana");
seen.add("apple"); // duplicate, ignored
console.log(seen.size);        // 2
console.log(seen.has("apple")); // true

// Remove duplicates from array:
const unique = [...new Set([1, 2, 2, 3, 3])];`,
            java: `import java.util.HashSet;

HashSet<String> seen = new HashSet<>();
seen.add("apple");
seen.add("banana");
seen.add("apple"); // duplicate, ignored
System.out.println(seen.size());        // 2
System.out.println(seen.contains("apple")); // true

// Remove duplicates from list:
ArrayList<Integer> nums = new ArrayList<>(List.of(1,2,2,3,3));
HashSet<Integer> unique = new HashSet<>(nums);`,
            caption: 'HashSet mirrors JS Set closely — add/contains/size instead of add/has/size',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'Why would you use a HashSet instead of an ArrayList to track visited URLs in a web crawler?',
          hint: 'Think about lookup performance and uniqueness guarantees',
          answer: 'HashSet.contains() is O(1) — constant time regardless of size. ArrayList.contains() is O(n) — scans every element. For 1 million URLs, HashSet checks instantly while ArrayList checks all million. Also, HashSet automatically prevents duplicates without any extra code.',
        },
      ],
    },
    {
      id: 'lesson-3-4',
      moduleId: 'module-3',
      title: 'Generics Deep Dive',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Bounded Type Parameters',
          explanation: 'You can restrict what types a generic can accept using "extends". This is like TypeScript\'s "extends" in generic constraints.',
          codeExample: {
            javascript: `// TypeScript bounded generics
function sum<T extends number>(nums: T[]): T {
  return nums.reduce((a, b) => a + b, 0) as T;
}

// Generic with constraint:
function getLength<T extends { length: number }>(item: T) {
  return item.length;
}`,
            java: `// Java bounded generics
// T must be a Number or subclass (Integer, Double, etc.)
public static <T extends Number> double sum(List<T> nums) {
  double total = 0;
  for (T n : nums) {
    total += n.doubleValue(); // Number method
  }
  return total;
}

sum(List.of(1, 2, 3));        // works (Integer extends Number)
sum(List.of(1.5, 2.5));       // works (Double extends Number)
// sum(List.of("a", "b"));    // compile error!`,
            caption: '"extends" in generics means "is a subtype of" — works for both classes and interfaces',
          },
        },
        {
          id: 'c2',
          title: 'Type Erasure',
          explanation: 'A key difference from TypeScript: Java\'s generic type information is erased at runtime (type erasure). TypeScript types are erased at compile time but never exist at runtime either — Java has a legacy reason for this.',
          codeExample: {
            javascript: `// TypeScript: types are compile-time only
// At runtime, this is just a regular array
const nums: Array<number> = [1, 2, 3];`,
            java: `// Java type erasure: at runtime, generics become Object
ArrayList<String> strings = new ArrayList<>();
ArrayList<Integer> ints = new ArrayList<>();

// At runtime, both are just "ArrayList"!
System.out.println(strings.getClass() == ints.getClass()); // true!

// Can't do: if (list instanceof ArrayList<String>) {}
// CAN do:  if (list instanceof ArrayList<?>) {}`,
            caption: 'At runtime, ArrayList<String> and ArrayList<Integer> are the same class due to type erasure',
          },
          callout: {
            type: 'info',
            text: 'Type erasure is why you can\'t create arrays of generic types: new T[10] is a compile error. Use ArrayList<T> instead.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'Why can\'t you write: if (myList instanceof ArrayList<String>) in Java?',
          hint: 'Think about what happens to generic type info at runtime',
          answer: 'Due to type erasure, the <String> information is gone at runtime. All you can check is instanceof ArrayList<?>. To check the element type, you\'d need to examine the elements themselves or use a typed token pattern.',
        },
      ],
    },
    {
      id: 'lesson-3-5',
      moduleId: 'module-3',
      title: 'Streams API',
      estimatedMinutes: 14,
      concepts: [
        {
          id: 'c1',
          title: 'Streams — Java\'s Array Method Chain',
          explanation: 'Java\'s Streams API (Java 8+) is like JavaScript\'s array methods (filter, map, reduce) but works on any collection and is lazily evaluated.',
          codeExample: {
            javascript: `// JS array methods
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
            caption: '.stream() enters the Stream pipeline — terminate with .collect(), .reduce(), .forEach(), etc.',
          },
        },
        {
          id: 'c2',
          title: 'Collecting Results',
          explanation: 'Streams are lazy — they don\'t do anything until a terminal operation is called. Use .collect(Collectors.toList()) to convert back to a List.',
          codeExample: {
            javascript: `const names = ["alice", "bob", "charlie"];

// JS: map returns a new array directly
const upper = names.map(n => n.toUpperCase());
// ["ALICE", "BOB", "CHARLIE"]`,
            java: `List<String> names = List.of("alice", "bob", "charlie");

// Java: must collect() to get a List back
List<String> upper = names.stream()
  .map(n -> n.toUpperCase())
  .collect(Collectors.toList());
// [ALICE, BOB, CHARLIE]

// Java 16+: .toList() shorthand
List<String> upper2 = names.stream()
  .map(String::toUpperCase)  // method reference
  .toList();`,
            caption: '.collect(Collectors.toList()) is the Java equivalent of JS map() returning a new array',
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
          explanation: 'The stream filters for even numbers (2 and 4), then .count() returns how many elements remain. There are 2 even numbers in [1, 2, 3, 4, 5].',
          hint: 'Count how many numbers from 1-5 are divisible by 2.',
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'What is the Java Streams equivalent of: names.filter(n => n.startsWith("A"))?',
          hint: 'Java has a filter() method on streams too',
          answer: 'names.stream().filter(n -> n.startsWith("A")).collect(Collectors.toList()) — or .toList() in Java 16+. The lambda syntax is almost identical: JS uses => and Java uses ->.',
        },
        {
          id: 'e2',
          prompt: 'What does "lazy evaluation" mean for Java Streams, and how does it differ from JS array methods?',
          hint: 'Think about when the filtering/mapping actually happens',
          answer: 'Java Streams are lazy: filter/map operations are not executed until a terminal operation (collect, reduce, forEach) is called. JS array methods (filter, map) execute immediately and create new arrays at each step. Java\'s laziness allows optimization — e.g., if you only need the first match, it can stop early.',
        },
      ],
    },
  ],
};

export default module3;
