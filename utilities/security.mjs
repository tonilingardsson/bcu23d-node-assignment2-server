import bcrypt from 'bcryptjs';

export const hashPassword = (password) => {
    console.log('password', password);
    return bcrypt.hashSync(password, 10);
};

export const validatePassword = async (passwordToCheck, userPassword) => {
    return await bcrypt.compare(passwordToCheck, userPassword);
}