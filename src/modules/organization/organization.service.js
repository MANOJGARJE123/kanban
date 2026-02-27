import { 
    createOrganization as createOrganizationRepo, 
    getOrganizationById as getOrganizationByIdRepo, 
    deleteOrganization as deleteOrganizationRepo,
    addUserToOrganization as addUserToOrganizationRepo,
    getUserOrganizations as getUserOrganizationsRepo,
    getOrganizationUsers as getOrganizationUsersRepo,
    deleteUserFromOrganization as deleteUserFromOrganizationRepo
} from './organization.repository.js';
import logger from '../../utils/logger.js';

export const createOrganization = async (userId, data) => {
    if (!data.name) {
        const error = new Error('Organization name is required');
        error.statusCode = 400;
        logger.error(`Failed to create organization: ${error.message}`, { userId, data });
        throw error;
    }

    logger.info(`Creating organization for user ${userId}`, { name: data.name });
    const result = await createOrganizationRepo(userId, data);
    logger.info(`Organization created successfully`, { organizationId: result.id, userId });
    return result;
}

export const getOrganizationById = async (id) => {
    const result = await getOrganizationByIdRepo(id);
    return result;
}

export const deleteOrganization = async (id) => {
    logger.info(`Deleting organization ${id}`);
    const result = await deleteOrganizationRepo(id);
    logger.info(`Organization ${id} deleted successfully`);
    return result;
}

export const addUserToOrganization = async (userId, organizationId) => {
    logger.info(`Adding user ${userId} to organization ${organizationId}`);
    const result = await addUserToOrganizationRepo(userId, organizationId);
    logger.info(`User ${userId} added to organization ${organizationId} successfully`);
    return result;
}

export const deleteUserFromOrganization = async (userId, organizationId) => {
    logger.info(`Deleting user ${userId} from organization ${organizationId}`);
    const result = await deleteUserFromOrganizationRepo(userId, organizationId);
    logger.info(`User ${result.userEmail} deleted from organization ${result.organizationName} successfully`);
    return {
        message: `User ${result.userEmail} deleted from organization ${result.organizationName} successfully`,
        userEmail: result.userEmail,
        organizationName: result.organizationName
    };
}   

export const getUserOrganizations = async (userId) => {
    logger.info(`Fetching organizations for user ${userId}`);
    const result = await getUserOrganizationsRepo(userId);
    logger.info(`Fetched ${result.length} organizations for user ${userId}`);
    return result;
}

export const getOrganizationUsers = async (organizationId) => {
    const result = await getOrganizationUsersRepo(organizationId);
    return result;
}