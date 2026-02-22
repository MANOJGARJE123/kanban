import express from 'express';
import * as boardController from './board.controller.js';
import isAuth from '../../middlewares/isAuth.js';

const router = express.Router();

router.post('/', isAuth, boardController.createBoard);
router.get('/:id', isAuth, boardController.getBoardById);
router.get('/organization/:organizationId', isAuth, boardController.getBoardsByOrganizationId);
router.delete('/:id', isAuth, boardController.deleteBoard);

export default router;  