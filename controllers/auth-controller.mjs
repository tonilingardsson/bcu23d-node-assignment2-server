import User from '../models/UserModel.mjs';
import { saveUser, findUserByEmail, findUserById } from '../data/fileDb.mjs';
import { generateToken, validatePassword } from '../utilities/security.mjs';
// @desc    Register a user
// @route   POST /api/v1/auth/register
// @access  PUBLIC
export const register = async (req, res, next) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return next(new Error('Name, email and password are required!'));
    }

    const user = new User(name, email, password, role ?? 'user');

    // Save user to DB
    await saveUser(user);

    createAndSendToken(user.id, 201, res);
};

// @desc    Login a user
// @route   POST /api/v1/auth/login
// @access  PUBLIC
export const login = async (req, res, next) => {
    // 1. Validate that we have email and password
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            error: 'Email or password missing!',
        });
    }
    try {
        // 2. Fetch the user from the DB
        const user = await findUserByEmail({ email });
        // 3. Check if the password is correct
        const isCorrect = await validatePassword(password, user.password);

        if (!isCorrect) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'Invalid credentials!',
            });
        }
        // 4. Generate a new token and send it back
        return createAndSendToken(user.id, 200, res);
    } catch (error) {
        res
            .status(404)
            .json({ success: false, statusCode: 404, message: error.message });
    }
};

// @desc    Return info about a logged in user
// @route   GET /api/v1/auth/me
// @access  PUBLIC
export const getMe = async (req, res, next) => {
    try {
        const user = await findUserById(req.id);
    } catch (error) {
        return res
            .status(404)
            .json({ success: false, statusCode: 404, message: error.message });
    }

    res.status(200).json({ status: true, statusCode: 200, data: user });
};

const createAndSendToken = (id, statusCode, res) => {
    // 1. Create token
    const token = generateToken(id);
    console.log(token);
    // 2. Set options
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_TTL * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    // 3. Send token
    res
        .status(statusCode)
        // Sending token in a cookie
        .cookie('token', token, options)
        // Sending token (as a response) in the body
        .json({ success: true, statusCode, token });
};
