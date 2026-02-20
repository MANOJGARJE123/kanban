import express from 'express';
import * as organizationController from './organization.controller.js';
import isAuth from '../../middlewares/isAuth.js';

const router = express.Router();

router.post('/', isAuth, organizationController.createOrganization);
router.get('/:id', isAuth, organizationController.getOrganizationById);

export default router;
