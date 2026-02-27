import { createBoard as createBoardRepo,
    getBoardById as getBoardByIdRepo,
    getAllBoardsOrganizationId as getAllBoardsOrganizationIdRepo, 
    deleteBoard as deleteBoardRepo,
    getColumnsByBoardId as getColumnsByBoardIdRepo,
    getTasksByColumnId as getTasksByColumnIdRepo } from './board.repository.js';

export const createBoard = async (data) => {
    if (!data.name || !data.organization_id) {
        const error = new Error('Board name and organization_id are required');
        error.statusCode = 400;
        throw error;
    }

    const result = await createBoardRepo(data);
    return result;
}

export const getBoardById = async (id) => {
    const board = await getBoardByIdRepo(id);
    if (!board) {
        const error = new Error('Board not found');
        error.statusCode = 404;
        throw error;
    }

    const columns = await getColumnsByBoardIdRepo(id);

    const columnsWithTasks = await Promise.all(columns.map(async (col) => {
        const tasks = await getTasksByColumnIdRepo(col.id);
        return {
            id: col.id,
            name: col.name,
            tasks: tasks.map(t => ({ id: t.id, title: t.title }))
        };
    }));

    return {
        id: board.id,
        name: board.name,
        columns: columnsWithTasks
    };
}

export const getAllBoardsOrganizationId = async (organizationId) => {
    const result = await getAllBoardsOrganizationIdRepo(organizationId);
    return result;
}

export const deleteBoard = async (id) => {
    const result = await deleteBoardRepo(id);
    return result;
}