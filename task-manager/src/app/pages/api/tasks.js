let tasks = []; // Fake backend: Array para almacenar tareas

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      // Devuelve todas las tareas
      res.status(200).json(tasks);
      break;

    case "POST":
      // Crear nueva tareas
      const { id, name, descripcion, status } = req.body;
      if (!id || !name || !status) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
      }
      const newTask = { id, name, descripcion, status };
      tasks.push(newTask);
      res.status(201).json(newTask);
      break;

    case "PU":
      // Actualizar una tarea existente
      const { taskId, updateData } = req.body;
      const taskIndex = tasks.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) {
        return res.status(404).json({ error: "Tarea no encontrada" });
      }
      tasks[taskIndex] = { ...tasks[taskIndex], ...updateData };
      res.status(200).json(tasks[taskIndex]);
      break;

    case "DELETE":
      // Eliminar una tarea
      const { deleteId } = req.query;
      tasks = tasks.filter((task) => task.id !== deleteId);
      res.status(200).json({ message: "Tarea eliminada" });
      break;
    
    default: 
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Metodo ${method} no permitido`);
  }
}
