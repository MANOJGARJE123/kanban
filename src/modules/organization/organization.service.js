import { createOrganization as createOrganizationRepo, getOrganizationById as getOrganizationByIdRepo, deleteOrganization as deleteOrganizationRepo } from './organization.repository.js';

export const createOrganization = async (userId, data) => {
    const result = await createOrganizationRepo(userId, data);
    return result;
}

export const getOrganizationById = async (id) => {
    const result = await getOrganizationByIdRepo(id);
    return result;
}

export const deleteOrganization = async (id) => {
    const result = await deleteOrganizationRepo(id);
    return result;
}   