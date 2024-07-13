import User from "../models/UserModel.mjs";
import { saveUser } from "../data/fileDb.mjs";
import { generateToken } from "../utilities/security.mjs";
// @desc    Register a user
// @route   POST /api/v1/auth/register
// @access  PUBLIC
export const register = async (req, res, next) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res
            .status(400)
            .json({
                status: false,
                statusCode: 400,
                error: 'Username, email or password missing!',
            });
    }

    const user = new User(name, email, password, role ?? 'user');

    // Save user to DB
    await saveUser(user);

    createAndSendToken(user.id, 201, res);
};

// @desc    Login a user
// @route   POST /api/v1/auth/login
// @access  PUBLIC
export const login = (req, res, next) => {
    res.status(200).json({ status: true, statusCode: 200, data: 'Login works!' });
};

// @desc    Return info about a logged in user
// @route   GET /api/v1/auth/me
// @access  PUBLIC
export const getMe = (req, res, next) => {
    res
        .status(200)
        .json({ status: true, statusCode: 200, data: 'My profile works too!' });
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
    }
    // 3. Send token
    res.
        status(statusCode).
        // Sending token in a cookie
        cookie('token', token, options).
        // Sending token (as a response) in the body
        json({ success: true, statusCode, token });
}