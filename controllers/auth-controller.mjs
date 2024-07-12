// @desc    Register a user
// @route   POST /api/v1/auth/register
// @access  PUBLIC
export const register = (req, res, next) => {
    res
        .status(201)
        .json({ status: true, statusCode: 201, data: 'Register success!' });
}

// @desc    Login a user
// @route   POST /api/v1/auth/login
// @access  PUBLIC
export const login = (req, res, next) => {
    res
        .status(200)
        .json({ status: true, statusCode: 200, data: 'Login works!' });
}

// @desc    Return info about a logged in user
// @route   GET /api/v1/auth/me
// @access  PUBLIC
export const getMe = (req, res, next) => {
    res
        .status(200)
        .json({ status: true, statusCode: 200, data: 'My profile works too!' });
}