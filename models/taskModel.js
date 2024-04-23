const pool = require('../db');

// Get all tasks
const getAllTasks = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM task');
    return rows;
  } catch (error) {
    throw error;
  }
};

// Create a new task
const createTask = async (text) => {
  try {
    const { rows } = await pool.query(
      'INSERT INTO task (text) VALUES ($1) RETURNING *',
      [text]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Update a task
const updateTask = async (id, text, completed) => {
  try {
    const { rows } = await pool.query(
      'UPDATE task SET text = $1, completed = $2 WHERE id = $3 RETURNING *',
      [text, completed, id]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Delete a task
const deleteTask = async (id) => {
  try {
    await pool.query('DELETE FROM task WHERE id = $1', [id]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};