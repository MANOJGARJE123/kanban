import pool from '../../config/db.js';

export const createBoard = async (data) => {
    const result = await pool.query(
        'INSERT into boards (name, organization_id) values ($1, $2) returning id, name, organization_id',
        [data.name, data.organization_id]
    )
    return result.rows[0];
}

export const getAllBoardsOrganizationId = async (organizationId) => {
    const result = await pool.query(
        'SELECT id, name, organization_id FROM boards where organization_id = $1',
        [organizationId]
    )
    return result.rows;
}

export const getBoardById = async (id) => {
    const result = await pool.query (
        'SELECT id, name, organization_id from boards where id = $1',
        [id]
    )
    return result.rows[0];
}

export const getColumnsByBoardId = async (boardId) => {
    const result = await pool.query(
        'SELECT id, name, board_id FROM board_columns WHERE board_id = $1',
        [boardId]
    );
    return result.rows;
}

export const getTasksByColumnId = async (columnId) => {
    const result = await pool.query(
        'SELECT id, title, column_id FROM tasks WHERE column_id = $1',
        [columnId]
    );
    return result.rows;
}

export const deleteBoard = async (id) => {
    const result = await pool.query(
        'DELETE from boards where id = $1 returning id',
        [id]
    );
    return result.rows[0];
}