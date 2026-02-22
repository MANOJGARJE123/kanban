import express from 'express';
import * as taskController from './task.controller.js';
import isAuth from '../../middlewares/isAuth.js';

const router = express.Router();

router.post('/', isAuth, taskController.createTask);
router.get('/', isAuth, taskController.getTasks);
router.patch('/move', isAuth, taskController.moveTask);
router.patch('/:id', isAuth, taskController.updateTask);
router.delete('/:id', isAuth, taskController.deleteTask);

export default router;
