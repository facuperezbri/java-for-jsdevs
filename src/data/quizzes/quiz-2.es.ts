import type { Quiz } from '../../types';

const quiz2: Quiz = {
  id: 'quiz-2',
  moduleId: 'module-2',
  title: 'Cuestionario de POO',
  questions: [
    {
      id: 'q1',
      question: 'Creas una clase pública llamada "ProductService". ¿Cómo debe llamarse el archivo?',
      options: [
        { key: 'a', text: 'productservice.java' },
        { key: 'b', text: 'product-service.java' },
        { key: 'c', text: 'ProductService.java' },
        { key: 'd', text: 'Cualquier nombre con extensión .java' },
      ],
      correctKey: 'c',
      explanation: 'En Java, el nombre del archivo debe coincidir exactamente con el nombre de la clase pública, incluyendo mayúsculas. "ProductService.java" — sensible a mayúsculas. Esto es impuesto por el compilador de Java.',
    },
    {
      id: 'q2',
      question: '¿Qué modificador de acceso hace que un campo sea accesible solo dentro de la misma clase?',
      options: [
        { key: 'a', text: 'public' },
        { key: 'b', text: 'protected' },
        { key: 'c', text: 'package' },
        { key: 'd', text: 'private' },
      ],
      correctKey: 'd',
      explanation: '"private" restringe el acceso solo a la clase declarante. "protected" permite subclases y acceso del mismo paquete. "public" permite a todos. Sin modificador = package-private (solo mismo paquete).',
    },
    {
      id: 'q3',
      question: '¿Qué hace @Override cuando se coloca en un método?',
      options: [
        { key: 'a', text: 'Hace que el método se ejecute más rápido' },
        { key: 'b', text: 'Le dice al compilador que verifique que este método sobrescribe un método padre' },
        { key: 'c', text: 'Hace que el método sea private' },
        { key: 'd', text: 'Previene que el método sea sobrescrito más' },
      ],
      correctKey: 'b',
      explanation: '@Override es una verificación en tiempo de compilación: si el método no coincide con ninguna firma de método de la clase padre, el compilador lanza un error. Esto detecta typos como "toSting()" en lugar de "toString()" — algo que JS no tiene.',
    },
    {
      id: 'q4',
      question: '¿Puede una clase Java extender múltiples clases? (ej. class C extends A, B)',
      options: [
        { key: 'a', text: 'Sí, Java soporta herencia múltiple' },
        { key: 'b', text: 'No, Java solo soporta herencia simple de clases' },
        { key: 'c', text: 'Sí, pero solo para clases abstractas' },
        { key: 'd', text: 'Solo si las clases están en el mismo paquete' },
      ],
      correctKey: 'b',
      explanation: 'Java soporta herencia simple para clases — una clase solo puede extender UNA clase padre. Para lograr comportamiento de múltiples tipos, implementa múltiples interfaces. Esto evita el "problema del diamante" de la herencia múltiple.',
    },
    {
      id: 'q5',
      question: '¿Cuál es la diferencia clave entre una interfaz Java y una clase abstracta?',
      options: [
        { key: 'a', text: 'Las interfaces no pueden tener implementaciones de métodos' },
        { key: 'b', text: 'Las clases abstractas no pueden ser extendidas' },
        { key: 'c', text: 'Una clase puede implementar múltiples interfaces pero extender solo una clase abstracta' },
        { key: 'd', text: 'Las interfaces son más rápidas que las clases abstractas' },
      ],
      correctKey: 'c',
      explanation: 'La diferencia práctica clave: una clase puede implementar múltiples interfaces (múltiples contratos de tipo) pero solo puede extender una clase (abstracta o concreta). Ambas pueden tener implementaciones de métodos (las clases abstractas siempre pudieron; las interfaces desde Java 8 con métodos default).',
    },
    {
      id: 'q6',
      question: 'En TypeScript: interface Serializable {}. ¿Cuál es el constructo equivalente en Java?',
      options: [
        { key: 'a', text: 'abstract class Serializable {}' },
        { key: 'b', text: 'interface Serializable {}' },
        { key: 'c', text: 'class Serializable {}' },
        { key: 'd', text: 'type Serializable = {}' },
      ],
      correctKey: 'b',
      explanation: '¡Java también usa la palabra clave "interface"! La sintaxis es casi idéntica a TypeScript. La diferencia principal: las interfaces Java son constructos reales en runtime (no se borran como TypeScript), y pueden tener implementaciones de métodos default.',
    },
    {
      id: 'q7',
      question: '¿Qué significa que una clase Java sea "genérica" (como Box<T>)?',
      options: [
        { key: 'a', text: 'La clase solo puede almacenar Objects' },
        { key: 'b', text: 'La clase funciona con cualquier tipo especificado manteniendo seguridad de tipos' },
        { key: 'c', text: 'La clase no tiene constructores' },
        { key: 'd', text: 'La clase no puede ser extendida' },
      ],
      correctKey: 'b',
      explanation: 'Los genéricos permiten escribir código seguro en tipos que funciona con diferentes tipos. Box<String> solo contiene Strings; Box<Integer> solo contiene Integers. El compilador lo impone — sin ClassCastException en runtime por tipos incorrectos.',
    },
    {
      id: 'q8',
      question: '¿Dónde se declaran los campos de clase Java (variables de instancia)?',
      options: [
        { key: 'a', text: 'Dentro del constructor con sintaxis "this.field ="' },
        { key: 'b', text: 'A nivel de clase, antes del constructor' },
        { key: 'c', text: 'Dentro de cualquier método que los use' },
        { key: 'd', text: 'En un archivo de interfaz separado' },
      ],
      correctKey: 'b',
      explanation: 'Los campos Java se declaran a nivel de clase con sus tipos: "private String name;" — antes del constructor. Dentro del constructor los asignas: "this.name = name;" La declaración e inicialización son separadas, a diferencia de JS donde puedes hacer ambas en el constructor.',
    },
  ],
};

export default quiz2;
