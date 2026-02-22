import pool from '../../config/db.js';

export const createBoard = async (data) => {
    const result = await pool.query(
        'INSERT INTO boards (name, organization_id) values ($1, $2) RETURNING id, name, organization_id',
        [data.name, data.organization_id]
    )
    return result.rows[0];
}

export const getAllBoardsOrganizationId = async (organizationId) => {
    const result = await pool.query(
        'SELECT id, name, organization_id FROM boards WHERE organization_id = $1',
        [organizationId]
    )
    return result.rows;
}

export const getBoardById = async (id) => {
    const result = await pool.query (
        'SELECT id, name, organization_id FROM boards WHERE id = $1',
        [id]
    )
    return result.rows[0];
}

export const deleteBoard = async (id) => {
    const result = await pool.query(
        'DELETE FROM boards WHERE id = $1 RETURNING id',
        [id]
    );
    return result.rows[0];
}