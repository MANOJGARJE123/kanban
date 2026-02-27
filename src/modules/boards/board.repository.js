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

export const deleteBoard = async (id) => {
    const result = await pool.query(
        'DELETE from boards where id = $1 returning id',
        [id]
    );
    return result.rows[0];
}