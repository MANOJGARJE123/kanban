import pool from '../../config/db.js';

export const createTask = async (data) => {
    const result = await pool.query(
        'INSERT INTO tasks (title, description, column_id, position) VALUES ($1, $2, $3, $4) RETURNING id, title, description, column_id, position, created_at',
        [data.title, data.description, data.column_id, data.position]
    );
    return result.rows[0];
};

export const getTasks = async (boardId, columnId) => {
    let query = 'SELECT t.id, t.title, t.description, t.column_id, t.position, t.created_at FROM tasks t JOIN board_columns bc ON t.column_id = bc.id WHERE bc.board_id = $1';
    let params = [boardId];
    let paramCount = 1;

    if (columnId) {
        paramCount++;
        query += ` AND t.column_id = $${paramCount}`;
        params.push(columnId);
    }

    query += ' ORDER BY t.position';

    const result = await pool.query(query, params);
    return result.rows;
};

export const updateTask = async (id, data) => {
    const result = await pool.query(
        'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING id, title, description, column_id, position, created_at',
        [data.title, data.description, id]
    );
    return result.rows[0];
};

export const moveTask = async (id, columnId, position) => {
    const result = await pool.query(
        'UPDATE tasks SET column_id = $1, position = $2 WHERE id = $3 RETURNING id, title, description, column_id, position, created_at',
        [columnId, position, id]
    );
    return result.rows[0];
};

export const deleteTask = async (id) => {
    const result = await pool.query(
        'DELETE FROM tasks WHERE id = $1 RETURNING id',
        [id]
    );
    return result.rows[0];
};
