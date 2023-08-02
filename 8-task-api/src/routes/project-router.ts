import express from 'express';
import * as projectController from '../controllers/project-controller';

const router = express.Router();

router
  .route('/')
  .post(projectController.createProject)
  .get(projectController.getProjects);

// router
//   .route('/:id')
//   .get(projectController.getProjectById)
//   .patch(projectController.updateProject)
//   .delete(projectController.deleteProject);

router.route('/all').get(projectController.getAllProjects);

export default router;
