// Simulate an in-memory database for tasks
let tasks = [];

export default function handler(req, res) {
  if (req.method === "GET") {
    // Return all tasks
    res.status(200).json(tasks);
  } else if (req.method === "POST") {
    // Add a new task to the array
    const { id, title, descripcion, completed } = req.body;
    tasks.push({ id, title, descripcion, completed });
    res.status(201).json({ message: "Task create" });
  } else if (req.method === "PUT") {
    // Update an existing task's completed status
    const { id, completed } = req.body;
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, completed } : task
    );
    res.status(200).json({ message: 'Task updated '});

  } else if (req.method === 'DELETE'){
    // Remove a task by its ID
    const { id } = req.body;
    tasks = tasks.filter(task => task.id !== id);
    res.status(200).json({ message: 'Task delete'});
  }
}
