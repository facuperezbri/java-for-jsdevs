import type { MiniProject } from '../../types';

const project3: MiniProject = {
  id: 'project-3',
  moduleId: 'module-3',
  title: 'Libro de calificaciones de estudiantes',
  description: 'Construye un libro de calificaciones de estudiantes usando ArrayList, HashMap y Streams — gestionando estudiantes, almacenando calificaciones y calculando estadísticas.',
  estimatedMinutes: 15,
  steps: [
    {
      id: 'p3-s1',
      title: 'Crear la clase Student',
      instructions: `Crea una clase Student con:
- Campos privados: String name, int age
- Un constructor que reciba name y age
- Métodos getter públicos: getName(), getAge()
- Un método toString() que retorne "Student{name='X', age=Y}"`,
      starterCode: `// Crea la clase Student:
`,
      validationPattern: 'class\\s+Student.*private\\s+String\\s+name.*private\\s+int\\s+age.*public\\s+Student\\s*\\(\\s*String.*int.*\\).*public\\s+String\\s+getName\\s*\\(\\s*\\).*public\\s+int\\s+getAge\\s*\\(\\s*\\)',
      hints: [
        'Sigue el patrón estándar de clase Java: campos, constructor, getters',
        'toString(): return "Student{name=\'" + name + "\', age=" + age + "}";',
      ],
      explanation: 'Esto sigue el patrón estándar Java Bean: campos privados con getters públicos. El método toString() es útil para depuración — similar a cómo implementarías toString() en JS.',
    },
    {
      id: 'p3-s2',
      title: 'Construir un ArrayList de Students',
      instructions: `Crea un ArrayList<Student> llamado "students" y agrega tres estudiantes:
- "Alice", edad 20
- "Bob", edad 22
- "Charlie", edad 19

Luego imprime el tamaño de la lista.`,
      starterCode: `// Crea y popula el ArrayList:
`,
      validationPattern: 'ArrayList<Student>\\s+students\\s*=\\s*new\\s+ArrayList<>\\s*\\(\\s*\\).*students\\.add\\(\\s*new\\s+Student\\s*\\(.*"Alice".*20.*\\)\\s*\\).*students\\.add\\(\\s*new\\s+Student\\s*\\(.*"Bob".*22.*\\)\\s*\\).*students\\.add\\(\\s*new\\s+Student\\s*\\(.*"Charlie".*19.*\\)\\s*\\)',
      hints: [
        'ArrayList<Student> students = new ArrayList<>();',
        'students.add(new Student("Alice", 20));',
      ],
      explanation: 'ArrayList<Student> es una lista dinámica con seguridad de tipos. A diferencia de los arrays de JS, especificas el tipo de elemento entre ángulos. El operador diamante <> permite que Java infiera el tipo del lado izquierdo.',
    },
    {
      id: 'p3-s3',
      title: 'Crear un HashMap de calificaciones',
      instructions: `Crea un HashMap<String, ArrayList<Integer>> llamado "grades" que mapee nombres de estudiantes a su lista de calificaciones.

Agrega calificaciones para Alice: 95, 88, 92
Agrega calificaciones para Bob: 78, 85, 90`,
      starterCode: `// Crea el HashMap de grades:
`,
      validationPattern: 'HashMap<String,\\s*ArrayList<Integer>>\\s+grades\\s*=\\s*new\\s+HashMap<>\\s*\\(\\s*\\).*grades\\.put\\(\\s*"Alice".*\\).*grades\\.put\\(\\s*"Bob"',
      hints: [
        'HashMap<String, ArrayList<Integer>> grades = new HashMap<>();',
        'Crea cada lista: new ArrayList<>(List.of(95, 88, 92)) o agrega manualmente',
        'También puedes usar: grades.put("Alice", new ArrayList<>(Arrays.asList(95, 88, 92)));',
      ],
      explanation: 'Un HashMap con valores ArrayList es el equivalente en Java de { "Alice": [95, 88, 92] } en JavaScript. Los genéricos anidados (HashMap<String, ArrayList<Integer>>) aseguran seguridad de tipos en tiempo de compilación.',
    },
    {
      id: 'p3-s4',
      title: 'Calcular promedio con Streams',
      instructions: `Escribe un método "getAverage" que:
- Reciba un ArrayList<Integer> llamado "grades"
- Use la API Streams para calcular el promedio
- Retorne un double

Usa: grades.stream().mapToInt(Integer::intValue).average().orElse(0.0)`,
      starterCode: `// Escribe el método getAverage:
`,
      validationPattern: '(public\\s+static\\s+)?double\\s+getAverage\\s*\\(\\s*ArrayList<Integer>\\s+grades\\s*\\).*grades\\.stream\\(\\).*\\.average\\(\\)',
      hints: [
        'Firma del método: public static double getAverage(ArrayList<Integer> grades)',
        '.mapToInt(Integer::intValue) convierte el stream a IntStream',
        '.average() retorna OptionalDouble, usa .orElse(0.0) para un valor por defecto',
      ],
      explanation: 'Los Streams te permiten encadenar operaciones como los métodos de array de JavaScript. mapToInt convierte a un IntStream especializado que tiene .average(). La referencia a método Integer::intValue es abreviación de n -> n.intValue().',
    },
    {
      id: 'p3-s5',
      title: 'Filtrar estudiantes con Streams',
      instructions: `Usa Streams para encontrar todos los estudiantes mayores de 19.
- Comienza desde el ArrayList students
- Usa .stream().filter() para mantener estudiantes con age > 19
- Recolecta a una nueva List
- Imprime el nombre de cada estudiante`,
      starterCode: `// Filtra estudiantes con Streams:
`,
      validationPattern: 'students\\.stream\\(\\).*\\.filter\\(.*getAge\\(\\)\\s*>\\s*19.*\\).*\\.collect\\(',
      hints: [
        'students.stream().filter(s -> s.getAge() > 19)',
        'Recolecta con: .collect(Collectors.toList())',
        'O usa .toList() en Java 16+',
      ],
      explanation: 'Stream.filter() funciona igual que Array.filter() en JS. La lambda s -> s.getAge() > 19 es equivalente a s => s.getAge() > 19 en JS. La diferencia clave es que debes collect() para obtener una List de vuelta.',
    },
    {
      id: 'p3-s6',
      title: 'Encontrar el mejor estudiante',
      instructions: `Escribe un método "getTopStudent" que:
- Reciba el HashMap grades y el ArrayList students
- Retorne el nombre del estudiante con la calificación promedio más alta
- Use Streams y el método getAverage del Paso 4

Pista: Usa grades.entrySet().stream() y max con Comparator`,
      starterCode: `// Escribe getTopStudent:
`,
      validationPattern: '(public\\s+static\\s+)?String\\s+getTopStudent.*grades\\.entrySet\\(\\)\\.stream\\(\\).*\\.max\\(.*\\)',
      hints: [
        'grades.entrySet().stream() da un stream de pares Map.Entry',
        'Usa .max(Comparator.comparingDouble(e -> getAverage(e.getValue())))',
        '.map(Map.Entry::getKey) obtiene el nombre del estudiante',
        '.orElse("No students") para cuando no hay entradas',
      ],
      explanation: 'Esto combina iteración de HashMap con Streams. entrySet().stream() es como Object.entries().map() en JS. Comparator.comparingDouble crea un comparador desde una función — similar a .sort((a, b) => a - b) en JS.',
    },
  ],
};

export default project3;
