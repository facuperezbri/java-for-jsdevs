import type { Module } from '../../types';
import project4 from '../projects/project-4.es';

const module4: Module = {
  id: 'module-4',
  order: 4,
  title: 'Spring Boot',
  subtitle: 'Construye APIs REST con el framework más popular de Java',
  icon: '🌱',
  accentColor: 'red',
  quizId: 'quiz-4',
  project: project4,
  lessons: [
    {
      id: 'lesson-4-1',
      moduleId: 'module-4',
      title: '¿Qué es Spring Boot?',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'Spring Boot vs Express.js',
          explanation: 'Spring Boot es para Java lo que Express.js es para Node.js — un framework para construir aplicaciones web y APIs REST. La diferencia principal: Spring Boot es opinado y auto-configura la mayoría de las cosas por ti.',
          codeExample: {
            javascript: `// API REST Express.js
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
            java: `// API REST Spring Boot
@RestController
public class HelloController {
  
  @GetMapping("/hello")
  public Map<String, String> hello() {
    return Map.of("message", "Hello, World!");
  }
}

// ¡Eso es todo! Spring Boot auto-configura
// el servidor, puerto 8080, serialización JSON, etc.`,
            caption: 'Spring Boot auto-configura el servidor — sin configuración manual como express().listen()',
          },
        },
        {
          id: 'c2',
          title: 'Anotaciones — La magia de Spring',
          explanation: 'Spring Boot usa anotaciones (que empiezan con @) abundantemente. Son marcadores de metadata que le dicen a Spring qué hacer con tus clases y métodos — similar a los decoradores en TypeScript.',
          codeExample: {
            javascript: `// Decoradores TypeScript (concepto similar)
@Controller()
class UserController {
  @Get('/users')
  findAll() {
    return users;
  }
}`,
            java: `// Anotaciones Spring Boot
@SpringBootApplication   // punto de entrada, habilita auto-config
public class MyApp {
  public static void main(String[] args) {
    SpringApplication.run(MyApp.class, args);
  }
}

@RestController           // controlador HTTP que retorna JSON
@RequestMapping("/api")   // ruta base para todas las rutas
public class UserController {
  @GetMapping("/users")    // GET /api/users
  public List<User> getAllUsers() { ... }
  
  @PostMapping("/users")   // POST /api/users
  public User createUser(@RequestBody User user) { ... }
}`,
            caption: '@RestController + @GetMapping = @Controller + response.json() en Express',
          },
          challenge: {
            id: 'ch4-1-1',
            type: 'fill-blank',
            prompt: 'Completa este controlador Spring Boot:',
            code: `___BLANK_1___
public class HelloController {

  ___BLANK_2___
  public String hello() {
    return "Hello, World!";
  }
}`,
            blanks: [
              { id: 'b1', expected: ['@RestController'], hint: 'anotación de controlador' },
              { id: 'b2', expected: ['@GetMapping("/hello")', '@GetMapping'], hint: 'mapeo HTTP GET' },
            ],
            explanation: '@RestController marca la clase como controlador HTTP que retorna JSON/datos directamente. @GetMapping mapea el método a peticiones HTTP GET. Juntos son equivalentes a app.get("/path", handler) de Express.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'En Express escribes app.get("/path", handler). ¿Cuál es el equivalente en Spring Boot?',
          hint: 'Piensa en qué anotación mapea a HTTP GET',
          answer: '@GetMapping("/path") en un método dentro de una clase @RestController. Las rutas de Express se registran en un objeto "app"; las rutas de Spring se declaran mediante anotaciones en métodos.',
        },
        {
          id: 'e2',
          prompt: '¿Qué puerto usa Spring Boot por defecto? ¿Cómo lo cambias?',
          hint: 'Spring Boot configura esto mediante un archivo de propiedades',
          answer: 'Puerto 8080 por defecto. Cámbialo en src/main/resources/application.properties: "server.port=3000". O usa application.yml: "server: port: 3000". Equivalente a cambiar el puerto en express().listen(port).',
        },
      ],
    },
    {
      id: 'lesson-4-2',
      moduleId: 'module-4',
      title: 'Maven y Gradle',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'pom.xml — El package.json de Java',
          explanation: 'El pom.xml de Maven es el equivalente en Java de package.json. Declara las dependencias del proyecto, plugins de build y metadata.',
          codeExample: {
            javascript: `// package.json
{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.0",
    "axios": "^1.0.0"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  },
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  }
}`,
            java: `<!-- pom.xml (Maven) -->
<project>
  <groupId>com.example</groupId>
  <artifactId>my-app</artifactId>
  <version>1.0.0</version>
  
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
  </dependencies>
  
  <!-- como "scripts" en package.json -->
  <build>
    <plugins>
      <plugin>spring-boot-maven-plugin</plugin>
    </plugins>
  </build>
</project>`,
            caption: 'pom.xml declara dependencias de forma verbosa; build.gradle de Gradle usa un DSL Groovy/Kotlin',
          },
        },
        {
          id: 'c2',
          title: 'Comandos comunes de Maven',
          explanation: 'Los comandos de Maven son paralelos a los scripts de npm. Los más comunes que usarás diariamente.',
          codeExample: {
            javascript: `# comandos npm
npm install          # instalar dependencias
npm run start        # ejecutar la app
npm test             # ejecutar tests
npm run build        # build para producción`,
            java: `# comandos Maven
mvn install          # descargar dependencias + build
mvn spring-boot:run  # ejecutar la app Spring Boot
mvn test             # ejecutar tests
mvn package          # construir archivo JAR

# O con Maven wrapper (como npx):
./mvnw spring-boot:run
./mvnw package`,
            caption: '"mvn install" = "npm install", "mvn spring-boot:run" = "npm start"',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'En npm agregas una dependencia con "npm install express". ¿Cómo agregas una dependencia en Maven?',
          hint: 'Maven no tiene comando CLI para agregar deps — editas un archivo',
          answer: 'Agrega el bloque <dependency> a pom.xml manualmente, luego ejecuta "mvn install" para descargarla. A diferencia de npm, Maven no tiene comando "mvn install express". Herramientas como Spring Initializr (start.spring.io) te ayudan a elegir dependencias al crear un proyecto.',
        },
      ],
    },
    {
      id: 'lesson-4-3',
      moduleId: 'module-4',
      title: 'Controladores REST',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Variables de ruta y cuerpo de petición',
          explanation: 'Spring Boot proporciona anotaciones para extraer datos de peticiones HTTP — similar a req.params y req.body en Express.',
          codeExample: {
            javascript: `// Express.js
app.get('/users/:id', (req, res) => {
  const id = req.params.id;       // variable de ruta
  const user = findUser(id);
  res.json(user);
});

app.post('/users', (req, res) => {
  const body = req.body;           // cuerpo de petición
  const user = createUser(body);
  res.status(201).json(user);
});`,
            java: `// Controlador Spring Boot
@RestController
@RequestMapping("/users")
public class UserController {
  
  @GetMapping("/{id}")
  public User getUser(@PathVariable Long id) {
    return findUser(id);  // @PathVariable = req.params.id
  }
  
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)  // 201
  public User createUser(@RequestBody User user) {
    return saveUser(user);  // @RequestBody = req.body
  }
}`,
            caption: '@PathVariable = req.params, @RequestBody = req.body, @RequestParam = req.query',
          },
        },
        {
          id: 'c2',
          title: 'ResponseEntity — Control HTTP completo',
          explanation: 'Cuando necesitas controlar códigos de estado, headers o responder diferente según condiciones, usa ResponseEntity — como res.status().json() en Express.',
          codeExample: {
            javascript: `// Express: control fino de respuesta
app.get('/users/:id', (req, res) => {
  const user = findUser(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.status(200).json(user);
});`,
            java: `// Spring Boot: ResponseEntity
@GetMapping("/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
  Optional<User> user = findUser(id);
  
  if (user.isEmpty()) {
    return ResponseEntity.notFound().build(); // 404
  }
  
  return ResponseEntity.ok(user.get()); // 200 con cuerpo
}`,
            caption: 'ResponseEntity te da control completo sobre códigos de estado y headers de respuesta',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'En Express: req.query.name te da un parámetro de consulta. ¿Cuál es el equivalente en Spring Boot?',
          hint: 'Hay una anotación específica para parámetros de consulta',
          answer: '@RequestParam String name — ejemplo: @GetMapping("/search") public List<User> search(@RequestParam String name). También puede ser opcional: @RequestParam(required = false) String name.',
        },
        {
          id: 'e2',
          prompt: '¿Cómo retornas un estado 201 Created en Spring Boot vs Express?',
          hint: 'Hay dos formas en Spring Boot',
          answer: 'Opción 1: Agregar @ResponseStatus(HttpStatus.CREATED) en el método. Opción 2: Retornar ResponseEntity.status(201).body(nuevoRecurso). Equivalente en Express: res.status(201).json(nuevoRecurso).',
        },
      ],
    },
    {
      id: 'lesson-4-4',
      moduleId: 'module-4',
      title: 'Inyección de dependencias',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'DI — Como React Context, pero para objetos',
          explanation: 'La Inyección de Dependencias (DI) es la forma de Spring de proporcionar objetos a clases que los necesitan. En lugar de que las clases creen sus propias dependencias, Spring las crea y las "inyecta". Es similar a React Context proporcionando valores a componentes.',
          codeExample: {
            javascript: `// React Context como analogía de DI
const UserServiceContext = createContext(null);

function App() {
  const userService = new UserService(); // creado una vez
  return (
    <UserServiceContext.Provider value={userService}>
      <UserList />
    </UserServiceContext.Provider>
  );
}

function UserList() {
  const userService = useContext(UserServiceContext); // ¡inyectado!
  return userService.getAll().map(...);
}`,
            java: `// Inyección de dependencias Spring
@Service  // Spring gestiona el ciclo de vida de este objeto
public class UserService {
  public List<User> getAll() { ... }
}

@RestController
public class UserController {
  private final UserService userService;
  
  // Inyección por constructor — ¡Spring inyecta UserService!
  public UserController(UserService userService) {
    this.userService = userService;
  }
  
  @GetMapping("/users")
  public List<User> getUsers() {
    return userService.getAll(); // ¡userService fue proporcionado!
  }
}`,
            caption: 'Spring inyecta beans @Service automáticamente — sin cableado manual',
          },
          challenge: {
            id: 'ch4-4-1',
            type: 'fill-blank',
            prompt: 'Completa este servicio Spring con inyección por constructor:',
            code: `___BLANK_1___
public class OrderService {
  private final OrderRepository ___BLANK_2___;

  public OrderService(___BLANK_3___ repository) {
    this.repository = repository;
  }
}`,
            blanks: [
              { id: 'b1', expected: ['@Service'], hint: 'anotación Spring' },
              { id: 'b2', expected: ['repository'], hint: 'nombre del campo' },
              { id: 'b3', expected: ['OrderRepository'], hint: 'tipo inyectado' },
            ],
            explanation: '@Service le dice a Spring que gestione esta clase. El constructor recibe OrderRepository como parámetro — Spring proporciona automáticamente la instancia (inyección de dependencias). El campo es "final" para inmutabilidad.',
          },
        },
        {
          id: 'c2',
          title: '@Service, @Repository, @Component',
          explanation: 'Spring tiene estereotipos — anotaciones que le dicen a Spring el rol de cada clase. @Service es para lógica de negocio, @Repository es para acceso a datos, @Component es la versión genérica.',
          codeExample: {
            javascript: `// JS: sin distinción formal de capas
class UserService {    // solo una clase
  findById(id) { ... }
}

class UserRepository {  // otra clase
  query(sql) { ... }
}`,
            java: `@Repository  // capa de acceso a datos
public class UserRepository {
  // ¡Spring Data auto-implementa esta interfaz!
}

@Service     // capa de lógica de negocio
public class UserService {
  private final UserRepository repo;
  
  public UserService(UserRepository repo) { // DI
    this.repo = repo;
  }
  
  public User findById(Long id) {
    return repo.findById(id).orElseThrow();
  }
}

@RestController  // capa HTTP
public class UserController { ... }`,
            caption: '@Controller → @Service → @Repository: la arquitectura clásica de tres capas',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: '¿Cuál es la diferencia entre @Service, @Repository y @Component en Spring?',
          hint: 'Todos hacen que Spring gestione la clase, pero con significado semántico diferente',
          answer: 'Los tres le dicen a Spring que cree y gestione el objeto (haciéndolo un "bean"). La diferencia es semántica/convención: @Repository = capa de datos (también habilita traducción de excepciones de BD), @Service = capa de lógica de negocio, @Component = genérico (sin capa específica). Usa los específicos cuando aplique.',
        },
        {
          id: 'e2',
          prompt: '¿Por qué se prefiere la inyección por constructor sobre la inyección de campo @Autowired en Spring?',
          hint: 'Piensa en testabilidad e inmutabilidad',
          answer: 'La inyección por constructor se prefiere porque: (1) las dependencias son claramente visibles, (2) puedes hacerlas final (inmutables), (3) fácil de probar — solo llama new UserController(mockService) sin Spring. La inyección de campo @Autowired inyecta vía reflexión, haciendo los campos no-final y más difíciles de probar.',
        },
      ],
    },
    {
      id: 'lesson-4-5',
      moduleId: 'module-4',
      title: 'Spring Data JPA',
      estimatedMinutes: 14,
      concepts: [
        {
          id: 'c1',
          title: '@Entity — El modelo de base de datos de Java',
          explanation: 'Spring Data JPA te permite mapear clases Java a tablas de base de datos usando anotaciones. Piénsalo como un ORM (similar a Sequelize o Prisma en el mundo JS).',
          codeExample: {
            javascript: `// Esquema Prisma (ORM equivalente en JS)
model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
  age   Int?
}

// Uso de Prisma:
const user = await prisma.user.findUnique({
  where: { id: 1 }
});`,
            java: `// Entidad Spring Data JPA
@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  private String name;
  
  @Column(unique = true)
  private String email;
  
  private Integer age;
  
  // getters y setters...
}`,
            caption: '@Entity = modelo Prisma, @Id = @id, @GeneratedValue = @default(autoincrement())',
          },
        },
        {
          id: 'c2',
          title: 'JpaRepository — CRUD sin código repetitivo',
          explanation: 'JpaRepository es una interfaz que Spring Data auto-implementa en runtime. Obtienes todas las operaciones CRUD gratis — sin SQL necesario.',
          codeExample: {
            javascript: `// Prisma: operaciones CRUD
await prisma.user.findMany();
await prisma.user.findUnique({ where: { id: 1 } });
await prisma.user.create({ data: { name: 'Alice' } });
await prisma.user.delete({ where: { id: 1 } });

// Consulta personalizada:
await prisma.user.findMany({
  where: { name: { startsWith: 'A' } }
});`,
            java: `// JpaRepository: extiende para obtener CRUD gratis
public interface UserRepository 
    extends JpaRepository<User, Long> {
  
  // Spring genera estos automáticamente:
  // findAll(), findById(id), save(user), deleteById(id)
  
  // "Consultas derivadas" — ¡Spring lee el nombre del método!
  List<User> findByName(String name);
  List<User> findByAgeGreaterThan(int age);
  Optional<User> findByEmail(String email);
}`,
            caption: 'Spring genera SQL desde nombres de métodos — findByName() se convierte en "SELECT * FROM users WHERE name = ?"',
          },
          callout: {
            type: 'tip',
            text: 'Los métodos de consulta derivada son una de las características estrella de Spring Data. "findByEmailAndActiveTrue()" genera el SQL correcto automáticamente — ¡sin escribir consultas!',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: '¿Cómo escribirías un método JpaRepository para encontrar todos los usuarios cuya edad esté entre 18 y 65?',
          hint: 'Spring Data puede derivar consultas de nombres de métodos usando "Between"',
          answer: 'List<User> findByAgeBetween(int minAge, int maxAge); — Spring genera: "SELECT * FROM users WHERE age BETWEEN ? AND ?". ¡Solo declaras la firma del método y Spring lo implementa!',
        },
        {
          id: 'e2',
          prompt: '¿Cuál es el equivalente en JpaRepository de una transacción de Prisma?',
          hint: 'Spring tiene un enfoque basado en anotaciones para transacciones',
          answer: '@Transactional en un método @Service — Spring envuelve el método en una transacción de base de datos, haciendo rollback si se lanza una excepción. Ejemplo: @Transactional public void transferMoney(...) { ... } — equivalente a prisma.$transaction([...]).',
        },
      ],
    },
  ],
};

export default module4;
