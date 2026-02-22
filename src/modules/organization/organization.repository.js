import pool from '../../config/db.js';

export const createOrganization = async (userId, data) => {
    const result = await pool.query(
        'INSERT INTO organizations (name, user_id) VALUES ($1, $2) RETURNING id, name, user_id',
        [data.name, userId]
    );
    return result.rows[0];
}

export const getOrganizationById = async (id) => {
    const result = await pool.query(
        'SELECT id, name FROM organizations WHERE id = $1',
        [id]
    )
    if (result.rows.length === 0) {
        throw new Error('Organization not found');
    }
    return result.rows[0];
}

export const deleteOrganization = async (id) => {
    const result = await pool.query(
        'DELETE FROM organizations WHERE id = $1 RETURNING id',
        [id]
    );
    return result.rows[0];
}