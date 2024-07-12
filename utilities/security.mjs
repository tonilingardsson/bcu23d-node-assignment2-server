import bcrypt from 'bcryptjs';

export const hashPassword = (password) => {
    console.log('password', password);
    return bcrypt.hashSync(password, 10);
};
