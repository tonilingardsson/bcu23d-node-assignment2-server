import jwt from 'jsonwebtoken';
import { asyncHandler } from './asyncHandler.mjs';
import ErrorResponse from '../models/ErrorResponseModel.mjs';

// Requires the user to be authenticated
export const protect = asyncHandler((req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    // KEEP THIS deactivated until POSTMAN han confirmed that it works
    // else if (req.cookies.token) {
    //     token = req.cookies.token;
    // }

    if (!token) {
        next(new ErrorResponse('Not authorized!', 401));

    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = User.findById(decodedToken.id);

    if (!req.user) {
        next(new ErrorResponse('Not authorized!', 401));
    }
    next();
})