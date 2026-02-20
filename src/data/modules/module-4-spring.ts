import type { Module } from '../../types';
import project4 from '../projects/project-4';

const module4: Module = {
  id: 'module-4',
  order: 4,
  title: 'Spring Boot',
  subtitle: 'Build REST APIs with Java\'s most popular framework',
  icon: '🌱',
  accentColor: 'red',
  quizId: 'quiz-4',
  project: project4,
  lessons: [
    {
      id: 'lesson-4-1',
      moduleId: 'module-4',
      title: 'What is Spring Boot',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'Spring Boot vs Express.js',
          explanation: 'Spring Boot is to Java what Express.js is to Node.js — a framework for building web applications and REST APIs. The main difference: Spring Boot is opinionated and auto-configures most things for you.',
          codeExample: {
            javascript: `// Express.js REST API
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
            java: `// Spring Boot REST API
@RestController
public class HelloController {
  
  @GetMapping("/hello")
  public Map<String, String> hello() {
    return Map.of("message", "Hello, World!");
  }
}

// That's it! Spring Boot auto-configures
// the server, port 8080, JSON serialization, etc.`,
            caption: 'Spring Boot auto-configures the server — no manual setup like express().listen()',
          },
        },
        {
          id: 'c2',
          title: 'Annotations — Spring\'s Magic',
          explanation: 'Spring Boot uses annotations (starting with @) heavily. These are metadata markers that tell Spring what to do with your classes and methods — similar to decorators in TypeScript.',
          codeExample: {
            javascript: `// TypeScript decorators (similar concept)
@Controller()
class UserController {
  @Get('/users')
  findAll() {
    return users;
  }
}`,
            java: `// Spring Boot annotations
@SpringBootApplication   // entry point, enables auto-config
public class MyApp {
  public static void main(String[] args) {
    SpringApplication.run(MyApp.class, args);
  }
}

@RestController           // HTTP controller returning JSON
@RequestMapping("/api")   // base path for all routes
public class UserController {
  @GetMapping("/users")    // GET /api/users
  public List<User> getAllUsers() { ... }
  
  @PostMapping("/users")   // POST /api/users
  public User createUser(@RequestBody User user) { ... }
}`,
            caption: '@RestController + @GetMapping = @Controller + response.json() in Express',
          },
          challenge: {
            id: 'ch4-1-1',
            type: 'fill-blank',
            prompt: 'Complete this Spring Boot controller:',
            code: `___BLANK_1___
public class HelloController {

  ___BLANK_2___
  public String hello() {
    return "Hello, World!";
  }
}`,
            blanks: [
              { id: 'b1', expected: ['@RestController'], hint: 'controller annotation' },
              { id: 'b2', expected: ['@GetMapping("/hello")', '@GetMapping'], hint: 'HTTP GET mapping' },
            ],
            explanation: '@RestController marks the class as an HTTP controller that returns JSON/data directly. @GetMapping maps the method to HTTP GET requests. Together they\'re equivalent to Express\'s app.get("/path", handler).',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'In Express you write app.get("/path", handler). What is the Spring Boot equivalent?',
          hint: 'Think about which annotation maps to HTTP GET',
          answer: '@GetMapping("/path") on a method inside a @RestController class. Express routes are registered on an "app" object; Spring routes are declared via annotations on methods.',
        },
        {
          id: 'e2',
          prompt: 'What port does Spring Boot use by default? How do you change it?',
          hint: 'Spring Boot configures this via a properties file',
          answer: 'Port 8080 by default. Change it in src/main/resources/application.properties: "server.port=3000". Or use application.yml: "server: port: 3000". This is equivalent to changing the port in express().listen(port).',
        },
      ],
    },
    {
      id: 'lesson-4-2',
      moduleId: 'module-4',
      title: 'Maven & Gradle',
      estimatedMinutes: 10,
      concepts: [
        {
          id: 'c1',
          title: 'pom.xml — Java\'s package.json',
          explanation: 'Maven\'s pom.xml is the Java equivalent of package.json. It declares your project\'s dependencies, build plugins, and metadata.',
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
  
  <!-- like "scripts" in package.json -->
  <build>
    <plugins>
      <plugin>spring-boot-maven-plugin</plugin>
    </plugins>
  </build>
</project>`,
            caption: 'pom.xml declares dependencies verbosely; Gradle\'s build.gradle uses a Groovy/Kotlin DSL',
          },
        },
        {
          id: 'c2',
          title: 'Common Maven Commands',
          explanation: 'Maven commands parallel npm scripts. The most common ones you\'ll use daily.',
          codeExample: {
            javascript: `# npm commands
npm install          # install dependencies
npm run start        # run the app
npm test             # run tests
npm run build        # build for production`,
            java: `# Maven commands
mvn install          # download dependencies + build
mvn spring-boot:run  # run the Spring Boot app
mvn test             # run tests
mvn package          # build JAR file

# Or with Maven wrapper (like npx):
./mvnw spring-boot:run
./mvnw package`,
            caption: '"mvn install" = "npm install", "mvn spring-boot:run" = "npm start"',
          },
        },
        {
          id: 'c3',
          title: 'Project Structure — Maven vs Node.js',
          explanation:
            'Maven enforces a standard project structure. Once you learn it, every Java project looks familiar — unlike Node.js where structure is entirely up to you.',
          codeExample: {
            javascript: `# Node.js project (flexible)
my-app/
├── src/             # your code
├── test/            # tests
├── package.json     # dependencies & scripts
├── node_modules/    # installed packages
├── .env             # environment variables
└── dist/            # build output`,
            java: `# Maven/Spring Boot project (standardized)
my-app/
├── src/
│   ├── main/
│   │   ├── java/com/example/    # your code
│   │   └── resources/
│   │       └── application.properties  # config (.env equivalent)
│   └── test/
│       └── java/com/example/    # tests (mirrors main)
├── pom.xml                      # package.json equivalent
├── target/                      # build output (dist/)
└── .mvn/                        # Maven wrapper`,
            caption: 'Maven convention: src/main/java for code, src/test/java for tests, target/ for build output',
          },
          callout: {
            type: 'tip',
            text: 'The test directory mirrors the main directory structure. A class at com.example.UserService should have its test at com.example.UserServiceTest — same package, different root folder.',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'In npm you add a dependency with "npm install express". How do you add a dependency in Maven?',
          hint: 'Maven doesn\'t have a CLI command to add deps — you edit a file',
          answer: 'Add the <dependency> block to pom.xml manually, then run "mvn install" to download it. Unlike npm, Maven doesn\'t have a "mvn install express" command. Tools like Spring Initializr (start.spring.io) help you pick dependencies when creating a project.',
        },
      ],
    },
    {
      id: 'lesson-4-3',
      moduleId: 'module-4',
      title: 'REST Controllers',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'Path Variables & Request Body',
          explanation: 'Spring Boot provides annotations to extract data from HTTP requests — similar to req.params and req.body in Express.',
          codeExample: {
            javascript: `// Express.js
app.get('/users/:id', (req, res) => {
  const id = req.params.id;       // path variable
  const user = findUser(id);
  res.json(user);
});

app.post('/users', (req, res) => {
  const body = req.body;           // request body
  const user = createUser(body);
  res.status(201).json(user);
});`,
            java: `// Spring Boot Controller
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
          title: 'ResponseEntity — Full HTTP Control',
          explanation: 'When you need to control status codes, headers, or respond differently based on conditions, use ResponseEntity — like res.status().json() in Express.',
          codeExample: {
            javascript: `// Express: fine-grained response control
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
  
  return ResponseEntity.ok(user.get()); // 200 with body
}`,
            caption: 'ResponseEntity gives you full control over status codes and response headers',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'In Express: req.query.name gives you a query parameter. What\'s the Spring Boot equivalent?',
          hint: 'There\'s a specific annotation for query parameters',
          answer: '@RequestParam String name — example: @GetMapping("/search") public List<User> search(@RequestParam String name). Can also be optional: @RequestParam(required = false) String name.',
        },
        {
          id: 'e2',
          prompt: 'How do you return a 201 Created status in Spring Boot vs Express?',
          hint: 'There are two ways in Spring Boot',
          answer: 'Option 1: Add @ResponseStatus(HttpStatus.CREATED) on the method. Option 2: Return ResponseEntity.status(201).body(newResource). Express equivalent: res.status(201).json(newResource).',
        },
      ],
    },
    {
      id: 'lesson-4-4',
      moduleId: 'module-4',
      title: 'Dependency Injection',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'DI — Like React Context, but for Objects',
          explanation: 'Dependency Injection (DI) is Spring\'s way of providing objects to classes that need them. Instead of classes creating their own dependencies, Spring creates them and "injects" them. It\'s similar to React Context providing values to components.',
          codeExample: {
            javascript: `// React Context as DI analogy
const UserServiceContext = createContext(null);

function App() {
  const userService = new UserService(); // created once
  return (
    <UserServiceContext.Provider value={userService}>
      <UserList />
    </UserServiceContext.Provider>
  );
}

function UserList() {
  const userService = useContext(UserServiceContext); // injected!
  return userService.getAll().map(...);
}`,
            java: `// Spring Dependency Injection
@Service  // Spring manages this object's lifecycle
public class UserService {
  public List<User> getAll() { ... }
}

@RestController
public class UserController {
  private final UserService userService;
  
  // Constructor injection — Spring injects UserService!
  public UserController(UserService userService) {
    this.userService = userService;
  }
  
  @GetMapping("/users")
  public List<User> getUsers() {
    return userService.getAll(); // userService was provided!
  }
}`,
            caption: 'Spring injects @Service beans automatically — no manual wiring needed',
          },
          challenge: {
            id: 'ch4-4-1',
            type: 'fill-blank',
            prompt: 'Complete this Spring service with constructor injection:',
            code: `___BLANK_1___
public class OrderService {
  private final OrderRepository ___BLANK_2___;

  public OrderService(___BLANK_3___ repository) {
    this.repository = repository;
  }
}`,
            blanks: [
              { id: 'b1', expected: ['@Service'], hint: 'Spring annotation' },
              { id: 'b2', expected: ['repository'], hint: 'field name' },
              { id: 'b3', expected: ['OrderRepository'], hint: 'injected type' },
            ],
            explanation: '@Service tells Spring to manage this class. The constructor takes OrderRepository as a parameter — Spring automatically provides the instance (dependency injection). The field is "final" for immutability.',
          },
        },
        {
          id: 'c2',
          title: '@Service, @Repository, @Component',
          explanation: 'Spring has stereotypes — annotations that tell Spring the role of each class. @Service is for business logic, @Repository is for database access, @Component is the generic version.',
          codeExample: {
            javascript: `// JS: no formal layer distinction
class UserService {    // just a class
  findById(id) { ... }
}

class UserRepository {  // another class
  query(sql) { ... }
}`,
            java: `@Repository  // data access layer
public class UserRepository {
  // Spring Data auto-implements this interface!
}

@Service     // business logic layer
public class UserService {
  private final UserRepository repo;
  
  public UserService(UserRepository repo) { // DI
    this.repo = repo;
  }
  
  public User findById(Long id) {
    return repo.findById(id).orElseThrow();
  }
}

@RestController  // HTTP layer
public class UserController { ... }`,
            caption: '@Controller → @Service → @Repository: the classic three-layer architecture',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'What is the difference between @Service, @Repository, and @Component in Spring?',
          hint: 'They all make Spring manage the class, but with different semantic meaning',
          answer: 'All three tell Spring to create and manage the object (making it a "bean"). The difference is semantic/convention: @Repository = data layer (also enables DB exception translation), @Service = business logic layer, @Component = generic (no specific layer). Use the specific ones when applicable.',
        },
        {
          id: 'e2',
          prompt: 'Why is constructor injection preferred over @Autowired field injection in Spring?',
          hint: 'Think about testability and immutability',
          answer: 'Constructor injection is preferred because: (1) dependencies are clearly visible, (2) you can make them final (immutable), (3) easy to test — just call new UserController(mockService) without Spring. @Autowired field injection injects via reflection, making fields non-final and harder to test.',
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
          title: '@Entity — Java\'s Database Model',
          explanation: 'Spring Data JPA lets you map Java classes to database tables using annotations. Think of it like an ORM (similar to Sequelize or Prisma in the JS world).',
          codeExample: {
            javascript: `// Prisma schema (JS ORM equivalent)
model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
  age   Int?
}

// Prisma usage:
const user = await prisma.user.findUnique({
  where: { id: 1 }
});`,
            java: `// Spring Data JPA Entity
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
  
  // getters and setters...
}`,
            caption: '@Entity = Prisma model, @Id = @id, @GeneratedValue = @default(autoincrement())',
          },
        },
        {
          id: 'c2',
          title: 'JpaRepository — Zero Boilerplate CRUD',
          explanation: 'JpaRepository is an interface that Spring Data auto-implements at runtime. You get all CRUD operations for free — no SQL needed.',
          codeExample: {
            javascript: `// Prisma: CRUD operations
