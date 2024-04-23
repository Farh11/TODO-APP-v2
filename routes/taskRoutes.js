const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
} = require('../models/taskModel');

router.get('/', getAllTasks);
router.get('/', createTask);
router.get('/:id', updateTask);
router.get('/:id', deleteTask);

module.exports = router;
