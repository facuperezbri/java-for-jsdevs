import type { MiniProject } from '../../types';

const project4: MiniProject = {
  id: 'project-4',
  moduleId: 'module-4',
  title: 'Design a REST API',
  description: 'Design a complete Spring Boot REST API with a controller, service, repository, and entity — implementing the classic three-layer architecture.',
  estimatedMinutes: 20,
  steps: [
    {
      id: 'p4-s1',
      title: 'Create the Entity',
      instructions: `Create a Task entity class with JPA annotations:
- @Entity and @Table(name = "tasks")
- Fields: Long id (with @Id and @GeneratedValue), String title, String description, boolean completed
- Generate getters and setters for all fields`,
      starterCode: `// Create the Task entity:
`,
      validationPattern: '@Entity.*class\\s+Task.*@Id.*@GeneratedValue.*Long\\s+id.*String\\s+title.*String\\s+description.*boolean\\s+completed',
      hints: [
        '@Entity goes above the class declaration',
        '@Id and @GeneratedValue go above the id field',
        'Use @GeneratedValue(strategy = GenerationType.IDENTITY)',
        'Add standard getters/setters: getTitle(), setTitle(String title), etc.',
      ],
      explanation: '@Entity marks this as a JPA entity mapped to a database table. @Id designates the primary key and @GeneratedValue tells JPA to auto-generate IDs. This is equivalent to a Prisma model definition.',
    },
    {
      id: 'p4-s2',
      title: 'Create the Repository',
      instructions: `Create a TaskRepository interface that extends JpaRepository<Task, Long>.
Add two custom query methods:
- findByCompleted(boolean completed) returning List<Task>
- findByTitleContaining(String keyword) returning List<Task>`,
      starterCode: `// Create the TaskRepository:
`,
      validationPattern: 'interface\\s+TaskRepository\\s+extends\\s+JpaRepository<Task,\\s*Long>.*List<Task>\\s+findByCompleted\\s*\\(\\s*boolean\\s+completed\\s*\\).*List<Task>\\s+findByTitleContaining\\s*\\(\\s*String\\s+keyword\\s*\\)',
      hints: [
        'public interface TaskRepository extends JpaRepository<Task, Long> { }',
        'Spring Data derives SQL from method names automatically',
        'findByCompleted → WHERE completed = ?',
        'findByTitleContaining → WHERE title LIKE %keyword%',
      ],
      explanation: 'JpaRepository provides CRUD operations for free. Custom methods like findByCompleted are "derived queries" — Spring generates the SQL from the method name. No implementation code needed!',
    },
    {
      id: 'p4-s3',
      title: 'Create the Service',
      instructions: `Create a TaskService class annotated with @Service:
- Inject TaskRepository via constructor injection
- Add methods:
  - getAllTasks() returning List<Task> using repository.findAll()
  - getTaskById(Long id) returning Optional<Task>
  - createTask(Task task) returning Task using repository.save(task)
  - deleteTask(Long id) using repository.deleteById(id)`,
      starterCode: `// Create the TaskService:
`,
      validationPattern: '@Service.*class\\s+TaskService.*private\\s+final\\s+TaskRepository.*public\\s+TaskService\\s*\\(\\s*TaskRepository.*\\).*getAllTasks.*findAll.*getTaskById.*findById.*createTask.*save.*deleteTask.*deleteById',
      hints: [
        '@Service goes above the class declaration',
        'Use constructor injection: private final TaskRepository repository;',
        'The constructor takes TaskRepository as a parameter',
        'repository.findById(id) returns Optional<Task>',
      ],
      explanation: '@Service marks this as a Spring-managed business logic component. Constructor injection (private final + constructor parameter) is preferred over @Autowired field injection for testability and immutability.',
    },
    {
      id: 'p4-s4',
      title: 'Create the GET Endpoints',
      instructions: `Create a TaskController class with @RestController and @RequestMapping("/api/tasks"):
- Inject TaskService via constructor injection
- GET /api/tasks → returns all tasks (getAllTasks)
- GET /api/tasks/{id} → returns task by ID, or 404 if not found

Use ResponseEntity for the getById endpoint.`,
      starterCode: `// Create the TaskController GET endpoints:
`,
      validationPattern: '@RestController.*@RequestMapping\\(\\s*"/api/tasks"\\s*\\).*class\\s+TaskController.*private\\s+final\\s+TaskService.*@GetMapping.*getAllTasks.*@GetMapping\\(\\s*"/?\\{id\\}"\\s*\\).*@PathVariable.*Long\\s+id',
      hints: [
        '@RestController and @RequestMapping("/api/tasks") go on the class',
        '@GetMapping on getAllTasks() method',
        '@GetMapping("/{id}") with @PathVariable Long id parameter',
        'Use ResponseEntity.ok() for found, ResponseEntity.notFound().build() for missing',
      ],
      explanation: '@RestController combines @Controller and @ResponseBody — all return values are automatically serialized to JSON. @PathVariable extracts the {id} from the URL path, equivalent to req.params.id in Express.',
    },
    {
      id: 'p4-s5',
      title: 'Create the POST Endpoint',
      instructions: `Add a POST endpoint to TaskController:
- POST /api/tasks → creates a new task
- Accept the task from the request body using @RequestBody
- Return the created task with HTTP 201 status
- Use @ResponseStatus(HttpStatus.CREATED)`,
      starterCode: `// Add the POST endpoint:
`,
      validationPattern: '@PostMapping.*@ResponseStatus\\(HttpStatus\\.CREATED\\).*public\\s+Task\\s+createTask\\s*\\(\\s*@RequestBody\\s+Task\\s+task\\s*\\)',
      hints: [
        '@PostMapping goes on the method',
        '@RequestBody Task task — Spring auto-deserializes JSON to Task object',
        '@ResponseStatus(HttpStatus.CREATED) sets the 201 status code',
        'Call taskService.createTask(task) and return the result',
      ],
      explanation: '@RequestBody tells Spring to parse the JSON request body into a Task object. @ResponseStatus(HttpStatus.CREATED) sets the HTTP 201 status code — equivalent to res.status(201).json() in Express.',
    },
    {
      id: 'p4-s6',
      title: 'Create the PUT Endpoint',
      instructions: `Add a PUT endpoint for updating tasks:
- PUT /api/tasks/{id} → updates an existing task
- Accept @PathVariable Long id and @RequestBody Task updatedTask
- Look up the existing task; if not found, return 404
- Update the fields and save
- Return the updated task`,
      starterCode: `// Add the PUT endpoint:
`,
      validationPattern: '@PutMapping\\(\\s*"/?\\{id\\}"\\s*\\).*ResponseEntity.*updateTask\\s*\\(\\s*@PathVariable\\s+Long\\s+id.*@RequestBody\\s+Task',
      hints: [
        '@PutMapping("/{id}") public ResponseEntity<Task> updateTask(...)',
        'Use taskService.getTaskById(id) to find the existing task',
        'Update fields with setTitle(), setDescription(), setCompleted()',
        'Return ResponseEntity.ok(taskService.createTask(existing)) to save',
      ],
      explanation: 'PUT endpoints update existing resources. The pattern of find-or-404 is very common in REST APIs. ResponseEntity lets you control the HTTP status code based on whether the resource exists.',
    },
    {
      id: 'p4-s7',
      title: 'Create the DELETE Endpoint',
      instructions: `Add a DELETE endpoint:
- DELETE /api/tasks/{id} → deletes a task
- Accept @PathVariable Long id
- Return ResponseEntity with no content (204)
- Use ResponseEntity.noContent().build()`,
      starterCode: `// Add the DELETE endpoint:
`,
      validationPattern: '@DeleteMapping\\(\\s*"/?\\{id\\}"\\s*\\).*ResponseEntity.*deleteTask\\s*\\(\\s*@PathVariable\\s+Long\\s+id.*\\).*deleteTask\\(id\\).*noContent\\(\\)',
      hints: [
        '@DeleteMapping("/{id}")',
        'Call taskService.deleteTask(id)',
        'Return ResponseEntity.noContent().build() for 204 No Content',
      ],
      explanation: 'DELETE endpoints remove resources. HTTP 204 (No Content) is the standard response for successful deletion. This is equivalent to Express\'s res.status(204).send() pattern.',
    },
    {
      id: 'p4-s8',
      title: 'Add Query Parameters',
      instructions: `Add a search endpoint to TaskController:
- GET /api/tasks/search?keyword=X → uses findByTitleContaining
- Accept @RequestParam String keyword
- Return the filtered list of tasks

Also add an endpoint to filter by completion status:
- GET /api/tasks/completed?status=true → uses findByCompleted`,
      starterCode: `// Add search and filter endpoints:
`,
      validationPattern: '@GetMapping\\(\\s*"/search"\\s*\\).*@RequestParam\\s+String\\s+keyword.*findByTitleContaining.*@GetMapping\\(\\s*"/completed"\\s*\\).*@RequestParam\\s+boolean\\s+status.*findByCompleted',
      hints: [
        '@GetMapping("/search") with @RequestParam String keyword',
        'Call repository methods through the service',
        '@RequestParam automatically parses query string parameters',
        '@RequestParam boolean status — Spring converts "true"/"false" strings to boolean',
      ],
      explanation: '@RequestParam maps query string parameters to method arguments — equivalent to req.query.keyword in Express. Spring automatically converts string parameters to the declared type (boolean, int, etc.).',
    },
  ],
};

export default project4;
