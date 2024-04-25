const express = require('express');
const router = express.Router();
const {
  getAllTasksController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
} = require('../controllers/taskController');

router.get('/', getAllTasksController);
router.post('/', createTaskController);
router.put('/:id', updateTaskController);
router.delete('/:id', deleteTaskController);

module.exports = router;