await prisma.user.findMany();
await prisma.user.findUnique({ where: { id: 1 } });
await prisma.user.create({ data: { name: 'Alice' } });
await prisma.user.delete({ where: { id: 1 } });

// Custom query:
await prisma.user.findMany({
  where: { name: { startsWith: 'A' } }
});`,
            java: `// JpaRepository: extend to get CRUD free
public interface UserRepository 
    extends JpaRepository<User, Long> {
  
  // Spring generates these automatically:
  // findAll(), findById(id), save(user), deleteById(id)
  
  // "Derived queries" — Spring reads the method name!
  List<User> findByName(String name);
  List<User> findByAgeGreaterThan(int age);
  Optional<User> findByEmail(String email);
}`,
            caption: 'Spring generates SQL from method names — findByName() becomes "SELECT * FROM users WHERE name = ?"',
          },
          callout: {
            type: 'tip',
            text: 'Derived query methods are one of Spring Data\'s killer features. "findByEmailAndActiveTrue()" generates the right SQL automatically — no writing queries!',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'How would you write a JpaRepository method to find all users whose age is between 18 and 65?',
          hint: 'Spring Data can derive queries from method names using "Between"',
          answer: 'List<User> findByAgeBetween(int minAge, int maxAge); — Spring generates: "SELECT * FROM users WHERE age BETWEEN ? AND ?". You just declare the method signature and Spring implements it!',
        },
        {
          id: 'e2',
          prompt: 'What is the JpaRepository equivalent of a Prisma transaction?',
          hint: 'Spring has an annotation-based approach to transactions',
          answer: '@Transactional on a @Service method — Spring wraps the method in a database transaction, rolling back if an exception is thrown. Example: @Transactional public void transferMoney(...) { ... } — equivalent to prisma.$transaction([...]).',
        },
      ],
    },
    {
      id: 'lesson-4-6',
      moduleId: 'module-4',
      title: 'Testing with JUnit',
      estimatedMinutes: 12,
      concepts: [
        {
          id: 'c1',
          title: 'JUnit 5 — Java\'s Jest',
          explanation:
            'JUnit 5 is the standard testing framework for Java — like Jest for JavaScript. The concepts are nearly identical: write test methods, use assertions, run them automatically.',
          codeExample: {
            javascript: `// Jest test
