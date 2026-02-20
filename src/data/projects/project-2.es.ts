import type { MiniProject } from '../../types';

const project2: MiniProject = {
  id: 'project-2',
  moduleId: 'module-2',
  title: 'Jerarquía de clases Shape',
  description: 'Construye una jerarquía de clases con Shape como base, luego subclases Circle y Rectangle — aplicando herencia, métodos abstractos e interfaces.',
  estimatedMinutes: 10,
  steps: [
    {
      id: 'p2-s1',
      title: 'Crear la clase abstracta Shape',
      instructions: `Crea una clase abstracta llamada "Shape" con:
- Un campo privado String "color"
- Un constructor que reciba un parámetro String color
- Un método getter público "getColor()" que retorne el color
- Un método abstracto "area()" que retorne un double`,
      starterCode: `// Crea la clase abstracta Shape:
`,
      validationPattern: 'abstract\\s+class\\s+Shape.*private\\s+String\\s+color.*public\\s+Shape\\s*\\(\\s*String\\s+color\\s*\\).*this\\.color\\s*=\\s*color.*public\\s+String\\s+getColor\\s*\\(\\s*\\).*return\\s+(this\\.)?color.*abstract\\s+double\\s+area\\s*\\(\\s*\\)',
      hints: [
        'Comienza con: public abstract class Shape { ... }',
        'Los métodos abstractos no tienen cuerpo: public abstract double area();',
        'El constructor asigna el parámetro al campo: this.color = color;',
      ],
      explanation: 'Las clases abstractas definen una estructura compartida con métodos abstractos que las subclases deben implementar. El campo "color" está encapsulado con un getter — siguiendo la convención de encapsulación de Java.',
    },
    {
      id: 'p2-s2',
      title: 'Crear la subclase Circle',
      instructions: `Crea una clase Circle que extienda Shape con:
- Un campo privado double "radius"
- Un constructor que reciba radius y color, llamando super(color)
- Sobrescribe el método area(): return Math.PI * radius * radius
- Agrega un método público "circumference()" que retorne 2 * Math.PI * radius`,
      starterCode: `// Crea la clase Circle:
`,
      validationPattern: 'class\\s+Circle\\s+extends\\s+Shape.*private\\s+double\\s+radius.*public\\s+Circle\\s*\\(.*double\\s+radius.*String\\s+color.*\\).*super\\s*\\(\\s*color\\s*\\).*this\\.radius\\s*=\\s*radius.*(@Override\\s+)?public\\s+double\\s+area\\s*\\(\\s*\\).*Math\\.PI\\s*\\*\\s*radius\\s*\\*\\s*radius',
      hints: [
        'Comienza con: public class Circle extends Shape { ... }',
        'El constructor debe llamar super(color) como primera línea',
        'Usa @Override antes del método area()',
      ],
      explanation: 'Circle extiende Shape y proporciona una implementación concreta de area(). La llamada super(color) pasa el color al constructor padre. @Override indica al compilador que esto sobrescribe intencionalmente un método padre.',
    },
    {
      id: 'p2-s3',
      title: 'Crear la subclase Rectangle',
      instructions: `Crea una clase Rectangle que extienda Shape con:
- Campos privados double "width" y "height"
- Un constructor que reciba width, height y color
- Sobrescribe area() retornando width * height
- Agrega un método público "perimeter()" que retorne 2 * (width + height)`,
      starterCode: `// Crea la clase Rectangle:
`,
      validationPattern: 'class\\s+Rectangle\\s+extends\\s+Shape.*private\\s+double\\s+width.*private\\s+double\\s+height.*public\\s+Rectangle\\s*\\(.*double.*double.*String.*\\).*super\\s*\\(.*\\).*(@Override\\s+)?public\\s+double\\s+area\\s*\\(\\s*\\).*width\\s*\\*\\s*height',
      hints: [
        'Mismo patrón que Circle, pero con dos campos de dimensión',
        'No olvides llamar super(color) en el constructor',
      ],
      explanation: 'Rectangle es otra subclase de Shape con sus propios campos y cálculo de área. Tanto Circle como Rectangle pueden tratarse como Shapes mediante polimorfismo — llamar shape.area() funciona en cualquiera.',
    },
    {
      id: 'p2-s4',
      title: 'Implementar la interfaz Printable',
      instructions: `Crea una interfaz llamada "Printable" con un método:
- String describe();

Luego haz que Circle implemente Printable. El método describe() debe retornar:
"Circle: radius=X, color=Y, area=Z"
(Usa getColor() y area() en la implementación)`,
      starterCode: `// Crea la interfaz Printable e impleméntala:
`,
      validationPattern: 'interface\\s+Printable.*String\\s+describe\\s*\\(\\s*\\).*class\\s+Circle\\s+extends\\s+Shape\\s+implements\\s+Printable.*public\\s+String\\s+describe\\s*\\(\\s*\\)',
      hints: [
        'Sintaxis de interfaz: public interface Printable { String describe(); }',
        'La clase implementa ambos: class Circle extends Shape implements Printable',
        'El método describe puede llamar this.getColor() y this.area()',
      ],
      explanation: 'Las interfaces definen contratos que las clases deben cumplir. Una clase puede extender una clase E implementar múltiples interfaces. Esta es la solución de Java a la falta de herencia múltiple.',
    },
    {
      id: 'p2-s5',
      title: 'Usar polimorfismo',
      instructions: `Escribe un método llamado "printAreas" que:
- Reciba un parámetro Shape[] llamado "shapes"
- Recorra cada shape e imprima: "Area: " + shape.area()
- Use un bucle for mejorado

Luego crea un array con un Circle y un Rectangle y llama printAreas.`,
      starterCode: `// Escribe printAreas y pruébalo:
`,
      validationPattern: '(public\\s+static\\s+)?void\\s+printAreas\\s*\\(\\s*Shape\\[\\]\\s+shapes\\s*\\)\\s*\\{.*for\\s*\\(\\s*Shape\\s+\\w+\\s*:\\s*shapes\\s*\\).*\\.area\\(\\)',
      hints: [
        'Método: public static void printAreas(Shape[] shapes) { ... }',
        'Bucle for mejorado: for (Shape s : shapes) { ... }',
        'Crea el array: Shape[] shapes = { new Circle(5, "red"), new Rectangle(3, 4, "blue") };',
      ],
      explanation: 'El polimorfismo te permite tratar Circle y Rectangle como objetos Shape. El método printAreas no necesita saber qué forma específica tiene — solo llama area() y la implementación correcta se ejecuta automáticamente.',
    },
  ],
};

export default project2;
