const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
} = require('../controlller/taskController');

router.get('/', getAllTasks);
router.get('/', createTask);
router.get('/:id', updateTask);
router.get('/:id', deleteTask);

module.exports = router;
