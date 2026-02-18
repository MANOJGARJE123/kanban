import express from 'express';
import * as organizationController from './organization.controller.js';

const router = express.Router();

router.post('/', organizationController.createOrganization);
router.get('/:id', organizationController.getOrganizationById);

export default router;
