import type { MiniProject } from '../../types';

const project4: MiniProject = {
  id: 'project-4',
  moduleId: 'module-4',
  title: 'Diseñar una API REST',
  description: 'Diseña una API REST completa con Spring Boot con controlador, servicio, repositorio y entidad — implementando la arquitectura clásica de tres capas.',
  estimatedMinutes: 20,
  steps: [
    {
      id: 'p4-s1',
      title: 'Crear la entidad',
      instructions: `Crea una clase entidad Task con anotaciones JPA:
- @Entity y @Table(name = "tasks")
- Campos: Long id (con @Id y @GeneratedValue), String title, String description, boolean completed
- Genera getters y setters para todos los campos`,
      starterCode: `// Crea la entidad Task:
`,
      validationPattern: '@Entity.*class\\s+Task.*@Id.*@GeneratedValue.*Long\\s+id.*String\\s+title.*String\\s+description.*boolean\\s+completed',
      hints: [
        '@Entity va sobre la declaración de la clase',
        '@Id y @GeneratedValue van sobre el campo id',
        'Usa @GeneratedValue(strategy = GenerationType.IDENTITY)',
        'Agrega getters/setters estándar: getTitle(), setTitle(String title), etc.',
      ],
      explanation: '@Entity marca esto como una entidad JPA mapeada a una tabla de base de datos. @Id designa la clave primaria y @GeneratedValue indica a JPA que genere IDs automáticamente. Equivale a una definición de modelo Prisma.',
    },
    {
      id: 'p4-s2',
      title: 'Crear el repositorio',
      instructions: `Crea una interfaz TaskRepository que extienda JpaRepository<Task, Long>.
Agrega dos métodos de consulta personalizados:
- findByCompleted(boolean completed) que retorne List<Task>
- findByTitleContaining(String keyword) que retorne List<Task>`,
      starterCode: `// Crea el TaskRepository:
`,
      validationPattern: 'interface\\s+TaskRepository\\s+extends\\s+JpaRepository<Task,\\s*Long>.*List<Task>\\s+findByCompleted\\s*\\(\\s*boolean\\s+completed\\s*\\).*List<Task>\\s+findByTitleContaining\\s*\\(\\s*String\\s+keyword\\s*\\)',
      hints: [
        'public interface TaskRepository extends JpaRepository<Task, Long> { }',
        'Spring Data deriva SQL de los nombres de métodos automáticamente',
        'findByCompleted → WHERE completed = ?',
        'findByTitleContaining → WHERE title LIKE %keyword%',
      ],
      explanation: 'JpaRepository proporciona operaciones CRUD gratis. Métodos personalizados como findByCompleted son "consultas derivadas" — Spring genera el SQL desde el nombre del método. ¡No necesitas código de implementación!',
    },
    {
      id: 'p4-s3',
      title: 'Crear el servicio',
      instructions: `Crea una clase TaskService anotada con @Service:
- Inyecta TaskRepository vía inyección por constructor
- Agrega métodos:
  - getAllTasks() que retorne List<Task> usando repository.findAll()
  - getTaskById(Long id) que retorne Optional<Task>
  - createTask(Task task) que retorne Task usando repository.save(task)
  - deleteTask(Long id) usando repository.deleteById(id)`,
      starterCode: `// Crea el TaskService:
`,
      validationPattern: '@Service.*class\\s+TaskService.*private\\s+final\\s+TaskRepository.*public\\s+TaskService\\s*\\(\\s*TaskRepository.*\\).*getAllTasks.*findAll.*getTaskById.*findById.*createTask.*save.*deleteTask.*deleteById',
      hints: [
        '@Service va sobre la declaración de la clase',
        'Usa inyección por constructor: private final TaskRepository repository;',
        'El constructor recibe TaskRepository como parámetro',
        'repository.findById(id) retorna Optional<Task>',
      ],
      explanation: '@Service marca esto como un componente de lógica de negocio gestionado por Spring. La inyección por constructor (private final + parámetro del constructor) se prefiere sobre la inyección de campo @Autowired por testabilidad e inmutabilidad.',
    },
    {
      id: 'p4-s4',
      title: 'Crear los endpoints GET',
      instructions: `Crea una clase TaskController con @RestController y @RequestMapping("/api/tasks"):
- Inyecta TaskService vía inyección por constructor
- GET /api/tasks → retorna todas las tareas (getAllTasks)
- GET /api/tasks/{id} → retorna tarea por ID, o 404 si no existe

Usa ResponseEntity para el endpoint getById.`,
      starterCode: `// Crea los endpoints GET del TaskController:
`,
      validationPattern: '@RestController.*@RequestMapping\\(\\s*"/api/tasks"\\s*\\).*class\\s+TaskController.*private\\s+final\\s+TaskService.*@GetMapping.*getAllTasks.*@GetMapping\\(\\s*"/?\\{id\\}"\\s*\\).*@PathVariable.*Long\\s+id',
      hints: [
        '@RestController y @RequestMapping("/api/tasks") van en la clase',
        '@GetMapping en el método getAllTasks()',
        '@GetMapping("/{id}") con parámetro @PathVariable Long id',
        'Usa ResponseEntity.ok() para encontrado, ResponseEntity.notFound().build() para no encontrado',
      ],
      explanation: '@RestController combina @Controller y @ResponseBody — todos los valores de retorno se serializan automáticamente a JSON. @PathVariable extrae el {id} de la URL, equivalente a req.params.id en Express.',
    },
    {
      id: 'p4-s5',
      title: 'Crear el endpoint POST',
      instructions: `Agrega un endpoint POST al TaskController:
- POST /api/tasks → crea una nueva tarea
- Acepta la tarea del cuerpo de la petición usando @RequestBody
- Retorna la tarea creada con estado HTTP 201
- Usa @ResponseStatus(HttpStatus.CREATED)`,
      starterCode: `// Agrega el endpoint POST:
`,
      validationPattern: '@PostMapping.*@ResponseStatus\\(HttpStatus\\.CREATED\\).*public\\s+Task\\s+createTask\\s*\\(\\s*@RequestBody\\s+Task\\s+task\\s*\\)',
      hints: [
        '@PostMapping va en el método',
        '@RequestBody Task task — Spring deserializa JSON a objeto Task automáticamente',
        '@ResponseStatus(HttpStatus.CREATED) establece el código de estado 201',
        'Llama taskService.createTask(task) y retorna el resultado',
      ],
      explanation: '@RequestBody indica a Spring que parsee el cuerpo JSON de la petición en un objeto Task. @ResponseStatus(HttpStatus.CREATED) establece el código de estado HTTP 201 — equivalente a res.status(201).json() en Express.',
    },
    {
      id: 'p4-s6',
      title: 'Crear el endpoint PUT',
      instructions: `Agrega un endpoint PUT para actualizar tareas:
- PUT /api/tasks/{id} → actualiza una tarea existente
- Acepta @PathVariable Long id y @RequestBody Task updatedTask
- Busca la tarea existente; si no existe, retorna 404
- Actualiza los campos y guarda
- Retorna la tarea actualizada`,
      starterCode: `// Agrega el endpoint PUT:
`,
      validationPattern: '@PutMapping\\(\\s*"/?\\{id\\}"\\s*\\).*ResponseEntity.*updateTask\\s*\\(\\s*@PathVariable\\s+Long\\s+id.*@RequestBody\\s+Task',
      hints: [
        '@PutMapping("/{id}") public ResponseEntity<Task> updateTask(...)',
        'Usa taskService.getTaskById(id) para encontrar la tarea existente',
        'Actualiza campos con setTitle(), setDescription(), setCompleted()',
        'Retorna ResponseEntity.ok(taskService.createTask(existing)) para guardar',
      ],
      explanation: 'Los endpoints PUT actualizan recursos existentes. El patrón de buscar-o-404 es muy común en APIs REST. ResponseEntity te permite controlar el código de estado HTTP según si el recurso existe.',
    },
    {
      id: 'p4-s7',
      title: 'Crear el endpoint DELETE',
      instructions: `Agrega un endpoint DELETE:
- DELETE /api/tasks/{id} → elimina una tarea
- Acepta @PathVariable Long id
- Retorna ResponseEntity sin contenido (204)
- Usa ResponseEntity.noContent().build()`,
      starterCode: `// Agrega el endpoint DELETE:
`,
      validationPattern: '@DeleteMapping\\(\\s*"/?\\{id\\}"\\s*\\).*ResponseEntity.*deleteTask\\s*\\(\\s*@PathVariable\\s+Long\\s+id.*\\).*deleteTask\\(id\\).*noContent\\(\\)',
      hints: [
        '@DeleteMapping("/{id}")',
        'Llama taskService.deleteTask(id)',
        'Retorna ResponseEntity.noContent().build() para 204 No Content',
      ],
      explanation: 'Los endpoints DELETE eliminan recursos. HTTP 204 (No Content) es la respuesta estándar para eliminación exitosa. Equivalente al patrón res.status(204).send() de Express.',
    },
    {
      id: 'p4-s8',
      title: 'Agregar parámetros de consulta',
      instructions: `Agrega un endpoint de búsqueda al TaskController:
- GET /api/tasks/search?keyword=X → usa findByTitleContaining
- Acepta @RequestParam String keyword
- Retorna la lista filtrada de tareas

También agrega un endpoint para filtrar por estado de completado:
- GET /api/tasks/completed?status=true → usa findByCompleted`,
      starterCode: `// Agrega los endpoints de búsqueda y filtro:
`,
      validationPattern: '@GetMapping\\(\\s*"/search"\\s*\\).*@RequestParam\\s+String\\s+keyword.*findByTitleContaining.*@GetMapping\\(\\s*"/completed"\\s*\\).*@RequestParam\\s+boolean\\s+status.*findByCompleted',
      hints: [
        '@GetMapping("/search") con @RequestParam String keyword',
        'Llama los métodos del repositorio a través del servicio',
        '@RequestParam parsea automáticamente los parámetros de la query string',
        '@RequestParam boolean status — Spring convierte strings "true"/"false" a boolean',
      ],
      explanation: '@RequestParam mapea parámetros de query string a argumentos del método — equivalente a req.query.keyword en Express. Spring convierte automáticamente parámetros string al tipo declarado (boolean, int, etc.).',
    },
  ],
};

export default project4;
