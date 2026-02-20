import type { Quiz } from '../../types';

const quiz4: Quiz = {
  id: 'quiz-4',
  moduleId: 'module-4',
  title: 'Cuestionario de Spring Boot',
  questions: [
    {
      id: 'q1',
      question: '¿Qué anotación de Spring Boot convierte una clase en un controlador HTTP que retorna JSON?',
      options: [
        { key: 'a', text: '@Controller' },
        { key: 'b', text: '@RestController' },
        { key: 'c', text: '@JsonController' },
        { key: 'd', text: '@ApiController' },
      ],
      correctKey: 'b',
      explanation: '@RestController = @Controller + @ResponseBody. Le dice a Spring: "esta clase maneja peticiones HTTP y los métodos retornan JSON automáticamente". @Controller solo requiere @ResponseBody en cada método o retornar una View.',
    },
    {
      id: 'q2',
      question: 'En Express: app.get("/users/:id", handler). ¿Cuál es la anotación equivalente en Spring Boot?',
      options: [
        { key: 'a', text: '@GetMapping("/users/:id")' },
        { key: 'b', text: '@GetMapping("/users/{id}")' },
        { key: 'c', text: '@Route(method="GET", path="/users/{id}")' },
        { key: 'd', text: '@HttpGet("/users/[id]")' },
      ],
      correctKey: 'b',
      explanation: 'Spring Boot usa {id} (llaves) para variables de ruta, no :id como Express. El parámetro del método se anota con @PathVariable: public User getUser(@PathVariable Long id)',
    },
    {
      id: 'q3',
      question: '¿A qué es equivalente pom.xml en un proyecto Maven en Node.js?',
      options: [
        { key: 'a', text: 'Archivo .env' },
        { key: 'b', text: 'webpack.config.js' },
        { key: 'c', text: 'package.json' },
        { key: 'd', text: '.gitignore' },
      ],
      correctKey: 'c',
      explanation: 'pom.xml es el descriptor de proyecto de Maven — como package.json. Declara dependencias (como dependencias de npm), metadata del proyecto y plugins de build (como scripts de npm). "mvn install" descarga deps como "npm install".',
    },
    {
      id: 'q4',
      question: 'En Express: req.body contiene el cuerpo de la petición POST. ¿Qué anotación de Spring Boot extrae esto?',
      options: [
        { key: 'a', text: '@RequestParam' },
        { key: 'b', text: '@PathVariable' },
        { key: 'c', text: '@RequestBody' },
        { key: 'd', text: '@PostBody' },
      ],
      correctKey: 'c',
      explanation: '@RequestBody deserializa el cuerpo de la petición HTTP (JSON) en un objeto Java. Express: req.body → Spring: @RequestBody User user. @RequestParam es para parámetros de query string (?name=Alice), @PathVariable es para segmentos de URL (/users/{id}).',
    },
    {
      id: 'q5',
      question: '¿A qué es más similar la Inyección de Dependencias de Spring en el mundo React?',
      options: [
        { key: 'a', text: 'Hook useState' },
        { key: 'b', text: 'React Context proporcionando valores a componentes' },
        { key: 'c', text: 'useEffect para efectos secundarios' },
        { key: 'd', text: 'Módulos CSS' },
      ],
      correctKey: 'b',
      explanation: 'React Context proporciona servicios/valores a componentes sin prop drilling. Spring DI hace lo mismo: Spring crea beans @Service y los "inyecta" en clases @RestController que los necesitan — sin cableado manual. Ambos resuelven el mismo problema de hacer servicios compartidos disponibles.',
    },
    {
      id: 'q6',
      question: '¿Qué le dice la anotación @Service a Spring?',
      options: [
        { key: 'a', text: 'La clase maneja peticiones HTTP' },
        { key: 'b', text: 'La clase accede a la base de datos' },
        { key: 'c', text: 'Spring debe gestionar esta clase y hacerla disponible para inyección' },
        { key: 'd', text: 'La clase se ejecuta en un horario' },
      ],
      correctKey: 'c',
      explanation: '@Service (junto con @Repository y @Component) marca una clase como bean gestionado por Spring. Spring crea una instancia y la inyecta donde se necesite. @Service es para lógica de negocio; @Repository es para acceso a datos — ambos le dicen a Spring que gestione el ciclo de vida del objeto.',
    },
    {
      id: 'q7',
      question: '¿Cuál es el equivalente en JpaRepository de findMany() de Prisma?',
      options: [
        { key: 'a', text: 'repository.getAll()' },
        { key: 'b', text: 'repository.selectAll()' },
        { key: 'c', text: 'repository.findAll()' },
        { key: 'd', text: 'repository.list()' },
      ],
      correctKey: 'c',
      explanation: 'JpaRepository proporciona findAll() de forma gratuita — ¡sin implementación necesaria! Otros métodos gratis: findById(id), save(entity), deleteById(id), count(). Como model.findMany(), model.findUnique(), model.create() de Prisma.',
    },
    {
      id: 'q8',
      question: 'Spring Data puede generar SQL desde nombres de métodos. ¿Qué SQL genera "findByEmailAndActiveTrue()"?',
      options: [
        { key: 'a', text: 'SELECT * FROM users' },
        { key: 'b', text: 'SELECT * FROM users WHERE email = ? AND active = true' },
        { key: 'c', text: 'SELECT email, active FROM users' },
        { key: 'd', text: 'UPDATE users SET active = true WHERE email = ?' },
      ],
      correctKey: 'b',
      explanation: 'La característica de "consulta derivada" de Spring Data lee el nombre del método: "findBy" = SELECT, "Email" = WHERE email = ?, "And" = AND, "ActiveTrue" = active = true. Genera el SQL automáticamente. ¡No se necesita anotación @Query para consultas comunes!',
    },
  ],
};

export default quiz4;
