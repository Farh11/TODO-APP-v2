const {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
  } = require('../models/taskModel');
  
  // GET all tasks
  const getAllTasksController = async (req, res) => {
    try {
      const tasks = await getAllTasks();
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Error fetching tasks' });
    }
  };
  
  // POST a new task
  const createTaskController = async (req, res) => {
    try {
      const { text } = req.body;
      const newTask = await createTask(text);
      res.status(201).json(newTask);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Error creating task' });
    }
  };
  
  // PUT (update) a task
  const updateTaskController = async (req, res) => {
    try {
      const { id } = req.params;
      const { text, completed } = req.body;
      const updatedTask = await updateTask(id, text, completed);
      if (updatedTask) {
        res.json(updatedTask);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Error updating task' });
    }
  };
  
  // DELETE a task
  const deleteTaskController = async (req, res) => {
    try {
      const { id } = req.params;
      await deleteTask(id);
      res.sendStatus(204);
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Error deleting task' });
    }
  };
  
  module.exports = {
    getAllTasksController,
    createTaskController,
    updateTaskController,
    deleteTaskController,
  };