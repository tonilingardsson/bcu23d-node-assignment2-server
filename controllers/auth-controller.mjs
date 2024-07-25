import User from '../models/UserModel.mjs';
import ErrorResponse from '../models/ErrorResponseModel.mjs';
import { asyncHandler } from '../middleware/asyncHandler.mjs';

// @desc    Register a user
// @route   POST /api/v1/auth/register
// @access  PUBLIC
export const register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const user = await User.create({ name, email, password, role });

    createAndSendToken(user.id, 201, res);
});

// @desc    Login a user
// @route   POST /api/v1/auth/login
// @access  PUBLIC
export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    const isCorrect = await user.validatePassword(password);
    if (!isCorrect) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    createAndSendToken(user, 200, res);
});

// @desc    Return info about a logged in user
// @route   GET /api/v1/auth/me
// @access  PRIVATE
export const getMe = async (req, res, next) => {
    const user = await User.findById(req.user.id).populate('transactions');
    res.status(200).json({
        status: true,
        statusCode: 200,
        data: user
    });
};

// @desc    Update a user
// @route   PUT /api/v1/auth/:id
// @access  PRIVATE
export const updateUser = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        name: req.body.name,
        email: req.body.email
    };
    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: true,
        statusCode: 200,
        data: user
    });
});

// @desc    Forgot password
// @route   GET /api/v1/auth/forgotpassword
// @access  PUBLIC
export const forgotPassword = asyncHandler(async (req, res, next) => {
    const email = req.body.email;

    if (!email) {
        return next(new ErrorResponse('Please provide an email', 400));
    }

    let user = await User.findOne({ email });

    if (!user) {
        return next(new ErrorResponse(`There is no user with that email: ${email}`, 404));
    };

    const resetToken = user.createAndSendToken();
    await user.saveUser({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

    res.status(200).json({
        success: true,
        statusCode: 200,
        data: { token: resetToken, url: resetUrl }
    })
});

// @desc    Reset password
// @route   PUT /api/v1/auth/resetpassword/:token
// @access  PUBLIC
export const resetPassword = asyncHandler(async (req, res, next) => {
    const password = req.body.password;
    const token = req.params.token;

    if (!password) return next(new ErrorResponse('Please provide a password', 400));

    let user = await User.findOne({ resetPasswordToken: token });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;

    await user.saveUser();

    createAndSendToken(user, 200, res);
});

const createAndSendToken = (user, statusCode, res) => {
    const token = user.generateToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_TTL * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    res
        .status(statusCode)
        .cookie('token', token, options)
        // Sending token (as a response) in the body
        .json({ success: true, statusCode, token });
};