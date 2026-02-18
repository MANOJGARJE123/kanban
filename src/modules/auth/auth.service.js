import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export const register = async (data) => {
    const existingUser = await pool.query(
        'SELECT * FROM users WHERE email = $1', [data.email]
    );

    if (existingUser.rows.length > 0) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const result = await pool.query (
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
        [data.email, hashedPassword]
    )
};

export const login = async (data) => {

};

export const refresh = async (refreshToken) => {
 
};
