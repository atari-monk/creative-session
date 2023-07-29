import express from 'express';
import * as taskController from '../controllers/task-controller';

const router = express.Router();

router.route('/').get(taskController.getTasks).post(taskController.createTask);

router
  .route('/:id')
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

export default router;