const { add } = require('./math');

test('adds two numbers', () => {
  expect(add(2, 3)).toBe(5);
});

test('throws on invalid input', () => {
  expect(() => add(null, 3)).toThrow();
});`,
            java: `// JUnit 5 test
import static org.junit.jupiter.api.Assertions.*;

class MathTest {

  @Test
  void addsTwoNumbers() {
    assertEquals(5, Math.add(2, 3));
  }

  @Test
  void throwsOnInvalidInput() {
    assertThrows(IllegalArgumentException.class,
      () -> Math.add(null, 3));
  }
}`,
            caption: '@Test = test(), assertEquals = expect().toBe(), assertThrows = expect().toThrow()',
          },
          challenge: {
            id: 'ch4-6-1',
            type: 'fill-blank',
            prompt: 'Complete this JUnit test:',
            code: `class CalculatorTest {
  ___BLANK_1___
  void testMultiply() {
    Calculator calc = new Calculator();
    ___BLANK_2___(12, calc.multiply(3, 4));
  }
}`,
            blanks: [
              { id: 'b1', expected: ['@Test'], hint: 'test annotation' },
              { id: 'b2', expected: ['assertEquals'], hint: 'assertion method' },
            ],
            explanation: '@Test marks a method as a test case (like test() in Jest). assertEquals(expected, actual) checks that the values are equal (like expect(actual).toBe(expected) in Jest — note the argument order is reversed!).',
          },
        },
        {
          id: 'c2',
          title: 'Test Lifecycle — @BeforeEach / @AfterEach',
          explanation:
            'JUnit has lifecycle hooks just like Jest. @BeforeEach runs before each test, @AfterEach runs after — identical to Jest\'s beforeEach() and afterEach().',
          codeExample: {
            javascript: `// Jest lifecycle
