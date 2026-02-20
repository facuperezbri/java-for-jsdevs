import type { Quiz } from '../../types';

const quiz1: Quiz = {
  id: 'quiz-1',
  moduleId: 'module-1',
  title: 'Cuestionario de sintaxis básica y tipos',
  questions: [
    {
      id: 'q1',
      question: 'En JavaScript escribes "let count = 5". ¿Cuál es el equivalente correcto en Java?',
      options: [
        { key: 'a', text: 'let count = 5;' },
        { key: 'b', text: 'var count = 5;' },
        { key: 'c', text: 'int count = 5;' },
        { key: 'd', text: 'number count = 5;' },
      ],
      correctKey: 'c',
      explanation: 'Java requiere un tipo explícito. "int" es el tipo para números enteros. "let" y "var" son palabras clave de JavaScript, y "number" no es un tipo de Java.',
    },
    {
      id: 'q2',
      question: '¿Qué tipo de Java es equivalente a los valores "true" / "false" de JavaScript?',
      options: [
        { key: 'a', text: 'Bool' },
        { key: 'b', text: 'bool' },
        { key: 'c', text: 'Boolean (solo B mayúscula)' },
        { key: 'd', text: 'boolean (minúsculas)' },
      ],
      correctKey: 'd',
      explanation: 'El tipo primitivo boolean de Java es "boolean" en minúsculas. "Boolean" (B mayúscula) es la clase wrapper. Para declaraciones de variables, usa "boolean flag = true;"',
    },
    {
      id: 'q3',
      question: 'Necesitas comparar dos valores String en Java. ¿Cuál es correcto?',
      options: [
        { key: 'a', text: 'if (s1 == s2)' },
        { key: 'b', text: 'if (s1 === s2)' },
        { key: 'c', text: 'if (s1.equals(s2))' },
        { key: 'd', text: 'if (s1.compare(s2))' },
      ],
      correctKey: 'c',
      explanation: 'En Java, == en Strings verifica la identidad de referencia del objeto, no el valor. Siempre usa .equals() para comparar contenido de String. "===" no existe en Java.',
    },
    {
      id: 'q4',
      question: '¿Qué significa el tipo de retorno "void" de Java en una declaración de método?',
      options: [
        { key: 'a', text: 'El método puede retornar cualquier tipo' },
        { key: 'b', text: 'El método retorna null' },
        { key: 'c', text: 'El método no retorna nada (como undefined implícito en JS)' },
        { key: 'd', text: 'El método es private' },
      ],
      correctKey: 'c',
      explanation: '"void" significa que el método no tiene valor de retorno, similar a una función JS que no tiene return (que retorna undefined implícitamente). Los métodos void no pueden usar "return algunValor;"',
    },
    {
      id: 'q5',
      question: 'En JavaScript: const names = ["Alice", "Bob"]; ¿Cuál es el equivalente en Java?',
      options: [
        { key: 'a', text: 'String names[] = new String("Alice", "Bob");' },
        { key: 'b', text: 'String[] names = {"Alice", "Bob"};' },
        { key: 'c', text: 'Array<String> names = {"Alice", "Bob"};' },
        { key: 'd', text: 'var names = ["Alice", "Bob"];' },
      ],
      correctKey: 'b',
      explanation: 'La declaración de array Java usa el tipo seguido de []. El inicializador usa llaves {}, no corchetes []. String[] names = {"Alice", "Bob"} es la sintaxis correcta.',
    },
    {
      id: 'q6',
      question: '¿Cuál es el error de tiempo de ejecución más común en Java equivalente a "Cannot read property of undefined" en JavaScript?',
      options: [
        { key: 'a', text: 'ClassCastException' },
        { key: 'b', text: 'ArrayIndexOutOfBoundsException' },
        { key: 'c', text: 'NullPointerException (NPE)' },
        { key: 'd', text: 'IllegalArgumentException' },
      ],
      correctKey: 'c',
      explanation: 'NullPointerException (NPE) ocurre cuando llamas un método en una referencia null — como llamar .length() en un String que es null. Es el equivalente en Java de "Cannot read properties of undefined" en JavaScript.',
    },
    {
      id: 'q7',
      question: '¿Qué tipo de Java usarías para almacenar un precio como $9.99?',
      options: [
        { key: 'a', text: 'int' },
        { key: 'b', text: 'float' },
        { key: 'c', text: 'double' },
        { key: 'd', text: 'decimal' },
      ],
      correctKey: 'c',
      explanation: '"double" se prefiere para la mayoría de cálculos decimales. "float" tiene menos precisión. "int" solo puede contener números enteros. "decimal" no es un tipo primitivo de Java (aunque existe BigDecimal para cálculos de dinero exactos).',
    },
    {
      id: 'q8',
      question: '¿Cómo obtienes el número de elementos en un array Java vs un String Java?',
      options: [
        { key: 'a', text: 'Ambos usan .length()' },
        { key: 'b', text: 'Ambos usan .length (sin paréntesis)' },
        { key: 'c', text: 'Array: .length (propiedad) | String: .length() (método)' },
        { key: 'd', text: 'Array: .size() | String: .length()' },
      ],
      correctKey: 'c',
      explanation: 'Java tiene una inconsistencia: los arrays usan .length (campo, sin paréntesis) mientras los Strings usan .length() (método, con paréntesis). ArrayList usa .size(). Esta inconsistencia es una peculiaridad conocida de Java.',
    },
  ],
};

export default quiz1;
