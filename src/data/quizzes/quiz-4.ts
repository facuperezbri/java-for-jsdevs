import type { Quiz } from '../../types';

const quiz4: Quiz = {
  id: 'quiz-4',
  moduleId: 'module-4',
  title: 'Spring Boot Quiz',
  questions: [
    {
      id: 'q1',
      question: 'What Spring Boot annotation turns a class into an HTTP controller that returns JSON?',
      options: [
        { key: 'a', text: '@Controller' },
        { key: 'b', text: '@RestController' },
        { key: 'c', text: '@JsonController' },
        { key: 'd', text: '@ApiController' },
      ],
      correctKey: 'b',
      explanation: '@RestController = @Controller + @ResponseBody. It tells Spring: "this class handles HTTP requests and methods return JSON automatically". @Controller alone requires @ResponseBody on each method or returning a View.',
    },
    {
      id: 'q2',
      question: 'In Express: app.get("/users/:id", handler). What is the Spring Boot equivalent annotation?',
      options: [
        { key: 'a', text: '@GetMapping("/users/:id")' },
        { key: 'b', text: '@GetMapping("/users/{id}")' },
        { key: 'c', text: '@Route(method="GET", path="/users/{id}")' },
        { key: 'd', text: '@HttpGet("/users/[id]")' },
      ],
      correctKey: 'b',
      explanation: 'Spring Boot uses {id} (curly braces) for path variables, not :id like Express. The method parameter is annotated with @PathVariable: public User getUser(@PathVariable Long id)',
    },
    {
      id: 'q3',
      question: 'What is pom.xml in a Maven project equivalent to in Node.js?',
      options: [
        { key: 'a', text: '.env file' },
        { key: 'b', text: 'webpack.config.js' },
        { key: 'c', text: 'package.json' },
        { key: 'd', text: '.gitignore' },
      ],
      correctKey: 'c',
      explanation: 'pom.xml is Maven\'s project descriptor — like package.json. It declares dependencies (like npm dependencies), project metadata, and build plugins (like npm scripts). "mvn install" downloads deps like "npm install".',
    },
    {
      id: 'q4',
      question: 'In Express: req.body contains the POST request body. What Spring Boot annotation extracts this?',
      options: [
        { key: 'a', text: '@RequestParam' },
        { key: 'b', text: '@PathVariable' },
        { key: 'c', text: '@RequestBody' },
        { key: 'd', text: '@PostBody' },
      ],
      correctKey: 'c',
      explanation: '@RequestBody deserializes the HTTP request body (JSON) into a Java object. Express: req.body → Spring: @RequestBody User user. @RequestParam is for query string params (?name=Alice), @PathVariable is for URL path segments (/users/{id}).',
    },
    {
      id: 'q5',
      question: 'What is Spring Dependency Injection most similar to in the React world?',
      options: [
        { key: 'a', text: 'useState hook' },
        { key: 'b', text: 'React Context providing values to components' },
        { key: 'c', text: 'useEffect for side effects' },
        { key: 'd', text: 'CSS modules' },
      ],
      correctKey: 'b',
      explanation: 'React Context provides services/values to components without prop drilling. Spring DI does the same: Spring creates @Service beans and "injects" them into @RestController classes that need them — no manual wiring. Both solve the same problem of making shared services available.',
    },
    {
      id: 'q6',
      question: 'What does @Service annotation tell Spring?',
      options: [
        { key: 'a', text: 'The class handles HTTP requests' },
        { key: 'b', text: 'The class accesses the database' },
        { key: 'c', text: 'Spring should manage this class and make it available for injection' },
        { key: 'd', text: 'The class runs on a schedule' },
      ],
      correctKey: 'c',
      explanation: '@Service (along with @Repository and @Component) marks a class as a Spring-managed bean. Spring creates one instance and injects it wherever needed. @Service is for business logic; @Repository is for data access — both tell Spring to manage the object lifecycle.',
    },
    {
      id: 'q7',
      question: 'What is the JpaRepository equivalent of Prisma\'s findMany()?',
      options: [
        { key: 'a', text: 'repository.getAll()' },
        { key: 'b', text: 'repository.selectAll()' },
        { key: 'c', text: 'repository.findAll()' },
        { key: 'd', text: 'repository.list()' },
      ],
      correctKey: 'c',
      explanation: 'JpaRepository provides findAll() out of the box — no implementation needed! Other free methods: findById(id), save(entity), deleteById(id), count(). Like Prisma\'s model.findMany(), model.findUnique(), model.create().',
    },
    {
      id: 'q8',
      question: 'Spring Data can generate SQL from method names. What SQL does "findByEmailAndActiveTrue()" generate?',
      options: [
        { key: 'a', text: 'SELECT * FROM users' },
        { key: 'b', text: 'SELECT * FROM users WHERE email = ? AND active = true' },
        { key: 'c', text: 'SELECT email, active FROM users' },
        { key: 'd', text: 'UPDATE users SET active = true WHERE email = ?' },
      ],
      correctKey: 'b',
      explanation: 'Spring Data\'s "derived query" feature reads the method name: "findBy" = SELECT, "Email" = WHERE email = ?, "And" = AND, "ActiveTrue" = active = true. It generates the SQL automatically. No @Query annotation needed for common queries.',
    },
  ],
};

export default quiz4;
