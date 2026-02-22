import { createTask as createTaskRepo, getTasks as getTasksRepo, updateTask as updateTaskRepo, moveTask as moveTaskRepo, deleteTask as deleteTaskRepo } from './task.repository.js';

export const createTask = async (data) => {
    const result = await createTaskRepo(data);
    return result;
};

export const getTasks = async (boardId, columnId) => {
    const result = await getTasksRepo(boardId, columnId);
    return result;
};

export const updateTask = async (id, data) => {
    const result = await updateTaskRepo(id, data);
    return result;
};

export const moveTask = async (id, columnId, position) => {
    const result = await moveTaskRepo(id, columnId, position);
    return result;
};

export const deleteTask = async (id) => {
    const result = await deleteTaskRepo(id);
    return result;
};
