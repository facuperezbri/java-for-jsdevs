import type { Quiz } from '../../types';

const quiz3: Quiz = {
  id: 'quiz-3',
  moduleId: 'module-3',
  title: 'Collections & Generics Quiz',
  questions: [
    {
      id: 'q1',
      question: 'What is the Java equivalent of JavaScript\'s dynamic array (push/pop/length)?',
      options: [
        { key: 'a', text: 'int[] (Java array)' },
        { key: 'b', text: 'ArrayList<T>' },
        { key: 'c', text: 'LinkedList<T>' },
        { key: 'd', text: 'HashSet<T>' },
      ],
      correctKey: 'b',
      explanation: 'ArrayList<T> is Java\'s dynamic array equivalent. Unlike Java arrays (fixed size), ArrayList can grow with .add() and shrink with .remove(). Use ArrayList<String>, ArrayList<Integer>, etc.',
    },
    {
      id: 'q2',
      question: 'In JavaScript: array.length. What is the equivalent for an ArrayList in Java?',
      options: [
        { key: 'a', text: 'list.length' },
        { key: 'b', text: 'list.length()' },
        { key: 'c', text: 'list.size()' },
        { key: 'd', text: 'list.count()' },
      ],
      correctKey: 'c',
      explanation: 'ArrayList (and all Java Collections) use .size() to get the count. Java arrays use .length (no parentheses). Strings use .length() (with parentheses). Remember: ArrayList → .size(), Array → .length, String → .length()',
    },
    {
      id: 'q3',
      question: 'What is the Java equivalent of a JavaScript plain object {} used as a key-value store?',
      options: [
        { key: 'a', text: 'ArrayList<Object>' },
        { key: 'b', text: 'HashSet<String>' },
        { key: 'c', text: 'HashMap<String, Object>' },
        { key: 'd', text: 'LinkedList<Entry>' },
      ],
      correctKey: 'c',
      explanation: 'HashMap<K, V> is Java\'s key-value store, equivalent to a JS plain object or Map. Use put() to set values (instead of obj.key = val) and get() to retrieve them (instead of obj.key).',
    },
    {
      id: 'q4',
      question: 'How do you iterate over a HashMap\'s key-value pairs in Java? (like Object.entries() in JS)',
      options: [
        { key: 'a', text: 'for (var entry : map.entries())' },
        { key: 'b', text: 'for (Map.Entry<K,V> entry : map.entrySet())' },
        { key: 'c', text: 'map.forEach(key => value)' },
        { key: 'd', text: 'map.entries().forEach()' },
      ],
      correctKey: 'b',
      explanation: 'Use map.entrySet() to get key-value pairs — like Object.entries() in JS. Each entry is a Map.Entry<K,V> with .getKey() and .getValue() methods. Alternatively, use map.forEach((k, v) -> ...) with a lambda.',
    },
    {
      id: 'q5',
      question: 'What is HashSet\'s main guarantee?',
      options: [
        { key: 'a', text: 'Elements are stored in insertion order' },
        { key: 'b', text: 'Elements are always sorted' },
        { key: 'c', text: 'No duplicate elements — all values are unique' },
        { key: 'd', text: 'Elements can only be Strings' },
      ],
      correctKey: 'c',
      explanation: 'HashSet guarantees uniqueness — adding a duplicate silently does nothing. Like JavaScript\'s Set. Use .contains() for O(1) lookup instead of scanning an ArrayList with .contains() which is O(n).',
    },
    {
      id: 'q6',
      question: 'What does .stream() do in Java?',
      options: [
        { key: 'a', text: 'Reads data from a file' },
        { key: 'b', text: 'Opens a network connection' },
        { key: 'c', text: 'Converts a collection into a lazy pipeline for filter/map/reduce operations' },
        { key: 'd', text: 'Creates a copy of the collection' },
      ],
      correctKey: 'c',
      explanation: '.stream() enters the Stream API — a lazy pipeline similar to JS array methods (filter/map/reduce). Operations are not executed until a terminal operation (.collect(), .forEach(), .reduce()) is called.',
    },
    {
      id: 'q7',
      question: 'How do you convert a Stream back to a List after filter/map operations in Java?',
      options: [
        { key: 'a', text: '.toArray()' },
        { key: 'b', text: '.collect(Collectors.toList()) or .toList() in Java 16+' },
        { key: 'c', text: '.end()' },
        { key: 'd', text: '.materialize()' },
      ],
      correctKey: 'b',
      explanation: '.collect(Collectors.toList()) is the terminal operation that materializes the stream into a List. In Java 16+, .toList() is a shorthand. This is the key difference from JS: array.filter().map() returns a new array directly, but Java streams need explicit collection.',
    },
    {
      id: 'q8',
      question: 'Why can\'t you write ArrayList<int> in Java? What should you write instead?',
      options: [
        { key: 'a', text: 'Java doesn\'t support number lists' },
        { key: 'b', text: 'Generics only work with reference types; use ArrayList<Integer>' },
        { key: 'c', text: 'Use ArrayList<Int> (capital I)' },
        { key: 'd', text: 'Use int[] instead' },
      ],
      correctKey: 'b',
      explanation: 'Java generics only work with reference types (objects), not primitives. Use the wrapper class: ArrayList<Integer> (not int), ArrayList<Double> (not double), ArrayList<Boolean> (not boolean). Java auto-boxes primitives to their wrappers when adding to a collection.',
    },
  ],
};

export default quiz3;
