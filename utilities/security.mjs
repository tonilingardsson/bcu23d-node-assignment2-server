import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
    // Create a token 
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TTL });
}

export const hashPassword = (password) => {
    console.log('password', password);
    return bcrypt.hashSync(password, 10);
};
