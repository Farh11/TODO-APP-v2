const pool  = require('../db');

// GET all tasks
const getAllTasks = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM task');
        res.json(rows);
    }   catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error fetching tasks' });
    }
};

// POST a new tasks
const createTask = async (req, res) => {
    try {
        const { text } = req.body;
        const { rows } = await pool.query(
            'INSERT INTO task (text) VALUES ($1) RETURNING *', [text]
        );
        res.status(201).json(rows[0]);
    }   catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// PUT (update) a task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, completed } = req.body;
        const { rows } = await pool.query(
            'UPDATE task SET text = $1, completed = $2 WHERE id = $3 RETURNING *', 
            [text, completed, id]
        );
        res.json(rows[0]);
    }   catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Error updating tasks'});
    }
};

// DELETE a task
const deleteTask = async (req, res) {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM task WHERE id = $1', [id]);
        res.sendStatus(204);
    }   catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
};