import type { MiniProject } from '../../types';

const project3: MiniProject = {
  id: 'project-3',
  moduleId: 'module-3',
  title: 'Student Gradebook',
  description: 'Build a student gradebook using ArrayList, HashMap, and Streams — managing students, storing grades, and computing statistics.',
  estimatedMinutes: 15,
  steps: [
    {
      id: 'p3-s1',
      title: 'Create the Student Class',
      instructions: `Create a Student class with:
- Private fields: String name, int age
- A constructor taking name and age
- Public getter methods: getName(), getAge()
- A toString() method returning "Student{name='X', age=Y}"`,
      starterCode: `// Create the Student class:
`,
      validationPattern: 'class\\s+Student.*private\\s+String\\s+name.*private\\s+int\\s+age.*public\\s+Student\\s*\\(\\s*String.*int.*\\).*public\\s+String\\s+getName\\s*\\(\\s*\\).*public\\s+int\\s+getAge\\s*\\(\\s*\\)',
      hints: [
        'Follow the standard Java class pattern: fields, constructor, getters',
        'toString(): return "Student{name=\'" + name + "\', age=" + age + "}";',
      ],
      explanation: 'This follows the standard Java Bean pattern: private fields with public getters. The toString() method is useful for debugging — similar to how you\'d implement toString() in JS.',
    },
    {
      id: 'p3-s2',
      title: 'Build an ArrayList of Students',
      instructions: `Create an ArrayList<Student> called "students" and add three students:
- "Alice", age 20
- "Bob", age 22
- "Charlie", age 19

Then print the size of the list.`,
      starterCode: `// Create and populate the ArrayList:
`,
      validationPattern: 'ArrayList<Student>\\s+students\\s*=\\s*new\\s+ArrayList<>\\s*\\(\\s*\\).*students\\.add\\(\\s*new\\s+Student\\s*\\(.*"Alice".*20.*\\)\\s*\\).*students\\.add\\(\\s*new\\s+Student\\s*\\(.*"Bob".*22.*\\)\\s*\\).*students\\.add\\(\\s*new\\s+Student\\s*\\(.*"Charlie".*19.*\\)\\s*\\)',
      hints: [
        'ArrayList<Student> students = new ArrayList<>();',
        'students.add(new Student("Alice", 20));',
      ],
      explanation: 'ArrayList<Student> is a type-safe dynamic list. Unlike JS arrays, you specify the element type in angle brackets. The diamond operator <> lets Java infer the type from the left side.',
    },
    {
      id: 'p3-s3',
      title: 'Create a Grade HashMap',
      instructions: `Create a HashMap<String, ArrayList<Integer>> called "grades" that maps student names to their list of grades.

Add grades for Alice: 95, 88, 92
Add grades for Bob: 78, 85, 90`,
      starterCode: `// Create the grades HashMap:
`,
      validationPattern: 'HashMap<String,\\s*ArrayList<Integer>>\\s+grades\\s*=\\s*new\\s+HashMap<>\\s*\\(\\s*\\).*grades\\.put\\(\\s*"Alice".*\\).*grades\\.put\\(\\s*"Bob"',
      hints: [
        'HashMap<String, ArrayList<Integer>> grades = new HashMap<>();',
        'Create each list: new ArrayList<>(List.of(95, 88, 92)) or add manually',
        'You can also use: grades.put("Alice", new ArrayList<>(Arrays.asList(95, 88, 92)));',
      ],
      explanation: 'A HashMap with ArrayList values is Java\'s equivalent of { "Alice": [95, 88, 92] } in JavaScript. The nested generics (HashMap<String, ArrayList<Integer>>) ensure type safety at compile time.',
    },
    {
      id: 'p3-s4',
      title: 'Compute Average with Streams',
      instructions: `Write a method "getAverage" that:
- Takes an ArrayList<Integer> called "grades"
- Uses the Streams API to compute the average
- Returns a double

Use: grades.stream().mapToInt(Integer::intValue).average().orElse(0.0)`,
      starterCode: `// Write the getAverage method:
`,
      validationPattern: '(public\\s+static\\s+)?double\\s+getAverage\\s*\\(\\s*ArrayList<Integer>\\s+grades\\s*\\).*grades\\.stream\\(\\).*\\.average\\(\\)',
      hints: [
        'Method signature: public static double getAverage(ArrayList<Integer> grades)',
        '.mapToInt(Integer::intValue) converts the stream to IntStream',
        '.average() returns OptionalDouble, use .orElse(0.0) for a default',
      ],
      explanation: 'Streams let you chain operations like JavaScript\'s array methods. mapToInt converts to a specialized IntStream that has .average(). The method reference Integer::intValue is shorthand for n -> n.intValue().',
    },
    {
      id: 'p3-s5',
      title: 'Filter Students with Streams',
      instructions: `Use Streams to find all students older than 19.
- Start from the students ArrayList
- Use .stream().filter() to keep students with age > 19
- Collect to a new List
- Print each student's name`,
      starterCode: `// Filter students with Streams:
`,
      validationPattern: 'students\\.stream\\(\\).*\\.filter\\(.*getAge\\(\\)\\s*>\\s*19.*\\).*\\.collect\\(',
      hints: [
        'students.stream().filter(s -> s.getAge() > 19)',
        'Collect with: .collect(Collectors.toList())',
        'Or use .toList() in Java 16+',
      ],
      explanation: 'Stream.filter() works just like Array.filter() in JS. The lambda s -> s.getAge() > 19 is equivalent to s => s.getAge() > 19 in JS. The key difference is you must collect() to get a List back.',
    },
    {
      id: 'p3-s6',
      title: 'Find Top Student',
      instructions: `Write a method "getTopStudent" that:
- Takes the grades HashMap and the students ArrayList
- Returns the name of the student with the highest average grade
- Use Streams and the getAverage method from Step 4

Hint: Use grades.entrySet().stream() and max with Comparator`,
      starterCode: `// Write getTopStudent:
`,
      validationPattern: '(public\\s+static\\s+)?String\\s+getTopStudent.*grades\\.entrySet\\(\\)\\.stream\\(\\).*\\.max\\(.*\\)',
      hints: [
        'grades.entrySet().stream() gives a stream of Map.Entry pairs',
        'Use .max(Comparator.comparingDouble(e -> getAverage(e.getValue())))',
        '.map(Map.Entry::getKey) gets the student name',
        '.orElse("No students") for the case when there are no entries',
      ],
      explanation: 'This combines HashMap iteration with Streams. entrySet().stream() is like Object.entries().map() in JS. Comparator.comparingDouble creates a comparator from a function — similar to JS .sort((a, b) => a - b).',
    },
  ],
};

export default project3;
