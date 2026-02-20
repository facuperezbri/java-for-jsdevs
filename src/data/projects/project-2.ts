import type { MiniProject } from '../../types';

const project2: MiniProject = {
  id: 'project-2',
  moduleId: 'module-2',
  title: 'Shape Class Hierarchy',
  description: 'Build a class hierarchy with Shape as a base, then Circle and Rectangle subclasses — applying inheritance, abstract methods, and interfaces.',
  estimatedMinutes: 10,
  steps: [
    {
      id: 'p2-s1',
      title: 'Create the Shape Abstract Class',
      instructions: `Create an abstract class called "Shape" with:
- A private String field "color"
- A constructor that takes a String color parameter
- A public getter method "getColor()" that returns the color
- An abstract method "area()" that returns a double`,
      starterCode: `// Create the abstract Shape class:
`,
      validationPattern: 'abstract\\s+class\\s+Shape.*private\\s+String\\s+color.*public\\s+Shape\\s*\\(\\s*String\\s+color\\s*\\).*this\\.color\\s*=\\s*color.*public\\s+String\\s+getColor\\s*\\(\\s*\\).*return\\s+(this\\.)?color.*abstract\\s+double\\s+area\\s*\\(\\s*\\)',
      hints: [
        'Start with: public abstract class Shape { ... }',
        'Abstract methods have no body: public abstract double area();',
        'The constructor assigns the parameter to the field: this.color = color;',
      ],
      explanation: 'Abstract classes define a shared structure with abstract methods that subclasses must implement. The "color" field is encapsulated with a getter — following Java\'s encapsulation convention.',
    },
    {
      id: 'p2-s2',
      title: 'Create the Circle Subclass',
      instructions: `Create a Circle class that extends Shape with:
- A private double field "radius"
- A constructor that takes radius and color, calling super(color)
- Override the area() method: return Math.PI * radius * radius
- Add a public method "circumference()" returning 2 * Math.PI * radius`,
      starterCode: `// Create the Circle class:
`,
      validationPattern: 'class\\s+Circle\\s+extends\\s+Shape.*private\\s+double\\s+radius.*public\\s+Circle\\s*\\(.*double\\s+radius.*String\\s+color.*\\).*super\\s*\\(\\s*color\\s*\\).*this\\.radius\\s*=\\s*radius.*(@Override\\s+)?public\\s+double\\s+area\\s*\\(\\s*\\).*Math\\.PI\\s*\\*\\s*radius\\s*\\*\\s*radius',
      hints: [
        'Start with: public class Circle extends Shape { ... }',
        'The constructor must call super(color) as the first line',
        'Use @Override before the area() method',
      ],
      explanation: 'Circle extends Shape and provides a concrete implementation of area(). The super(color) call passes the color to the parent constructor. @Override signals to the compiler this is intentionally overriding a parent method.',
    },
    {
      id: 'p2-s3',
      title: 'Create the Rectangle Subclass',
      instructions: `Create a Rectangle class that extends Shape with:
- Private double fields "width" and "height"
- A constructor taking width, height, and color
- Override area() returning width * height
- Add a public method "perimeter()" returning 2 * (width + height)`,
      starterCode: `// Create the Rectangle class:
`,
      validationPattern: 'class\\s+Rectangle\\s+extends\\s+Shape.*private\\s+double\\s+width.*private\\s+double\\s+height.*public\\s+Rectangle\\s*\\(.*double.*double.*String.*\\).*super\\s*\\(.*\\).*(@Override\\s+)?public\\s+double\\s+area\\s*\\(\\s*\\).*width\\s*\\*\\s*height',
      hints: [
        'Same pattern as Circle, but with two dimension fields',
        'Don\'t forget to call super(color) in the constructor',
      ],
      explanation: 'Rectangle is another Shape subclass with its own fields and area calculation. Both Circle and Rectangle can be treated as Shapes through polymorphism — calling shape.area() works on either.',
    },
    {
      id: 'p2-s4',
      title: 'Implement the Printable Interface',
      instructions: `Create an interface called "Printable" with one method:
- String describe();

Then make Circle implement Printable. The describe() method should return:
"Circle: radius=X, color=Y, area=Z"
(Use getColor() and area() in the implementation)`,
      starterCode: `// Create the Printable interface and implement it:
`,
      validationPattern: 'interface\\s+Printable.*String\\s+describe\\s*\\(\\s*\\).*class\\s+Circle\\s+extends\\s+Shape\\s+implements\\s+Printable.*public\\s+String\\s+describe\\s*\\(\\s*\\)',
      hints: [
        'Interface syntax: public interface Printable { String describe(); }',
        'Class implements both: class Circle extends Shape implements Printable',
        'The describe method can call this.getColor() and this.area()',
      ],
      explanation: 'Interfaces define contracts that classes must fulfill. A class can extend one class AND implement multiple interfaces. This is Java\'s solution to the lack of multiple inheritance.',
    },
    {
      id: 'p2-s5',
      title: 'Use Polymorphism',
      instructions: `Write a method called "printAreas" that:
- Takes a Shape[] parameter called "shapes"
- Loops through each shape and prints: "Area: " + shape.area()
- Uses an enhanced for loop

Then create an array with a Circle and Rectangle and call printAreas.`,
      starterCode: `// Write printAreas and test it:
`,
      validationPattern: '(public\\s+static\\s+)?void\\s+printAreas\\s*\\(\\s*Shape\\[\\]\\s+shapes\\s*\\).*for\\s*\\(\\s*Shape\\s+\\w+\\s*:\\s*shapes\\s*\\).*\\.area\\(\\)',
      hints: [
        'Method: public static void printAreas(Shape[] shapes) { ... }',
        'Enhanced for loop: for (Shape s : shapes) { ... }',
        'Create the array: Shape[] shapes = { new Circle(5, "red"), new Rectangle(3, 4, "blue") };',
      ],
      explanation: 'Polymorphism lets you treat Circle and Rectangle as Shape objects. The printAreas method doesn\'t need to know which specific shape it has — it just calls area() and the correct implementation runs automatically.',
    },
  ],
};

export default project2;
