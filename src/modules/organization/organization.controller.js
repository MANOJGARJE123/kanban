import organizationService from './organization.service.js';

export const createOrganization = async (req, res, next) => {
    try {
        const data = await organizationService.createOrganization(req.body);
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
}

export const getOrganizationById = async (req, res, next) => {
    try {
        const data = await organizationService.getOrganizationById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}   