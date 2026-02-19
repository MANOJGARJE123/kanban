import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { createUser } from './auth.repository.js';


export const register = async (data) => {
    const existingUser = await findUserByEmail(data.email);

    if (existingUser.rows.length > 0) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const result = await createUser(data.email, hashedPassword);

    return {
        id: result.rows[0].id,
        message: "User registered successfully"
    };
};

export const login = async (data) => {
    const userResult = await pool.query(
        'select id, email, password_hash from users where email = $1', [data.email]
    );

    if (userResult.rows.length === 0) {
        throw new Error('Invalid email or password');
    }
    const user = userResult.rows[0];

    const isPasswordValid = await bcrypt.compare(data.password, user.password_hash);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    } 
    
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET not defined");
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    return {
        token,
        user: {
            id: user.id,
            email: user.email
        }
    };
};