let calculator;

beforeEach(() => {
  calculator = new Calculator();
});

afterEach(() => {
  console.log("Test completed");
});

test('adds numbers', () => {
  expect(calculator.add(1, 2)).toBe(3);
});`,
            java: `// JUnit 5 lifecycle
class CalculatorTest {
  private Calculator calculator;

  @BeforeEach
  void setUp() {
    calculator = new Calculator();
  }

  @AfterEach
  void tearDown() {
    System.out.println("Test completed");
  }

  @Test
  void addsNumbers() {
    assertEquals(3, calculator.add(1, 2));
  }
}`,
            caption: '@BeforeEach = beforeEach(), @AfterEach = afterEach(), @BeforeAll = beforeAll()',
          },
        },
        {
          id: 'c3',
          title: 'Mockito — Java\'s jest.fn()',
          explanation:
            'Mockito is Java\'s most popular mocking library — equivalent to Jest\'s mock functions. Use it to isolate units by replacing dependencies with controlled fakes.',
          codeExample: {
            javascript: `// Jest mocking
const userRepo = {
  findById: jest.fn().mockReturnValue({ name: "Alice" }),
};

const service = new UserService(userRepo);
const user = service.getUser(1);

expect(user.name).toBe("Alice");
expect(userRepo.findById).toHaveBeenCalledWith(1);`,
            java: `// Mockito mocking
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

  @Mock
  UserRepository userRepo;  // jest.fn() equivalent

  @InjectMocks
  UserService service;      // auto-injects mocks

  @Test
  void getsUser() {
    // when().thenReturn() = mockReturnValue()
    when(userRepo.findById(1L))
      .thenReturn(Optional.of(new User("Alice")));

    User user = service.getUser(1L);

    assertEquals("Alice", user.getName());
    verify(userRepo).findById(1L);  // toHaveBeenCalledWith
  }
}`,
            caption: '@Mock = jest.fn(), when().thenReturn() = mockReturnValue(), verify() = toHaveBeenCalledWith()',
          },
        },
      ],
      exercises: [
        {
          id: 'e1',
          prompt: 'In Jest you write expect(value).toBe(expected). What is the JUnit 5 equivalent?',
          hint: 'The argument order is different in JUnit!',
          answer: 'assertEquals(expected, actual) — note the reversed order! JUnit puts expected first, actual second. Other assertions: assertTrue(condition), assertFalse(condition), assertNull(value), assertNotNull(value), assertThrows(Exception.class, () -> code).',
        },
        {
          id: 'e2',
          prompt: 'How does Mockito\'s when().thenReturn() compare to Jest\'s jest.fn().mockReturnValue()?',
          hint: 'They do the same thing with different syntax',
          answer: 'Both configure a mock to return a specific value when called. Jest: const fn = jest.fn().mockReturnValue("hello"). Mockito: when(mock.method()).thenReturn("hello"). The main difference: Mockito mocks are tied to specific method calls, making them more precise about what they stub.',
        },
      ],
    },
  ],
};

export default module4;
