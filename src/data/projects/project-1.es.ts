import type { MiniProject } from '../../types';

const project1: MiniProject = {
  id: 'project-1',
  moduleId: 'module-1',
  title: 'Declaraciones de tipos y métodos',
  description: 'Pon en práctica los fundamentos de Java declarando variables, escribiendo métodos y trabajando con arrays — todo traducido desde patrones familiares de JavaScript.',
  estimatedMinutes: 5,
  steps: [
    {
      id: 'p1-s1',
      title: 'Declarar variables tipadas',
      instructions: `Declara cuatro variables con los tipos Java correctos:
- Un String llamado "name" con valor "Alice"
- Un int llamado "age" con valor 30
- Un double llamado "score" con valor 95.5
- Un boolean llamado "active" con valor true`,
      starterCode: `// Declara tus variables abajo:
`,
      validationPattern: 'String\\s+name\\s*=\\s*"Alice".*int\\s+age\\s*=\\s*30.*double\\s+score\\s*=\\s*95\\.5.*boolean\\s+active\\s*=\\s*true',
      hints: [
        'Recuerda: los tipos Java van antes del nombre de la variable (ej: int x = 5;)',
        'String usa S mayúscula en Java — es una clase, no un primitivo',
      ],
      explanation: 'Cada declaración de variable Java sigue el patrón: Tipo nombre = valor; A diferencia del let/const de JavaScript, el tipo debe ser explícito.',
    },
    {
      id: 'p1-s2',
      title: 'Escribir un método',
      instructions: `Escribe un método Java llamado "greet" que:
- Reciba un parámetro String llamado "name"
- Retorne un String: "Hello, " + name + "!"
- Use "public static" antes del tipo de retorno`,
      starterCode: `// Escribe el método greet:
`,
      validationPattern: 'public\\s+static\\s+String\\s+greet\\s*\\(\\s*String\\s+name\\s*\\)\\s*\\{.*return.*"Hello,?\\s*"\\s*\\+\\s*name\\s*\\+\\s*"!?".*\\}',
      hints: [
        'El tipo de retorno (String) va antes del nombre del método',
        'Firma del método: public static String greet(String name)',
      ],
      explanation: 'Los métodos Java requieren tipos de retorno y de parámetros explícitos. "public static" hace que el método sea invocable sin una instancia de objeto — similar a una función JS independiente.',
    },
    {
      id: 'p1-s3',
      title: 'Crear e iterar un array',
      instructions: `Crea un array de String llamado "fruits" con tres valores: "apple", "banana", "cherry".
Luego escribe un bucle for-each que imprima cada fruta usando System.out.println.`,
      starterCode: `// Crea el array y el bucle:
`,
      validationPattern: 'String\\[\\]\\s+fruits\\s*=.*\\{.*"apple".*"banana".*"cherry".*\\}.*for\\s*\\(\\s*String\\s+\\w+\\s*:\\s*fruits\\s*\\).*System\\.out\\.println',
      hints: [
        'Declaración de array: String[] fruits = {"apple", "banana", "cherry"};',
        'Sintaxis del bucle for mejorado: for (String fruit : fruits) { ... }',
      ],
      explanation: 'Los arrays Java usan sintaxis Tipo[] y tienen tamaño fijo. El bucle for mejorado (for-each) usa dos puntos (:) en lugar de la palabra clave "of" de JavaScript.',
    },
    {
      id: 'p1-s4',
      title: 'Manejar null de forma segura',
      instructions: `Escribe un método seguro ante null llamado "getLength" que:
- Reciba un parámetro String llamado "text"
- Retorne un int
- Si text es null, retorne 0
- De lo contrario, retorne text.length()`,
      starterCode: `// Escribe el método getLength seguro ante null:
`,
      validationPattern: '(public\\s+static\\s+)?int\\s+getLength\\s*\\(\\s*String\\s+text\\s*\\)\\s*\\{.*if\\s*\\(\\s*text\\s*[!=]=\\s*null\\s*\\).*return.*text\\.length\\(\\).*return\\s+0.*\\}',
      hints: [
        'Verifica null primero: if (text == null) return 0;',
        'String.length() es un método en Java (con paréntesis), no una propiedad',
      ],
      explanation: 'Verificar null es esencial en Java para evitar NullPointerException. A diferencia del optional chaining (?.) de JavaScript, Java requiere verificaciones explícitas de null.',
    },
  ],
};

export default project1;
